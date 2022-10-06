import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "src/app/services/storage.service";
import { TokenStorageService } from "src/app/services/token_storage.service";
import { AUTH_TOKEN, ME } from "src/app/utils/constants/storage-keys.constant";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    opened = false;

    routes = new Map([
        ['home', 'Home'],
        ['login', 'Login']
    ]);

    constructor(
        private activatedRoute : ActivatedRoute,
        private storageService: StorageService,
        private tokenStorage: TokenStorageService,
        private router: Router,
        public dialog: MatDialog,
    ) {}

    get activeTheme(): string {
        return 'light-theme';
    }

    get isLoggedIn(): boolean {
        // if (this.storageService.getItem(AUTH_TOKEN) != null && !this.router.url.includes('login')) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
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
        this.router.navigate(['login']);
    }
}
