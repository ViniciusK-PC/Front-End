import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Usuario {
    id?: string;
    nome: string;
    email: string;
    senha?: string;
    perfil: 'admin' | 'mecanico' | 'atendente';
    ativo: boolean;
    dataCriacao?: Date;
    ultimoAcesso?: Date;
}

export interface UsuarioResponse {
    id: string;
    nome: string;
    email: string;
    perfil: 'admin' | 'mecanico' | 'atendente';
    ativo: boolean;
    dataCriacao: string;
    ultimoAcesso?: string;
}

export interface CriarUsuarioRequest {
    nome: string;
    email: string;
    senha: string;
    perfil: 'admin' | 'mecanico' | 'atendente';
    ativo: boolean;
}

export interface AtualizarUsuarioRequest {
    nome?: string;
    email?: string;
    senha?: string;
    perfil?: 'admin' | 'mecanico' | 'atendente';
    ativo?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = `${environment.apiUrl}/usuarios`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    /**
     * Listar todos os usuários
     */
    listarUsuarios(): Observable<UsuarioResponse[]> {
        return this.http.get<UsuarioResponse[]>(this.apiUrl, {
            headers: this.getHeaders()
        });
    }

    /**
     * Buscar usuário por ID
     */
    buscarPorId(id: string): Observable<UsuarioResponse> {
        return this.http.get<UsuarioResponse>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }

    /**
     * Criar novo usuário
     */
    criarUsuario(usuario: CriarUsuarioRequest): Observable<UsuarioResponse> {
        return this.http.post<UsuarioResponse>(this.apiUrl, usuario, {
            headers: this.getHeaders()
        });
    }

    /**
     * Atualizar usuário existente
     */
    atualizarUsuario(id: string, usuario: AtualizarUsuarioRequest): Observable<UsuarioResponse> {
        return this.http.put<UsuarioResponse>(`${this.apiUrl}/${id}`, usuario, {
            headers: this.getHeaders()
        });
    }

    /**
     * Excluir usuário
     */
    excluirUsuario(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }

    /**
     * Ativar/Desativar usuário
     */
    toggleStatus(id: string, ativo: boolean): Observable<UsuarioResponse> {
        return this.http.patch<UsuarioResponse>(
            `${this.apiUrl}/${id}/status`,
            { ativo },
            { headers: this.getHeaders() }
        );
    }

    /**
     * Buscar usuários por role
     */
    buscarPorRole(perfil: string): Observable<UsuarioResponse[]> {
        return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/role/${perfil}`, {
            headers: this.getHeaders()
        });
    }

    /**
     * Buscar usuários ativos
     */
    buscarAtivos(): Observable<UsuarioResponse[]> {
        return this.http.get<UsuarioResponse[]>(`${this.apiUrl}/ativos`, {
            headers: this.getHeaders()
        });
    }

    /**
     * Resetar senha do usuário
     */
    resetarSenha(id: string, novaSenha: string): Observable<void> {
        return this.http.post<void>(
            `${this.apiUrl}/${id}/resetar-senha`,
            { novaSenha },
            { headers: this.getHeaders() }
        );
    }
}
