(function () {
    'use strict';

    /* =====================================================
       DATA — Productos y categorias
       ===================================================== */
    var CATEGORIES = [
        { key: 'laptops',     name: 'Laptops',     desc: 'Potencia y movilidad para trabajo y creacion', icon: 'laptop' },
        { key: 'smartphones', name: 'Smartphones', desc: 'Ultimos lanzamientos con conectividad 5G',     icon: 'smartphone' },
        { key: 'accesorios',  name: 'Accesorios',  desc: 'Complementa tu setup con calidad premium',     icon: 'headphones' },
        { key: 'gaming',      name: 'Gaming',      desc: 'Equipo gamer de alto rendimiento',             icon: 'gamepad-2' }
    ];

    var PRODUCTS = [
        { id: 1,  name: 'NovaBook Air 13',         cat: 'laptops',     price: 899,  old: null,  specs: '8GB RAM · 256GB SSD · Intel i5',        icon: 'laptop',          img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop', rating: 4.5, reviews: 128, badge: null },
        { id: 2,  name: 'NovaBook Pro 14',         cat: 'laptops',     price: 1299, old: 1499, specs: '16GB RAM · 512GB SSD · Intel i7',       icon: 'laptop',          img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop', rating: 4.8, reviews: 342, badge: 'Mas vendido' },
        { id: 3,  name: 'NovaBook Ultra X',        cat: 'laptops',     price: 1899, old: null,  specs: '32GB RAM · 1TB SSD · RTX 4060',         icon: 'laptop',          img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop', rating: 4.7, reviews: 87,  badge: null },
        { id: 4,  name: 'Zenith X12',              cat: 'smartphones', price: 799,  old: null,  specs: '128GB · Camara 50MP · 5G',              icon: 'smartphone',      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop', rating: 4.6, reviews: 210, badge: null },
        { id: 5,  name: 'Zenith X12 Mini',         cat: 'smartphones', price: 649,  old: 749,  specs: '128GB · Camara 48MP · Compacto',        icon: 'smartphone',      img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop', rating: 4.4, reviews: 156, badge: null },
        { id: 6,  name: 'Pulse Edge 5G',           cat: 'smartphones', price: 549,  old: null,  specs: '256GB · Camara 108MP · 5G',             icon: 'smartphone',      img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=400&fit=crop', rating: 4.3, reviews: 64,  badge: 'Nuevo' },
        { id: 7,  name: 'AuroraBuds Pro',          cat: 'accesorios',  price: 149,  old: 199,  specs: 'Cancelacion de ruido · 30h bateria',    icon: 'headphones',      img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop', rating: 4.7, reviews: 289, badge: null },
        { id: 8,  name: 'VoltCharge 65W GaN',      cat: 'accesorios',  price: 39,   old: null,  specs: 'Carga rapida · USB-C · GaN',            icon: 'plug-zap',        img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop', rating: 4.5, reviews: 412, badge: null },
        { id: 9,  name: 'HyperKey Mechanical RGB', cat: 'accesorios',  price: 89,   old: null,  specs: 'Switches mecanicos · RGB · Anti-ghost',  icon: 'keyboard',        img: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=400&fit=crop', rating: 4.6, reviews: 133, badge: null },
        { id: 10, name: 'NexMouse Wireless Pro',   cat: 'accesorios',  price: 49,   old: 69,   specs: 'Inalambrico · 16000 DPI · RGB',         icon: 'mouse',           img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop', rating: 4.4, reviews: 178, badge: null },
        { id: 11, name: 'ArcadeX Controller Pro',  cat: 'gaming',      price: 69,   old: null,  specs: 'Inalambrico · Vibracion dual · USB-C',  icon: 'gamepad-2',       img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&h=400&fit=crop', rating: 4.8, reviews: 95,  badge: null },
        { id: 12, name: 'PixelView 27" 165Hz',     cat: 'gaming',      price: 329,  old: 399,  specs: '165Hz · 1ms · IPS QHD',                 icon: 'monitor',         img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop', rating: 4.9, reviews: 267, badge: 'Top ventas' },
        { id: 13, name: 'QuantumConsole One',      cat: 'gaming',      price: 499,  old: null,  specs: '4K · 1TB SSD · Ray Tracing',            icon: 'monitor',         img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop', rating: 4.7, reviews: 121, badge: null }
    ];

    /* =====================================================
       STATE
       ===================================================== */
    var state = {
        cart: (function () {
            try { return JSON.parse(localStorage.getItem('techstore_cart') || '[]'); }
            catch (e) { return []; }
        })(),
        activeCategory: 'todos'
    };

    function saveCart() {
        try { localStorage.setItem('techstore_cart', JSON.stringify(state.cart)); }
        catch (e) { /* quota exceeded — silent */ }
    }

    /* =====================================================
       UTILS
       ===================================================== */
    function esc(str) {
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(str));
        return d.innerHTML;
    }
    function money(n) { return '$' + n.toLocaleString('en-US'); }
    function findProduct(id) { return PRODUCTS.find(function (p) { return p.id === id; }); }
    function calcDiscount(price, old) { return old ? Math.round((1 - price / old) * 100) : 0; }

    function stars(rating) {
        var full = Math.floor(rating);
        var half = rating % 1 >= 0.5 ? 1 : 0;
        var s = '';
        for (var i = 0; i < full; i++) s += '<i data-lucide="star" class="star-icon star-icon--fill"></i>';
        if (half) s += '<i data-lucide="star-half" class="star-icon star-icon--fill"></i>';
        for (var j = full + half; j < 5; j++) s += '<i data-lucide="star" class="star-icon"></i>';
        return s;
    }

    /* =====================================================
       TOAST
       ===================================================== */
    function showToast(typeOrMsg, title, message) {
        if (window.showToast && window.showToast !== showToast) {
            window.showToast(typeOrMsg, title, message);
            return;
        }
        var type = title ? typeOrMsg : 'success';
        var msg = title || typeOrMsg;
        var container = document.getElementById('toastContainer');
        if (!container) return;
        var iconMap = { success: 'circle-check', error: 'circle-x', info: 'info', warning: 'alert-triangle' };
        var toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.innerHTML = '<i data-lucide="' + (iconMap[type] || 'circle-check') + '" class="toast__icon"></i>' +
            '<div class="toast__content"><div class="toast__title">' + esc(msg) + '</div>' +
            (message ? '<div class="toast__message">' + esc(message) + '</div>' : '') + '</div>' +
            '<button class="toast__close" aria-label="Cerrar"><i data-lucide="x"></i></button>';
        container.appendChild(toast);
        if (window.lucide) lucide.createIcons();
        toast.querySelector('.toast__close').addEventListener('click', function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        });
        setTimeout(function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 3000);
    }

    /* =====================================================
       RENDER — Categorias (Bento for landing)
       ===================================================== */
    function renderCategories() {
        var bento = document.getElementById('featuredBento');
        if (!bento) return;
        var icons = { laptops: 'laptop', smartphones: 'smartphone', accesorios: 'headphones', gaming: 'gamepad-2' };
        var colors = { laptops: '#6C5CE7', smartphones: '#00CEC9', accesorios: '#FD79A8', gaming: '#FDCB6E' };
        bento.innerHTML = CATEGORIES.map(function (c, i) {
            return '<div class="bento-card' + (i === 0 ? ' bento-featured' : '') + '" data-category="' + c.key + '">' +
                '<div class="bento-card__bg"></div>' +
                '<div class="bento-card__content">' +
                    '<div class="bento-card__arrow"><i data-lucide="arrow-right"></i></div>' +
                    '<div class="bento-card__icon" style="background:' + colors[c.key] + '15;border-color:' + colors[c.key] + '40;color:' + colors[c.key] + '"><i data-lucide="' + icons[c.key] + '"></i></div>' +
                    '<div class="bento-card__label">' + c.name + '</div>' +
                    '<h3>' + c.name + '</h3>' +
                    '<p>' + c.desc + '</p>' +
                '</div>' +
            '</div>';
        }).join('');
        if (window.lucide) lucide.createIcons();
        bento.querySelectorAll('.bento-card').forEach(function (card) {
            card.addEventListener('click', function () {
                window.location.href = 'tienda.html?cat=' + card.dataset.category;
            });
        });
    }

    function renderFilterBar() {
        var bar = document.getElementById('filterBar');
        if (!bar) return;
        var filters = [{ key: 'todos', name: 'Todos' }].concat(CATEGORIES.map(function (c) {
            return { key: c.key, name: c.name };
        }));
        bar.innerHTML = filters.map(function (f) {
            return '<button class="filter-btn' + (f.key === state.activeCategory ? ' filter-btn--active' : '') +
                '" data-category="' + f.key + '">' + f.name + '</button>';
        }).join('');
        bar.querySelectorAll('.filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () { setActiveCategory(btn.dataset.category); });
        });
    }

    function setActiveCategory(cat) {
        state.activeCategory = cat;
        renderFilterBar();
        renderProducts();
    }

    /* =====================================================
       RENDER — Productos
       ===================================================== */
    function productCardHTML(p) {
        var discount = calcDiscount(p.price, p.old);
        var badgeHTML = '';
        if (discount) {
            badgeHTML = '<span class="product-card__discount">-' + discount + '%</span>';
        } else if (p.badge) {
            badgeHTML = '<span class="product-card__badge">' + p.badge + '</span>';
        }

        var mediaContent = p.img ?
            '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md)">' :
            '<i data-lucide="' + p.icon + '"></i>';

        return '<article class="product-card" data-id="' + p.id + '" data-cat="' + p.cat + '" style="cursor:pointer">' +
            badgeHTML +
            '<div class="product-card__media" data-cat="' + p.cat + '">' + mediaContent + '</div>' +
            '<div class="product-card__cat">' + p.cat + '</div>' +
            '<h3>' + p.name + '</h3>' +
            '<p class="product-card__specs">' + p.specs + '</p>' +
            '<div class="product-card__rating">' +
                '<div class="product-card__stars">' + stars(p.rating) + '</div>' +
                '<span>(' + p.reviews + ')</span>' +
            '</div>' +
            '<div class="product-card__footer">' +
                '<div class="product-card__price">' +
                    (p.old ? '<span class="product-card__price-old">' + money(p.old) + '</span>' : '') +
                    '<span class="product-card__price-current">' + money(p.price) + '</span>' +
                '</div>' +
                '<button class="product-card__add" data-id="' + p.id + '" aria-label="Agregar ' + p.name + ' al carrito">' +
                    '<i data-lucide="plus"></i>' +
                '</button>' +
            '</div>' +
        '</article>';
    }

    function renderProducts() {
        var grid = document.getElementById('productsGrid');
        if (!grid) return;
        var list = state.activeCategory === 'todos'
            ? PRODUCTS
            : PRODUCTS.filter(function (p) { return p.cat === state.activeCategory; });
        grid.innerHTML = list.map(productCardHTML).join('');
        bindAddButtons(grid);
        bindCardNavigation(grid);
        if (window.lucide) lucide.createIcons();
    }

    function renderFeaturedProducts() {
        var grid = document.getElementById('featuredProducts');
        if (!grid) return;
        var featured = PRODUCTS.filter(function (p) { return p.badge || p.old; }).slice(0, 4);
        if (featured.length < 4) featured = PRODUCTS.slice(0, 4);
        grid.innerHTML = featured.map(productCardHTML).join('');
        bindAddButtons(grid);
        bindCardNavigation(grid);
        if (window.lucide) lucide.createIcons();
    }

    function renderOffers() {
        var grid = document.getElementById('offersGrid');
        if (!grid) return;
        var list = PRODUCTS.filter(function (p) { return p.old; });
        grid.innerHTML = list.map(productCardHTML).join('');
        bindAddButtons(grid);
        bindCardNavigation(grid);
        if (window.lucide) lucide.createIcons();
    }

    function bindAddButtons(scope) {
        scope.querySelectorAll('.product-card__add').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                addToCart(parseInt(btn.dataset.id, 10));
                btn.classList.remove('bumped');
                void btn.offsetWidth;
                btn.classList.add('bumped');
            });
        });
    }

    function bindCardNavigation(scope) {
        scope.querySelectorAll('.product-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var id = card.dataset.id;
                if (id) window.location.href = 'producto.html?id=' + id;
            });
        });
    }

    /* =====================================================
       CART — Logica
       ===================================================== */
    function addToCart(id, qty) {
        id = parseInt(id, 10);
        if (isNaN(id)) return;
        qty = parseInt(qty, 10) || 1;
        var item = state.cart.find(function (c) { return c.id === id; });
        if (item) { item.qty += qty; } else { state.cart.push({ id: id, qty: qty }); }
        saveCart();
        renderCart();
        var p = findProduct(id);
        if (p) showToast(p.name + ' agregado al carrito');
    }

    function removeFromCart(id) {
        state.cart = state.cart.filter(function (c) { return c.id !== id; });
        saveCart();
        renderCart();
    }

    function updateQty(id, qty) {
        if (qty < 1) { removeFromCart(id); return; }
        var item = state.cart.find(function (c) { return c.id === id; });
        if (item) { item.qty = qty; }
        saveCart();
        renderCart();
    }

    function cartTotal() {
        return state.cart.reduce(function (sum, c) {
            var p = findProduct(c.id);
            return sum + (p ? p.price * c.qty : 0);
        }, 0);
    }

    function renderCart() {
        var container = document.getElementById('cartItems');
        var countEl = document.getElementById('cartCount');
        var totalEl = document.getElementById('cartTotal');
        var checkoutBtnEl = document.getElementById('checkoutBtn');
        if (!container) return;
        var totalQty = state.cart.reduce(function (s, c) { return s + c.qty; }, 0);

        if (countEl) {
            countEl.textContent = totalQty;
            countEl.style.display = totalQty === 0 ? 'none' : 'flex';
        }
        if (totalEl) totalEl.textContent = money(cartTotal());
        if (checkoutBtnEl) checkoutBtnEl.disabled = state.cart.length === 0;

        if (state.cart.length === 0) {
            container.innerHTML = '<div class="cart-empty">' +
                '<i data-lucide="shopping-cart"></i>' +
                '<p>Tu carrito esta vacio.<br>Explora el catalogo y agrega tus productos favoritos.</p>' +
            '</div>';
            if (window.lucide) lucide.createIcons();
            return;
        }

        container.innerHTML = state.cart.map(function (c) {
            var p = findProduct(c.id);
            if (!p) return '';
            return '<div class="cart-item" data-id="' + p.id + '">' +
                '<div class="cart-item__media"><i data-lucide="' + p.icon + '"></i></div>' +
                '<div class="cart-item__info">' +
                    '<h4>' + p.name + '</h4>' +
                    '<div class="cart-item__price">' + money(p.price) + '</div>' +
                    '<div class="cart-item__qty">' +
                        '<button class="qty-minus" aria-label="Disminuir">-</button>' +
                        '<span>' + c.qty + '</span>' +
                        '<button class="qty-plus" aria-label="Aumentar">+</button>' +
                    '</div>' +
                '</div>' +
                '<button class="cart-item__remove" aria-label="Eliminar ' + p.name + '"><i data-lucide="trash-2"></i></button>' +
            '</div>';
        }).join('');
        if (window.lucide) lucide.createIcons();

        container.querySelectorAll('.cart-item').forEach(function (row) {
            var id = parseInt(row.dataset.id, 10);
            row.querySelector('.qty-minus').addEventListener('click', function () {
                var item = state.cart.find(function (c) { return c.id === id; });
                if (item) updateQty(id, item.qty - 1);
            });
            row.querySelector('.qty-plus').addEventListener('click', function () {
                var item = state.cart.find(function (c) { return c.id === id; });
                if (item) updateQty(id, item.qty + 1);
            });
            row.querySelector('.cart-item__remove').addEventListener('click', function () { removeFromCart(id); });
        });
    }

    /* =====================================================
       CART — Drawer
       ===================================================== */
    function openCart(open) {
        var drawer = document.getElementById('cartDrawer');
        var overlay = document.getElementById('cartOverlay');
        if (drawer) { drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); }
        if (overlay) overlay.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    /* =====================================================
       CHECKOUT
       ===================================================== */
    function checkout() {
        if (state.cart.length === 0) return;
        openCart(false);
        window.location.href = 'checkout.html';
    }

    /* Prevent double-binding on checkout page */
    function isCheckoutPage() {
        return !!document.getElementById('checkoutGrid');
    }

    /* =====================================================
       COUNTDOWN
       ===================================================== */
    function startCountdown() {
        var total = 6 * 3600 - 1;
        var h = document.getElementById('cd-h');
        var m = document.getElementById('cd-m');
        var s = document.getElementById('cd-s');
        if (!h || !m || !s) return;
        function tick() {
            if (total <= 0) total = 6 * 3600 - 1;
            var hh = Math.floor(total / 3600);
            var mm = Math.floor((total % 3600) / 60);
            var ss = total % 60;
            h.textContent = String(hh).padStart(2, '0');
            m.textContent = String(mm).padStart(2, '0');
            s.textContent = String(ss).padStart(2, '0');
            total--;
        }
        tick();
        setInterval(tick, 1000);
    }

    /* =====================================================
       CONTACT FORM
       ===================================================== */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;
            var name = document.getElementById('cf-name');
            var email = document.getElementById('cf-email');
            var message = document.getElementById('cf-message');
            var errName = document.getElementById('err-name');
            var errEmail = document.getElementById('err-email');
            var errMessage = document.getElementById('err-message');
            var formSuccess = document.getElementById('formSuccess');

            if (errName) errName.textContent = '';
            if (errEmail) errEmail.textContent = '';
            if (errMessage) errMessage.textContent = '';

            if (name && !name.value.trim()) { if (errName) errName.textContent = 'Ingresa tu nombre.'; valid = false; }
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { if (errEmail) errEmail.textContent = 'Ingresa un correo valido.'; valid = false; }
            if (message && !message.value.trim()) { if (errMessage) errMessage.textContent = 'Escribe tu mensaje.'; valid = false; }

            if (!valid) return;

            if (formSuccess) formSuccess.classList.add('show');
            form.reset();
            setTimeout(function () { if (formSuccess) formSuccess.classList.remove('show'); }, 4000);
        });
    }

    /* =====================================================
       MOBILE NAV
       ===================================================== */
    function initMobileNav() {
        var menuBtn = document.getElementById('menuBtn');
        var mobileNav = document.getElementById('mobileNav');
        var overlay = document.getElementById('mobileNavOverlay');
        var closeBtn = document.getElementById('mobileNavClose');
        if (!menuBtn || !mobileNav) return;

        function open() {
            mobileNav.classList.add('active');
            menuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function close() {
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', function () {
            mobileNav.classList.contains('active') ? close() : open();
        });
        if (overlay) overlay.addEventListener('click', close);
        if (closeBtn) closeBtn.addEventListener('click', close);

        mobileNav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', close);
        });
    }

    /* =====================================================
       HEADER SCROLL
       ===================================================== */
    function initHeaderScroll() {
        var header = document.getElementById('header');
        if (!header) return;
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    header.classList.toggle('scrolled', window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* =====================================================
       SEARCH
       ===================================================== */
    function initSearch() {
        var input = document.getElementById('searchInput');
        if (!input) return;
        function doSearch() {
            var raw = input.value.trim();
            var q = raw.toLowerCase();
            if (!q) return;
            if (!document.getElementById('productsGrid')) {
                window.location.href = 'tienda.html?q=' + encodeURIComponent(raw);
                return;
            }
            state.activeCategory = 'todos';
            renderFilterBar();
            var grid = document.getElementById('productsGrid');
            var list = PRODUCTS.filter(function (p) {
                return p.name.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q) || p.cat.includes(q);
            });
            grid.innerHTML = list.length ? list.map(productCardHTML).join('') : '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px 0;">No se encontraron productos para "' + esc(raw) + '"</p>';
            bindAddButtons(grid);
            bindCardNavigation(grid);
            if (window.lucide) lucide.createIcons();
            grid.scrollIntoView({ behavior: 'smooth' });
        }
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSearch(); });
        var searchBtn = input.parentElement.querySelector('.header__search-btn');
        if (searchBtn) searchBtn.addEventListener('click', doSearch);
    }

    /* =====================================================
       SCROLL REVEAL
       ===================================================== */
    function initReveal() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;
        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('visible'); });
            return;
        }
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
        els.forEach(function (el) { obs.observe(el); });
    }

    /* =====================================================
       INIT
       ===================================================== */
    function init() {
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        if (document.getElementById('featuredBento')) renderCategories();
        if (document.getElementById('filterBar')) renderFilterBar();
        if (document.getElementById('productsGrid')) renderProducts();
        if (document.getElementById('featuredProducts')) renderFeaturedProducts();
        if (document.getElementById('offersGrid')) renderOffers();
        renderCart();
        if (document.getElementById('countdown')) startCountdown();
        if (document.getElementById('contactForm')) initContactForm();
        initMobileNav();
        initHeaderScroll();
        if (document.getElementById('searchInput')) initSearch();
        initReveal();

        var searchToggle = document.getElementById('searchToggle');
        var searchBox = document.querySelector('.header__search');
        if (searchToggle && searchBox) {
            searchToggle.addEventListener('click', function () {
                searchBox.classList.toggle('open');
                if (searchBox.classList.contains('open')) {
                    var input = searchBox.querySelector('input');
                    if (input) input.focus();
                }
            });
            document.addEventListener('click', function (e) {
                if (!searchBox.contains(e.target) && e.target !== searchToggle && !searchToggle.contains(e.target)) {
                    searchBox.classList.remove('open');
                }
            });
        }

        var cartBtn = document.getElementById('cartBtn');
        var cartClose = document.getElementById('cartClose');
        var cartOverlay = document.getElementById('cartOverlay');
        var checkoutBtnEl = document.getElementById('checkoutBtn');
        var orderModalClose = document.getElementById('orderModalClose');

        if (cartBtn) cartBtn.addEventListener('click', function () { openCart(true); });
        if (cartClose) cartClose.addEventListener('click', function () { openCart(false); });
        if (cartOverlay) cartOverlay.addEventListener('click', function () { openCart(false); });
        if (checkoutBtnEl && !isCheckoutPage()) checkoutBtnEl.addEventListener('click', checkout);
        if (orderModalClose) orderModalClose.addEventListener('click', function () {
            var om = document.getElementById('orderModal');
            if (om) om.classList.remove('open');
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                openCart(false);
                var om = document.getElementById('orderModal');
                if (om) om.classList.remove('open');
            }
        });

        var params = new URLSearchParams(window.location.search);
        var catParam = params.get('cat');
        if (catParam && document.getElementById('filterBar')) {
            setActiveCategory(catParam);
        }
        var qParam = params.get('q');
        if (qParam && document.getElementById('productsGrid')) {
            var si = document.getElementById('searchInput');
            if (si) si.value = qParam;
            state.activeCategory = 'todos';
            renderFilterBar();
            var qGrid = document.getElementById('productsGrid');
            var ql = qParam.toLowerCase();
            var qList = PRODUCTS.filter(function (p) {
                return p.name.toLowerCase().includes(ql) || p.specs.toLowerCase().includes(ql) || p.cat.includes(ql);
            });
            qGrid.innerHTML = qList.length ? qList.map(productCardHTML).join('') : '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px 0;">No se encontraron productos para "' + esc(qParam) + '"</p>';
            bindAddButtons(qGrid);
            bindCardNavigation(qGrid);
            if (window.lucide) lucide.createIcons();
        }
    }

    /* =====================================================
       EXPORT — For product detail page
       ===================================================== */
    window.TechStore = {
        PRODUCTS: PRODUCTS,
        CATEGORIES: CATEGORIES,
        money: money,
        stars: stars,
        addToCart: addToCart,
        saveCart: saveCart,
        getCart: function () { return state.cart.map(function(c) { return {id: c.id, qty: c.qty}; }); }
    };

    document.addEventListener('DOMContentLoaded', init);
})();
