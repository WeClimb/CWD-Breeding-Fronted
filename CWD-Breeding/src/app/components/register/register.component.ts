import { TokenStorageService } from './../../services/token_storage.service';
import { ServiceProviderService } from './../../services/service-provider.service';
import { LETTERS_ONLY_REGEX } from './../../utils/regex/letters-only-regex.constants';
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

    registrationForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.pattern(EMAIL_REGEX),
        ]),
        city: new FormControl('', [
            Validators.required,
        ]),
        state: new FormControl('', [
            Validators.required
        ]),
    });

    states: string[] = STATES;

    constructor(
        private serviceProviderService: ServiceProviderService,
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
        this.serviceProviderService
            .post([], this.registrationForm.getRawValue())
            .subscribe({
                next: () => {
                    this.loading = false
                },
                error: () => {
                    this.loading = false;
                },
                complete: () => {
                    this.router.navigate(['registration-confirm']);
                }
            });
    }
}
