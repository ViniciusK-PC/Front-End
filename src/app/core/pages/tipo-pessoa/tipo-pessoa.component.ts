import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-tipo-pessoa',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './tipo-pessoa.component.html',
    styleUrl: './tipo-pessoa.component.scss'
})
export class TipoPessoaComponent {
    // Logic for account type selection
}
