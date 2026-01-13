import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    email = '';
    isLoading = false;

    constructor(private authService: AuthService, private router: Router) { }

    onContinue() {
        if (!this.email || !this.email.trim()) {
            alert('Por favor, digite seu e-mail.');
            return;
        }

        this.isLoading = true;

        this.authService.checkEmail(this.email.trim()).subscribe({
            next: (res: any) => {
                this.isLoading = false;
                localStorage.setItem('login_email', this.email.trim());
                this.router.navigate(['/login-conta']);
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Check email error:', err);
                if (err.status === 404) {
                    localStorage.setItem('register_email', this.email.trim());
                    this.router.navigate(['/tipo-pessoa']);
                } else {
                    alert('Erro de conexao com o servidor. Tente novamente mais tarde.');
                }
            }
        });
    }
}
