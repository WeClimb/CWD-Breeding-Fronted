import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-SuccessDialog',
  templateUrl: './SuccessDialog.component.html',
  styleUrls: ['./SuccessDialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

  ngOnInit() {
  }

}
