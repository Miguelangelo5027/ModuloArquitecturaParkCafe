/**
 * Datos de las diapositivas del módulo de arquitectura cafetera.
 */
const slides = [
  {
    id: 'portada',
    type: 'cover',
    tag: 'Módulo de Arquitectura',
    title: 'Casas Tradicionales de la Región Cafetera',
    description: 'Un recorrido por el Paisaje Cultural Cafetero, Patrimonio de la Humanidad.',
  },
  {
    id: 'bahareque',
    tag: 'Técnica Constructiva',
    title: 'El Bahareque',
    description: 'Entramado de guadua y barro que brinda resistencia sísmica y sostenibilidad.',
    image: 'museo-cafetero/src/images/Destacada-Casa-Campesina-Cortar-con-Zoom-1.jpg',
  },
  {
    id: 'balcones',
    tag: 'Elemento Característico',
    title: 'Corredores y Balcones',
    description: 'Espacios de vida social con barandas torneadas y colores vivos.',
    image: 'museo-cafetero/src/images/5475774821_e2c688552a_z.jpg',
  },
  {
    id: 'puertas-ventanas',
    tag: 'Carpintería Tradicional',
    title: 'Puertas y Ventanas',
    description: 'Talladas en cedro y comino con diseños geométricos y postigos funcionales.',
    image: 'museo-cafetero/src/images/Vista-de-una-finca-de-cafe-en-Guatemala-perspectiva-con-cafetos-1024x683.jpg',
  },
  {
    id: 'patio',
    tag: 'Espacio Central',
    title: 'El Patio Interior',
    description: 'Centro de la casa con jardín, fuente de agua y macetas de barro.',
    image: 'museo-cafetero/src/images/Destacada-Casa-Campesina-Cortar-con-Zoom-1.jpg',
  },
  {
    id: 'cocina',
    tag: 'Vida Cotidiana',
    title: 'La Cocina Tradicional',
    description: 'Fogón de leña en adobe donde se prepara el café y la comida típica.',
    image: 'museo-cafetero/src/images/5475774821_e2c688552a_z.jpg',
  },
  {
    id: 'techo',
    tag: 'Estructura Superior',
    title: 'Techos y Tejas de Barro',
    description: 'Pendientes pronunciadas con tejas artesanales para las lluvias andinas.',
    image: 'museo-cafetero/src/images/Vista-de-una-finca-de-cafe-en-Guatemala-perspectiva-con-cafetos-1024x683.jpg',
  },
  {
    id: 'cierre',
    type: 'cover',
    tag: 'Patrimonio de la Humanidad',
    title: 'Preservar para el Futuro',
    description: 'La arquitectura cafetera: memoria viva de generaciones de familias caficultoras.',
  },
];

/* ===== STATE ===== */
let current = 0;
let direction = 'right';
const total = slides.length;

/* ===== DOM REFERENCES ===== */
const container   = document.getElementById('slides-container');
const progressBar = document.getElementById('progress-bar');
const dotsWrapper  = document.getElementById('nav-dots');
const counter     = document.getElementById('nav-counter');
const btnPrev     = document.getElementById('btn-prev');
const btnNext     = document.getElementById('btn-next');

/* ===== BUILD SLIDES ===== */
function buildSlides() {
  slides.forEach((slide) => {
    const div = document.createElement('div');
    div.id = `slide-${slide.id}`;
    div.className = 'slide';

    const innerClass = slide.type === 'cover'
      ? 'slide__inner slide__inner--cover'
      : 'slide__inner';

    let imageHTML = '';
    if (slide.image) {
      imageHTML = `
        <div class="slide__image-wrapper">
          <img class="slide__image" src="${slide.image}" alt="${slide.title}" />
        </div>`;
    }

    const titleClass = slide.type === 'cover'
      ? 'slide__title slide__title--cover'
      : 'slide__title';

    div.innerHTML = `
      <div class="${innerClass}">
        ${imageHTML}
        <div class="slide__content">
          <span class="slide__tag">☕ ${slide.tag}</span>
          <h2 class="${titleClass}">${slide.title}</h2>
          <p class="slide__description">${slide.description}</p>
        </div>
      </div>`;

    container.appendChild(div);
  });
}

/* ===== BUILD DOTS ===== */
function buildDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'nav__dot';
    dot.setAttribute('aria-label', `Ir a diapositiva ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrapper.appendChild(dot);
  });
}

/* ===== UPDATE UI ===== */
function updateUI() {
  const slideEls = container.children;
  const dotEls   = dotsWrapper.children;

  for (let i = 0; i < total; i++) {
    if (i === current) {
      slideEls[i].className = 'slide slide--active';
      dotEls[i].classList.add('nav__dot--active');
    } else {
      slideEls[i].className = direction === 'right'
        ? 'slide slide--enter-right'
        : 'slide slide--enter-left';
      dotEls[i].classList.remove('nav__dot--active');
    }
  }

  // Progress bar
  const progress = ((current + 1) / total) * 100;
  progressBar.style.width = `${progress}%`;

  // Counter
  counter.textContent = `${current + 1} / ${total}`;

  // Button states
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === total - 1;
}

/* ===== NAVIGATION ===== */
function goTo(index) {
  if (index < 0 || index >= total || index === current) return;
  direction = index > current ? 'right' : 'left';
  current = index;
  updateUI();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

/* ===== EVENT LISTENERS ===== */
btnNext.addEventListener('click', next);
btnPrev.addEventListener('click', prev);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  }
});

/* ===== INIT ===== */
buildSlides();
buildDots();
updateUI();
