import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RanchService } from 'src/app/services/ranch.service';
import { SuccessDialogComponent } from '../SuccessDialog/SuccessDialog.component';
import { AdminRanchCreateModel } from 'src/models/admin-ranch-create.model';
import { EMAIL_REGEX } from 'src/app/utils/regex/email-regex.constant';
import { STATES } from 'src/app/utils/constants/states.constants';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { AdminChangePasswordComponent } from '../../admin-change-password/admin-change-password.component';

@Component({
  selector: 'app-add-ranch-dialog',
  templateUrl: './add-ranch-dialog.component.html',
  styleUrls: ['./add-ranch-dialog.component.scss']
})
export class AddRanchDialogComponent implements OnInit {
  ranchForm!: FormGroup;
  loading = false;

  states: string[] = STATES;

  constructor(
    private fb: FormBuilder,
    private ranchService: RanchService,
    private dialog: MatDialog,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if(this.tokenStorage.getUser().loginType.toLocaleLowerCase() !== 'admin'){
      this.router.navigate(['home']);
    }

    this.ranchForm = this.fb.group({
      ownerFirstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      OwnerlastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX),]),
      city: new FormControl('', [Validators.required, Validators.minLength(1)]),
      state: new FormControl('', [Validators.required]),
      address: new FormControl('',[Validators.required, Validators.minLength(1)] ),
      zipcode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      phoneNumber: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      website: new FormControl(''),
    });
  }

  selectState(e: any): void {
    this.ranchForm.controls['state'].setValue(e.target.value, {
        onlySelf: true,
    });
}

closeDialog(): void {
    this.dialog.closeAll();
}

  onSubmit() {
    this.loading = true;
    if (this.ranchForm.valid) {
      const ranchData = this.ranchForm.value;

      this.ranchService.post(['Admin-Create'], ranchData).subscribe((adminCreateModel: AdminRanchCreateModel) => {
        this.loading = false;

        if(adminCreateModel.ranchId && adminCreateModel.changePasswordId) {
          this.dialog.open(AdminChangePasswordComponent, {
            width: '400px',
            disableClose: true,
            data: { adminCreateModel: adminCreateModel }
          });
        }
      });
    }
  }
}
