// Safari Web Browser Simulator App
import { resumeData } from '../data/resumeData.js';

export class SafariApp {
  constructor() {
    this.currentUrl = 'https://github.com/abhishek947kumar';
    this.history = [this.currentUrl];
    this.historyIndex = 0;
  }

  render() {
    return `
      <div class="safari-app-container">
        <!-- Safari Top Bar -->
        <header class="safari-topbar">
          <div class="safari-nav-buttons">
            <button class="safari-nav-btn" id="safari-back" title="Back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="safari-nav-btn" id="safari-forward" title="Forward">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

          <div class="safari-url-bar-container">
            <div class="safari-url-bar">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="lock-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <input type="text" id="safari-address-input" value="${this.currentUrl}" readonly />
              <button class="safari-refresh-btn" id="safari-refresh" title="Reload Page">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
              </button>
            </div>
          </div>

          <div class="safari-external-btn">
            <a href="${this.currentUrl}" id="safari-external-link" target="_blank" rel="noreferrer" class="safari-open-external" title="Open in Real Browser Tab">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </header>

        <!-- Safari Bookmarks Bar -->
        <div class="safari-bookmarks-bar">
          <button class="safari-bookmark" data-url="https://abhishek947kumar.github.io/portfolio/">
            <span class="bm-icon">🌐</span> Live Portfolio
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar">
            <span class="bm-icon">🐙</span> GitHub Profile
          </button>
          <button class="safari-bookmark" data-url="https://linkedin.com/in/abhishek947kumar">
            <span class="bm-icon">💼</span> LinkedIn
          </button>
          <button class="safari-bookmark" data-url="https://doi.org/10.1109/IEMENTech202669403.2026.11434403">
            <span class="bm-icon">📄</span> IEEE Paper (DOI)
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems">
            <span class="bm-icon">🛡️</span> BitTrace DFIR
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/Embedded-Night-Vision-System">
            <span class="bm-icon">🌙</span> Night Vision System
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/Logistics-Management-System">
            <span class="bm-icon">📦</span> Logistics Engine
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights">
            <span class="bm-icon">💰</span> YourFinance AI
          </button>
        </div>

        <!-- Safari Viewport -->
        <div class="safari-viewport" id="safari-viewport-content">
          ${this.renderPageContent(this.currentUrl)}
        </div>
      </div>
    `;
  }

