import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DeerService } from 'src/app/services/deer.service';
import { RanchService } from 'src/app/services/ranch.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { Deer } from 'src/models/deer.model';
import { Ranch } from 'src/models/ranch.model';
import { AddRanchDialogComponent } from '../dialogs/add-ranch-dialog/add-ranch-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  pendingDeer: Deer[] = [];
  ranches: Ranch[] = [];
  loading = false;
  ranchSearchForm: FormGroup = this.fb.group({
    name: [''],
    ownerFirstName: [''],
    ownerLastName: ['']
  });


  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private deerService: DeerService,
    private ranchService: RanchService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    if(this.tokenStorage.getUser().loginType.toLocaleLowerCase() !== 'admin'){
      this.router.navigate(['home']);
    }

    this.ranchSearchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSubmit();
    });

    this.getAllPendingDeer();
  }

  getAllPendingDeer(): void {
    this.loading = true;
    let map = new Map();
    this.deerService.getAll(['all'],map).subscribe(response => {
        this.pendingDeer = response;
        this.loading = false;
    },() => {
      this._snackBar.open('Error fetching ranches.', 'Dismiss', {
        duration: 3000
      });
      this.loading = false;
    });
  }

  navToPendingReviews(): void {
    this.router.navigate(['pending-reviews']);
  }

  openAddRanchDialog(): void {
    const dialogRef = this.dialog.open(AddRanchDialogComponent, {
      width: '80%',
      data: { /* Pass initial data if needed */ }
    });
  }

  onSubmit() {
    const name = this.ranchSearchForm.get('name')?.value ?? '';
    const ownerFirstName = this.ranchSearchForm.get('ownerFirstName')?.value ?? '';
    const ownerLastName = this.ranchSearchForm.get('ownerLastName')?.value ?? '';
  
    this.getRanches(name, ownerFirstName, ownerLastName);
  }

  onRanchSelected(selectedRanch: Ranch) {
    this.ranchSearchForm.patchValue({
      name: selectedRanch?.name ?? '',
      ownerFirstName: selectedRanch?.ownerFirstName ?? '',
      ownerLastName: selectedRanch?.ownerlastName ?? ''
    });
  }
  

  getRanches(name: string, ownerFirstName: string, ownerLastname: string): void {
    let map = new Map();
    if(name !== '') {
      map.set('name', name);
    }
    
    if(ownerFirstName !== '') {
      map.set('ownerFirstName', ownerFirstName);
    }

    if(ownerLastname !== '') {
      map.set('ownerLastname', ownerLastname);
    }

    this.ranchService.get(['getByFilters'], map).subscribe(response => {
      complete: this.ranches = response;
    });
  }

  selectRanch(ranch: Ranch) {
    this.router.navigate(['ranch-profile', ranch.id]);
  }

}
