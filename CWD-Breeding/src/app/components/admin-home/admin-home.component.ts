import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeerService } from 'src/app/services/deer.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { Deer } from 'src/models/deer.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  pendingDeer: Deer[] = [];


  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private deerService: DeerService,
    ) { }

  ngOnInit() {
    if(this.tokenStorage.getUser().loginType.toLocaleLowerCase() !== 'admin'){
      this.router.navigate(['home']);
    }

    this.getAllPendingDeer();
  }

  getAllPendingDeer(): void {
    let map = new Map();
    this.deerService.getAll(['all'],map).subscribe(response => {
      complete: this.pendingDeer = response;
    });
  }

  navToPendingReviews(): void {
    this.router.navigate(['pending-reviews']);
  }

}
