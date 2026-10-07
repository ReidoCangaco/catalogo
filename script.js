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
       IGNITE V500 - 50.000
       ========================================================================== */
    {
      id: "ignite-v500-50k",
      name: "IGNITE V500 - 50.000",
      puffs: "50.000 tragadas",
      flavors: [
        "Peach grape",
        "Strawberry kiwi",
        "Watermelon ice",
        "Cool Menthol",
        
      ],
      originalPrice: 190.0,
      promoPrice: 179.9,
      badge: "Promoção",
      accent: "Verde",
      featured: false,
      image: "./img/ignite-v500.webp",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },



    



    /* ==========================================================================
       RABBEATS 50K - 50.000
       ========================================================================== */
    {
      id: "rabbeats-50k",
      name: "RABBEATS - 50.000",
      puffs: "50.000 tragadas",
      flavors: [
        "Miami Mint",
        "Watermelon ice 🍉❄️", 
        "Kiwi passion fruit guava",
        "Icy mint🧊",
        "Sakura Grape",
        "Miami mint",
        "Triple berry",
        "Strawberry ice",
        "Fanta Strawberry",
      ],
      originalPrice: 150.0,
      promoPrice: 139.9,
      badge: "Promoção",
      accent: "Verde",
      featured: true,
      image: "./img/rabbeats-50k.webp",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },

      /* ==========================================================================
       Dinner Lady - 50.000
       ========================================================================== */
    {
      id: "dinner-lady-50k",
      name: "DINNER LADY - 50.000",
      puffs: "50.000 Puffs",
      flavors: [
        "Grape ice + Mint ice",
        "Watermelon ice  + strawberry ice",
      
      ],
      originalPrice: 169.9,
      promoPrice: 169.9,
      badge: "NOVIDADE",
      accent: "Amarelo",
      featured: false,
      image: "./img/dinner-lady-50k.webp",
      description: "Descartável premium com sabor marcante, bateria prolongada e acabamento fosco elegante.",
    }, 

