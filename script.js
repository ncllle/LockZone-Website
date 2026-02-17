/* ── Scroll-reveal ─────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const delay = parseFloat(e.target.style.transitionDelay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay * 1000);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Sticky nav bg ─────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(255,255,255,0.98)'
    : 'rgba(255,255,255,0.92)';
}, { passive: true });

/* ── Media Carousel: drag-to-scroll ────────── */
(function initCarousel() {
  const carousel = document.getElementById('mediaCarousel');
  const progress = document.getElementById('mediaProgress');
  if (!carousel) return;

  let isDown     = false;
  let startX     = 0;
  let scrollLeft = 0;

  function updateProgress() {
    const max = carousel.scrollWidth - carousel.clientWidth;
    const pct = max > 0 ? (carousel.scrollLeft / max) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  }

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('dragging');
    startX     = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.4;
    carousel.scrollLeft = scrollLeft - walk;
  });

  /* Touch support */
  let touchStartX      = 0;
  let touchScrollLeft  = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX    = e.touches[0].pageX;
    touchScrollLeft = carousel.scrollLeft;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    const x    = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.2;
    carousel.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });

  carousel.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* ── Smooth scroll for anchor links ────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav ? nav.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});