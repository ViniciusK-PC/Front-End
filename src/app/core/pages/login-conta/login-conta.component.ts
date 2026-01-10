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

    constructor(private authService: AuthService, private router: Router) {
        this.email = localStorage.getItem('login_email') || '';
        if (!this.email) {
            this.router.navigate(['/login']);
        }
    }

    onLogin() {
        if (!this.password) return;

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (res) => {
                alert('Login realizado com sucesso!');
                localStorage.removeItem('login_email');
                this.router.navigate(['/']); // Go to landing page or dashboard
            },
            error: (err) => {
                alert('Senha incorreta! Tente novamente.');
            }
        });
    }
}
