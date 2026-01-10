import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PrivadoAuthService } from '../../services/privado-auth.service';

@Component({
    selector: 'app-privado-registro',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    template: `
    <div class="login-container">
      <div class="login-card">
        <div class="brand">
          <span class="logo">⚡</span>
          <h1>Registro Privado</h1>
          <p>Crie sua conta de proprietário</p>
        </div>

        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Usuário</label>
            <input type="text" [(ngModel)]="username" name="username" required placeholder="Escolha um usuário">
          </div>
          
          <div class="form-group">
            <label>Senha</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="Escolha uma senha forte">
          </div>

          <p class="error" *ngIf="error()">{{ error() }}</p>
          <p class="success" *ngIf="success()">Conta criada! Acessando painel...</p>

          <button type="submit" [disabled]="loading()">
            {{ loading() ? 'Criando conta...' : 'Registrar' }}
          </button>
          
          <div class="login-link">
             <a routerLink="/privado/login">Já tenho conta</a>
          </div>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      font-family: 'Inter', sans-serif;
    }
    .login-card {
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    .brand {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      display: block;
    }
    h1 {
      margin: 0;
      color: #1e293b;
      font-size: 1.5rem;
    }
    p {
      color: #64748b;
      margin: 0.5rem 0 0;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #475569;
      font-weight: 500;
      font-size: 0.9rem;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #f97316;
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
    }
    button {
      width: 100%;
      padding: 0.85rem;
      background: #f97316;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover:not(:disabled) {
      background: #ea580c;
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .error {
      color: #dc2626;
      background: #fef2f2;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.9rem;
      text-align: center;
    }
    .success {
      color: #16a34a;
      background: #f0fdf4;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.9rem;
      text-align: center;
    }
    .login-link {
        margin-top: 1rem;
        text-align: center;
        
        a {
            color: #64748b;
            text-decoration: none;
            font-size: 0.9rem;
            
            &:hover {
                color: #f97316;
                text-decoration: underline;
            }
        }
    }
  `]
})
export class PrivadoRegistroComponent {
    private authService = inject(PrivadoAuthService);
    private router = inject(Router);

    username = '';
    password = '';
    loading = signal(false);
    error = signal('');
    success = signal(false);

    onSubmit() {
        if (!this.username || !this.password) return;

        this.loading.set(true);
        this.error.set('');

        this.authService.register(this.username, this.password).subscribe({
            next: () => {
                this.success.set(true);
                // Auto-login logic
                this.authService.login(this.username, this.password).subscribe({
                    next: () => {
                        // The login method in PrivadoAuthService already navigates to /privado
                        // But we might want to ensure feedback is smooth
                    },
                    error: (loginErr) => {
                        console.error('Auto-login failed', loginErr);
                        this.router.navigate(['/privado/login']);
                    }
                });
            },
            error: (err) => {
                console.error(err);
                this.error.set('Erro ao criar conta. Usuário pode já existir.');
                this.loading.set(false);
            }
        });
    }
}
