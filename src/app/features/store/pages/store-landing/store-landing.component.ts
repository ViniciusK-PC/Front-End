import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-store-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './store-landing.component.scss',
  templateUrl: './store-landing.component.html'
})
export class StoreLandingComponent implements OnInit {
  isScrolled = false;
  userName: string | null = null;
  private lastScrollTop = 0;
  private ticking = false;

  // Banner Carousel
  currentBannerIndex = 0;
  bannerSlides = Array(10).fill(0); // 10 banners
  private bannerAutoPlayInterval: any;

  // Products Carousel
  currentProductIndex = 0;
  cardWidth = 220; // Largura de cada card + gap
  totalCards = 8;
  visibleCards = 6;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user_name');
    this.checkScroll();
    this.startBannerAutoPlay();
  }

  logout() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_logged');
    localStorage.removeItem('login_email');
    this.userName = null;
    this.router.navigate(['/login']);
  }

  // Banner Carousel Methods
  startBannerAutoPlay() {
    this.bannerAutoPlayInterval = setInterval(() => {
      this.nextBannerSlide();
    }, 5000); // Troca a cada 5 segundos
  }

  stopBannerAutoPlay() {
    if (this.bannerAutoPlayInterval) {
      clearInterval(this.bannerAutoPlayInterval);
    }
  }

  nextBannerSlide() {
    this.currentBannerIndex = (this.currentBannerIndex + 1) % this.bannerSlides.length;
  }

  prevBannerSlide() {
    this.currentBannerIndex = this.currentBannerIndex === 0
      ? this.bannerSlides.length - 1
      : this.currentBannerIndex - 1;
  }

  goToBannerSlide(index: number) {
    this.currentBannerIndex = index;
    // Reset auto-play timer
    this.stopBannerAutoPlay();
    this.startBannerAutoPlay();
  }

  // Products Carousel Methods
  nextProductSlide() {
    const maxIndex = this.totalCards - this.visibleCards;
    if (this.currentProductIndex < maxIndex) {
      this.currentProductIndex++;
    } else {
      this.currentProductIndex = 0; // Loop back to start
    }
  }

  prevProductSlide() {
    if (this.currentProductIndex > 0) {
      this.currentProductIndex--;
    } else {
      this.currentProductIndex = this.totalCards - this.visibleCards; // Go to end
    }
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
