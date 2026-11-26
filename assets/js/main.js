(function () {
  'use strict';

  // ---------- Header: hidden over the hero, slides in after scrolling past it ----------
  var header = document.querySelector('.site-header');
  var panel = document.querySelector('.hero');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var heroMenu = document.querySelector('.hero-menu');
  var menuOpen = false;

  function update() {
    var threshold = panel ? panel.offsetHeight * 0.55 : 80;
    header.classList.toggle('show', menuOpen || window.scrollY > threshold);
  }
  function setMenu(open) {
    menuOpen = open;
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
    if (nav) nav.classList.toggle('open', open);
    update();
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!menuOpen); });
  if (heroMenu) heroMenu.addEventListener('click', function () { setMenu(true); });
  if (nav) nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuOpen) setMenu(false); });
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // ---------- Copy address ----------
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      var done = function () {
        var prev = btn.textContent;
        btn.textContent = '복사되었습니다';
        setTimeout(function () { btn.textContent = prev; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(value).then(done, function () {});
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
