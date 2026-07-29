/*
  reviews.js — Sistema de estrellas seleccionables y envío de reseña
  Dependencias: window.showToast (definido en main.js)
  Uso: funciona con .review-form__stars-input y #reviewForm

  Comportamiento:
    - Click en estrella: marca 1-5 estrellas (rellena hasta esa posición)
    - Submit del formulario: valida campos, muestra toast, resetea
    - Los botones "Te fue útil?" incrementan su contador
*/

(function () {
  'use strict';

  var showToast = window.showToast || function () {};

  // ── SELECTOR DE ESTRELLAS ─────────────────────
  var starContainer = document.getElementById('starInput');
  if (starContainer) {
    var stars = starContainer.querySelectorAll('i');
    var currentRating = 0;

    function setStars(value) {
      currentRating = value;
      stars.forEach(function (star, index) {
        star.setAttribute('data-lucide', 'star');
        star.className = index < value ? 'star-icon star-icon--fill' : 'star-icon';
      });
      if (window.lucide) lucide.createIcons();
    }

    // Click en estrella: seleccionar
    stars.forEach(function (star) {
      star.addEventListener('click', function () {
        setStars(parseInt(star.getAttribute('data-value'), 10));
      });

      // Hover: previsualización
      star.addEventListener('mouseenter', function () {
        var val = parseInt(star.getAttribute('data-value'), 10);
        stars.forEach(function (s, idx) {
          s.className = idx < val ? 'star-icon star-icon--fill' : 'star-icon';
        });
      });

      // Mouseleave: restaurar selección actual
      star.addEventListener('mouseleave', function () {
        setStars(currentRating);
      });
    });
  }

  // ── FORMULARIO DE RESEÑA ──────────────────────
  var reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('reviewName');
      var title = document.getElementById('reviewTitle');
      var text = document.getElementById('reviewText');

      if (!name || !title || !text) return;
      if (!name.value.trim() || !title.value.trim() || !text.value.trim()) {
        showToast('error', 'Error', 'Completa todos los campos');
        return;
      }
      if (currentRating === 0) {
        showToast('error', 'Error', 'Selecciona una calificacion');
        return;
      }

      // Éxito
      showToast('success', 'Reseña enviada',
        'Gracias por compartir tu opinion!');
      reviewForm.reset();
      setStars(0); // Resetear estrellas
    });
  }

  // ── BOTONES "TE FUE ÚTIL?" ────────────────────
  // Incrementa el contador al hacer clic en like/dislike
  var helpfulBtns = document.querySelectorAll('.review-card__helpful button');
  helpfulBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Extraer el número actual del texto del botón
      var text = btn.textContent.trim();
      var match = text.match(/(\d+)/);
      if (match) {
        var count = parseInt(match[1], 10) + 1;
        // Reemplazar solo el número dentro del texto
        btn.innerHTML = btn.innerHTML.replace(/(\d+)/, count);
      }
    });
  });

})();
