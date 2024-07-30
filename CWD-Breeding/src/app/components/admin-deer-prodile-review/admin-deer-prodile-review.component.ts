import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeerService } from 'src/app/services/deer.service';
import { Deer } from 'src/models/deer.model';
import { ImageDialogComponent } from '../dialogs/image-dialog/image-dialog.component';
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
  images: string[] = [];

  loadingImages: boolean = false;
  
  videoLink!: any;
  validVideo: boolean = false;

  denying: boolean = false;

  imageMap: Map<string, number>;

  denialForm = new FormGroup({
    denialReason: new FormControl(''),
});

  constructor(
      private route: ActivatedRoute,
      private deerService: DeerService,
      private router: Router,
      public dialog: MatDialog,
      public santizer: DomSanitizer
  ) { this.imageMap = new Map<string, number>() }

  ngOnInit(): void {
    this.setToTop();
    this.route.params.subscribe(x => {
      this.id = x['id'];
    });

    this.getDeer();
}

setToTop() {
  window.onload = function() {
    document.getElementById("scrollId")!.focus();
};
  const element = document.querySelector('#scrollId');
  if(element != null){
    element.scrollIntoView();
  }
}

getDeer() {
    this.loadingImages = true;
    let map = new Map();
    this.deerService.get([this.id], map).subscribe(response => {
        complete: this.deer = response;
                  this.deer.gebv = response.gebv;
                  this.profileImage = this.deer.profileImage;
                  this.imageMap.set(this.profileImage,this.deer.ageOfBuckDisplayed);
                  this.getImages();
                  this.deer.age = Math.floor(this.deer.age)
                    if(this.deer.videoLink != null && this.deer.videoLink != undefined && this.deer.videoLink != ''){
                        this.videoLink = this.deer.videoLink.replace('/watch?v=', '/embed/')
                        this.videoLink = this.santizer.bypassSecurityTrustResourceUrl(this.videoLink);
                        this.validVideo = true;
                    }
                    this.loadingImages = false;
    });
  }

changeImageForward(): void {
  if(this.currentImageIndex < this.maxIndex){
    this.currentImageIndex++;
    this.profileImage = Array.from(this.imageMap.keys())[this.currentImageIndex]; 
    this.deer.ageOfBuckDisplayed = this.imageMap.get(this.profileImage) ?? 0;  
  } else {
    this.currentImageIndex = 0;
    this.profileImage = Array.from(this.imageMap.keys())[this.currentImageIndex];
    this.deer.ageOfBuckDisplayed = this.imageMap.get(this.profileImage) ?? 0;  
  }
}

changeImageBackward(): void {
  if(this.currentImageIndex == 0){
    this.currentImageIndex = this.maxIndex;
    this.profileImage = Array.from(this.imageMap.keys())[this.currentImageIndex]; 
    this.deer.ageOfBuckDisplayed = this.imageMap.get(this.profileImage) ?? 0;  
  } else {
    this.currentImageIndex--;
    this.profileImage = Array.from(this.imageMap.keys())[this.currentImageIndex]; 
    this.deer.ageOfBuckDisplayed = this.imageMap.get(this.profileImage) ?? 0;  
  }
}

// getProfileImage(): void {
//   let map = new Map();
//   this.deerService.get([this.id, 'ProfileImage'], map).subscribe(response => {
//       complete: this.images[0] = response.data.imageData;
//                 this.profileImage = this.images[0];
//                 this.getImages();
//   });
// }

getImages(): void {
  this.deerService.get([this.id, 'Images'], this.imageMap).subscribe(response => {
    console.log(response.data);
    if (response.data !== null) {
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          const element = response.data[key];
          this.maxIndex++;
          this.images.push(key);
          this.imageMap.set(key, element === undefined ? 0 : element);
        }
      }
    } 
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

openImageViewer(): void {
  this.dialog.open(ImageDialogComponent, {
    data: {
      image: this.profileImage,
    },
  });

}

}
