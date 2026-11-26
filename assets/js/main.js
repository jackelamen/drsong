(function () {
  'use strict';

  // ---------- Mobile nav ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      }
    });
  }

  // ---------- Header shadow on scroll ----------
  var header = document.querySelector('.site-header');
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Hours: today highlight + open status (Korea time) ----------
  // 0 = Sun ... 6 = Sat. Times in minutes from midnight.
  var SCHEDULE = {
    1: { open: 630, close: 1140, lunch: [810, 870] },
    2: { open: 630, close: 1140, lunch: [810, 870] },
    3: { open: 630, close: 1140, lunch: [810, 870] },
    5: { open: 630, close: 1140, lunch: [810, 870] },
    6: { open: 600, close: 840, lunch: null }
  };
  var DAY_NAMES = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  function koreaNow() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Seoul', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
    return { day: day, minutes: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10) };
  }
  function fmt(m) {
    var h = Math.floor(m / 60), mm = m % 60;
    return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm;
  }

  try {
    var now = koreaNow();
    var row = document.querySelector('.hours-table tr[data-day="' + now.day + '"]');
    if (row) row.classList.add('today');

    var card = document.getElementById('today-card');
    var text = document.getElementById('today-text');
    var s = SCHEDULE[now.day];
    var msg, state;
    if (!s) {
      msg = DAY_NAMES[now.day] + '은 휴진입니다';
      state = 'closed';
    } else if (now.minutes < s.open) {
      msg = '오늘 ' + fmt(s.open) + ' 진료 시작 (' + fmt(s.open) + ' ~ ' + fmt(s.close) + ')';
      state = 'closed';
    } else if (now.minutes >= s.close) {
      msg = '오늘 진료가 종료되었습니다';
      state = 'closed';
    } else if (s.lunch && now.minutes >= s.lunch[0] && now.minutes < s.lunch[1]) {
      msg = '점심시간 · ' + fmt(s.lunch[1]) + '부터 진료합니다';
      state = 'closed';
    } else {
      msg = '진료 중 · 오늘 ' + fmt(s.close) + '까지';
      state = 'open';
    }
    if (card && text) {
      text.textContent = msg;
      card.classList.add(state);
    }
  } catch (e) { /* leave static fallback text */ }

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

  // ---------- Reveal on scroll ----------
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
