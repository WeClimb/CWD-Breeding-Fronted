import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeerService } from 'src/app/services/deer.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { Deer } from 'src/models/deer.model';

@Component({
  selector: 'app-pending-reviews',
  templateUrl: './pending-reviews.component.html',
  styleUrls: ['./pending-reviews.component.scss']
})
export class PendingReviewsComponent implements OnInit {

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

  navToDeerRequest(id: string): void {
    this.router.navigate(['Deer-Profile-Review/' + id]);
  }

}
