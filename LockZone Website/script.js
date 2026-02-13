/* ── Scroll-reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = parseFloat(e.target.style.transitionDelay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay * 1000);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  /* ── Sticky nav bg ── */
  window.addEventListener('scroll', () => {
    document.getElementById('nav').style.background =
      window.scrollY > 60
        ? 'rgba(255,255,255,0.98)'
        : 'rgba(255,255,255,0.92)';
  });

  /* icon grid removed — replaced with real image */