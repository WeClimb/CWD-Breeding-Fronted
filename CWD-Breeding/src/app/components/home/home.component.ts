import { Client } from './../../../models/client.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    constructor(
        private router: Router,
    ) {}

    ngOnInit() {}

    navigateToAddDeer(): void {
        this.router.navigate(['request-deer-listing']);
    }
}
