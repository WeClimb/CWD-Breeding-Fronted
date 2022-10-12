import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeerService } from 'src/app/services/deer.service';
import { Deer } from 'src/models/deer.model';
import { DeerEditDialogComponent } from './Dialogs/deer-edit-dialog/deer-edit-dialog.component';

@Component({
  selector: 'app-admin-deer-prodile-review',
  templateUrl: './admin-deer-prodile-review.component.html',
  styleUrls: ['./admin-deer-prodile-review.component.scss']
})
export class AdminDeerProdileReviewComponent implements OnInit {
  id!: string;
  deer!: Deer;

  loadingDeny: boolean = false;

  profileImage!: any;
  
  videoLink!: any;
  validVideo: boolean = false;

  denying: boolean = false;

  denialForm = new FormGroup({
    denialReason: new FormControl(''),
});

  constructor(
      private route: ActivatedRoute,
      private deerService: DeerService,
      private router: Router,
      public dialog: MatDialog,
      public santizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.id = x['id'];
    });

    this.getDeer();
}

getDeer() {
  let map = new Map();
  this.deerService.get([this.id], map).subscribe(response => {
      complete: this.deer = response;
                  if(this.deer.videoLink != null && this.deer.videoLink != undefined && this.deer.videoLink != ''){
                      this.videoLink = this.deer.videoLink.replace('/watch?v=', '/embed/')
                      this.videoLink = this.santizer.bypassSecurityTrustResourceUrl(this.videoLink);
                      this.validVideo = true;
                  }
                  
  });
}
getProfileImage(): void {
  let map = new Map();
  this.deerService.get([this.id, 'ProfileImage'], map).subscribe(response => {
      complete: this.profileImage = response.data.imageData;
  });
}


approve(): void {
  this.deer.isApproved = true;
  this.deerService.put([this.id], (this.deer)).subscribe(() => {
    complete: this.router.navigate(['admin-home']);
  });
}

deny(): void {
  this.loadingDeny = true;
  this.deer.isApproved = false;
  this.deer.denialReason = this.denialForm.controls['denialReason'].value;
  this.deerService.put(["Denied"] , (this.deer)).subscribe(() => {
    complete: this.router.navigate(['admin-home']);
  });
}

openDenialInput(): void {
  this.denying = true;
}

openEditDeerDialog(): void {
  const dialogRef = this.dialog.open(DeerEditDialogComponent, {
    data: {
      deer: this.deer,
    },
  });

  dialogRef.afterClosed().subscribe(() => {
    complete: this.getDeer();
  });
}

}
