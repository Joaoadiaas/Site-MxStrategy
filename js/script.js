/* ==========================================================
   MX STRATEGY EDUCATION — Script
   ========================================================== */

(function () {
  'use strict';

  /* ---------- 1. HEADER muda ao rolar ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. MENU mobile ---------- */
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
    // Fecha menu ao clicar em um link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  /* ---------- 3. ANO automático no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 4. ANIMAÇÕES de entrada ---------- */
  // Adiciona .fade-in nos elementos-alvo
  const targets = document.querySelectorAll(
    '.band-text, .band-stats, .service-card, .mauricio-text, .mauricio-photo, .client-logo, .cta-inner, .section-header'
  );
  targets.forEach(el => el.classList.add('fade-in'));

  // Observa para revelar quando entrar na viewport
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(el => io.observe(el));
  } else {
    // Fallback antigos: mostra tudo
    targets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 5. Animação de contadores (estatísticas) ---------- */
  const stats = document.querySelectorAll('.stat strong');
  const animateCount = (el) => {
    const raw = el.textContent.trim();
    // Extrai número (suporta "+10", "+500", "100%")
    const match = raw.match(/(\D*)(\d+)(\D*)/);
    if (!match) return;
    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];
    let current = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      current = Math.round(target * eased);
      el.textContent = prefix + current + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && stats.length) {
    const ioStats = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          ioStats.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach(s => ioStats.observe(s));
  }

})();
