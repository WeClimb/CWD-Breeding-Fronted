import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AbstractService } from "./abstract.service";

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractExternalService extends AbstractService {
    get baseUrl(): string {
        return environment.api;
    }
}
