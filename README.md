# Utkarsh_Off_Syllabus

Landing page for the Utkarsh_Off_Syllabus channel — live at https://utkarshsinha10.github.io/Utkarsh_Off_Syllabus/

Plain HTML/CSS/JS, no build step. Push to `main` and GitHub Pages redeploys in about a minute.

## Layout

```
index.html              Thin shell: <head>, stylesheets, backdrop, #app mount point
js/content.js           ← ALL text, links, badges, timeline, cards and photos
js/render.js            Turns content.js into markup (one renderer per section type)
js/icons.js             Inline SVG icons (youtube, instagram, play, x, linkedin, github)
js/main.js              Entry point: render, then attach effects
js/effects/tilt.js      Mouse 3D tilt for [data-tilt]
js/effects/reveal.js    Fold-in-on-scroll for .reveal
js/effects/carousel.js  3D coverflow for [data-carousel]
js/effects/tooltips.js  Tap-to-open badge notes on touch screens
css/tokens.css          ← Colours, fonts, radius, width (light + dark)
css/base.css            Reset, layout, typography, 3D backdrop, shared 3D primitives
css/components.css      Buttons, hero, badges, about, video, timeline, cards, gallery
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

## Adding the video resume

In `js/content.js`, find the `video` section and fill in **one** of:

- **YouTube (recommended):** upload as Unlisted, then set `youtubeId` to the part after `watch?v=`.
- **Self-hosted:** put the file at `assets/video/resume.mp4` and set `src: 'assets/video/resume.mp4'`.
  Keep it under ~50 MB (GitHub rejects files over 100 MB). Optionally set `poster` to a thumbnail image.

Leave both empty to show the "coming soon" placeholder.

Use `**text**` in content strings to highlight it in the accent colour.

## Cache busting

GitHub Pages lets browsers cache files for ~10 minutes. After changing CSS or JS, bump the
`?v=` number on the `css/` and `js/main.js` links in `index.html`. Modules imported by
`main.js` (including `content.js`) aren't versioned, so returning visitors may see the old
content for up to ~10 minutes — a hard refresh (Ctrl+Shift+R) shows it immediately.

## Preview locally

ES modules don't load from `file://`, so serve the folder:

```bash
python -m http.server 8765
```

Then open http://localhost:8765.
