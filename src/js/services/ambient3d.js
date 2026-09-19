// Ambient 3D Depth Particle & Mesh Canvas Engine

export class Ambient3D {
  constructor(canvasId = 'ambient-3d-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 45;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.fov = 300;
    this.isRunning = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse tracking for 3D parallax
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX - window.innerWidth / 2) * 0.4;
      this.targetMouseY = (e.clientY - window.innerHeight / 2) * 0.4;
    });

    // Create 3D particles in space (-width/2 to +width/2, etc.)
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * window.innerWidth * 1.5,
        y: (Math.random() - 0.5) * window.innerHeight * 1.5,
        z: Math.random() * 600 - 300,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.2,
        hue: Math.random() > 0.5 ? 210 : 280 // Cyan or Purple accents
      });
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    if (!this.isRunning || !this.ctx) return;

    // Smooth camera mouse lerp
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;

    const projected = [];

    // Update positions and project 3D to 2D
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Wrap around bounds in 3D
      if (p.x < -window.innerWidth) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = -window.innerWidth;
      if (p.y < -window.innerHeight) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = -window.innerHeight;
      if (p.z < -300) p.z = 300;
      if (p.z > 300) p.z = -300;

      // Camera offset
      const posX = p.x - this.mouseX;
      const posY = p.y - this.mouseY;
      const posZ = p.z + 500; // Camera distance

      const scale = this.fov / posZ;
      const projX = cx + posX * scale;
      const projY = cy + posY * scale;
      const alpha = Math.max(0.08, Math.min(0.65, (600 - p.z) / 600));

      projected.push({
        x: projX,
        y: projY,
        scale,
        alpha,
        radius: p.radius * scale,
        hue: p.hue
      });
    }

    // Draw connecting 3D constellation lines
    this.ctx.lineWidth = 0.8;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const lineAlpha = (1 - dist / 130) * 0.18 * Math.min(p1.alpha, p2.alpha);
          this.ctx.strokeStyle = `hsla(210, 85%, 65%, ${lineAlpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particle points
    for (let p of projected) {
      this.ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.6)`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    requestAnimationFrame(() => this.animate());
  }
}
