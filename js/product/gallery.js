/*
  gallery.js — Galería de producto (solo miniaturas)
  Dependencias: ninguna (autónomo)
  Uso: incluirlo en la página que tenga .gallery-main y .gallery-thumbs

  Comportamiento:
    - Al hacer clic en una miniatura, cambia la imagen principal
    - En hover: ligero escalado de la imagen (scale 1.02)
    - CERO overlays circulares o lupa
*/

(function () {
  'use strict';

  var galleryMain = document.getElementById('galleryMain');
  var mainImg = document.getElementById('galleryMainImg');
  var thumbs = document.querySelectorAll('.gallery-thumb');

  if (!galleryMain || !mainImg || !thumbs.length) return;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var imgSrc = thumb.getAttribute('data-img');

      if (imgSrc) mainImg.src = imgSrc;

      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });

})();
