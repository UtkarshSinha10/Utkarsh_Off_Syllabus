// Entry point for writing.html.
//   writing.html                 → table of contents
//   writing.html#/<slug>         → full essay
//   writing.html#/<slug>/<id>    → full essay, scrolled to a heading
import { site } from './content.js';
import { renderNav, renderFooter, initRefresh } from './layout.js';
import { visibleEssays, essayList, essayHref, tagList } from './essays.js';
import { esc, slugify, formatDate } from './util.js';
import { initReveal } from './effects/reveal.js';

const MARKED = 'https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/lib/marked.esm.js';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const w = site.writing;

const root = document.getElementById('app');
root.innerHTML = renderNav(site, 'writing') + '<div id="view"></div>' + renderFooter(site);
const view = document.getElementById('view');
initRefresh();

let shownSlug = null;   // essay currently on screen
let renderToken = 0;    // guards against out-of-order async loads
let spy = null;         // scroll-spy observer for the outline

function parseHash() {
  const m = location.hash.match(/^#\/([^/]+)(?:\/(.+))?$/);
  return m ? { slug: decodeURIComponent(m[1]), heading: m[2] && decodeURIComponent(m[2]) } : {};
}

function route() {
  const { slug, heading } = parseHash();
  if (slug && slug === shownSlug) { scrollToHeading(heading); return; }
  spy?.disconnect();
  if (slug) showEssay(slug, heading);
  else showIndex();
}

/* ---------- Table of contents ---------- */
function showIndex() {
  shownSlug = null;
  const list = visibleEssays();
  const tags = [...new Set(list.flatMap((e) => e.tags || []))].sort();
  document.title = `${w.title} · ${site.brand}`;

  const filters = tags.length > 1 ? `
    <div class="filters" role="group" aria-label="Filter by tag">
      <button type="button" class="filter" data-tag="" aria-pressed="true">All</button>
      ${tags.map((t) => `<button type="button" class="filter" data-tag="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('')}
    </div>` : '';

  view.innerHTML = `
    <header class="page-head">
      <div class="eyebrow">${esc(w.eyebrow)}</div>
      <h1 class="page-title">${esc(w.title)}</h1>
      <p class="tagline">${esc(w.intro)}</p>
    </header>
    <section class="toc-section">
      <div class="sec-head">${list.length ? `<span class="num">${String(list.length).padStart(2, '0')}</span>` : ''}<h2>Contents</h2></div>
      ${filters}
      ${essayList(list, { empty: w.empty })}
    </section>`;

  view.querySelectorAll('.filter').forEach((btn) => btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    view.querySelectorAll('.filter').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    view.querySelectorAll('.essays li').forEach((li) => {
      li.hidden = tag !== '' && !li.dataset.tags.split('|').includes(tag);
    });
  }));

  initReveal({ reduceMotion });
  window.scrollTo(0, 0);
}

/* ---------- Single essay ---------- */
async function showEssay(slug, heading) {
  const token = ++renderToken;
  const list = visibleEssays();
  const i = list.findIndex((e) => e.slug === slug);
  const e = list[i];

  if (!e) {
    shownSlug = null;
    document.title = `Not found · ${site.brand}`;
    view.innerHTML = `
      <article class="essay">
        <a class="back" href="writing.html">← All writing</a>
        <h1 class="essay-heading">Essay not found</h1>
        <p class="tagline">It may have been renamed or unpublished.</p>
      </article>`;
    return;
  }

  shownSlug = slug;
  document.title = `${e.title} · ${site.brand}`;
  const newer = list[i - 1];
  const older = list[i + 1];
  const pagerLink = (x, dir) => x
    ? `<a class="pager-link ${dir}" href="${essayHref(x)}"><span>${dir === 'prev' ? '← Older' : 'Newer →'}</span>${esc(x.title)}</a>`
    : '<span></span>';

  view.innerHTML = `
    <article class="essay">
      <a class="back" href="writing.html">← All writing</a>
      <header class="essay-header">
        <div class="essay-meta">
          <span class="essay-num">${String(e.n).padStart(2, '0')}</span>
          <time datetime="${esc(e.date)}">${formatDate(e.date)}</time>
          <span id="read-time"></span>
          ${e.draft ? '<span class="draft">Draft · local only</span>' : ''}
        </div>
        <h1 class="essay-heading">${esc(e.title)}</h1>
        ${e.summary ? `<p class="essay-dek">${esc(e.summary)}</p>` : ''}
        ${tagList(e.tags)}
      </header>
      <div class="essay-layout">
        <aside class="outline" id="outline" hidden></aside>
        <div class="prose" id="body"><p class="loading">Loading…</p></div>
      </div>
      <nav class="pager" aria-label="More essays">${pagerLink(older, 'prev')}${pagerLink(newer, 'next')}</nav>
    </article>`;
  window.scrollTo(0, 0);

  let md;
  let marked;
  try {
    const [res, mod] = await Promise.all([fetch(`essays/${encodeURIComponent(slug)}.md`, { cache: 'no-cache' }), import(MARKED)]);
    if (!res.ok) throw new Error(`essays/${slug}.md returned ${res.status}`);
    md = await res.text();
    marked = mod.marked;
  } catch (err) {
    if (token !== renderToken) return;
    console.error(err);
    document.getElementById('body').innerHTML = '<p class="loading">Couldn\'t load this essay. Try refreshing.</p>';
    return;
  }
  if (token !== renderToken) return;   // user navigated away while loading

  // Drop a leading "# Title" if the author included one; the page already shows it.
  md = md.replace(/^﻿?\s*#\s+[^\n]*\n/, '');
  const body = document.getElementById('body');
  body.innerHTML = marked.parse(md);

  // Same-site links stay in the tab; external links open a new one.
  body.querySelectorAll('a[href^="http"]').forEach((a) => {
    if (!a.href.startsWith(location.origin)) { a.target = '_blank'; a.rel = 'noopener'; }
  });

  const words = body.textContent.trim().split(/\s+/).length;
  document.getElementById('read-time').textContent = `${Math.max(1, Math.round(words / 200))} min read`;

  buildOutline(e, body);
  scrollToHeading(heading);
}

function buildOutline(e, body) {
  const heads = [...body.querySelectorAll('h2, h3')];
  const used = new Set();
  heads.forEach((h) => {
    let id = slugify(h.textContent) || 'section';
    for (let k = 2; used.has(id); k++) id = `${slugify(h.textContent)}-${k}`;
    used.add(id);
    h.id = id;
  });

  const outline = document.getElementById('outline');
  if (heads.length < 2) return;

  outline.innerHTML = `
    <details class="outline-box">
      <summary>On this page</summary>
      <ol>
        ${heads.map((h) => `
          <li class="lvl-${h.tagName.toLowerCase()}">
            <a href="${essayHref(e, h.id)}" data-target="${h.id}">${esc(h.textContent)}</a>
          </li>`).join('')}
      </ol>
    </details>`;
  outline.hidden = false;

  // Open by default on wide screens, collapsed on phones.
  const details = outline.querySelector('details');
  const wide = matchMedia('(min-width: 961px)');
  details.open = wide.matches;
  wide.onchange = () => { details.open = wide.matches; };

  // Highlight the section currently being read
  const links = new Map([...outline.querySelectorAll('a')].map((a) => [a.dataset.target, a]));
  spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.remove('active'));
      links.get(en.target.id)?.classList.add('active');
    });
  }, { rootMargin: '-15% 0px -75% 0px' });
  heads.forEach((h) => spy.observe(h));
}

function scrollToHeading(id) {
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

window.addEventListener('hashchange', route);
route();
