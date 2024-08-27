import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeerService } from 'src/app/services/deer.service';
import { Deer } from 'src/models/deer.model';

@Component({
  selector: 'app-deer-edit-dialog',
  templateUrl: './deer-edit-dialog.component.html',
  styleUrls: ['./deer-edit-dialog.component.scss']
})
export class DeerEditDialogComponent implements OnInit {
  deer!: Deer;
  loading: boolean = false;

  registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nadr: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    gebv: new FormControl('', [Validators.required,]),
    codon: new FormControl('', [Validators.required]),
    embryosAvailable: new FormControl(false, Validators.required), // New field
    embryosCost: new FormControl({ value: 0, disabled: true }, [Validators.required]), // New field
    gender: new FormControl('', Validators.required), // New field
    sciScore: new FormControl('', [Validators.required]),
    semenAvailable: new FormControl(true, Validators.required),
    semenCost: new FormControl(0, [Validators.required]),
    ranchId: new FormControl('', [Validators.required]),
    profileImage: new FormControl(''),
    isPaid: new FormControl(false),
    paidDate: new FormControl(''),
    createDate: new FormControl(''),
    updateDate: new FormControl(''),
    videoLink: new FormControl(''),
    denialReason: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deerService: DeerService,
    private dialog: MatDialogRef<DeerEditDialogComponent>
    ) { }

  ngOnInit() {
    this.deer = this.data.deer;
    this.mapDeerToForm();
  }

  mapDeerToForm() {
    this.registrationForm.controls['name'].setValue(this.deer.name);
    this.registrationForm.controls['nadr'].setValue(this.deer.nadr);
    this.registrationForm.controls['dob'].setValue(this.deer.dob);
    this.registrationForm.controls['gebv'].setValue(this.deer.gebv);
    this.registrationForm.controls['codon'].setValue(this.deer.codon);
    this.registrationForm.controls['sciScore'].setValue(this.deer.sciScore);
    this.registrationForm.controls['gender'].setValue(this.deer.gender); // New field
    this.registrationForm.controls['semenAvailable'].setValue(this.deer.semenAvailable);
    this.registrationForm.controls['semenCost'].setValue(this.deer.semenCost);
    this.registrationForm.controls['embryosAvailable'].setValue(this.deer.embryosAvailable); // New field
    this.registrationForm.controls['embryosCost'].setValue(this.deer.embryosCost); // New field
    this.registrationForm.controls['ranchId'].setValue(this.deer.ranchId);
    this.registrationForm.controls['profileImage'].setValue(this.deer.profileImage);
    this.registrationForm.controls['videoLink'].setValue(this.deer.videoLink);
    this.registrationForm.controls['denialReason'].setValue(this.deer.denialReason);
    this.registrationForm.controls['description'].setValue(this.deer.description);
    this.registrationForm.controls['status'].setValue(this.deer.status); // Added this field
    this.registrationForm.controls['isPaid'].setValue(this.deer.isPaid);
    this.registrationForm.controls['paidDate'].setValue(this.deer.paidDate);
    this.registrationForm.controls['createDate'].setValue(this.deer.createDate);
    this.registrationForm.controls['updateDate'].setValue(this.deer.updateDate);
    this.registrationForm.controls['gender'].valueChanges.subscribe(() => this.onGenderChange());
    this.onGenderChange(); // Update field state based on gender
  }

  acceptChanges(): void {
    this.loading = true;
    let deer: Deer = this.registrationForm.getRawValue();
    deer.semenCost = deer.semenCost.toString();
    deer.deerFamily = this.deer.deerFamily;

    this.deerService.put([this.deer.id], deer).subscribe(() => {
      complete: this.dialog.close()
                this.loading = false;
    });
  }

  deleteDeer(): void {
    this.loading = true;
    let deer: Deer = this.registrationForm.getRawValue();
    deer.semenCost = deer.semenCost.toString();
    deer.deerFamily = this.deer.deerFamily;
    deer.status = 'DELETED';

    this.deerService.put([this.deer.id], deer).subscribe(() => {
      complete: this.dialog.close()
                this.loading = false;
    });
  }

  cancelDelete(): void {
    this.loading = true;
    let deer: Deer = this.registrationForm.getRawValue();
    deer.semenCost = deer.semenCost.toString();
    deer.deerFamily = this.deer.deerFamily;
    deer.status = 'ACTIVE';

    this.deerService.put([this.deer.id], deer).subscribe(() => {
      complete: this.dialog.close()
                this.loading = false;
    });
  }

  onGenderChange() {
    const gender = this.registrationForm.controls['gender'].value;
    if (gender === 'Buck') {
      this.registrationForm.controls['semenAvailable'].enable();
      this.registrationForm.controls['semenCost'].enable();
      this.registrationForm.controls['sciScore'].enable();
      this.registrationForm.controls['embryosAvailable'].disable();
      this.registrationForm.controls['embryosCost'].disable();
    } else if (gender === 'Doe') {
      this.registrationForm.controls['semenAvailable'].disable();
      this.registrationForm.controls['semenCost'].disable();
      this.registrationForm.controls['embryosAvailable'].enable();
      this.registrationForm.controls['embryosCost'].enable();
      this.registrationForm.controls['sciScore'].disable();
    }
  }



}
