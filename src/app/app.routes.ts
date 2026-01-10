import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { OwnerGuard } from './core/guards/owner.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/store/pages/store-landing/store-landing.component').then(
        (m) => m.StoreLandingComponent
      ),
  },
  { path: 'login', loadComponent: () => import('./core/pages/login/login.component').then((c) => c.LoginComponent) },
  {
    path: 'clientes',
    canActivate: [authGuard],
    loadChildren: () => import('./features/clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: 'ordens',
    canActivate: [authGuard],
    loadChildren: () => import('./features/ordens/ordens.module').then((m) => m.OrdensModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, OwnerGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then((c) => c.DashboardComponent),
  },
  {
    path: 'usuarios',
    canActivate: [authGuard, OwnerGuard],
    loadComponent: () => import('./features/usuarios/pages/usuarios-list/usuarios-list.component').then((c) => c.UsuariosListComponent),
  },
  {
    path: 'relatorios',
    canActivate: [authGuard],
    loadChildren: () => import('./features/relatorios/relatorios.module').then((m) => m.RelatoriosModule),
  },
  {
    path: 'privado/login',
    loadComponent: () => import('./features/privado/pages/privado-login/privado-login.component').then((c) => c.PrivadoLoginComponent),
  },
  {
    path: 'privado/registro',
    loadComponent: () => import('./features/privado/pages/privado-registro/privado-registro.component').then((c) => c.PrivadoRegistroComponent),
  },
  {
    path: 'privado',
    // canActivate: [authGuard, OwnerGuard], // Temporarily commenting out strict old guards to allow testing new login flow if needed, or keep them?
    // User returned "Login Privado... nao tera nada a ver com o login dos usuarios".
    // If I keep 'authGuard', it checks 'token' in localStorage. PrivadoLogin sets 'privado_token'.
    // Setup might confuse guards. Let's leave guards valid for now but realize they might block access if we use ONLY PrivadoLogin.
    // However, since I can't easily break the whole app, I will add the login route and let the user decide how to switch.
    canActivate: [authGuard, OwnerGuard],
    loadComponent: () => import('./features/privado/pagina-privada.component').then((c) => c.PaginaPrivadaComponent),
  },
  { path: '**', redirectTo: 'clientes' },
];
