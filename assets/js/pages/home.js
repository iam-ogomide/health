// HIW rotating text
(function () {
  const steps = [
    { heading: 'Search & Consult',  desc: 'Find medications, doctors, or pharmacies near you instantly.' },
    { heading: 'Consult Online',    desc: 'Get medical consultations via secure video or chats.' },
    { heading: 'Manage Dosages',    desc: 'Track prescriptions, dosages, and health records.' },
    { heading: 'Receive Supply',    desc: 'Get medications delivered or pick up nearby.' },
  ];

  const headingEl = document.getElementById('hiw-rotating-heading');
  const descEl    = document.getElementById('hiw-rotating-desc');
  const vbarEl    = document.querySelector('.hiw-vbar');

  if (!headingEl || !descEl) return;

  const vbarHeights = ['25%', '50%', '75%', '100%'];

  let index = 0;

  function rotate() {
    index = (index + 1) % steps.length;
    const { heading, desc } = steps[index];

    [headingEl, descEl].forEach(el => el.classList.add('hiw-fade-out'));
    if (vbarEl) vbarEl.style.height = vbarHeights[index];

    setTimeout(() => {
      headingEl.textContent = heading;
      descEl.textContent    = desc;
      [headingEl, descEl].forEach(el => el.classList.remove('hiw-fade-out'));
    }, 100);
  }

  setInterval(rotate, 3000);
})();

// About section rotating content
(function () {
  const steps = [
    { label: 'ABOUT US',   heading: 'Simplifying Healthcare, One Connection at a Time', tab: 'who',    img: 'assets/images/aboutV1.jpg', dotPos: '10%' },
    { label: 'OUR VALUES', heading: 'What drives every decision we make.',               tab: 'values', img: 'assets/images/aboutV1.jpg', dotPos: '50%' },
    { label: 'OUR TEAM',   heading: 'Built by people who care deeply.',                  tab: 'team',   img: 'assets/images/aboutV1.jpg', dotPos: '90%' },
  ];

  const labelEl   = document.getElementById('about-label-text');
  const headingEl = document.getElementById('about-heading-text');
  const imgEl     = document.getElementById('about-team-img');
  const dotEl     = document.getElementById('divider-dot');
  const tabs      = document.querySelectorAll('.about-tab');
  const rightCols = document.querySelectorAll('.about-right');

  if (!labelEl || !headingEl || !imgEl) return;

  // Stack all right panels into the same grid cell; hide inactive ones
  rightCols.forEach((col, i) => {
    col.style.gridColumn    = '3';
    col.style.gridRow       = '1';
    col.style.transition    = 'opacity 0.1s ease';
    col.style.opacity       = i === 0 ? '1' : '0';
    col.style.display       = i === 0 ? '' : 'none';
    col.style.pointerEvents = i === 0 ? '' : 'none';
  });

  const FADE = 100;
  let index = 0;

  function rotateAbout() {
    const prevIndex = index;
    index = (index + 1) % steps.length;
    const { label, heading, tab, img, dotPos } = steps[index];

    const els = [labelEl, headingEl, imgEl];
    els.forEach(el => (el.style.opacity = '0'));
    if (rightCols[prevIndex]) rightCols[prevIndex].style.opacity = '0';

    if (dotEl) {
      if (window.innerWidth <= 960) {
        dotEl.style.top  = '50%';
        dotEl.style.left = dotPos;
      } else {
        dotEl.style.left = '50%';
        dotEl.style.top  = dotPos;
      }
    }

    setTimeout(() => {
      labelEl.textContent   = label;
      headingEl.textContent = heading;
      imgEl.src             = img;

      tabs.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
      });

      if (rightCols[prevIndex]) {
        rightCols[prevIndex].style.display       = 'none';
        rightCols[prevIndex].style.pointerEvents = 'none';
      }
      if (rightCols[index]) {
        rightCols[index].style.display       = '';
        rightCols[index].style.opacity       = '1';
        rightCols[index].style.pointerEvents = '';
      }

      els.forEach(el => (el.style.opacity = '1'));
    }, FADE);
  }

  setInterval(rotateAbout, 3000);
})();

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
