# BMM Creation — Website

## 📁 Folder Structure
```
bmm-creation/
├── index.html              ← Main site (single-page)
├── assets/
│   ├── css/style.css       ← All styles
│   ├── js/main.js          ← All JavaScript
│   └── images/
│       ├── posters/        ← Add your Canva poster exports here
│       └── websites/       ← Add website screenshots here
└── README.md
```

---

## 🖼️ Adding Portfolio Images (Posters)

1. Export your Canva design as **JPG or PNG**
2. Rename it clearly, e.g. `church-conference-2024.jpg`
3. Drop it into `assets/images/posters/`
4. Open `assets/js/main.js` and find `portfolioItems`
5. Update an existing entry or add a new one:

```js
{ id: 7, title: 'Church Conference 2024', tag: 'Poster',
  desc: 'Designed for the annual church conference.',
  img: 'assets/images/posters/church-conference-2024.jpg' }
```

---

## 🌐 Adding Website Projects

1. Take a screenshot of the site (full-page preferred)
2. Save to `assets/images/websites/site-name.jpg`
3. In `index.html`, find the **Website Projects** section
4. Update the `<img>` tag in the relevant `.project-card`

---

## 📬 Connecting the Contact Form

### Option A — Netlify Forms (Recommended, free)
1. Open `index.html`
2. Find the `<form>` tag and add `data-netlify="true"`:
   ```html
   <form ... data-netlify="true">
   ```
3. Deploy to Netlify — forms work automatically!

### Option B — Formspree (also free)
1. Sign up at https://formspree.io
2. Create a form → copy your Form ID
3. Change the form's action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

---

## 📱 WhatsApp Button
In `index.html`, find the `.wa-float` link near the bottom.
Replace `254700000000` with your WhatsApp number (include country code, no +):
```html
<a href="https://wa.me/254XXXXXXXXX?text=...">
```

---

## 🚀 Deployment

### Netlify (drag & drop — no account setup needed)
1. Go to https://netlify.com → Log in
2. Drag the entire `bmm-creation/` folder onto the deploy area
3. Done! You get a free `.netlify.app` URL

### Vercel
1. Push the folder to a GitHub repo
2. Go to https://vercel.com → Import the repo
3. Deploy in one click

### Custom Domain
- Register a `.co.ke` domain at Kenya KENIC or Zuku
- Point it to your Netlify/Vercel deployment

---

## 🎨 Customisation Checklist

- [ ] Replace placeholder phone/email in Contact section
- [ ] Replace WhatsApp number in the floating button
- [ ] Add your real poster images to `assets/images/posters/`
- [ ] Add website screenshots to `assets/images/websites/`
- [ ] Update project cards with real project names and links
- [ ] Update testimonials with real client names
- [ ] Update stats (projects count, years experience)
- [ ] Connect the contact form (Netlify or Formspree)
- [ ] Add your social media links in the footer

---

Built with: HTML5 · CSS3 · Vanilla JavaScript  
Hosted on: Netlify / Vercel (free tier)
