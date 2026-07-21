/* ==========================================================================
   JRS PUFFS — script.js
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

    /* ==========================================================================
       ELFBAR 40.000 Iceking
       ========================================================================== */
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
      image: "/img/produto1.png",
      description: "Descartável premium com sabor marcante, bateria prolongada e acabamento fosco elegante.",
    },
      /* ==========================================================================
       IGNITE V155
       ========================================================================== */
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
      accent: "babyBlue",
      featured: true,
      image: "/img/produto2.svg",
      description: "O equilíbrio perfeito entre preço e variedade, com 9 sabores populares e entrega rápida.",
    },
    /* ==========================================================================
       LOST MARY 35.000
       ========================================================================== */
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
      accent: "babyBlue",
      featured: true,
      image: "/img/produto3.svg",
      description: "Modelo com ampla seleção de sabores gelados e cítricos, ideal para quem troca de sabor toda hora.",
    },
    /* ==========================================================================
       IGNITE V55 - 5.500
       ========================================================================== */
    {
      id: "ignite-v55",
      name: "IGNITE V55 - 5.500",
      puffs: "5.500 tragadas",
      flavors: [
        "Minty melon",
        "Menthol",
        "Strawberry ice",
        "Ice mint",
        "Strawberry kiwi",
        "Watermelon Ice",
        "Pineapple ice",
        "Grape ice",
        "Melon mix",
      ],
      originalPrice: 110.0,
      promoPrice: 99.9,
      badge: "Últimas unidades",
      accent: "laranja",
      featured: false,
      image: "/img/produto4.svg",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },
    /* ==========================================================================
       IGNITE V80 - 8.000
       ========================================================================== */
    {
      id: "ignite-v80",
      name: "IGNITE V80 - 8.000",
      puffs: "8.000 tragadas",
      flavors: [
        "Cactus",
        "Grape ice",
        "Strawberry ice",
        "Icy mint",
        "Blueberry ice",
      ],
      originalPrice: 120.0,
      promoPrice: 109.9,
      badge: "Últimas unidades",
      accent: "laranja",
      featured: false,
      image: "/img/produto5.svg",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },
/* ==========================================================================
       IGNITE V300 Ultra slim
       ========================================================================== */
      {
      id: "ignite-v300",
      name: "IGNITE V300 Ultra slim",
      puffs: "30.000 tragadas",
      flavors: [
        "Pineapple mango",
        "Minty melon",
        "Menthol",
      ],
      originalPrice: 150.0,
      promoPrice: 139.9,
      badge: "Últimas unidades",
      accent: "laranja",
      featured: false,
      image: "/img/produto6.svg",
      description: "Ótima opção para quem busca design, sabor intenso e preço em promoção.",
    },
    /* ==========================================================================
       NIKBAR 10.000
       ========================================================================== */
      {
      id: "nikbar-10000",
      name: "NIKBAR 10.000",
      puffs: "10.000 tragadas",
      flavors: [
        "Strawberry ice",
        "Menthol",
        "Watermelon ice",
        "Strawberry Kiwi",
        "Grape Strawberry",
        "Passion Sour Kiwi",
        "Grape Ice",
        "Watermelon Bubblegum",
        "Pineapple Ice",
        "Green apple ice",
        "Cherry watermelon",
        "Strawberry banana",
      ],
      originalPrice: 115.0,
      promoPrice: 99.9,
      badge: "Mais Opções",
      accent: "Azul",
      featured: false,
      image: "/img/produto7.svg",
      description: "Ótima opção para quem busca design, sabor intenso e preço em promoção.",
    },
/* ==========================================================================
       V-NANO 1.000
       ========================================================================== */
      {
      id: "v-nano-1000",
      name: "V-NANO 1.000",
      puffs: "1.000 tragadas",
      flavors: [
        "Passion fruit sour kiwi",
        "Grape ice",
      ],
      originalPrice: 75.0,
      promoPrice: 59.9,
      badge: "Ultimas Unidades",
      accent: "laranja",
      featured: false,
      image: "/img/produto8.svg",
      description: "Pequeno, portátil e discreto, ideal para quem quer experimentar sabores diferentes sem gastar muito.",
    },