/* ==========================================================================
       DOJO 40k VAPORESSO - 40.000
       ========================================================================== */
    {
      id: "dojo-40k-vaporesso",
      name: "DOJO 40k VAPORESSO - 40.000",
      puffs: "40.000 tragadas",
      flavors: [
        "Grape mojo",
        "Strawberry kiwi",
        
      ],
      originalPrice: 119.9,
      promoPrice: 119.9,
      badge: "NOVIDADE",
      accent: "Amarelo",
      featured: false,
      image: "./img/dojo-40k-vaporesso.webp",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },




    /* ==========================================================================
       IGNITE MIX 40.000
       ========================================================================== 
    {
      id: "ignite-mix-40k",
      name: "IGNITE MIX 40.000",
      puffs: "40.000 Puffs",
      flavors: [
        
      
      ],
      originalPrice: 159.9,
      promoPrice: 159.9,
      badge: "Últimas unidades",
      accent: "Vermelho",
      featured: false,
      image: "./img/ignite-mix-40k.webp",
      description: "Descartável premium com sabor marcante, bateria prolongada e acabamento fosco elegante.",
    }, */

    /* ==========================================================================
       ELFBAR 40.000 Iceking
       ========================================================================== */
    {
      id: "elfbar-40k-iceking",
      name: "ELFBAR 40.000 Iceking",
      puffs: "40.000 Puffs",
      flavors: [
        "Strawberry ice",
        "Grape ice",
      ],
      originalPrice: 159.9,
      promoPrice: 159.9,
      badge: "Mais Vendido",
      accent: "Verde",
      featured: false,
      image: "./img/elfbar40k-iceking.webp",
      description: "Descartável premium com sabor marcante, bateria prolongada e acabamento fosco elegante.",
    }, 

     /* ==========================================================================
       IGNITE Shisha 40K - 40.000
       ========================================================================== */
    {
      id: "ignite-shisha-40k",
      name: "IGNITE Shisha - 40.000",
      puffs: "40.000 tragadas",
      flavors: [
        "White Grape ice",
        "Double Apple",
        
      ],
      originalPrice: 180.0,
      promoPrice: 159.9,
      badge: "Promoção",
      accent: "Verde",
      featured: false,
      image: "./img/ignite-shisha-40k.webp",
      description: "O Pod Ignite Shisha 40K reúne recursos pensados para tornar a utilização mais prática e versátil. A possibilidade de alternar entre MTL, Mouth to Lung, e DTL, Direct to Lung, permite variar a experiência de vaporização de acordo com a preferência do usuário.",
    },

    /* ==========================================================================
       The black Sheep 40.000
       ========================================================================== */
    {
      id: "the-black-sheep-40k",
      name: "THE BLACK SHEEP 40.000",
      puffs: "40.000 Puffs",
      flavors: [
        "Kiwi Grape Starfruit + Açai Straw Banana",
        "Watermelon Grape + energy drink",
        "Fresh Mint + mango orange",
        "Strawberry Kiwi + Cola Lime",
        "Passion fruit + watermelon Strawberry ",
        "Grape mango + fresh Mint",
        "Passion Fruit + Watermelon strawberry",
      ],
      originalPrice: 169.9,
      promoPrice: 169.9,
      badge: "",
      accent: "",
      featured: false,
      image: "./img/the-black-sheep-40k.webp",
      description: "Novidade na JRS.",
    },


    /* ==========================================================================
       IGNITE ICE 40.000
       ========================================================================== */
    {
      id: "ignite-ice-40k",
      name: "IGNITE ICE 40.000",
      puffs: "40.000 Puffs",
      flavors: [
        "Menthol",
        "Grape",
      ],
      originalPrice: 164.9,
      promoPrice: 164.9,
      badge: "NOVIDADE",
      accent: "Amarelo",
      featured: false,
      image: "./img/ignite-ice-40k.webp",
      description: "Descartável premium com sabor marcante, bateria prolongada e acabamento fosco elegante.",
    }, 



    /* ==========================================================================
       ELFBAR 40.OOO TRIOOO
       ========================================================================== 
      {
      id: "elfbar40ktrio",
      name: "ELFBAR 40.000 TRIO",
      puffs: "40.000 tragadas",
      flavors: [
        "Watermelon ice 🍉❄️",
      ],
      originalPrice: 160.0,
      promoPrice: 149.9,
      badge: "",
      accent: "",
      featured: false,
      image: "./img/elfbar40ktrio.webp",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },
    */

    /* ==========================================================================
       LOST MARY 35.000
       ========================================================================== 
    {
      id: "lostmary-35k",
      name: "LOST MARY 35.000",
      puffs: "35.000 Puffs",
      flavors: [
        
      ],
      originalPrice: 160.0,
      promoPrice: 139.9,
      badge: "Mais Vendido",
      accent: "babyBlue",
      featured: false,
      image: "./img/lostmary-35k.webp",
      description: "Modelo com ampla seleção de sabores gelados e cítricos, ideal para quem troca de sabor toda hora.",
    },*/
    

    /* ==========================================================================
       Geek bar z35.000k
       ========================================================================== 
    {
      id: "geekbar-z35k",
      name: "GEEK BAR z35.000K",
      puffs: "35.000 Puffs",
      flavors: [
        "Extreme mint 🌿",
        "Frozen watermelon 🍉❄️",
      ],
      originalPrice: 139.9,
      promoPrice: 139.9,
      badge: "Novidade",
      accent: "verde",
      featured: false,
      image: "./img/geekbar-z35k.webp",
      description: "Novidade na JRS PUFFS, com design elegante, bateria duradoura e sabores irresistíveis.",
    },*/


    /* ==========================================================================
       ELFBAR DUKE 35.000
       ==========================================================================*/
      {
      id: "elfbar-duke-35000",
      name: "ELFBAR DUKE 35.000",
      puffs: "35.000 tragadas",
      flavors: [
        "Blueberry ice 🫐❄️",
        "Mango magic 🍍",

      ],
      originalPrice: 139.9,
      promoPrice: 139.9,
      badge: "",
      accent: "",
      featured: false,
      image: "./img/elfbar-duke-35000.webp",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },
    

    /* ==========================================================================
       IGNITE V300 Ultra slim
       ========================================================================== 
      {
      id: "ignite-v300",
      name: "IGNITE V300 Ultra slim",
      puffs: "30.000 tragadas",
      flavors: [
        "Strawberry ice",
      ],
      originalPrice: 150.0,
      promoPrice: 139.9,
      badge: "Últimas unidades",
      accent: "laranja",
      featured: false,
      image: "./img/ignite-v300.webp",
      description: "Ótima opção para quem busca design, sabor intenso e preço em promoção.",
    },
    */


   /* ==========================================================================
       HQD glaze plus 30k - 30.000
       ========================================================================== */
      {
      id: "hqd-glaze-plus",
      name: "Hqd Glaze Plus - 30.000",
      puffs: "30.000 tragadas",
      flavors: [
        "Menthol🧊",
        "Grape Ice🍇",
        "Watermelon ice🍉",
        "Strawberry kiwi🍓",
        "Strawberry watermelon🍓🍉"
        
      ],
      originalPrice: 129.9,
      promoPrice: 129.9,
      badge: "Sabores Novos",
      accent: "Amarelo",
      featured: false,
      image: "./img/hqd-glaze-plus.webp",
      description: "Pequeno, portátil e discreto, ideal para quem quer experimentar sabores diferentes sem gastar muito.",
   },



    /* ==========================================================================
       ELFBAR TE 30.000
       ========================================================================== */
      {
      id: "elfbar-te-30000",
      name: "ELFBAR TE 30.000",
      puffs: "30.000 tragadas",
      flavors: [
        "Blueberry ice 🫐❄️",
        "Strawmelon peach 🍓🍑",
        "Peach mango watermelon 🍑🥭🍉",
      ],
      originalPrice: 134.9,
      promoPrice: 134.9,
      badge: "",
      accent: "",
      featured: false,
      image: "./img/elfbar-te-30000.webp",
      description: "",
    },

    /* ==========================================================================
       DINNER LADY 20.000
       ========================================================================== */
      {
      id: "dinnerlady-20k",
      name: "DINNER LADY 20.000",
      puffs: "20.000 tragadas",
      flavors: [

        "Kiwi passion fruit 🥝🍓",
        "Strawberry ice 🍓❄️",
        "Watermelon ice 🍉❄️",
        "Mango ice 🍓❄️",
        "Menthol 🌿",

      ],
      originalPrice: 130.0,
      promoPrice: 119.9,
      badge: "Promoção",
      accent: "Verde",
      featured: false,
      image: "./img/dinnerlady-20k.webp",
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
        "Kiwi passion fruit guava 🥝🍓",
      ],
      originalPrice: 119.9,
      promoPrice: 119.9,
      badge: "Últimas unidades",
      accent: "Vermelho",
      featured: false,
      image: "./img/elfbar-20000-touch.webp",
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
        "Blueberry 🫐",
        "Grape ice ",
        "Watermelon ice ",
        "Strawberry ice ",
        "Icy Mint "

      ],
      originalPrice: 129.9,
      promoPrice: 129.9,
      badge: "Reposição",
      accent: "Verde",
      featured: false,
      image: "./img/ignite-frozen-20000.webp",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },


    /* ==========================================================================
       Addict S200 - 20.000
       ========================================================================== */
      {
      id: "addict-s200",
      name: "Addict S200 - 20.000",
      puffs: "20.000 tragadas",
      flavors: [
        "Pineapple ice",
        "Grape ice",
        "Menthol"
      ],
      originalPrice: 129.9,
      promoPrice: 129.9,
      badge: "NOVIDADE",
      accent: "Amarelo",
      featured: false,
      image: "./img/addict-s200.webp",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },

    

      /* ==========================================================================
       IGNITE V155 - 15.000
       ========================================================================== */
    {
      id: "ignite-v155",
      name: "IGNITE V155",
      puffs: "15.000 Puffs",
      flavors: [
        "Menthol❄️",
        "Grape ice",
        "Watermelon ice🍉❄️",
        "Strawberry ice🍓❄️",
        "Strawberry kiwi🍓🥝",
        
      ],
      originalPrice: 119.9,
      promoPrice: 119.9,
      badge: "Reposição",
      accent: "Verde",
      featured: false,
      image: "./img/v155.webp", 
      description: "O equilíbrio perfeito entre preço e variedade, com 9 sabores populares e entrega rápida.",
    },

    
    /* ==========================================================================
       ELFBAR BC 15.000
       ========================================================================== */
      {
      id: "elfbar-bc-15000",
      name: "ELFBAR BC 15.000",
      puffs: "15.000 tragadas",
      flavors: [
      "Icy Mint",
      "Miami Mint",
      "Tropical lemonade",
      "Strawberry kiwi",
      "Strawberry ice",
      "Kiwi passion Fruit Guava",
      "Mango magic",
      "Americano ice",
      "Passion fruit orange guava",
      "Peach mango watermelon",

      ],
      originalPrice: 109.9,
      promoPrice: 109.9,
      badge: "Reposição",
      accent: "Amarelo",
      featured: false,
      image: "./img/elfbar-bc-15000.webp",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },

    

    /* ==========================================================================
       NIKBAR 10.000
       ========================================================================== 
      {
      id: "nikbar-10000",
      name: "NIKBAR 10.000",
      puffs: "10.000 tragadas",
      flavors: [
        
        "Watermelon bubble gum",
        "Passion Sour kiwi",
        "Cherry watermelon ice",
        "Menthol",
        "Grape ice",
      ],
      originalPrice: 115.0,
      promoPrice: 99.9,
      badge: "",
      accent: "",
      featured: false,
      image: "./img/nikbar-10000.webp",
      description: "Ótima opção para quem busca design, sabor intenso e preço em promoção.",
    },*/

    /* ==========================================================================
       LOST VAPE 10.000
       ========================================================================== 
      {
      id: "lost-vape-10000",
      name: "LOST VAPE 10.000",
      puffs: "10.000 tragadas",
      flavors: [
        "Peach Mango Watermelon",
        "Grape burst",
        
      ],
      originalPrice: 110.0,
      promoPrice: 89.9,
      badge: "",
      accent: "",
      featured: false,
      image: "./img/lost-vape-10000.webp",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },*/

      /* ==========================================================================
       LOST MARY 10.000
       ========================================================================== */
      {
      id: "lost-mary-10000",
      name: "LOST MARY 10.000",
      puffs: "10.000 tragadas",
      flavors: [
        "Double Apple",
        "Triple mango",
        "Mango orange Pineapple",
        
      ],
      originalPrice: 0.0,
      promoPrice: 0.0,
      badge: "NOVIDADE",
      accent: "Amarelo",
      featured: false,
      image: "./img/lost-mary-10000.webp",
      description: "O queridinho dos vapers, com design elegante, bateria duradoura e sabores irresistíveis.",
    },




    /* ==========================================================================
       IGNITE V80 - Ultra slim 8.000
       ========================================================================== 
    {
      id: "ignite-v80ultra-slim",
      name: "IGNITE V80 - Ultra slim",
      puffs: "8.000 tragadas",
      flavors: [
        "Strawberry ice 🍓🧊",
        "Cactus",
      ],
      originalPrice: 119.9,
      promoPrice: 119.9,
      badge: "Últimas unidades",
      accent: "Vermelho",
      featured: false,
      image: "./img/ignite-v80ultraslim.webp",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },*/

    /* ==========================================================================
       IGNITE V80 - Normal 8.000
       ========================================================================== */
    {
      id: "ignite-v80",
      name: "IGNITE V80 - 8.000",
      puffs: "8.000 tragadas",
      flavors: [
        "Cactus",
        "Blueberry ice",
      ],
      originalPrice: 109.9,
      promoPrice: 99.9,
      badge: "",
      accent: "",
      featured: false,
      image: "./img/ignite-v80normal.webp",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },
    

    /* ==========================================================================
       IGNITE V55 - 5.500
       ========================================================================== */
    {
      id: "ignite-v55",
      name: "IGNITE V55 - 5.500",
      puffs: "5.500 tragadas",
      flavors: [
        "Melon mix",
        "Strawberry ice",
        "Strawberry watermelon",
        "Miami Mint",
        "Aloe Grape",
        "Minty Melon",

      ],
      originalPrice: 99.9,
      promoPrice: 99.9,
      badge: "Reposição",
      accent: "Amarelo",
      featured: false,
      image: "./img/ignite-v55.webp",
      description: "Ótima opção para quem busca design compacto, sabor intenso e preço em promoção.",
    },
    

    

