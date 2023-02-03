import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { TokenStorageService } from 'src/app/services/token_storage.service';
import { AUTH_TOKEN, ME } from 'src/app/utils/constants/storage-keys.constant';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    opened = false;

    // routes = new Map([
    //     ['home', 'Home'],
    //     ['login', 'Login']
    // ]);

    constructor(
        private activatedRoute: ActivatedRoute,
        private storageService: StorageService,
        private tokenStorage: TokenStorageService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    get activeTheme(): string {
        return 'light-theme';
    }

    get isAdmin(): boolean {
        let user = this.tokenStorage.getUser();
        if (user == null) {
            return false;
        }
        if (user.loginType.toLocaleLowerCase() == 'admin') {
            return true;
        } else {
            return false;
        }
    }

    get isLoggedIn(): boolean {
        var user = this.tokenStorage.getUser();
        if (user != null) {
            return true;
        } else {
            return false;
        }
    }

    get showSidenav(): boolean {
        // if (!this.isLoggedIn) {
        //     return false;
        // } else {
        //     return this.opened;
        // }
        return this.opened;
    }

    toggleSidenav(): void {
        this.opened = !this.opened;
    }

    logout(): void {
        this.storageService.removeItem(AUTH_TOKEN);
        this.storageService.removeItem(ME);
        this.opened = false;
        this.router.navigate(['login']);
    }

    onActivate(event: any): void {
        window.scroll(0,0);

        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);

        document.body.scrollTop = 0;
        document.querySelector('body')!.scrollTo(0,0)
    }
}
