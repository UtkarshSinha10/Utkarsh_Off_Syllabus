# Off Syllabus

Landing page for the Off Syllabus channel — live at https://utkarshsinha10.github.io/Utkarsh_Off_Syllabus/

Plain HTML/CSS/JS, no build step. Push to `main` and GitHub Pages redeploys in about a minute.

## Layout

```
index.html              Thin shell: <head>, stylesheets, backdrop, #app mount point
js/content.js           ← ALL text, links, badges, timeline, cards and photos
js/render.js            Turns content.js into markup (one renderer per section type)
js/icons.js             Inline SVG icons (youtube, instagram, x, linkedin, github)
js/main.js              Entry point: render, then attach effects
js/effects/tilt.js      Mouse 3D tilt for [data-tilt]
js/effects/reveal.js    Fold-in-on-scroll for .reveal
js/effects/carousel.js  3D coverflow for [data-carousel]
css/tokens.css          ← Colours, fonts, radius, width (light + dark)
css/base.css            Reset, layout, typography, 3D backdrop, shared 3D primitives
css/components.css      Buttons, hero, about, timeline, cards, gallery
assets/img/             Images
```

## Common updates

| I want to… | Edit |
|---|---|
| Change any text | `js/content.js` |
| Add a timeline year | Add `{ year, text }` to the timeline `items`; move `current: true` to the latest |
| Add a gallery photo | Drop it in `assets/img/`, add `{ src, alt, title, caption }` to `photos` |
| Make Instagram live | Set its `url` and change its `label` in `links` |
| Add a social link | Add to `links` (icon name from `js/icons.js`) |
| Reorder / remove a section | Reorder / delete entries in `sections` (numbers update automatically) |
| Change colours or fonts | `css/tokens.css` (font files are loaded in `index.html`) |
| Add a new kind of section | Write a renderer in `js/render.js`, register it in `renderers`, style it in `css/components.css` |

Use `**text**` in content strings to highlight it in the accent colour.

## Preview locally

ES modules don't load from `file://`, so serve the folder:

```bash
python -m http.server 8765
```

Then open http://localhost:8765.
