import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { delay, Observable, of } from 'rxjs'
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private readonly http: HttpClient = inject(HttpClient)
    private readonly API_URL = environment.API_URL

    public getVersion(): Observable<{version: string}>  {
        return this.http.get<{version: string}>(`${this.API_URL}/version/app-service`)
    }

    public queryModel(body: { review: string }): Observable<{ result: boolean | null, review: string }> {
        // Temporary dummy 
        const request = of({
            // TODO possibly use label ids here
            result: true,
            review: body.review
        }).pipe(delay(1000))

        return request
    }
}
