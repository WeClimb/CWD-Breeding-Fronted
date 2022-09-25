import { Injectable } from '@angular/core';
import { AUTH_TOKEN } from '../utils/constants/storage-keys.constant';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    constructor() { }

    removeItem(key: string): void {
        window.sessionStorage.removeItem(key);
    }

    setItem(key: string, value: string): void {
        window.sessionStorage.setItem(key, value);
    }

    getItem(key: string): string | null {
        return window.sessionStorage.getItem(key);
    }
}
