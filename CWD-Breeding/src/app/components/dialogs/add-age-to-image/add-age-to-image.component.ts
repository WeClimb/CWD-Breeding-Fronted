import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeerImage } from 'src/models/deer-image.model';

@Component({
  selector: 'app-your-dialog',
  template: `
    <h3 mat-dialog-title>Age of Deer in Selected Image</h3>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="data.deerImage.ageOfDeerImaged" placeholder="Age of Deer">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="accent" (click)="onSave()">Save</button>
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
