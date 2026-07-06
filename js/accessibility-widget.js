/* Paper Planes — Accessibility Widget */
(function () {
  var A11y = {
    zoom: 100,
    highContrast: false,
    darkMode: false,
    dyslexiaFont: false,

    init: function () {
      this.loadPrefs();
      this.render();
      this.attachEvents();
      this.apply();
    },

    loadPrefs: function () {
      var saved = localStorage.getItem('pp_a11y_prefs');
      if (saved) {
        var prefs = JSON.parse(saved);
        this.zoom = prefs.zoom || 100;
        this.highContrast = prefs.highContrast || false;
        this.darkMode = prefs.darkMode || false;
        this.dyslexiaFont = prefs.dyslexiaFont || false;
      }
    },

    savePrefs: function () {
      localStorage.setItem('pp_a11y_prefs', JSON.stringify({
        zoom: this.zoom,
        highContrast: this.highContrast,
        darkMode: this.darkMode,
        dyslexiaFont: this.dyslexiaFont
      }));
    },

    render: function () {
      var isHe = (document.documentElement.lang === 'he' || document.documentElement.getAttribute('dir') === 'rtl');
      var html = `
        <div id="ppA11yWidget" class="a11y-widget" role="region" aria-label="${isHe ? 'כלים לנגישות' : 'Accessibility Tools'}">
          <button id="ppA11yToggle" class="a11y-toggle" aria-expanded="false" aria-controls="ppA11yPanel"
            title="${isHe ? 'פתח/סגור כלים לנגישות' : 'Open/close accessibility tools'}">
            ${isHe ? '♿ נגישות' : '♿ Access'}
          </button>
          <div id="ppA11yPanel" class="a11y-panel" hidden>
            <div class="a11y-control">
              <label for="ppZoom">${isHe ? 'גודל טקסט' : 'Text Size'}: <span id="ppZoomVal">100%</span></label>
              <input type="range" id="ppZoom" min="80" max="200" value="${this.zoom}" step="10" class="a11y-slider">
            </div>
            <div class="a11y-control">
              <label>
                <input type="checkbox" id="ppContrast" ${this.highContrast ? 'checked' : ''} class="a11y-check">
                ${isHe ? 'ניגודיות גבוהה' : 'High Contrast'}
              </label>
            </div>
            <div class="a11y-control">
              <label>
                <input type="checkbox" id="ppDark" ${this.darkMode ? 'checked' : ''} class="a11y-check">
                ${isHe ? 'מצב כהה' : 'Dark Mode'}
              </label>
            </div>
            <div class="a11y-control">
              <label>
                <input type="checkbox" id="ppDyslexia" ${this.dyslexiaFont ? 'checked' : ''} class="a11y-check">
                ${isHe ? 'גופן קראות' : 'Dyslexia Font'}
              </label>
            </div>
            <button id="ppA11yReset" class="a11y-btn-reset">${isHe ? 'איפוס' : 'Reset'}</button>
          </div>
        </div>
      `;
      var container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container.firstElementChild);
    },

    attachEvents: function () {
      var self = this;
      var toggle = document.getElementById('ppA11yToggle');
      var panel = document.getElementById('ppA11yPanel');
      var zoom = document.getElementById('ppZoom');
      var contrast = document.getElementById('ppContrast');
      var dark = document.getElementById('ppDark');
      var dyslexia = document.getElementById('ppDyslexia');
      var reset = document.getElementById('ppA11yReset');

      if (toggle) {
        toggle.addEventListener('click', function () {
          var expanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', !expanded);
          panel.hidden = expanded;
        });
      }

      if (zoom) {
        zoom.addEventListener('input', function () {
          self.zoom = parseInt(this.value);
          document.getElementById('ppZoomVal').textContent = self.zoom + '%';
          self.apply();
          self.savePrefs();
        });
      }

      if (contrast) {
        contrast.addEventListener('change', function () {
          self.highContrast = this.checked;
          self.apply();
          self.savePrefs();
        });
      }

      if (dark) {
        dark.addEventListener('change', function () {
          self.darkMode = this.checked;
          self.apply();
          self.savePrefs();
        });
      }

      if (dyslexia) {
        dyslexia.addEventListener('change', function () {
          self.dyslexiaFont = this.checked;
          self.apply();
          self.savePrefs();
        });
      }

      if (reset) {
        reset.addEventListener('click', function () {
          self.zoom = 100;
          self.highContrast = false;
          self.darkMode = false;
          self.dyslexiaFont = false;
          self.apply();
          self.savePrefs();
          zoom.value = 100;
          contrast.checked = false;
          dark.checked = false;
          dyslexia.checked = false;
          document.getElementById('ppZoomVal').textContent = '100%';
        });
      }
    },

    apply: function () {
      var root = document.documentElement;

      // Zoom
      root.style.fontSize = (this.zoom / 100) + 'rem';

      // High Contrast
      if (this.highContrast) {
        root.classList.add('pp-high-contrast');
      } else {
        root.classList.remove('pp-high-contrast');
      }

      // Dark Mode
      if (this.darkMode) {
        root.setAttribute('data-theme', 'dark');
        root.classList.add('pp-dark-mode');
      } else {
        root.removeAttribute('data-theme');
        root.classList.remove('pp-dark-mode');
      }

      // Dyslexia Font
      if (this.dyslexiaFont) {
        root.classList.add('pp-dyslexia-font');
      } else {
        root.classList.remove('pp-dyslexia-font');
      }
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      A11y.init();
    });
  } else {
    A11y.init();
  }

  window.PPA11y = A11y;
})();
