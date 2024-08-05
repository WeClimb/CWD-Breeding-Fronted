import { DeerService } from './../../services/deer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Deer } from 'src/models/deer.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../dialogs/image-dialog/image-dialog.component';

@Component({
  selector: 'app-deer-profile',
  templateUrl: './deer-profile.component.html',
  styleUrls: ['./deer-profile.component.scss']
})
export class DeerProfileComponent implements OnInit {
    id!: string;
    deer!: Deer;

    profileImage!: any;
    images: string[] = [];

    loadingImages: boolean = false;

    currentImageIndex: number = 0;
    maxIndex: number = 0;
    
    videoLink!: any;
    validVideo: boolean = false;

    imageMap: Map<string, number>;


    constructor(
        private route: ActivatedRoute,
        private deerService: DeerService,
        public santizer: DomSanitizer,
        public dialog: MatDialog
    ) {this.imageMap = new Map<string, number>() }

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
    this.deerService.get([this.id], map).subscribe((response) => {
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

  openImageViewer(): void {
      this.dialog.open(ImageDialogComponent, {
        data: {
          image: this.profileImage,
        },
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
  
  getImages(): void {
    this.deerService.get([this.id, 'Images'], this.imageMap).subscribe(response => {
      console.log("images", response.data);
      if (response.data !== null) {
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const element = response.data[key];
            this.maxIndex++;
            this.images.push(key);
            this.imageMap.set(key, element === undefined ? 0 : element);
            console.log(this.imageMap);
          }
        }
      } 
    });
  }
  
  }
  