# BMM Creations website

"High Voltage" theme: dark canvas, electric lime/sky/violet accents, animated circuit chip in the hero, loader, cursor glow, scroll reveals, project filters, poster lightbox. Colour tokens are at the top of `assets/css/style.css`.

Personal site for Brian, full-stack web developer in Nairobi. Plain HTML, CSS and JavaScript, so there's no build step.

## Structure
```
index.html                  the whole page
assets/css/style.css        styles (colour tokens at the top)
assets/js/main.js           hero animation, menu, poster gallery, contact form
assets/images/websites/     project screenshots
assets/images/posters/thumbs/  web-sized posters (name.jpg = 720px, name-lg.jpg = ~1600px)
```

## Project screenshots
Screenshots live in `assets/images/websites/` (about 1600 x 1000). The card crops to 16:10 from the top.

## Add a poster
1. Export from Canva, then save a 720px-wide copy as `assets/images/posters/thumbs/my-poster.jpg`
2. Save a larger copy (about 1600px) as `assets/images/posters/thumbs/my-poster-lg.jpg`
3. In `assets/js/main.js`, add `{ file: 'my-poster', title: 'What it is' }` to the `posters` list

## Add a project
Copy one `<article class="work">` block in `index.html`. Set `data-c="web"` or `data-c="saas"` for the filter, and change `--g` on the `.shot` link for its background colour. Add `featured` to the class for a full-width card.

## Contact form
Posts to Formspree (`https://formspree.io/f/mykakrna`). Change the `action` on the form to use a different endpoint.

## Run locally (PowerShell)
```powershell
npx serve .
```

## Deploy
Push to GitHub, then import the repo in Vercel. No build settings needed.
