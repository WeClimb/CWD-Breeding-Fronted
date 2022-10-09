import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractExternalService } from './abstract-external.service';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class DeerService extends AbstractService {

    path: string = '/Deer';

    constructor(protected override http: HttpClient){
        super(http);
      }

      get baseUrl(): string {
        return environment.api;
    }

    uploadFile(profileImage: File, deerId: string): Observable<any> {
        const formData = new FormData();
        formData.append('profileImg', profileImage, profileImage.name);

        const options = {headers: new HttpHeaders({
            enctype: 'multipart/form-data',
            Accept: 'application/json'
        })};

        return this.http.post<string>(
            `${this.baseUrl}${this.path}/${deerId}/ProfileImage`,
            formData,
            options,
        );
      }
}
