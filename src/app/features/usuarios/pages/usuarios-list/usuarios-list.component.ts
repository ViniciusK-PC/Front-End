import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, UsuarioResponse } from '../../services/usuario.service';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'ADMIN' | 'MECANICO' | 'ATENDENTE';
  ativo: boolean;
  dataCriacao: Date;
  ultimoAcesso?: Date;
}

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="usuarios-container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-left">
          <h1>Gerenciamento de Usuários</h1>
          <p class="subtitle">Gerencie usuários e permissões do sistema</p>
        </div>
        <button class="btn-primary" (click)="abrirModalNovoUsuario()">
          <span class="icon">+</span>
          Novo Usuário
        </button>
      </div>

      <!-- Filtros e Busca -->
      <div class="filters-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..."
            [(ngModel)]="filtroTexto"
            (input)="filtrarUsuarios()"
          />
        </div>
        
        <div class="filter-buttons">
          <button 
            class="filter-btn" 
            [class.active]="filtroRole === 'TODOS'"
            (click)="filtrarPorRole('TODOS')"
          >
            Todos
          </button>
          <button 
            class="filter-btn" 
            [class.active]="filtroRole === 'ADMIN'"
            (click)="filtrarPorRole('ADMIN')"
          >
            Administradores
          </button>
          <button 
            class="filter-btn" 
            [class.active]="filtroRole === 'MECANICO'"
            (click)="filtrarPorRole('MECANICO')"
          >
            Mecânicos
          </button>
          <button 
            class="filter-btn" 
            [class.active]="filtroRole === 'ATENDENTE'"
            (click)="filtrarPorRole('ATENDENTE')"
          >
            Atendentes
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="carregando" class="loading">
        <div class="spinner"></div>
        <p>Carregando usuários...</p>
      </div>

      <!-- Tabela de Usuários -->
      <div class="table-container" *ngIf="!carregando">
        <table class="usuarios-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Função</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let usuario of usuariosFiltrados" [class.inactive]="!usuario.ativo">
              <td>
                <div class="user-info">
                  <div class="user-avatar" [style.background]="getAvatarColor(usuario.role)">
                    {{ getInitials(usuario.nome) }}
                  </div>
                  <div class="user-details">
                    <span class="user-name">{{ usuario.nome }}</span>
                    <span class="user-id">ID: {{ usuario.id }}</span>
                  </div>
                </div>
              </td>
              <td>{{ usuario.email }}</td>
              <td>
                <span class="role-badge" [class]="'role-' + usuario.role.toLowerCase()">
                  {{ getRoleLabel(usuario.role) }}
                </span>
              </td>
              <td>
                <span class="status-badge" [class.active]="usuario.ativo" [class.inactive]="!usuario.ativo">
                  {{ usuario.ativo ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td>
                <span class="last-access">
                  {{ usuario.ultimoAcesso ? formatDate(usuario.ultimoAcesso) : 'Nunca' }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-icon" title="Editar" (click)="editarUsuario(usuario)">
                    ✏️
                  </button>
                  <button 
                    class="btn-icon" 
                    [title]="usuario.ativo ? 'Desativar' : 'Ativar'"
                    (click)="toggleStatus(usuario)"
                  >
                    {{ usuario.ativo ? '🔒' : '🔓' }}
                  </button>
                  <button class="btn-icon btn-danger" title="Excluir" (click)="excluirUsuario(usuario)">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div *ngIf="usuariosFiltrados.length === 0" class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>Nenhum usuário encontrado</h3>
          <p>Tente ajustar os filtros ou adicione um novo usuário</p>
        </div>
      </div>

      <!-- Modal Novo/Editar Usuário -->
      <div class="modal-overlay" *ngIf="mostrarModal" (click)="fecharModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ usuarioEditando ? 'Editar Usuário' : 'Novo Usuário' }}</h2>
            <button class="btn-close" (click)="fecharModal()">×</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label>Nome Completo</label>
              <input type="text" [(ngModel)]="formulario.nome" placeholder="Digite o nome completo">
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" [(ngModel)]="formulario.email" placeholder="email@exemplo.com">
            </div>

            <div class="form-group">
              <label>Senha {{ usuarioEditando ? '(deixe em branco para não alterar)' : '' }}</label>
              <input type="password" [(ngModel)]="formulario.senha" [placeholder]="usuarioEditando ? 'Nova senha (opcional)' : 'Digite a senha'">
            </div>

            <div class="form-group">
              <label>Função</label>
              <select [(ngModel)]="formulario.role">
                <option value="ADMIN">Administrador</option>
                <option value="MECANICO">Mecânico</option>
                <option value="ATENDENTE">Atendente</option>
              </select>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="formulario.ativo">
                <span>Usuário ativo</span>
              </label>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-secondary" (click)="fecharModal()">Cancelar</button>
            <button class="btn-primary" (click)="salvarUsuario()" [disabled]="salvando">
              {{ salvando ? 'Salvando...' : (usuarioEditando ? 'Salvar Alterações' : 'Criar Usuário') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .usuarios-container {
      padding: 2rem;
      background: #f5f7fa;
      min-height: 100vh;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header-left h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      color: #64748b;
      margin: 0;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .filters-section {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .search-box {
      position: relative;
      margin-bottom: 1rem;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
    }

    .search-box input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .search-box input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .filter-buttons {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    .filter-btn.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #e2e8f0;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .usuarios-table {
      width: 100%;
      border-collapse: collapse;
    }

    .usuarios-table thead {
      background: #f8fafc;
    }

    .usuarios-table th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #475569;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .usuarios-table td {
      padding: 1rem;
      border-top: 1px solid #f1f5f9;
    }

    .usuarios-table tr:hover {
      background: #f8fafc;
    }

    .usuarios-table tr.inactive {
      opacity: 0.6;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      color: #1e293b;
    }

    .user-id {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .role-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-admin {
      background: #fef3c7;
      color: #92400e;
    }

    .role-mecanico {
      background: #dbeafe;
      color: #1e40af;
    }

    .role-atendente {
      background: #d1fae5;
      color: #065f46;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-badge.active {
      background: #d1fae5;
      color: #065f46;
    }

    .status-badge.inactive {
      background: #fee2e2;
      color: #991b1b;
    }

    .last-access {
      color: #64748b;
      font-size: 0.875rem;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      width: 32px;
      height: 32px;
      border: none;
      background: #f1f5f9;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .btn-icon:hover {
      background: #e2e8f0;
      transform: scale(1.1);
    }

    .btn-icon.btn-danger:hover {
      background: #fee2e2;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: #64748b;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #1e293b;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #94a3b8;
      line-height: 1;
    }

    .btn-close:hover {
      color: #1e293b;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #475569;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      width: auto;
      cursor: pointer;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
  `]
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  filtroTexto: string = '';
  filtroRole: string = 'TODOS';
  mostrarModal: boolean = false;
  usuarioEditando: Usuario | null = null;
  carregando: boolean = false;
  salvando: boolean = false;

  formulario = {
    nome: '',
    email: '',
    senha: '',
    role: 'ATENDENTE' as 'ADMIN' | 'MECANICO' | 'ATENDENTE',
    ativo: true
  };

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando = true;
    this.usuarioService.listarUsuarios().subscribe({
      next: (response: UsuarioResponse[]) => {
        this.usuarios = response.map(u => ({
          id: u.id,
          nome: u.nome,
          email: u.email,
          role: u.role,
          ativo: u.ativo,
          dataCriacao: new Date(u.dataCriacao),
          ultimoAcesso: u.ultimoAcesso ? new Date(u.ultimoAcesso) : undefined
        }));
        this.usuariosFiltrados = [...this.usuarios];
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.carregando = false;
        // Fallback para dados mockados em caso de erro
        this.carregarDadosMockados();
      }
    });
  }

  carregarDadosMockados() {
    this.usuarios = [
      {
        id: '1',
        nome: 'Mauricio Silva',
        email: 'mauricio@oficina.com',
        role: 'ADMIN',
        ativo: true,
        dataCriacao: new Date('2024-01-15'),
        ultimoAcesso: new Date()
      },
      {
        id: '2',
        nome: 'João Santos',
        email: 'joao@oficina.com',
        role: 'MECANICO',
        ativo: true,
        dataCriacao: new Date('2024-02-20'),
        ultimoAcesso: new Date('2024-01-04')
      },
      {
        id: '3',
        nome: 'Maria Oliveira',
        email: 'maria@oficina.com',
        role: 'ATENDENTE',
        ativo: true,
        dataCriacao: new Date('2024-03-10'),
        ultimoAcesso: new Date('2024-01-03')
      },
      {
        id: '4',
        nome: 'Pedro Costa',
        email: 'pedro@oficina.com',
        role: 'MECANICO',
        ativo: false,
        dataCriacao: new Date('2023-12-01'),
        ultimoAcesso: new Date('2023-12-15')
      }
    ];
    this.usuariosFiltrados = [...this.usuarios];
  }

  filtrarUsuarios() {
    let filtrados = [...this.usuarios];

    // Filtro por texto
    if (this.filtroTexto) {
      const texto = this.filtroTexto.toLowerCase();
      filtrados = filtrados.filter(u =>
        u.nome.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto)
      );
    }

    // Filtro por role
    if (this.filtroRole !== 'TODOS') {
      filtrados = filtrados.filter(u => u.role === this.filtroRole);
    }

    this.usuariosFiltrados = filtrados;
  }

  filtrarPorRole(role: string) {
    this.filtroRole = role;
    this.filtrarUsuarios();
  }

  getInitials(nome: string): string {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getAvatarColor(role: string): string {
    const colors = {
      'ADMIN': '#f59e0b',
      'MECANICO': '#3b82f6',
      'ATENDENTE': '#10b981'
    };
    return colors[role as keyof typeof colors] || '#6b7280';
  }

  getRoleLabel(role: string): string {
    const labels = {
      'ADMIN': 'Administrador',
      'MECANICO': 'Mecânico',
      'ATENDENTE': 'Atendente'
    };
    return labels[role as keyof typeof labels] || role;
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;

    return new Date(date).toLocaleDateString('pt-BR');
  }

  abrirModalNovoUsuario() {
    this.usuarioEditando = null;
    this.formulario = {
      nome: '',
      email: '',
      senha: '',
      role: 'ATENDENTE',
      ativo: true
    };
    this.mostrarModal = true;
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioEditando = usuario;
    this.formulario = {
      nome: usuario.nome,
      email: usuario.email,
      senha: '',
      role: usuario.role,
      ativo: usuario.ativo
    };
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.usuarioEditando = null;
  }

  salvarUsuario() {
    this.salvando = true;

    if (this.usuarioEditando) {
      // Atualizar usuário existente
      const dados: any = {
        nome: this.formulario.nome,
        email: this.formulario.email,
        role: this.formulario.role,
        ativo: this.formulario.ativo
      };

      if (this.formulario.senha) {
        dados.senha = this.formulario.senha;
      }

      this.usuarioService.atualizarUsuario(this.usuarioEditando.id, dados).subscribe({
        next: () => {
          this.salvando = false;
          this.fecharModal();
          this.carregarUsuarios();
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário:', error);
          this.salvando = false;
          alert('Erro ao atualizar usuário. Tente novamente.');
        }
      });
    } else {
      // Criar novo usuário
      this.usuarioService.criarUsuario({
        nome: this.formulario.nome,
        email: this.formulario.email,
        senha: this.formulario.senha,
        role: this.formulario.role,
        ativo: this.formulario.ativo
      }).subscribe({
        next: () => {
          this.salvando = false;
          this.fecharModal();
          this.carregarUsuarios();
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
          this.salvando = false;
          alert('Erro ao criar usuário. Tente novamente.');
        }
      });
    }
  }

  toggleStatus(usuario: Usuario) {
    this.usuarioService.toggleStatus(usuario.id, !usuario.ativo).subscribe({
      next: () => {
        usuario.ativo = !usuario.ativo;
        this.filtrarUsuarios();
      },
      error: (error) => {
        console.error('Erro ao alterar status:', error);
        alert('Erro ao alterar status do usuário.');
      }
    });
  }

  excluirUsuario(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}?`)) {
      this.usuarioService.excluirUsuario(usuario.id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
          this.filtrarUsuarios();
        },
        error: (error) => {
          console.error('Erro ao excluir usuário:', error);
          alert('Erro ao excluir usuário. Tente novamente.');
        }
      });
    }
  }
}
