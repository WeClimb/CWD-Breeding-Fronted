import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeerImage } from 'src/models/deer-image.model';

@Component({
  selector: 'app-your-dialog',
  template: `
    <h1 mat-dialog-title>Age of Deer</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="data.deerImage.ageOfDeerImaged" placeholder="Age of Deer">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onSave()">Save</button>
      <button mat-button mat-dialog-close>Cancel</button>
    </div>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `
  ]
})

export class AddAgeToImageComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    public dialogRef: MatDialogRef<AddAgeToImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deerImage: DeerImage }
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data.deerImage);
  }

}
