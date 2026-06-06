/* ─── BMM Creation — main.js ─────────────────────── */

// ── Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile menu
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose= document.getElementById('mobileClose');
hamburger?.addEventListener('click',  () => mobileMenu.classList.add('open'));
mobileClose?.addEventListener('click',() => mobileMenu.classList.remove('open'));
mobileMenu?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// ── Scroll-reveal (IntersectionObserver)
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Portfolio data
const imageBase = 'assets/{css,js,images/{posters,websites}}';
const poster = fileName => `${imageBase}/${encodeURIComponent(fileName)}`;

const portfolioItems = [
  { id: 1, title: 'Church Conference Poster', tag: 'Poster', desc: 'Designed using Canva for a church event. Bold typography and vibrant colours communicate the event energy.', img: poster('Black Bold Happy Birthday Instagram Post.jpg') },
  { id: 2, title: 'Business Grand Opening', tag: 'Poster', desc: 'Eye-catching flyer for a local business launch event with branded colours.', img: poster('Eid Al-Fitr.jpg') },
  { id: 3, title: 'Youth Summit Banner', tag: 'Banner', desc: 'Large-format event banner for a youth conference. Clean, modern design.', img: poster('Green White Simple Merry Christmas Poster (Portrait) (1).jpg') },
  { id: 4, title: 'Social Media Pack', tag: 'Creatives', desc: 'Set of social media posts designed for Instagram and Facebook promotions.', img: poster('PosterFree.jpg') },
  { id: 5, title: 'School Promo Flyer', tag: 'Flyer', desc: 'Admission promotional flyer for a secondary school, designed in Canva.', img: poster('MAY INTAKE  2026 MTTI.jpg') },
  { id: 6, title: 'Corporate Event Banner', tag: 'Banner', desc: 'Professional banner designed for a corporate annual gala dinner.', img: poster('MTTI MOE.jpg') },
];

// ── Render portfolio grid
function renderPortfolio(filter = 'All') {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  const items = filter === 'All' ? portfolioItems : portfolioItems.filter(i => i.tag === filter);
  grid.innerHTML = items.map(item => `
    <div class="portfolio-item" data-id="${item.id}" onclick="openLightbox(${item.id})">
      ${item.img
        ? `<img src="${item.img}" alt="${item.title}" loading="lazy">`
        : `<div class="portfolio-placeholder"><div class="ph-icon">🎨</div><span>Add your poster here</span></div>`}
      <div class="portfolio-overlay">
        <span class="tag">${item.tag}</span>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');
}
renderPortfolio();

// ── Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.dataset.filter);
  });
});

// ── Lightbox
function openLightbox(id) {
  const item = portfolioItems.find(i => i.id === id);
  if (!item) return;
  const lb = document.getElementById('lightbox');
  document.getElementById('lbImg').src   = item.img || '';
  document.getElementById('lbImg').alt   = item.title;
  document.getElementById('lbImg').style.display = item.img ? 'block' : 'none';
  document.getElementById('lbTitle').textContent = item.title;
  document.getElementById('lbDesc').textContent  = item.desc;
  document.getElementById('lbTag').textContent   = item.tag;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('lightbox')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── Contact form (Netlify / Formspree compatible)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…'; btn.disabled = true;

  // If using Formspree replace YOUR_FORM_ID; if Netlify just submit normally
  const action = form.getAttribute('action') || '#';
  if (action === '#') {
    // Demo: show success after 1s
    await new Promise(r => setTimeout(r, 1000));
    form.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    return;
  }
  try {
    const res = await fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (res.ok) { form.style.display = 'none'; document.getElementById('formSuccess').style.display = 'block'; }
    else { btn.textContent = 'Send Message'; btn.disabled = false; alert('Something went wrong. Please try again.'); }
  } catch { btn.textContent = 'Send Message'; btn.disabled = false; }
});

// ── Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
