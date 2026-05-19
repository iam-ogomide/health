(function () {
  var isSubpage = window.location.pathname.replace(/\\/g, '/').indexOf('/pages/') !== -1;
  var base = isSubpage ? '../' : '';
  var pg = isSubpage ? '' : 'pages/';

  var path = window.location.pathname.toLowerCase();
  var active = 'home';
  if (path.indexOf('about') !== -1)    active = 'about';
  else if (path.indexOf('services') !== -1) active = 'services';
  else if (path.indexOf('contact') !== -1)  active = 'contact';

  function a(page)       { return active === page ? ' class="active"' : ''; }
  function ma(page)      { return 'class="nav-mobile-link' + (active === page ? ' active"' : '"'); }

  var html =
    '<header class="navbar">' +
      '<div class="nav-logo">' +
        '<img src="' + base + 'assets/images/top-logo.png" alt="Pharmira Health" />' +
        '<span class="nav-logo-name">Pharmira Health</span>' +
      '</div>' +
      '<nav class="nav-links">' +
        '<a href="' + base + 'index.html"' + a('home') + '>Home</a>' +
        '<a href="' + pg + 'about.html"' + a('about') + '>About</a>' +
        '<a href="' + pg + 'services.html"' + a('services') + '>Services</a>' +
        // '<a href="#">How it Works</a>' +
        '<a href="' + pg + 'contact.html"' + a('contact') + '>Contact</a>' +
      '</nav>' +
      '<div class="btn-wrap">' +
        '<a href="#" class="btn btn-dark">Where to start</a>' +
        '<a href="#" class="btn-circle">→</a>' +
      '</div>' +
      '<button class="nav-hamburger" aria-label="Toggle navigation" aria-expanded="false">' +
        '<svg class="ham-open" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<rect y="0" width="22" height="2.5" rx="1.25" fill="currentColor"/>' +
          '<rect y="6.75" width="22" height="2.5" rx="1.25" fill="currentColor"/>' +
          '<rect y="13.5" width="22" height="2.5" rx="1.25" fill="currentColor"/>' +
        '</svg>' +
        '<svg class="ham-close" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M1.5 1.5L16.5 16.5M16.5 1.5L1.5 16.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
        '</svg>' +
      '</button>' +
      '<div class="nav-mobile-dropdown">' +
        '<a href="' + base + 'index.html" ' + ma('home') + '>Home</a>' +
        '<a href="' + pg + 'about.html" ' + ma('about') + '>About</a>' +
        '<a href="' + pg + 'services.html" ' + ma('services') + '>Services</a>' +
        '<a href="#" class="nav-mobile-link">How it works</a>' +
        '<a href="' + pg + 'contact.html" ' + ma('contact') + '>Contact</a>' +
        '<div class="nav-mobile-cta-row">' +
          '<a href="#" class="nav-mobile-cta">Where to start</a>' +
          '<a href="#" class="nav-mobile-cta-circle">→</a>' +
        '</div>' +
      '</div>' +
    '</header>';

  var root = document.getElementById('navbar-root');
  if (!root) return;
  root.outerHTML = html;

  var hamburger = document.querySelector('.nav-hamburger');
  var dropdown  = document.querySelector('.nav-mobile-dropdown');
  var navbar    = document.querySelector('.navbar');

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
    if (!navbar.contains(e.target) && !dropdown.contains(e.target)) closeMenu();
  });
})();
