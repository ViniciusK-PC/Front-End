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
  { path: '**', redirectTo: '' },
];
