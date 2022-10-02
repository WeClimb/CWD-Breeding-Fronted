import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-deer-request',
  templateUrl: './deer-request.component.html',
  styleUrls: ['./deer-request.component.scss']
})
export class DeerRequestComponent implements OnInit {

    registrationForm = new FormGroup({
        name: new FormControl('', Validators.required),
        nadr: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required),
        gebu: new FormControl('', [Validators.required,]),
        codon: new FormControl('', [Validators.required]),
        sciScore: new FormControl('', [Validators.required]),
        semenAvailable: new FormControl(true, Validators.required),
        semenCost: new FormControl('', [Validators.required]),
    });

    pedigreeForm = new FormGroup({
        deer: new FormControl('', Validators.required),
        levelOneSire: new FormControl(''),
        levelOneDam: new FormControl(''),
        levelTwoSireA: new FormControl(''),
        levelTwoSireB: new FormControl(''),
        levelTwoDamA: new FormControl(''),
        levelTwoDamB: new FormControl(''),
        levelThreeSireA: new FormControl(''),
        levelThreeSireB: new FormControl(''),
        levelThreeSireC: new FormControl(''),
        levelThreeSireD: new FormControl(''),
        levelThreeDamA: new FormControl(''),
        levelThreeDamB: new FormControl(''),
        levelThreeDamC: new FormControl(''),
        levelThreeDamD: new FormControl(''),
    });

    confirmForm = new FormGroup({
        dataCorrect: new FormControl(false, Validators.required),
    });


      stepperOrientation: Observable<StepperOrientation>;

      constructor(breakpointObserver: BreakpointObserver) {
        this.stepperOrientation = breakpointObserver
          .observe('(min-width: 800px)')
          .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      }

  ngOnInit(): void {
  }

}
