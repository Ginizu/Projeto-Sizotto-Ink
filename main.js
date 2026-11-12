(function () {
  'use strict';

  // Menu mobile
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Botão flutuante de orçamento: aparece após o hero
  var fab = document.querySelector('.fab');
  var hero = document.getElementById('topo');
  if (fab && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      fab.classList.toggle('is-visible', !entries[0].isIntersecting);
    }).observe(hero);
  }

  // Fade-in discreto
  var items = document.querySelectorAll('.section__title, .text, .card, .promo__title, .contact');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
