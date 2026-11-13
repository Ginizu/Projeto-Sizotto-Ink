(function () {
  'use strict';

  var gallery = document.querySelector('[data-gallery]');
  var box = document.getElementById('lightbox');
  if (!gallery || !box) return;

  var thumbs = [].slice.call(gallery.querySelectorAll('.thumb'));
  var imgEl = box.querySelector('.lightbox__img');
  var capEl = box.querySelector('.lightbox__cap');
  var countEl = box.querySelector('.lightbox__count');
  var cta = box.querySelector('.lightbox__cta');
  var btnClose = box.querySelector('.lightbox__close');
  var btnPrev = box.querySelector('.lightbox__prev');
  var btnNext = box.querySelector('.lightbox__next');

  var index = 0;
  var lastFocus = null;
  var startX = 0;
  var startY = 0;

  function srcOf(i) {
    var t = thumbs[i];
    var img = t.querySelector('img');
    return t.getAttribute('data-full') || img.currentSrc || img.src;
  }

  function preload(i) {
    var n = (i + thumbs.length) % thumbs.length;
    var im = new Image();
    im.src = srcOf(n);
  }

  function show(i) {
    index = (i + thumbs.length) % thumbs.length;
    var t = thumbs[index];
    var alt = t.querySelector('img').alt;
    imgEl.src = srcOf(index);
    imgEl.alt = alt;
    capEl.textContent = alt;
    countEl.textContent = (index + 1) + ' / ' + thumbs.length;

    var flash = t.getAttribute('data-flash');
    if (cta) {
      if (flash) {
        cta.href = 'orcamento.html?flash=' + encodeURIComponent(flash);
        cta.hidden = false;
      } else {
        cta.hidden = true;
      }
    }
    preload(index + 1);
    preload(index - 1);
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    btnClose.focus();
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    imgEl.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function isOpen() { return box.classList.contains('is-open'); }

  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { open(i); });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(index - 1); });
  btnNext.addEventListener('click', function () { show(index + 1); });

  // Clique no fundo escuro fecha
  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  // Teclado: Esc, setas e foco preso dentro do lightbox
  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowLeft') { show(index - 1); return; }
    if (e.key === 'ArrowRight') { show(index + 1); return; }
    if (e.key === 'Tab') {
      var items = [btnClose, btnPrev, btnNext];
      if (cta && !cta.hidden) items.push(cta);
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Deslizar no celular
  box.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  }, { passive: true });

  box.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      show(dx < 0 ? index + 1 : index - 1);
    }
  }, { passive: true });
})();
