// Tap-to-toggle for badge notes on touch screens (hover and focus are handled in CSS).
// Tapping a badge opens its note and closes others; tapping elsewhere or Escape closes all.
export function initTooltips(selector = '.chip') {
  const triggers = document.querySelectorAll(selector);
  const closeAll = () => triggers.forEach((t) => t.classList.remove('open'));

  triggers.forEach((t) => {
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      const opening = !t.classList.contains('open');
      closeAll();
      t.classList.toggle('open', opening);
    });
  });
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
}
