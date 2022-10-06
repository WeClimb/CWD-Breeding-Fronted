import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { AUTH_TOKEN, ME } from 'src/app/utils/constants/storage-keys.constant';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

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
        private loginService: LoginService,
        private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
}
  
  onSubmit(): void {
    this.loading = true;
    this.isLoginFailed = false;
    this.errorMessage = '';

    const username = this.loginForm.controls['emailAddress'].value;
    const password = this.loginForm.controls['password'].value;
    const basic = btoa(`${username}:${password}`);

    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(ME);

    let observable = this.loginService
        .userLogin(basic)
        .subscribe({
            next: (response) => {
              response = JSON.parse(response);
              this.loading = false;
              this.isLoginFailed = false;
              this.tokenStorage.saveToken(response.token);
              this.tokenStorage.saveUser(response);
              this.router.navigate([this.return + '/admin-home']);
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
