(function () {
  //  animation attrs to repeated card groups 
  var cardGroups = [
    { selector: '.features-grid .feat-card',      cycle: 3 },
    { selector: '.mission-rows .mission-row',      cycle: 4 },
    { selector: '.cta-cards .cta-card',            cycle: 2 },
    { selector: '.vision-cards .vision-card',      cycle: 4 },
    { selector: '.platform-cards .platform-card',  cycle: 2 },
    { selector: '.services-grid .service-card',    cycle: 3 },
  ];

  cardGroups.forEach(function (group) {
    document.querySelectorAll(group.selector).forEach(function (el, i) {
      el.setAttribute('data-animate', '');
      el.setAttribute('data-delay', String((i % group.cycle) + 1));
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    if (el.hasAttribute('data-hero')) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.classList.add('is-visible');
        });
      });
    } else {
      observer.observe(el);
    }
  });
})();
