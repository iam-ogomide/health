// Services card slider
(function () {
  const slider  = document.querySelector('.services-slider');
  const track   = document.querySelector('.services-track');
  const prevBtn = document.querySelector('.services-prev');
  const nextBtn = document.querySelector('.services-next');

  if (!slider || !track) return;

  const cards  = [...track.querySelectorAll('.service-card')];
  const GAP    = 24; // matches CSS gap: 1.5rem (24px)
  let current  = 0;

  // How many cards to show at once (desktop = 2 + peek, mobile = 1 + peek)
  function visibleCount() {
    return window.innerWidth < 768 ? 1.1 : 2.1;
  }

  // Recalculate and apply card widths based on the slider's actual pixel width
  function setCardWidths() {
    const vis       = visibleCount();
    const available = slider.offsetWidth - GAP * (vis - 1);
    const cardW     = available / vis;

    cards.forEach(c => {
      c.style.width     = cardW + 'px';
      c.style.flexShrink = '0';
    });

    return cardW;
  }

  // Maximum valid index — use floor so peek cards don't lock out navigation
  function maxIndex() {
    return Math.max(0, cards.length - Math.floor(visibleCount()));
  }

  function goTo(index) {
    current       = Math.max(0, Math.min(index, maxIndex()));
    const cardW   = cards[0] ? parseFloat(cards[0].style.width) || 0 : 0;
    const offset  = current * (cardW + GAP);

    track.style.transform = `translateX(-${offset}px)`;
    updateNav();
  }

  function updateNav() {
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= maxIndex();
  }

  // Button clicks
  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  }, { passive: true });

  // Recalculate on resize without resetting to 0
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setCardWidths();
      goTo(current); // re-apply offset with new card widths
    }, 120);
  });

  // Boot
  setCardWidths();
  updateNav();
})();
