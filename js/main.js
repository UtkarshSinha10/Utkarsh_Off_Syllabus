// Entry point: render content, then attach effects.
import { site } from './content.js';
import { renderPage } from './render.js';
import { initTilt } from './effects/tilt.js';
import { initReveal } from './effects/reveal.js';
import { initCarousel } from './effects/carousel.js';
import { initTooltips } from './effects/tooltips.js';
import { initRefresh } from './layout.js';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

renderPage(document.getElementById('app'), site);
initTilt({ reduceMotion });
initReveal({ reduceMotion });
initTooltips();
initRefresh();
document.querySelectorAll('[data-carousel]').forEach((el) => initCarousel(el, { reduceMotion }));
