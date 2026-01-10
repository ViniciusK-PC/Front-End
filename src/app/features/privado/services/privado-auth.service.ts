import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PrivadoAuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = `${environment.apiUrl}/painel/auth`;

    // Signal para estado de login
    isAuthenticated = signal<boolean>(!!localStorage.getItem('privado_token'));

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
            tap(response => {
                if (response.success) {
                    localStorage.setItem('privado_token', 'true'); // Simples flag ou token real se houvesse
                    this.isAuthenticated.set(true);
                    this.router.navigate(['/privado']);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('privado_token');
        this.isAuthenticated.set(false);
        this.router.navigate(['/privado/login']);
    }
}
