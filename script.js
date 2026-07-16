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

  const buildProductMessage = (productName, flavor) =>
    `Olá, quero o ${productName} sabor ${flavor}`;

  /* --------------------------------------------------------------------
     2. DADOS DOS PRODUTOS
     Basta adicionar um novo objeto neste array para o produto aparecer
     automaticamente no catálogo, nos destaques e na página de sabores.
     -------------------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: "elfbar-40k-iceking",
      name: "ELFBAR 40.000 Iceking",
      puffs: "40.000 Puffs",
      flavors: [
        "Mango magic",
        "Grape ice",
        "Peach+",
        "Summer splash",
        "Watermelon ice",
        "Strawberry ice",
        "Cherry fuse",
      ],
      originalPrice: 179.9,
      promoPrice: 159.9,
      badge: "Edição ICE",
      accent: "verde",
      featured: true,
      image: "https://media.discordapp.net/attachments/1276211560993259572/1527359740793983208/BCO.f015a292-49c2-43b6-92f3-268d1f677e5d.png?ex=6a5a601b&is=6a590e9b&hm=523c083812ba8a23723f49fc4435fd1d465ab0ba7c84d8f105053b17a3ec7b53&=&format=webp&quality=lossless&width=960&height=960",
      description: "Descartável premium com sabor marcante, bateria prolongada e acabamento fosco elegante.",
    },
    {
      id: "ignite-v155",
      name: "IGNITE V155",
      puffs: "15.000 Puffs",
      flavors: [
        "Strawberry Kiwi",
        "Grape ice",
        "Ice mint",
        "Kiwi passion fruit guava",
        "Watermelon ice",
        "Menthol",
        "Pineapple ice",
        "Tropical acai",
        "Strawberry watermelon",
      ],
      originalPrice: 130.0,
      promoPrice: 119.9,
      badge: "Mais vendido",
      accent: "amarelo",
      featured: true,
      image: "https://cdn.discordapp.com/attachments/1276211560993259572/1527352711677214932/IGNITE_V155.png?ex=6a5a598f&is=6a59080f&hm=f587784f2c548d34f2386577fb099ea29c14e80543226d3506088ea77a7dd79a&",
      description: "O equilíbrio perfeito entre preço e variedade, com 9 sabores populares e entrega rápida.",
    },
    {
      id: "lostmary-35k",
      name: "LOST MARY 35.000",
      puffs: "35.000 Puffs",
      flavors: [
        "Grape Ice",
        "Strawberry Kiwi",
        "Strawberry ice",
        "Miami Mint",
        "Watermelon ice",
        "Strawberry Watermelon",
        "Pineapple ice",
      ],
      originalPrice: 160.0,
      promoPrice: 139.9,
      badge: "Mais Vendido",
      accent: "azul",
      featured: true,
      image: "https://media.discordapp.net/attachments/1276211560993259572/1527355990331232296/BCO.57239334-4b08-491d-bad1-7d6939e8ca19.png?ex=6a5a5c9c&is=6a590b1c&hm=c333bee42c2e6ca7e90797cb4f3fa4fea25ccd76f301876cf68fb0870d916bc4&=&format=webp&quality=lossless&width=960&height=960",
      description: "Modelo com ampla seleção de sabores gelados e cítricos, ideal para quem troca de sabor toda hora.",
    },
    {
      id: "oxbar-15k",
      name: "OXBAR 15K",
      puffs: "até 15.000 tragadas",
      flavors: [
        "Menta Gelada",
        "Lima Citrus",
        "Melancia Gelada",
        "Coco Gelado",
        "Chiclete",
        "Uva Ice",
        "Abacaxi com Hortelã",
        "Cereja Ice",
        "Banana Ice",
        "Framboesa Azul",
      ],
      originalPrice: 124.9,
      promoPrice: 115.0,
      badge: "Últimas unidades",
      accent: "laranja",
      featured: false,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=760&q=80",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },
  ];

  PRODUCTS.forEach((product) => {
    product.optionsCount = product.flavors.length;
  });

  /* --------------------------------------------------------------------
     3. HELPERS
     -------------------------------------------------------------------- */
  const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  const ACCENT_HEX = {
    verde: "#0E8A6D",
    amarelo: "#a8d8ff",
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
    const productPageLink = `produto.html?id=${encodeURIComponent(product.id)}`;
    const badgeClass = product.featured ? "oferta" : "";
    return `
      <article class="product-card" data-id="${product.id}">
        <span class="card-badge ${badgeClass}">${product.badge}</span>
        <div class="card-media">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-meta">${product.optionsCount} opções</p>
          <div class="card-price-block">
            <span class="price-new">${currency.format(product.promoPrice)}</span>
            <span class="price-old">${currency.format(product.originalPrice)}</span>
          </div>
        </div>
        <div class="card-footer">
          <a class="btn btn-primary btn-product-options" href="${productPageLink}">
            Ver opções
          </a>
        </div>
      </article>
    `;
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

    if (!image || !badge || !title || !flavorPreview || !whatsapp) return;

    image.src = product.image;
    image.alt = `${product.name} imagem do produto`;
    badge.textContent = product.badge;
    title.textContent = product.name;
    const breadcrumb = document.getElementById("product-page-breadcrumb");
    if (breadcrumb) breadcrumb.textContent = product.name;
    description.textContent = product.description;
    puffs.textContent = product.puffs;
    options.textContent = `${product.optionsCount} sabores disponíveis`;
    flavorCount.textContent = `${product.optionsCount} sabores`;
    document.getElementById("product-page-price").textContent = currency.format(product.promoPrice);
    document.getElementById("product-page-old-price").textContent = currency.format(product.originalPrice);

    let selectedFlavor = product.flavors[0] || "";
    const updateWhatsappLink = () => {
      whatsapp.href = buildWhatsappLink(buildProductMessage(product.name, selectedFlavor));
    };

    const renderFlavorChips = (flavors) =>
      flavors
        .map(
          (flavor) => `<button type="button" class="flavor-chip${flavor === selectedFlavor ? " selected" : ""}" data-flavor="${flavor}">${flavor}</button>`
        )
        .join("");

    const setSelectedFlavor = (flavor) => {
      selectedFlavor = flavor;
      flavorPreview.querySelectorAll(".flavor-chip").forEach((chip) => {
        chip.classList.toggle("selected", chip.dataset.flavor === flavor);
      });
      updateWhatsappLink();
    };

    const showPreview = (showAll) => {
      const flavors = showAll ? product.flavors : product.flavors.slice(0, 8);
      flavorPreview.innerHTML = renderFlavorChips(flavors);
      toggleButton.textContent = showAll ? "Mostrar menos" : "Ver todos os sabores ▾";
      toggleButton.dataset.expanded = String(showAll);
    };

    showPreview(false);
    updateWhatsappLink();

    flavorPreview.addEventListener("click", (event) => {
      const chip = event.target.closest(".flavor-chip");
      if (!chip) return;
      const flavor = chip.dataset.flavor;
      if (!flavor) return;
      setSelectedFlavor(flavor);
    });

    toggleButton.onclick = () => {
      const expanded = toggleButton.dataset.expanded === "true";
      showPreview(!expanded);
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
      renderCatalog(PRODUCTS);
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
