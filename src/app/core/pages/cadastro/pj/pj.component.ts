import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pj',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './pj.component.html',
    styleUrl: './pj.component.scss'
})
export class PjComponent {
    userData = {
        type: 'PJ',
        businessName: '',
        cnpj: '',
        managerName: '',
        phone: '',
        email: '',
        password: ''
    };
    confirmPassword = '';
    isLoading = false;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        if (!this.userData.businessName || !this.userData.email || !this.userData.password) {
            alert('Por favor, preencha todos os campos obrigatorios.');
            return;
        }

        if (this.userData.password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (this.userData.password !== this.confirmPassword) {
            alert('As senhas nao coincidem!');
            return;
        }

        this.isLoading = true;

        this.authService.register(this.userData).subscribe({
            next: (res: any) => {
                this.isLoading = false;
                if (res.success) {
                    localStorage.setItem('user_name', this.userData.managerName || this.userData.businessName);
                    localStorage.setItem('user_email', this.userData.email);
                    this.router.navigate(['/validacao-seguranca']);
                } else {
                    alert(res.message || 'Erro ao cadastrar.');
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Registration error (PJ):', err);
                const errorMessage = err.error?.message || err.error?.errors || err.message || 'Erro de conexao com o servidor.';
                alert('Erro ao cadastrar empresa: ' + (typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage));
            }
        });
    }
}
