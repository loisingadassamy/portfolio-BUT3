/* ============================================================
   Script_1.js
   - Thème clair / sombre (toggle + localStorage + système)
   - Images adaptées au thème (class="theme-img")
   - Menu hamburger mobile
   - Smooth scroll
   - Bascule de langue FR / EN
   ============================================================ */

/* ── Éléments ── */
const toggle = document.getElementById('theme-toggle');
const root   = document.documentElement;

/* ────────────────────────────────────────────────────────────
   IMAGES ADAPTÉES AU THÈME
   Usage HTML :
     <img class="theme-img"
          data-light-src="images/photo-light.png"
          data-dark-src="images/photo-dark.png"
          alt="…" />
   ──────────────────────────────────────────────────────────── */
function applyThemeImages(theme) {
  document.querySelectorAll('.theme-img').forEach(img => {
    const src = theme === 'dark'
      ? img.dataset.darkSrc
      : img.dataset.lightSrc;
    if (src && img.src !== src) img.src = src;
  });
}

/* ────────────────────────────────────────────────────────────
   THÈME  –  chargement initial
   ──────────────────────────────────────────────────────────── */
const saved = localStorage.getItem('theme')
  ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

root.setAttribute('data-theme', saved);
applyThemeImages(saved);   // ← applique les bonnes images dès le chargement

/* ── Clic sur le bouton toggle ── */
toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  applyThemeImages(next);  // ← met à jour les images au changement de thème
});

/* ── Suivi automatique si la préférence système change (sans clic) ── */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  /* On ne réagit que si l'utilisateur n'a pas fait de choix manuel */
  if (!localStorage.getItem('theme')) {
    const auto = e.matches ? 'dark' : 'light';
    root.setAttribute('data-theme', auto);
    applyThemeImages(auto);
  }
});

/* ────────────────────────────────────────────────────────────
   MENU HAMBURGER MOBILE
   ──────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

/* Ferme le menu au clic sur un lien */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ────────────────────────────────────────────────────────────
   SMOOTH SCROLL sur les ancres internes
   ──────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ────────────────────────────────────────────────────────────
   BASCULE DE LANGUE  FR / EN
   ──────────────────────────────────────────────────────────── */
const langBtn     = document.querySelector('.lang-toggle');
let   currentLang = localStorage.getItem('lang') || 'fr';

function applyLang(lang) {
  document.querySelectorAll('[data-fr]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langBtn.textContent  = lang === 'fr' ? 'EN' : 'FR';
  langBtn.dataset.lang = lang === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', lang);
}

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  applyLang(currentLang);
});

applyLang(currentLang); // applique au chargement
