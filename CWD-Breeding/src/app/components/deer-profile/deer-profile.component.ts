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

    videoLink!: any;
    validVideo: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private deerService: DeerService,
        public santizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(x => {
          this.id = x['id'];
        });

        this.getDeer();
        this.getProfileImage();
    }

    getEmbededVideo(): void {
        // https://youtu.be/JROdAMfCxuA
        // https://www.youtube.com/watch?v=8Xfz09IJTYY
        this.videoLink.replace('youtu.be/', 'www.youtube.com/watch?v=');
        this.videoLink.replace('/watch?v=', '/embed/');
        this.videoLink = this.santizer.bypassSecurityTrustResourceUrl(this.videoLink);
    }

    getProfileImage(): void {
        let map = new Map();
        this.deerService.get([this.id, 'ProfileImage'], map).subscribe(response => {
            complete: this.profileImage = response.data.imageData;
        });
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
}
