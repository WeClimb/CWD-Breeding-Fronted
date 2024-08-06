import { PasswordReset } from '../../../models/password-reset.model';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RanchService } from 'src/app/services/ranch.service';
import { PASSWORD_REGEX } from 'src/app/utils/regex/password-regex.constant';
import { AdminRanchCreateModel } from 'src/models/admin-ranch-create.model';
import { SuccessDialogComponent } from '../dialogs/SuccessDialog/SuccessDialog.component';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.scss']
})
export class AdminChangePasswordComponent implements OnInit {

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
        private ranchService: RanchService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: { adminCreateModel: AdminRanchCreateModel }

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
        const changePasswordId = this.data.adminCreateModel.changePasswordId;

        if (changePasswordId != null) {
            this.saving = true;

            const passwordReset: PasswordReset = {
                changePasswordId: changePasswordId,
                password: this.changePasswordForm.controls['confirmPassword'].value,
            }

            this.ranchService
                .post(['Admin-Change-Password'], passwordReset)
                .subscribe(() => {
                    this.saving = false;
                    this.openSuccessDialogAndRoute();
                });
        } else {
            this.error = 'Invalid change request, try sending another link to your email.';
        }
    }

    openSuccessDialogAndRoute(): void {
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '400px',
          data: { message: 'Ranch created successfully, routing to profile' }
        });
      
        dialogRef.afterOpened().subscribe(() => {
          setTimeout(() => {
            this.dialog.closeAll();
            this.router.navigate(['ranch-profile', this.data.adminCreateModel.ranchId]);
          }, 2000);
        });
    }
}
