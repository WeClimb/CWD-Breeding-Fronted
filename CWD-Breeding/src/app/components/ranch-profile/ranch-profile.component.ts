import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RanchService } from 'src/app/services/ranch.service';
import { Ranch } from 'src/models/ranch.model';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../dialogs/SuccessDialog/SuccessDialog.component';
import { EMAIL_REGEX } from 'src/app/utils/regex/email-regex.constant';
import { STATES } from 'src/app/utils/constants/states.constants';
import { DeerService } from 'src/app/services/deer.service';
import { Deer } from 'src/models/deer.model';


@Component({
  selector: 'app-ranch-profile',
  templateUrl: './ranch-profile.component.html',
  styleUrls: ['./ranch-profile.component.scss']
})
export class RanchProfileComponent implements OnInit {
  loading = false;
  selectedRanch: Ranch | undefined;
  states: string[] = STATES;
  deer: Deer[] = [];

  ranchForm: FormGroup = this.fb.group({
    ownerFirstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    ownerlastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX),]),
    city: new FormControl('', [Validators.required, Validators.minLength(1)]),
    state: new FormControl('', [Validators.required]),
    address: new FormControl('',[Validators.required, Validators.minLength(1)] ),
    zipcode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    phoneNumber: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    website: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    private ranchService: RanchService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private deerService: DeerService,
    private dialog: MatDialog // Inject MatDialog here
  ) { }

  ngOnInit(): void {
    this.tokenStorage.clearAdminRanch();
    if(this.tokenStorage.getUser().loginType.toLocaleLowerCase() !== 'admin'){
      this.router.navigate(['home']);
    }

    this.getRanch();
  }

selectState(e: any): void {
  this.ranchForm.controls['state'].setValue(e.target.value, {
      onlySelf: true,
  });
} 

  getRanch(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const queryParam = new Map();
      this.ranchService.get([id], queryParam).subscribe((ranch: Ranch) => {
        this.selectedRanch = ranch;
        if (this.selectedRanch) {
          this.ranchForm.patchValue({
            name: this.selectedRanch.name,
            ownerFirstName: this.selectedRanch.ownerFirstName,
            ownerlastName: this.selectedRanch.ownerlastName,
            website: this.selectedRanch.website,
            email: this.selectedRanch.email,
            address: this.selectedRanch.address,
            city: this.selectedRanch.city,
            state: this.selectedRanch.state,
            zipcode: this.selectedRanch.zipcode,
            phoneNumber: this.selectedRanch.phoneNumber
          });

          this.getRanchDeer(id);
        }
      });
    } else {
      this.router.navigate(['home']);
    }
  }

  getRanchDeer(id: string) : void {
    this.loading = true;
    let map = new Map();
    map.set('ranchId', id);

    this.deerService.getAll(['All-Filtered'],map).subscribe(response => {
      this.loading = false;
      this.deer = response;
    });
}

navigateToAddDeer(): void {
  this.tokenStorage.setAdminRanch(this.selectedRanch!.id);
  this.router.navigate(['request-deer-listing']);
}

  onSubmit() {
    this.loading = true;
    let ranch: Ranch = new Ranch();

    if (this.ranchForm.valid && this.selectedRanch) {
      ranch = {
        ...this.ranchForm.value,
        id: this.selectedRanch.id,
        loginDataId: this.selectedRanch.loginDataId,
        createDate: this.selectedRanch.createDate,
        updateDate: this.selectedRanch.updateDate,
        status: this.selectedRanch.status
      };    
    }
    
    this.ranchService.put([this.selectedRanch!.id], ranch).subscribe(response => {
      this.selectedRanch = ranch;
      this.getRanch();
      this.loading = false;
      this.dialog.open(SuccessDialogComponent, {
        data: { message: 'Ranch profile updated successfully' }
      });
    });
  }

  editDeerProfile(id: string): void {
    this.router.navigate(['Edit-Deer/' + id]);
  }
    
}
