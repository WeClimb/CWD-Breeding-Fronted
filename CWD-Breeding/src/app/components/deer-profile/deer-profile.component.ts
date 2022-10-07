import { DeerService } from './../../services/deer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Deer } from 'src/models/deer.model';

@Component({
  selector: 'app-deer-profile',
  templateUrl: './deer-profile.component.html',
  styleUrls: ['./deer-profile.component.scss']
})
export class DeerProfileComponent implements OnInit {
    id!: string;
    deer!: Deer;

    constructor(
        private route: ActivatedRoute,
        private deerService: DeerService,
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
        });
    }
}
