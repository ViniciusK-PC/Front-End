import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Oficina Pro';
  authService = inject(AuthService);
  router = inject(Router);

  logout(): void {
    this.authService.logout();
  }

  isLandingPage(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }
}
