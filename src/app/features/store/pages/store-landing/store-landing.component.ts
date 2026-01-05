import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-store-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="store-container">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="top-bar-content">
          <div class="top-links">
            <a href="#cupons">Cupons de Desconto</a>
            <a href="#ofertas">Melhor Preço Hoje</a>
            <a href="#consorcio">Consórcio</a>
            <a href="#afiliados">Afiliados</a>
          </div>
          <div class="top-actions">
            <span class="phone">📞 <strong>(11) 3968-4075</strong></span>
            <a routerLink="/login" class="login-link">🔐 Entre ou Cadastre-se</a>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <header class="main-header">
        <div class="header-content">
          <!-- Logo -->
          <div class="brand">
            <div class="logo-icon">⚡</div>
            <div class="brand-text">
              <h1>Eletrotécnica <span>Maurício</span></h1>
              <p>Ferramentas e Equipamentos Profissionais</p>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="search-container">
            <input type="text" placeholder="Buscar produtos" class="search-input">
            <button class="search-btn">🔍</button>
          </div>

          <!-- Header Actions -->
          <div class="header-actions">
            <a href="tel:1139684075" class="action-btn">
              <span class="icon">📞</span>
              <div class="action-text">
                <small>Televendas</small>
                <strong>(11) 3968-4075</strong>
              </div>
            </a>
            <a routerLink="/login" class="action-btn">
              <span class="icon">📋</span>
              <div class="action-text">
                <small>Meus</small>
                <strong>Pedidos</strong>
              </div>
            </a>
            <a routerLink="/login" class="action-btn admin-btn">
              <span class="icon">🔐</span>
              <div class="action-text">
                <small>Acesso</small>
                <strong>Restrito</strong>
              </div>
            </a>
          </div>
        </div>
      </header>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <div class="nav-content">
          <a href="#ferramentas" class="nav-item">Ferramentas Elétricas</a>
          <a href="#cortadores" class="nav-item">Cortadores de Grama</a>
          <a href="#equipamentos" class="nav-item">Equipamentos</a>
          <a href="#ofertas" class="nav-item highlight">🔥 Ofertas</a>
          <a href="#marcenaria" class="nav-item">Marcenaria</a>
          <a href="#construcao" class="nav-item">Construção Civil</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <span class="badge">Lançamento 2024</span>
          <h1>Potência Máxima para o seu <span>Trabalho</span></h1>
          <p>Explore nossa nova linha de ferramentas elétricas e cortadores de grama de alta performance. Tecnologia alemã ao seu alcance.</p>
          <div class="hero-actions">
            <a href="#ferramentas" class="btn-primary">Ver Catálogo</a>
            <a href="#sobre" class="btn-outline">Conheça a Qualidade</a>
          </div>
        </div>
        <div class="hero-image">
           <img src="images/hero_tools.png" alt="Ferramentas Pro">
        </div>
      </header>

      <!-- Featured Categories -->
      <section id="categorias" class="categories">
        <div class="section-header">
          <h2>Categorias em Destaque</h2>
          <p>Equipamentos selecionados para profissionais e entusiastas.</p>
        </div>

        <div class="category-grid">
          <div class="category-card" id="ferramentas">
            <div class="card-image">
              <img src="images/drill.png" alt="Ferramentas Elétricas">
            </div>
            <div class="card-content">
              <h3>Ferramentas Elétricas</h3>
              <p>Furadeiras, serras e parafusadeiras com torque superior e bateria de longa duração.</p>
              <button class="btn-card">Explorar Linha</button>
            </div>
          </div>

          <div class="category-card" id="cortadores">
            <div class="card-image">
              <img src="images/lawnmower.png" alt="Cortadores de Grama">
            </div>
            <div class="card-content">
              <h3>Cortadores de Grama</h3>
              <p>Manutenção impecável para o seu jardim com nossos cortadores elétricos e robóticos.</p>
              <button class="btn-card">Ver Modelos</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="benefits">
        <div class="benefit-item">
          <div class="icon">🚀</div>
          <h4>Entrega Turbo</h4>
          <p>Receba em até 24h na sua oficina ou residência.</p>
        </div>
        <div class="benefit-item">
          <div class="icon">🛡️</div>
          <h4>Garantia Pro</h4>
          <p>2 anos de garantia total em todos os equipamentos elétricos.</p>
        </div>
        <div class="benefit-item">
          <div class="icon">🛠️</div>
          <h4>Suporte Técnico</h4>
          <p>Assistência especializada própria sempre à disposição.</p>
        </div>
      </section>

      <!-- CTA Footer -->
      <footer class="store-footer">
        <div class="footer-content">
          <h2>Pronto para elevar seu nível de serviço?</h2>
          <p>Entre em contato com nossos consultores para orçamentos personalizados.</p>
          <button class="btn-cta">Falar com Consultor</button>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 OficinaPro Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      --primary: #2563eb;
      --primary-dark: #1e40af;
      --accent: #10b981;
      --dark: #0f172a;
      --light: #f8fafc;
      --grey: #64748b;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .store-container {
      background: var(--light);
      min-height: 100vh;
      color: var(--dark);
      overflow-x: hidden;
    }

    /* Top Bar */
    .top-bar {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      color: white;
      font-size: 0.875rem;
    }

    .top-bar-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .top-links {
      display: flex;
      gap: 1.5rem;
    }

    .top-links a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
    }

    .top-links a:hover {
      opacity: 0.8;
    }

    .top-actions {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .phone {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .login-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s;
    }

    .login-link:hover {
      opacity: 0.8;
    }

    /* Main Header */
    .main-header {
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1.5rem 2rem;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 2rem;
      align-items: center;
    }

    /* Logo */
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-icon {
      background: linear-gradient(135deg, #FFD700, #FFA500);
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      box-shadow: 0 4px 12px rgba(255, 165, 0, 0.3);
    }

    .brand-text h1 {
      font-size: 1.5rem;
      font-weight: 800;
      margin: 0;
      color: var(--dark);
      letter-spacing: -0.5px;
    }

    .brand-text h1 span {
      color: var(--primary);
    }

    .brand-text p {
      font-size: 0.75rem;
      color: var(--grey);
      margin: 0.25rem 0 0 0;
    }

    /* Search */
    .search-container {
      display: flex;
      max-width: 600px;
    }

    .search-input {
      flex: 1;
      padding: 0.875rem 1.25rem;
      border: 2px solid #e5e7eb;
      border-right: none;
      border-radius: 8px 0 0 8px;
      font-size: 0.9375rem;
      outline: none;
      transition: border-color 0.3s;
    }

    .search-input:focus {
      border-color: var(--primary);
    }

    .search-btn {
      padding: 0.875rem 1.5rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      font-size: 1.25rem;
      transition: background 0.3s;
    }

    .search-btn:hover {
      background: var(--primary-dark);
    }

    /* Header Actions */
    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: var(--light);
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.3s;
    }

    .action-btn:hover {
      background: #e5e7eb;
      transform: translateY(-2px);
    }

    .action-btn .icon {
      font-size: 1.5rem;
    }

    .action-text {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .action-text small {
      font-size: 0.75rem;
      color: var(--grey);
    }

    .action-text strong {
      font-size: 0.875rem;
      color: var(--dark);
    }

    .admin-btn {
      background: linear-gradient(135deg, var(--accent), #059669);
      color: white;
    }

    .admin-btn .action-text small,
    .admin-btn .action-text strong {
      color: white;
    }

    .admin-btn:hover {
      background: linear-gradient(135deg, #059669, var(--accent));
    }

    /* Navigation Menu */
    .nav-menu {
      background: var(--dark);
      border-top: 3px solid var(--primary);
    }

    .nav-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      gap: 2rem;
    }

    .nav-item {
      color: white;
      text-decoration: none;
      padding: 1rem 0;
      font-weight: 500;
      font-size: 0.9375rem;
      transition: color 0.3s;
      border-bottom: 3px solid transparent;
    }

    .nav-item:hover {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }

    .nav-item.highlight {
      color: #FFD700;
      font-weight: 700;
    }

    /* Hero */
    .hero {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      padding: 4rem 5% 6rem;
      gap: 4rem;
      position: relative;
      background: white;
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(37, 99, 235, 0.1);
      color: var(--primary);
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    .hero h1 {
      font-size: 4rem;
      line-height: 1.1;
      font-weight: 900;
      margin-bottom: 1.5rem;
      letter-spacing: -2px;
    }

    .hero h1 span {
      background: linear-gradient(to right, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero p {
      font-size: 1.25rem;
      color: var(--grey);
      line-height: 1.6;
      margin-bottom: 2.5rem;
      max-width: 500px;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-primary {
      padding: 1rem 2rem;
      background: var(--primary);
      color: white;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
      transition: transform 0.3s, background 0.3s;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      background: var(--primary-dark);
    }

    .btn-outline {
      padding: 1rem 2rem;
      border: 2px solid var(--grey);
      color: var(--dark);
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-outline:hover {
      border-color: var(--dark);
      background: var(--light);
    }

    .hero-image img {
      width: 100%;
      height: auto;
      border-radius: 24px;
      box-shadow: 30px 30px 80px rgba(0,0,0,0.1);
      transform: rotate(2deg);
    }

    /* Categories */
    .categories {
      padding: 6rem 5%;
      background: var(--light);
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }

    .category-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }

    .category-card {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .category-card:hover {
      transform: scale(1.02);
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    }

    .category-card .card-image {
      flex: 1;
      max-width: 200px;
    }

    .category-card .card-image img {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 10px 10px rgba(0,0,0,0.15));
    }

    .category-card .card-content {
      flex: 1.5;
    }

    .category-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .category-card p {
      color: var(--grey);
      margin-bottom: 1.5rem;
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .btn-card {
      padding: 0.75rem 1.5rem;
      background: var(--dark);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .btn-card:hover {
      background: var(--primary);
    }

    /* Benefits */
    .benefits {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
      padding: 6rem 10%;
      background: white;
      text-align: center;
    }

    .benefit-item .icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .benefit-item h4 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .benefit-item p {
      color: var(--grey);
    }

    /* Footer */
    .store-footer {
      background: var(--dark);
      color: white;
      padding: 8rem 5% 4rem;
      text-align: center;
    }

    .footer-content h2 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      letter-spacing: -1px;
    }

    .footer-content p {
      font-size: 1.25rem;
      color: rgba(255,255,255,0.6);
      margin-bottom: 3rem;
    }

    .btn-cta {
      padding: 1.25rem 3rem;
      background: white;
      color: var(--dark);
      border: none;
      border-radius: 14px;
      font-weight: 700;
      font-size: 1.125rem;
      cursor: pointer;
      transition: transform 0.3s, background 0.3s;
    }

    .btn-cta:hover {
      transform: scale(1.05);
      background: var(--primary);
      color: white;
    }

    .footer-bottom {
      margin-top: 6rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.4);
      font-size: 0.875rem;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
      }
      .hero-content {
        order: 1;
      }
      .hero-image {
        order: 0;
        max-width: 500px;
        margin: 0 auto;
      }
      .hero h1 { font-size: 3rem; }
      .hero-actions { justify-content: center; }
      .category-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 768px) {
      .benefits { grid-template-columns: 1fr; }
      .hero h1 { font-size: 2.5rem; }
      .footer-content h2 { font-size: 2rem; }
    }
  `]
})
export class StoreLandingComponent { }