/* ==========================================================================
       LOST VAPE 10.000
       ========================================================================== */
      {
      id: "lost-vape-10000",
      name: "LOST VAPE 10.000",
      puffs: "10.000 tragadas",
      flavors: [
        "Strawberry chew",
        "Miami mint",
        "Kiwi passion fruit guava",
        "Grape burst",
        "Peach Mango Watermelon",
      ],
      originalPrice: 110.0,
      promoPrice: 89.9,
      badge: "",
      accent: "",
      featured: false,
      image: "/img/produto9.svg",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },
/* ==========================================================================
       ELFBAR 20.000 Touch
       ========================================================================== */
      {
      id: "elfbar-20000-touch",
      name: "ELFBAR 20.000 Touch",
      puffs: "20.000 tragadas",
      flavors: [
        "Kiwi passion fruit guava",
        "Watermelon cherry",
        "Strawberry Watermelon Bubblegum",
        "Strawberry grape",
      ],
      originalPrice: 145.0,
      promoPrice: 109.9,
      badge: "",
      accent: "",
      featured: false,
      image: "/img/produto10.svg",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },
/* ==========================================================================
       IGNITE FROZEN 20.000
       ========================================================================== */
      {
      id: "ignite-frozen-20000",
      name: "IGNITE FROZEN 20.000",
      puffs: "20.000 tragadas",
      flavors: [
        "Strawberry kiwi",
        "Strawberry ice",
        "Watermelon",
        "Ice mint",
        "Menthol",
      ],
      originalPrice: 140.0,
      promoPrice: 129.9,
      badge: "",
      accent: "",
      featured: false,
      image: "/img/produto11.svg",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },
    
      /* ==========================================================================
       ELFBAR DUKE 35.000
       ========================================================================== */
      {
      id: "elfbar-duke-35000",
      name: "ELFBAR DUKE 35.000",
      puffs: "35.000 tragadas",
      flavors: [
        "Strawberry kiwi",
        "Watermelon lemon ice",
        "Watermelon ice",
        "Fanta grape",
        "Peach mango watermelon",
        "Mango magic",
        "Kiwi passion fruit guava",
        "Ice mint",
        "Pineapple ice",
      ],
      originalPrice: 145.0,
      promoPrice: 139.9,
      badge: "",
      accent: "",
      featured: false,
      image: "/img/produto12.svg",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },
      
      /* ==========================================================================
       ELFBAR BC 15.000
       ========================================================================== */
      {
      id: "elfbar-bc-15000",
      name: "ELFBAR BC 15.000",
      puffs: "15.000 tragadas",
      flavors: [
        "Americano ice",
        "Strawberry ice",
        "Sakura grape",
        "Pineapple ice",
        "Miami mint",
        "Bubballo tutti fruti",
        "Kiwi passion fruit guava",
      ],
      originalPrice: 109.9,
      promoPrice: 109.9,
      badge: "",
      accent: "",
      featured: false,
      image: "/img/produto13.svg",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },

      /* ==========================================================================
       ELFBAR TE 30.000
       ========================================================================== */
      {
      id: "elfbar-te-30000",
      name: "ELFBAR TE 30.000",
      puffs: "30.000 tragadas",
      flavors: [
        "		Banana coconut ice",
        "Strawberry ice",
        "Peach mango watermelon",
        "Menthol",
        "Watermelon ice",
      ],
      originalPrice: 134.9,
      promoPrice: 134.9,
      badge: "",
      accent: "",
      featured: false,
      image: "/img/produto14.svg",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
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
    babyBlue: "#a8d8ff",
    azul: "#2955A3",
    laranja: "#FF6E31",
  };

  function normalizeAccentKey(accent) {
    const key = String(accent || "").trim().toLowerCase();
    if (key === "baby blue" || key === "baby-blue") return "babyBlue";
    return key;
  }

  function getAccentColor(accent) {
    const normalized = normalizeAccentKey(accent);
    return ACCENT_HEX[normalized] || null;
  }

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
    const accentColor = getAccentColor(product.accent);
    const badgeStyle = accentColor ? `style="background: ${accentColor};"` : "";
    return `
      <article class="product-card" data-id="${product.id}">
        <span class="card-badge ${badgeClass}" ${badgeStyle}>${product.badge}</span>
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
    document.getElementById("hero-device").innerHTML = deviceSVG("babyBlue", 190);
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
