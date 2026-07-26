/*
  gallery.js — Galería con lupa de zoom y miniaturas
  Dependencias: ninguna (autónomo)
  Uso: incluirlo en la página que tenga .gallery-main y .gallery-thumbs

  Comportamiento:
    - Al hacer clic en una miniatura, cambia la imagen principal
    - En desktop: hover sobre la imagen muestra una lupa (lens)
    - La lupa sigue el cursor y un panel lateral muestra el zoom
    - La imagen de zoom usa la versión @2x (data-zoom)
    - En móvil (touch): el zoom no aplica (no hay hover)
*/

(function () {
  'use strict';

  var galleryMain = document.getElementById('galleryMain');
  var mainImg = document.getElementById('galleryMainImg');
  var thumbs = document.querySelectorAll('.gallery-thumb');
  var lens = document.getElementById('zoomLens');
  var zoomResult = document.getElementById('zoomResult');

  // Si no hay galería en la página, salir silenciosamente
  if (!galleryMain || !mainImg || !thumbs.length) return;

  // ── CAMBIO DE MINIATURAS ──────────────────────
  // Al hacer clic en una miniatura:
  //   1. Actualiza la imagen principal (src y data-zoom)
  //   2. Marca la miniatura como activa
  //   3. Reinicia el zoom si está activo
  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var imgSrc = thumb.getAttribute('data-img');
      var zoomSrc = thumb.getAttribute('data-zoom');

      // Actualizar imagen principal
      if (imgSrc) mainImg.src = imgSrc;
      if (zoomSrc) mainImg.setAttribute('data-zoom', zoomSrc);

      // Marcar thumbnail activo
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');

      // Ocultar zoom result al cambiar de imagen
      if (zoomResult) zoomResult.classList.remove('active');
    });
  });

  // ── ZOOM CON LUPA ─────────────────────────────
  // Solo aplica si existen lens y zoomResult
  if (!lens || !zoomResult) return;

  // Detectar si es dispositivo táctil (touch)
  // Si es táctil, desactivar zoom (no hay hover como en desktop)
  var isTouchDevice = ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);

  if (isTouchDevice) return;

  // Calcular la escala del zoom basada en la imagen real
  function getZoomFactor() {
    var nw = mainImg.naturalWidth;
    var cw = galleryMain.offsetWidth;
    if (nw && cw) return Math.min(nw / cw, 3);
    return 2;
  }

  // Configurar el background del panel de zoom con la imagen @2x
  function setupZoomBackground() {
    var zoomSrc = mainImg.getAttribute('data-zoom');
    if (zoomSrc) {
      zoomResult.style.backgroundImage = 'url(' + zoomSrc + ')';
    }
  }

  // Actualizar posición del lens y del zoom result
  function moveLens(e) {
    // Obtener rectángulo del contenedor
    var rect = galleryMain.getBoundingClientRect();

    // Posición del cursor relativa al contenedor (en px)
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // Limitar el lens dentro del contenedor
    // lens tiene 120px, radio = 60px
    var lensHalf = 60;
    var maxX = rect.width - lensHalf;
    var maxY = rect.height - lensHalf;
    var lensX = Math.max(lensHalf, Math.min(x, maxX));
    var lensY = Math.max(lensHalf, Math.min(y, maxY));

    // Posicionar el lens (centrado en el cursor)
    lens.style.left = lensX + 'px';
    lens.style.top = lensY + 'px';

    // Calcular posición en porcentaje para el zoom
    // Ej: si cursor está en 25% del ancho, el bg se desplaza -25%
    var px = (lensX / rect.width) * 100;
    var py = (lensY / rect.height) * 100;

    // Mover el fondo del zoomResult para que muestre la zona correspondiente
    // La imagen de fondo está escalada por zoomFactor
    var zoomFactor = getZoomFactor();
    zoomResult.style.backgroundSize = (rect.width * zoomFactor) + 'px ' +
                                      (rect.height * zoomFactor) + 'px';
    zoomResult.style.backgroundPosition = '-' + (px * zoomFactor - 50) + '% ' +
                                          '-' + (py * zoomFactor - 50) + '%';
  }

  // Eventos de mouse para el zoom
  galleryMain.addEventListener('mouseenter', function () {
    setupZoomBackground();
    zoomResult.classList.add('active');
  });

  galleryMain.addEventListener('mousemove', function (e) {
    moveLens(e);
  });

  galleryMain.addEventListener('mouseleave', function () {
    zoomResult.classList.remove('active');
  });

})();
