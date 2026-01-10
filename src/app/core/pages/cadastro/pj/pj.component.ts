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

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        if (this.userData.password !== this.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        this.authService.register(this.userData).subscribe({
            next: (res) => {
                localStorage.setItem('user_name', this.userData.managerName);
                this.router.navigate(['/validacao-seguranca']);
            },
            error: (err) => {
                alert('Erro ao cadastrar empresa: ' + (err.error || 'Tente novamente.'));
            }
        });
    }
}
