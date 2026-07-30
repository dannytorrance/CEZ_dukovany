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

  /* ---------- Anchor scroll offset (sticky header) ---------- */
  var header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#article-"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var headerHeight = header ? header.getBoundingClientRect().height : 0;
      var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

});