import { Component, OnInit, inject, signal } from '@angular/core';
import { PainelService } from './painel.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagina-privada',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagina-privada.component.html',
    styleUrl: './pagina-privada.component.scss'
})
export class PaginaPrivadaComponent implements OnInit {
    private painelService = inject(PainelService);

    statusPainel = signal<string>('Carregando...');
    mensagemPainel = signal<string>('');

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
}
