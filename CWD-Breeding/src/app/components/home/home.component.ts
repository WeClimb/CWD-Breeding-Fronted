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
    loggedIn: boolean = false;
    userName: string = '';

    filterForm = new FormGroup({
        name: new FormControl(''),
        ranchName: new FormControl(''),
        age: new FormControl(),
        gebv: new FormControl(),
        codon: new FormControl(''),
        sciScore: new FormControl(),
    });

    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService,
        private deerService: DeerService,
    ) {}

    ngOnInit() {
        this.getListedDeer();
        this.loggedIn = this.isLoggedIn();
    }

    getListedDeer() : void {
        let map = new Map();
        map.set('isApproved', true);
        map.set('deerName', this.filterForm.controls['name'].value);
        map.set('ranchName', this.filterForm.controls['ranchName'].value);
        map.set('codon', this.filterForm.controls['codon'].value);

        if(this.filterForm.controls['sciScore'].value != null){
            if(this.filterForm.controls['sciScore'].value == 0) {
                this.filterForm.controls['sciScore'].setValue(null);
            } else {
                map.set('sciScore', this.filterForm.controls['sciScore'].value);
            }
        }

        if(this.filterForm.controls['age'].value != null){
            if(this.filterForm.controls['age'].value == 0) {
                this.filterForm.controls['age'].setValue(null);
            } else {
                map.set('age', this.filterForm.controls['age'].value);
            }
        }

        if(this.filterForm.controls['gebv'].value != null){
            if(this.filterForm.controls['gebv'].value == 0) {
                this.filterForm.controls['gebv'].setValue(null);
            } else {
                map.set('gebv', this.filterForm.controls['gebv'].value);
            }
        }

        this.deerService.getAll(['All-Filtered'],map).subscribe(response => {
            complete: this.deer = response;
    });
    }

    navigateToAddDeer(): void {
        this.router.navigate(['request-deer-listing']);
    }

    navigateToDeerProfile(deer: Deer): void {
        this.router.navigate(['deer-profile/' + deer.id], {state: {data: {deer}}});
    }

    isLoggedIn(): boolean {
        let user = this.tokenStorage.getUser() 
        if(user != null) {
            this.userName = user.ownerFirstName + " " + user.ownerlastName;
            return true;
        } else {
            return false;
        }
    }

    clearFilterForm(): void {
        this.filterForm.reset();
    }
}

