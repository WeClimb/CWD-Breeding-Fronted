import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    FormGroup,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DeerService } from 'src/app/services/deer.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { DeerImage } from 'src/models/deer-image.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAgeToImageComponent } from '../dialogs/add-age-to-image/add-age-to-image.component';

@Component({
    selector: 'app-deer-request',
    templateUrl: './deer-request.component.html',
    styleUrls: ['./deer-request.component.scss'],
})
export class DeerRequestComponent implements OnInit {
    @Input() registrationForm!: FormGroup;
    @Input() pedigreeForm!: FormGroup;
    @Input() confirmForm!: FormGroup;
    @Input() loading!: boolean;
    @Input() currentDeerExtraImages!: DeerImage[];
    @Input() currentDeerProfileImage!: DeerImage[];

    @Output() submitDeerEvent = new EventEmitter();
    @Output() addProfileImageEvent = new EventEmitter<DeerImage>();
    @Output() addExtraImageEvent = new EventEmitter<DeerImage>();
    @Output() addDeerToQueueEvent = new EventEmitter();

    @ViewChild('stepper') stepper!: MatStepper;

    nonAcceptedFileType: boolean = true;
    uploadServerError: boolean = true;
    selectedFile!: DeerImage;
    errorMessage: string | undefined;
    updatedPhoto: boolean = false;

    gebvValidLength: boolean = true;

    maxDate!: Date;
    video: File | undefined;

    deerId: string = '';
    stepperOrientation: Observable<StepperOrientation>;

    constructor(
        breakpointObserver: BreakpointObserver,
        public deerService: DeerService,
        private tokenStorage: TokenStorageService,
        private dialog: MatDialog
    ) {
        const currentDate = new Date();
        this.maxDate = currentDate;
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    ngOnInit(): void {
        let adminRanch = this.tokenStorage.getAdminRanch();

        if(adminRanch){
            this.registrationForm.controls['ranchId'].setValue(adminRanch);
        } else {
            this.registrationForm.controls['ranchId'].setValue(this.tokenStorage.getUser().id);
        }

        this.registrationForm.controls['gebv'].valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe(() => this.checkgebvLength());

        this.registrationForm.controls['ageOfBuckDisplayed'].valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe(() => this.checkAgeOfBuckDisplayed());

        this.registrationForm.controls['codon'].valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe(() => this.upperCaseCodon());   
            
        this.registrationForm.controls['gender'].valueChanges.subscribe(value => this.onGenderChange());
    }

    onGenderChange(): void {

        const gender: string = this.registrationForm.controls['gender'].value;

        if (gender === 'Buck') {
            this.registrationForm.controls['semenAvailable'].enable();
            this.registrationForm.controls['semenCost'].enable();
            this.registrationForm.controls['sciScore'].enable();
            this.registrationForm.controls['embryosAvailable'].disable();
            this.registrationForm.controls['embryosCost'].disable();
        } else if (gender === 'Doe') {
            this.registrationForm.controls['semenAvailable'].disable();
            this.registrationForm.controls['semenCost'].disable();
            this.registrationForm.controls['embryosAvailable'].enable();
            this.registrationForm.controls['embryosCost'].enable();
            this.registrationForm.controls['sciScore'].disable();
        }
    }


    upperCaseCodon(): void {
        this.registrationForm.get('codon')!.valueChanges.subscribe((value) => {
            if (value) {
                this.registrationForm
                    .get('codon')!
                    .setValue(value.toUpperCase(), { emitEvent: false });
            }
        });
    }

    checkgebvLength(): void {
        if (
            this.registrationForm.controls['gebv'].value != null ||
            this.registrationForm.controls['gebv'].value != undefined
        ) {
            this.gebvValidLength = false;
            let currentValue: string =
                this.registrationForm.controls['gebv'].value.toString();

            if (currentValue.includes('-')) {
                if (currentValue.length > 9) {
                    this.registrationForm.controls['gebv'].setValue(
                        Number(currentValue.substring(0, 9))
                    );
                    this.gebvValidLength = true;
                } else if (currentValue.length == 9) {
                    this.gebvValidLength = true;
                } else {
                    this.gebvValidLength = false;
                }
            } else {
                if (currentValue.length > 8) {
                    this.registrationForm.controls['gebv'].setValue(
                        Number(currentValue.substring(0, 8))
                    );
                    this.gebvValidLength = true;
                } else if (currentValue.length == 8) {
                    this.gebvValidLength = true;
                } else {
                    this.gebvValidLength = false;
                }
            }
        }
    }

    checkAgeOfBuckDisplayed(): void {
        if (
            this.registrationForm.controls['ageOfBuckDisplayed'].value !=
                null ||
            this.registrationForm.controls['ageOfBuckDisplayed'].value !=
                undefined
        ) {
            let currentValue: string =
                this.registrationForm.controls[
                    'ageOfBuckDisplayed'
                ].value.toString();

            if (currentValue.includes('.')) {
                currentValue = currentValue.substring(
                    0,
                    currentValue.indexOf('.')
                );
            }

            if (currentValue.length > 3) {
                currentValue = currentValue.substring(0, 2);
            }

            let currentNumber = Number(currentValue);

            if (currentNumber > 100) {
                currentNumber = 100;
            }

            if (currentNumber < 0) {
                currentNumber = 0;
            }

            this.registrationForm.controls['ageOfBuckDisplayed'].setValue(
                currentNumber
            );
        }
    }

    openDeerFileAgeDialog(event: any, mediaType: string): void {
        let deerImage: DeerImage = new DeerImage();
        deerImage.file = event.target.files[0];
        deerImage.mediaType = mediaType;
        
        const dialogRef = this.dialog.open(AddAgeToImageComponent, {
          data: { deerImage: deerImage },
          disableClose: true,
          width: '400px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.selectFile(deerImage);
        });
      }

    selectFile(deerImage: DeerImage): void {
        this.nonAcceptedFileType = false;
        this.uploadServerError = false;
    
        var file = deerImage.file;
        let isAllowedFileExt: boolean = false;
        const ext =
            file.name
                .substring(file.name.lastIndexOf('.') + 1, file.name.length)
                .toLocaleLowerCase() || undefined;
    
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
            this.selectedFile = deerImage;
            switch (deerImage.mediaType) {
                case 'ProfileImage': {
                    this.addProfileImage(this.selectedFile);
                    break;
                }
                case 'Photo': {
                    this.addExtraImage(this.selectedFile);
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
        this.submitDeerEvent.emit();
    }

    addProfileImage(file: DeerImage): void {
        this.addProfileImageEvent.emit(file);
    }

    addExtraImage(file: DeerImage): void {
        this.addExtraImageEvent.emit(file);
    }

    addDeerToQueue(): void {
        this.addDeerToQueueEvent.emit();
    }

    returnToBeginningOfForm(): void {
        this.stepper.selectedIndex = 0;
    }
}
