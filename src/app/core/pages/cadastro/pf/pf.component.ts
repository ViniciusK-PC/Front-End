import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pf',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './pf.component.html',
    styleUrl: './pf.component.scss'
})
export class PfComponent {
    userData = {
        type: 'PF',
        name: '',
        phone: '',
        birthDate: '',
        gender: '',
        email: '',
        password: ''
    };
    confirmPassword = '';
    isLoading = false;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        if (!this.userData.name || !this.userData.email || !this.userData.password) {
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
                    localStorage.setItem('user_name', this.userData.name);
                    localStorage.setItem('user_email', this.userData.email);
                    this.router.navigate(['/validacao-seguranca']);
                } else {
                    alert(res.message || 'Erro ao cadastrar.');
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Registration error:', err);
                const errorMessage = err.error?.message || err.error?.errors || err.message || 'Erro de conexao com o servidor.';
                alert('Erro ao cadastrar: ' + (typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage));
            }
        });
    }
}
