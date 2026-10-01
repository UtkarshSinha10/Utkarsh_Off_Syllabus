// Turns the data in content.js into page markup.
// To add a new section type: write a renderer below and register it in `renderers`.
import { icons } from './icons.js';

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);
// Escaped text with **bold** support
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

function linkButton(link) {
  const icon = icons[link.icon] || '';
  if (!link.url) {
    return `<span class="btn ghost" title="Coming soon">${icon}${esc(link.label)}</span>`;
  }
  const cls = link.primary ? 'btn primary' : 'btn';
  return `<a class="${cls}" href="${esc(link.url)}" target="_blank" rel="noopener">${icon}${esc(link.label)}</a>`;
}

function hero(site) {
  const p = site.portrait;
  const title = site.brand.split(' ').map(esc).join('<br>');
  const badges = (p.badges || []).slice(0, 3).map((b, i) => `<div class="chip c${i + 1}">${rich(b)}</div>`).join('');
  return `
    <header class="hero">
      <div>
        <div class="eyebrow">${esc(site.eyebrow)}</div>
        <h1>${title}</h1>
        <p class="tagline">${esc(site.tagline)}</p>
        <div class="cta">${site.links.map(linkButton).join('')}</div>
      </div>
      <div class="scene">
        <div class="portrait tilt" data-tilt data-base-x="6" data-base-y="-14">
          <div class="frame"></div>
          <div class="photo"><img src="${esc(p.src)}" alt="${esc(p.alt)}" width="${p.width}" height="${p.height}"></div>
          ${badges}
        </div>
      </div>
    </header>`;
}

const renderers = {
  about: (s) => `
    <div class="about">${s.paragraphs.map((t) => `<p>${rich(t)}</p>`).join('')}</div>`,

  timeline: (s) => `
    <ol class="steps reveal-wrap">
      ${s.items.map((it, i) => `
        <li class="reveal${it.current ? ' current' : ''}" style="--i:${i}">
          <span class="year">${esc(it.year)}</span><span>${rich(it.text)}</span>
        </li>`).join('')}
    </ol>`,

  cards: (s) => `
    <div class="cards reveal-wrap">
      ${s.items.map((it) => `
        <div class="reveal scene">
          <div class="card tilt" data-tilt>
            <div class="icon">${esc(it.icon)}</div>
            <h3>${esc(it.title)}</h3>
            <p>${rich(it.text)}</p>
          </div>
        </div>`).join('')}
    </div>`,

  gallery: (s) => `
    <div data-carousel data-autoplay="${s.autoplayMs ?? 4000}">
      <div class="carousel" aria-roledescription="carousel" aria-label="${esc(s.title)}">
        <div class="ring">
          ${s.photos.map((ph) => `
            <figure class="slide">
              <img src="${esc(ph.src)}" alt="${esc(ph.alt)}" loading="lazy">
              <figcaption>${esc(ph.title)}<span>${esc(ph.caption)}</span></figcaption>
            </figure>`).join('')}
        </div>
      </div>
      <div class="controls">
        <button type="button" data-prev aria-label="Previous photo">←</button>
        <button type="button" data-next aria-label="Next photo">→</button>
      </div>
    </div>`,
};

function section(s, i) {
  const render = renderers[s.type];
  if (!render) {
    console.warn(`Unknown section type "${s.type}" — skipped`);
    return '';
  }
  const num = String(i + 1).padStart(2, '0');
  return `
    <section>
      <div class="sec-head"><span class="num">${num}</span><h2>${esc(s.title)}</h2></div>
      ${render(s)}
    </section>`;
}

function footer(site) {
  const links = site.links
    .filter((l) => l.url)
    .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.footer || l.label)} ↗</a>`)
    .join('');
  return `
    <footer>
      <div class="row">
        <span>© ${new Date().getFullYear()} ${esc(site.brand)} · ${esc(site.owner)}</span>
        <span class="links">${links}</span>
      </div>
    </footer>`;
}

export function renderPage(root, site) {
  root.innerHTML = hero(site) + site.sections.map(section).join('') + footer(site);
}
