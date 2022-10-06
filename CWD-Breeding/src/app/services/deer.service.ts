import { Injectable } from '@angular/core';
import { AbstractExternalService } from './abstract-external.service';

@Injectable({
  providedIn: 'root'
})
export class DeerService extends AbstractExternalService {
    path: string = '/Deer';
}
