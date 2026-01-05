import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core'; // <--- MUDOU AQUI
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // <--- MUDOU AQUI (Feature Estável)
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
