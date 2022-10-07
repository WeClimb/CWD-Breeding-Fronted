import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeerService } from 'src/app/services/deer.service';
import { Deer } from 'src/models/deer.model';
import { DeerEditDialogComponent } from './Dialogs/deer-edit-dialog/deer-edit-dialog.component';

@Component({
  selector: 'app-admin-deer-prodile-review',
  templateUrl: './admin-deer-prodile-review.component.html',
  styleUrls: ['./admin-deer-prodile-review.component.scss']
})
export class AdminDeerProdileReviewComponent implements OnInit {
  id!: string;
  deer!: Deer;

  constructor(
      private route: ActivatedRoute,
      private deerService: DeerService,
      private router: Router,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.id = x['id'];
    });

    this.getDeer();
}

getDeer() {
    let map = new Map();
    this.deerService.get([this.id], map).subscribe(response => {
        complete: this.deer = response;
    });
}

approve(): void {
  this.deer.isApproved = true;
  this.deerService.put([this.id], (this.deer)).subscribe(() => {
    complete: this.router.navigate(['admin-home']);
  });
}

openEditDeerDialog(): void {
  const dialogRef = this.dialog.open(DeerEditDialogComponent, {
    data: {
      deer: this.deer,
    },
  });

  dialogRef.afterClosed().subscribe(() => {
    complete: this.getDeer();
  });
}

}
