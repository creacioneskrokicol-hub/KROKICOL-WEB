const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}
document.getElementById("year").textContent = new Date().getFullYear();

// Si todavía no existe hero.mp4, el poster SVG mantiene visible la portada.

// =====================================
// CARRUSEL PRINCIPAL KROKICOL
// =====================================

const hero = document.querySelector(".hero");
const heroImage = document.getElementById("hero-carousel-image");
const heroIndicators = document.querySelectorAll("#hero-indicators button");

// Aquí agregamos las imágenes del carrusel
const heroImages = [
    "assets/images/hero-krokicol.png",
    "assets/images/P-2.png",
    "assets/images/P-3.png"
];

let heroIndex = 0;
let heroTimer;

// Cambiar imagen
function changeHeroImage(index) {

    heroIndex = index;

    heroImage.classList.add("is-changing");

    setTimeout(() => {

        heroImage.src = heroImages[heroIndex];

        hero.classList.toggle("hero-slide-alt", heroIndex !== 0);

        heroIndicators.forEach((button, i) => {
            button.classList.toggle("active", i === heroIndex);
        });

        heroImage.classList.remove("is-changing");

    }, 350);
}

// Avanzar automáticamente
function startHeroCarousel() {

    clearInterval(heroTimer);

    heroTimer = setInterval(() => {

        const nextIndex = (heroIndex + 1) % heroImages.length;

        changeHeroImage(nextIndex);

    }, 6000);
}

// Cambiar al seleccionar un indicador
heroIndicators.forEach((button, index) => {

    button.addEventListener("click", () => {

        changeHeroImage(index);
        startHeroCarousel();

    });

});

// Precargar imágenes
heroImages.forEach(src => {
    const image = new Image();
    image.src = src;
});

// Iniciar carrusel
startHeroCarousel();

// Imágenes disponibles para cada categoría
const categoryCarousels = {
    "baby-carousel-image": [
        "assets/images/baby1.png",
        "assets/images/baby2.png",
        "assets/images/baby3.png",
        "assets/images/baby4.png"
    ],

    "nino-carousel-image": [
        "assets/images/nin1.png",
        "assets/images/nin2.png",
        "assets/images/nin3.png",
        "assets/images/nin4.png"
    ],

    "juvenil-carousel-image": [
        "assets/images/juv1.png",
        "assets/images/juv2.png",
        "assets/images/juv3.png",
        "assets/images/juv4.png"
    ],

    "dama-carousel-image": [
        "assets/images/dam1.png",
        "assets/images/dam2.png",
        "assets/images/dam3.png",
        "assets/images/dam4.png"
    ],

    "hombre-carousel-image": [
        "assets/images/hom1.png",
        "assets/images/hom2.png",
        "assets/images/hom3.png",
        "assets/images/hom4.png"
    ]
};

const categoryGrid = document.querySelector(".category-grid");
const categoryCards = [...categoryGrid.querySelectorAll(".category-card")];

let activeTimer = null;
let activeIndex = 0;
let activeImage = null;
let activeImages = [];
let startX = 0;
let suppressClick = false;


function changeActiveImage(direction) {
    if (!activeImages.length || !activeImage) return;

    activeIndex = (activeIndex + direction + activeImages.length) % activeImages.length;

    activeImage.classList.remove("is-changing");
    activeImage.src = activeImages[activeIndex];

    void activeImage.offsetWidth;

    activeImage.classList.add("is-changing");

    // Reiniciar el tiempo del carrusel automático
    clearInterval(activeTimer);

    activeTimer = setInterval(() => {
        changeActiveImage(1);
    }, 3000);
}

// Cambiar la categoría protagonista
function activateCategory(selectedCard) {

    clearInterval(activeTimer);

    const selectedIndex = categoryCards.indexOf(selectedCard);

    // Reorganizar las categorías desde la seleccionada
    const reorderedCards = [
        ...categoryCards.slice(selectedIndex),
        ...categoryCards.slice(0, selectedIndex)
    ];

    reorderedCards.forEach((card, index) => {
        card.classList.toggle("category-large", index === 0);
        categoryGrid.appendChild(card);
    });

    // Actualizar el orden de referencia
    categoryCards.splice(0, categoryCards.length, ...reorderedCards);

    // Obtener el carrusel de la categoría protagonista
    activeImage = selectedCard.querySelector(".category-carousel-image");

if (!activeImage) return;

activeImages = categoryCarousels[activeImage.id];

if (!activeImages) return;

activeIndex = 0;
activeImage.src = activeImages[0];

    // Iniciar únicamente el carrusel protagonista
    activeTimer = setInterval(() => {
    changeActiveImage(1);
}, 3000);
}

// Preparar las imágenes y activar Baby inicialmente
Object.values(categoryCarousels).flat().forEach(src => {
    const img = new Image();
    img.src = src;
});

// Evitar que las categorías naveguen a otra sección
categoryCards.forEach(card => {

    card.addEventListener("pointerdown", event => {
    // No capturar el puntero cuando se pulsan las flechas
    if (event.target.closest(".carousel-arrow")) return;

    if (!card.classList.contains("category-large")) return;

    startX = event.clientX;

    card.setPointerCapture(event.pointerId);
});

    card.addEventListener("pointerup", event => {
    // Ignorar los eventos de las flechas
    if (event.target.closest(".carousel-arrow")) return;

    if (!card.classList.contains("category-large")) return;

    const distance = event.clientX - startX;

    if (Math.abs(distance) > 45) {
        suppressClick = true;

        changeActiveImage(distance < 0 ? 1 : -1);
    }
});

    
card.addEventListener("click", event => {
  event.preventDefault();

  // Evitar que las flechas reinicien la categoría
  if (event.target.closest(".carousel-arrow")) {
    return;
  }

  if (suppressClick) {
    suppressClick = false;
    return;
  }

  activateCategory(card);
});


});

// Iniciar con Baby como protagonista
activateCategory(categoryCards[0]);


// Controles manuales de las flechas
categoryGrid.addEventListener("click", event => {
  const arrow = event.target.closest(".carousel-arrow");

  if (!arrow) return;

  event.preventDefault();
  event.stopPropagation();

  if (!arrow.closest(".category-card").classList.contains("category-large")) {
    return;
  }

  if (arrow.classList.contains("prev")) {
    changeActiveImage(-1);
  } else if (arrow.classList.contains("next")) {
    changeActiveImage(1);
  }
});
