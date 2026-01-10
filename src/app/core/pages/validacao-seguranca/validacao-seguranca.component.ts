import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-validacao-seguranca',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './validacao-seguranca.component.html',
    styleUrl: './validacao-seguranca.component.scss'
})
export class ValidacaoSegurancaComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
        // Simulate email sending time
        setTimeout(() => {
            this.router.navigate(['/verificar-codigo']);
        }, 3000);
    }
}
