import { Client } from './../../../models/client.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    clients: Client[] = [];

    searchForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
    });

    constructor() {}

    ngOnInit() {}

    popDummy(): void {
        this.clients = [];

        const one: Client = new Client();
        one.firstName = 'John';
        one.lastName = 'Doe';
        one.ratingAverage = 5;
        one.state = 'PA';
        one.city = 'State College';
        one.reviewCount = 3;

        const two: Client = new Client();
        two.firstName = 'Jane';
        two.lastName = 'Doe';
        two.ratingAverage = 3;
        two.state = 'PA';
        two.city = 'State College';
        two.reviewCount = 1;

        const three: Client = new Client();
        three.firstName = 'Bad';
        three.lastName = 'Client';
        three.ratingAverage = 0;
        three.state = 'PA';
        three.city = 'Altoona';
        three.reviewCount = 0;

        this.clients.push(one);
        this.clients.push(two);
        this.clients.push(three);
        console.log(this.clients);
    }

    counter(i: number) {
        return new Array(i);
    }
}
