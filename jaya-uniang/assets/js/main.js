/* Jaya Uni'ang — shared behaviour
   carousel · mobile nav · accordion · scroll reveal · contact form */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- mobile nav */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // dropdowns expand on tap once the menu is in mobile mode
    [].forEach.call(nav.querySelectorAll('.dd > a'), function (t) {
      t.addEventListener('click', function (e) {
        if (window.innerWidth <= 1040) {
          e.preventDefault();
          t.parentElement.classList.toggle('expand');
        }
      });
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1040 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------ carousel */
  var slides = [].slice.call(document.querySelectorAll('.hero .slide'));
  var dots = [].slice.call(document.querySelectorAll('.dots button'));
  if (slides.length > 1) {
    var i = 0, timer = null;
    var show = function (n) {
      slides.forEach(function (s, k) { s.classList.toggle('on', k === n); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === n ? 'true' : 'false'); });
      i = n;
    };
    var next = function () { show((i + 1) % slides.length); };
    var start = function () { if (!reduce && !timer) timer = setInterval(next, 4800); };
    var stop = function () { clearInterval(timer); timer = null; };
    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { stop(); show(k); start(); });
    });
    var hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    start();
  }

  /* ----------------------------------------------------------- accordion */
  [].forEach.call(document.querySelectorAll('.acc-item button'), function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var open = item.classList.contains('open');
      [].forEach.call(item.parentElement.children, function (el) {
        el.classList.remove('open');
        var b = el.querySelector('button');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* -------------------------------------------------------- contact form */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      [].forEach.call(form.querySelectorAll('[required]'), function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = '#E02B1D'; }
        else { f.style.borderColor = ''; }
      });
      if (!ok) return;
      var msg = document.getElementById('formSent');
      if (msg) { msg.classList.add('show'); msg.setAttribute('role', 'status'); }
      form.reset();
    });
  }

  /* -------------------------------------------------- branch locator */
  var locator = document.getElementById('locator');
  if (locator) {
    var btns = [].slice.call(locator.querySelectorAll('.loc-btn'));
    var panels = [].slice.call(locator.querySelectorAll('.loc-detail'));
    var nodes = [].slice.call(locator.querySelectorAll('.loc-node'));

    var select = function (key) {
      btns.forEach(function (b) {
        b.setAttribute('aria-selected', b.dataset.loc === key ? 'true' : 'false');
      });
      panels.forEach(function (p) { p.classList.toggle('on', p.dataset.loc === key); });
      nodes.forEach(function (n) { n.classList.toggle('active', n.dataset.loc === key); });
    };

    btns.forEach(function (b) {
      b.addEventListener('click', function () { select(b.dataset.loc); });
    });
    nodes.forEach(function (n) {
      n.addEventListener('click', function () { select(n.dataset.loc); });
      n.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(n.dataset.loc); }
      });
    });

    if (btns.length) select(btns[0].dataset.loc);
  }

  /* ------------------------------------------------------- scroll reveal */
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduce) {
    [].forEach.call(els, function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (x) {
      if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
    });
  }, { threshold: 0.1 });
  [].forEach.call(els, function (e) { io.observe(e); });
})();

/* ---- Event photo lightbox ---- */
(function () {
  var grids = document.querySelectorAll('[data-lightbox]');
  if (!grids.length) return;
  var lb = document.createElement('div');
  lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
  lb.innerHTML = '<button class="lb-x" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous photo">&#8249;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure><button class="lb-next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), cap = lb.querySelector('figcaption'), items = [], idx = 0, last = null;
  function show(i) {
    idx = (i + items.length) % items.length;
    var b = items[idx]; img.src = b.getAttribute('data-full'); img.alt = b.querySelector('img').alt; cap.textContent = b.getAttribute('data-cap');
    var multi = items.length > 1; lb.querySelector('.lb-prev').style.display = multi ? '' : 'none'; lb.querySelector('.lb-next').style.display = multi ? '' : 'none';
  }
  function open(list, i, trigger) { items = list; last = trigger; show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.querySelector('.lb-x').focus(); }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; if (last) last.focus(); }
  [].forEach.call(grids, function (g) {
    var btns = [].slice.call(g.querySelectorAll('.evbtn'));
    btns.forEach(function (b, i) { b.addEventListener('click', function () { open(btns, i, b); }); });
  });
  lb.querySelector('.lb-x').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(idx - 1); else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
