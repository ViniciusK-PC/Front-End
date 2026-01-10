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

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        if (this.userData.password !== this.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        this.authService.register(this.userData).subscribe({
            next: (res) => {
                localStorage.setItem('user_name', this.userData.name);
                this.router.navigate(['/validacao-seguranca']);
            },
            error: (err) => {
                alert('Erro ao cadastrar: ' + (err.error || 'Tente novamente.'));
            }
        });
    }
}
