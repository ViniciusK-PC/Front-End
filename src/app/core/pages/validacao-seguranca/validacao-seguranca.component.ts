import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { VerificationService } from '../../services/verification.service';

@Component({
    selector: 'app-validacao-seguranca',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './validacao-seguranca.component.html',
    styleUrl: './validacao-seguranca.component.scss'
})
export class ValidacaoSegurancaComponent implements OnInit {
    email = '';
    loading = true;
    errorMessage = '';

    constructor(
        private router: Router,
        private verificationService: VerificationService
    ) {
        // Pegar email do localStorage
        this.email = localStorage.getItem('user_email') || '';
    }

    ngOnInit(): void {
        if (!this.email) {
            alert('Email não encontrado. Por favor, faça o cadastro novamente.');
            this.router.navigate(['/cadastro/f']);
            return;
        }

        // Enviar código de verificação
        this.verificationService.sendVerificationCode(this.email).subscribe({
            next: (response) => {
                if (response.success) {
                    // Armazenar email para a próxima página
                    localStorage.setItem('verificationEmail', this.email);
                    
                    // Aguardar 2 segundos para melhor UX e redirecionar
                    setTimeout(() => {
                        this.router.navigate(['/verificar-codigo']);
                    }, 2000);
                } else {
                    this.loading = false;
                    this.errorMessage = response.message || 'Erro ao enviar código de verificação.';
                    alert(this.errorMessage);
                }
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.error?.message || 'Erro ao enviar código de verificação.';
                alert(this.errorMessage);
                
                // Mesmo com erro, redirecionar após 3 segundos
                setTimeout(() => {
                    this.router.navigate(['/verificar-codigo']);
                }, 3000);
            }
        });
    }
}
