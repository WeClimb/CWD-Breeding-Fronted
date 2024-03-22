import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeerService } from 'src/app/services/deer.service';
import { Deer } from 'src/models/deer.model';
import { ImageDialogComponent } from '../dialogs/image-dialog/image-dialog.component';
import { DeerEditDialogComponent } from '../admin-deer-prodile-review/Dialogs/deer-edit-dialog/deer-edit-dialog.component';
import { AdminImageDialogComponent } from '../dialogs/admin-image-dialog/admin-image-dialog.component';

@Component({
  selector: 'app-edit-deer',
  templateUrl: './edit-deer.component.html',
  styleUrls: ['./edit-deer.component.scss']
})
export class DeerEditComponent implements OnInit {
  id!: string;
  deer!: Deer;
  form: FormGroup;

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
  public santizer: DomSanitizer,
  private fb: FormBuilder // Inject the FormBuilder
) { 
  this.imageMap = new Map<string, number>();
  this.form = this.fb.group({
    levelOneSire: [''],
    levelOneDam: [''],
    levelTwoSireA: [''],
    levelTwoDamA: [''],
    levelTwoSireB: [''],
    levelTwoDamB: [''],
    levelThreeSireA: [''],
    levelThreeDamA: [''],
    levelThreeSireB: [''],
    levelThreeDamB: [''],
    levelThreeSireC: [''],
    levelThreeDamC: [''],
    levelThreeSireD: [''],
    levelThreeDamD: [''],
  });
}

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
  this.deerService.get([this.id], map).subscribe((response: Deer) => {
    this.deer = response;
    this.profileImage = this.deer.profileImage;
    this.imageMap.set(this.profileImage,this.deer.ageOfBuckDisplayed);
    this.getImages();
    this.deer.age = Math.floor(this.deer.age);
    if(this.deer.videoLink != null && this.deer.videoLink != undefined && this.deer.videoLink != ''){
      this.videoLink = this.deer.videoLink.replace('/watch?v=', '/embed/')
      this.videoLink = this.santizer.bypassSecurityTrustResourceUrl(this.videoLink);
      this.validVideo = true;
    }
    this.loadingImages = false;

    // Set form values here
    this.form.patchValue({
      levelOneSire: this.deer.deerFamily.levelOneSire,
      levelOneDam: this.deer.deerFamily.levelOneDam,
      levelTwoSireA: this.deer.deerFamily.levelTwoSireA,
      levelTwoDamA: this.deer.deerFamily.levelTwoDamA,
      levelTwoSireB: this.deer.deerFamily.levelTwoSireB,
      levelTwoDamB: this.deer.deerFamily.levelTwoDamB,
      levelThreeSireA: this.deer.deerFamily.levelThreeSireA,
      levelThreeDamA: this.deer.deerFamily.levelThreeDamA,
      levelThreeSireB: this.deer.deerFamily.levelThreeSireB,
      levelThreeDamB: this.deer.deerFamily.levelThreeDamB,
      levelThreeSireC: this.deer.deerFamily.levelThreeSireC,
      levelThreeDamC: this.deer.deerFamily.levelThreeDamC,
      levelThreeSireD: this.deer.deerFamily.levelThreeSireD,
      levelThreeDamD: this.deer.deerFamily.levelThreeDamD,
    });
  });
}

savePedigree() {
  this.deerService.put([this.deer.id, 'Pedigree'], this.form.getRawValue()).subscribe(() => {
    complete: this.getDeer();
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
    if (response.data !== null) {
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          console.log(response.data)
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
    complete: 
    this.loadingApproval = false;
    this.getDeer();

  });
}

deny(): void {
  this.loadingDeny = true;
  this.deer.isApproved = false;
  this.deer.denialReason = this.denialForm.controls['denialReason'].value;
  this.deerService.put(["Denied"] , (this.deer)).subscribe(() => {
    complete: 
    this.loadingDeny = false;
    this.denying = false;
    this.getDeer();
  });
}

routeToAdminHome(): void {
  this.router.navigate(['admin-home']);
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
    location.reload();
  });
}

openImageViewer(): void {
  this.dialog.open(ImageDialogComponent, {
    data: {
      image: this.profileImage,
    },
  });
}

openEditImages(): void {
  this.dialog.open(AdminImageDialogComponent, {
    disableClose: true,
    data: {
      deerId: this.id,
      imageMap: this.imageMap,
      profileImage: this.deer.profileImage,
    },
  });

  this.dialog.afterAllClosed.subscribe(() => {
    console.log('Dialog closed');
    this.getDeer();
  });

}

}
