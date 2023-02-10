import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeerSubscriptionModel } from 'src/models/deer-subscription.model';
import { StripeService } from 'src/app/services/stripe.service';
import { StripeSession } from 'src/models/stripe-session.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalCost: number;

  constructor(
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stripeService: StripeService,
  ) {
    this.totalCost = 125 * data.deerReceipt.length;
  }


  checkout() {
    // Send the receipt array to the backend and get the Stripe session URL
    this.stripeService.post(['create-checkout-session'],this.data.deerReceipt).subscribe((seession: StripeSession) => {
      console.log(seession.stripeURl);
      window.location.href = seession.stripeURl;
      
    });

    // Open the Stripe session URL in a new window/tab
  }
}
