// Navbar behaviour — mobile hamburger toggle
(function () {
  var hamburger = document.querySelector('.nav-hamburger');
  var dropdown = document.querySelector('.nav-mobile-dropdown');
  var navbar = document.querySelector('.navbar');

  if (!hamburger || !dropdown || !navbar) return;

  function openMenu() {
    var rect = navbar.getBoundingClientRect();
    dropdown.style.top = Math.round(rect.bottom + 8) + 'px';
    dropdown.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    dropdown.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  dropdown.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && !dropdown.contains(e.target)) {
      closeMenu();
    }
  });
})();
