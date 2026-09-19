// Window Manager for macOS desktop environment

export class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindowId = null;
    this.topZIndex = 100;
    this.menuBarAppTitleEl = null;
  }

  init(menuBarAppTitleEl) {
    this.menuBarAppTitleEl = menuBarAppTitleEl;
    this.setupGlobalListeners();
  }

  registerWindow(id, config) {
    // config: { title, icon, el, defaultWidth, defaultHeight, x, y, onOpen, onClose }
    const windowEl = config.el;
    const initialWidth = config.defaultWidth || Math.min(840, window.innerWidth - 60);
    const initialHeight = config.defaultHeight || Math.min(560, window.innerHeight - 120);

    // Stagger default positions
    const offset = (this.windows.size * 28) % 180;
    const defaultX = config.x !== undefined ? config.x : Math.max(30, (window.innerWidth - initialWidth) / 2 + offset - 60);
    const defaultY = config.y !== undefined ? config.y : Math.max(45, (window.innerHeight - initialHeight) / 2 + offset - 40);

    const winData = {
      id,
      title: config.title,
      icon: config.icon,
      el: windowEl,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      width: initialWidth,
      height: initialHeight,
      x: defaultX,
      y: defaultY,
      prevBounds: null,
      onOpen: config.onOpen,
      onClose: config.onClose
    };

    this.windows.set(id, winData);
    this.applyWindowStyles(winData);
    this.setupWindowControls(winData);
    this.setupDraggable(winData);
    this.setupResizable(winData);

    return winData;
  }

  applyWindowStyles(win) {
    const el = win.el;
    el.style.width = `${win.width}px`;
    el.style.height = `${win.height}px`;
    el.style.transform = `translate3d(${win.x}px, ${win.y}px, 0)`;
  }

  setupWindowControls(win) {
    const el = win.el;

    // Bring to front on click
    el.addEventListener('mousedown', () => this.bringToFront(win.id));
    el.addEventListener('touchstart', () => this.bringToFront(win.id), { passive: true });

    // Traffic light buttons
    const btnClose = el.querySelector('.traffic-close');
    const btnMin = el.querySelector('.traffic-minimize');
    const btnMax = el.querySelector('.traffic-maximize');

    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeWindow(win.id);
      });
    }

    if (btnMin) {
      btnMin.addEventListener('click', (e) => {
        e.stopPropagation();
        this.minimizeWindow(win.id);
      });
    }

    if (btnMax) {
      btnMax.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMaximize(win.id);
      });
    }

    // Double click titlebar to toggle maximize
    const titlebar = el.querySelector('.window-titlebar');
    if (titlebar) {
      titlebar.addEventListener('dblclick', (e) => {
        if (!e.target.closest('.window-controls')) {
          this.toggleMaximize(win.id);
        }
      });
    }
  }

  setupDraggable(win) {
    const titlebar = win.el.querySelector('.window-titlebar');
    if (!titlebar) return;

    let isDragging = false;
    let startX, startY;
    let initialWinX, initialWinY;

    const onMouseDown = (e) => {
      if (win.isMaximized) return;
      if (e.target.closest('.window-controls') || e.target.closest('button') || e.target.closest('input')) return;

      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
      initialWinX = win.x;
      initialWinY = win.y;

      this.bringToFront(win.id);
      win.el.classList.add('is-dragging');

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onMouseMove, { passive: false });
      document.addEventListener('touchend', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      if (e.type === 'touchmove') e.preventDefault();

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const dx = clientX - startX;
      const dy = clientY - startY;

      // Keep within reasonable screen bounds
      const minX = -win.width + 100;
      const maxX = window.innerWidth - 100;
      const minY = 32; // below menu bar
      const maxY = window.innerHeight - 80;

      win.x = Math.max(minX, Math.min(maxX, initialWinX + dx));
      win.y = Math.max(minY, Math.min(maxY, initialWinY + dy));

      win.el.style.transform = `translate3d(${win.x}px, ${win.y}px, 0)`;
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        win.el.classList.remove('is-dragging');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
      }
    };

    titlebar.addEventListener('mousedown', onMouseDown);
    titlebar.addEventListener('touchstart', onMouseDown, { passive: false });
  }

  setupResizable(win) {
    const resizeHandle = win.el.querySelector('.window-resize-handle');
    if (!resizeHandle) return;

    let isResizing = false;
    let startX, startY;
    let startW, startH;

    const onMouseDown = (e) => {
      if (win.isMaximized) return;
      isResizing = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
      startW = win.width;
      startH = win.height;

      this.bringToFront(win.id);
      win.el.classList.add('is-resizing');

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onMouseMove, { passive: false });
      document.addEventListener('touchend', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isResizing) return;
      if (e.type === 'touchmove') e.preventDefault();

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const newW = Math.max(380, startW + (clientX - startX));
      const newH = Math.max(280, startH + (clientY - startY));

      win.width = Math.min(window.innerWidth - win.x - 10, newW);
      win.height = Math.min(window.innerHeight - win.y - 60, newH);

      win.el.style.width = `${win.width}px`;
      win.el.style.height = `${win.height}px`;
    };

    const onMouseUp = () => {
      if (isResizing) {
        isResizing = false;
        win.el.classList.remove('is-resizing');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
      }
    };

    resizeHandle.addEventListener('mousedown', onMouseDown);
    resizeHandle.addEventListener('touchstart', onMouseDown, { passive: false });
  }

  openWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    win.isOpen = true;
    win.isMinimized = false;
    win.el.classList.remove('is-minimized', 'is-hidden');
    win.el.classList.add('is-open');

    this.bringToFront(id);
    this.updateDockIndicator(id, true);

    if (win.onOpen) win.onOpen();
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    win.isOpen = false;
    win.isMinimized = false;
    win.el.classList.remove('is-open', 'is-focused');
    win.el.classList.add('is-hidden');

    this.updateDockIndicator(id, false);

    if (this.activeWindowId === id) {
      this.activeWindowId = null;
      this.updateMenuBarTitle('Finder');
      // Focus next top visible window if any
      const nextWin = this.getTopVisibleWindow();
      if (nextWin) {
        this.bringToFront(nextWin.id);
      }
    }

    if (win.onClose) win.onClose();
  }

  minimizeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    win.isMinimized = true;
    win.el.classList.add('is-minimized');
    win.el.classList.remove('is-focused');

    if (this.activeWindowId === id) {
      this.activeWindowId = null;
      const nextWin = this.getTopVisibleWindow();
      if (nextWin) {
        this.bringToFront(nextWin.id);
      } else {
        this.updateMenuBarTitle('Finder');
      }
    }
  }

  toggleMaximize(id) {
    const win = this.windows.get(id);
    if (!win) return;

    if (!win.isMaximized) {
      // Save prev bounds
      win.prevBounds = {
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height
      };
      win.x = 10;
      win.y = 36;
      win.width = window.innerWidth - 20;
      win.height = window.innerHeight - 110;
      win.isMaximized = true;
      win.el.classList.add('is-maximized');
    } else {
      // Restore prev bounds
      if (win.prevBounds) {
        win.x = win.prevBounds.x;
        win.y = win.prevBounds.y;
        win.width = win.prevBounds.width;
        win.height = win.prevBounds.height;
      }
      win.isMaximized = false;
      win.el.classList.remove('is-maximized');
    }

    this.applyWindowStyles(win);
    this.bringToFront(id);
  }

  bringToFront(id) {
    const win = this.windows.get(id);
    if (!win) return;

    if (win.isMinimized) {
      win.isMinimized = false;
      win.el.classList.remove('is-minimized');
    }

    this.topZIndex += 1;
    win.el.style.zIndex = this.topZIndex;

    // Remove focus class from all windows
    this.windows.forEach(w => w.el.classList.remove('is-focused'));
    win.el.classList.add('is-focused');

    this.activeWindowId = id;
    this.updateMenuBarTitle(win.title);
  }

  getTopVisibleWindow() {
    let topWin = null;
    let highestZ = -1;

    this.windows.forEach(win => {
      if (win.isOpen && !win.isMinimized) {
        const z = parseInt(win.el.style.zIndex || 0, 10);
        if (z > highestZ) {
          highestZ = z;
          topWin = win;
        }
      }
    });

    return topWin;
  }

  toggleWindowFromDock(id) {
    const win = this.windows.get(id);
    if (!win) return;

    if (!win.isOpen) {
      this.openWindow(id);
    } else if (win.isMinimized) {
      this.openWindow(id);
    } else if (this.activeWindowId === id) {
      this.minimizeWindow(id);
    } else {
      this.bringToFront(id);
    }
  }

  updateDockIndicator(id, isOpen) {
    const dockItem = document.querySelector(`.dock-item[data-app="${id}"]`);
    if (dockItem) {
      if (isOpen) {
        dockItem.classList.add('is-running');
      } else {
        dockItem.classList.remove('is-running');
      }
    }
  }

  updateMenuBarTitle(title) {
    if (this.menuBarAppTitleEl) {
      this.menuBarAppTitleEl.textContent = title;
    }
  }

  setupGlobalListeners() {
    window.addEventListener('resize', () => {
      this.windows.forEach(win => {
        if (win.isMaximized) {
          win.width = window.innerWidth - 20;
          win.height = window.innerHeight - 110;
          this.applyWindowStyles(win);
        } else {
          if (win.x + win.width > window.innerWidth) {
            win.x = Math.max(10, window.innerWidth - win.width - 20);
          }
          if (win.y + win.height > window.innerHeight) {
            win.y = Math.max(36, window.innerHeight - win.height - 80);
          }
          this.applyWindowStyles(win);
        }
      });
    });
  }
}

export const windowManager = new WindowManager();
