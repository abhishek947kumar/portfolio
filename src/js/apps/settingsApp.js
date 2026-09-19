// macOS System Settings App with Typography & Font Style Controls
import { resumeData } from '../data/resumeData.js';
import { themeService, FONT_STYLES } from '../services/themeService.js';
import { Tilt3D } from '../services/tilt3d.js';

export class SettingsApp {
  constructor(onWallpaperChange) {
    this.activeSection = 'general';
    this.onWallpaperChange = onWallpaperChange;
  }

  render() {
    return `
      <div class="settings-app-container">
        <!-- Settings Sidebar -->
        <aside class="settings-sidebar">
          <div class="settings-user-card">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek" class="settings-avatar" />
            <div class="settings-user-meta">
              <span class="settings-name">${resumeData.personal.name}</span>
              <span class="settings-sub">Apple ID • Placement Candidate</span>
            </div>
          </div>

          <nav class="settings-nav">
            <button class="settings-nav-item active" data-section="general">
              <span class="settings-icon">⚙️</span>
              <span>General & Overview</span>
            </button>
            <button class="settings-nav-item" data-section="typography">
              <span class="settings-icon">🔤</span>
              <span>Typography & Font Style</span>
              <span class="nav-subpill">New</span>
            </button>
            <button class="settings-nav-item" data-section="wallpaper">
              <span class="settings-icon">🖼️</span>
              <span>Wallpaper & Themes</span>
            </button>
            <button class="settings-nav-item" data-section="hardware">
              <span class="settings-icon">⚡</span>
              <span>Silicon & Hardware Stack</span>
            </button>
            <button class="settings-nav-item" data-section="education">
              <span class="settings-icon">🎓</span>
              <span>Academics & CGPA</span>
            </button>
            <button class="settings-nav-item" data-section="internships">
              <span class="settings-icon">🏢</span>
              <span>Industrial Internships</span>
            </button>
            <button class="settings-nav-item" data-section="credentials">
              <span class="settings-icon">📜</span>
              <span>IEEE & Certifications</span>
            </button>
          </nav>
        </aside>

        <!-- Settings Main Pane -->
        <main class="settings-main" id="settings-main-pane">
          ${this.renderSection('general')}
        </main>
      </div>
    `;
  }

