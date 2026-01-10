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
  { path: '**', redirectTo: '' },
];
