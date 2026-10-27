# BMM Creation, portfolio site

Personal site for Brian, full-stack web developer in Nairobi. Plain HTML, CSS and JavaScript, so there's no build step.

## Structure
```
index.html                  the whole page
assets/css/style.css        styles (colour tokens at the top)
assets/js/main.js           hero animation, menu, poster gallery, contact form
assets/images/websites/     project screenshots
assets/images/posters/thumbs/  web-sized posters (name.jpg = 720px, name-lg.jpg = ~1600px)
```

## Add the MTTI screenshot
Save a screenshot of murangatech.ac.ke as `assets/images/websites/mtti.jpg` (about 1600 x 900).
It appears in the first project automatically. Until then a placeholder shows.

## Add a poster
1. Export from Canva, then save a 720px-wide copy as `assets/images/posters/thumbs/my-poster.jpg`
2. Save a larger copy (about 1600px) as `assets/images/posters/thumbs/my-poster-lg.jpg`
3. In `assets/js/main.js`, add `{ file: 'my-poster', title: 'What it is' }` to the `posters` list

## Add a project
Copy one `<article class="project">` block in `index.html`. Add `project-flip` to the class to put the image on the right.

## Contact form
Posts to Formspree (`https://formspree.io/f/mykakrna`). Change the `action` on the form to use a different endpoint.

## Run locally (PowerShell)
```powershell
npx serve .
```

## Deploy
Push to GitHub, then import the repo in Vercel. No build settings needed.
