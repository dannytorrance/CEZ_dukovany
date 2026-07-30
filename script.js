document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Language switcher ---------- */
  var langSwitcher = document.querySelector('.lang-switcher');
  var langBtn = document.querySelector('.lang-switcher-btn');
  var langOptions = document.querySelectorAll('.lang-bubble button');
  var langLabel = document.querySelector('.lang-current');

  if (langBtn && langSwitcher) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langSwitcher.classList.toggle('is-open');
      langBtn.setAttribute('aria-expanded', langSwitcher.classList.contains('is-open'));
    });

    langOptions.forEach(function (opt) {
      opt.addEventListener('click', function () {
        langOptions.forEach(function (o) { o.classList.remove('is-selected'); });
        opt.classList.add('is-selected');
        if (langLabel) {
          langLabel.textContent = opt.getAttribute('data-lang');
        }
        langSwitcher.classList.remove('is-open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        langSwitcher.classList.remove('is-open');
      }
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

});
