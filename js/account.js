(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.from((c || document).querySelectorAll(s)); };

  function tryGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function trySet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var session = tryGet('techstore_session');
  if (!session) { window.location.href = 'cuenta.html'; return; }

  /* ── SIDEBAR USER ── */
  var avatar = session.name ? session.name.charAt(0).toUpperCase() : 'U';
  var el = function (id) { return document.getElementById(id); };
  var sidebarAvatar = el('sidebarAvatar');
  var sidebarName = el('sidebarName');
  var sidebarEmail = el('sidebarEmail');
  if (sidebarAvatar) sidebarAvatar.textContent = avatar;
  if (sidebarName) sidebarName.textContent = session.name || 'Usuario';
  if (sidebarEmail) sidebarEmail.textContent = session.email || '';

  /* ── SECTION NAV ── */
  var links = $$('.sidebar__link');
  var sections = $$('.account-section');
  var currentSection = 'perfil';

  function showSection(id) {
    currentSection = id;
    sections.forEach(function (s) { s.classList.remove('account-section--active'); });
    links.forEach(function (l) { l.classList.remove('sidebar__link--active'); l.removeAttribute('aria-current'); });
    var target = el('sec-' + id);
    if (target) target.classList.add('account-section--active');
    links.forEach(function (l) {
      if (l.dataset.section === id) { l.classList.add('sidebar__link--active'); l.setAttribute('aria-current', 'page'); }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  links.forEach(function (l) { l.addEventListener('click', function () { showSection(l.dataset.section); }); });

  if (window.location.hash && window.location.hash.length > 1) {
    var h = window.location.hash.substring(1);
    if (el('sec-' + h)) showSection(h);
  }

  /* ── TOAST (reuse store.js global) ── */
  function toast(msg) { if (window.showToast) window.showToast(msg); }

  /* ── PROFILE ── */
  var profileForm = el('profileForm');
  var profName = el('profName');
  var profEmail = el('profEmail');
  var profPhone = el('profPhone');
  var profDept = el('profDept');
  var profAddress = el('profAddress');

  function loadProfile() {
    if (profName) profName.value = session.name || '';
    if (profEmail) profEmail.value = session.email || '';
    if (profPhone) profPhone.value = session.phone || '';
    if (profDept) profDept.value = session.dept || '';
    if (profAddress) profAddress.value = session.address || '';
    var pn = el('profileName');
    var pe = el('profileEmail');
    var pa = el('profileAvatar');
    var pp = el('profilePoints');
    if (pn) pn.textContent = session.name || 'Usuario';
    if (pe) pe.textContent = session.email || '';
    if (pa) pa.textContent = avatar;
    if (pp) pp.textContent = session.points || 0;
  }

  if (profileForm) {
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();
      session.name = profName.value.trim();
      session.email = profEmail.value.trim();
      session.phone = profPhone.value.trim();
      session.dept = profDept.value;
      session.address = profAddress.value.trim();
      trySet('techstore_session', session);
      loadProfile();
      if (sidebarName) sidebarName.textContent = session.name;
      if (sidebarEmail) sidebarEmail.textContent = session.email;
      if (sidebarAvatar) sidebarAvatar.textContent = session.name ? session.name.charAt(0).toUpperCase() : 'U';
      toast('Perfil actualizado correctamente');
    });
  }

  if (el('profileCancel')) el('profileCancel').addEventListener('click', loadProfile);

  /* ── PASSWORD ── */
  var passwordForm = el('passwordForm');
  var newPass = el('newPass');
  var strengthFill = el('strengthFill');
  var strengthText = el('strengthText');

  if (newPass) {
    newPass.addEventListener('input', function () {
      var v = newPass.value;
      var score = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      var pct = (score / 4) * 100;
      var labels = ['', 'Debil', 'Regular', 'Buena', 'Excelente'];
      var colors = ['', 'var(--color-error)', 'var(--color-warning)', 'var(--color-info)', 'var(--color-success)'];
      if (strengthFill) { strengthFill.style.width = pct + '%'; strengthFill.style.background = colors[score]; }
      if (strengthText) strengthText.textContent = v ? labels[score] : '';
    });
  }

  if (passwordForm) {
    passwordForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var cur = el('currentPass');
      var np = el('newPass');
      var cp = el('confirmPass');
      if (!cur.value || !np.value || !cp.value) { toast('Completa todos los campos'); return; }
      if (np.value !== cp.value) { toast('Las contrasenas no coinciden'); return; }
      if (np.value.length < 8) { toast('Minimo 8 caracteres'); return; }
      passwordForm.reset();
      if (strengthFill) strengthFill.style.width = '0%';
      if (strengthText) strengthText.textContent = '';
      toast('Contrasena actualizada');
    });
  }

  if (el('passwordCancel')) el('passwordCancel').addEventListener('click', function () { passwordForm.reset(); });

  /* ── ORDERS (mock) ── */
  var mockOrders = [
    { id: 'TS-2026-001', date: '15 Jul 2026', status: 'delivered', items: [{ name: 'NovaBook Air 13', qty: 1, price: 899, icon: 'laptop' }], total: 899 },
    { id: 'TS-2026-002', date: '22 Jul 2026', status: 'shipped', items: [{ name: 'AuroraBuds Pro', qty: 2, price: 149, icon: 'headphones' }], total: 298 },
    { id: 'TS-2026-003', date: '28 Jul 2026', status: 'pending', items: [{ name: 'Zenith X12', qty: 1, price: 799, icon: 'smartphone' }, { name: 'VoltCharge 65W', qty: 1, price: 39, icon: 'plug-zap' }], total: 838 }
  ];

  var ordersList = el('ordersList');
  var ordersEmpty = el('ordersEmpty');
  var statusLabels = { pending: 'Pendiente', confirmed: 'Confirmado', shipped: 'Enviado', delivered: 'Entregado' };
  var statusIcons = { pending: 'clock', confirmed: 'check-circle', shipped: 'truck', delivered: 'package-check' };

  function renderOrders(filter) {
    if (!ordersList) return;
    var list = filter === 'all' ? mockOrders : mockOrders.filter(function (o) { return o.status === filter; });
    if (list.length === 0) {
      ordersList.innerHTML = '';
      if (ordersEmpty) ordersEmpty.style.display = '';
      return;
    }
    if (ordersEmpty) ordersEmpty.style.display = 'none';
    ordersList.innerHTML = list.map(function (o) {
      return '<div class="order-card" data-status="' + o.status + '">' +
        '<div class="order-card__header">' +
          '<div><span class="order-card__label">Pedido</span><span class="order-card__number">#' + o.id + '</span></div>' +
          '<div><span class="order-card__label">Fecha</span><span>' + o.date + '</span></div>' +
          '<div class="order-card__status order-card__status--' + o.status + '"><i data-lucide="' + statusIcons[o.status] + '"></i> ' + statusLabels[o.status] + '</div>' +
        '</div>' +
        '<div class="order-card__products">' + o.items.map(function (it) {
          return '<div class="order-card__product">' +
            '<div class="order-card__product-img"><i data-lucide="' + it.icon + '"></i></div>' +
            '<div class="order-card__product-info"><h4>' + it.name + '</h4><p>Cantidad: ' + it.qty + '</p></div>' +
            '<div class="order-card__product-price">$' + (it.price * it.qty).toLocaleString('en-US') + '</div>' +
          '</div>';
        }).join('') + '</div>' +
        '<div class="order-card__footer">' +
          '<div class="order-card__total"><span>Total:</span><strong>$' + o.total.toLocaleString('en-US') + '</strong></div>' +
          '<div class="order-card__actions">' +
            (o.status === 'shipped' ? '<button class="order-card__btn order-card__btn--track" data-tracking="' + o.id + '"><i data-lucide="map-pin"></i> Rastrear</button>' : '') +
            (o.status === 'delivered' ? '<button class="order-card__btn order-card__btn--review"><i data-lucide="star"></i> Calificar</button>' : '') +
            (o.status === 'pending' ? '<button class="order-card__btn order-card__btn--cancel"><i data-lucide="x-circle"></i> Cancelar</button>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    if (window.lucide) lucide.createIcons();
  }

  var filterBtns = $$('.orders-filter');
  var filterCounts = { all: mockOrders.length, pending: 0, confirmed: 0, shipped: 0, delivered: 0 };
  mockOrders.forEach(function (o) { filterCounts[o.status]++; });

  filterBtns.forEach(function (btn) {
    var count = btn.querySelector('.orders-filter__count');
    var f = btn.dataset.filter;
    if (count && filterCounts[f] !== undefined) count.textContent = filterCounts[f];
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('orders-filter--active'); });
      btn.classList.add('orders-filter--active');
      renderOrders(f);
    });
  });

  renderOrders('all');

  /* ── ADDRESSES ── */
  var addresses = tryGet('techstore_addresses') || [];
  var addrList = el('addressesList');
  var addrEmpty = el('addressesEmpty');
  var addrModalOverlay = el('addressModalOverlay');
  var addrModal = el('addressModal');
  var addrForm = el('addressForm');
  var editingAddrId = null;

  var icons = { Casa: 'home', Trabajo: 'briefcase', Otro: 'map-pin' };

  function saveAddresses() { trySet('techstore_addresses', addresses); }

  function renderAddresses() {
    if (!addrList) return;
    if (addresses.length === 0) {
      addrList.innerHTML = '';
      if (addrEmpty) addrEmpty.style.display = '';
      return;
    }
    if (addrEmpty) addrEmpty.style.display = 'none';
    addrList.innerHTML = addresses.map(function (a) {
      return '<div class="address-card' + (a.isDefault ? ' address-card--primary' : '') + '" data-id="' + a.id + '">' +
        (a.isDefault ? '<span class="address-card__badge">Predeterminada</span>' : '') +
        '<div class="address-card__icon"><i data-lucide="' + (icons[a.label] || 'map-pin') + '"></i></div>' +
        '<h3 class="address-card__title">' + a.label + '</h3>' +
        '<p class="address-card__detail">' + a.name + '<br>' + a.street + '<br>' + a.city + ', ' + a.dept + '</p>' +
        '<p class="address-card__phone"><i data-lucide="phone"></i> ' + a.phone + '</p>' +
        '<div class="address-card__actions">' +
          '<button class="address-card__btn address-card__btn--edit" data-action="edit" data-id="' + a.id + '"><i data-lucide="pencil"></i> Editar</button>' +
          '<button class="address-card__btn address-card__btn--delete" data-action="delete" data-id="' + a.id + '"><i data-lucide="trash-2"></i> Eliminar</button>' +
        '</div>' +
      '</div>';
    }).join('');
    if (window.lucide) lucide.createIcons();
  }

  function openAddrModal(data) {
    editingAddrId = data ? data.id : null;
    el('addressModalTitle').textContent = data ? 'Editar Direccion' : 'Nueva Direccion';
    el('addrLabel').value = data ? data.label : '';
    el('addrName').value = data ? data.name : '';
    el('addrStreet').value = data ? data.street : '';
    el('addrCity').value = data ? data.city : '';
    el('addrDept').value = data ? data.dept : '';
    el('addrPhone').value = data ? data.phone : '';
    el('addrDefault').checked = data ? data.isDefault : addresses.length === 0;
    addrModalOverlay.classList.add('open');
    addrModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeAddrModal() {
    addrModalOverlay.classList.remove('open');
    addrModal.classList.remove('open');
    document.body.style.overflow = '';
    addrForm.reset();
    editingAddrId = null;
  }

  if (el('addAddressBtn')) el('addAddressBtn').addEventListener('click', function () { openAddrModal(null); });
  if (el('addAddressEmpty')) el('addAddressEmpty').addEventListener('click', function () { openAddrModal(null); });
  if (el('closeAddressModal')) el('closeAddressModal').addEventListener('click', closeAddrModal);
  if (el('cancelAddressModal')) el('cancelAddressModal').addEventListener('click', closeAddrModal);
  if (addrModalOverlay) addrModalOverlay.addEventListener('click', closeAddrModal);

  if (addrList) {
    addrList.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var id = parseInt(btn.dataset.id, 10);
      if (btn.dataset.action === 'edit') {
        var addr = addresses.find(function (a) { return a.id === id; });
        if (addr) openAddrModal(addr);
      } else if (btn.dataset.action === 'delete') {
        addresses = addresses.filter(function (a) { return a.id !== id; });
        saveAddresses(); renderAddresses(); toast('Direccion eliminada');
      }
    });
  }

  if (el('saveAddressBtn')) {
    el('saveAddressBtn').addEventListener('click', function () {
      var label = el('addrLabel').value;
      var name = el('addrName').value.trim();
      var street = el('addrStreet').value.trim();
      var city = el('addrCity').value.trim();
      var dept = el('addrDept').value;
      var phone = el('addrPhone').value.trim();
      var isDef = el('addrDefault').checked;
      if (!label || !name || !street || !city || !dept || !phone) { toast('Completa todos los campos'); return; }
      if (isDef) addresses.forEach(function (a) { a.isDefault = false; });
      if (editingAddrId) {
        var addr = addresses.find(function (a) { return a.id === editingAddrId; });
        if (addr) { addr.label = label; addr.name = name; addr.street = street; addr.city = city; addr.dept = dept; addr.phone = phone; addr.isDefault = isDef; }
      } else {
        addresses.push({ id: Date.now(), label: label, name: name, street: street, city: city, dept: dept, phone: phone, isDefault: isDef });
      }
      saveAddresses(); renderAddresses(); closeAddrModal();
      toast(editingAddrId ? 'Direccion actualizada' : 'Direccion agregada');
    });
  }

  renderAddresses();

  /* ── PAYMENTS / CARDS ── */
  var cards = tryGet('techstore_cards') || [];
  var cardsList = el('cardsList');
  var cardsEmpty = el('cardsEmpty');
  var cardModalOverlay = el('cardModalOverlay');
  var cardModal = el('cardModal');
  var cardForm = el('cardForm');
  var editingCardId = null;

  function saveCards() { trySet('techstore_cards', cards); }

  function detectBrand(num) {
    var n = num.replace(/\s/g, '');
    if (/^4/.test(n)) return 'visa';
    if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard';
    if (/^3[47]/.test(n)) return 'amex';
    if (/^6(?:011|5)/.test(n)) return 'discover';
    return '';
  }

  function maskNumber(num) {
    var n = num.replace(/\s/g, '');
    var last4 = n.slice(-4);
    return '•••• •••• •••• ' + last4;
  }

  function brandGradient(brand) {
    var gradients = {
      visa: 'linear-gradient(135deg, #1A1F71, #0D47A1)',
      mastercard: 'linear-gradient(135deg, #EB001B, #F79E1B)',
      amex: 'linear-gradient(135deg, #006FCF, #00A4EF)',
      discover: 'linear-gradient(135deg, #FF6000, #FFB300)'
    };
    return gradients[brand] || 'linear-gradient(135deg, #333, #555)';
  }

  function brandName(brand) {
    return { visa: 'VISA', mastercard: 'MasterCard', amex: 'AMEX', discover: 'Discover' }[brand] || 'Tarjeta';
  }

  function renderCards() {
    if (!cardsList) return;
    if (cards.length === 0) {
      cardsList.innerHTML = '';
      if (cardsEmpty) cardsEmpty.style.display = '';
      return;
    }
    if (cardsEmpty) cardsEmpty.style.display = 'none';
    cardsList.innerHTML = cards.map(function (c) {
      var brand = detectBrand(c.number);
      return '<div class="payment-card' + (c.isDefault ? ' payment-card--primary' : '') + '" data-id="' + c.id + '" style="background:' + brandGradient(brand) + '">' +
        (c.isDefault ? '<span class="payment-card__badge">Predeterminada</span>' : '') +
        '<div class="payment-card__chip"><svg width="36" height="28" viewBox="0 0 36 28" fill="none"><rect width="36" height="28" rx="4" fill="#D4AF37"/><rect x="2" y="2" width="16" height="10" rx="2" fill="#C5A028" opacity="0.6"/><rect x="2" y="14" width="16" height="12" rx="2" fill="#C5A028" opacity="0.4"/><rect x="20" y="2" width="14" height="10" rx="2" fill="#C5A028" opacity="0.4"/><rect x="20" y="14" width="14" height="12" rx="2" fill="#C5A028" opacity="0.3"/></svg></div>' +
        '<div class="payment-card__type">' + brandName(brand) + '</div>' +
        '<div class="payment-card__number">' + maskNumber(c.number) + '</div>' +
        '<div class="payment-card__info">' +
          '<div><span class="payment-card__label">Titular</span><span class="payment-card__value">' + c.name.toUpperCase() + '</span></div>' +
          '<div><span class="payment-card__label">Vence</span><span class="payment-card__value">' + c.expiry + '</span></div>' +
          '<div><span class="payment-card__label">Tipo</span><span class="payment-card__value">' + (c.type === 'credit' ? 'Credito' : 'Debito') + '</span></div>' +
        '</div>' +
        '<div class="payment-card__actions">' +
          '<button class="payment-card__btn" data-action="edit" data-id="' + c.id + '" aria-label="Editar"><i data-lucide="pencil"></i></button>' +
          '<button class="payment-card__btn payment-card__btn--delete" data-action="delete" data-id="' + c.id + '" aria-label="Eliminar"><i data-lucide="trash-2"></i></button>' +
        '</div>' +
      '</div>';
    }).join('');
    if (window.lucide) lucide.createIcons();
  }

  function openCardModal(data) {
    editingCardId = data ? data.id : null;
    el('cardModalTitle').textContent = data ? 'Editar Tarjeta' : 'Nueva Tarjeta';
    el('cardNumber').value = data ? formatCardNumber(data.number.replace(/\s/g, '')) : '';
    el('cardName').value = data ? data.name : '';
    el('cardExpiry').value = data ? data.expiry : '';
    el('cardCvv').value = '';
    el('cardDefault').checked = data ? data.isDefault : cards.length === 0;
    var type = data ? data.type : 'credit';
    var radio = cardForm.querySelector('input[name="cardType"][value="' + type + '"]');
    if (radio) radio.checked = true;
    updatePreview();
    cardModalOverlay.classList.add('open');
    cardModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCardModal() {
    cardModalOverlay.classList.remove('open');
    cardModal.classList.remove('open');
    document.body.style.overflow = '';
    cardForm.reset();
    editingCardId = null;
    var previewNum = el('previewNumber');
    var previewName = el('previewName');
    var previewExpiry = el('previewExpiry');
    if (previewNum) previewNum.textContent = '•••• •••• •••• ••••';
    if (previewName) previewName.textContent = 'NOMBRE DEL TITULAR';
    if (previewExpiry) previewExpiry.textContent = 'MM/AA';
    var brandBadge = el('cardBrandBadge');
    if (brandBadge) brandBadge.innerHTML = '';
  }

  function formatCardNumber(v) {
    var n = v.replace(/\D/g, '').substring(0, 16);
    return n.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  function formatExpiry(v) {
    var n = v.replace(/\D/g, '').substring(0, 4);
    if (n.length >= 2) n = n.substring(0, 2) + '/' + n.substring(2);
    return n;
  }

  function updatePreview() {
    var num = el('cardNumber').value;
    var name = el('cardName').value;
    var exp = el('cardExpiry').value;
    var previewNum = el('previewNumber');
    var previewName = el('previewName');
    var previewExpiry = el('previewExpiry');
    var brandBadge = el('cardBrandBadge');
    var preview = el('cardPreview');

    if (previewNum) previewNum.textContent = num.trim() ? formatCardNumber(num.replace(/\s/g, '')) : '•••• •••• •••• ••••';
    if (previewName) previewName.textContent = name.trim() ? name.toUpperCase() : 'NOMBRE DEL TITULAR';
    if (previewExpiry) previewExpiry.textContent = exp.trim() || 'MM/AA';

    var brand = detectBrand(num);
    if (brandBadge) brandBadge.innerHTML = brand ? '<span style="font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:1px;">' + brandName(brand) + '</span>' : '';
    if (preview) preview.style.background = brandGradient(brand);
  }

  if (el('cardNumber')) {
    el('cardNumber').addEventListener('input', function () {
      el('cardNumber').value = formatCardNumber(el('cardNumber').value);
      updatePreview();
    });
  }
  if (el('cardName')) {
    el('cardName').addEventListener('input', updatePreview);
  }
  if (el('cardExpiry')) {
    el('cardExpiry').addEventListener('input', function () {
      el('cardExpiry').value = formatExpiry(el('cardExpiry').value);
      updatePreview();
    });
  }

  if (el('toggleCvv')) {
    el('toggleCvv').addEventListener('click', function () {
      var inp = el('cardCvv');
      if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  }

  if (el('addCardBtn')) el('addCardBtn').addEventListener('click', function () { openCardModal(null); });
  if (el('addCardEmpty')) el('addCardEmpty').addEventListener('click', function () { openCardModal(null); });
  if (el('closeCardModal')) el('closeCardModal').addEventListener('click', closeCardModal);
  if (el('cancelCardModal')) el('cancelCardModal').addEventListener('click', closeCardModal);
  if (cardModalOverlay) cardModalOverlay.addEventListener('click', closeCardModal);

  if (cardsList) {
    cardsList.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var id = parseInt(btn.dataset.id, 10);
      if (btn.dataset.action === 'edit') {
        var card = cards.find(function (c) { return c.id === id; });
        if (card) openCardModal(card);
      } else if (btn.dataset.action === 'delete') {
        cards = cards.filter(function (c) { return c.id !== id; });
        saveCards(); renderCards(); toast('Tarjeta eliminada');
      }
    });
  }

  if (el('saveCardBtn')) {
    el('saveCardBtn').addEventListener('click', function () {
      var number = el('cardNumber').value.replace(/\s/g, '');
      var name = el('cardName').value.trim();
      var expiry = el('cardExpiry').value.trim();
      var cvv = el('cardCvv').value.trim();
      var type = cardForm.querySelector('input[name="cardType"]:checked');
      var isDef = el('cardDefault').checked;

      if (number.length < 13) { toast('Numero de tarjeta invalido'); return; }
      if (!name) { toast('Ingresa el nombre del titular'); return; }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) { toast('Formato de vencimiento invalido (MM/AA)'); return; }
      var parts = expiry.split('/');
      var month = parseInt(parts[0], 10);
      if (month < 1 || month > 12) { toast('Mes invalido'); return; }
      if (cvv.length < 3) { toast('CVV invalido'); return; }

      var brand = detectBrand(number);
      if (isDef) cards.forEach(function (c) { c.isDefault = false; });

      var cardData = {
        id: editingCardId || Date.now(),
        number: number,
        name: name,
        expiry: expiry,
        cvv: cvv,
        type: type ? type.value : 'credit',
        brand: brand,
        isDefault: isDef
      };

      if (editingCardId) {
        var idx = cards.findIndex(function (c) { return c.id === editingCardId; });
        if (idx !== -1) cards[idx] = cardData;
      } else {
        cards.push(cardData);
      }

      saveCards(); renderCards(); closeCardModal();
      toast(editingCardId ? 'Tarjeta actualizada' : 'Tarjeta guardada');
    });
  }

  renderCards();

  /* ── SETTINGS ── */
  var settings = tryGet('techstore_settings') || {
    emailNotifications: true,
    priceAlerts: false,
    newsletter: false,
    darkMode: true,
    publicProfile: false,
    showPurchases: true
  };

  var toggleMap = {
    setEmail: 'emailNotifications',
    setPriceAlert: 'priceAlerts',
    setNewsletter: 'newsletter',
    setDarkMode: 'darkMode',
    setPublicProfile: 'publicProfile',
    setShowPurchases: 'showPurchases'
  };

  Object.keys(toggleMap).forEach(function (id) {
    var inp = el(id);
    if (!inp) return;
    inp.checked = !!settings[toggleMap[id]];
    inp.addEventListener('change', function () {
      settings[toggleMap[id]] = inp.checked;
      trySet('techstore_settings', settings);
    });
  });

  /* ── DELETE ACCOUNT ── */
  var deleteOverlay = el('deleteModalOverlay');
  var deleteModal = el('deleteModal');
  var deleteConfirm = el('deleteConfirm');
  var confirmDeleteBtn = el('confirmDeleteBtn');

  function openDeleteModal() {
    deleteOverlay.classList.add('open');
    deleteModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (deleteConfirm) deleteConfirm.value = '';
    if (confirmDeleteBtn) confirmDeleteBtn.disabled = true;
  }

  function closeDeleteModal() {
    deleteOverlay.classList.remove('open');
    deleteModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (el('deleteAccountBtn')) el('deleteAccountBtn').addEventListener('click', openDeleteModal);
  if (el('closeDeleteModal')) el('closeDeleteModal').addEventListener('click', closeDeleteModal);
  if (el('cancelDeleteModal')) el('cancelDeleteModal').addEventListener('click', closeDeleteModal);
  if (deleteOverlay) deleteOverlay.addEventListener('click', closeDeleteModal);

  if (deleteConfirm) {
    deleteConfirm.addEventListener('input', function () {
      if (confirmDeleteBtn) confirmDeleteBtn.disabled = deleteConfirm.value !== 'ELIMINAR';
    });
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      try {
        localStorage.removeItem('techstore_session');
        localStorage.removeItem('techstore_cart');
        localStorage.removeItem('techstore_favorites');
        localStorage.removeItem('techstore_addresses');
        localStorage.removeItem('techstore_cards');
        localStorage.removeItem('techstore_settings');
      } catch (e) {}
      toast('Cuenta eliminada');
      setTimeout(function () { window.location.href = 'cuenta.html'; }, 1000);
    });
  }

  /* ── LOGOUT ── */
  if (el('sidebarLogout')) {
    el('sidebarLogout').addEventListener('click', function () {
      try { localStorage.removeItem('techstore_session'); } catch (e) {}
      window.location.href = 'cuenta.html';
    });
  }

  loadProfile();
})();
