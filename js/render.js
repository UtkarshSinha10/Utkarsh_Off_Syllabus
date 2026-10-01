// Turns the data in content.js into page markup.
// To add a new section type: write a renderer below and register it in `renderers`.
import { icons } from './icons.js';
import { esc, rich, external } from './util.js';
import { renderNav, renderFooter } from './layout.js';
import { visibleEssays, essayList } from './essays.js';

// Icon-only hero button; the label becomes the tooltip and accessible name.
function linkButton(link) {
  const icon = icons[link.icon] || esc(link.label);
  const label = esc(link.label);
  if (!link.url) {
    return `<span class="btn icon-btn ghost" role="img" aria-label="${label}" title="${label}">${icon}</span>`;
  }
  const cls = link.primary ? 'btn icon-btn primary' : 'btn icon-btn';
  return `<a class="${cls}" href="${esc(link.url)}"${external(link.url)} aria-label="${label}" title="${label}">${icon}</a>`;
}

function badge(b, i) {
  const tip = b.note ? `<span class="tip" role="tooltip" id="tip-${i}">${rich(b.note)}</span>` : '';
  const describedBy = b.note ? ` aria-describedby="tip-${i}"` : '';
  return `<button type="button" class="chip c${i + 1}"${describedBy}>${rich(b.label)}${tip}</button>`;
}

function hero(site) {
  const p = site.portrait;
  // Break the brand onto lines after each "_" or space, keeping underscores visible
  const title = site.brand.split(/(?<=_)|\s+/).filter(Boolean).map(esc).join('<br>')
    .replace(/_/g, '<span class="us">_</span>');
  const badges = (p.badges || []).slice(0, 4).map(badge).join('');
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

  video: (s) => {
    let media;
    if (s.youtubeId) {
      media = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(s.youtubeId)}" title="${esc(s.title)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    } else if (s.src) {
      const poster = s.poster ? ` poster="${esc(s.poster)}"` : '';
      media = `<video controls playsinline preload="metadata"${poster}><source src="${esc(s.src)}"></video>`;
    } else {
      media = `<div class="video-empty"><span class="play">${icons.play}</span><p>${rich(s.placeholder || 'Coming soon.')}</p></div>`;
    }
    const note = s.note ? `<p class="video-note">${rich(s.note)}</p>` : '';
    return `
    <div class="video reveal-wrap">
      <div class="reveal"><div class="screen">${media}</div>${note}</div>
    </div>`;
  },

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

  // Latest essays from essays/index.js
  writing: (s) => {
    const list = visibleEssays().slice(0, s.limit ?? 3);
    return `
    ${essayList(list, { empty: s.empty })}
    <p class="more-link"><a class="btn" href="writing.html">${esc(s.cta || 'All writing')} →</a></p>`;
  },
};

function section(s, i) {
  const render = renderers[s.type];
  if (!render) {
    console.warn(`Unknown section type "${s.type}" — skipped`);
    return '';
  }
  const num = String(i + 1).padStart(2, '0');
  const id = s.id ? ` id="${esc(s.id)}"` : '';
  return `
    <section${id}>
      <div class="sec-head"><span class="num">${num}</span><h2>${esc(s.title)}</h2></div>
      ${render(s)}
    </section>`;
}

export function renderPage(root, site) {
  root.innerHTML = renderNav(site, 'home') + hero(site) + site.sections.map(section).join('') + renderFooter(site);
}
