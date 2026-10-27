/* ─── BMM Creation, main.js ─────────────────────────── */

document.documentElement.classList.add('js');

/* ── Hero schematic: measure each trace, then power on ── */
(() => {
  const traces = document.querySelectorAll('.traces path');
  const pads   = document.querySelectorAll('.pads circle');
  const silk   = document.querySelectorAll('.silk text');
  const svg = document.querySelector('.schematic svg');
  const pulses = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  pulses.setAttribute('class', 'pulses');
  traces.forEach((p, i) => {
    const len = Math.ceil(p.getTotalLength());
    p.style.setProperty('--len', len);
    p.style.setProperty('--i', i);
    // A bright "current" pulse that keeps travelling along each trace into the chip
    const pulse = p.cloneNode();
    pulse.style.setProperty('--len', len);
    pulse.style.setProperty('--i', i);
    pulse.style.setProperty('--dur', (len / 140 + 1.8).toFixed(2) + 's');
    pulses.appendChild(pulse);
  });
  svg.insertBefore(pulses, svg.querySelector('.pads'));
  pads.forEach((c, i) => c.style.setProperty('--i', i));
  silk.forEach((t, i) => t.style.setProperty('--i', i));
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.documentElement.classList.add('powered')));
})();

/* ── Header border once scrolled ── */
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile menu ── */
const toggle = document.getElementById('menuToggle');
const nav    = document.getElementById('mainNav');
const setMenu = open => {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ── Design gallery ──
   To add a poster:
   1. Put a 720px-wide copy in assets/images/posters/thumbs/name.jpg
   2. Put a larger copy (about 1600px) at assets/images/posters/thumbs/name-lg.jpg
   3. Add { file: 'name', title: 'What it is' } below.                       */
const posters = [
  { file: 'mtti-may-intake', title: "May intake campaign, Murang'a TTI" },
  { file: 'automotive',      title: 'Mechanical and Automotive department poster' },
  { file: 'dual-tvet',       title: 'Dual training TVET courses poster' },
  { file: 'mtti-moe',        title: 'Graduate tracer survey for the State Department for TVET' },
  { file: 'hospitality',     title: 'Hospitality and Institution Management department poster' },
  { file: 'easter',          title: 'Easter Sunday greeting with intake offer' },
  { file: 'christmas',       title: 'Christmas and New Year card for Ndia TVC' },
  { file: 'poster-free',     title: 'Good Friday message' },
  { file: 'eid',             title: 'Eid al-Fitr greeting' },
  { file: 'birthday-bold',   title: 'Birthday post, bold type' },
  { file: 'birthday-story',  title: 'Birthday story, vertical format' },
];

const base = 'assets/images/posters/thumbs/';
const gallery = document.getElementById('gallery');
gallery.innerHTML = posters.map((p, i) => `
  <button type="button" data-i="${i}" aria-label="View larger: ${p.title}">
    <img src="${base}${p.file}.jpg" alt="${p.title}" loading="lazy" decoding="async">
  </button>`).join('');

/* ── Lightbox ── */
const lb      = document.getElementById('lightbox');
const lbImg   = document.getElementById('lbImg');
const lbCap   = document.getElementById('lbCaption');
let current = 0;

const show = i => {
  current = (i + posters.length) % posters.length;
  const p = posters[current];
  lbImg.src = `${base}${p.file}-lg.jpg`;
  lbImg.alt = p.title;
  lbCap.textContent = `${p.title}  (${current + 1} of ${posters.length})`;
};

gallery.addEventListener('click', e => {
  const btn = e.target.closest('button[data-i]');
  if (!btn) return;
  show(Number(btn.dataset.i));
  lb.showModal();
});
document.getElementById('lbClose').addEventListener('click', () => lb.close());
document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'FIGURE') lb.close(); });
lb.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

/* ── Contact form (Formspree) ── */
const form   = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.className = 'form-status';
  status.textContent = '';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error();
    form.reset();
    status.classList.add('ok');
    status.textContent = "Message sent. I'll reply within 24 hours.";
  } catch {
    status.classList.add('err');
    status.textContent = "The message didn't send. Check your connection and try again, or reach me on WhatsApp.";
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send message';
  }
});

/* ── Footer year ── */
document.getElementById('year').textContent = new Date().getFullYear();
