import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { DeerService } from 'src/app/services/deer.service';
import { DeerImage } from 'src/models/deer-image.model';
import { AddAgeToImageComponent } from '../add-age-to-image/add-age-to-image.component';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-image-dialog',
  templateUrl: './admin-image-dialog.component.html',
  styleUrls: ['./admin-image-dialog.component.scss']
})
export class AdminImageDialogComponent implements OnInit {
  imageArray: { key: string, value: any }[] = [];
  selectedFile!: DeerImage;
  nonAcceptedFileType: boolean = false;
  uploadServerError: boolean = false;
  loading: boolean = false;

  selectedAge: number = 0; // Variable to store the selected age

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminImageDialogComponent>,
    public deerService: DeerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.imageArray = this.imageMapToArray(this.data.imageMap);
  }

  imageMapToArray(imageMap: Map<string, any>): { key: string, value: any }[] {
    return Array.from(imageMap, ([key, value]) => ({ key, value }));
  }

  removeImage(image: any): void {
    this.deerService.post(['remove-image'], {}, new Map<string, any>([['deerId', this.data.deerId], ['imageUrl', image.key]])).subscribe((response) => {
      this.imageArray = this.imageArray.filter((img) => img.key !== image.key);
    });
  }
  

  saveImageChange(image: any): void {
    const queryParams = new Map<string, any>();
    queryParams.set('deerId', this.data.deerId);
    queryParams.set('url', image.key);
    queryParams.set('newAge', image.value);

    if(image.key == this.data.profileImage) {
      queryParams.set('isProfileImage', true);
    } else {
      queryParams.set('isProfileImage', false);
    }
    
   this.deerService.post(['update-image-age'], {}, queryParams).subscribe((response) => {
      console.log(response);
    });
}
  

  swapProfileImage(image: string): void {
    console.log('swapProfileImage', image);
    const imageMap = new Map<string, any>();
    imageMap.set('deerId', this.data.deerId);
    imageMap.set('profileImageUrl', this.data.profileImage);
    imageMap.set('imageUrl', image);
    
    this.deerService.post(['swap-profile-image'], {} ,imageMap).subscribe((response) => {
      this.dialogRef.close();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openDeerFileAgeDialog(event: any, mediaType: string): void {
    let deerImage: DeerImage = new DeerImage();
    deerImage.file = event.target.files[0];
    deerImage.mediaType = mediaType;
    
    const dialogRef = this.dialog.open(AddAgeToImageComponent, {
      data: { deerImage: deerImage },
      disableClose: true,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectFile(deerImage);
    });
  }

selectFile(deerImage: DeerImage): void {
    this.nonAcceptedFileType = false;
    this.uploadServerError = false;

    var file = deerImage.file;
    let isAllowedFileExt: boolean = false;
    const ext =
        file.name
            .substring(file.name.lastIndexOf('.') + 1, file.name.length)
            .toLocaleLowerCase() || undefined;

    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            isAllowedFileExt = true;
            break;
        default:
            alert('Non-Accepted File Type');
    }

    if (isAllowedFileExt) {
        this.selectedFile = deerImage;
        this.addExtraImage(this.selectedFile);
    } else {
        this.nonAcceptedFileType = true;
    }
}

  public addExtraImage(selectedFile: DeerImage) {
    this.loading = true;
    this.deerService.uploadExtraMedia(selectedFile.file, this.data.deerId, selectedFile.ageOfDeerImaged).subscribe(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
  
}
