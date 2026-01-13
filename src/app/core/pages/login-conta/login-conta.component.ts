import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-conta',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login-conta.component.html',
    styleUrl: './login-conta.component.scss'
})
export class LoginContaComponent {
    email = '';
    password = '';
    isLoading = false;

    constructor(private authService: AuthService, private router: Router) {
        this.email = localStorage.getItem('login_email') || '';
        if (!this.email) {
            this.router.navigate(['/login']);
        }
    }

    onLogin() {
        if (!this.password) {
            alert('Por favor, digite sua senha.');
            return;
        }

        this.isLoading = true;

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (res: any) => {
                this.isLoading = false;
                if (res.success) {
                    localStorage.removeItem('login_email');
                    localStorage.setItem('user_name', res.user?.name || res.user?.businessName || '');
                    localStorage.setItem('user_email', res.user?.email || this.email);
                    localStorage.setItem('user_logged', 'true');
                    this.router.navigate(['/']);
                } else {
                    alert(res.message || 'Erro ao fazer login.');
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Login error:', err);
                const errorMessage = err.error?.message || 'Senha incorreta! Tente novamente.';
                alert(errorMessage);
            }
        });
    }
}
