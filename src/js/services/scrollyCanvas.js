// 3D Silicon Chip & Hardware Architecture Scrollytelling Canvas Engine
// Simulates cinematic Apple-style 3D product scroll sequence inspired by Google Flow + Ezgif

export class ScrollyCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.scrollProgress = 0;
    this.targetProgress = 0;
    this.rotX = 0.3;
    this.rotY = 0;
    this.rotZ = 0;
    this.zoom = 1;
    this.width = 0;
    this.height = 0;
    this.particles = [];
    this.numParticles = 50;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Initialize floating ambient tech particles
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 600,
        speed: 0.2 + Math.random() * 0.4,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6
      });
    }

    this.onScroll();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 600;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  onScroll() {
    const heroSection = document.getElementById('cinematic-hero');
    if (!heroSection) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.targetProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      return;
    }
    const rect = heroSection.getBoundingClientRect();
    const totalHeight = window.innerHeight * 2;
    const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
    this.targetProgress = progress;
  }

  animate() {
    // Smooth lerp progress
    this.scrollProgress += (this.targetProgress - this.scrollProgress) * 0.08;

    // Calculate dynamic 3D angles based on scroll progress
    this.rotY = this.scrollProgress * Math.PI * 2.5 + Date.now() * 0.0003;
    this.rotX = 0.45 + Math.sin(this.scrollProgress * Math.PI) * 0.35;
    this.rotZ = Math.sin(this.scrollProgress * Math.PI * 2) * 0.2;
    this.zoom = 1 + this.scrollProgress * 0.6;

    this.render();
    requestAnimationFrame(() => this.animate());
  }

  project(x, y, z) {
    // 3D Euler rotation: rotX, rotY, rotZ
    let cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
    let cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);
    let cosZ = Math.cos(this.rotZ), sinZ = Math.sin(this.rotZ);

    // Rotate Y
    let x1 = x * cosY + z * sinY;
    let y1 = y;
    let z1 = -x * sinY + z * cosY;

    // Rotate X
    let x2 = x1;
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;

    // Rotate Z
    let x3 = x2 * cosZ - y2 * sinZ;
    let y3 = x2 * sinZ + y2 * cosZ;
    let z3 = z2;

    // Perspective projection
    const fov = 420 * this.zoom;
    const distance = 500 + z3;
    const scale = distance > 10 ? fov / distance : 0;

    return {
      x: this.width / 2 + x3 * scale,
      y: this.height / 2 + y3 * scale,
      z: z3,
      scale: scale
    };
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw ambient floating depth particles
    this.particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < -300) p.y = 300;
      const proj = this.project(p.x, p.y, p.z);
      if (proj.scale > 0) {
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.scale * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 210, 255, ${p.alpha * 0.6})`;
        ctx.fill();
      }
    });

    // Draw 3D Silicon Microprocessor Architecture Die
    // Define layered geometry: Substrate base, Silicon Die, Heat Spreader, Gold Pins, Core Circuits
    const chipSize = 130;
    const chipHeight = 12;
    const dieExplode = this.scrollProgress * 65; // Exploded view on scroll!

    // Base PCB Substrate Layer
    this.drawBox(0, 20 + dieExplode * 0.4, 0, chipSize + 40, 6, chipSize + 40, '#0a2318', '#00ff88', 0.25);

    // Silicon Interposer Layer
    this.drawBox(0, 8 + dieExplode * 0.8, 0, chipSize + 10, 5, chipSize + 10, '#161922', '#0070f3', 0.35);

    // Main Compute Die (ECE Core Die)
    this.drawBox(0, -6 - dieExplode * 0.2, 0, chipSize - 20, chipHeight, chipSize - 20, '#1d2130', '#64d2ff', 0.7);

    // Core Heat Spreader / Shield (Explodes upwards)
    this.drawBox(0, -28 - dieExplode * 1.2, 0, chipSize - 35, 4, chipSize - 35, '#2e344a', '#a855f7', 0.85);

    // Draw Gold Contact Pins around PCB edge
    const pinStep = 18;
    for (let i = -chipSize / 2; i <= chipSize / 2; i += pinStep) {
      this.drawPin(i, 23 + dieExplode * 0.4, -chipSize / 2 - 14);
      this.drawPin(i, 23 + dieExplode * 0.4, chipSize / 2 + 14);
      this.drawPin(-chipSize / 2 - 14, 23 + dieExplode * 0.4, i);
      this.drawPin(chipSize / 2 + 14, 23 + dieExplode * 0.4, i);
    }

    // Draw Neon Bus Lines & Circuit Traces
    this.drawCircuitTraces(dieExplode);

    // Draw Floating Hologram Label
    this.drawHologramText(dieExplode);
  }

  drawBox(cx, cy, cz, w, h, d, fillColor, strokeColor, alpha) {
    const ctx = this.ctx;
    const hw = w / 2, hh = h / 2, hd = d / 2;

    const corners = [
      [-hw, -hh, -hd], [hw, -hh, -hd], [hw, hh, -hd], [-hw, hh, -hd], // front
      [-hw, -hh, hd],  [hw, -hh, hd],  [hw, hh, hd],  [-hw, hh, hd]   // back
    ].map(([x, y, z]) => this.project(cx + x, cy + y, cz + z));

    // Faces defined by corner indices
    const faces = [
      { pts: [0, 1, 2, 3], norm: [0, 0, -1] }, // front
      { pts: [5, 4, 7, 6], norm: [0, 0, 1] },  // back
      { pts: [4, 0, 3, 7], norm: [-1, 0, 0] }, // left
      { pts: [1, 5, 6, 2], norm: [1, 0, 0] },  // right
      { pts: [4, 5, 1, 0], norm: [0, -1, 0] }, // top
      { pts: [3, 2, 6, 7], norm: [0, 1, 0] }   // bottom
    ];

    faces.forEach(face => {
      ctx.beginPath();
      const p0 = corners[face.pts[0]];
      ctx.moveTo(p0.x, p0.y);
      for (let i = 1; i < face.pts.length; i++) {
        const pt = corners[face.pts[i]];
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }

  drawPin(x, y, z) {
    const p1 = this.project(x, y, z);
    const p2 = this.project(x, y + 8, z);
    if (p1.scale > 0 && p2.scale > 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.strokeStyle = '#ffd700';
      this.ctx.lineWidth = 2 * p1.scale;
      this.ctx.stroke();
    }
  }

  drawCircuitTraces(dieExplode) {
    const ctx = this.ctx;
    const tracePoints = [
      [[-40, -6, -40], [0, -6, -20], [30, -6, -35]],
      [[-30, -6, 20], [-10, -6, 0], [40, -6, 25]],
      [[0, -6, -40], [15, -6, 0], [-25, -6, 35]]
    ];

    tracePoints.forEach((line, idx) => {
      ctx.beginPath();
      const colors = ['#00f2fe', '#38ef7d', '#ff007f'];
      ctx.strokeStyle = colors[idx % colors.length];
      ctx.lineWidth = 1.8;
      line.forEach(([x, y, z], i) => {
        const p = this.project(x, y - dieExplode * 0.2, z);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    });
  }

  drawHologramText(dieExplode) {
    const pCenter = this.project(0, -45 - dieExplode * 1.5, 0);
    if (pCenter.scale <= 0) return;

    const ctx = this.ctx;
    ctx.save();
    ctx.font = `700 ${Math.max(10, 13 * pCenter.scale)}px -apple-system, sans-serif`;
    ctx.fillStyle = '#64d2ff';
    ctx.textAlign = 'center';
    ctx.fillText('ABHISHEK-CORE • ECE 2027', pCenter.x, pCenter.y);

    ctx.font = `500 ${Math.max(8, 10 * pCenter.scale)}px -apple-system, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('8.73 CGPA • VLSI & BARE-METAL EDA', pCenter.x, pCenter.y + 14 * pCenter.scale);
    ctx.restore();
  }
}
