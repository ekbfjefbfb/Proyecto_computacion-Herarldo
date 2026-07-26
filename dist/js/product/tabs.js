/*
  tabs.js — Navegación por pestañas
  Dependencias: ninguna
  Uso: funciona con .tabs-nav__btn y .tab-panel

  Comportamiento:
    - Cada botón del tab-nav tiene data-tab que coincide con id del panel
    - Al hacer clic: activa ese botón y muestra su panel correspondiente
    - Actualiza aria-selected para accesibilidad
    - Animación fadeIn en la transición
*/

(function () {
  'use strict';

  var tabBtns = document.querySelectorAll('.tabs-nav__btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  // Si no hay tabs en la página, salir
  if (!tabBtns.length) return;

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = btn.getAttribute('data-tab');

      // Desactivar todos los botones
      tabBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      // Activar el botón clickeado
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Ocultar todos los paneles
      tabPanels.forEach(function (panel) {
        panel.classList.remove('active');
      });

      // Mostrar el panel correspondiente
      var targetPanel = document.getElementById('tab-' + tabId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

})();
