import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { DeerService } from 'src/app/services/deer.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { DeerImage } from 'src/models/deer-image.model';
import { Deer } from 'src/models/deer.model';
import { CheckoutComponent } from '../checkout/checkout.component';

interface DeerSubscriptionModel {
    deerId?: string;
    ranchId?: string;
    deerName?: string;
    cost: number;
  }

@Component({
    selector: 'app-add-deer-parent',
    templateUrl: './add-deer-parent.component.html',
    styleUrls: ['./add-deer-parent.component.scss'],
})
export class AddDeerParentComponent implements OnInit {
    registrationForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(1),
        ]),
        nadr: new FormControl('', [
            Validators.required,
            Validators.minLength(1),
        ]),
        dob: new FormControl('', Validators.required),
        gebu: new FormControl('', [Validators.required]),
        codon: new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.pattern('[A-Z]+'),
        ]),
        sciScore: new FormControl('', [
            Validators.required,
            Validators.minLength(1),
        ]),
        semenAvailable: new FormControl(true, Validators.required),
        semenCost: new FormControl(0, [Validators.required]),
        ranchId: new FormControl('', [Validators.required]),
        videoLink: new FormControl(''),
        description: new FormControl(''),
        ageOfBuckDisplayed: new FormControl(0, [
            Validators.required,
            Validators.max(100),
            Validators.min(0),
        ]),
    });

    pedigreeForm = new FormGroup({
        deer: new FormControl('', Validators.required),
        levelOneSire: new FormControl(''),
        levelOneDam: new FormControl(''),
        levelTwoSireA: new FormControl(''),
        levelTwoSireB: new FormControl(''),
        levelTwoDamA: new FormControl(''),
        levelTwoDamB: new FormControl(''),
        levelThreeSireA: new FormControl(''),
        levelThreeSireB: new FormControl(''),
        levelThreeSireC: new FormControl(''),
        levelThreeSireD: new FormControl(''),
        levelThreeDamA: new FormControl(''),
        levelThreeDamB: new FormControl(''),
        levelThreeDamC: new FormControl(''),
        levelThreeDamD: new FormControl(''),
    });

    confirmForm = new FormGroup({
        dataCorrect: new FormControl(false, Validators.required),
    });

    loading: boolean = false;
    deerId: string = '';
    profileImage: File | undefined;
    extraPhotos: File[] = [];
    errorMessage: string | undefined;
    updatedPhoto: boolean = false;
    addDeerList: Deer[] = [];
    currentDeerProfileImage: DeerImage[] = [];
    currentDeerExtraImages: DeerImage[] = [];
    deerReceipt: DeerSubscriptionModel[] = [];

    constructor(public deerService: DeerService, public router: Router, private tokenStorage: TokenStorageService, public dialog: MatDialog) {}

    ngOnInit() {}

    submitAddDeer(): void {
        this.loading = true;
        let observables: Observable<any>[] = [];
      
        this.addDeerList.forEach((deer: Deer) => {
          deer.semenCost = deer.semenCost.toString();
      
          const deerObservable = this.deerService.post(['Request-Listing'], deer).pipe(
            tap(response => {
              deer.id = response.id;
              const deerSubscription: DeerSubscriptionModel = {
                deerId: deer.id,
                ranchId: deer.ranchId,
                deerName: deer.name,
                cost: 125
              };
              this.deerReceipt.push(deerSubscription);
            }),
            switchMap(() => {
              return this.uploadFiles(deer.profileImageFile, deer.extraImagesFiles, deer.id);
            })
          );
          observables.push(deerObservable);
        });
      
        forkJoin(observables).subscribe(() => {
          this.deerService.post(['Send-Email'], this.addDeerList).subscribe(() => {
            this.loading = false;
            this.openCheckoutDialog(this.deerReceipt);
          });
        }, (error) => {
          this.errorMessage = 'Failed to Update Photo';
          console.error(error);
        });
      }

    openCheckoutDialog(deerReceipt: DeerSubscriptionModel[]): void {
        let total = 0;
        deerReceipt.forEach((item: DeerSubscriptionModel) => {
            total = total + item.cost;
        });
        const dialogRef = this.dialog.open(CheckoutComponent, {
          width: '400px',
          data: {deerReceipt, total},
          disableClose: true,
        });
      }

    addProfileImage(profileImage: DeerImage): void {
        if(this.currentDeerProfileImage.length == 0){
            this.currentDeerProfileImage.push(profileImage);
        } else {
            this.currentDeerProfileImage[0] = profileImage;
        }
    }

    addExtraImage(extraImage: DeerImage): void {
        if (this.currentDeerExtraImages.length < 3) {
            this.currentDeerExtraImages.push(extraImage);
        } else {
            this.currentDeerExtraImages.shift();
            this.currentDeerExtraImages.push(extraImage);
        }
    }

    addDeerToQueue() {
        const deer: Deer = this.registrationForm.getRawValue();
        deer.deerFamily = this.pedigreeForm.getRawValue();
        deer.profileImageFile = this.currentDeerProfileImage[0];
        deer.extraImagesFiles = this.currentDeerExtraImages;

        this.currentDeerExtraImages = [];
        this.currentDeerProfileImage = [];

        this.setPedigreeValue();
        this.setRegistrationFormValues();
        this.setConfirmForm();
      
        this.addDeerList.push(deer);
    }

    uploadFiles(profileImageFile: DeerImage, extraImages: DeerImage[], deerId: string): Observable<any> {
        const fileUploadObservables: Observable<any>[] = [];
      
        if (profileImageFile != undefined) {
          this.loading = true;
          fileUploadObservables.push(this.deerService.uploadFile(profileImageFile.file, deerId, profileImageFile.ageOfDeerImaged));
        }
      
        extraImages.forEach((element) => {
          if (element != undefined) {
            fileUploadObservables.push(this.deerService.uploadExtraMedia(element.file, deerId, element.ageOfDeerImaged));
          }
        });
      
        if (fileUploadObservables.length > 0) {
          return forkJoin(fileUploadObservables);
        } else {
          return of(null);
        }
      }

    private setRegistrationFormValues() {
        this.registrationForm.reset();

        Object.keys(this.registrationForm.controls).forEach(key => {
            this.registrationForm.get(key)?.setValue('');
            this.registrationForm.get(key)?.setErrors(null)
        });

        this.registrationForm.controls['ageOfBuckDisplayed'].setValue(0);
        this.registrationForm.controls['ranchId'].setValue(this.tokenStorage.getUser().id)
        this.registrationForm.controls['semenAvailable'].setValue(true);
        this.registrationForm.controls['semenCost'].setValue(0);
        this.registrationForm.controls['ageOfBuckDisplayed'].setValue(0);

        this.registrationForm.markAsPristine();
        this.registrationForm.markAsUntouched();
    }

    private setPedigreeValue() {
        this.pedigreeForm.reset();

        Object.keys(this.pedigreeForm.controls).forEach(key => {
            this.pedigreeForm.get(key)?.setValue(''); 
            this.pedigreeForm.get(key)?.setErrors(null)
        });

        this.pedigreeForm.markAsPristine();
        this.pedigreeForm.markAsUntouched();
    }

    private setConfirmForm() {
        this.confirmForm.reset();

        this.confirmForm.controls['dataCorrect'].setValue(false);

        this.confirmForm.markAsPristine();
        this.confirmForm.markAsUntouched();
    }

}
