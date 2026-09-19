// 3D Parallax & Tilt Engine for macOS Portfolio

export class Tilt3D {
  static attach(elements, options = {}) {
    const maxTilt = options.maxTilt || 12;
    const perspective = options.perspective || 1000;
    const scale = options.scale || 1.03;
    const addGlare = options.glare !== false;

    elements.forEach(el => {
      if (!el || el.dataset.tiltAttached) return;
      el.dataset.tiltAttached = 'true';

      let glareEl = null;
      if (addGlare && !el.querySelector('.tilt-glare')) {
        glareEl = document.createElement('div');
        glareEl.className = 'tilt-glare';
        el.style.position = el.style.position || 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(glareEl);
      } else {
        glareEl = el.querySelector('.tilt-glare');
      }

      el.style.transformStyle = 'preserve-3d';
      el.style.transition = 'transform 0.15s ease-out';

      let bounds = null;

      const onMouseEnter = () => {
        bounds = el.getBoundingClientRect();
        el.style.transition = 'none';
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = el.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = (mouseX / bounds.width) * 2 - 1; // -1 to 1
        const yPct = (mouseY / bounds.height) * 2 - 1;

        const tiltX = -yPct * maxTilt;
        const tiltY = xPct * maxTilt;

        el.style.transform = `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

        if (glareEl) {
          const glareX = ((mouseX / bounds.width) * 100).toFixed(1);
          const glareY = ((mouseY / bounds.height) * 100).toFixed(1);
          glareEl.style.opacity = '1';
          glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 65%)`;
        }
      };

      const onMouseLeave = () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        if (glareEl) {
          glareEl.style.opacity = '0';
        }
        bounds = null;
      };

      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
    });
  }
}
