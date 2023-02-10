import { Injectable } from '@angular/core';
import { AbstractExternalService } from './abstract-external.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService extends AbstractExternalService {
    path: string = '/Stripe';
}
