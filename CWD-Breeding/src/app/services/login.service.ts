import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private http: HttpClient,
    ) { }

    path = '/Ranch/login';
    userPath = '/User/login';

    get baseUrl(): string {
        if(window.location.href.toLowerCase().includes('qacwdbreeding.z13.web.core.windows.net')){
            return 'https://cwdbreedingapiqa.azurewebsites.net';
        } else if(window.location.href.toLowerCase().includes('cwdbreeding.z13.web.core.windows.net')){
            return 'https://cwdbreeding.azurewebsites.net'
        }
        else {
            return 'https://localhost:7145';
        }
    }


    login(baseAuth: string): Observable<any> {
        return this.http.post(
            `${this.baseUrl}${this.path}`,
            {},
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Basic ${baseAuth}`,
                }),
                responseType: 'text',
            },
        );
    }

    userLogin(baseAuth: string): Observable<any> {
        return this.http.post(
            `${this.baseUrl}${this.userPath}`,
            {},
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Basic ${baseAuth}`,
                }),
                responseType: 'text',
            },
        );
    }
}
