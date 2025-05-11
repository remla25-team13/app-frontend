import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs'
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
    private readonly http: HttpClient = inject(HttpClient)
    private readonly API_URL = environment.API_URL

    public getVersion(): Observable<string>  {
        return this.http.get<string>(`${this.API_URL}/version`)
    }
}