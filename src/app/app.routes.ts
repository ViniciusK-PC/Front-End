import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/store/pages/store-landing/store-landing.component').then(
        (m) => m.StoreLandingComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
