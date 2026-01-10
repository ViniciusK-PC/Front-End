import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivadoAuthService } from '../../services/privado-auth.service';

@Component({
    selector: 'app-privado-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="login-container">
      <div class="login-card">
        <div class="brand">
          <span class="logo">⚡</span>
          <h1>Acesso Restrito</h1>
          <p>Painel do Proprietário</p>
        </div>

        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Usuário</label>
            <input type="text" [(ngModel)]="username" name="username" required placeholder="Seu usuário privado">
          </div>
          
          <div class="form-group">
            <label>Senha</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="Sua senha">
          </div>

          <p class="error" *ngIf="error()">{{ error() }}</p>

          <button type="submit" [disabled]="loading()">
            {{ loading() ? 'Entrando...' : 'Acessar Painel' }}
          </button>
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
  `]
})
export class PrivadoLoginComponent {
    private authService = inject(PrivadoAuthService);

    username = '';
    password = '';
    loading = signal(false);
    error = signal('');

    onSubmit() {
        if (!this.username || !this.password) return;

        this.loading.set(true);
        this.error.set('');

        this.authService.login(this.username, this.password).subscribe({
            next: () => {
                // Redirecionamento é feito no service
            },
            error: (err) => {
                console.error(err);
                this.error.set('Falha no login. Verifique suas credenciais.');
                this.loading.set(false);
            }
        });
    }
}
