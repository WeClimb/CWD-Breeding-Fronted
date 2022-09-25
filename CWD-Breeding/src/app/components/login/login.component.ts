import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { AUTH_TOKEN, ME } from 'src/app/utils/constants/storage-keys.constant';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        emailAddress: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    loading = false;
    isLoginFailed = false;
    errorMessage = '';
    return = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private storageService: StorageService,
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => this.return = params['return'] || '');

        if (this.storageService.getItem(AUTH_TOKEN)) {
            this.router.navigate([this.return]);
        }
    }

    onSubmit(): void {
        this.loading = true;
        this.isLoginFailed = false;
        this.errorMessage = '';

        const username = this.loginForm.controls['emailAddress'].value;
        const password = this.loginForm.controls['password'].value;
        const basic = btoa(`${username}:${password}`);

        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(ME);
        let observable = this.loginService
            .login(basic)
            .subscribe({
                next: (response) => {
                    this.storageService.setItem(AUTH_TOKEN, response);
                    this.loading = false;
                    this.router.navigate([this.return + '/home']);
                 },
                 error: (error) => {
                    this.errorMessage = "Authentication Failed";
                    this.loading = false;
                    this.isLoginFailed = true;
                 },
                 complete: () => {
                    this.loading = false;
                    observable.unsubscribe();
                 }
            });
    }
}
