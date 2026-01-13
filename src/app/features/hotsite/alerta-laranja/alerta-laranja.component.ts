import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-alerta-laranja',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="alerta-page">
      <div class="alerta-card">
        <h1>Sua conta está ativa!</h1>
        <p>Redirecionando para a loja...</p>
      </div>
    </div>
  `,
    styles: [`
    .alerta-page {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff6b35;
      color: white;
    }
    .alerta-card {
      text-align: center;
    }
    h1 { font-size: 2rem; margin-bottom: 10px; }
  `]
})
export class AlertaLaranjaComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 2000);
    }
}
