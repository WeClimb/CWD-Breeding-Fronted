import { Injectable } from '@angular/core';
import { AbstractExternalService } from './abstract-external.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends AbstractExternalService {
    path: string = '/ServiceProvider';
}
