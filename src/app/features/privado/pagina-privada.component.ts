import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelService } from './painel.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsuariosListComponent } from '../usuarios/pages/usuarios-list/usuarios-list.component';
import { OrdensBoardComponent } from '../ordens/pages/ordens-board/ordens-board.component';
import { PrivadoClientesListComponent } from './components/privado-clientes-list.component';
import { PrivadoClienteFormComponent } from './components/privado-cliente-form.component';
import { PrivadoRelatoriosComponent } from './components/privado-relatorios.component';

@Component({
    selector: 'app-pagina-privada',
    standalone: true,
    imports: [
        CommonModule,
        DashboardComponent,
        UsuariosListComponent,
        OrdensBoardComponent,
        PrivadoClientesListComponent,
        PrivadoClienteFormComponent,
        PrivadoRelatoriosComponent
    ],
    templateUrl: './pagina-privada.component.html',
    styleUrl: './pagina-privada.component.scss'
})
export class PaginaPrivadaComponent implements OnInit {
    private painelService = inject(PainelService);

    statusPainel = signal<string>('Carregando...');
    mensagemPainel = signal<string>('');

    abaAtiva = signal<'dashboard' | 'usuarios' | 'ordens' | 'clientes' | 'novo_cliente' | 'relatorios' | 'sistema'>('dashboard');

    ngOnInit() {
        this.painelService.getStatus().subscribe({
            next: (dados) => {
                this.statusPainel.set(dados.status);
                this.mensagemPainel.set(dados.mensagem);
            },
            error: (erro) => {
                this.statusPainel.set('Erro');
                this.mensagemPainel.set('Não foi possível conectar ao módulo Painel.');
                console.error(erro);
            }
        });
    }

    setAba(aba: 'dashboard' | 'usuarios' | 'ordens' | 'clientes' | 'novo_cliente' | 'relatorios' | 'sistema') {
        this.abaAtiva.set(aba);
    }
}
