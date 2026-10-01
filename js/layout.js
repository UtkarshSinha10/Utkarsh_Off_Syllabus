// Site-wide chrome shared by every page: top navigation and footer.
import { esc, external } from './util.js';

export function renderNav(site, current) {
  const brand = esc(site.brand).replace(/_/g, '<span class="us">_</span>');
  const items = site.nav.map((n) => {
    const active = n.id === current ? ' aria-current="page"' : '';
    return `<a href="${esc(n.href)}"${external(n.href)}${active}>${esc(n.label)}</a>`;
  }).join('');
  return `
    <nav class="topnav" aria-label="Main">
      <a class="brand" href="index.html">${brand}</a>
      <div class="navlinks">${items}</div>
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
