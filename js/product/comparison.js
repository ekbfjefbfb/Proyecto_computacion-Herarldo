/*
  comparison.js — Barra flotante y modal de comparación
  Dependencias: window.showToast (definido en main.js)
  Uso: funciona con .related-card con data-compare-* + .compare-bar + .compare-modal

  Comportamiento:
    - Cada tarjeta relacionada tiene botón de comparar (balanza)
    - Al hacer clic: se agrega/quita de la lista de comparación
    - Si hay >= 2 productos, aparece la barra inferior
    - Click en "Comparar": abre modal con tabla comparativa
    - Máximo 4 productos simultáneos
    - Se puede remover individualmente desde la barra
*/

(function () {
  'use strict';

  var showToast = window.showToast || function () {};

  function esc(s) { var d = document.createElement('div'); d.appendChild(document.createTextNode(s)); return d.innerHTML; }

  var compareBtns = document.querySelectorAll('.related-card__compare-btn');
  var compareBar = document.getElementById('compareBar');
  var compareItems = document.getElementById('compareItems');
  var compareActionBtn = document.getElementById('compareActionBtn');
  var compareModal = document.getElementById('compareModal');
  var compareModalOverlay = document.getElementById('compareModalOverlay');
  var compareModalClose = document.getElementById('compareModalClose');
  var compareModalBody = document.getElementById('compareModalBody');

  // Array de productos seleccionados para comparar
  // Cada item: { id, name, price, img, element (card) }
  var selected = [];

  // Si no hay botones de comparar en la página, salir
  if (!compareBtns.length) return;

  // ── AGREGAR / QUITAR DE COMPARACIÓN ────────────
  compareBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.related-card');

      // Obtener datos desde data-attributes de la card
      var id = card.getAttribute('data-compare-id');
      var name = card.getAttribute('data-compare-name');
      var price = card.getAttribute('data-compare-price');
      var img = card.getAttribute('data-compare-img');

      // Verificar si ya está seleccionado
      var existingIndex = selected.findIndex(function (item) {
        return item.id === id;
      });

      if (existingIndex >= 0) {
        // Ya está seleccionado → quitarlo
        selected.splice(existingIndex, 1);
        btn.classList.remove('active');
        btn.querySelector('i') && btn.querySelector('i').setAttribute('data-lucide', 'scale');
        renderCompareBar();
        return;
      }

      // Límite de 4 productos
      if (selected.length >= 4) {
        showToast('warning', 'Limite alcanzado',
          'Maximo 4 productos para comparar');
        return;
      }

      // Agregar a la lista
      selected.push({
        id: id,
        name: name,
        price: price,
        img: img,
        element: card,
      });

      btn.classList.add('active');
      btn.querySelector('i') && btn.querySelector('i').setAttribute('data-lucide', 'check');
      renderCompareBar();
      showToast('info', 'Agregado', name + ' agregado a comparacion');
    });
  });

  // ── RENDERIZAR BARRA DE COMPARACIÓN ────────────
  function renderCompareBar() {
    if (!compareBar || !compareItems) return;

    if (selected.length === 0) {
      compareBar.classList.remove('visible');
      if (compareActionBtn) compareActionBtn.disabled = true;
      return;
    }

    // Mostrar la barra
    compareBar.classList.add('visible');
    if (compareActionBtn) compareActionBtn.disabled = selected.length < 2;

    // Renderizar items
    compareItems.innerHTML = '';
    selected.forEach(function (item) {
      var el = document.createElement('div');
      el.className = 'compare-bar__item';

      // Mapa de iconos según tipo de producto
      var iconMap = {
        'laptop': 'laptop',
        'tablet': 'tablet',
        'desktop': 'monitor',
        'laptop-large': 'laptop',
      };
      var icon = iconMap[item.img] || 'package';

      el.innerHTML =
        '<div class="compare-bar__item-img"><i data-lucide="' + icon + '"></i></div>' +
        '<span class="compare-bar__item-name">' + esc(item.name) + '</span>' +
        '<button class="compare-bar__item-remove" data-id="' + item.id + '" aria-label="Quitar de comparacion">' +
          '<i data-lucide="x"></i>' +
        '</button>';

      compareItems.appendChild(el);
    });

    // Event listeners para botones de remover
    compareItems.querySelectorAll('.compare-bar__item-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        removeFromCompare(id);
      });
    });
  }

  // ── REMOVER DE COMPARACIÓN ─────────────────────
  function removeFromCompare(id) {
    var index = selected.findIndex(function (item) { return item.id === id; });
    if (index < 0) return;

    // Quitar del array
    selected.splice(index, 1);

    // Resetear el botón en la tarjeta correspondiente
    compareBtns.forEach(function (btn) {
      var card = btn.closest('.related-card');
      if (card.getAttribute('data-compare-id') === id) {
        btn.classList.remove('active');
        btn.querySelector('i') && btn.querySelector('i').setAttribute('data-lucide', 'scale');
      }
    });

    renderCompareBar();
  }

  // ── ABRIR MODAL DE COMPARACIÓN ─────────────────
  if (compareActionBtn) {
    compareActionBtn.addEventListener('click', function () {
      if (selected.length < 2) return;
      renderCompareModal();
      if (compareModal) compareModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // ── CERRAR MODAL ──────────────────────────────
  function closeCompareModal() {
    if (compareModal) compareModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (compareModalOverlay) {
    compareModalOverlay.addEventListener('click', closeCompareModal);
  }
  if (compareModalClose) {
    compareModalClose.addEventListener('click', closeCompareModal);
  }

  // ── RENDERIZAR TABLA COMPARATIVA ──────────────
  function renderCompareModal() {
    if (!compareModalBody) return;

    var iconMap = {
      'laptop': 'laptop',
      'tablet': 'tablet',
      'desktop': 'monitor',
      'laptop-large': 'laptop',
    };

    // Cabeceras de producto
    var headerCells = '';
    selected.forEach(function (item) {
      var icon = iconMap[item.img] || 'package';
      headerCells += '<td>' +
        '<div class="compare-product-img"><i data-lucide="' + icon + '"></i></div>' +
        '<span class="compare-product-name">' + esc(item.name) + '</span>' +
        '<span class="compare-product-price">' + esc(item.price) + '</span>' +
        '</td>';
    });

    // Filas de especificaciones (simuladas)
    // En producción vendrían de una API
    var specs = [
      { label: 'Procesador', values: ['Apple M3', 'Apple M4', 'Apple M3', 'Apple M3 Max'] },
      { label: 'RAM', values: ['16GB', '8GB', '16GB', '36GB'] },
      { label: 'Almacenamiento', values: ['512GB SSD', '256GB SSD', '512GB SSD', '1TB SSD'] },
      { label: 'Pantalla', values: ['15.3" Liquid Retina', '11" Liquid Retina XDR', 'No incluye', '16.2" Liquid Retina XDR'] },
      { label: 'Puertos Thunderbolt', values: ['2', '1', '2', '3'] },
      { label: 'Wi-Fi', values: ['6E', '6E', '6E', '6E'] },
      { label: 'Bluetooth', values: ['5.3', '5.3', '5.3', '5.3'] },
      { label: 'Peso', values: ['1.24 kg', '0.44 kg', '1.18 kg', '2.14 kg'] },
      { label: 'Bateria (horas)', values: ['18', '10', '15', '22'] },
      { label: 'Garantia', values: ['1 año', '1 año', '1 año', '1 año'] },
    ];

    var rows = '';
    specs.forEach(function (spec, idx) {
      // Usar el valor correspondiente al índice del producto, o N/A
      var specValues = '';
      selected.forEach(function (item, itemIdx) {
        var val = spec.values[itemIdx] || 'N/A';
        specValues += '<td>' + val + '</td>';
      });

      // Alternar color de fondo en filas pares/impares
      var bgStyle = idx % 2 === 0 ? ' style="background:var(--bg-surface)"' : '';
      rows += '<tr>' +
        '<th' + bgStyle + '>' + spec.label + '</th>' +
        specValues +
        '</tr>';
    });

    // Agregar fila de checkmarks (características adicionales)
    var features = ['Camara HD', 'Touch ID', 'Carga rapida'];
    features.forEach(function (feature, idx) {
      // Simular algunos checks aleatorios
      var featureValues = '';
      selected.forEach(function (_, itemIdx) {
        var hasIt = (idx + itemIdx) % 2 === 0;
        featureValues += '<td>' +
          (hasIt
            ? '<span class="check-yes"><i data-lucide="circle-check"></i></span>'
            : '<span class="check-no"><i data-lucide="circle-x"></i></span>') +
          '</td>';
      });
      rows += '<tr>' +
        '<th>' + feature + '</th>' +
        featureValues +
        '</tr>';
    });

    compareModalBody.innerHTML =
      '<table class="compare-table">' +
        '<thead><tr><th>Producto</th>' + headerCells + '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table>';
  }

})();
