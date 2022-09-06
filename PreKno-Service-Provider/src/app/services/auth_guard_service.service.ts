import { AUTH_TOKEN } from 'src/app/utils/constants/storage-keys.constant';
import { StorageService } from 'src/app/services/storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './token_storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private storage: StorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storage.getItem(AUTH_TOKEN) != null) {
      return true;
    } else {
      this.router.navigate(['login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
