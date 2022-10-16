import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RanchService } from 'src/app/services/ranch.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { EMAIL_REGEX } from 'src/app/utils/regex/email-regex.constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loading = false;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX),]),
});

  constructor(
    private ranchService: RanchService,
    private tokenStorageService: TokenStorageService,
    private router: Router  
    ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    let map = new Map();
    map.set('email', this.forgotPasswordForm.controls['email'].value)
    this.loading = true;
    this.ranchService
        .post(['forgot-password'], {}, map )
        .subscribe(response => {      
            complete: 
                this.router.navigate(['confirm-forgot-password']);
            
        });
}
}
