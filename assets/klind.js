// GRABIEC METALS - menu mobilne, karuzela usług, przełącznik opinii
(function () {
  var burger = document.querySelector('.k-burger');
  var menu = document.querySelector('.k-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  // karuzela usług: strzałki przewijają o jeden kafel, pasek pokazuje pozycję
  document.querySelectorAll('.k-car').forEach(function (car) {
    var track = car.querySelector('.k-car-track');
    var bar = car.querySelector('.k-car-bar i');
    if (!track) return;
    var krok = function () {
      var s = track.querySelector('.k-slide');
      if (!s) return 300;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return s.getBoundingClientRect().width + gap;
    };
    var next = car.querySelector('[data-car="next"]');
    var prev = car.querySelector('[data-car="prev"]');
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: krok(), behavior: 'smooth' }); });
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -krok(), behavior: 'smooth' }); });
    var upd = function () {
      if (!bar) return;
      var max = track.scrollWidth - track.clientWidth;
      var widac = track.clientWidth / track.scrollWidth;
      bar.style.width = (widac * 100) + '%';
      bar.style.left = (max > 0 ? (track.scrollLeft / max) * (1 - widac) * 100 : 0) + '%';
    };
    track.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd, { passive: true });
    upd();
  });

  // opinie: strzałki przełączają cytaty
  document.querySelectorAll('.k-rev').forEach(function (box) {
    var q = box.querySelectorAll('.k-q');
    if (q.length < 2) return;
    var i = 0;
    var pokaz = function (n) {
      q[i].classList.remove('on');
      i = (n + q.length) % q.length;
      q[i].classList.add('on');
    };
    var next = box.querySelector('[data-rev="next"]');
    var prev = box.querySelector('[data-rev="prev"]');
    if (next) next.addEventListener('click', function () { pokaz(i + 1); });
    if (prev) prev.addEventListener('click', function () { pokaz(i - 1); });
  });
})();
