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

  currentImageIndex: number = 0;
  maxIndex: number = 0;

  loadingDeny: boolean = false;
  loadingApproval: boolean = false;

  profileImage!: any;
  images: any[] = [];

  loadingImages: boolean = false;
  
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
    this.setToTop();
    this.route.params.subscribe(x => {
      this.id = x['id'];
    });

    this.getDeer();
    this.getProfileImage();
}

setToTop() {
  const element = document.querySelector('#scrollId');
  if(element != null){
    element.scrollIntoView();
  }
}

getDeer() {
  let map = new Map();
  this.deerService.get([this.id], map).subscribe(response => {
      complete: this.deer = response;
                this.deer.age = Math.floor(this.deer.age)
                  if(this.deer.videoLink != null && this.deer.videoLink != undefined && this.deer.videoLink != ''){
                      this.videoLink = this.deer.videoLink.replace('/watch?v=', '/embed/')
                      this.videoLink = this.santizer.bypassSecurityTrustResourceUrl(this.videoLink);
                      this.validVideo = true;
                  }
                  
  });
}

changeImageForward(): void {
  if(this.currentImageIndex < this.maxIndex){
    this.currentImageIndex++;
    this.profileImage = this.images[this.currentImageIndex];
  } else {
    this.currentImageIndex = 0;
    this.profileImage = this.images[this.currentImageIndex];
  }
}

changeImageBackward(): void {
  if(this.currentImageIndex == 0){
    this.currentImageIndex = this.maxIndex;
    this.profileImage = this.images[this.currentImageIndex];
  } else {
    this.currentImageIndex--;
    this.profileImage = this.images[this.currentImageIndex];
  }
}

getProfileImage(): void {
  let map = new Map();
  this.deerService.get([this.id, 'ProfileImage'], map).subscribe(response => {
      complete: this.images[0] = response.data.imageData;
                this.profileImage = this.images[0];
                this.getImages();
  });
}

getImages(): void {
  let map = new Map();
  this.deerService.get([this.id, 'Images'], map).subscribe(response => {
      complete: response.data.forEach((element:any) => {
                this.maxIndex++;
                this.images.push(element.imageData);
      });
  });
}


approve(): void {
  this.loadingApproval = true;
  this.deer.isApproved = true;
  this.deerService.put(["Approve"], (this.deer)).subscribe(() => {
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
    height: '100%',
    width: '400px',
    data: {
      deer: this.deer,
    },
  });

  dialogRef.afterClosed().subscribe(() => {
    complete: this.getDeer();
  });
}

}
