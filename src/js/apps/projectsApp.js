// App Store: Projects Showcase for Abhishek Kumar with 3D Tilt Animations
import { resumeData } from '../data/resumeData.js';
import { Tilt3D } from '../services/tilt3d.js';

export class ProjectsApp {
  constructor() {
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.selectedProject = null;
  }

  render() {
    return `
      <div class="appstore-container">
        <!-- App Store Sidebar -->
        <aside class="appstore-sidebar">
          <div class="sidebar-brand">
            <span class="appstore-logo"></span>
            <span class="appstore-title">Project Store</span>
          </div>

          <div class="sidebar-search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="projects-search-input" placeholder="Search projects, tags..." />
          </div>

          <nav class="sidebar-nav">
            <button class="nav-item active" data-filter="all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Discover All</span>
            </button>
            <button class="nav-item special-highlight" data-filter="recent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Last 6 Months (New)</span>
              <span class="nav-pill">Hot</span>
            </button>
            <button class="nav-item" data-filter="embedded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              <span>Embedded & VLSI</span>
            </button>
            <button class="nav-item" data-filter="software">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              <span>AI & Full Stack</span>
            </button>
            <button class="nav-item" data-filter="security">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>Cybersecurity & C++</span>
            </button>
          </nav>

          <div class="sidebar-github-link">
            <a href="https://github.com/abhishek947kumar" target="_blank" rel="noreferrer" class="github-profile-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>abhishek947kumar</span>
            </a>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="appstore-main">
          <!-- Featured Header with 3D Depth Card -->
          <div class="appstore-hero 3d-hero-card" id="appstore-hero-card">
            <div class="hero-badge">PLACEMENT SHOWCASE 2026</div>
            <h2 class="hero-title">Embedded Systems, VLSI & Production Software</h2>
            <p class="hero-subtitle">High-performance engineering projects built with algorithmic precision, hardware-software co-design, and modern scalable architectures.</p>
            <div class="hero-stats">
              <div class="stat-box">
                <span class="stat-num">8.73</span>
                <span class="stat-label">B.Tech ECE CGPA</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">1</span>
                <span class="stat-label">IEEE Publication</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">8+</span>
                <span class="stat-label">GitHub Repos</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">2</span>
                <span class="stat-label">Core Internships</span>
              </div>
            </div>
          </div>

          <!-- Section Title -->
          <div class="section-header-bar">
            <h3 class="section-heading" id="projects-section-title">All Engineering Projects</h3>
            <span class="section-count" id="projects-count-label">7 Projects</span>
          </div>

          <!-- Projects Grid with 3D Tilt Elements -->
          <div class="projects-card-grid" id="projects-card-grid">
            ${this.renderProjectCards()}
          </div>
        </main>

        <!-- Project Detail Modal with 3D perspective dialog -->
        <div class="project-modal-backdrop" id="project-modal" style="display: none;">
          <div class="project-modal-dialog" id="project-modal-dialog">
            <button class="modal-close-btn" id="modal-close-btn" title="Close Modal">&times;</button>
            <div class="modal-content" id="modal-content-body">
              <!-- Dynamically Populated -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  filterProjects() {
    return resumeData.projects.filter(proj => {
      if (this.activeFilter === 'recent') {
        if (proj.createdPeriod !== 'Last 6 Months') return false;
      } else if (this.activeFilter === 'embedded') {
        const isEmb = proj.tags.some(t => ['Embedded Systems', 'Embedded C', 'Microcontrollers', 'Wokwi', 'Xilinx Vivado', 'Finite State Machines'].includes(t));
        if (!isEmb) return false;
      } else if (this.activeFilter === 'software') {
        const isSw = proj.tags.some(t => ['Python', 'Django', 'React', 'GraphQL', 'Gemini AI API', 'TypeScript'].includes(t));
        if (!isSw) return false;
      } else if (this.activeFilter === 'security') {
        const isSec = proj.tags.some(t => ['Cryptography', 'Security Algorithms', 'Pixel Manipulation', 'C++'].includes(t));
        if (!isSec) return false;
      }

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const matchesTitle = proj.title.toLowerCase().includes(q);
        const matchesDesc = proj.description.toLowerCase().includes(q);
        const matchesTag = proj.tags.some(t => t.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesTag;
      }

      return true;
    });
  }

  renderProjectCards() {
    const list = this.filterProjects();

    if (list.length === 0) {
      return `
        <div class="empty-projects-state">
          <p>No projects match your filter or search query.</p>
          <button class="clear-filter-btn" id="btn-reset-filter">Reset Filters</button>
        </div>
      `;
    }

    return list.map(proj => {
      const isRecent = proj.createdPeriod === 'Last 6 Months';
      return `
        <div class="project-card 3d-tilt-card ${isRecent ? 'is-recent' : ''}" data-project-id="${proj.id}">
          <div class="card-header">
            <span class="card-badge ${isRecent ? 'badge-hot' : 'badge-normal'}">${proj.badge}</span>
            <span class="card-period">${proj.createdPeriod}</span>
          </div>

          <h4 class="card-title">${proj.title}</h4>
          <p class="card-subtitle">${proj.subtitle}</p>

          <p class="card-desc">${proj.description}</p>

          <div class="card-tags">
            ${proj.tags.slice(0, 4).map(tag => `<span class="tag-chip">${tag}</span>`).join('')}
            ${proj.tags.length > 4 ? `<span class="tag-chip more">+${proj.tags.length - 4}</span>` : ''}
          </div>

          <div class="card-footer">
            <button class="btn-inspect-proj" data-id="${proj.id}">
              <span>View Architecture</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <a href="${proj.githubUrl}" target="_blank" rel="noreferrer" class="btn-github-link" title="Open on GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  openDetailModal(projectId, container) {
    const proj = resumeData.projects.find(p => p.id === projectId);
    if (!proj) return;

    const modal = container.querySelector('#project-modal');
    const modalBody = container.querySelector('#modal-content-body');
    const dialog = container.querySelector('#project-modal-dialog');

    modalBody.innerHTML = `
      <div class="modal-proj-header">
        <span class="modal-badge">${proj.badge}</span>
        <h3 class="modal-title">${proj.title}</h3>
        <p class="modal-sub">${proj.subtitle}</p>
      </div>

      <div class="modal-tech-row">
        ${proj.tags.map(t => `<span class="tech-badge">${t}</span>`).join('')}
      </div>

      <div class="modal-desc-box">
        <h5 class="modal-section-h5">Executive Summary</h5>
        <p>${proj.description}</p>
      </div>

      <div class="modal-highlights-box">
        <h5 class="modal-section-h5">Technical Architecture & Engineering Highlights</h5>
        <ul>
          ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-actions-bar">
        <a href="${proj.githubUrl}" target="_blank" rel="noreferrer" class="modal-primary-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>Open on GitHub</span>
        </a>
        <button class="modal-secondary-btn" id="modal-btn-close-bottom">
          <span>Close Window</span>
        </button>
      </div>
    `;

    modal.style.display = 'flex';

    if (dialog) {
      Tilt3D.attach([dialog], { maxTilt: 5, scale: 1.01, glare: false });
    }

    const closeBottom = modal.querySelector('#modal-btn-close-bottom');
    if (closeBottom) {
      closeBottom.onclick = () => { modal.style.display = 'none'; };
    }
  }

