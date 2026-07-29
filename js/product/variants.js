/*
  variants.js — Selector de variantes, cantidad y add-to-cart
  Dependencias: window.showToast (definido en main.js)
  Uso: funciona con #colorOptions, #storageOptions, #qtyValue, #addToCartBtn, etc.

  Comportamiento:
    - Color buttons: marca el seleccionado, actualiza label
    - Storage buttons: igual, actualiza label
    - Cantidad: botones +/- con límite 1-99
    - Wishlist: toggle activo con notificación
    - Add to cart: muestra toast y actualiza contador del header
*/

(function () {
  'use strict';

  var showToast = window.showToast || function () {};
  var cartCount = document.getElementById('cartCount');

  // ── SELECTOR DE COLOR ─────────────────────────
  var colorOptions = document.getElementById('colorOptions');
  var selectedColor = document.getElementById('selectedColor');

  if (colorOptions && selectedColor) {
    colorOptions.addEventListener('click', function (e) {
      var btn = e.target.closest('.variant-btn');
      if (!btn) return;

      // Desmarcar todos, marcar el clickeado
      colorOptions.querySelectorAll('.variant-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Actualizar label con el data-label del botón
      selectedColor.textContent = btn.getAttribute('data-label');
    });
  }

  // ── SELECTOR DE ALMACENAMIENTO ────────────────
  var storageOptions = document.getElementById('storageOptions');
  var selectedStorage = document.getElementById('selectedStorage');

  if (storageOptions && selectedStorage) {
    storageOptions.addEventListener('click', function (e) {
      var btn = e.target.closest('.variant-btn');
      if (!btn) return;

      storageOptions.querySelectorAll('.variant-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      selectedStorage.textContent = btn.getAttribute('data-label');
    });
  }

  // ── SELECTOR DE CANTIDAD ──────────────────────
  var qtyMinus = document.getElementById('qtyMinus');
  var qtyPlus = document.getElementById('qtyPlus');
  var qtyValue = document.getElementById('qtyValue');

  if (qtyMinus && qtyPlus && qtyValue) {
    qtyMinus.addEventListener('click', function () {
      var val = parseInt(qtyValue.value, 10);
      if (isNaN(val)) val = 1;
      if (val > 1) qtyValue.value = val - 1;
    });

    qtyPlus.addEventListener('click', function () {
      var val = parseInt(qtyValue.value, 10);
      if (isNaN(val)) val = 1;
      if (val < 99) qtyValue.value = val + 1;
    });
  }

  // ── WISHLIST TOGGLE ───────────────────────────
  var wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function () {
      wishlistBtn.classList.toggle('active');

      if (wishlistBtn.classList.contains('active')) {
        showToast('success', 'Guardado', 'Producto agregado a favoritos');
      } else {
        showToast('info', 'Eliminado', 'Producto removido de favoritos');
      }
    });
  }

  // ── ADD TO CART ───────────────────────────────
  var addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      var store = window.TechStore;
      if (!store || !store.addToCart) {
        showToast('error', 'Error', 'Sistema del carrito no disponible');
        return;
      }

      // Get product ID from URL
      var params = new URLSearchParams(window.location.search);
      var productId = params.get('id');
      if (!productId) {
        showToast('error', 'Error', 'No se pudo identificar el producto');
        return;
      }

      // Get quantity
      var qty = qtyValue ? parseInt(qtyValue.value, 10) : 1;
      if (isNaN(qty) || qty < 1) qty = 1;

      store.addToCart(parseInt(productId, 10), qty);

      // Bounce animation on cart count
      var cartCountEl = document.getElementById('cartCount');
      if (cartCountEl) {
        cartCountEl.classList.remove('cart-bounce');
        cartCountEl.offsetHeight;
        cartCountEl.classList.add('cart-bounce');
      }
    });
  }

})();
