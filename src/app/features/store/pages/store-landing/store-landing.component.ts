import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-store-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="store-container">
      <!-- Top Bar (Dark Navy) -->
      <div class="top-bar" [ngClass]="{'hidden': isScrolled}">
        <div class="top-bar-wrapper">
          <a href="#cupons">Cupons de Desconto</a>
          <a href="#ofertas">Melhor Preço Hoje</a>
          <a href="#vendas">Vendas corporativas</a>
          <a href="#lojas">Nossas Lojas</a>
          <a href="#atendimento">Atendimento</a>
        </div>
      </div>

      <!-- Main Header (Orange Gradient) - Always Fixed -->
      <header class="main-header" [ngClass]="{'sticky': isScrolled}">
        <div class="header-wrapper">
          <!-- Logo -->
          <div class="logo-section">
            <div class="logo-box">⚡</div>
            <h1 class="logo-text">Eletrotécnica Maurício</h1>
          </div>

          <!-- Search -->
          <div class="search-section">
            <input type="text" placeholder="Buscar produtos" class="search-field">
            <button class="search-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          <!-- Actions -->
          <div class="actions-section">
            <a href="tel:1135089978" class="action-box">
              <svg class="action-icon" width="20" height="20" viewBox="0 0 640 640" fill="currentColor">
                <path d="M320 128C241 128 175.3 185.3 162.3 260.7C171.6 257.7 181.6 256 192 256L208 256C234.5 256 256 277.5 256 304L256 400C256 426.5 234.5 448 208 448L192 448C139 448 96 405 96 352L96 288C96 164.3 196.3 64 320 64C443.7 64 544 164.3 544 288L544 456.1C544 522.4 490.2 576.1 423.9 576.1L336 576L304 576C277.5 576 256 554.5 256 528C256 501.5 277.5 480 304 480L336 480C362.5 480 384 501.5 384 528L384 528L424 528C463.8 528 496 495.8 496 456L496 435.1C481.9 443.3 465.5 447.9 448 447.9L432 447.9C405.5 447.9 384 426.4 384 399.9L384 303.9C384 277.4 405.5 255.9 432 255.9L448 255.9C458.4 255.9 468.3 257.5 477.7 260.6C464.7 185.3 399.1 127.9 320 127.9z"></path>
              </svg>
              <div class="action-label">
                <span>Televendas</span>
                <strong>(11) 3508-9978</strong>
              </div>
            </a>
            <a routerLink="/login" class="action-box">
              <svg class="action-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <div class="action-label">
                <span>Meus</span>
                <strong>Pedidos</strong>
              </div>
            </a>
            <a routerLink="/login" class="action-box">
              <svg class="action-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div class="action-label">
                <span>Entre ou</span>
                <strong>Cadastre-se</strong>
              </div>
            </a>
            <button class="cart-button">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Navigation Bar (Dark) -->
      <nav class="nav-bar" [ngClass]="{'hidden': isScrolled}">
        <div class="nav-wrapper">
          <div class="cat-dropdown-wrapper">
            <button class="cat-button">
              <span class="cat-icon">☰</span>
              <span class="cat-text">CATEGORIAS</span>
              <span class="cat-arrow">▼</span>
            </button>
            <div class="cat-dropdown">
              <div class="cat-dropdown-item">
                <a href="#ferramentas-eletricas" class="cat-dropdown-link">
                  Ferramentas Elétricas e Manuais
                  <span class="submenu-arrow">›</span>
                </a>
                <div class="cat-submenu">
                  <h3 class="submenu-title">Ferramentas Elétricas e Máquinas</h3>
                  <div class="submenu-columns">
                    <div class="submenu-column">
                      <a href="#compressores" class="submenu-link">Compressores de ar</a>
                      <a href="#marteletes" class="submenu-link">Marteletes Elétricos</a>
                      <a href="#lixadeira" class="submenu-link">Lixadeira e Politriz</a>
                      <a href="#utilidades" class="submenu-link">Utilidades Para Máquinas Elétricas</a>
                      <a href="#motor-eletrico" class="submenu-link">Motor Elétrico</a>
                      <a href="#soprador" class="submenu-link">Soprador Térmico</a>
                      <a href="#motobomba" class="submenu-link">Motobomba</a>
                      <a href="#afiador" class="submenu-link">Afiador</a>
                      <a href="#motor-gasolina" class="submenu-link">Motor a Gasolina</a>
                      <a href="#aspiradores" class="submenu-link">Aspiradores de Pó</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#serra-eletrica" class="submenu-link">Serra Elétrica</a>
                      <a href="#esmerilhadeira" class="submenu-link">Esmerilhadeira</a>
                      <a href="#tupias" class="submenu-link">Tupias e Plainas</a>
                      <a href="#moto-esmeril" class="submenu-link">Moto Esmeril</a>
                      <a href="#retificadeiras" class="submenu-link">Retificadeiras Elétricas</a>
                      <a href="#sopradores-eletricos" class="submenu-link">Sopradores Elétricos</a>
                      <a href="#grampeador" class="submenu-link">Grampeador/Pinador Elétrico</a>
                      <a href="#serras-fita" class="submenu-link">Serras Fita</a>
                      <a href="#polidores" class="submenu-link">Polidores</a>
                      <a href="#maquinas-solda" class="submenu-link">Máquinas de Solda Acessórios</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#parafusadeiras" class="submenu-link">Parafusadeiras Elétricas</a>
                      <a href="#furadeira-eletrica" class="submenu-link">Furadeira elétrica</a>
                      <a href="#chave-impacto" class="submenu-link">Chave de Impacto</a>
                      <a href="#maquinas-industriais" class="submenu-link">Máquinas Industriais</a>
                      <a href="#fresadora" class="submenu-link">Fresadora/ Frisadeira</a>
                      <a href="#rosqueadeiras" class="submenu-link">Rosqueadeiras</a>
                      <a href="#linha-bateria" class="submenu-link">Linha Bateria</a>
                      <a href="#chave-catraca" class="submenu-link">Chave Catraca Bateria</a>
                      <a href="#laminadoras" class="submenu-link">Laminadoras</a>
                    </div>
                  </div>
                </div>
              </div>


              <!-- Ferramentas Manuais -->
              <div class="cat-dropdown-item">
                <a href="#ferramentas-manuais" class="cat-dropdown-link">
                  Ferramentas Manuais
                  <span class="submenu-arrow">›</span>
                </a>
                <div class="cat-submenu">
                  <h3 class="submenu-title">Ferramentas Manuais</h3>
                  <div class="submenu-columns">
                    <div class="submenu-column">
                      <a href="#kit-ferramentas" class="submenu-link">Kit de Ferramentas</a>
                      <a href="#caixa-ferramentas" class="submenu-link">Caixa de Ferramentas</a>
                      <a href="#chave-biela" class="submenu-link">Chave L Biela</a>
                      <a href="#chave-combinada" class="submenu-link">Chave Combinada</a>
                      <a href="#jogo-chave-catraca" class="submenu-link">Jogo de Chave Combinada Catraca</a>
                      <a href="#kit-pontas" class="submenu-link">Kit de Pontas (Bits)</a>
                      <a href="#chave-grifo" class="submenu-link">Chave Grifo (Cano)</a>
                      <a href="#chave-canhao" class="submenu-link">Chave Canhão</a>
                      <a href="#soquetes-3-4" class="submenu-link">Soquetes de 3/4</a>
                      <a href="#chave-roda" class="submenu-link">Chave de Roda</a>
                      <a href="#ferramentas-isoladas" class="submenu-link">Ferramentas Isoladas</a>
                      <a href="#chave-allen" class="submenu-link">Chave Allen</a>
                      <a href="#soquete-hexagonal" class="submenu-link">Soquete Tipo Hexagonal</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#alicates" class="submenu-link">Alicates</a>
                      <a href="#jogo-chave-combinada" class="submenu-link">Jogo de Chave Combinada</a>
                      <a href="#chave-fenda-philips" class="submenu-link">Chave de Fenda e Philips</a>
                      <a href="#soquete-1-2" class="submenu-link">Soquete de 1/2</a>
                      <a href="#jogo-chave-allen" class="submenu-link">Jogo de Chave Allen</a>
                      <a href="#jogo-soquetes-impacto" class="submenu-link">Jogo de Soquetes de Impacto</a>
                      <a href="#chave-inglesa" class="submenu-link">Chave Inglesa</a>
                      <a href="#jogo-chave-estrela" class="submenu-link">Jogo de Chave Estrela</a>
                      <a href="#chave-combinada-catraca" class="submenu-link">Chave Combinada Catraca</a>
                      <a href="#jogo-chave-estrela-catraca" class="submenu-link">Jogo de Chave Estrela Catraca</a>
                      <a href="#adaptadores-soquetes" class="submenu-link">Adaptadores p/ Soquetes</a>
                      <a href="#extensao-soquete" class="submenu-link">Extensão P/ Soquete</a>
                      <a href="#chave-fixa" class="submenu-link">Chave de Fixa</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#jogo-soquetes" class="submenu-link">Jogo de Soquetes</a>
                      <a href="#maleta-ferramentas" class="submenu-link">Maleta de Ferramentas e Bolsas</a>
                      <a href="#grampos" class="submenu-link">Grampos</a>
                      <a href="#jogo-tork-ribe" class="submenu-link">Jogo de Tork e Ribe</a>
                      <a href="#martelos" class="submenu-link">Martelos</a>
                      <a href="#catraca-reversivel" class="submenu-link">Catraca Reversível P/ Soquetes</a>
                      <a href="#chave-tork-l" class="submenu-link">Chave Tork Tipo L</a>
                      <a href="#arco-serra" class="submenu-link">Arco de Serra</a>
                      <a href="#marretas" class="submenu-link">Marretas</a>
                      <a href="#cabo-forca" class="submenu-link">Cabo de Força P/ Soquetes</a>
                      <a href="#rebitador-manual" class="submenu-link">Rebitador Manual</a>
                      <a href="#jogo-chave-fixa" class="submenu-link">Jogo de Chave de Fixa</a>
                      <a href="#chave-estrela" class="submenu-link">Chave Estrela</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ferramentas Pneumáticas -->
              <div class="cat-dropdown-item">
                <a href="#ferramentas-pneumaticas" class="cat-dropdown-link">
                  Ferramentas Pneumáticas
                  <span class="submenu-arrow">›</span>
                </a>
                <div class="cat-submenu">
                  <h3 class="submenu-title">Ferramentas Pneumáticas</h3>
                  <div class="submenu-columns">
                    <div class="submenu-column">
                      <a href="#chave-impacto-pneu" class="submenu-link">Chave Impacto</a>
                      <a href="#kit-compressor" class="submenu-link">Kit Para Compressor</a>
                      <a href="#pulverizadores" class="submenu-link">Pulverizadores</a>
                      <a href="#retificas" class="submenu-link">Retificas</a>
                      <a href="#bicos-ar" class="submenu-link">Bicos de Ar</a>
                      <a href="#rebitadores" class="submenu-link">Rebitadores</a>
                      <a href="#serras-pneumaticas" class="submenu-link">Serras Pneumáticas</a>
                      <a href="#pinadores" class="submenu-link">Pinadores</a>
                      <a href="#calafetadores" class="submenu-link">Calafetadores</a>
                      <a href="#despontadeira" class="submenu-link">Despontadeira</a>
                      <a href="#testadores" class="submenu-link">Testadores</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#acessorios-pneumaticos" class="submenu-link">Acessórios Pneumáticos</a>
                      <a href="#mangueiras-ar" class="submenu-link">Mangueiras de Ar</a>
                      <a href="#lixadeiras-pneu" class="submenu-link">Lixadeiras</a>
                      <a href="#marteletes-pneu" class="submenu-link">Marteletes</a>
                      <a href="#bases-antideslizantes" class="submenu-link">Bases Antideslizantes e Nivelador</a>
                      <a href="#desincrustador" class="submenu-link">Desincrustador</a>
                      <a href="#esmerilhadeiras-pneu" class="submenu-link">Esmerilhadeiras</a>
                      <a href="#tesoura-puncao" class="submenu-link">Tesoura Punção</a>
                      <a href="#politriz-pneu" class="submenu-link">Politriz</a>
                      <a href="#motores-pneumaticos" class="submenu-link">Motores Pneumáticos</a>
                      <a href="#hidropneumaticos" class="submenu-link">Hidropneumáticos</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#chave-catraca-pneu" class="submenu-link">Chave de Catraca</a>
                      <a href="#filtro-regulador" class="submenu-link">Filtro Regulador</a>
                      <a href="#grampeadores-pneu" class="submenu-link">Grampeadores</a>
                      <a href="#tornador" class="submenu-link">Tornador</a>
                      <a href="#furadeira-pneumatica" class="submenu-link">Furadeira Pneumática</a>
                      <a href="#parafusadeiras-pneu" class="submenu-link">Parafusadeiras</a>
                      <a href="#bombas-encher" class="submenu-link">Bombas de Encher</a>
                      <a href="#vibradores-pneumaticos" class="submenu-link">Vibradores Pneumáticos</a>
                      <a href="#facas-oscilantes" class="submenu-link">Facas Oscilantes</a>
                      <a href="#caneta-gravacao" class="submenu-link">Caneta Gravação</a>
                      <a href="#pistolas" class="submenu-link">Pistolas</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Lava Jato e Posto -->
              <div class="cat-dropdown-item">
                <a href="#lava-jato" class="cat-dropdown-link">
                  Lava Jato e Posto
                  <span class="submenu-arrow">›</span>
                </a>
                <div class="cat-submenu">
                  <h3 class="submenu-title">Lava Jato e Posto</h3>
                  <div class="submenu-columns">
                    <div class="submenu-column">
                      <a href="#lavadora-alta-pressao" class="submenu-link">Lavadora de Alta Pressão</a>
                      <a href="#posto-gasolina" class="submenu-link">Posto de Gasolina</a>
                      <a href="#limpadora-vapor" class="submenu-link">Limpadora a Vapor</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#aspirador-po-lava" class="submenu-link">Aspirador de Pó</a>
                      <a href="#transferidor-liquidos" class="submenu-link">Transferidor de Líquidos</a>
                      <a href="#funil" class="submenu-link">Funil</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#varredeiras" class="submenu-link">Varredeiras</a>
                      <a href="#lavadora-media-pressao" class="submenu-link">Lavadora de Média Pressão</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Jardinagem -->
              <div class="cat-dropdown-item">
                <a href="#jardinagem" class="cat-dropdown-link">
                  Jardinagem
                  <span class="submenu-arrow">›</span>
                </a>
                <div class="cat-submenu">
                  <h3 class="submenu-title">Jardinagem</h3>
                  <div class="submenu-columns">
                    <div class="submenu-column">
                      <a href="#gerador-energia" class="submenu-link">Gerador de energia</a>
                      <a href="#cortador-grama" class="submenu-link">Cortador de grama</a>
                      <a href="#moedor-cana" class="submenu-link">Moedor de cana</a>
                      <a href="#soprador-folhas" class="submenu-link">Soprador de folhas</a>
                      <a href="#pulverizador-jardim" class="submenu-link">Pulverizador</a>
                      <a href="#mangueiras-jardim" class="submenu-link">Mangueiras</a>
                      <a href="#aparadores-cerca" class="submenu-link">Aparadores de Cerca Viva</a>
                      <a href="#filtro-piscina" class="submenu-link">Filtro para piscina</a>
                      <a href="#tesoura-eletrica-grama" class="submenu-link">Tesoura elétrica para grama</a>
                      <a href="#vaso-jardim" class="submenu-link">Vaso para Jardim</a>
                      <a href="#aspersor" class="submenu-link">Aspersor</a>
                      <a href="#adubadeiras" class="submenu-link">Adubadeiras</a>
                      <a href="#carrinhos-jardim" class="submenu-link">Carrinhos para Jardim</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#motocultivador" class="submenu-link">Motocultivador</a>
                      <a href="#bomba-agua" class="submenu-link">Bomba de Água</a>
                      <a href="#motobomba-combustao" class="submenu-link">Motobomba à Combustão</a>
                      <a href="#trituradores" class="submenu-link">Trituradores</a>
                      <a href="#mini-trator" class="submenu-link">Mini Trator P/ Cortar Grama</a>
                      <a href="#bomba-piscina" class="submenu-link">Bomba para piscina</a>
                      <a href="#aparador-grama" class="submenu-link">Aparador de Grama</a>
                      <a href="#roda-bomba-agua" class="submenu-link">Roda para bomba de água</a>
                      <a href="#alternador-gerador" class="submenu-link">Alternador para gerador</a>
                      <a href="#inseticida" class="submenu-link">Inseticida</a>
                      <a href="#gaxeta" class="submenu-link">Gaxeta</a>
                      <a href="#grama-sintetica" class="submenu-link">Grama Sintética</a>
                      <a href="#acessorios-tesoura" class="submenu-link">Acessórios para Tesoura Elétrica</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#rocadeiras" class="submenu-link">Roçadeiras</a>
                      <a href="#motosserra" class="submenu-link">Motosserra</a>
                      <a href="#motor-estacionario" class="submenu-link">Motor Estacionário</a>
                      <a href="#perfurador-solo" class="submenu-link">Perfurador de solo</a>
                      <a href="#atomizador" class="submenu-link">Atomizador</a>
                      <a href="#ferramentas-jardinagem" class="submenu-link">Ferramentas para jardinagem</a>
                      <a href="#corda" class="submenu-link">Corda</a>
                      <a href="#ensiladeira" class="submenu-link">Ensiladeira</a>
                      <a href="#irrigador" class="submenu-link">Irrigador</a>
                      <a href="#comedouros-jardim" class="submenu-link">Comedouros para Jardim</a>
                      <a href="#chave-boia" class="submenu-link">Chave boia</a>
                      <a href="#horta-hidroponica" class="submenu-link">Horta Hidropônica</a>
                      <a href="#composteira" class="submenu-link">Composteira</a>
                    </div>
                  </div>
                </div>
              </div>


              <!-- Ver todos os departamentos -->
              <div class="cat-dropdown-item">
                <a href="#todos-departamentos" class="cat-dropdown-link cat-dropdown-all">
                  Ver todos os departamentos
                  <span class="submenu-arrow">›</span>
                </a>
                <div class="cat-submenu cat-submenu-wide">
                  <h3 class="submenu-title">Todos os Departamentos</h3>
                  <div class="submenu-columns submenu-columns-4">
                    <div class="submenu-column">
                      <a href="#maquinas-eletricas" class="submenu-link">Máquinas Elétricas</a>
                      <a href="#ferramentas-auto-center" class="submenu-link">Ferramentas Auto Center</a>
                      <a href="#ferramentas-manuais-all" class="submenu-link">Ferramentas Manuais</a>
                      <a href="#injecao-eletronica" class="submenu-link">Injeção Eletrônica e Motor</a>
                      <a href="#ferramentas-pneumaticas-all" class="submenu-link">Ferramentas Pneumáticas</a>
                      <a href="#compressor-ar" class="submenu-link">Compressor de ar</a>
                      <a href="#maquina-solda" class="submenu-link">Máquina de Solda</a>
                      <a href="#serra-eletrica" class="submenu-link">Serra Elétrica</a>
                      <a href="#equipamento-hidraulico" class="submenu-link">Equipamento Hidráulico</a>
                      <a href="#elevadores-rampas" class="submenu-link">Elevadores e Rampas</a>
                      <a href="#parafusadeiras-eletricas-all" class="submenu-link">Parafusadeiras Elétricas</a>
                      <a href="#moveis-oficina" class="submenu-link">Móveis Para Oficina</a>
                      <a href="#lavadora-alta-pressao-all" class="submenu-link">Lavadora de Alta Pressão</a>
                      <a href="#chave-impacto-all" class="submenu-link">Chave Impacto</a>
                      <a href="#escadas" class="submenu-link">Escadas</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#posto-combustivel" class="submenu-link">Posto de combustível</a>
                      <a href="#ferramentas-automotivas-all" class="submenu-link">Ferramentas Automotivas</a>
                      <a href="#jardinagem-all" class="submenu-link">Jardinagem</a>
                      <a href="#construcao-civil" class="submenu-link">Construção Civil</a>
                      <a href="#funilaria-pintura" class="submenu-link">Funilaria e Pintura</a>
                      <a href="#limpeza-bicos" class="submenu-link">Limpeza de Bicos</a>
                      <a href="#desmontadora-pneus" class="submenu-link">Desmontadora de Pneus</a>
                      <a href="#furadeira-all" class="submenu-link">Furadeira</a>
                      <a href="#scanners-automotive" class="submenu-link">Scanners Automotive</a>
                      <a href="#kit-ferramentas-all" class="submenu-link">Kit de Ferramentas</a>
                      <a href="#esmerilhadeira-all" class="submenu-link">Esmerilhadeira</a>
                      <a href="#tupias-plainas-all" class="submenu-link">Tupias e Plainas</a>
                      <a href="#rocadeira-all" class="submenu-link">Roçadeira</a>
                      <a href="#soquetes-jogos" class="submenu-link">Soquetes (Jogos)</a>
                      <a href="#multimetros" class="submenu-link">Multímetros</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#equipamento-caminhoes" class="submenu-link">Equipamento Caminhões</a>
                      <a href="#para-voce-sua-casa" class="submenu-link">Para Você e Sua Casa</a>
                      <a href="#aditivos-lubrificantes" class="submenu-link">Aditivos e Lubrificantes</a>
                      <a href="#movimentacao-carga" class="submenu-link">Movimentação e Carga</a>
                      <a href="#camping-hobby" class="submenu-link">Camping e Hobby</a>
                      <a href="#bomba-agua-all" class="submenu-link">Bomba de Água</a>
                      <a href="#morsas-tornos" class="submenu-link">Morsas e Tornos</a>
                      <a href="#suporte-motor-cambio" class="submenu-link">Suporte Motor Câmbio Leve</a>
                      <a href="#carregador-bateria-12v" class="submenu-link">Carregador de Bateria até 12V</a>
                      <a href="#chave-combinada-jogo" class="submenu-link">Chave Combinada (Jogo)</a>
                      <a href="#mascara-protecao" class="submenu-link">Máscara de Proteção</a>
                      <a href="#repuxador-spotter" class="submenu-link">Repuxador / Spotter</a>
                      <a href="#pistola-pintura" class="submenu-link">Pistola Para Pintura</a>
                      <a href="#rampa-motos" class="submenu-link">Rampa Para Motos</a>
                      <a href="#maquinas-industriais-all" class="submenu-link">Máquinas Industriais</a>
                    </div>
                    <div class="submenu-column">
                      <a href="#auto-eletrica" class="submenu-link">Auto Elétrica</a>
                      <a href="#ferramentas-motos" class="submenu-link">Ferramentas Para Motos</a>
                      <a href="#epi" class="submenu-link">EPI</a>
                      <a href="#borracharia" class="submenu-link">Borracharia</a>
                      <a href="#ferramentas-geral" class="submenu-link">Ferramentas em Geral</a>
                      <a href="#lixadeira-politriz-all" class="submenu-link">Lixadeira e Politriz</a>
                      <a href="#marteletes-eletricos-all" class="submenu-link">Marteletes Elétricos</a>
                      <a href="#alicates-all" class="submenu-link">Alicates</a>
                      <a href="#betoneiras" class="submenu-link">Betoneiras</a>
                      <a href="#motosserras-all" class="submenu-link">Motosserras</a>
                      <a href="#aspirador-po-all" class="submenu-link">Aspirador de Pó</a>
                      <a href="#ventilador" class="submenu-link">Ventilador</a>
                      <a href="#brocas" class="submenu-link">Brocas</a>
                      <a href="#torno-mecanico" class="submenu-link">Torno Mecânico</a>
                      <a href="#cortadores-grama" class="submenu-link">Cortadores de Grama</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <a href="#frete" class="nav-link">Frete Grátis</a>
          <a href="#cupons" class="nav-link">Cupons de Desconto</a>
          <a href="#whatsapp" class="nav-link">Canal WhatsApp</a>
          <a href="#saldos" class="nav-link">Saldos</a>
          <a href="#eletrica" class="nav-link">Auto elétrica</a>
        </div>
      </nav>

      <!-- Page Content (with padding for fixed header) -->
      <div class="page-content">
      
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
      </div>
      <!-- End Page Content -->

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
      background: #1a1f2e; /* Match top-bar background */
    }

    .store-container {
      background: var(--light);
      min-height: 100vh;
      color: var(--dark);
      overflow-x: hidden;
    }

    /* === TOP BAR === */
    .top-bar {
      background: #1a1f2e;
      padding: 8px 0;
      transition: all 0.3s ease;
      max-height: 36px;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1002;
    }

    .top-bar.hidden {
      max-height: 0;
      padding: 0;
      opacity: 0;
    }

    .top-bar-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
    }

    .top-bar-wrapper a {
      color: #e5e7eb;
      text-decoration: none;
      font-size: 12.5px;
      font-weight: 400;
      transition: color 0.2s;
      white-space: nowrap;
    }

    .top-bar-wrapper a:hover {
      color: #ff8c42;
    }

    /* === MAIN HEADER === */
    .main-header {
      background: linear-gradient(90deg, #FF6B35 0%, #FF8C42 50%, #FFA500 100%);
      padding: 12px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      position: fixed;
      top: 33px; /* Below top-bar by default */
      left: 0;
      right: 0;
      z-index: 1001;
      transition: top 0.3s ease, box-shadow 0.3s ease;
    }

    /* When scrolled, header moves to top */
    .main-header.sticky {
      top: 0;
      box-shadow: 0 6px 16px rgba(0,0,0,0.3);
    }

    /* Page Content - Padding for fixed header */
    .page-content {
      padding-top: 171px; /* top-bar (36px) + main-header (75px) + nav-bar (60px) */
    }

    .header-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 280px 1fr auto;
      gap: 20px;
      align-items: center;
    }

    /* Logo */
    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-box {
      background: white;
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      flex-shrink: 0;
    }

    .logo-text {
      font-size: 22px;
      font-weight: 800;
      margin: 0;
      color: white;
      letter-spacing: -0.3px;
      line-height: 1.2;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    /* Search */
    .search-section {
      display: flex;
      background: white;
      border-radius: 4px;
      overflow: hidden;
      max-width: 500px;
    }

    .search-field {
      flex: 1;
      padding: 10px 16px;
      border: none;
      outline: none;
      font-size: 14px;
      color: #333;
    }

    .search-field::placeholder {
      color: #999;
    }

    .search-button {
      padding: 0 18px;
      background: #2563eb;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .search-button:hover {
      background: #1e40af;
    }

    .search-button svg {
      color: white;
    }

    /* Actions */
    .actions-section {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .action-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: transparent;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .action-box:hover {
      /* No extra effects */
    }

    .action-icon {
      color: white;
      flex-shrink: 0;
      transition: transform 0.3s ease;
      font-size: 20px;
    }

    .action-box:hover .action-icon {
      /* transform: scale(1.1); */
    }

    .action-label {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
      transition: all 0.3s ease;
      white-space: nowrap;
      border-bottom: 1px solid transparent;
    }

    .action-box:hover .action-label {
      border-bottom-color: white;
    }

    .action-label span {
      font-size: 11px;
      color: rgba(255,255,255,0.95);
      font-weight: 400;
      line-height: 1;
      transition: text-decoration 0.3s ease;
    }

    .action-box:hover .action-label span {
      text-decoration: underline;
    }

    .action-label strong {
      font-size: 13px;
      color: white;
      font-weight: 700;
      line-height: 1;
      position: relative;
      display: inline-block;
      transition: text-decoration 0.3s ease;
    }

    .action-box:hover .action-label strong {
      text-decoration: underline;
    }

    .cart-button {
      padding: 10px;
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .cart-button:hover {
      background: rgba(255,255,255,0.3);
    }

    /* === NAVIGATION BAR === */
    .nav-bar {
      background: #1a1f36;
      transition: all 0.3s ease;
      max-height: 60px;
      overflow: visible;
      position: fixed;
      top: 111px; /* Below top-bar (36px) + main-header (75px) */
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .nav-bar.hidden {
      max-height: 0;
      opacity: 0;
    }

    .nav-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 0;
    }

    .cat-button {
      background: #0f172a;
      color: white;
      border: none;
      padding: 14px 20px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-right: 1px solid rgba(255,255,255,0.1);
    }

    .cat-button:hover {
      background: #1e293b;
    }

    .cat-icon {
      font-size: 16px;
    }

    .cat-text {
      flex: 1;
    }

    .cat-arrow {
      font-size: 10px;
      opacity: 0.8;
    }

    /* Categories Dropdown */
    .cat-dropdown-wrapper {
      position: relative;
    }

    .cat-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 250px;
      background: #2d3748;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 2000;
      max-height: 0;
      overflow: visible;
    }

    .cat-dropdown-wrapper:hover .cat-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      max-height: 500px;
    }

    .cat-dropdown-link {
      display: block;
      padding: 14px 20px;
      color: white;
      text-decoration: none;
      font-size: 13px;
      font-weight: 400;
      transition: all 0.2s;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .cat-dropdown-link:hover {
      background: #1e293b;
      color: #ff8c42;
      padding-left: 25px;
    }

    .cat-dropdown-link:last-child {
      border-bottom: none;
    }

    .cat-dropdown-all {
      font-weight: 600;
      background: rgba(255,140,66,0.1);
    }

    /* Submenu Styles */
    .cat-dropdown-item {
      position: static;
    }

    .submenu-arrow {
      float: right;
      font-size: 16px;
      opacity: 0.7;
    }

    .cat-submenu {
      position: absolute;
      left: 100%;
      top: 0;
      background: white;
      min-width: 800px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      opacity: 0;
      visibility: hidden;
      transform: translateX(-10px);
      transition: all 0.3s ease;
      z-index: 2001;
      padding: 20px;
    }

    .cat-dropdown-item:hover .cat-submenu {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }

    .submenu-columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .submenu-column {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .submenu-link {
      color: #333;
      text-decoration: none;
      padding: 8px 12px;
      font-size: 13px;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .submenu-link:hover {
      background: #f5f5f5;
      color: #ff8c42;
      padding-left: 16px;
    }

    .submenu-title {
      margin: 0 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    /* Wider submenu for "Ver todos os departamentos" */
    .cat-submenu-wide {
      min-width: 1000px;
    }

    /* 4 columns layout */
    .submenu-columns-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    /* Orange background when hovering category with submenu */
    .cat-dropdown-item:hover > .cat-dropdown-link {
      background: #ff8c42;
      color: white;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 14px 18px;
      font-weight: 400;
      font-size: 13px;
      transition: all 0.2s;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
    }

    .nav-link:hover {
      color: #ff8c42;
      background: rgba(255,255,255,0.05);
      border-bottom-color: #FF8C42;
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
export class StoreLandingComponent implements OnInit {
  isScrolled = false;
  private lastScrollTop = 0;
  private ticking = false;

  ngOnInit() {
    // Initial check
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
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
