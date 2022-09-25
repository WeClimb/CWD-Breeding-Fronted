import { Injectable } from '@angular/core';
import { AbstractExternalService } from './abstract-external.service';

@Injectable({
  providedIn: 'root'
})
export class RanchService extends AbstractExternalService {
    path: string = '/Ranch';
}
