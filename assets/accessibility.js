(function () {
  var settings = [
    { key: 'text-large', label: 'Larger text' },
    { key: 'high-contrast', label: 'High contrast' },
    { key: 'readable-font', label: 'Readable font' },
    { key: 'underline-links', label: 'Underline links' },
    { key: 'reduce-motion', label: 'Reduce motion' }
  ];
  var storageKey = 'carolinaSanitationA11y';
  var state = {};

  function loadState() {
    try { state = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; }
    catch (e) { state = {}; }
  }

  function saveState() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); }
    catch (e) {}
  }

  function applyState() {
    settings.forEach(function (setting) {
      document.body.classList.toggle('a11y-' + setting.key, !!state[setting.key]);
      var btn = document.querySelector('[data-a11y-option="' + setting.key + '"]');
      if (btn) {
        btn.setAttribute('aria-pressed', state[setting.key] ? 'true' : 'false');
        var status = btn.querySelector('[data-a11y-status]');
        if (status) status.textContent = state[setting.key] ? 'On' : 'Off';
      }
    });
  }

  function ensureSkipTarget() {
    var target = document.getElementById('main-content') || document.querySelector('main, #hero, .page-hero, .page-header');
    if (target && !target.id) target.id = 'main-content';
    if (target && !target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  }

  function buildWidget() {
    if (document.querySelector('.a11y-toggle')) return;

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'a11y-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'a11y-panel');
    toggle.innerHTML = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M4 9h16"/><path d="M12 6v7"/><path d="M8 22l4-9 4 9"/></svg><span>Accessibility</span>';

    var panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.id = 'a11y-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', 'a11y-title');
    panel.innerHTML = '<h2 id="a11y-title">Accessibility</h2><p>Adjust the page display for easier reading.</p><div class="a11y-options"></div><button type="button" class="a11y-reset">Reset settings</button>';

    var options = panel.querySelector('.a11y-options');
    settings.forEach(function (setting) {
      var option = document.createElement('button');
      option.type = 'button';
      option.className = 'a11y-option';
      option.setAttribute('aria-pressed', 'false');
      option.setAttribute('data-a11y-option', setting.key);
      option.innerHTML = '<span>' + setting.label + '</span><span data-a11y-status>Off</span>';
      option.addEventListener('click', function () {
        state[setting.key] = !state[setting.key];
        saveState();
        applyState();
      });
      options.appendChild(option);
    });

    panel.querySelector('.a11y-reset').addEventListener('click', function () {
      state = {};
      saveState();
      applyState();
    });

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      panel.hidden = expanded;
      if (!expanded) panel.querySelector('.a11y-option').focus();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    document.body.appendChild(toggle);
    document.body.appendChild(panel);
    applyState();
  }

  document.addEventListener('DOMContentLoaded', function () {
    ensureSkipTarget();
    loadState();
    buildWidget();

    var tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab, index) {
      tab.addEventListener('keydown', function (event) {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        var nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      });
    });
  });
})();