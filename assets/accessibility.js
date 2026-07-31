(function () {
  /* Makes the mobile #nav-drawer behave like a real modal dialog regardless of
     which inline toggle script opened it: traps Tab focus while open, moves
     focus into it on open, and returns focus to the hamburger button on close. */
  function setupNavDrawer() {
    var drawer = document.getElementById('nav-drawer');
    var hamburger = document.getElementById('hamburger');
    if (!drawer || !hamburger) return;

    drawer.setAttribute('aria-modal', 'true');

    function isOpen() {
      return drawer.classList.contains('open') || drawer.getAttribute('aria-hidden') === 'false';
    }

    function getFocusable() {
      return Array.prototype.slice.call(
        drawer.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
      );
    }

    function trapFocus(event) {
      if (event.key !== 'Tab') return;
      var focusable = getFocusable();
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    var wasOpen = false;
    var observer = new MutationObserver(function () {
      var open = isOpen();
      if (open && !wasOpen) {
        drawer.setAttribute('aria-hidden', 'false');
        var focusable = getFocusable();
        if (focusable.length) focusable[0].focus();
        document.addEventListener('keydown', trapFocus, true);
      } else if (!open && wasOpen) {
        drawer.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', trapFocus, true);
        hamburger.focus();
      }
      wasOpen = open;
    });
    observer.observe(drawer, { attributes: true, attributeFilter: ['class', 'aria-hidden'] });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupNavDrawer();

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
