import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/store/pages/store-landing/store-landing.component').then(
        (m) => m.StoreLandingComponent
      ),
  },
  {
    path: 'debug-email',
    loadComponent: () =>
      import('./core/pages/debug-email/debug-email.component').then(
        (m) => m.DebugEmailComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'login-conta',
    loadComponent: () =>
      import('./core/pages/login-conta/login-conta.component').then(
        (m) => m.LoginContaComponent
      ),
  },
  {
    path: 'tipo-pessoa',
    loadComponent: () =>
      import('./core/pages/tipo-pessoa/tipo-pessoa.component').then(
        (m) => m.TipoPessoaComponent
      ),
  },
  {
    path: 'cadastro/f',
    loadComponent: () =>
      import('./core/pages/cadastro/pf/pf.component').then(
        (m) => m.PfComponent
      ),
  },
  {
    path: 'cadastro/j',
    loadComponent: () =>
      import('./core/pages/cadastro/pj/pj.component').then(
        (m) => m.PjComponent
      ),
  },
  {
    path: 'validacao-seguranca',
    loadComponent: () =>
      import('./core/pages/validacao-seguranca/validacao-seguranca.component').then(
        (m) => m.ValidacaoSegurancaComponent
      ),
  },
  {
    path: 'verificar-codigo',
    loadComponent: () =>
      import('./core/pages/verificar-codigo/verificar-codigo.component').then(
        (m) => m.VerificarCodigoComponent
      ),
  },
  {
    path: 'hotsite/alerta-laranja',
    loadComponent: () =>
      import('./features/hotsite/alerta-laranja/alerta-laranja.component').then(
        (m) => m.AlertaLaranjaComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
