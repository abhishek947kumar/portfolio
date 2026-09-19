// Main Application Bootstrapper with 3D Depth Engine
import { windowManager } from './windowManager.js';
import { MenuBar } from './menuBar.js';
import { Desktop } from './desktop.js';
import { Ambient3D } from './services/ambient3d.js';
import { Tilt3D } from './services/tilt3d.js';
import { themeService } from './services/themeService.js';
import { CinematicView } from './cinematicView.js';
import { modeSwitcher } from './modeSwitcher.js';

// Application Windows
import { ResumeApp } from './apps/resumeApp.js';
import { ProjectsApp } from './apps/projectsApp.js';
import { AIApp } from './apps/aiApp.js';
import { SafariApp } from './apps/safariApp.js';
import { TerminalApp } from './apps/terminalApp.js';
import { SocialApp } from './apps/socialApp.js';
import { SettingsApp } from './apps/settingsApp.js';
import { MailApp } from './apps/mailApp.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Mount & Initialize $7000 Cinematic Scrollytelling View
  const cinematicContainer = document.querySelector('#cinematic-portfolio');
  const desktopContainer = document.querySelector('#desktop');

  if (cinematicContainer) {
    const cinematicView = new CinematicView(modeSwitcher);
    cinematicContainer.innerHTML = cinematicView.render();
    cinematicView.initListeners(cinematicContainer);
  }

  // 1. Initialize Ambient 3D Depth Constellation Canvas
  try {
    new Ambient3D('ambient-3d-canvas');
  } catch (e) {
    console.warn('3D Ambient Canvas initialization notice:', e);
  }

  const menuBarTitleEl = document.querySelector('#menu-active-app-name');
  windowManager.init(menuBarTitleEl);

  // Desktop engine
  const desktop = new Desktop(windowManager);
  desktop.init();

  // Menu bar engine with all functional popovers and quick buttons
  const menuBar = new MenuBar(windowManager, (wp) => desktop.setWallpaper(wp));
  menuBar.init();

  // 2. Initialize Apps
  const resumeApp = new ResumeApp();
  const contentResume = document.querySelector('#content-resume');
  if (contentResume) {
    contentResume.innerHTML = resumeApp.render();
    resumeApp.initListeners(contentResume);
  }

  const projectsApp = new ProjectsApp();
  const contentProjects = document.querySelector('#content-projects');
  if (contentProjects) {
    contentProjects.innerHTML = projectsApp.render();
    projectsApp.initListeners(contentProjects);
  }

  const aiApp = new AIApp();
  const contentSiri = document.querySelector('#content-siri');
  if (contentSiri) {
    contentSiri.innerHTML = aiApp.render();
    aiApp.initListeners(contentSiri);
  }

  const safariApp = new SafariApp();
  const contentSafari = document.querySelector('#content-safari');
  if (contentSafari) {
    contentSafari.innerHTML = safariApp.render();
    safariApp.initListeners(contentSafari);
  }

  const terminalApp = new TerminalApp();
  const contentTerminal = document.querySelector('#content-terminal');
  if (contentTerminal) {
    contentTerminal.innerHTML = terminalApp.render();
    terminalApp.initListeners(contentTerminal);
  }

  const socialApp = new SocialApp();
  const contentSocial = document.querySelector('#content-social');
  if (contentSocial) {
    contentSocial.innerHTML = socialApp.render();
    socialApp.initListeners(contentSocial);
  }

  const settingsApp = new SettingsApp((wp) => desktop.setWallpaper(wp));
  const contentSettings = document.querySelector('#content-settings');
  if (contentSettings) {
    contentSettings.innerHTML = settingsApp.render();
    settingsApp.initListeners(contentSettings);
  }

  const mailApp = new MailApp();
  const contentMail = document.querySelector('#content-mail');
  if (contentMail) {
    contentMail.innerHTML = mailApp.render();
    mailApp.initListeners(contentMail);
  }

  // 3. Register Windows with Window Manager
  windowManager.registerWindow('resume', {
    title: 'Preview',
    icon: '📄',
    el: document.querySelector('#win-resume'),
    defaultWidth: 780,
    defaultHeight: 560,
    x: 40,
    y: 50
  });

  windowManager.registerWindow('projects', {
    title: 'Project Store',
    icon: '🛍️',
    el: document.querySelector('#win-projects'),
    defaultWidth: 840,
    defaultHeight: 580,
    x: 100,
    y: 60
  });

  windowManager.registerWindow('siri', {
    title: 'Siri & Gemini AI',
    icon: '🤖',
    el: document.querySelector('#win-siri'),
    defaultWidth: 640,
    defaultHeight: 540,
    x: 180,
    y: 70
  });

  windowManager.registerWindow('safari', {
    title: 'Safari',
    icon: '🌐',
    el: document.querySelector('#win-safari'),
    defaultWidth: 800,
    defaultHeight: 560,
    x: 140,
    y: 60
  });

  windowManager.registerWindow('terminal', {
    title: 'Terminal',
    icon: '💻',
    el: document.querySelector('#win-terminal'),
    defaultWidth: 700,
    defaultHeight: 460,
    x: 120,
    y: 90
  });

  windowManager.registerWindow('social', {
    title: 'Activity Hub',
    icon: '⚡',
    el: document.querySelector('#win-social'),
    defaultWidth: 800,
    defaultHeight: 560,
    x: 80,
    y: 65
  });

  windowManager.registerWindow('settings', {
    title: 'System Settings',
    icon: '⚙️',
    el: document.querySelector('#win-settings'),
    defaultWidth: 760,
    defaultHeight: 520,
    x: 160,
    y: 75
  });

  windowManager.registerWindow('mail', {
    title: 'Mail',
    icon: '✉️',
    el: document.querySelector('#win-mail'),
    defaultWidth: 680,
    defaultHeight: 500,
    x: 150,
    y: 80
  });

  // 4. Attach 3D Tilt Animations
  const desktopIcons = document.querySelectorAll('.desktop-icon');
  Tilt3D.attach(desktopIcons, { maxTilt: 16, scale: 1.05, glare: false });

  const dockIcons = document.querySelectorAll('.dock-item');
  Tilt3D.attach(dockIcons, { maxTilt: 18, scale: 1.15, glare: false });

  const statBoxes = document.querySelectorAll('.stat-box');
  Tilt3D.attach(statBoxes, { maxTilt: 10, scale: 1.04, glare: true });

  // 5. Dock Interactions
  const dockItems = document.querySelectorAll('.dock-item[data-app]');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const appId = item.getAttribute('data-app');
      if (appId === 'finder') {
        windowManager.openWindow('resume');
      } else if (appId) {
        windowManager.toggleWindowFromDock(appId);
      }
    });
  });

  // Trash Functional Easter Egg
  const trashBtn = document.querySelector('#dock-trash');
  trashBtn?.addEventListener('click', () => {
    menuBar.showNotification("Trash is Clean", "All compiler warnings and bugs were resolved in pre-commit hooks! 🧹");
  });

  // 6. Initialize Dual-Mode Switcher (Defaults to $7000 Cinematic Scrollytelling View)
  modeSwitcher.init(cinematicContainer, desktopContainer);

  modeSwitcher.onModeChange((mode) => {
    if (mode === 'desktop') {
      windowManager.openWindow('resume');
      setTimeout(() => {
        windowManager.openWindow('siri');
      }, 200);
    }
  });

  if (modeSwitcher.currentMode === 'desktop') {
    setTimeout(() => {
      windowManager.openWindow('resume');
      setTimeout(() => {
        windowManager.openWindow('siri');
      }, 200);
    }, 100);
  }
});
