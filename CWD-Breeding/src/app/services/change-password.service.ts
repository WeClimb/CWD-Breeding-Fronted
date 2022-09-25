import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable({
	providedIn: 'root'
})
export class ChangePasswordService extends AbstractAuthService {
	path = '/Ranch/ChangePassword'
}
