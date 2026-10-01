// Site-wide chrome shared by every page: top navigation, footer and the refresh button.
import { esc, external } from './util.js';
import { icons } from './icons.js';

export function renderNav(site, current) {
  const brand = esc(site.brand).replace(/_/g, '<span class="us">_</span>');
  const items = site.nav.map((n) => {
    const active = n.id === current ? ' aria-current="page"' : '';
    // Items with an icon show only the icon; the label becomes tooltip + screen-reader text
    const inner = n.icon && icons[n.icon]
      ? `${icons[n.icon]}<span class="sr-only">${esc(n.label)}</span>`
      : esc(n.label);
    const cls = n.icon ? ' class="navicon"' : '';
    const title = n.icon ? ` title="${esc(n.label)}"` : '';
    return `<a${cls} href="${esc(n.href)}"${external(n.href)}${active}${title}>${inner}</a>`;
  }).join('');
  return `
    <nav class="topnav" aria-label="Main">
      <a class="brand" href="index.html">${brand}</a>
      <div class="navlinks">
        ${items}
        <button type="button" class="navicon" data-refresh title="Load the latest version" aria-label="Load the latest version">${icons.refresh}</button>
      </div>
    </nav>`;
}

export function renderFooter(site) {
  const links = site.links
    .filter((l) => l.url && l.footer)
    .map((l) => `<a href="${esc(l.url)}"${external(l.url)}>${esc(l.footer)} ↗</a>`)
    .join('');
  return `
    <footer>
      <div class="row">
        <span>© ${new Date().getFullYear()} ${esc(site.brand)}</span>
        <span class="links"><a href="writing.html">Writing</a>${links}</span>
      </div>
    </footer>`;
}

// Hard refresh: re-download every same-site file this page used (HTML, CSS, JS, images,
// essays), bypassing the browser cache, then reload.
export function initRefresh() {
  document.querySelectorAll('[data-refresh]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      btn.classList.add('spinning');
      btn.disabled = true;
      const urls = new Set([
        location.href.split('#')[0],
        ...performance.getEntriesByType('resource').map((e) => e.name),
      ]);
      const own = [...urls].filter((u) => u.startsWith(location.origin));
      await Promise.allSettled(own.map((u) => fetch(u, { cache: 'reload' })));
      location.reload();
    });
  });
}
