// Preview App: Interactive Resume Viewer for Abhishek Kumar with 3D Page Flip
import { resumeData } from '../data/resumeData.js';
import { Tilt3D } from '../services/tilt3d.js';

export class ResumeApp {
  constructor() {
    this.currentPage = 1;
    this.zoomLevel = 100;
  }

  render() {
    return `
      <div class="preview-app-container">
        <!-- Preview Toolbar -->
        <div class="preview-toolbar">
          <div class="preview-toolbar-left">
            <span class="toolbar-title">Abhishek_Kumar_Resume.pdf</span>
            <span class="badge-accent">Class of 2027</span>
          </div>
          <div class="preview-toolbar-center">
            <button class="tb-btn" id="resume-prev-page" title="Previous Page (3D Flip)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <span class="page-indicator" id="resume-page-num">Page 1 of 2</span>
            <button class="tb-btn" id="resume-next-page" title="Next Page (3D Flip)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <div class="tb-divider"></div>
            <button class="tb-btn" id="resume-zoom-out" title="Zoom Out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <span class="zoom-indicator" id="resume-zoom-val">100%</span>
            <button class="tb-btn" id="resume-zoom-in" title="Zoom In">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <div class="preview-toolbar-right">
            <button class="tb-action-btn" id="btn-print-resume" title="Print / Save PDF">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              <span>Download PDF</span>
            </button>
            <button class="tb-action-btn secondary" id="btn-copy-resume-text" title="Copy ATS Text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy ATS Text</span>
            </button>
          </div>
        </div>

        <!-- Preview Document Canvas with 3D Flip Container -->
        <div class="preview-canvas" id="preview-canvas">
          <div class="paper-3d-scene" id="paper-3d-scene">
            <div class="paper-3d-flipper" id="resume-flipper">
              <!-- FRONT: PAGE 1 -->
              <div class="paper-sheet paper-front" id="page-1">
                <header class="doc-header">
                  <h1 class="doc-name">${resumeData.personal.name}</h1>
                  <p class="doc-address">${resumeData.personal.address}</p>
                  <div class="doc-contact-row">
                    <a href="mailto:${resumeData.personal.email}" class="doc-link">${resumeData.personal.email}</a>
                    <span class="bullet">•</span>
                    <span>${resumeData.personal.phone}</span>
                    <span class="bullet">•</span>
                    <a href="${resumeData.personal.linkedin}" target="_blank" rel="noreferrer" class="doc-link">linkedin.com/in/abhishek947kumar</a>
                    <span class="bullet">•</span>
                    <a href="${resumeData.personal.github}" target="_blank" rel="noreferrer" class="doc-link">github.com/abhishek947kumar</a>
                  </div>
                </header>

                <!-- ABOUT ME -->
                <section class="doc-section">
                  <h2 class="doc-section-title">ABOUT ME</h2>
                  <div class="doc-divider"></div>
                  <p class="doc-text">${resumeData.personal.summary}</p>
                </section>

                <!-- EDUCATION -->
                <section class="doc-section">
                  <h2 class="doc-section-title">EDUCATION</h2>
                  <div class="doc-divider"></div>
                  ${resumeData.education.map(edu => `
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${edu.institution}</span>
                        <span class="doc-location">${edu.location}</span>
                      </div>
                      <div class="doc-entry-sub">
                        <span class="doc-italic">${edu.degree}</span>
                        <span class="doc-date">${edu.duration}</span>
                      </div>
                      <div class="doc-score-highlight">
                        <strong>${edu.score}</strong>
                      </div>
                    </div>
                  `).join('')}
                </section>

                <!-- INTERNSHIP -->
                <section class="doc-section">
                  <h2 class="doc-section-title">INTERNSHIP</h2>
                  <div class="doc-divider"></div>
                  ${resumeData.internships.map(intern => `
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${intern.organization}</span>
                        <span class="doc-location">${intern.location}</span>
                      </div>
                      <div class="doc-entry-sub">
                        <span class="doc-italic">${intern.role}</span>
                        <span class="doc-date">${intern.duration}</span>
                      </div>
                      <ul class="doc-bullet-list">
                        ${intern.points.map(pt => `<li>${pt}</li>`).join('')}
                      </ul>
                    </div>
                  `).join('')}
                </section>

                <!-- PROJECTS -->
                <section class="doc-section">
                  <h2 class="doc-section-title">PROJECTS</h2>
                  <div class="doc-divider"></div>
                  ${resumeData.projects.slice(0, 2).map(proj => `
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${proj.title}</span>
                      </div>
                      <ul class="doc-bullet-list">
                        ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
                      </ul>
                    </div>
                  `).join('')}
                </section>

                <!-- SKILLS -->
                <section class="doc-section">
                  <h2 class="doc-section-title">SKILLS</h2>
                  <div class="doc-divider"></div>
                  <ul class="doc-skills-list">
                    <li><strong>Technical Domains:</strong> Microprocessors, Microcontrollers, Embedded Systems, Digital Electronics, Hardware Interfacing (GPIO, UART, SPI, I2C).</li>
                    <li><strong>Programming Languages & Logic:</strong> Python, MATLAB, C/C++, Embedded C, Object-Orientated Programming (OOP).</li>
                    <li><strong>Version Control & Testing:</strong> Git, CI/CD pipelines, Agile (Jira), Software Testing & Validation.</li>
                    <li><strong>Documentation & Development Tools:</strong> LaTeX, Xilinx Vivado, Wokwi, Hardware-Software Debugging.</li>
                    <li><strong>Engineering Fundamentals:</strong> Control Logic, Real-Time Processing, Data Structures & Algorithms, Digital Logic Design.</li>
                    <li><strong>Soft Skills:</strong> Technical Troubleshooting, Student Mentorship, Problem Solving, Teamwork, Clear Communication.</li>
                    <li><strong>Languages:</strong> English, Hindi, Bengali (Basic).</li>
                  </ul>
                </section>

                <div class="doc-page-footer">Page 1 of 2 — (Click 'Next Page' or arrow to flip 3D)</div>
              </div>

              <!-- BACK: PAGE 2 -->
              <div class="paper-sheet paper-back" id="page-2">
                <header class="doc-header mini">
                  <span class="doc-name-small">${resumeData.personal.name} — Page 2</span>
                  <span class="doc-contact-small">${resumeData.personal.email} | ${resumeData.personal.phone}</span>
                </header>

                <!-- PUBLICATIONS & CERTIFICATIONS -->
                <section class="doc-section">
                  <h2 class="doc-section-title">PUBLICATIONS & CERTIFICATIONS</h2>
                  <div class="doc-divider"></div>
                  <ul class="doc-bullet-list">
                    ${resumeData.publications.map(pub => `
                      <li>
                        <strong>${pub.venue}:</strong> “${pub.title}.” (Published).
                        <a href="${pub.link}" target="_blank" class="doc-link-accent">${pub.doi}</a>
                      </li>
                    `).join('')}
                    ${resumeData.certifications.map(cert => `
                      <li>
                        <strong>${cert.title}</strong> – ${cert.issuer}
                      </li>
                    `).join('')}
                  </ul>
                </section>

                <!-- ACTIVITIES -->
                <section class="doc-section">
                  <h2 class="doc-section-title">ACTIVITIES</h2>
                  <div class="doc-divider"></div>
                  <ul class="doc-bullet-list">
                    <li><strong>Memberships:</strong> Member of IEEE, IEEE MTT-S and IEEE CAS-S.</li>
                    <li><strong>Volunteering:</strong> Volunteer at SYTRON ’25.</li>
                    <li><strong>Participation:</strong> Participant in QUIZZOPHRENIA ’25.</li>
                  </ul>
                </section>

                <!-- EXTENDED PROJECT HIGHLIGHTS (GITHUB RECENT) -->
                <section class="doc-section">
                  <h2 class="doc-section-title">RECENT SOFTWARE & EMBEDDED REPOSITORIES (GITHUB)</h2>
                  <div class="doc-divider"></div>
                  ${resumeData.projects.slice(2, 6).map(proj => `
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${proj.title}</span>
                        <span class="doc-tag">${proj.tags[0]}</span>
                      </div>
                      <p class="doc-text">${proj.description}</p>
                    </div>
                  `).join('')}
                </section>

                <div class="doc-page-footer">Page 2 of 2 — (Click 'Previous Page' to flip back)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initListeners(container) {
    const prevBtn = container.querySelector('#resume-prev-page');
    const nextBtn = container.querySelector('#resume-next-page');
    const pageNumEl = container.querySelector('#resume-page-num');
    const flipper = container.querySelector('#resume-flipper');

    const updatePage = (page) => {
      this.currentPage = page;
      pageNumEl.textContent = `Page ${page} of 2`;
      if (page === 2) {
        flipper?.classList.add('is-flipped');
      } else {
        flipper?.classList.remove('is-flipped');
      }
    };

    if (prevBtn) prevBtn.addEventListener('click', () => updatePage(1));
    if (nextBtn) nextBtn.addEventListener('click', () => updatePage(2));

    // Zoom Controls
    const zoomInBtn = container.querySelector('#resume-zoom-in');
    const zoomOutBtn = container.querySelector('#resume-zoom-out');
    const zoomValEl = container.querySelector('#resume-zoom-val');
    const scene = container.querySelector('#paper-3d-scene');

    const applyZoom = (delta) => {
      this.zoomLevel = Math.max(70, Math.min(140, this.zoomLevel + delta));
      zoomValEl.textContent = `${this.zoomLevel}%`;
      scene.style.transform = `scale(${this.zoomLevel / 100})`;
      scene.style.transformOrigin = 'top center';
    };

    if (zoomInBtn) zoomInBtn.addEventListener('click', () => applyZoom(10));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => applyZoom(-10));

    // Print / Download PDF
    const printBtn = container.querySelector('#btn-print-resume');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Copy ATS text
    const copyBtn = container.querySelector('#btn-copy-resume-text');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const text = `ABHISHEK KUMAR\nSector-3, Bokaro Steel City, Jharkhand - 827003\n${resumeData.personal.email} | ${resumeData.personal.phone}\nLinkedIn: ${resumeData.personal.linkedin}\nGitHub: ${resumeData.personal.github}\n\nABOUT ME:\n${resumeData.personal.summary}\n\nEDUCATION:\nB.Tech in ECE, IEM Kolkata (2023-2027) | CGPA: 8.73\nClass 12, MGM Bokaro (2023): 86.5%\nClass 10, MGM Bokaro (2021): 95%\n\nINTERNSHIPS:\n1. VLSI Design Intern, Jadavpur University (Dec 2025 - Jan 2026)\n2. Vocational Trainee, SAIL (May 2025 - June 2025)\n\nPUBLICATIONS:\nIEMENTECH 2026: Enhancing Wearable Depression Management (DOI: 10.1109/IEMENTech202669403.2026.11434403)\n\nCERTIFICATIONS:\nIoT and AI Cloud - UC San Diego\n\nSKILLS:\nEmbedded Systems, Microcontrollers, VLSI, C/C++, Python, MATLAB, Vivado, Wokwi, Git.`;
        try {
          await navigator.clipboard.writeText(text);
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = `<span>Copied ATS Resume!</span>`;
          setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
        } catch (e) {
          alert("Resume ATS text copied!");
        }
      });
    }

    // Attach 3D tilt
    const frontPaper = container.querySelector('.paper-front');
    const backPaper = container.querySelector('.paper-back');
    if (frontPaper && backPaper) {
      Tilt3D.attach([frontPaper, backPaper], { maxTilt: 6, scale: 1.01, glare: false });
    }
  }
}