  renderPageContent(url) {
    if (url.includes('linkedin.com')) {
      return `
        <div class="safari-web-page linkedin-page">
          <div class="page-card linkedin-card">
            <div class="linkedin-banner"></div>
            <div class="linkedin-profile-header">
              <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="li-avatar" />
              <div class="li-info">
                <h2>${resumeData.personal.name}</h2>
                <p class="li-headline">B.Tech ECE '27 @ IEM Kolkata | VLSI Intern @ Jadavpur University | IEEE Published Author</p>
                <span class="li-loc">${resumeData.personal.location}</span>
                <div class="li-buttons">
                  <a href="${resumeData.personal.linkedin}" target="_blank" class="li-btn-primary">Connect on LinkedIn</a>
                  <a href="mailto:${resumeData.personal.email}" class="li-btn-secondary">Message / Email</a>
                </div>
              </div>
            </div>

            <div class="li-body-section">
              <h3>About</h3>
              <p>${resumeData.personal.summary}</p>
            </div>

            <div class="li-body-section">
              <h3>Featured Publication</h3>
              <div class="li-pub-card">
                <h4>${resumeData.publications[0].title}</h4>
                <p>${resumeData.publications[0].venue} • Published 2026</p>
                <a href="${resumeData.publications[0].link}" target="_blank" class="li-link">View in IEEE Xplore &rarr;</a>
              </div>
            </div>

            <div class="li-body-section">
              <h3>Featured Projects & Activity (Last 1 Week)</h3>
              <div class="li-projects-list">
                <div class="li-project-item">
                  <div class="li-proj-icon">🛡️</div>
                  <div class="li-proj-details">
                    <h4>BitTrace DFIR: Automated Live & Postmortem Bitcoin Forensics</h4>
                    <p class="li-proj-meta">Launched Sep 21, 2026 • Python, FastAPI, React & ISO/IEC 27037</p>
                    <p class="li-proj-desc">Automated volatile RAM inspection (BIP-39 mnemonic recovery, WIF keys), Berkeley DB wallet.dat parsing, ROT13 UserAssist decoding, and court-ready audit reports.</p>
                    <div class="li-proj-links">
                      <a href="${resumeData.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">🌙</div>
                  <div class="li-proj-details">
                    <h4>Embedded Night-Vision System for Pedestrian Detection</h4>
                    <p class="li-proj-meta">Launched Sep 19, 2026 • Python, Active IR + LWIR Thermal, YOLOv2</p>
                    <p class="li-proj-desc">Advanced Driver-Assistance System (ADAS) fusing active infrared and LWIR thermal feeds with HAAR+AdaBoost and lightweight quantized YOLOv2.</p>
                    <div class="li-proj-links">
                      <a href="${resumeData.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/Embedded-Night-Vision-System" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">🚚</div>
                  <div class="li-proj-details">
                    <h4>Logistics Management System (LogiTrack Pro)</h4>
                    <p class="li-proj-meta">Launched Sep 18, 2026 • Python & Django Enterprise Ecosystem</p>
                    <p class="li-proj-desc">Multi-dealer inventory synchronization, order dispatch scheduling, route tracking, and automated consignment status updates.</p>
                    <div class="li-proj-links">
                      <a href="${resumeData.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/Logistics-Management-System" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (url.includes('Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems') || url.includes('BitTrace')) {
      return `
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">🛡️</span>
              <h3>abhishek947kumar / <strong>BitTrace-DFIR</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">BitTrace DFIR: Automated Live & Postmortem Bitcoin Forensic Analysis Tool for Windows (ISO/IEC 27037 Compliance)</p>
            <div class="gh-meta-row">
              <span>🐍 Python 3.10+ & FastAPI</span>
              <span>⚛️ React 18</span>
              <span>⭐ 1 Star</span>
              <span>📅 Updated Sep 21, 2026 (Last 1 Week)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Volatile Memory Triage:</strong> Process memory inspection recovering 12–24 word BIP-39 recovery seeds, WIF private keys, and public addresses with byte-aligned Hex/ASCII viewer.</p>
              <p><strong>Postmortem & Remnants Engine:</strong> Deep scan of %APPDATA% for Berkeley DB wallet.dat files (0x00053162), Windows Prefetch launch metrics, and UserAssist ROT13 decoded logs.</p>
              <p><strong>Chain of Custody:</strong> ISO/IEC 27037 digital evidence preservation with cryptographic SHA-256 and MD5 verification ledger and 1-click printable PDF/HTML court reports.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (url.includes('doi.org') || url.includes('IEMENTech')) {
      return `
        <div class="safari-web-page ieee-page">
          <div class="page-card ieee-card">
            <div class="ieee-header">
              <span class="ieee-badge">IEEE Xplore Digital Library</span>
              <span class="ieee-conf">IEMENTECH 2026</span>
            </div>
            <h2>${resumeData.publications[0].title}</h2>
            <div class="ieee-meta">
              <p><strong>Authors:</strong> Abhishek Kumar et al.</p>
              <p><strong>Conference:</strong> 2026 8th International Conference on Electronics, Materials Engineering & Nano-Technology (IEMENTech)</p>
              <p><strong>Electronic ISBN:</strong> 10.1109/IEMENTech202669403.2026.11434403</p>
            </div>
            <hr class="ieee-line" />
            <div class="ieee-abstract">
              <h4>Abstract:</h4>
              <p>${resumeData.publications[0].summary}</p>
            </div>
            <div class="ieee-actions">
              <a href="${resumeData.publications[0].link}" target="_blank" class="ieee-download-btn">Read on IEEE Xplore Official Portal</a>
            </div>
          </div>
        </div>
      `;
    }

    if (url.includes('Embedded-Night-Vision-System')) {
      return `
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">📁</span>
              <h3>abhishek947kumar / <strong>Embedded-Night-Vision-System</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">Embedded Night-Vision System for Pedestrian Detection using Active IR and Thermal Sensors with HAAR+AdaBoost and YOLOv2</p>
            <div class="gh-meta-row">
              <span>🐍 Python</span>
              <span>⭐ 1 Star</span>
              <span>📅 Updated Sep 19, 2026 (Last 6 Months)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>System Architecture:</strong> Fused dual-spectrum image processing pipeline integrating active 850nm infrared illuminators and microbolometer LWIR thermal sensors.</p>
              <p><strong>Processing Pipeline:</strong> HAAR feature cascades for rapid bounding candidate proposal followed by lightweight quantized YOLOv2 inference running on edge computing hardware.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/Embedded-Night-Vision-System" target="_blank" class="gh-open-btn">View Full Code on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (url.includes('Logistics-Management-System')) {
      return `
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">📁</span>
              <h3>abhishek947kumar / <strong>Logistics-Management-System</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">Enterprise-Grade Commercial Multi-Dealer & Consumer Logistics Management System in Python & Django.</p>
            <div class="gh-meta-row">
              <span>🐍 Python & Django</span>
              <span>⭐ 1 Star</span>
              <span>📅 Updated Sep 18, 2026 (Last 6 Months)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p>Full-stack enterprise supply chain engine for multi-dealer inventory management, freight manifests, and automated status telemetry.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/Logistics-Management-System" target="_blank" class="gh-open-btn">View Full Code on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Default GitHub profile page
    return `
      <div class="safari-web-page gh-profile-page">
        <div class="page-card gh-card">
          <div class="gh-profile-head">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="gh-big-avatar" />
            <div class="gh-profile-text">
              <h2>Abhishek Kumar</h2>
              <p class="gh-sub">abhishek947kumar • Class of 2027 ECE Undergrad</p>
              <p>${resumeData.personal.summary}</p>
              <a href="https://github.com/abhishek947kumar" target="_blank" class="gh-open-btn">Visit GitHub Profile</a>
            </div>
          </div>

          <div class="gh-pinned-repos">
            <h4>Pinned & Recent Repositories (Last 1 Week & Recent)</h4>
            <div class="gh-pinned-grid">
              <div class="gh-pin-card">
                <h5>BitTrace-DFIR</h5>
                <p>Live memory triage, registry analysis & ISO/IEC 27037 digital forensic tool for Bitcoin.</p>
                <span class="pin-lang">Python & FastAPI</span>
              </div>
              <div class="gh-pin-card">
                <h5>Embedded-Night-Vision-System</h5>
                <p>Pedestrian detection using active IR and thermal sensor fusion with YOLOv2.</p>
                <span class="pin-lang">Python</span>
              </div>
              <div class="gh-pin-card">
                <h5>Logistics-Management-System</h5>
                <p>Commercial multi-dealer logistics management engine in Python/Django.</p>
                <span class="pin-lang">Python</span>
              </div>
              <div class="gh-pin-card">
                <h5>YourFinance-Expense-Tracker</h5>
                <p>Personal financial dashboard with Google Gemini AI intelligence.</p>
                <span class="pin-lang">JavaScript</span>
              </div>
              <div class="gh-pin-card">
                <h5>Evershop</h5>
                <p>Modern TypeScript & GraphQL eCommerce platform.</p>
                <span class="pin-lang">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  navigateTo(url, container) {
    this.currentUrl = url;
    this.history.push(url);
    this.historyIndex = this.history.length - 1;

    const input = container.querySelector('#safari-address-input');
    const extLink = container.querySelector('#safari-external-link');
    const viewport = container.querySelector('#safari-viewport-content');

    if (input) input.value = url;
    if (extLink) extLink.href = url;
    if (viewport) viewport.innerHTML = this.renderPageContent(url);
  }

  initListeners(container) {
    const bookmarks = container.querySelectorAll('.safari-bookmark');
    const backBtn = container.querySelector('#safari-back');
    const fwdBtn = container.querySelector('#safari-forward');
    const refreshBtn = container.querySelector('#safari-refresh');

    bookmarks.forEach(bm => {
      bm.addEventListener('click', () => {
        const url = bm.getAttribute('data-url');
        if (url) this.navigateTo(url, container);
      });
    });

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (this.historyIndex > 0) {
          this.historyIndex -= 1;
          const prevUrl = this.history[this.historyIndex];
          this.navigateTo(prevUrl, container);
        }
      });
    }

    if (fwdBtn) {
      fwdBtn.addEventListener('click', () => {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex += 1;
          const nextUrl = this.history[this.historyIndex];
          this.navigateTo(nextUrl, container);
        }
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        const viewport = container.querySelector('#safari-viewport-content');
        if (viewport) {
          viewport.style.opacity = '0.5';
          setTimeout(() => {
            viewport.innerHTML = this.renderPageContent(this.currentUrl);
            viewport.style.opacity = '1';
          }, 300);
        }
      });
    }
  }
}
