import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DebugService {
    private apiUrl = `${environment.apiUrl}/debug`;

    constructor(private http: HttpClient) {}

    getVerificationCode(email: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/verification-codes/${email}`);
    }

    clearVerificationCodes(email: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/verification-codes/${email}`);
    }
}