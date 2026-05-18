(function () {
  var isSubpage = window.location.pathname.replace(/\\/g, '/').indexOf('/pages/') !== -1;
  var base = isSubpage ? '../' : '';
  var pg = isSubpage ? '' : 'pages/';

  var html =
    '<footer class="site-footer">' +
      '<div class="footer-top">' +
        '<div class="footer-tagline">' +
          '<p class="footer-tagline__main">Let our team help you.</p>' +
          '<p class="footer-tagline__sub">Contact us today.</p>' +
          '<a href="' + pg + 'contact.html" class="footer-arrow" aria-label="Contact us">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</a>' +
        '</div>' +
        '<nav class="footer-nav">' +
          '<div class="footer-col">' +
            '<h4>Platform</h4>' +
            '<ul>' +
              '<li><a href="#">How it works</a></li>' +
              '<li><a href="#">For Patients</a></li>' +
              '<li><a href="#">For Providers</a></li>' +
              '<li><a href="#">Find a Pharmacy</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Our Services</h4>' +
            '<ul>' +
              '<li><a href="#">For Pharmacies</a></li>' +
              '<li><a href="#">For Patients</a></li>' +
              '<li><a href="#">Online Consultations</a></li>' +
              '<li><a href="#">Delivery</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>About</h4>' +
            '<ul>' +
              '<li><a href="' + pg + 'about.html">About Us</a></li>' +
              '<li><a href="#">Our Mission</a></li>' +
              '<li><a href="#">Our Team</a></li>' +
              '<li><a href="#">Our Partners</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Quick links</h4>' +
            '<ul>' +
              '<li><a href="' + pg + 'contact.html">Contact us</a></li>' +
              '<li><a href="#">FAQ</a></li>' +
              '<li><a href="#">Privacy Policy</a></li>' +
              '<li><a href="#">Our Partners</a></li>' +
            '</ul>' +
          '</div>' +
        '</nav>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="footer-brand">' +
          '<img src="' + base + 'assets/images/top-logo.png" alt="Pharmira Health" class="footer-logo" />' +
          '<span class="footer-brand-name">Pharmira<br />Health</span>' +
        '</div>' +
        '<div class="footer-bottom-right">' +
          '<div class="footer-socials">' +
            '<a href="#" class="footer-social" aria-label="Twitter">' +
              '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.737l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
            '</a>' +
            '<a href="#" class="footer-social" aria-label="LinkedIn">' +
              '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>' +
            '</a>' +
            '<a href="#" class="footer-social" aria-label="GitHub">' +
              '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>' +
            '</a>' +
          '</div>' +
          '<p class="footer-copy">© 2026 PharmiraHealth. All rights reserved.</p>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var root = document.getElementById('footer-root');
  if (!root) return;
  root.outerHTML = html;
})();
