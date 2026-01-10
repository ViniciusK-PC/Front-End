import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login-conta',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login-conta.component.html',
    styleUrl: './login-conta.component.scss'
})
export class LoginContaComponent {
    // Logic for account/password login
}
