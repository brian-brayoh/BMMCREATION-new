/* ─── BMM Creation, main.js ─────────────────────────── */

document.documentElement.classList.add('js');

/* ── Hero schematic ───────────────────────────────────
   1. On load the traces draw in from each pin and the chip powers on.
   2. Then signals keep flowing: each wire fires a glowing pulse, sometimes
      into the chip, sometimes out to its pin. Whatever it reaches flashes,
      and the pin's label lights up.                                      */
(() => {
  const svg = document.querySelector('.schematic svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const traces = [...svg.querySelectorAll('.traces path')];
  const pads   = [...svg.querySelectorAll('.pads circle')];
  const labels = [...svg.querySelectorAll('.silk text')];
  const chip   = svg.querySelector('.chip-body');
  const led    = svg.querySelector('.chip-led');

  traces.forEach((p, i) => {
    p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
    p.style.setProperty('--i', i);
  });
  pads.forEach((c, i) => c.style.setProperty('--i', i));
  labels.forEach((t, i) => t.style.setProperty('--i', i));
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.documentElement.classList.add('powered')));

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // One tail + one bright head per trace
  const layer = document.createElementNS(NS, 'g');
  layer.setAttribute('class', 'pulses');
  svg.insertBefore(layer, svg.querySelector('.pads'));
  const TAIL = 56, HEAD = 10;
  const wires = traces.map(p => {
    const len = p.getTotalLength();
    const mk = (cls, dash) => {
      const el = document.createElementNS(NS, 'path');
      el.setAttribute('d', p.getAttribute('d'));
      el.setAttribute('class', cls);
      el.style.strokeDasharray = `${dash} ${len + 200}`;
      el.style.strokeDashoffset = dash;           // parked before the start
      layer.appendChild(el);
      return el;
    };
    return { len, tail: mk('pulse-tail', TAIL), head: mk('pulse-head', HEAD) };
  });

  const flash = (el, glow) => el && el.animate(
    [{ filter: 'none' }, { filter: `drop-shadow(0 0 ${glow}px #cfe99a) brightness(1.6)` }, { filter: 'none' }],
    { duration: 520, easing: 'ease-out' });
  const lightLabel = el => el && el.animate(
    [{ fill: '#f3f7f1' }, { fill: '#cfe99a', offset: .25 }, { fill: '#f3f7f1' }],
    { duration: 900, easing: 'ease-out' });
  const pop = el => el && el.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.7)' }, { transform: 'scale(1)' }],
    { duration: 450, easing: 'ease-out' });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(svg);

  const fire = i => {
    if (!visible || document.hidden) return setTimeout(() => fire(i), 800);
    const { len, tail, head } = wires[i];
    const inbound = Math.random() < 0.6;          // most traffic flows into the chip
    const duration = 900 + len * 3.2;
    // dashoffset positions: inbound runs pin → chip, outbound chip → pin
    const t = inbound ? [TAIL, -len] : [-len, TAIL];
    const h = inbound ? [HEAD, -len - (TAIL - HEAD)] : [-len, TAIL];   // head rides the leading end
    const opts = { duration, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' };
    if (inbound) { lightLabel(labels[i]); pop(pads[i]); }
    tail.animate([{ strokeDashoffset: t[0] }, { strokeDashoffset: t[1] }], opts);
    const run = head.animate([{ strokeDashoffset: h[0] }, { strokeDashoffset: h[1] }], opts);
    run.onfinish = () => {
      if (inbound) { flash(chip, 18); flash(led, 10); }
      else { pop(pads[i]); flash(pads[i], 10); lightLabel(labels[i]); }
      setTimeout(() => fire(i), 400 + Math.random() * 2600);
    };
  };

  // start once the power-on sequence has finished, staggered per wire
  setTimeout(() => traces.forEach((_, i) => setTimeout(() => fire(i), i * 330 + Math.random() * 600)), 2300);
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
