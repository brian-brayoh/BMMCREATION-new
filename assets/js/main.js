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
const imageBase = 'assets/images/posters';
const poster = fileName => `${imageBase}/${encodeURIComponent(fileName)}`;

const portfolioItems = [
  { id: 1, title: 'Automotive Department', tag: 'Poster', desc: 'Professional poster design for automotive department featuring modern layout and engaging visuals.', img: poster('Automotive depertment.jpg') },
  { id: 2, title: 'Happy Birthday Poster', tag: 'Poster', desc: 'Bold and colorful birthday poster with eye-catching typography and vibrant design elements.', img: poster('Black Bold Happy Birthday Instagram Post.jpg') },
  { id: 3, title: 'DUAL TVET Program', tag: 'Poster', desc: 'Informative poster promoting DUAL TVET training programs with clear messaging and professional design.', img: poster('DUAL TVET.jpg') },
  { id: 4, title: 'Easter Sunday Celebration', tag: 'Poster', desc: 'Festive Easter Sunday event poster with vibrant colors and celebratory design approach.', img: poster('easter sunday.jpg') },
  { id: 5, title: 'Eid Al-Fitr Greeting', tag: 'Banner', desc: 'Elegant Eid Al-Fitr greeting poster with cultural design elements and warm color palette.', img: poster('Eid Al-Fitr.jpg') },
  { id: 6, title: 'Christmas Wishes Poster', tag: 'Banner', desc: 'Green and white modern Christmas poster with clean design and festive messaging.', img: poster('Green White Simple Merry Christmas Poster (Portrait) (1).jpg') },
  { id: 7, title: 'Hospitality Services', tag: 'Flyer', desc: 'Professional hospitality services promotional poster highlighting key offerings and benefits.', img: poster('Hospitality.jpg') },
  { id: 8, title: 'MTTI May Intake 2026', tag: 'Flyer', desc: 'Admission promotional flyer for MTTI May 2026 intake with enrollment information and details.', img: poster('MAY INTAKE  2026 MTTI.jpg') },
  { id: 9, title: 'MTTI Ministry Partnership', tag: 'Poster', desc: 'Official MTTI and Ministry of Education partnership announcement poster with professional branding.', img: poster('MTTI MOE.jpg') },
  { id: 10, title: 'Free Design Template', tag: 'Creatives', desc: 'Creative free design template showcasing modern design trends and professional layout.', img: poster('PosterFree.jpg') },
  { id: 11, title: 'Modern Birthday Story', tag: 'Creatives', desc: 'Modern happy birthday design with white and black minimalist aesthetic for social media.', img: poster('White and Black Modern Happy Birthday Your Story.jpg') },
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
