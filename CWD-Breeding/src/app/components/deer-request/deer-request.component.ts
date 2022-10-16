import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Deer } from 'src/models/deer.model';
import { DeerService } from 'src/app/services/deer.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-deer-request',
  templateUrl: './deer-request.component.html',
  styleUrls: ['./deer-request.component.scss']
})
export class DeerRequestComponent implements OnInit {
    nonAcceptedFileType: boolean = true;
	uploadServerError: boolean = true;
    selectedFile!: File;
	loading: boolean = false;
	errorMessage: string | undefined;
	updatedPhoto: boolean = false;

    gebvValidLength: boolean = true;

    maxDate!: Date;

    profileImage: File | undefined;
    extraPhotos: File[] = [];
    video: File | undefined;

    deerId: string = '';

    registrationForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(1)]),
        nadr: new FormControl('', [Validators.required, Validators.minLength(1)]),
        dob: new FormControl('', Validators.required),
        gebu: new FormControl('', [Validators.required]),
        codon: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern('[A-Z]+')]),
        sciScore: new FormControl('', [Validators.required, Validators.minLength(1)]),
        semenAvailable: new FormControl(true, Validators.required),
        semenCost: new FormControl(0, [Validators.required]),
        ranchId: new FormControl('', [Validators.required]),
        videoLink: new FormControl(''),
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


      stepperOrientation: Observable<StepperOrientation>;

      constructor(
        breakpointObserver: BreakpointObserver,
        public deerService: DeerService,
        private router: Router,
        private tokenStorage: TokenStorageService,
        ) {
        const currentDate = new Date();
        this.maxDate = currentDate;
        this.stepperOrientation = breakpointObserver
          .observe('(min-width: 800px)')
          .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      }

  ngOnInit(): void {
    this.registrationForm.controls['ranchId'].setValue(this.tokenStorage.getUser().id);
    
    this.registrationForm.controls['gebu'].valueChanges.pipe(debounceTime(400),distinctUntilChanged()).subscribe(() => this.checkGebvLength());
  }

  checkGebvLength(): void {
    if(this.registrationForm.controls['gebu'].value != null ||  this.registrationForm.controls['gebu'].value != undefined){
        this.gebvValidLength = false;
        let currentValue: string = this.registrationForm.controls['gebu'].value.toString();

        if(currentValue.includes('-')){
            if(currentValue.length > 9){
                this.registrationForm.controls['gebu'].setValue(Number(currentValue.substring(0,9)));
                this.gebvValidLength = true;
            } else if (currentValue.length == 9){
                this.gebvValidLength = true;
            } else {
                this.gebvValidLength = false;
            }
        } else {
            if(currentValue.length > 8){
                this.registrationForm.controls['gebu'].setValue(Number(currentValue.substring(0,8)));
                this.gebvValidLength = true;
            } else if (currentValue.length == 8){
                this.gebvValidLength = true;
            } else {
                this.gebvValidLength = false;

            }
        }
    }
  }

  selectFile(event: any, mediaType: string): void {
    this.nonAcceptedFileType = false;
    this.uploadServerError = false;
    var file = event.target.files[0];;
    let isAllowedFileExt: boolean = false;
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase() || undefined;

    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            isAllowedFileExt = true;
            break;
        default:
            alert('Non-Accepted File Type');
    }

    if (isAllowedFileExt) {
        this.selectedFile = event.target.files[0];
        switch(mediaType) {
            case 'ProfileImage': {
                console.log('profile');
                this.profileImage = this.selectedFile;
               break;
            }
            case 'Photo': {
                console.log('img');
                if(this.extraPhotos.length < 3) {
                    this.extraPhotos.push(this.selectedFile);
                } else {
                    this.extraPhotos.shift();
                    this.extraPhotos.push(this.selectedFile);
                }
               break;
            }
            case 'Video': {
                this.video = this.selectedFile;
                break;
             }
            default:
             break;
        }
    } else {
        this.nonAcceptedFileType = true;
    }
}

submitAddDeer(): void {
    this.loading = true;
    let deer: Deer = this.registrationForm.getRawValue();
    deer.semenCost = deer.semenCost.toString();
    deer.deerFamily = this.pedigreeForm.getRawValue();

    this.deerService.post(['Request-Listing'], deer).subscribe(response => {
        next:   this.deerId = response.id;
                this.uploadFiles();
    });

}

uploadFiles(): void {
    if(this.profileImage != undefined) {
        this.loading = true;
        this.deerService.uploadFile(this.profileImage, this.deerId).subscribe(() => {
            complete:   this.updatedPhoto = true;
                        if(this.extraPhotos.length > 0){
                            this.uploadExtraImages();
                        } else {
                            this.router.navigate(['deer-request-confirmation']);
                        }
            error: this.errorMessage = 'Failed to Update Photo';
        });
    }
    // this.loading = true;
    // this.serviceProviderService.uploadFile(this.selectedFile, this.userService.getUser().id).subscribe(() => {
    //     this.updatedPhoto = true;
    //     this.loading = false;
    // }, () => this.errorMessage = 'Failed to Update Photo');
    }

    uploadExtraImages(): void {
        let extraPhotosCount = this.extraPhotos.length;
        let uploadCount = 0;

        this.extraPhotos.forEach(element => {
            this.loading = true;
            this.deerService.uploadExtraMedia(element, this.deerId).subscribe((response) => {
                    next:   uploadCount++;
                            this.updatedPhoto = true;
                    complete: if(uploadCount == extraPhotosCount){
                        this.loading = false;
                        this.router.navigate(['deer-request-confirmation']);
                    }
                    error: this.errorMessage = 'Failed to Update Photo';
            });
        });
    }
}