  renderSection(section) {
    switch (section) {
      case 'general':
        return `
          <div class="settings-section">
            <h3 class="settings-heading">About This Engineer</h3>
            <div class="mac-specs-card">
              <div class="mac-logo-big"></div>
              <div class="mac-specs-list">
                <h4>MacBook Pro 16" — Abhishek Kumar Edition</h4>
                <div class="spec-row">
                  <span class="spec-k">Candidate</span>
                  <span class="spec-v">${resumeData.personal.name}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">Discipline</span>
                  <span class="spec-v">B.Tech in Electronics & Communication Engineering</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">University</span>
                  <span class="spec-v">Institute of Engineering & Management (IEM), Kolkata</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">Graduation Year</span>
                  <span class="spec-v">Class of 2027</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">Academic Standing</span>
                  <span class="spec-v"><strong class="highlight-score">8.73 CGPA</strong> (up to 6th Sem)</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">Location</span>
                  <span class="spec-v">${resumeData.personal.location}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">Contact</span>
                  <span class="spec-v">${resumeData.personal.email} | ${resumeData.personal.phone}</span>
                </div>
              </div>
            </div>

            <div class="settings-subgroup">
              <h4>Placement Readiness</h4>
              <p class="settings-desc">${resumeData.personal.summary}</p>
              <div class="target-roles-row">
                <span class="role-pill">Embedded Systems</span>
                <span class="role-pill">VLSI Hardware Co-Design</span>
                <span class="role-pill">Firmware Engineering</span>
                <span class="role-pill">Python / Software Engineering</span>
                <span class="role-pill">IoT Systems</span>
              </div>
            </div>
          </div>
        `;

      case 'typography':
        const curFont = themeService.currentFontId;
        const curSize = themeService.currentFontSize;
        const curSpacing = themeService.currentLetterSpacing;

        return `
          <div class="settings-section">
            <h3 class="settings-heading">Typography & Font Styling</h3>
            <p class="settings-desc">Customize the typography, font families, and visual text scale across the portfolio interface:</p>

            <!-- Font Size Scaling Controls -->
            <div class="typo-control-card">
              <div class="typo-control-head">
                <div>
                  <h4>Interface Font Scale</h4>
                  <span class="typo-sub">Adjust global text size for readability or compact mode</span>
                </div>
                <span class="typo-scale-badge" id="settings-font-scale-badge">${curSize}%</span>
              </div>

              <div class="font-scale-slider-wrap">
                <span class="scale-label small">75% (Compact)</span>
                <input type="range" min="75" max="140" value="${curSize}" class="typo-range-input" id="settings-font-size-slider" />
                <span class="scale-label large">140% (Large)</span>
              </div>

              <div class="scale-presets-row">
                <button class="preset-pill ${curSize === 85 ? 'active' : ''}" data-size="85">Compact (85%)</button>
                <button class="preset-pill ${curSize === 100 ? 'active' : ''}" data-size="100">Default (100%)</button>
                <button class="preset-pill ${curSize === 115 ? 'active' : ''}" data-size="115">Enhanced (115%)</button>
                <button class="preset-pill ${curSize === 130 ? 'active' : ''}" data-size="130">High Legibility (130%)</button>
              </div>
            </div>

            <!-- Font Style Families Grid -->
            <div class="typo-families-section">
              <h4>System Font Families</h4>
              <p class="settings-desc">Select a typography aesthetic for the macOS wrapper and windows:</p>

              <div class="font-families-grid">
                ${Object.values(FONT_STYLES).map(f => `
                  <div class="font-family-card ${f.id === curFont ? 'selected' : ''}" data-font-id="${f.id}">
                    <div class="font-card-top">
                      <span class="font-name" style="font-family: ${f.fontFamily};">${f.name}</span>
                      <span class="font-category-tag">${f.category}</span>
                    </div>
                    <p class="font-preview-line" style="font-family: ${f.fontFamily};">
                      Abhishek Kumar — B.Tech ECE (8.73 CGPA)
                    </p>
                    <p class="font-desc" style="font-family: ${f.fontFamily};">${f.sample}</p>
                    <div class="font-card-footer">
                      <span class="font-active-status">${f.id === curFont ? '✓ Active Typography' : 'Click to Apply'}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Letter Spacing Section -->
            <div class="typo-control-card spacing-card">
              <div class="typo-control-head">
                <div>
                  <h4>Letter Spacing (Kerning)</h4>
                  <span class="typo-sub">Fine-tune optical kerning and character density</span>
                </div>
              </div>

              <div class="spacing-buttons-row">
                <button class="spacing-btn ${curSpacing === 'tight' ? 'active' : ''}" data-spacing="tight">Tight (-0.02em)</button>
                <button class="spacing-btn ${curSpacing === 'normal' ? 'active' : ''}" data-spacing="normal">Normal (Default)</button>
                <button class="spacing-btn ${curSpacing === 'wide' ? 'active' : ''}" data-spacing="wide">Wide (+0.04em)</button>
              </div>
            </div>

            <!-- Live Typography Preview Card -->
            <div class="typo-preview-card">
              <span class="preview-badge">LIVE TYPOGRAPHY PREVIEW</span>
              <h3 class="preview-h3">Embedded Systems & Hardware-Software Co-Design</h3>
              <p class="preview-text">
                "Developing automated software tools, bare-metal IC design optimization with EDA workflows, and real-time control algorithms for sustainable energy technologies."
              </p>
              <div class="preview-actions">
                <button class="btn-reset-typo" id="btn-reset-typography">Reset to System Defaults</button>
              </div>
            </div>
          </div>
        `;

      case 'wallpaper':
        return `
          <div class="settings-section">
            <h3 class="settings-heading">Desktop Wallpaper & Appearance</h3>
            <p class="settings-desc">Choose your preferred macOS dynamic wallpaper:</p>
            <div class="wallpaper-picker-grid">
              <div class="wp-card" data-wallpaper="sequoia">
                <div class="wp-thumb" style="background: url('/wallpapers/sequoia.jpg') center/cover;"></div>
                <span class="wp-title">macOS Sequoia (Woods)</span>
              </div>
              <div class="wp-card" data-wallpaper="sonoma">
                <div class="wp-thumb" style="background: url('/wallpapers/sonoma.jpg') center/cover;"></div>
                <span class="wp-title">macOS Sonoma (Ribbons)</span>
              </div>
              <div class="wp-card" data-wallpaper="cyberpunk">
                <div class="wp-thumb" style="background: radial-gradient(circle at top right, #38ef7d, #11e8bb), linear-gradient(135deg, #0d1117 0%, #161b22 100%);"></div>
                <span class="wp-title">Silicon Cyberpunk (Dark)</span>
              </div>
              <div class="wp-card" data-wallpaper="monterey">
                <div class="wp-thumb" style="background: linear-gradient(135deg, #7928ca 0%, #ff0080 50%, #ff4d4d 100%);"></div>
                <span class="wp-title">Monterey Gradient</span>
              </div>
              <div class="wp-card" data-wallpaper="space">
                <div class="wp-thumb" style="background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);"></div>
                <span class="wp-title">Deep Space Dark</span>
              </div>
            </div>
          </div>
        `;

      case 'hardware':
        return `
          <div class="settings-section">
            <h3 class="settings-heading">Silicon & Embedded Architecture</h3>
            <p class="settings-desc">Hardware protocols, EDA tools, and peripheral interfaces implemented across Abhishek's projects and internships:</p>

            <div class="silicon-chip-diagram">
              <div class="chip-socket">
                <div class="chip-die">
                  <span class="chip-brand">ABHISHEK-SILICON</span>
                  <span class="chip-model">ECE-2027-CORE</span>
                  <div class="chip-circuits"></div>
                </div>
                <div class="chip-pins">
                  <span class="pin-tag">GPIO</span>
                  <span class="pin-tag">UART</span>
                  <span class="pin-tag">SPI</span>
                  <span class="pin-tag">I2C</span>
                  <span class="pin-tag">FSM 7-State</span>
                  <span class="pin-tag">EDA Bare-Metal</span>
                  <span class="pin-tag">Vivado Timing</span>
                  <span class="pin-tag">Wokwi IoT</span>
                </div>
              </div>
            </div>

            <div class="skills-breakdown-list">
              ${resumeData.skills.domains.map(d => `
                <div class="domain-meter-row">
                  <div class="domain-info">
                    <span class="domain-name">${d.name}</span>
                    <span class="domain-pct">${d.level}%</span>
                  </div>
                  <div class="meter-bar-track">
                    <div class="meter-bar-fill" style="width: ${d.level}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'education':
        return `
          <div class="settings-section">
            <h3 class="settings-heading">Academic Track Record</h3>
            <div class="education-timeline">
              ${resumeData.education.map(edu => `
                <div class="edu-card">
                  <div class="edu-header">
                    <h4>${edu.institution}</h4>
                    <span class="edu-score-badge">${edu.score}</span>
                  </div>
                  <p class="edu-degree">${edu.degree} (${edu.duration})</p>
                  <span class="edu-location">${edu.location}</span>
                  <ul class="edu-highlights">
                    ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'internships':
        return `
          <div class="settings-section">
            <h3 class="settings-heading">Industrial Internships & Training</h3>
            <div class="internship-cards-list">
              ${resumeData.internships.map(intern => `
                <div class="intern-card">
                  <div class="intern-head">
                    <div>
                      <h4>${intern.role}</h4>
                      <span class="intern-company">${intern.organization} (${intern.location})</span>
                    </div>
                    <span class="intern-dates">${intern.duration}</span>
                  </div>
                  <ul class="intern-bullets">
                    ${intern.points.map(pt => `<li>${pt}</li>`).join('')}
                  </ul>
                  <div class="intern-skills-used">
                    <strong>Skills Applied:</strong>
                    ${intern.skillsUsed.map(s => `<span class="s-tag">${s}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'credentials':
        return `
          <div class="settings-section">
            <h3 class="settings-heading">Research Publications & Honors</h3>
            <div class="credential-box">
              <h4>IEEE Conference Publication</h4>
              <p class="pub-title">"${resumeData.publications[0].title}"</p>
              <p class="pub-venue">${resumeData.publications[0].venue}</p>
              <p class="pub-doi">DOI: <a href="${resumeData.publications[0].link}" target="_blank">${resumeData.publications[0].doi}</a></p>
              <p class="pub-sum">${resumeData.publications[0].summary}</p>
            </div>

            <div class="credential-box">
              <h4>Professional Memberships</h4>
              <ul class="cert-list">
                ${resumeData.activities[0].items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>

            <div class="credential-box">
              <h4>Industrial Certifications</h4>
              <ul class="cert-list">
                ${resumeData.certifications.map(c => `<li><strong>${c.title}</strong> — ${c.issuer}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;

      default:
        return '';
    }
  }

  initListeners(container) {
    const navItems = container.querySelectorAll('.settings-nav-item');
    const mainPane = container.querySelector('#settings-main-pane');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        this.activeSection = item.getAttribute('data-section');
        mainPane.innerHTML = this.renderSection(this.activeSection);
        this.attachSectionListeners(mainPane);
      });
    });

    this.attachSectionListeners(mainPane);
  }

  attachSectionListeners(container) {
    // Wallpaper listeners
    const wpCards = container.querySelectorAll('.wp-card');
    wpCards.forEach(card => {
      card.addEventListener('click', () => {
        const wp = card.getAttribute('data-wallpaper');
        if (this.onWallpaperChange) this.onWallpaperChange(wp);
        wpCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // Typography listeners
    const fontCards = container.querySelectorAll('.font-family-card');
    fontCards.forEach(card => {
      card.addEventListener('click', () => {
        const fontId = card.getAttribute('data-font-id');
        themeService.setFontStyle(fontId);
        fontCards.forEach(c => {
          c.classList.remove('selected');
          const st = c.querySelector('.font-active-status');
          if (st) st.textContent = 'Click to Apply';
        });
        card.classList.add('selected');
        const activeSt = card.querySelector('.font-active-status');
        if (activeSt) activeSt.textContent = '✓ Active Typography';

        // Update control center pills if present
        const ccPills = document.querySelectorAll('.cc-font-pill');
        ccPills.forEach(p => {
          if (p.getAttribute('data-font') === fontId) p.classList.add('active');
          else p.classList.remove('active');
        });
      });
    });

    // Font size slider
    const sizeSlider = container.querySelector('#settings-font-size-slider');
    const sizeBadge = container.querySelector('#settings-font-scale-badge');
    if (sizeSlider) {
      sizeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        themeService.setFontSize(val);
        if (sizeBadge) sizeBadge.textContent = `${val}%`;

        // Update presets
        const presets = container.querySelectorAll('.preset-pill');
        presets.forEach(p => {
          p.classList.toggle('active', parseInt(p.getAttribute('data-size'), 10) === val);
        });

        // Sync with Control Center
        const ccVal = document.querySelector('#cc-font-size-val');
        const ccSlider = document.querySelector('#cc-font-size-slider');
        if (ccVal) ccVal.textContent = `${val}%`;
        if (ccSlider) ccSlider.value = val;
      });
    }

    // Preset pills
    const presetPills = container.querySelectorAll('.preset-pill');
    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const sz = parseInt(pill.getAttribute('data-size'), 10);
        themeService.setFontSize(sz);
        if (sizeSlider) sizeSlider.value = sz;
        if (sizeBadge) sizeBadge.textContent = `${sz}%`;
        presetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const ccVal = document.querySelector('#cc-font-size-val');
        const ccSlider = document.querySelector('#cc-font-size-slider');
        if (ccVal) ccVal.textContent = `${sz}%`;
        if (ccSlider) ccSlider.value = sz;
      });
    });

    // Spacing buttons
    const spacingBtns = container.querySelectorAll('.spacing-btn');
    spacingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sp = btn.getAttribute('data-spacing');
        themeService.setLetterSpacing(sp);
        spacingBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Reset button
    const resetBtn = container.querySelector('#btn-reset-typography');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        themeService.resetDefaults();
        // Re-render typography section to reflect defaults
        container.innerHTML = this.renderSection('typography');
        this.attachSectionListeners(container);
      });
    }

    // Attach 3D tilt to cards
    Tilt3D.attach(container.querySelectorAll('.font-family-card'), { maxTilt: 8, scale: 1.02 });
  }
}