  initListeners(container) {
    const navButtons = container.querySelectorAll('.sidebar-nav .nav-item');
    const searchInput = container.querySelector('#projects-search-input');
    const gridEl = container.querySelector('#projects-card-grid');
    const modal = container.querySelector('#project-modal');
    const modalClose = container.querySelector('#modal-close-btn');
    const heroCard = container.querySelector('#appstore-hero-card');

    if (heroCard) {
      Tilt3D.attach([heroCard], { maxTilt: 6, scale: 1.01 });
    }

    const updateGrid = () => {
      gridEl.innerHTML = this.renderProjectCards();
      const count = this.filterProjects().length;
      const countEl = container.querySelector('#projects-count-label');
      if (countEl) countEl.textContent = `${count} Project${count === 1 ? '' : 's'}`;
      attachInspectButtons();
    };

    const attachInspectButtons = () => {
      const inspectBtns = container.querySelectorAll('.btn-inspect-proj');
      inspectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          this.openDetailModal(id, container);
        });
      });

      const cards = container.querySelectorAll('.project-card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-project-id');
          this.openDetailModal(id, container);
        });
      });

      // Attach 3D tilt to cards
      Tilt3D.attach(cards, { maxTilt: 10, scale: 1.025 });

      const resetBtn = container.querySelector('#btn-reset-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeFilter = 'all';
          this.searchQuery = '';
          if (searchInput) searchInput.value = '';
          navButtons.forEach(b => b.classList.remove('active'));
          container.querySelector('.nav-item[data-filter="all"]')?.classList.add('active');
          updateGrid();
        });
      }
    };

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        updateGrid();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        updateGrid();
      });
    }

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    attachInspectButtons();
  }
}
