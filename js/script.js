document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Language switcher ---------- */
  var langSwitcher = document.querySelector('.lang-switcher');
  /* ---------- Page translation (CZ / EN) ---------- */
  function applyTranslation(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-cs')) {
        el.setAttribute('data-cs', el.textContent);
      }
      el.textContent = lang === 'EN' ? el.getAttribute('data-en') : el.getAttribute('data-cs');
    });

    document.querySelectorAll('[data-en-alt]').forEach(function (el) {
      if (!el.hasAttribute('data-cs-alt')) {
        el.setAttribute('data-cs-alt', el.getAttribute('alt'));
      }
      el.setAttribute('alt', lang === 'EN' ? el.getAttribute('data-en-alt') : el.getAttribute('data-cs-alt'));
    });

    document.querySelectorAll('[data-en-aria]').forEach(function (el) {
      if (!el.hasAttribute('data-cs-aria')) {
        el.setAttribute('data-cs-aria', el.getAttribute('aria-label'));
      }
      el.setAttribute('aria-label', lang === 'EN' ? el.getAttribute('data-en-aria') : el.getAttribute('data-cs-aria'));
    });

    document.documentElement.setAttribute('lang', lang === 'EN' ? 'en' : 'cs');
  }

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
        applyTranslation(opt.getAttribute('data-lang'));
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

  document.querySelectorAll('a[href^="#article-"], a[href="#blog"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var headerHeight = header ? header.getBoundingClientRect().height : 0;
      var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ---------- Hero parallax ---------- */
  var heroImg = document.querySelector('.hero-image-wrap img');
  var heroWrap = document.querySelector('.hero-image-wrap');

  if (heroImg && heroWrap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    var speed = 0.35;

    function updateParallax() {
      var rect = heroWrap.getBoundingClientRect();
      var offset = rect.top * speed;
      heroImg.style.transform = 'translateY(' + offset + 'px)';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

});
