import { PasswordReset } from './../../../models/password-reset.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { PASSWORD_REGEX } from 'src/app/utils/regex/password-regex.constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    changePasswordForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
        confirmPassword: new FormControl(''),
    });

    get formControls(): { [p: string]: AbstractControl } {
        return this.changePasswordForm.controls;
    }

    loading = false;
    saving = false;
    error = '';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private changePasswordService: ChangePasswordService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.changePasswordForm.setValidators(this.samePasswords(this.changePasswordForm));
        this.changePasswordForm.controls['confirmPassword'].setValidators([Validators.required, this.samePasswords(this.changePasswordForm)]);
    }

    samePasswords(formGroup: FormGroup): ValidatorFn {
        return (): ValidationErrors | null => {
            const password = formGroup.controls['password'];
            const confirmPassword = formGroup.controls['confirmPassword'];

            return password.value !== confirmPassword.value &&
                   (password.dirty && confirmPassword.dirty) &&
                   (password.value !== '' && confirmPassword.value !== '')
                ? {notSame: true}
                : null;
        };
    }

    onSubmit(): void {
        const changePasswordId = this.activatedRoute.snapshot.paramMap.get('id');

        if (changePasswordId != null) {
            this.saving = true;

            const passwordReset: PasswordReset = {
                changePasswordId: changePasswordId,
                password: this.changePasswordForm.controls['confirmPassword'].value,
            }
            console.log(passwordReset)

            this.changePasswordService
                .post([], passwordReset)
                .subscribe(() => {
                    this.snackBar.open('An email has been sent with instructions on how to reset your password.', 'Close', {
                        duration: 5000,
                    });

                    this.router.navigate(['login']);
                });
        } else {
            this.error = 'Invalid change request, try sending another link to your email.';
        }
    }

}
