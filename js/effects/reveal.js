// Folds .reveal elements up into place when they scroll into view, staggered by position.
export function initReveal({ reduceMotion, stagger = 90 } = {}) {
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const i = Array.prototype.indexOf.call(en.target.parentElement.children, en.target);
      en.target.style.transitionDelay = `${i * stagger}ms`;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
}
