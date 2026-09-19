// macOS Desktop & Context Menu Engine

export class Desktop {
  constructor(windowManager) {
    this.wm = windowManager;
    this.currentWallpaper = 'sequoia';
  }

  init() {
    this.setupDesktopIcons();
    this.setupContextMenu();
    this.setWallpaper(this.currentWallpaper);
  }

  setupDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
      // Handle click / double click
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        icons.forEach(i => i.classList.remove('is-selected'));
        icon.classList.add('is-selected');
      });

      icon.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const app = icon.getAttribute('data-app');
        if (app) this.wm.openWindow(app);
      });

      // Mobile single tap handling
      let lastTap = 0;
      icon.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
          const app = icon.getAttribute('data-app');
          if (app) this.wm.openWindow(app);
          e.preventDefault();
        }
        lastTap = currentTime;
      });
    });

    // Deselect on desktop click
    document.querySelector('#desktop')?.addEventListener('click', (e) => {
      if (e.target.id === 'desktop' || e.target.classList.contains('desktop-wallpaper')) {
        icons.forEach(i => i.classList.remove('is-selected'));
      }
    });
  }

  setupContextMenu() {
    const menu = document.querySelector('#desktop-context-menu');
    const desktop = document.querySelector('#desktop');
    if (!menu || !desktop) return;

    desktop.addEventListener('contextmenu', (e) => {
      // Don't intercept context menu inside window content or input
      if (e.target.closest('.macos-window') || e.target.closest('input') || e.target.closest('textarea')) return;

      e.preventDefault();
      const x = Math.min(window.innerWidth - 220, e.clientX);
      const y = Math.min(window.innerHeight - 260, e.clientY);

      menu.style.left = `${x}px`;
      menu.style.top = `${y}px`;
      menu.classList.add('is-visible');
    });

    document.addEventListener('click', () => {
      menu.classList.remove('is-visible');
    });

    // Context menu actions
    document.querySelector('#ctx-open-resume')?.addEventListener('click', () => {
      this.wm.openWindow('resume');
    });

    document.querySelector('#ctx-open-projects')?.addEventListener('click', () => {
      this.wm.openWindow('projects');
    });

    document.querySelector('#ctx-open-ai')?.addEventListener('click', () => {
      this.wm.openWindow('siri');
    });

    document.querySelector('#ctx-open-terminal')?.addEventListener('click', () => {
      this.wm.openWindow('terminal');
    });

    document.querySelector('#ctx-change-typography')?.addEventListener('click', () => {
      this.wm.openWindow('settings');
      setTimeout(() => {
        const typoTab = document.querySelector('.settings-nav-item[data-section="typography"]');
        typoTab?.click();
      }, 50);
    });

    document.querySelector('#ctx-change-wallpaper')?.addEventListener('click', () => {
      this.wm.openWindow('settings');
      setTimeout(() => {
        const wpTab = document.querySelector('.settings-nav-item[data-section="wallpaper"]');
        wpTab?.click();
      }, 50);
    });

    document.querySelector('#ctx-get-info')?.addEventListener('click', () => {
      this.wm.openWindow('settings');
    });
  }

  setWallpaper(name) {
    this.currentWallpaper = name;
    const desktopBg = document.querySelector('#desktop-wallpaper');
    if (!desktopBg) return;

    desktopBg.className = 'desktop-wallpaper wp-' + name;

    if (name === 'sequoia') {
      desktopBg.style.backgroundImage = `url('/wallpapers/sequoia.jpg')`;
      desktopBg.style.backgroundSize = 'cover';
      desktopBg.style.backgroundPosition = 'center';
    } else if (name === 'sonoma') {
      desktopBg.style.backgroundImage = `url('/wallpapers/sonoma.jpg')`;
      desktopBg.style.backgroundSize = 'cover';
      desktopBg.style.backgroundPosition = 'center';
    } else if (name === 'cyberpunk') {
      desktopBg.style.backgroundImage = `radial-gradient(circle at top right, #11e8bb 0%, #0d1117 70%)`;
    } else if (name === 'monterey') {
      desktopBg.style.backgroundImage = `linear-gradient(135deg, #7928ca 0%, #ff0080 50%, #ff4d4d 100%)`;
    } else if (name === 'space') {
      desktopBg.style.backgroundImage = `radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)`;
    }
  }
}
