import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { VerificationService } from '../../services/verification.service';

@Component({
    selector: 'app-verificar-codigo',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './verificar-codigo.component.html',
    styleUrl: './verificar-codigo.component.scss'
})
export class VerificarCodigoComponent {
    code = '';
    email = '';
    loading = false;
    errorMessage = '';

    constructor(
        private router: Router,
        private verificationService: VerificationService
    ) {
        // Pegar email do localStorage ou state
        const navigation = this.router.getCurrentNavigation();
        this.email = navigation?.extras?.state?.['email'] || localStorage.getItem('verificationEmail') || '';
    }

    onVerify() {
        if (this.code.length !== 6) {
            this.errorMessage = 'Por favor, insira o código de 6 dígitos.';
            return;
        }

        if (!this.email) {
            this.errorMessage = 'Email não encontrado. Por favor, volte e tente novamente.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.verificationService.verifyCode(this.email, this.code).subscribe({
            next: (response) => {
                this.loading = false;
                if (response.success) {
                    // Sucesso! Redirecionar
                    this.router.navigate(['/hotsite/alerta-laranja']);
                } else {
                    this.errorMessage = response.message || 'Código inválido ou expirado.';
                }
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.error?.message || 'Erro ao verificar código. Tente novamente.';
            }
        });
    }

    onResendCode() {
        if (!this.email) {
            this.errorMessage = 'Email não encontrado.';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.verificationService.resendCode(this.email).subscribe({
            next: (response) => {
                this.loading = false;
                if (response.success) {
                    alert('Código reenviado com sucesso!');
                } else {
                    this.errorMessage = response.message || 'Erro ao reenviar código.';
                }
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.error?.message || 'Erro ao reenviar código. Tente novamente.';
            }
        });
    }
}
