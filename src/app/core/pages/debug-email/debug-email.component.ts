import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebugService } from '../../services/debug.service';

@Component({
    selector: 'app-debug-email',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="debug-container">
            <h2>🔧 Debug - Códigos de Verificação</h2>
            
            <div class="debug-section">
                <h3>Buscar Código por Email</h3>
                <input type="email" [(ngModel)]="email" placeholder="Digite o email" class="debug-input">
                <button (click)="getVerificationCode()" class="debug-btn primary">Buscar Código</button>
            </div>

            <div *ngIf="codeData" class="debug-result">
                <h4>Resultado:</h4>
                <div class="code-info">
                    <p><strong>Email:</strong> {{ codeData.email }}</p>
                    <p><strong>Código:</strong> <span class="highlight">{{ codeData.code }}</span></p>
                    <p><strong>Criado em:</strong> {{ codeData.createdAt | date:'dd/MM/yyyy HH:mm:ss' }}</p>
                    <p><strong>Expira em:</strong> {{ codeData.expiresAt | date:'dd/MM/yyyy HH:mm:ss' }}</p>
                    <p><strong>Usado:</strong> {{ codeData.used ? 'Sim' : 'Não' }}</p>
                    <p><strong>Expirado:</strong> {{ codeData.expired ? 'Sim' : 'Não' }}</p>
                </div>
                <button (click)="clearCode()" class="debug-btn danger">Limpar Código</button>
            </div>

            <div *ngIf="errorMessage" class="debug-error">
                {{ errorMessage }}
            </div>

            <div *ngIf="successMessage" class="debug-success">
                {{ successMessage }}
            </div>

            <div class="debug-instructions">
                <h4>📋 Como usar:</h4>
                <ol>
                    <li>Digite o email que você usou para se cadastrar</li>
                    <li>Clique em "Buscar Código" para ver o código de verificação</li>
                    <li>Use este código na página de verificação</li>
                    <li>O código expira em 10 minutos</li>
                </ol>
            </div>
        </div>
    `,
    styles: [`
        .debug-container {
            max-width: 600px;
            margin: 50px auto;
            padding: 30px;
            background: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .debug-container h2 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
        }

        .debug-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #e9ecef;
        }

        .debug-section h3 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 18px;
        }

        .debug-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #dee2e6;
            border-radius: 6px;
            font-size: 16px;
            margin-bottom: 15px;
            transition: border-color 0.3s;
        }

        .debug-input:focus {
            outline: none;
            border-color: #007bff;
        }

        .debug-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-right: 10px;
        }

        .debug-btn.primary {
            background: #007bff;
            color: white;
        }

        .debug-btn.primary:hover {
            background: #0056b3;
        }

        .debug-btn.danger {
            background: #dc3545;
            color: white;
        }

        .debug-btn.danger:hover {
            background: #c82333;
        }

        .debug-result {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 2px solid #28a745;
        }

        .debug-result h4 {
            color: #28a745;
            margin-bottom: 15px;
        }

        .code-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 15px;
        }

        .code-info p {
            margin: 8px 0;
            color: #495057;
        }

        .highlight {
            background: #fff3cd;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: bold;
            color: #856404;
            font-size: 18px;
            letter-spacing: 2px;
        }

        .debug-error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #f5c6cb;
            margin-bottom: 20px;
        }

        .debug-success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #c3e6cb;
            margin-bottom: 20px;
        }

        .debug-instructions {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .debug-instructions h4 {
            color: #495057;
            margin-bottom: 15px;
        }

        .debug-instructions ol {
            color: #6c757d;
            line-height: 1.6;
        }

        .debug-instructions li {
            margin-bottom: 8px;
        }
    `]
})
export class DebugEmailComponent {
    email = '';
    codeData: any = null;
    errorMessage = '';
    successMessage = '';
    loading = false;

    constructor(private debugService: DebugService) {}

    getVerificationCode() {
        if (!this.email) {
            this.errorMessage = 'Por favor, digite um email válido';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.debugService.getVerificationCode(this.email).subscribe({
            next: (response) => {
                this.loading = false;
                if (response.success) {
                    this.codeData = response;
                    this.errorMessage = '';
                } else {
                    this.codeData = null;
                    this.errorMessage = response.message || 'Nenhum código encontrado';
                }
            },
            error: (error) => {
                this.loading = false;
                this.codeData = null;
                this.errorMessage = error.error?.message || 'Erro ao buscar código';
            }
        });
    }

    clearCode() {
        if (!this.email) {
            this.errorMessage = 'Por favor, digite um email válido';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.debugService.clearVerificationCodes(this.email).subscribe({
            next: (response) => {
                this.loading = false;
                if (response.success) {
                    this.successMessage = 'Código limpo com sucesso!';
                    this.codeData = null;
                } else {
                    this.errorMessage = response.message || 'Erro ao limpar código';
                }
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.error?.message || 'Erro ao limpar código';
            }
        });
    }
}