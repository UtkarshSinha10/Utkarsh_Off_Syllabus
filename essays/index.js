// ─────────────────────────────────────────────────────────────
// The list of essays. To publish a new one:
//   1. Write it as  essays/<slug>.md  (plain Markdown; don't repeat the title inside)
//   2. Add an entry below with the same slug
//   3. Commit and push
//
// slug     file name without .md — lowercase-with-dashes, also the URL
// date     'YYYY-MM-DD' — controls order (newest first) and numbering
// summary  one line shown in the table of contents
// tags     optional, used for the filter buttons on the Writing page
// draft    true = only visible on your local preview, hidden on the live site
// ─────────────────────────────────────────────────────────────

export const essays = [
  {
    slug: 'markdown-guide',
    title: 'How to write here (example)',
    date: '2026-10-01',
    summary: 'A cheat sheet for formatting essays. It is a draft, so it never shows on the live site.',
    tags: ['meta'],
    draft: true,
  },
];
