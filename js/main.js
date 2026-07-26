(function () {
  'use strict';

  const DOM = {
    header: document.getElementById('header'),
    menuBtn: document.getElementById('menuBtn'),
    mobileNav: document.getElementById('mobileNav'),
    mobileNavOverlay: document.getElementById('mobileNavOverlay'),
    mobileNavClose: document.getElementById('mobileNavClose'),
    headerUser: document.getElementById('headerUser'),
    breadcrumb: document.getElementById('breadcrumbCurrent'),
    toastContainer: document.getElementById('toastContainer'),
    cartCount: document.getElementById('cartCount'),
    trackingInput: document.getElementById('trackingInput'),
  };

  const SECTIONS = {
    login: 'Iniciar Sesion',
    register: 'Registrarse',
    profile: 'Mi Perfil',
    orders: 'Mis Pedidos',
    tracking: 'Tracking',
    wishlist: 'Lista de Deseos',
    settings: 'Configuracion',
    addresses: 'Direcciones',
    payment: 'Metodos de Pago',
    product: 'MacBook Pro M3',
  };

  const SELECTORS = {
    sidebarLinks: '.account-sidebar__link',
    sections: '.account-section',
    dropdownItems: '.header__dropdown-item, .mobile-nav__link',
    filterBtns: '.orders-filter__btn',
    orderCards: '.order-card',
    trackBtns: '.order-card__btn--track',
    wishlistRemove: '.wishlist-card__remove',
    wishlistAddCart: '.wishlist-card__add-cart',
    logoutBtn: '#logoutBtn',
  };

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function debounce(fn, ms) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), ms);
    };
  }

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ── HEADER SCROLL ─────────────────────────────── */
  function onScroll() {
    DOM.header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', debounce(onScroll, 16), { passive: true });

  /* ── MOBILE NAV ────────────────────────────────── */
  function openMobileNav() {
    DOM.mobileNav.classList.add('active');
    DOM.menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    DOM.mobileNav.classList.remove('active');
    DOM.menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  DOM.menuBtn.addEventListener('click', function () {
    DOM.mobileNav.classList.contains('active') ? closeMobileNav() : openMobileNav();
  });
  DOM.mobileNavOverlay.addEventListener('click', closeMobileNav);
  DOM.mobileNavClose.addEventListener('click', closeMobileNav);

  /* ── USER DROPDOWN ─────────────────────────────── */
  DOM.headerUser.addEventListener('click', function (e) {
    e.stopPropagation();
    DOM.headerUser.classList.toggle('open');
  });

  document.addEventListener('click', function (e) {
    if (!DOM.headerUser.contains(e.target)) {
      DOM.headerUser.classList.remove('open');
    }
  });

  /* ── SECTION NAVIGATION ────────────────────────── */
  const sidebarLinks = qsa(SELECTORS.sidebarLinks);
  const sections = qsa(SELECTORS.sections);

  function showSection(sectionId) {
    sections.forEach(function (s) { s.classList.remove('account-section--active'); });
    sidebarLinks.forEach(function (l) { l.classList.remove('account-sidebar__link--active'); });

    var target = document.getElementById('section-' + sectionId);
    if (target) target.classList.add('account-section--active');

    sidebarLinks.forEach(function (link) {
      if (link.dataset.section === sectionId) {
        link.classList.add('account-sidebar__link--active');
      }
    });

    var layout = document.querySelector('.account-layout');
    if (layout) {
      layout.classList.toggle('account-layout--product-active', sectionId === 'product');
    }

    if (DOM.breadcrumb) {
      DOM.breadcrumb.textContent = SECTIONS[sectionId] || 'Mi Cuenta';
    }
  }

  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      showSection(link.dataset.section);
      closeMobileNav();
    });
  });

  qsa(SELECTORS.dropdownItems).forEach(function (link) {
    link.addEventListener('click', function () {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        showSection(href.substring(1));
        closeMobileNav();
        DOM.headerUser.classList.remove('open');
      }
    });
  });

  var switchToRegister = document.getElementById('switchToRegister');
  var switchToLogin = document.getElementById('switchToLogin');
  if (switchToRegister) {
    switchToRegister.addEventListener('click', function (e) { e.preventDefault(); showSection('register'); });
  }
  if (switchToLogin) {
    switchToLogin.addEventListener('click', function (e) { e.preventDefault(); showSection('login'); });
  }

  /* ── PASSWORD TOGGLE ───────────────────────────── */
  function setupPasswordToggle(btnId, inputId) {
    var btn = document.getElementById(btnId);
    var input = document.getElementById(inputId);
    if (!btn || !input) return;

    btn.addEventListener('click', function () {
      var isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      var icon = btn.querySelector('.fa-eye, .fa-eye-slash');
      if (icon) {
        icon.className = 'fas ' + (isPassword ? 'fa-eye-slash' : 'fa-eye');
      }
    });
  }

  setupPasswordToggle('toggleLoginPassword', 'loginPassword');
  setupPasswordToggle('toggleRegPassword', 'regPassword');

  /* ── PASSWORD STRENGTH ─────────────────────────── */
  var regPassword = document.getElementById('regPassword');
  var strengthEl = document.getElementById('passwordStrength');

  if (regPassword && strengthEl) {
    regPassword.addEventListener('input', function () {
      var val = regPassword.value;
      if (!val) {
        strengthEl.className = 'auth-form__strength';
        return;
      }
      var score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      var cls = 'auth-form__strength';
      if (score === 1) cls += ' weak';
      else if (score === 2) cls += ' medium';
      else if (score === 3) cls += ' strong';
      else if (score === 4) cls += ' very-strong';
      strengthEl.className = cls;
    });
  }

  /* ── VALIDATION ────────────────────────────────── */
  function setFieldValidity(inputId, errorId, valid, message) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    if (input) {
      input.classList.toggle('field--error', !valid);
      input.classList.toggle('field--valid', valid);
    }
    if (error) error.textContent = valid ? '' : message;
  }

  function clearField(inputId, errorId) {
    setFieldValidity(inputId, errorId, true, '');
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail(value) {
    return value && EMAIL_RE.test(value);
  }

  /* ── LOGIN FORM ────────────────────────────────── */
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    var loginEmail = document.getElementById('loginEmail');
    var loginPassword = document.getElementById('loginPassword');

    function validateLoginField(inputId, errorId) {
      var val = document.getElementById(inputId).value.trim();
      var err = document.getElementById(errorId);
      if (inputId === 'loginEmail') {
        if (!val) { err.textContent = 'El correo es requerido'; return false; }
        if (!EMAIL_RE.test(val)) { err.textContent = 'Ingresa un correo valido'; return false; }
      }
      if (inputId === 'loginPassword') {
        if (!val) { err.textContent = 'La contrasena es requerida'; return false; }
        if (val.length < 6) { err.textContent = 'Minimo 6 caracteres'; return false; }
      }
      err.textContent = '';
      return true;
    }

    loginEmail.addEventListener('blur', function () { validateLoginField('loginEmail', 'loginEmailError'); });
    loginEmail.addEventListener('input', function () { validateLoginField('loginEmail', 'loginEmailError'); });
    loginPassword.addEventListener('blur', function () { validateLoginField('loginPassword', 'loginPasswordError'); });
    loginPassword.addEventListener('input', function () { validateLoginField('loginPassword', 'loginPasswordError'); });

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = validateLoginField('loginEmail', 'loginEmailError') && validateLoginField('loginPassword', 'loginPasswordError');
      if (valid) {
        showToast('success', 'Bienvenido!', 'Has iniciado sesion correctamente');
        showSection('profile');
      }
    });
  }

  /* ── REGISTER FORM ─────────────────────────────── */
  var registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var name = document.getElementById('regName').value.trim();
      var email = document.getElementById('regEmail').value.trim();
      var phone = document.getElementById('regPhone').value.trim();
      var password = document.getElementById('regPassword').value;
      var confirm = document.getElementById('regConfirmPassword').value;
      var terms = document.getElementById('acceptTerms').checked;

      ['regName', 'regEmail', 'regPhone', 'regPassword', 'regConfirmPassword'].forEach(function (id) { clearField(id, id + 'Error'); });
      clearField('acceptTerms', 'regTermsError');

      if (!name) { setFieldValidity('regName', 'regNameError', false, 'El nombre es requerido'); valid = false; }
      if (!email) { setFieldValidity('regEmail', 'regEmailError', false, 'El correo es requerido'); valid = false; }
      else if (!EMAIL_RE.test(email)) { setFieldValidity('regEmail', 'regEmailError', false, 'Correo invalido'); valid = false; }
      if (!password || password.length < 8) { setFieldValidity('regPassword', 'regPasswordError', false, 'Minimo 8 caracteres'); valid = false; }
      if (password !== confirm) { setFieldValidity('regConfirmPassword', 'regConfirmPasswordError', false, 'Las contrasenas no coinciden'); valid = false; }
      if (!terms) { setFieldValidity('acceptTerms', 'regTermsError', false, 'Debes aceptar los terminos'); valid = false; }

      if (valid) {
        showToast('success', 'Cuenta creada!', 'Tu cuenta ha sido creada exitosamente');
        showSection('profile');
      }
    });
  }

  /* ── PROFILE FORM ──────────────────────────────── */
  var profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('success', 'Guardado!', 'Tu perfil ha sido actualizado');
    });
  }

  var passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var current = document.getElementById('currentPassword').value;
      var newPass = document.getElementById('newPassword').value;
      var confirm = document.getElementById('confirmNewPassword').value;

      if (!current || !newPass || !confirm) {
        showToast('error', 'Error', 'Completa todos los campos');
        return;
      }
      if (newPass !== confirm) {
        showToast('error', 'Error', 'Las contrasenas no coinciden');
        return;
      }
      showToast('success', 'Actualizado', 'Tu contrasena ha sido cambiada');
      passwordForm.reset();
    });
  }

  /* ── ORDER FILTERS ─────────────────────────────── */
  var filterBtns = qsa(SELECTORS.filterBtns);
  var orderCards = qsa(SELECTORS.orderCards);

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('orders-filter__btn--active'); });
      btn.classList.add('orders-filter__btn--active');

      var filter = btn.dataset.filter;
      orderCards.forEach(function (card) {
        var match = filter === 'all' || card.dataset.status === filter;
        card.classList.toggle('order-card--hidden', !match);
        if (match) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = REDUCED_MOTION ? 'none' : 'fadeSlideIn 0.4s ease forwards';
        }
      });
    });
  });

  /* ── TRACK FROM ORDERS ─────────────────────────── */
  qsa(SELECTORS.trackBtns).forEach(function (btn) {
    btn.addEventListener('click', function () {
      showSection('tracking');
      if (DOM.trackingInput && btn.dataset.tracking) {
        DOM.trackingInput.value = btn.dataset.tracking;
      }
    });
  });

  /* ── LOGOUT ────────────────────────────────────── */
  var logoutBtn = qs(SELECTORS.logoutBtn);
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      showToast('info', 'Sesion cerrada', 'Has cerrado sesion correctamente');
      showSection('login');
    });
  }

  /* ── WISHLIST ──────────────────────────────────── */
  qsa(SELECTORS.wishlistRemove).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.wishlist-card');
      if (!card) return;
      card.classList.add('wishlist-card--removing');
      setTimeout(function () {
        if (card.parentNode) card.parentNode.removeChild(card);
      }, 300);
      showToast('info', 'Eliminado', 'Producto removido de favoritos');
    });
  });

  qsa(SELECTORS.wishlistAddCart).forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!DOM.cartCount) return;
      var count = parseInt(DOM.cartCount.textContent, 10) + 1;
      DOM.cartCount.textContent = count;
      DOM.cartCount.classList.remove('cart-bounce');
      DOM.cartCount.offsetHeight;
      DOM.cartCount.classList.add('cart-bounce');
      showToast('success', 'Agregado', 'Producto agregado al carrito');
    });
  });

  /* ── TOAST ─────────────────────────────────────── */
  var TOAST_ICONS = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle',
  };

  function showToast(type, title, message) {
    if (!DOM.toastContainer) return;
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.innerHTML =
      '<i class="fas ' + (TOAST_ICONS[type] || 'fa-info-circle') + ' toast__icon"></i>' +
      '<div class="toast__content">' +
        '<div class="toast__title">' + title + '</div>' +
        '<div class="toast__message">' + message + '</div>' +
      '</div>' +
      '<button class="toast__close" aria-label="Cerrar"><i class="fas fa-times"></i></button>';
    DOM.toastContainer.appendChild(toast);

    var closeBtn = toast.querySelector('.toast__close');
    closeBtn.addEventListener('click', function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    });

    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 4000);
  }

  /* ── PAGE TRANSITION ──────────────────────────── */
  var transitionEl = document.getElementById('pageTransition');
  if (transitionEl) {
    document.querySelectorAll('a[href*=".html"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (REDUCED_MOTION) return;
        var href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http')) return;
        e.preventDefault();
        transitionEl.classList.add('active');
        setTimeout(function () { window.location.href = href; }, 300);
      });
    });
  }

  /* Exponer showToast globalmente para los micro-modulos de producto */
  window.showToast = showToast;

})();
