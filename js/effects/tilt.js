// Mouse-driven 3D tilt for every [data-tilt] element.
// Optional data-base-x / data-base-y set the resting angle (degrees).
export function initTilt({ reduceMotion, strength = { x: 18, y: 22 } } = {}) {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduceMotion || !finePointer) return;

  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const bx = parseFloat(el.dataset.baseX || 0);
    const by = parseFloat(el.dataset.baseY || 0);
    const host = el.parentElement;
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${bx - py * strength.x}deg) rotateY(${by + px * strength.y}deg)`;
    });
    host.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}
