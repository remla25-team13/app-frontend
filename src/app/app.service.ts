import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private readonly http: HttpClient = inject(HttpClient)
    private readonly API_URL = environment.API_URL

    public getVersion(): Observable<{ version: string, model_type: string }> {
        return this.http.get<{ version: string, model_type: string }>(`${this.API_URL}/version/app-service`)
    }

    public queryModel(body: { review: string }): Observable<{ result: boolean, review: string }> {
        return this.http.post<{ result: "0" | "1", review: string }>(`${this.API_URL}/predict`, body)
            .pipe(
                map(response => ({
                    ...response,
                    result: response.result === "1"
                }))
            );
    }

    public submit(body: {review: string, modelType: string, corrected: boolean, original: boolean}): Observable<string> {
        return this.http.post<string>(`${this.API_URL}/submit`, body)
    }
}
