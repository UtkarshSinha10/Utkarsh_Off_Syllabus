// Small shared helpers for building markup.
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

// Escaped text with **bold** support
export const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// In-page anchors ('#id') and same-site pages stay in the tab; other sites open a new one.
export const external = (url) => (/^https?:\/\//.test(url) ? ' target="_blank" rel="noopener"' : '');

export const slugify = (s) => String(s).toLowerCase().trim()
  .replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d) ? esc(iso) : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
