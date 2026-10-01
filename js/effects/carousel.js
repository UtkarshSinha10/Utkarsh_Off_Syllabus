// 3D coverflow carousel. Works with any number of .slide elements inside a [data-carousel] root.
// The active slide faces front; neighbours swing back on either side.
export function initCarousel(root, { reduceMotion } = {}) {
  const ring = root.querySelector('.ring');
  const slides = ring.querySelectorAll('.slide');
  const n = slides.length;
  if (!n) return;
  const autoplay = reduceMotion ? 0 : Number(root.dataset.autoplay || 0);
  let idx = 0;
  let timer = null;

  function render() {
    const a = ((idx % n) + n) % n;
    const w = ring.offsetWidth;
    slides.forEach((s, i) => {
      let off = i - a;
      if (off > n / 2) off -= n;
      if (off < -n / 2) off += n;
      s.style.transform = `translateX(${off * w * 0.62}px) translateZ(${-Math.abs(off) * 160}px) rotateY(${-off * 38}deg)`;
      s.style.zIndex = 10 - Math.abs(off);
      s.classList.toggle('active', off === 0);
    });
  }

  function restart() {
    clearInterval(timer);
    if (autoplay > 0) timer = setInterval(() => { idx++; render(); }, autoplay);
  }

  function go(d) { idx += d; render(); restart(); }

  root.querySelector('[data-prev]')?.addEventListener('click', () => go(-1));
  root.querySelector('[data-next]')?.addEventListener('click', () => go(1));

  // Swipe / drag
  const stage = root.querySelector('.carousel');
  let startX = null;
  stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  window.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
  });

  window.addEventListener('resize', render);
  render();
  restart();
}
