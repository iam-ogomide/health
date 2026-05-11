// Global JS — runs on every page

// About section tab switching
document.querySelectorAll('.about-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.about-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
