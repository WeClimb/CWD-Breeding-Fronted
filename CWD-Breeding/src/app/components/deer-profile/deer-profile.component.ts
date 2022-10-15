import { DeerService } from './../../services/deer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Deer } from 'src/models/deer.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-deer-profile',
  templateUrl: './deer-profile.component.html',
  styleUrls: ['./deer-profile.component.scss']
})
export class DeerProfileComponent implements OnInit {
    id!: string;
    deer!: Deer;

    profileImage!: any;
    images: any[] = [];

    loadingImages: boolean = false;

    currentImageIndex: number = 0;
    maxIndex: number = 0;
    
    videoLink!: any;
    validVideo: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private deerService: DeerService,
        public santizer: DomSanitizer
    ) {}

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
    this.loadingImages = true;
    let map = new Map();
    this.deerService.get([this.id, 'ProfileImage'], map).subscribe(response => {
        complete: this.images[0] = response.data.imageData;
                  this.profileImage = this.images[0];
                  this.getImages();
                  this.loadingImages = false;
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

  
  }
  