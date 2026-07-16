/* ==========================================================================
   VAPELÂNDIA — script.js
   Estrutura modular:
   1. Configuração (número de WhatsApp)
   2. Dados dos produtos (fácil de editar/expandir)
   3. Helpers (preço, link do WhatsApp, ícone SVG do device)
   4. Renderização (cards, destaques, sabores)
   5. Busca + filtros/ordenação do catálogo
   6. Navegação (menu mobile, link ativo ao rolar)
   ========================================================================== */

(() => {
  "use strict";

  /* --------------------------------------------------------------------
     1. CONFIGURAÇÃO
     -------------------------------------------------------------------- */
  const WHATSAPP_NUMBER = "5575998144383"; // (75) 99814-4383, formato internacional
  const buildWhatsappLink = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  /* --------------------------------------------------------------------
     2. DADOS DOS PRODUTOS
     Basta adicionar um novo objeto neste array para o produto aparecer
     automaticamente no catálogo, nos destaques e na página de sabores.
     -------------------------------------------------------------------- */
  const FLAVOR_POOL = [
    "Morango com Leite", "Melancia Gelada", "Uva Ice", "Manga Tropical",
    "Menta Gelada", "Tutti-Frutti", "Energético", "Maçã Verde Ice",
    "Abacaxi com Hortelã", "Cereja Ice", "Chiclete", "Coco Gelado",
    "Framboesa Azul", "Limão Siciliano", "Morango com Kiwi", "Banana Ice",
    "Melão com Menta", "Maracujá Gelado",
  ];

  const PRODUCTS = [
    {
      id: "elfbar-35k-duke",
      name: "ELFBAR 35K DUKE",
      puffs: "até 35.000 tragadas",
      optionsCount: 11,
      originalPrice: 149.9,
      promoPrice: 140.0,
      badge: "Edição Duke",
      accent: "verde",
      featured: true,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=760&q=80",
      description: "Descartável premium com sabor marcante, bateria prolongada e acabamento fosco elegante.",
    },
    {
      id: "elfbar-15k",
      name: "ELFBAR 15K",
      puffs: "até 15.000 tragadas",
      optionsCount: 16,
      originalPrice: 124.9,
      promoPrice: 115.0,
      badge: "Mais vendido",
      accent: "amarelo",
      featured: true,
      image: "https://images.unsplash.com/photo-1532634896-26909d0d1f0f?auto=format&fit=crop&w=760&q=80",
      description: "O equilíbrio perfeito entre preço e variedade, com 16 sabores populares e entrega rápida.",
    },
    {
      id: "nikbar-10k",
      name: "NIKBAR 10K",
      puffs: "até 10.000 tragadas",
      optionsCount: 18,
      originalPrice: 109.9,
      promoPrice: 100.0,
      badge: "Maior variedade",
      accent: "azul",
      featured: true,
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=760&q=80",
      description: "Modelo com ampla seleção de sabores gelados e cítricos, ideal para quem troca de sabor toda hora.",
    },
    {
      id: "oxbar-15k",
      name: "OXBAR 15K",
      puffs: "até 15.000 tragadas",
      optionsCount: 10,
      originalPrice: 124.9,
      promoPrice: 115.0,
      badge: "Últimas unidades",
      accent: "laranja",
      featured: false,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=760&q=80",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },
  ].map((p) => ({
    ...p,
    flavors: FLAVOR_POOL.slice(0, p.optionsCount),
  }));

  /* --------------------------------------------------------------------
     3. HELPERS
     -------------------------------------------------------------------- */
  const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  const ACCENT_HEX = {
    verde: "#0E8A6D",
    amarelo: "#FFC93C",
    azul: "#2955A3",
    laranja: "#FF6E31",
  };

  // Ícone genérico de dispositivo (pod/descartável), tingido pela cor do produto.
  function deviceSVG(accentKey, size = 90) {
    const color = ACCENT_HEX[accentKey] || ACCENT_HEX.verde;
    return `
      <svg viewBox="0 0 90 140" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.55}">
        <defs>
          <linearGradient id="grad-${accentKey}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0.65"/>
          </linearGradient>
        </defs>
        <rect x="18" y="6" width="54" height="118" rx="20" fill="url(#grad-${accentKey})"/>
        <rect x="30" y="0" width="30" height="18" rx="8" fill="${color}"/>
        <rect x="26" y="46" width="38" height="46" rx="10" fill="rgba(255,255,255,0.35)"/>
        <circle cx="45" cy="106" r="5" fill="rgba(255,255,255,0.7)"/>
      </svg>
    `;
  }

  /* --------------------------------------------------------------------
     4. RENDERIZAÇÃO
     -------------------------------------------------------------------- */
  function productCardHTML(product) {
    const message = `Olá, tenho interesse no ${product.name}`;
    const badgeClass = product.featured ? "oferta" : "";
    return `
      <article class="product-card" data-id="${product.id}">
        <span class="card-badge ${badgeClass}">${product.badge}</span>
        <div class="card-media">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-meta">${product.optionsCount} opções de sabor · ${product.puffs}</p>
          <div class="card-prices">
            <span class="price-old">${currency.format(product.originalPrice)}</span>
            <span class="price-new">${currency.format(product.promoPrice)}</span>
          </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-whatsapp" href="${buildWhatsappLink(message)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" class="icon-wpp" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.35 5.07L2 22l5.06-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.22-1.77 1.27-.45.05-.9.24-3.05-.65-2.6-1.08-4.28-3.7-4.41-3.87-.13-.17-1.05-1.4-1.05-2.67 0-1.27.67-1.9.9-2.16.22-.25.5-.32.67-.32.17 0 .34.002.49.008.16.006.37-.06.58.44.22.52.73 1.8.8 1.93.06.13.1.28.02.45-.08.17-.13.27-.25.42-.13.15-.27.33-.38.44-.13.13-.26.27-.11.53.15.27.68 1.12 1.46 1.82 1 .9 1.85 1.18 2.11 1.31.27.13.42.11.58-.07.16-.17.68-.79.86-1.06.18-.27.36-.22.6-.13.25.09 1.57.74 1.84.87.27.13.45.2.51.31.07.11.07.63-.15 1.25z"/></svg>
            Chamar no WhatsApp
          </a>
        </div>
      </article>
    `;
  }

  function renderFeatured() {
    const grid = document.getElementById("featured-grid");
    const featured = PRODUCTS.filter((p) => p.featured);
    grid.innerHTML = featured.map(productCardHTML).join("");
  }

  function renderCatalog(list) {
    const grid = document.getElementById("catalog-grid");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");

    grid.innerHTML = list.map(productCardHTML).join("");
    emptyState.hidden = list.length !== 0;
    resultsCount.textContent =
      list.length === PRODUCTS.length
        ? `Mostrando todos os ${list.length} produtos`
        : `${list.length} produto${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;

    attachProductCardHandlers();
  }

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function renderProductPage(product) {
    const image = document.getElementById("product-page-image");
    const badge = document.getElementById("product-page-badge");
    const title = document.getElementById("product-page-title");
    const description = document.getElementById("product-page-description");
    const puffs = document.getElementById("product-page-puffs");
    const options = document.getElementById("product-page-options");
    const flavorCount = document.getElementById("product-page-flavor-count");
    const flavorPreview = document.getElementById("product-page-flavor-preview");
    const whatsapp = document.getElementById("product-page-whatsapp");
    const toggleButton = document.getElementById("product-toggle-flavors");

    if (!image || !badge || !title) return;

    image.src = product.image;
    image.alt = `${product.name} imagem do produto`;
    badge.textContent = product.badge;
    title.textContent = product.name;
    const breadcrumb = document.getElementById("product-page-breadcrumb");
    if (breadcrumb) breadcrumb.textContent = product.name;
    description.textContent = product.description;
    puffs.textContent = product.puffs;
    options.textContent = `${product.optionsCount} sabores disponíveis`;
    flavorCount.textContent = `${product.optionsCount} opções`;
    flavorPreview.innerHTML = product.flavors
      .slice(0, 4)
      .map((flavor) => `<span class="flavor-chip">${flavor}</span>`)
      .join("");

    whatsapp.href = buildWhatsappLink(`Olá, tenho interesse no ${product.name}`);
    toggleButton.textContent = "Ver todos os sabores";
    toggleButton.dataset.expanded = "false";

    toggleButton.onclick = () => {
      const expanded = toggleButton.dataset.expanded === "true";
      if (expanded) {
        flavorPreview.innerHTML = product.flavors
          .slice(0, 4)
          .map((flavor) => `<span class="flavor-chip">${flavor}</span>`)
          .join("");
        toggleButton.textContent = "Ver todos os sabores";
        toggleButton.dataset.expanded = "false";
      } else {
        flavorPreview.innerHTML = product.flavors
          .map((flavor) => `<span class="flavor-chip">${flavor}</span>`)
          .join("");
        toggleButton.textContent = "Mostrar menos";
        toggleButton.dataset.expanded = "true";
      }
    };
  }

  function renderNotFound() {
    const container = document.getElementById("product-page-main");
    if (!container) return;
    container.innerHTML = `
      <div class="product-not-found">
        <h1>Produto não encontrado</h1>
        <p>Desculpa, não conseguimos localizar o produto solicitado.</p>
        <a href="index.html#catalogo" class="btn btn-primary">Voltar ao catálogo</a>
      </div>
    `;
  }

  function renderFlavors() {
    const container = document.getElementById("flavors-list");
    container.innerHTML = PRODUCTS.map((product) => `
      <details class="flavor-item">
        <summary>
          <span>${product.name}</span>
          <span class="count-pill">${product.optionsCount} sabores</span>
          <span class="chevron">▾</span>
        </summary>
        <div class="flavor-chips">
          ${product.flavors.map((f) => `<span class="flavor-chip">${f}</span>`).join("")}
        </div>
      </details>
    `).join("");
  }

  function attachProductCardHandlers() {
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        const target = event.target.closest(".btn");
        if (target) return;
        const id = card.dataset.id;
        window.location.href = `produto.html?id=${encodeURIComponent(id)}`;
      });
    });
  }

  /* --------------------------------------------------------------------
     5. BUSCA + FILTROS/ORDENAÇÃO DO CATÁLOGO
     -------------------------------------------------------------------- */
  function applyCatalogFilters() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const sortBy = document.getElementById("sort-select").value;

    let list = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query));

    switch (sortBy) {
      case "menor-preco":
        list = list.sort((a, b) => a.promoPrice - b.promoPrice);
        break;
      case "maior-preco":
        list = list.sort((a, b) => b.promoPrice - a.promoPrice);
        break;
      case "mais-opcoes":
        list = list.sort((a, b) => b.optionsCount - a.optionsCount);
        break;
      case "relevancia":
      default:
        list = list.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    renderCatalog(list);
  }

  function setupCatalogControls() {
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");
    if (searchInput) searchInput.addEventListener("input", applyCatalogFilters);
    if (sortSelect) sortSelect.addEventListener("change", applyCatalogFilters);
  }

  /* --------------------------------------------------------------------
     6. NAVEGAÇÃO
     -------------------------------------------------------------------- */
  function setupWhatsappLinks() {
    const genericMessage = "Olá! Vim pelo site e quero saber mais sobre os produtos.";
    ["header-whatsapp", "hero-whatsapp", "contact-whatsapp"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = buildWhatsappLink(genericMessage);
    });
  }

  function setupMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("[data-nav]").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setupActiveNavOnScroll() {
    const sections = document.querySelectorAll("main .section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function setupHeroDevice() {
    document.getElementById("hero-device").innerHTML = deviceSVG("amarelo", 190);
  }

  /* --------------------------------------------------------------------
     INICIALIZAÇÃO
     -------------------------------------------------------------------- */
  function init() {
    document.getElementById("year").textContent = new Date().getFullYear();

    setupWhatsappLinks();
    if (document.getElementById("hero-device")) setupHeroDevice();
    setupMobileNav();
    setupActiveNavOnScroll();
    setupCatalogControls();

    const isCatalogPage = document.getElementById("catalog-grid") !== null;
    const isProductPage = document.body.dataset.page === "product";

    if (isCatalogPage) {
      renderFeatured();
      renderCatalog(PRODUCTS);
      renderFlavors();
    }

    if (isProductPage) {
      const productId = getQueryParam("id");
      const product = PRODUCTS.find((item) => item.id === productId);
      if (product) {
        renderProductPage(product);
      } else {
        renderNotFound();
      }
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
