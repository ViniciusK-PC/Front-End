import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verificar-codigo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './verificar-codigo.component.html',
    styleUrl: './verificar-codigo.component.scss'
})
export class VerificarCodigoComponent {
    code = '';

    constructor(private router: Router) { }

    onVerify() {
        if (this.code.length === 6) {
            // Success!
            this.router.navigate(['/hotsite/alerta-laranja']);
        } else {
            alert('Por favor, insira o código de 6 dígitos.');
        }
    }
}
