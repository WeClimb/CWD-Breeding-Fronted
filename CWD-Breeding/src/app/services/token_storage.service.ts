import { Injectable } from '@angular/core';
import { AUTH_TOKEN, ME } from '../utils/constants/storage-keys.constant';

const TOKEN_KEY = AUTH_TOKEN;
const USER_KEY = ME;

@Injectable({
    providedIn: 'root',
})
export class TokenStorageService {
    constructor() {}

    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public clearToken(): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USER_KEY);
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public clearUser(): void {
        window.sessionStorage.removeItem(USER_KEY);
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return null;
    }
}