/* ==========================================================================
       V-NANO 1.000
       ========================================================================== 
      {
      id: "v-nano-1000",
      name: "V-NANO 1.000",
      puffs: "1.000 tragadas",
      flavors: [
        "Passion fruit sour kiwi",
      ],
      originalPrice: 75.0,
      promoPrice: 59.9,
      badge: "Ultimas Unidades",
      accent: "laranja",
      featured: false,
      image: "./img/v-nano-1000.webp",
      description: "Pequeno, portátil e discreto, ideal para quem quer experimentar sabores diferentes sem gastar muito.",
   },*/

    



    

  ];

  PRODUCTS.forEach((product) => {
    product.optionsCount = product.flavors.length;
  });

  /* --------------------------------------------------------------------
     3. HELPERS - Adição de cores aos produtos
     -------------------------------------------------------------------- */
  const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  const CAMPAIGN = {
    label: "",
    message: "Sejam Bem Vindos.",
  };

  function getProductPrice(product) {
    const originalPrice = Number(product.originalPrice);
    const promoPrice = Number(product.promoPrice);
    const isPromotion = Number.isFinite(promoPrice) && promoPrice > 0 && promoPrice < originalPrice;

    return {
      currentPrice: isPromotion ? promoPrice : originalPrice,
      originalPrice,
      isPromotion,
    };
  }

  function priceHTML(product) {
    const { currentPrice, originalPrice, isPromotion } = getProductPrice(product);
    const oldPrice = isPromotion
      ? `<span class="price-old">${currency.format(originalPrice)}</span>`
      : "";
    const discountPercent =
      product.badge === "Promoção" && originalPrice > 0 && currentPrice < originalPrice
        ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
        : 0;
    const discount = discountPercent > 0 ? `<span class="discount-percent">${discountPercent}% OFF</span>` : "";

    return `<span class="price-new">${currency.format(currentPrice)}</span>${oldPrice}${discount}`;
  }


  /* ------- Adição de Cores e alteração ---------- */
  const ACCENT_HEX = {
    verde: "#34D399",
    babyBlue: "#7DD3FC",
    azul: "#60A5FA",
    laranja: "#FB923C",
    branco: "#F3F4F6",
    vermelho: "#F87171",
    amarelo: "#FACC15",
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
  const isFeatured = (product) => product.featured === true || product.badge === "Promoção";

  function productCardHTML(product) {
    const productPageLink = `produto.html?id=${encodeURIComponent(product.id)}`;
    const badgeClass = isFeatured(product) ? "oferta" : "";
    const promotionClass = product.badge === "Promoção" ? " promocao" : "";
    const badgeText = product.badge === "Promoção" ? "🔥 PROMOÇÃO" : product.badge;
    const accentColor = getAccentColor(product.accent);
    // --card-accent alimenta tanto o glow quanto a cor do badge via CSS (herança de custom property)
    const cardStyle = accentColor ? ` style="--card-accent:${accentColor}"` : "";
    return `
      <article class="product-card${promotionClass} reveal" data-id="${product.id}"${cardStyle}>
        <span class="card-badge ${badgeClass}${promotionClass}">${badgeText}</span>
        <div class="card-media">
          <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-meta">${product.optionsCount} opções</p>
          <div class="card-price-block">
            ${priceHTML(product)}
          </div>
          <p class="campaign-price-note"><span aria-hidden="true"></span> ${CAMPAIGN.label} <span class="campaign-price-note-detail"> </span></p>
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
    observeRevealTargets(grid);
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

    const imageCard = document.querySelector(".product-image-card");
    const accentColor = getAccentColor(product.accent);
    if (imageCard && accentColor) imageCard.style.setProperty("--card-accent", accentColor);

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
    const { currentPrice, originalPrice, isPromotion } = getProductPrice(product);
    document.getElementById("product-page-price").textContent = currency.format(currentPrice);
    const oldPrice = document.getElementById("product-page-old-price");
    oldPrice.textContent = isPromotion ? currency.format(originalPrice) : "";
    oldPrice.hidden = !isPromotion;

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

    toggleButton.hidden = product.flavors.length <= 8;
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

    list = list.sort((a, b) => {
      const featuredPriority = Number(isFeatured(b)) - Number(isFeatured(a));
      if (featuredPriority !== 0) return featuredPriority;

      switch (sortBy) {
        case "menor-preco":
          return getProductPrice(a).currentPrice - getProductPrice(b).currentPrice;
        case "maior-preco":
          return getProductPrice(b).currentPrice - getProductPrice(a).currentPrice;
        case "mais-opcoes":
          return b.optionsCount - a.optionsCount;
        case "relevancia":
        default:
          return 0;
      }
    });

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

  /* --------------------------------------------------------------------
     7. INTERAÇÕES — reveal ao rolar + header reativo
     Só usa transform/opacity (compositor-friendly) e respeita
     prefers-reduced-motion. Nada de libs externas.
     -------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let revealObserver = null;
  function getRevealObserver() {
    if (revealObserver || prefersReducedMotion) return revealObserver;
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    return revealObserver;
  }

  // Marca elementos "estáticos" (que não são re-renderizados) com a classe reveal
  function markStaticRevealTargets() {
    const selectors = [
      ".section-heading",
      ".differentials li",
      ".contact-card",
      ".toolbar",
      ".product-image-card",
      ".product-page-content",
    ];
    document.querySelectorAll(selectors.join(",")).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
    });
  }

  // Observa todo elemento .reveal que ainda não foi observado (chamado no init
  // e de novo depois de cada re-render do catálogo, já que os cards são novos nós)
  function observeRevealTargets(root = document) {
    if (prefersReducedMotion) {
      root.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = getRevealObserver();
    root.querySelectorAll(".reveal:not(.is-visible)").forEach((el, i) => {
      if (!el.dataset.revealDelay) {
        el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
        el.dataset.revealDelay = "1";
      }
      observer.observe(el);
    });
  }

  // Header encolhe/ganha sombra depois de rolar um pouco a página
  function setupHeaderScrollState() {
    const header = document.getElementById("topo");
    if (!header) return;
    let ticking = false;
    const update = () => {
      header.classList.toggle("scrolled", window.scrollY > 12);
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
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

  function setupHeroScrollAnimation() {
    const hero = document.getElementById("home");
    const catalog = document.getElementById("catalogo");
    const catalogGrid = document.getElementById("catalog-grid");
    const catalogTitle = catalog && catalog.querySelector(".section-heading h2");
    const catalogCopy = catalog && catalog.querySelector(".section-heading p");
    if (!hero || !catalog || !catalogGrid || !catalogTitle || typeof window.requestAnimationFrame !== "function") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const transition = hero.nextElementSibling;
    let frame = 0;
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const easeBetween = (start, end, value) => {
      const amount = clamp((value - start) / (end - start), 0, 1);
      return amount * amount * (3 - 2 * amount);
    };
    const update = () => {
      frame = 0;
      const heroTop = window.scrollY + hero.getBoundingClientRect().top;
      const gridTop = window.scrollY + catalogGrid.getBoundingClientRect().top;
      const distance = Math.max(gridTop - heroTop - window.innerHeight * 0.78, hero.offsetHeight * 0.72, 1);
      const progress = clamp((window.scrollY - heroTop) / distance, 0, 1);
      const logoScale = progress < 0.38
        ? 1 + (progress / 0.38) * 0.075
        : 1.075 - ((progress - 0.38) / 0.62) * 0.22;
      const logoExit = easeBetween(0.68, 0.98, progress);
      const supportExit = easeBetween(0.58, 0.94, progress);
      const intro = easeBetween(0.36, 0.76, progress);
      const transitionLine = easeBetween(0.18, 0.88, progress);
      const smokeFront = Math.sin(easeBetween(0.2, 0.92, progress) * Math.PI);

      hero.style.setProperty("--hero-scroll-y", `${-progress * hero.offsetHeight * 0.22}px`);
      hero.style.setProperty("--hero-scroll-scale", logoScale.toFixed(3));
      hero.style.setProperty("--hero-scroll-opacity", (1 - logoExit).toFixed(3));
      hero.style.setProperty("--hero-eyebrow-y", `${-progress * 22}px`);
      hero.style.setProperty("--hero-eyebrow-opacity", (1 - easeBetween(0.22, 0.68, progress)).toFixed(3));
      hero.style.setProperty("--hero-support-y", `${-progress * 24}px`);
      hero.style.setProperty("--hero-support-opacity", (1 - supportExit).toFixed(3));
      hero.style.setProperty("--hero-smoke-back-y", `${-progress * hero.offsetHeight * 0.09}px`);
      hero.style.setProperty("--hero-smoke-back-x", `${progress * 12}px`);
      hero.style.setProperty("--hero-smoke-front-y", `${progress * hero.offsetHeight * 0.055}px`);
      hero.style.setProperty("--hero-smoke-front-x", `${-progress * 20}px`);
      hero.style.setProperty("--hero-smoke-back-opacity", (0.3 - progress * 0.2).toFixed(3));
      hero.style.setProperty("--hero-smoke-front-opacity", (0.025 + smokeFront * 0.105).toFixed(3));
      hero.style.setProperty("--hero-overlay-opacity", (0.38 - progress * 0.22).toFixed(3));
      hero.style.setProperty("--hero-haze-opacity", (0.68 - progress * 0.42).toFixed(3));
      hero.style.setProperty("--hero-bg-y", `${-progress * 8}px`);
      hero.style.setProperty("--hero-bg-scale", (1 + progress * 0.025).toFixed(3));
      hero.style.setProperty("--hero-cue-opacity", (1 - Math.min(progress * 5, 1)).toFixed(3));
      catalogTitle.style.setProperty("--catalog-title-y", `${(1 - intro) * 42}px`);
      catalogTitle.style.setProperty("--catalog-title-scale", (0.78 + intro * 0.22).toFixed(3));
      catalogTitle.style.setProperty("--catalog-title-opacity", intro.toFixed(3));
      catalogTitle.style.setProperty("--catalog-title-clip", `${(1 - intro) * 100}%`);
      catalogTitle.style.setProperty("--catalog-rule-scale", (0.12 + intro * 0.88).toFixed(3));
      if (catalogCopy) {
        const copyIntro = easeBetween(0.48, 0.84, progress);
        catalogCopy.style.setProperty("--catalog-copy-y", `${(1 - copyIntro) * 24}px`);
        catalogCopy.style.setProperty("--catalog-copy-opacity", copyIntro.toFixed(3));
      }
      if (transition && transition.classList.contains("bunting")) {
        transition.style.setProperty("--home-transition-progress", transitionLine.toFixed(3));
        transition.style.setProperty("--home-transition-opacity", (transitionLine * (1 - easeBetween(0.9, 1, progress) * 0.3)).toFixed(3));
      }
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    document.body.classList.add("hero-scroll-story-ready");
    hero.classList.add("hero-scroll-animation-ready");
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    scheduleUpdate();
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
    setupHeaderScrollState();
    setupHeroScrollAnimation();
    setupCatalogControls();
    markStaticRevealTargets();

    const isCatalogPage = document.getElementById("catalog-grid") !== null;
    const isProductPage = document.body.dataset.page === "product";

    if (isCatalogPage) {
      const sortSelect = document.getElementById("sort-select");
      if (sortSelect) {
        sortSelect.value = "maior-preco";
      }
      applyCatalogFilters();
    }

    if (isProductPage) {
      const productId = getQueryParam("id");
      const product = PRODUCTS.find((item) => item.id === productId);
      if (product) {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = `https://jrspuffs.shop/produto.html?id=${encodeURIComponent(product.id)}`;
        renderProductPage(product);
      } else {
        renderNotFound();
      }
    }

    observeRevealTargets(document);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
