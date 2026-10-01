// Reads the essay list (essays/index.js) and renders the table of contents.
import { essays } from '../essays/index.js';
import { esc, formatDate } from './util.js';

// Drafts are visible only when previewing locally (python -m http.server).
export const isLocalPreview = /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/.test(location.hostname);

// Newest first. Each essay gets a stable number `n` by publish order (oldest = 1).
export function visibleEssays() {
  const list = essays
    .filter((e) => e.slug && e.title && (!e.draft || isLocalPreview))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  list.forEach((e, i) => { e.n = i + 1; });
  return list.reverse();
}

export const essayHref = (e, heading) =>
  `writing.html#/${encodeURIComponent(e.slug)}${heading ? `/${encodeURIComponent(heading)}` : ''}`;

export const tagList = (tags = []) =>
  tags.length ? `<span class="tags">${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</span>` : '';

export function essayList(list, { empty } = {}) {
  if (!list.length) {
    return `<div class="essay-empty">${esc(empty || 'First essay coming soon.')}</div>`;
  }
  return `
    <ol class="essays reveal-wrap">
      ${list.map((e) => `
        <li class="reveal" data-tags="${esc((e.tags || []).join('|'))}">
          <a class="essay-card" href="${essayHref(e)}">
            <span class="essay-num">${String(e.n).padStart(2, '0')}</span>
            <span class="essay-body">
              <span class="essay-meta">
                <time datetime="${esc(e.date)}">${formatDate(e.date)}</time>
                ${e.draft ? '<span class="draft">Draft · local only</span>' : ''}
              </span>
              <span class="essay-title">${esc(e.title)}</span>
              ${e.summary ? `<span class="essay-summary">${esc(e.summary)}</span>` : ''}
              ${tagList(e.tags)}
            </span>
            <span class="essay-arrow" aria-hidden="true">→</span>
          </a>
        </li>`).join('')}
    </ol>`;
}
