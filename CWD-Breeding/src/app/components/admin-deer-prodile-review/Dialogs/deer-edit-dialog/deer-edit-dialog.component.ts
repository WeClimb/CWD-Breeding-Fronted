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
    gebu: new FormControl('', [Validators.required,]),
    codon: new FormControl('', [Validators.required]),
    sciScore: new FormControl('', [Validators.required]),
    semenAvailable: new FormControl(true, Validators.required),
    semenCost: new FormControl(0, [Validators.required]),
    ranchId: new FormControl('', [Validators.required]),
    profileImage: new FormControl(''),
    isPaid: new FormControl(false),
    paidDate: new FormControl(''),
    videoLink: new FormControl(''),
    denialReason: new FormControl(''),
    createDate: new FormControl(''),
    description: new FormControl(''),
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
    this.registrationForm.controls['gebu'].setValue(this.deer.gebu);
    this.registrationForm.controls['codon'].setValue(this.deer.codon);
    this.registrationForm.controls['sciScore'].setValue(this.deer.sciScore);
    this.registrationForm.controls['semenAvailable'].setValue(this.deer.semenAvailable);
    this.registrationForm.controls['semenCost'].setValue(this.deer.semenCost);
    this.registrationForm.controls['ranchId'].setValue(this.deer.ranchId);
    this.registrationForm.controls['isPaid'].setValue(this.deer.isPaid);
    this.registrationForm.controls['paidDate'].setValue(this.deer.paidDate);
    this.registrationForm.controls['profileImage'].setValue(this.deer.profileImage);
    this.registrationForm.controls['videoLink'].setValue(this.deer.videoLink);
    this.registrationForm.controls['denialReason'].setValue(this.deer.denialReason);
    this.registrationForm.controls['createDate'].setValue(this.deer.createDate);
    this.registrationForm.controls['description'].setValue(this.deer.description);
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



}
