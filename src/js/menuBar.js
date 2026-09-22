// macOS Menu Bar, Spotlight Search, Popovers & Control Center
import { resumeData } from './data/resumeData.js';
import { themeService } from './services/themeService.js';

export class MenuBar {
  constructor(windowManager, onWallpaperChange) {
    this.wm = windowManager;
    this.onWallpaperChange = onWallpaperChange;
    this.isSpotlightOpen = false;
    this.isControlCenterOpen = false;
    this.isAppleMenuOpen = false;
    this.isBatteryOpen = false;
    this.isWifiOpen = false;
  }

  init() {
    this.startClock();
    this.setupDropdowns();
    this.setupPopovers();
    this.setupQuickActions();
    this.setupSpotlight();
    this.setupControlCenter();
    this.setupKeyboardShortcuts();
  }

  startClock() {
    const clockEl = document.querySelector('#menu-clock');
    const update = () => {
      if (!clockEl) return;
      const now = new Date();
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      clockEl.textContent = now.toLocaleDateString('en-US', options).replace(',', '');
    };
    update();
    setInterval(update, 1000);
  }

  setupDropdowns() {
    const appleBtn = document.querySelector('#menu-apple-btn');
    const appleMenu = document.querySelector('#apple-dropdown-menu');

    appleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeAllMenus();
      this.isAppleMenuOpen = !this.isAppleMenuOpen;
      appleMenu?.classList.toggle('is-visible', this.isAppleMenuOpen);
    });

    // Apple Menu actions (All 100% functional)
    document.querySelector('#menu-about-mac')?.addEventListener('click', () => {
      this.wm.openWindow('settings');
      this.closeAllMenus();
    });

    document.querySelector('#menu-sys-settings')?.addEventListener('click', () => {
      this.wm.openWindow('settings');
      this.closeAllMenus();
    });

    document.querySelector('#menu-app-store')?.addEventListener('click', () => {
      this.wm.openWindow('projects');
      this.closeAllMenus();
    });

    document.querySelector('#menu-sleep')?.addEventListener('click', () => {
      this.triggerSleepOverlay();
      this.closeAllMenus();
    });

    document.querySelector('#menu-restart')?.addEventListener('click', () => {
      location.reload();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#apple-dropdown-menu') && !e.target.closest('#menu-apple-btn')) {
        appleMenu?.classList.remove('is-visible');
        this.isAppleMenuOpen = false;
      }
      if (!e.target.closest('#control-center-panel') && !e.target.closest('#menu-control-center-btn')) {
        document.querySelector('#control-center-panel')?.classList.remove('is-visible');
        this.isControlCenterOpen = false;
      }
      if (!e.target.closest('#battery-popover') && !e.target.closest('#menu-battery-btn')) {
        const batEl = document.querySelector('#battery-popover');
        if (batEl) batEl.style.display = 'none';
        this.isBatteryOpen = false;
      }
      if (!e.target.closest('#wifi-popover') && !e.target.closest('#menu-wifi-btn')) {
        const wifiEl = document.querySelector('#wifi-popover');
        if (wifiEl) wifiEl.style.display = 'none';
        this.isWifiOpen = false;
      }
    });
  }

  setupQuickActions() {
    // Top-left functional quick buttons
    document.querySelector('#menu-active-app-name')?.addEventListener('click', () => {
      this.wm.openWindow('settings');
    });

    document.querySelector('#menu-btn-quick-resume')?.addEventListener('click', () => {
      this.wm.openWindow('resume');
    });

    document.querySelector('#menu-btn-quick-projects')?.addEventListener('click', () => {
      this.wm.openWindow('projects');
    });

    document.querySelector('#menu-btn-quick-ai')?.addEventListener('click', () => {
      this.wm.openWindow('siri');
    });

    document.querySelector('#menu-btn-quick-terminal')?.addEventListener('click', () => {
      this.wm.openWindow('terminal');
    });

    document.querySelector('#menu-btn-quick-contact')?.addEventListener('click', () => {
      this.wm.openWindow('mail');
    });
  }

  setupPopovers() {
    const batBtn = document.querySelector('#menu-battery-btn');
    const batPopover = document.querySelector('#battery-popover');

    batBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeAllMenus();
      this.isBatteryOpen = !this.isBatteryOpen;
      if (batPopover) {
        batPopover.style.display = this.isBatteryOpen ? 'flex' : 'none';
      }
    });

    const wifiBtn = document.querySelector('#menu-wifi-btn');
    const wifiPopover = document.querySelector('#wifi-popover');

    wifiBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeAllMenus();
      this.isWifiOpen = !this.isWifiOpen;
      if (wifiPopover) {
        wifiPopover.style.display = this.isWifiOpen ? 'flex' : 'none';
      }
    });

    document.querySelector('#btn-open-network-settings')?.addEventListener('click', () => {
      this.closeAllMenus();
      this.wm.openWindow('social');
    });
  }

  setupControlCenter() {
    const ccBtn = document.querySelector('#menu-control-center-btn');
    const ccPanel = document.querySelector('#control-center-panel');

    ccBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeAllMenus();
      this.isControlCenterOpen = !this.isControlCenterOpen;
      ccPanel?.classList.toggle('is-visible', this.isControlCenterOpen);
    });

    // Dark / Light toggle
    const themeToggle = document.querySelector('#cc-dark-mode-toggle');
    themeToggle?.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeToggle.classList.toggle('active');
    });

    // Focus / Placement Mode
    const focusToggle = document.querySelector('#cc-focus-toggle');
    focusToggle?.addEventListener('click', () => {
      focusToggle.classList.toggle('active');
      const isFocused = focusToggle.classList.contains('active');
      if (isFocused) {
        document.body.classList.add('placement-focus-mode');
        this.showNotification("Placement Focus Active", "Prioritizing candidate CGPA (8.73), VLSI & recent projects.");
      } else {
        document.body.classList.remove('placement-focus-mode');
      }
    });

    // Brightness Slider
    const brightnessSlider = document.querySelector('#cc-brightness-slider');
    brightnessSlider?.addEventListener('input', (e) => {
      const val = e.target.value;
      document.documentElement.style.filter = `brightness(${val}%)`;
    });

    // Quick Typography & Font Size in Control Center
    this.setupControlCenterTypography();
  }

  setupControlCenterTypography() {
    const sizeSlider = document.querySelector('#cc-font-size-slider');
    const sizeVal = document.querySelector('#cc-font-size-val');
    const btnDecrease = document.querySelector('#btn-font-decrease');
    const btnIncrease = document.querySelector('#btn-font-increase');
    const btnReset = document.querySelector('#btn-font-reset');
    const fontPills = document.querySelectorAll('.cc-font-pill');

    const updateDisplay = (sz) => {
      if (sizeVal) sizeVal.textContent = `${sz}%`;
      if (sizeSlider) sizeSlider.value = sz;
    };

    updateDisplay(themeService.currentFontSize);

    // Set active pill
    fontPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-font') === themeService.currentFontId);
      pill.addEventListener('click', () => {
        const fontId = pill.getAttribute('data-font');
        themeService.setFontStyle(fontId);
        fontPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });

    sizeSlider?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      themeService.setFontSize(val);
      if (sizeVal) sizeVal.textContent = `${val}%`;
    });

    btnDecrease?.addEventListener('click', () => {
      themeService.decreaseFontSize(5);
      updateDisplay(themeService.currentFontSize);
    });

    btnIncrease?.addEventListener('click', () => {
      themeService.increaseFontSize(5);
      updateDisplay(themeService.currentFontSize);
    });

    btnReset?.addEventListener('click', () => {
      themeService.setFontSize(100);
      updateDisplay(100);
    });

    // Context menu typography trigger
    document.querySelector('#ctx-change-typography')?.addEventListener('click', () => {
      this.wm.openWindow('settings');
      const typoTab = document.querySelector('.settings-nav-item[data-section="typography"]');
      typoTab?.click();
    });
  }

  setupSpotlight() {
    const spotBtn = document.querySelector('#menu-spotlight-btn');
    const spotModal = document.querySelector('#spotlight-overlay');
    const spotInput = document.querySelector('#spotlight-search-input');
    const spotResults = document.querySelector('#spotlight-results-list');

    const toggleSpotlight = () => {
      this.isSpotlightOpen = !this.isSpotlightOpen;
      spotModal.style.display = this.isSpotlightOpen ? 'flex' : 'none';
      if (this.isSpotlightOpen) {
        spotInput.value = '';
        this.renderSpotlightResults('', spotResults);
        setTimeout(() => spotInput.focus(), 50);
      }
    };

    spotBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSpotlight();
    });

    spotModal?.addEventListener('click', (e) => {
      if (e.target === spotModal) {
        toggleSpotlight();
      }
    });

    spotInput?.addEventListener('input', (e) => {
      this.renderSpotlightResults(e.target.value, spotResults);
    });

    spotInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleSpotlight();
      } else if (e.key === 'Enter') {
        const firstItem = spotResults.querySelector('.spotlight-item');
        if (firstItem) {
          firstItem.click();
        }
      }
    });
  }

  renderSpotlightResults(query, container) {
    const q = query.trim().toLowerCase();

    const items = [
      { type: 'app', title: 'Resume (Preview PDF)', sub: 'View or download resume', id: 'resume', icon: '📄' },
      { type: 'app', title: 'Projects (App Store)', sub: '8 engineering projects (recent & hardware/DFIR)', id: 'projects', icon: '🛍️' },
      { type: 'app', title: 'Siri & Gemini AI Assistant', sub: 'Ask questions about Abhishek with AI', id: 'siri', icon: '🤖' },
      { type: 'app', title: 'Terminal (zsh)', sub: 'Interactive command-line interface', id: 'terminal', icon: '💻' },
      { type: 'app', title: 'Social & Activity Hub', sub: 'Live GitHub commits & LinkedIn posts', id: 'social', icon: '⚡' },
      { type: 'app', title: 'System Settings', sub: 'Academic CGPA, hardware stack, wallpapers', id: 'settings', icon: '⚙️' },
      { type: 'app', title: 'Safari Browser', sub: 'Web demos & publications', id: 'safari', icon: '🌐' },
      { type: 'app', title: 'Mail', sub: 'Send placement interview invitation', id: 'mail', icon: '✉️' },
      { type: 'detail', title: 'CGPA: 8.73 in B.Tech ECE', sub: 'Institute of Engineering & Management, Kolkata', id: 'resume', icon: '🎓' },
      { type: 'detail', title: 'VLSI Design Internship', sub: 'Jadavpur University — IC design flow & EDA bare-metal', id: 'settings', icon: '⚡' },
      { type: 'detail', title: 'Vocational Trainee', sub: 'Steel Authority of India Limited (SAIL) — Plant automation', id: 'settings', icon: '🏭' },
      { type: 'detail', title: 'IEEE IEMENTECH 2026 Publication', sub: 'Piezoelectric energy harvesting wearable therapy (DOI)', id: 'safari', icon: '📑' },
      { type: 'detail', title: 'BitTrace DFIR Bitcoin Forensic Tool', sub: 'Live volatile RAM triage, registry hives & ISO/IEC 27037 (Sep 2026)', id: 'projects', icon: '🛡️' },
      { type: 'detail', title: 'Embedded Night-Vision System', sub: 'Active IR + Thermal sensors with YOLOv2 (Sep 2026)', id: 'projects', icon: '🌙' },
      { type: 'detail', title: 'Logistics Management System', sub: 'Python & Django multi-dealer supply chain (Sep 2026)', id: 'projects', icon: '📦' }
    ];

    const filtered = q ? items.filter(item => item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)) : items.slice(0, 7);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="spotlight-no-results">
          <p>No matches found for "<strong>${this.escape(q)}</strong>".</p>
          <button class="spotlight-ask-ai" id="btn-spotlight-ask-ai">
            <span>Ask Siri / Gemini AI instead &rarr;</span>
          </button>
        </div>
      `;
      container.querySelector('#btn-spotlight-ask-ai')?.addEventListener('click', () => {
        document.querySelector('#spotlight-overlay').style.display = 'none';
        this.isSpotlightOpen = false;
        this.wm.openWindow('siri');
        const siriInput = document.querySelector('#ai-query-input');
        if (siriInput) {
          siriInput.value = query;
          document.querySelector('#ai-chat-form')?.dispatchEvent(new Event('submit'));
        }
      });
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="spotlight-item" data-app-id="${item.id}">
        <span class="spotlight-icon">${item.icon}</span>
        <div class="spotlight-text">
          <span class="spotlight-name">${item.title}</span>
          <span class="spotlight-sub">${item.sub}</span>
        </div>
        <span class="spotlight-enter-hint">↵ Open</span>
      </div>
    `).join('');

    const itemEls = container.querySelectorAll('.spotlight-item');
    itemEls.forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-app-id');
        document.querySelector('#spotlight-overlay').style.display = 'none';
        this.isSpotlightOpen = false;
        this.wm.openWindow(id);
      });
    });
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.querySelector('#menu-spotlight-btn')?.click();
      }
    });
  }

  closeAllMenus() {
    document.querySelector('#apple-dropdown-menu')?.classList.remove('is-visible');
    document.querySelector('#control-center-panel')?.classList.remove('is-visible');
    const batEl = document.querySelector('#battery-popover');
    if (batEl) batEl.style.display = 'none';
    const wifiEl = document.querySelector('#wifi-popover');
    if (wifiEl) wifiEl.style.display = 'none';

    this.isAppleMenuOpen = false;
    this.isControlCenterOpen = false;
    this.isBatteryOpen = false;
    this.isWifiOpen = false;
  }

  triggerSleepOverlay() {
    const lockEl = document.querySelector('#lock-screen-overlay');
    if (lockEl) {
      lockEl.style.display = 'flex';
      lockEl.addEventListener('click', () => {
        lockEl.style.display = 'none';
      }, { once: true });
    }
  }

  showNotification(title, message) {
    const tray = document.querySelector('#notification-tray');
    if (!tray) return;

    const notif = document.createElement('div');
    notif.className = 'macos-notification';
    notif.innerHTML = `
      <div class="notif-header">
        <span class="notif-app"> Placement Assistant</span>
        <span class="notif-time">now</span>
      </div>
      <div class="notif-body">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
    `;
    tray.appendChild(notif);
    setTimeout(() => {
      notif.classList.add('hide');
      setTimeout(() => notif.remove(), 400);
    }, 4000);
  }

  escape(str) {
    return str.replace(/[&<>'"]/g, '');
  }
}
