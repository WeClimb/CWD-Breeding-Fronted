import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deer-submission-confirmation',
  templateUrl: './deer-submission-confirmation.component.html',
  styleUrls: ['./deer-submission-confirmation.component.scss']
})
export class DeerSubmissionConfirmationComponent {

  constructor(
    private router: Router
  ) { }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }


}
