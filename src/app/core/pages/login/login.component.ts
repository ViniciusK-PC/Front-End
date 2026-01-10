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

    constructor(private authService: AuthService, private router: Router) { }

    onContinue() {
        if (!this.email) return;

        this.authService.checkEmail(this.email).subscribe({
            next: (res) => {
                // Store email for the next step
                localStorage.setItem('login_email', this.email);
                this.router.navigate(['/login-conta']);
            },
            error: (err) => {
                alert('E-mail não encontrado. Por favor, cadastre-se.');
                this.router.navigate(['/tipo-pessoa']);
            }
        });
    }
}
