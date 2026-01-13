import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VerificationService {
    private apiUrl = `${environment.apiUrl}/verification`;

    constructor(private http: HttpClient) {}

    sendVerificationCode(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/send-code`, { email });
    }

    verifyCode(email: string, code: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/verify-code`, { email, code });
    }

    resendCode(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/resend-code`, { email });
    }
}