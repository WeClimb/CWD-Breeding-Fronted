import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractService {

    constructor(
        protected http: HttpClient,
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': ['x-pagination'],
        })
    };

    abstract path: string;
    abstract get baseUrl(): string;

    post(pathSegments: string[], model: any, queryParameters?: Map<string, any>): Observable<any> {
        const pathSegmentString = this.buildPathSegments(pathSegments);
        const queryParameterString = queryParameters ? this.buildQueryParameters(queryParameters) : '';

        return this.http.post<any>(
            `${this.baseUrl}${this.path}${pathSegmentString}${queryParameterString}`,
            JSON.stringify(model),
            this.httpOptions,
        );
    }

    put(pathSegments: string[], body: any): Observable<any> {
        var pathSegmentString = this.buildPathSegments(pathSegments);

        return this.http.put<string>(
            `${this.baseUrl}${this.path}${pathSegmentString}`,
            JSON.stringify(body),
            this.httpOptions,
          );
    }

    get(pathSegments: any[], queryParameters: Map<string, any>): Observable<any> {
        var pathSegmentString = this.buildPathSegments(pathSegments);
        var queryParameterString = this.buildQueryParameters(queryParameters);

        return this.http.get<any>(
            `${this.baseUrl}${this.path}${pathSegmentString}${queryParameterString}`,
            this.httpOptions,
        );
    }

    getAll(pathSegments: any[], queryParameters: Map<string, any>): Observable<any[]> {
        var pathSegmentString = this.buildPathSegments(pathSegments);
        var queryParameterString = this.buildQueryParameters(queryParameters);

        return this.http.get<any[]>(
            `${this.baseUrl}${this.path}${pathSegmentString}${queryParameterString}`,
            this.httpOptions,
        );
    }

    getAllPaged(pathSegments: any[], queryParameters: Map<string, any>): Observable<any> {
        var pathSegmentString = this.buildPathSegments(pathSegments);
        var queryParameterString = this.buildQueryParameters(queryParameters);

        return this.http.get<any[]>(
            `${this.baseUrl}${this.path}${pathSegmentString}${queryParameterString}`,
            {
                ...{
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Expose-Headers': ['x-pagination'],
                    })
                },
                observe:'response'
            }
        );
    }

    delete(pathSegments: any[], body?: any): Observable<any> {
        var pathSegmentString = this.buildPathSegments(pathSegments);

        if (body) {
            let options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }),
                body: body
            };

            return this.http.delete(
                `${this.baseUrl}${this.path}${pathSegmentString}`,
                options
            );
        } else {
            return this.http.delete<any>(
                `${this.baseUrl}${this.path}${pathSegmentString}`,
                this.httpOptions,
            );
        }

    }

    private buildPathSegments(pathSegments: string[]): string {
        return pathSegments != null && pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '';
    }

    private buildQueryParameters(queryParameters: Map<string, any>): string {
        return queryParameters != null && queryParameters.size > 0 ? `?${Array.from(queryParameters.keys()).map(key => key + '=' + queryParameters.get(key)).join('&')}` : '';
    }
}
