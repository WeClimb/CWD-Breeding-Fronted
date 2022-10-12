import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AbstractService } from "./abstract.service";

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractExternalService extends AbstractService {
    get baseUrl(): string {
        if(window.location.href.toLowerCase().includes('qacwdbreeding.z13.web.core.windows.net')){
            return 'https://cwdbreedingapiqa.azurewebsites.net';
        } else {
            return 'https://localhost:7145';
        }
    }
}
