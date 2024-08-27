import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CWD-Breeding';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const sidenavContent = document.querySelector('mat-sidenav-content');
        if (sidenavContent) {
          sidenavContent.scrollTo(0, 0); // Instantly scroll to the top
        }
      }
    });
  }
}
