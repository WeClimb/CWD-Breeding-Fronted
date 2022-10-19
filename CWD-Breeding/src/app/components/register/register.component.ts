import { RanchService } from './../../services/ranch.service';
import { TokenStorageService } from './../../services/token_storage.service';
import { STATES } from './../../utils/constants/states.constants';
import { EMAIL_REGEX } from './../../utils/regex/email-regex.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    loading: boolean = false;

    error = false;
    errorMessage = '';
    registrationForm = new FormGroup({
        ownerFirstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        ownerlastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX),]),
        city: new FormControl('', [Validators.required, Validators.minLength(1)]),
        state: new FormControl('', [Validators.required]),
        address: new FormControl('',[Validators.required, Validators.minLength(1)] ),
        zipcode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
        phoneNumber: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required, Validators.minLength(1)]),
        website: new FormControl(''),
    });

    states: string[] = STATES;

    constructor(
        private ranchService: RanchService,
        private tokenStorageService: TokenStorageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.tokenStorageService.clearToken();
        this.tokenStorageService.clearUser();
    }

    selectState(e: any): void {
        this.registrationForm.controls['state'].setValue(e.target.value, {
            onlySelf: true,
        });
    }

    onSubmit(): void {
        this.loading = true;
        this.ranchService
            .post([], this.registrationForm.getRawValue())
            .subscribe(response => {
                error:  this.error = true;
                        this.errorMessage = 'Failed to add ranch, check data and if account all ready exists and try again';
                
                complete: 
                    this.router.navigate(['confirm-registration']);
                
            });
    }
}
