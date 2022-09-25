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

    login(baseAuth: string): Observable<any> {
        return this.http.post(
            `${environment.api}${this.path}`,
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
