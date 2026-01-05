import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-store-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './store-landing.component.scss',
  templateUrl: './store-landing.component.html'
})
export class StoreLandingComponent implements OnInit {
  isScrolled = false;
  private lastScrollTop = 0;
  private ticking = false;

  ngOnInit() {
    // Initial check
    this.checkScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.checkScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private checkScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Se estiver no topo (menos de 100px), sempre mostra tudo
    if (scrollTop < 100) {
      this.isScrolled = false;
      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      return;
    }

    // Detecta direção do scroll
    const scrollingDown = scrollTop > this.lastScrollTop;
    const scrollingUp = scrollTop < this.lastScrollTop;

    if (scrollingUp) {
      // Rolando para cima - MOSTRA
      this.isScrolled = false;
    } else if (scrollingDown) {
      // Rolando para baixo - ESCONDE
      this.isScrolled = true;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
