import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-confirm',
  templateUrl: './forgot-password-confirm.component.html',
  styleUrls: ['./forgot-password-confirm.component.scss']
})
export class ForgotPasswordConfirmComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }


}
