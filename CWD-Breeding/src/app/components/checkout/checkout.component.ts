import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeerSubscriptionModel } from 'src/models/deer-subscription.model';
import { StripeService } from 'src/app/services/stripe.service';
import { StripeSession } from 'src/models/stripe-session.model';
import { FormControl } from '@angular/forms';
import { PromoCode } from 'src/models/promo-code.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalCost: number = 0;
  loading: boolean = false;

  promoCodeControl = new FormControl();
  promoCode!: PromoCode;
  errorMessage: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stripeService: StripeService,
  ) {}
 
  checkout() {
    // Send the receipt array to the backend and get the Stripe session URL
    this.loading = true;
    this.stripeService.post(['create-checkout-session'],this.data.deerReceipt).subscribe((seession: StripeSession) => {
      window.location.href = seession.stripeURl;
    });

    // Open the Stripe session URL in a new window/tab
  }

  applyPromo() {
    this.errorMessage = ''; // Reset error message
    if (!this.promoCodeControl.value || this.promoCodeControl.value === '') {
      this.errorMessage = 'Please enter a promo code';
    } else {
      const params = new Map<string, string>();
      params.set('promoCode', this.promoCodeControl.value);   

      this.stripeService.get(['Check-Promo'], params).subscribe((promo: PromoCode) => {
        if (promo === null) {
          this.errorMessage = 'Invalid promo code';
        } else {
          this.promoCode = promo;
          this.applyDiscount();
          // Apply percentage discount from promo code
        }
      }, () => {
        this.errorMessage = 'Error checking promo code';
      });
    }
  }

  applyDiscount() {
    this.data.deerReceipt.totalCost = this.data.deerReceipt.totalCost - (this.data.deerReceipt.totalCost * (this.promoCode.percentageOff / 100));
  }

  setPromoCode() {
    this.data.deerReceipt.forEach((deer: DeerSubscriptionModel) => {
      deer.promoCodeId = this.promoCode.code;
    });
  }
 
  
}
