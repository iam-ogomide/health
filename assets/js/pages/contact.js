// Contact page logic — FAQ modal + accordion
(function () {
  var faqBtn  = document.querySelector('.faq-btn');
  var modal   = document.getElementById('faqModal');
  if (!faqBtn || !modal) return;

  var backdrop = modal.querySelector('.faq-modal__backdrop');
  var closeBtn = modal.querySelector('.faq-modal__close');

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  faqBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Accordion — one open at a time
  modal.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item   = this.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');

      modal.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('is-open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
