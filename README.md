# Utkarsh_Off_Syllabus

Landing page for the Utkarsh_Off_Syllabus channel — live at https://utkarshsinha10.github.io/Utkarsh_Off_Syllabus/

Plain HTML/CSS/JS, no build step. Push to `main` and GitHub Pages redeploys in about a minute.

## Layout

```
index.html              Home page shell: <head>, stylesheets, backdrop, #app mount point
writing.html            Writing page shell (contents + single essay)
essays/index.js         ← The list of essays (title, date, summary, tags, draft)
essays/<slug>.md        ← One Markdown file per essay
js/content.js           ← ALL home-page text, nav, links, badges, timeline, cards and photos
js/render.js            Turns content.js into home-page markup (one renderer per section type)
js/layout.js            Shared nav bar and footer
js/essays.js            Essay list helpers + table-of-contents markup
js/writing.js           Entry point for writing.html (contents, essay view, outline)
js/util.js              Escaping, slugs, date formatting
js/icons.js             Inline SVG icons (youtube, instagram, play, x, linkedin, github)
js/main.js              Entry point for index.html: render, then attach effects
js/effects/tilt.js      Mouse 3D tilt for [data-tilt]
js/effects/reveal.js    Fold-in-on-scroll for .reveal
js/effects/carousel.js  3D coverflow for [data-carousel]
js/effects/tooltips.js  Tap-to-open badge notes on touch screens
css/tokens.css          ← Colours, fonts, radius, width (light + dark)
css/base.css            Reset, layout, typography, 3D backdrop, shared 3D primitives
css/components.css      Nav, buttons, hero, badges, about, video, timeline, cards, essay list, gallery
css/writing.css         Writing page only: essay layout, prose, outline, pager
assets/img/             Images
assets/video/           Self-hosted video resume (optional, see below)
```

## Common updates

| I want to… | Edit |
|---|---|
| Change any text | `js/content.js` |
| Add a timeline year | Add `{ year, text }` to the timeline `items`; move `current: true` to the latest |
| Add a gallery photo | Drop it in `assets/img/`, add `{ src, alt, title, caption }` to `photos` |
| Edit a portrait badge or its hover note | `portrait.badges` in `js/content.js` (max 4) |
| Make Instagram live | Set its `url` and change its `label` in `links` |
| Add a social link | Add to `links` (icon name from `js/icons.js`) |
| Reorder / remove a section | Reorder / delete entries in `sections` (numbers update automatically) |
| Change colours or fonts | `css/tokens.css` (font files are loaded in `index.html`) |
| Add a new kind of section | Write a renderer in `js/render.js`, register it in `renderers`, style it in `css/components.css` |

## Publishing an essay

1. Create `essays/<slug>.md`, e.g. `essays/why-i-left-for-upsc.md`. Plain Markdown;
   don't repeat the title inside. `##` / `###` headings become the "On this page" outline.
2. Add an entry at the top of the list in `essays/index.js`:
   ```js
   { slug: 'why-i-left-for-upsc', title: 'Why I left for UPSC', date: '2026-10-05',
     summary: 'One line for the table of contents.', tags: ['career', 'upsc'] },
   ```
3. Preview locally (see below) → open http://localhost:8765/writing.html
4. Commit and push.

Add `draft: true` to an entry to see it in your local preview while keeping it hidden on the
live site. `essays/markdown-guide.md` is a draft example with every formatting option.

Each essay has its own link: `writing.html#/<slug>`. Headings have links too
(`writing.html#/<slug>/<heading-id>`), so you can share a specific section.

## Adding the video resume

In `js/content.js`, find the `video` section and fill in **one** of:

- **YouTube (recommended):** upload as Unlisted, then set `youtubeId` to the part after `watch?v=`.
- **Self-hosted:** put the file at `assets/video/resume.mp4` and set `src: 'assets/video/resume.mp4'`.
  Keep it under ~50 MB (GitHub rejects files over 100 MB). Optionally set `poster` to a thumbnail image.

Leave both empty to show the "coming soon" placeholder.

Use `**text**` in content strings to highlight it in the accent colour.

## Cache busting

GitHub Pages lets browsers cache files for ~10 minutes. After changing CSS or JS, bump the
`?v=` number on the `css/` and `js/` links in **both** `index.html` and `writing.html`.
Modules imported by those scripts (including `content.js` and `essays/index.js`) aren't versioned, so returning visitors may see the old
content for up to ~10 minutes — a hard refresh (Ctrl+Shift+R) shows it immediately.

## Preview locally

ES modules don't load from `file://`, so serve the folder:

```bash
python -m http.server 8765
```

Then open http://localhost:8765.
