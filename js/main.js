(function () {
  'use strict';

  var header = document.getElementById('header');
  var menuBtn = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');
  var mobileNavOverlay = document.getElementById('mobileNavOverlay');
  var mobileNavClose = document.getElementById('mobileNavClose');
  var headerUser = document.getElementById('headerUser');
  var toastContainer = document.getElementById('toastContainer');

  var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function debounce(fn, ms) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(this, arguments); }, ms);
    };
  }

  function esc(str) { var d = document.createElement('div'); d.appendChild(document.createTextNode(str)); return d.innerHTML; }

  /* ── HEADER SCROLL ─────────────────────────── */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', debounce(onScroll, 16), { passive: true });

  /* ── MOBILE NAV ────────────────────────────── */
  function openMobileNav() {
    if (mobileNav) mobileNav.classList.add('active');
    if (menuBtn) menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      mobileNav && mobileNav.classList.contains('active') ? closeMobileNav() : openMobileNav();
    });
  }
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

  /* ── USER DROPDOWN ─────────────────────────── */
  if (headerUser) {
    headerUser.addEventListener('click', function (e) {
      e.stopPropagation();
      headerUser.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!headerUser.contains(e.target)) headerUser.classList.remove('open');
    });
  }

  /* ── TOAST ─────────────────────────────────── */
  var TOAST_ICONS = {
    success: 'circle-check',
    error: 'circle-x',
    warning: 'triangle-alert',
    info: 'info'
  };

  function showToast(type, title, message) {
    if (!toastContainer) return;
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.innerHTML =
      '<i data-lucide="' + (TOAST_ICONS[type] || 'info') + '" class="toast__icon"></i>' +
      '<div class="toast__content">' +
        '<div class="toast__title">' + esc(title) + '</div>' +
        '<div class="toast__message">' + esc(message) + '</div>' +
      '</div>' +
      '<button class="toast__close" aria-label="Cerrar"><i data-lucide="x"></i></button>';
    toastContainer.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    toast.querySelector('.toast__close').addEventListener('click', function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    });

    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 4000);
  }

  /* ── PAGE TRANSITION ───────────────────────── */
  var transitionEl = document.getElementById('pageTransition');
  if (transitionEl) {
    document.querySelectorAll('a[href*=".html"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (REDUCED_MOTION) return;
        if (link.target === '_blank' || link.hasAttribute('download') || link.getAttribute('rel') === 'external') return;
        if (e.defaultPrevented) return;
        var href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        e.preventDefault();
        transitionEl.classList.add('active');
        setTimeout(function () { window.location.href = href; }, 300);
      });
    });
  }

  window.showToast = showToast;

})();
