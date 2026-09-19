// View Mode Controller
// Sets the $7000 Cinematic Scrollytelling View as the primary, dedicated experience

export class ModeSwitcher {
  constructor() {
    this.currentMode = 'cinematic';
    this.cinematicContainer = null;
    this.desktopContainer = null;
    this.listeners = [];
  }

  init(cinematicContainer, desktopContainer) {
    this.cinematicContainer = cinematicContainer;
    this.desktopContainer = desktopContainer;
    this.applyMode('cinematic');
  }

  onModeChange(fn) {
    this.listeners.push(fn);
  }

  switchTo(mode) {
    this.applyMode('cinematic');
  }

  applyMode(mode) {
    if (!this.cinematicContainer) return;

    this.cinematicContainer.style.display = 'block';
    if (this.desktopContainer) {
      this.desktopContainer.style.display = 'none';
    }
    document.documentElement.style.height = 'auto';
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.height = 'auto';
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
    document.title = "Abhishek Kumar — Portfolio | B.Tech ECE (8.73 CGPA)";
  }
}

export const modeSwitcher = new ModeSwitcher();
