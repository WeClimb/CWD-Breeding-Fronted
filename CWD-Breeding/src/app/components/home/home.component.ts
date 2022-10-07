import { Client } from './../../../models/client.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { DeerService } from 'src/app/services/deer.service';
import { Deer } from 'src/models/deer.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    deer: Deer[] = [];

    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService,
        private deerService: DeerService,
    ) {}

    ngOnInit() {
        this.getListedDeer();
    }

    getListedDeer() : void {
        let map = new Map();
        map.set('isApproved', true)
        this.deerService.getAll(['all'],map).subscribe(response => {
            complete: this.deer = response;
    });
    }

    navigateToAddDeer(): void {
        this.router.navigate(['request-deer-listing']);
    }

    navigateToDeerProfile(deer: Deer): void {
        this.router.navigate(['deer-profile/' + deer.id], {state: {data: {deer}}});
    }
}

