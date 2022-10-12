import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Deer } from 'src/models/deer.model';
import { DeerService } from 'src/app/services/deer.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token_storage.service';

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

    profileImage: File | undefined;
    extraPhotos: File[] = [];
    video: File | undefined;

    deerId: string = '';

    registrationForm = new FormGroup({
        name: new FormControl('', Validators.required),
        nadr: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required),
        gebu: new FormControl('', [Validators.required,]),
        codon: new FormControl('', [Validators.required]),
        sciScore: new FormControl('', [Validators.required]),
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
        this.stepperOrientation = breakpointObserver
          .observe('(min-width: 800px)')
          .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      }

  ngOnInit(): void {
    this.registrationForm.controls['ranchId'].setValue(this.tokenStorage.getUser().id);
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
                this.profileImage = this.selectedFile;
               break;
            }
            case 'Photo': {
                if(this.extraPhotos.length < 3) {
                    this.extraPhotos.push(this.selectedFile);
                } else {
                    this.extraPhotos[0] = this.selectedFile;
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
    let deer: Deer = this.registrationForm.getRawValue();
    deer.semenCost = deer.semenCost.toString();
    deer.deerFamily = this.pedigreeForm.getRawValue();

    this.deerService.post(['Request-Listing'], deer).subscribe(response => {
        complete:   console.log(response);
        this.deerId = response.id;
                    this.uploadFiles();
                    this.router.navigate(['home']);
    });

}

uploadFiles(): void {
    if(this.profileImage != undefined) {
        this.loading = true;
        this.deerService.uploadFile(this.selectedFile, this.deerId).subscribe(() => {
        complete:   this.updatedPhoto = true;
                    this.loading = false;
        error: this.errorMessage = 'Failed to Update Photo';
    });
    }
    if(this.extraPhotos.length != 0){
        this.extraPhotos.forEach(photoFile => {
            console.log('You Uploaded an extra photo')
        });
    }

    if(this.video != undefined) {
        console.log('You Uploaded an Video')
    }
    // this.loading = true;
    // this.serviceProviderService.uploadFile(this.selectedFile, this.userService.getUser().id).subscribe(() => {
    //     this.updatedPhoto = true;
    //     this.loading = false;
    // }, () => this.errorMessage = 'Failed to Update Photo');
    }
}

