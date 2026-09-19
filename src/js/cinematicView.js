// $7000 Cinematic Scrollytelling Portfolio View Controller
// Inspired by Creativo AI Tutorial (Google Flow + Scrollytelling + Antigravity)

import { resumeData } from './data/resumeData.js';
import { aiService } from './services/aiService.js';
import { ScrollyCanvas } from './services/scrollyCanvas.js';
import { Tilt3D } from './services/tilt3d.js';

export class CinematicView {
  constructor(modeSwitcher) {
    this.modeSwitcher = modeSwitcher;
    this.scrollyCanvas = null;
    this.activeFilter = 'all';
  }

  render() {
    return `
      <!-- Ambient Lights & Grid Background -->
      <div class="cine-ambient-bg">
        <div class="cine-glow-orb-1"></div>
        <div class="cine-glow-orb-2"></div>
        <div class="cine-glow-orb-3"></div>
        <div class="cine-grid-overlay"></div>
      </div>

      <!-- Floating Island Glass Navbar -->
      <nav class="cine-navbar" id="cine-navbar">
        <div class="cine-nav-brand" id="cine-nav-logo">
          <div class="cine-logo-circle">AK</div>
          <span>Abhishek Kumar</span>
        </div>

        <div class="cine-nav-track" id="cine-nav-track">
          <!-- The dynamic sliding highlight pill that glides smoothly behind the active link -->
          <div class="cine-nav-slider" id="cine-nav-slider"></div>

          <ul class="cine-nav-links" id="cine-nav-links">
            <li><a class="cine-nav-link active" href="#hero" data-section="hero">Overview</a></li>
            <li><a class="cine-nav-link" href="#about" data-section="about">About & Skills</a></li>
            <li><a class="cine-nav-link" href="#projects" data-section="projects">Projects</a></li>
            <li><a class="cine-nav-link" href="#experience" data-section="experience">Academics</a></li>
            <li><a class="cine-nav-link" href="#research" data-section="research">Research</a></li>
            <li><a class="cine-nav-link" href="#ai-assistant" data-section="ai-assistant">Resume Assistant</a></li>
            <li><a class="cine-nav-link" href="#contact" data-section="contact">Contact</a></li>
          </ul>
        </div>

        <div class="cine-nav-actions">
          <a class="btn-nav-cta" href="#contact">Hire Me</a>
          <button class="cine-mobile-toggle" id="cine-mobile-toggle" aria-label="Toggle navigation menu">
            <span class="m-bar"></span>
            <span class="m-bar"></span>
            <span class="m-bar"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Navigation Drawer -->
      <div class="cine-mobile-drawer" id="cine-mobile-drawer">
        <div class="cine-mobile-drawer-inner">
          <a class="cine-mobile-nav-link active" href="#hero" data-section="hero">
            <span class="m-link-icon">⚡</span>
            <span>Overview</span>
          </a>
          <a class="cine-mobile-nav-link" href="#about" data-section="about">
            <span class="m-link-icon">🛠</span>
            <span>About & Skills</span>
          </a>
          <a class="cine-mobile-nav-link" href="#projects" data-section="projects">
            <span class="m-link-icon">🚀</span>
            <span>Featured Projects</span>
          </a>
          <a class="cine-mobile-nav-link" href="#experience" data-section="experience">
            <span class="m-link-icon">🎓</span>
            <span>Academics & Internships</span>
          </a>
          <a class="cine-mobile-nav-link" href="#research" data-section="research">
            <span class="m-link-icon">📜</span>
            <span>IEEE Publication</span>
          </a>
          <a class="cine-mobile-nav-link" href="#ai-assistant" data-section="ai-assistant">
            <span class="m-link-icon">📋</span>
            <span>Resume Assistant</span>
          </a>
          <a class="cine-mobile-nav-link" href="#contact" data-section="contact">
            <span class="m-link-icon">✉️</span>
            <span>Contact Abhishek</span>
          </a>
          <div class="cine-mobile-drawer-cta">
            <a href="#contact" class="btn-cine-primary btn-mobile-hire">
              <span>💼 Invite for Placement Interview</span>
            </a>
          </div>
        </div>
      </div>

      <div class="cine-content-wrapper">
        <!-- ================= HERO SECTION ================= -->
        <section class="cine-hero-section" id="hero">
          <div class="cine-status-pill">
            <span class="status-dot-pulse"></span>
            <span>Available for Campus Placement & Full-Time Roles • Class of 2027</span>
          </div>

          <h1 class="cine-hero-headline">
            Building Intelligent Silicon, Embedded Systems & Software Architectures.
          </h1>

          <p class="cine-hero-sub">
            Hi, I'm <strong>Abhishek Kumar</strong> — B.Tech ECE 4th year candidate at <strong>IEM Kolkata (8.73 CGPA)</strong>, 
            published IEEE researcher, and VLSI/embedded firmware developer with hands-on industrial internships at <strong>Jadavpur University</strong> and <strong>SAIL</strong>.
          </p>

          <div class="cine-hero-actions">
            <a href="#projects" class="btn-cine-primary">
              <span>Explore Featured Work</span>
              <span>↓</span>
            </a>
            <a href="#ai-assistant" class="btn-cine-secondary">
              <span>📋 Ask Resume Assistant</span>
            </a>
            <a href="#contact" class="btn-cine-secondary">
              <span>✉️ Get in Touch</span>
            </a>
          </div>

          <!-- 3D Interactive Scrollytelling Canvas Stage -->
          <div class="cine-scrolly-container" id="cinematic-hero">
            <canvas id="scrolly-canvas"></canvas>
            <div class="scrolly-hint-badge">
              <span>⚡</span>
              <span>Scroll down to inspect exploded 3D architecture layers</span>
            </div>
          </div>
        </section>

        <!-- ================= IMPACT METRICS RIBBON ================= -->
        <div class="cine-metrics-ribbon">
          <div class="metric-stat-card">
            <span class="metric-num">8.73</span>
            <span class="metric-title">Cumulative CGPA</span>
            <span class="metric-desc">B.Tech ECE @ IEM Kolkata (up to 6th Sem) with consistent top-tier department standing.</span>
          </div>
          <div class="metric-stat-card">
            <span class="metric-num">IEEE</span>
            <span class="metric-title">Published Researcher</span>
            <span class="metric-desc">First-author paper on self-powered IoT telemetry accepted at IEEE IEMENTECH 2026.</span>
          </div>
          <div class="metric-stat-card">
            <span class="metric-num">02</span>
            <span class="metric-title">Industrial Internships</span>
            <span class="metric-desc">Bare-metal IC EDA design at Jadavpur Univ & plant automation systems at SAIL.</span>
          </div>
          <div class="metric-stat-card">
            <span class="metric-num">15+</span>
            <span class="metric-title">Production & Embedded Projects</span>
            <span class="metric-desc">From night-vision sensor fusion & 7-state traffic FSMs to full-stack logistics platforms.</span>
          </div>
        </div>

        <!-- ================= ABOUT & HARDWARE CO-DESIGN ================= -->
        <section class="cine-section" id="about">
          <div class="cine-section-header">
            <span class="cine-section-pill">Engineering Foundation</span>
            <h2 class="cine-section-title">Hardware-Software Co-Design Mastery</h2>
            <p class="cine-section-subtitle">Bridging bare-metal silicon physics, firmware logic, and high-performance software pipelines.</p>
          </div>

          <div class="cine-about-grid">
            <div class="cine-profile-card">
              <div class="cine-profile-avatar-wrap">
                <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="cine-profile-avatar" />
                <div class="cine-profile-badge">🎓</div>
              </div>
              <h3 class="cine-profile-name">${resumeData.personal.name}</h3>
              <div class="cine-profile-role">B.Tech ECE 4th Year Candidate • VLSI & Software</div>
              <p class="cine-profile-bio">
                ${resumeData.personal.summary}
              </p>
              <div class="cine-social-links-row">
                <a href="${resumeData.personal.linkedin}" target="_blank" class="cine-social-btn" title="LinkedIn">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="${resumeData.personal.github}" target="_blank" class="cine-social-btn" title="GitHub">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="mailto:${resumeData.personal.email}" class="cine-social-btn" title="Email">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            <div class="cine-skills-box">
              <h4>Domain Mastery & Technical Breadth</h4>
              <p>Evaluated through academic rigour, industrial internships, simulation environments, and physical deployments:</p>

              ${resumeData.skills.domains.map(d => `
                <div class="cine-skill-bar-item">
                  <div class="cine-skill-info">
                    <span>${d.name}</span>
                    <span style="color: var(--cine-cyan);">${d.level}%</span>
                  </div>
                  <div class="cine-bar-track">
                    <div class="cine-bar-fill" style="width: ${d.level}%;"></div>
                  </div>
                </div>
              `).join('')}

              <div class="cine-tags-cluster">
                ${resumeData.skills.tools.map(t => `<span class="cine-tech-pill">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- ================= FEATURED PROJECTS CASE STUDIES ================= -->
        <section class="cine-section" id="projects">
          <div class="cine-section-header">
            <span class="cine-section-pill">Portfolio Showcase</span>
            <h2 class="cine-section-title">Featured Engineering Projects</h2>
            <p class="cine-section-subtitle">Real-world systems spanning computer vision, microcontrollers, FSM hardware, and cloud logistics.</p>
          </div>

          <div class="cine-filter-tabs">
            <button class="cine-filter-btn active" data-filter="all">All Projects</button>
            <button class="cine-filter-btn" data-filter="recent">🔥 Last 6 Months (GitHub)</button>
            <button class="cine-filter-btn" data-filter="embedded">Embedded & VLSI</button>
            <button class="cine-filter-btn" data-filter="software">Software & AI</button>
          </div>

          <div class="cine-projects-grid" id="cine-projects-grid">
            ${this.renderProjectCards('all')}
          </div>
        </section>

        <!-- ================= ACADEMICS & INDUSTRIAL INTERNSHIPS ================= -->
        <section class="cine-section" id="experience">
          <div class="cine-section-header">
            <span class="cine-section-pill">Track Record</span>
            <h2 class="cine-section-title">Academics & Industrial Internships</h2>
            <p class="cine-section-subtitle">Rigorous theoretical foundation paired with on-site semiconductor research and industrial plant automation.</p>
          </div>

          <div class="cine-timeline-grid">
            <!-- Internships Column -->
            <div class="cine-timeline-col">
              <h4>🏢 Industrial Internships</h4>
              <div class="timeline-cards-wrap">
                ${resumeData.internships.map(intern => `
                  <div class="cine-timeline-item">
                    <div class="t-item-head">
                      <span class="t-role">${intern.role}</span>
                      <span class="t-date">${intern.duration}</span>
                    </div>
                    <div class="t-org">${intern.organization} • ${intern.location}</div>
                    <ul class="t-bullets">
                      ${intern.points.map(pt => `<li>${pt}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Academics Column -->
            <div class="cine-timeline-col">
              <h4>🎓 Academic Qualifications</h4>
              <div class="timeline-cards-wrap">
                ${resumeData.education.map(edu => `
                  <div class="cine-timeline-item">
                    <div class="t-item-head">
                      <span class="t-role">${edu.degree}</span>
                      <span class="t-date">${edu.duration}</span>
                    </div>
                    <div class="t-org">${edu.institution} • <strong>${edu.score}</strong></div>
                    <ul class="t-bullets">
                      ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- ================= IEEE RESEARCH PUBLICATION ================= -->
        <section class="cine-section" id="research">
          <div class="cine-publication-card">
            <div class="pub-badge-ribbon">
              <span>📜</span>
              <span>PEER-REVIEWED IEEE CONFERENCE PUBLICATION</span>
            </div>
            <h3 class="pub-title-big">"${resumeData.publications[0].title}"</h3>
            <div class="pub-venue-line">${resumeData.publications[0].venue}</div>
            <p class="pub-abstract-text">${resumeData.publications[0].summary}</p>
            <div class="pub-actions-row">
              <a href="${resumeData.publications[0].link}" target="_blank" class="btn-pub-doi">
                <span>View on IEEE Xplore Digital Library</span>
                <span>↗</span>
              </a>
              <span class="pub-author-tag">Authors: Abhishek Kumar et al. • DOI: ${resumeData.publications[0].doi}</span>
            </div>
          </div>
        </section>

        <!-- ================= INTERACTIVE RESUME ASSISTANT ================= -->
        <section class="cine-section" id="ai-assistant">
          <div class="cine-section-header">
            <span class="cine-section-pill">Interactive Knowledge Base</span>
            <h2 class="cine-section-title">Ask About Abhishek Kumar</h2>
            <p class="cine-section-subtitle">Instantly query Abhishek's verified resume, academic standing, project architectures, and placement readiness.</p>
          </div>

          <div class="cine-ai-assistant-card">
            <div class="cine-ai-head">
              <div class="cine-ai-avatar">📋</div>
              <div class="cine-ai-title-wrap">
                <h4>Placement Resume Assistant</h4>
                <span>Verified Knowledge Base of Abhishek's Resume, Transcripts & Project Repos</span>
              </div>
            </div>

            <div class="cine-ai-suggestions">
              <button class="ai-suggest-chip" data-q="Why should we hire Abhishek for our engineering team?">Why hire Abhishek?</button>
              <button class="ai-suggest-chip" data-q="What are Abhishek's VLSI and bare-metal EDA skills?">VLSI & Bare-Metal Skills?</button>
              <button class="ai-suggest-chip" data-q="Tell me about his IEEE conference publication">IEEE Publication Details?</button>
              <button class="ai-suggest-chip" data-q="What projects did Abhishek build in the last 6 months?">Projects in Last 6 Months?</button>
              <button class="ai-suggest-chip" data-q="What is his CGPA and college track record?">CGPA & College?</button>
            </div>

            <div class="cine-ai-chat-box" id="cine-chat-log">
              <div class="cine-chat-msg assistant">
                Hello! I am Abhishek's Interactive Resume Assistant. Click any prompt above or type your question below to explore his technical qualifications and placement readiness.
              </div>
            </div>

            <form class="cine-ai-form" id="cine-ai-form">
              <input type="text" class="cine-ai-input" id="cine-ai-input" placeholder="Ask anything about Abhishek (e.g. 'Can he code in Python and C++?')..." required />
              <button type="submit" class="btn-cine-ai-ask">Ask Assistant</button>
            </form>
          </div>
        </section>

        <!-- ================= CONTACT SECTION ================= -->
        <section class="cine-section" id="contact">
          <div class="cine-section-header">
            <span class="cine-section-pill">Placement & Opportunities</span>
            <h2 class="cine-section-title">Get In Touch With Abhishek</h2>
            <p class="cine-section-subtitle">Interested in hiring Abhishek for campus placements or technical roles? Reach out directly.</p>
          </div>

          <div class="cine-contact-box">
            <div class="cine-contact-info">
              <h4>Candidate Contact Desk</h4>
              <p>
                Available for campus recruitment interviews, technical screenings, and full-time engineering appointments across India and remote.
              </p>

              <div class="contact-meta-row">
                <div class="contact-meta-icon">✉️</div>
                <div>
                  <div style="font-size: 11px; color: var(--cine-text-muted);">Direct Email</div>
                  <strong>${resumeData.personal.email}</strong>
                </div>
              </div>

              <div class="contact-meta-row">
                <div class="contact-meta-icon">📱</div>
                <div>
                  <div style="font-size: 11px; color: var(--cine-text-muted);">Phone / WhatsApp</div>
                  <strong>${resumeData.personal.phone}</strong>
                </div>
              </div>

              <div class="contact-meta-row">
                <div class="contact-meta-icon">📍</div>
                <div>
                  <div style="font-size: 11px; color: var(--cine-text-muted);">Primary Locations</div>
                  <strong>${resumeData.personal.location}</strong>
                </div>
              </div>

              <div style="margin-top: 24px; display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="${resumeData.personal.linkedin}" target="_blank" class="btn-cine-secondary" style="font-size: 13px;">
                  Connect on LinkedIn ↗
                </a>
                <a href="${resumeData.personal.github}" target="_blank" class="btn-cine-secondary" style="font-size: 13px;">
                  Follow on GitHub ↗
                </a>
              </div>
            </div>

            <form class="cine-contact-form" id="cine-contact-form">
              <div class="cine-form-field">
                <label>Recruiter / Organization Name</label>
                <input type="text" class="cine-form-input" id="cine-name" placeholder="e.g. Intel, Qualcomm, Texas Instruments, Google" required />
              </div>
              <div class="cine-form-field">
                <label>Your Work Email</label>
                <input type="email" class="cine-form-input" id="cine-email" placeholder="recruiter@company.com" required />
              </div>
              <div class="cine-form-field">
                <label>Role / Placement Opportunity</label>
                <input type="text" class="cine-form-input" id="cine-role" placeholder="e.g. Embedded Systems / VLSI / Software Engineer" required />
              </div>
              <div class="cine-form-field">
                <label>Interview Invitation / Message</label>
                <textarea class="cine-form-textarea" id="cine-msg" rows="3" placeholder="Hi Abhishek, we reviewed your portfolio and would like to invite you for an interview..." required></textarea>
              </div>
              <button type="submit" class="btn-cine-submit" id="btn-submit-contact">Send Placement Message</button>
              <div id="cine-form-feedback" style="font-size: 12px; color: var(--cine-emerald); display: none;">
                ✓ Message dispatched! We will connect with you promptly.
              </div>
            </form>
          </div>
        </section>

        <!-- ================= FOOTER ================= -->
        <footer class="cine-footer">
          <p>© 2026 Abhishek Kumar • B.Tech ECE (IEM Kolkata) • IEEE Published Researcher.</p>
          <p style="margin-top: 4px; color: var(--cine-text-muted);">Crafted with 3D Scrollytelling & Interactive Engineering Architecture.</p>
        </footer>
      </div>
    `;
  }

  renderProjectCards(filter) {
    let list = resumeData.projects;
    if (filter === 'recent') {
      list = list.filter(p => p.createdPeriod === 'Last 6 Months' || p.badge.includes('Recent'));
    } else if (filter === 'embedded') {
      list = list.filter(p => p.tags.some(t => ['Embedded Systems', 'VLSI', 'IoT', 'Wokwi', 'Hardware'].includes(t)) || p.title.toLowerCase().includes('embedded') || p.title.toLowerCase().includes('traffic'));
    } else if (filter === 'software') {
      list = list.filter(p => p.tags.some(t => ['Python', 'Django', 'REST APIs', 'Enterprise Architecture', 'AI'].includes(t)));
    }

    return list.map(p => `
      <div class="cine-project-card ${p.createdPeriod === 'Last 6 Months' ? 'is-hot' : ''}">
        <div class="cine-project-top">
          <span class="${p.createdPeriod === 'Last 6 Months' ? 'cine-tag-hot' : 'cine-tag-normal'}">
            ${p.badge}
          </span>
          <span class="cine-project-period">${p.createdPeriod}</span>
        </div>

        <h3 class="cine-project-title">${p.title}</h3>
        <div class="cine-project-sub">${p.subtitle}</div>
        <p class="cine-project-desc">${p.description}</p>

        <div class="cine-project-techs">
          ${p.tags.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>

        <div class="cine-project-actions">
          <a href="${p.githubUrl}" target="_blank" class="btn-card-inspect">
            Explore GitHub Repo ↗
          </a>
          <a href="${p.githubUrl}" target="_blank" class="btn-card-github" title="View Source">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    `).join('');
  }

  initListeners(container) {
    // 1. Initialize 3D Scrollytelling Canvas
    try {
      this.scrollyCanvas = new ScrollyCanvas('scrolly-canvas');
    } catch (e) {
      console.warn('ScrollyCanvas init note:', e);
    }

    // 2. Attach 3D Tilt to Project & Metric Cards
    Tilt3D.attach(container.querySelectorAll('.cine-project-card'), { maxTilt: 8, scale: 1.02, glare: true });
    Tilt3D.attach(container.querySelectorAll('.metric-stat-card'), { maxTilt: 6, scale: 1.03 });

    // 3. Dynamic Moving Highlight Slider on Scroll & Click
    const navTrack = container.querySelector('#cine-nav-track');
    const slider = container.querySelector('#cine-nav-slider');
    const navLinks = container.querySelectorAll('.cine-nav-link');

    const updateSlider = (activeLink) => {
      if (!activeLink || !slider || !navTrack) return;
      const trackRect = navTrack.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      if (linkRect.width === 0 || linkRect.height === 0) return;

      const leftOffset = (linkRect.left - trackRect.left) + (navTrack.scrollLeft || 0);
      const topOffset = (linkRect.top - trackRect.top) + (navTrack.scrollTop || 0);

      slider.style.width = `${linkRect.width}px`;
      slider.style.height = `${linkRect.height}px`;
      slider.style.transform = `translate3d(${leftOffset}px, ${topOffset}px, 0)`;
      slider.style.opacity = '1';
    };

    // ScrollSpy: moves the highlighted slider indicator as user scrolls down the page
    const sectionIds = ['hero', 'about', 'projects', 'experience', 'research', 'ai-assistant', 'contact'];
    let isClickScrolling = false;
    let clickScrollTimer = null;

    const onScrollSpy = () => {
      if (isClickScrolling) return;

      const threshold = Math.min(260, window.innerHeight * 0.35);
      let currentId = sectionIds[0];

      // Check if user has scrolled near the bottom of the page
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      if (winHeight + scrollTop >= docHeight - 80) {
        currentId = sectionIds[sectionIds.length - 1]; // 'contact'
      } else {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              currentId = id;
            }
          }
        }
      }

      const matchingLink = container.querySelector(`.cine-nav-link[data-section="${currentId}"]`);
      if (matchingLink && !matchingLink.classList.contains('active')) {
        navLinks.forEach(l => l.classList.remove('active'));
        matchingLink.classList.add('active');
        updateSlider(matchingLink);
      }

      // Also update mobile drawer active state
      const matchingMobileLink = container.querySelector(`.cine-mobile-nav-link[data-section="${currentId}"]`);
      if (matchingMobileLink && !matchingMobileLink.classList.contains('active')) {
        container.querySelectorAll('.cine-mobile-nav-link').forEach(l => l.classList.remove('active'));
        matchingMobileLink.classList.add('active');
      }
    };

    // Attach listeners across window, document and body for rock-solid event capture
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    document.addEventListener('scroll', onScrollSpy, { passive: true });
    document.body.addEventListener('scroll', onScrollSpy, { passive: true });

    window.addEventListener('resize', () => {
      const activeLink = container.querySelector('.cine-nav-link.active') || navLinks[0];
      updateSlider(activeLink);
    });

    window.addEventListener('hashchange', () => {
      setTimeout(onScrollSpy, 60);
    });

    // Set initial position immediately and after styles/fonts settle
    const initSliderPos = () => {
      const hashId = window.location.hash ? window.location.hash.replace('#', '') : null;
      let activeLink = hashId ? container.querySelector(`.cine-nav-link[data-section="${hashId}"]`) : null;
      if (!activeLink) {
        activeLink = container.querySelector('.cine-nav-link.active') || navLinks[0];
      }
      if (activeLink) {
        navLinks.forEach(l => l.classList.remove('active'));
        activeLink.classList.add('active');
        updateSlider(activeLink);
      }
    };

    initSliderPos();
    setTimeout(initSliderPos, 100);
    setTimeout(initSliderPos, 350);
    setTimeout(onScrollSpy, 400);

    // Smooth Anchor Scrolling and Slider Movement on Click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          isClickScrolling = true;
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          updateSlider(link);

          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, '', `#${targetId}`);
          }

          clearTimeout(clickScrollTimer);
          clickScrollTimer = setTimeout(() => {
            isClickScrolling = false;
            onScrollSpy();
          }, 850);
        }
      });
    });

    // Also hook other anchor CTA buttons (Hire Me, Explore Projects, Chat with AI, etc.)
    const otherSectionLinks = container.querySelectorAll('a[href^="#"]');
    otherSectionLinks.forEach(anchor => {
      if (anchor.classList.contains('cine-nav-link') || anchor.classList.contains('cine-mobile-nav-link')) return;
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl && sectionIds.includes(targetId)) {
          e.preventDefault();
          isClickScrolling = true;
          const matchingLink = container.querySelector(`.cine-nav-link[data-section="${targetId}"]`);
          if (matchingLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            matchingLink.classList.add('active');
            updateSlider(matchingLink);
          }
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, '', `#${targetId}`);
          }
          clearTimeout(clickScrollTimer);
          clickScrollTimer = setTimeout(() => {
            isClickScrolling = false;
            onScrollSpy();
          }, 850);
        }
      });
    });

    // Mobile Navigation Drawer Toggle & Tap Interactions
    const mobileToggle = container.querySelector('#cine-mobile-toggle');
    const mobileDrawer = container.querySelector('#cine-mobile-drawer');
    const mobileLinks = container.querySelectorAll('.cine-mobile-nav-link');

    const toggleMobileMenu = (forceClose = false) => {
      if (!mobileDrawer || !mobileToggle) return;
      if (forceClose || mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('open');
      }
    };

    mobileToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetId);
        toggleMobileMenu(true);
        if (targetEl) {
          isClickScrolling = true;
          mobileLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          const matchingLink = container.querySelector(`.cine-nav-link[data-section="${targetId}"]`);
          if (matchingLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            matchingLink.classList.add('active');
            updateSlider(matchingLink);
          }
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, '', `#${targetId}`);
          }
          clearTimeout(clickScrollTimer);
          clickScrollTimer = setTimeout(() => {
            isClickScrolling = false;
            onScrollSpy();
          }, 850);
        }
      });
    });

    // Close mobile drawer when tapping outside or tapping mobile CTA
    document.addEventListener('click', (e) => {
      if (mobileDrawer?.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileToggle?.contains(e.target)) {
        toggleMobileMenu(true);
      }
    });

    const mobileHireBtn = container.querySelector('.btn-mobile-hire');
    mobileHireBtn?.addEventListener('click', () => {
      toggleMobileMenu(true);
    });

    // 4. Project Filtering
    const filterBtns = container.querySelectorAll('.cine-filter-btn');
    const projectsGrid = container.querySelector('#cine-projects-grid');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.activeFilter = filter;
        projectsGrid.innerHTML = this.renderProjectCards(filter);
        Tilt3D.attach(projectsGrid.querySelectorAll('.cine-project-card'), { maxTilt: 8, scale: 1.02, glare: true });
      });
    });

    // 5. AI Assistant Interactions (Structured Bullet Point Answers)
    const chatLog = container.querySelector('#cine-chat-log');
    const aiForm = container.querySelector('#cine-ai-form');
    const aiInput = container.querySelector('#cine-ai-input');
    const suggestionChips = container.querySelectorAll('.ai-suggest-chip');

    const formatAiResponse = (raw) => {
      if (!raw) return '';

      // Standardize inline numbered lists (e.g. 1) ... 2) ...) and bullets into clean newlines
      let normalized = raw
        .replace(/([.!?:]?)\s+(?:and\s+)?([1-9]\d?[\.\)])\s+/g, '$1\n• ')
        .replace(/([.!?:]?)\s+(?:and\s+)?([•\-])\s+/g, '$1\n• ');

      const rawLines = normalized.split('\n');
      const htmlLines = [];

      for (let rawLine of rawLines) {
        let line = rawLine.trim();
        if (!line) continue;

        const isBullet = line.startsWith('•') || line.startsWith('-') || /^([1-9]\d?[\.\)]|[•\-\*])/.test(line);
        let content = line.replace(/^([•\-\*]|[1-9]\d?[\.\)])\s*/, '');

        // HTML escape special characters
        let safe = content
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        // Bold and italic markdown
        safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Markdown links [label](url)
        safe = safe.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="ai-chat-link">$1</a>');

        if (isBullet) {
          htmlLines.push(`
            <div class="ai-bullet-item">
              <span class="ai-bullet-icon">🔹</span>
              <div class="ai-bullet-text">${safe}</div>
            </div>
          `);
        } else {
          htmlLines.push(`<div class="ai-para-item">${safe}</div>`);
        }
      }

      return htmlLines.join('');
    };

    const handleAsk = async (query) => {
      if (!query.trim()) return;

      // Append User Message
      const userMsg = document.createElement('div');
      userMsg.className = 'cine-chat-msg user';
      userMsg.textContent = `Q: ${query}`;
      chatLog.appendChild(userMsg);

      // Loading Placeholder
      const loadingMsg = document.createElement('div');
      loadingMsg.className = 'cine-chat-msg assistant';
      loadingMsg.innerHTML = '<span style="opacity: 0.7;">Thinking... searching Abhishek\'s verified credentials...</span>';
      chatLog.appendChild(loadingMsg);
      chatLog.scrollTop = chatLog.scrollHeight;

      try {
        const answer = await aiService.query(query);
        loadingMsg.innerHTML = formatAiResponse(answer);
      } catch (err) {
        console.error('AI query error:', err);
        loadingMsg.innerHTML = "I am ready to assist! Please ask about Abhishek's <strong>CGPA (8.73)</strong>, <strong>VLSI internship</strong>, <strong>SAIL automation</strong>, <strong>IEEE publication</strong>, or <strong>projects in the last 6 months</strong>.";
      }
      chatLog.scrollTop = chatLog.scrollHeight;
    };

    aiForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = aiInput.value;
      aiInput.value = '';
      handleAsk(q);
    });

    suggestionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-q');
        handleAsk(q);
      });
    });

    // 7. Contact Form Submission
    const contactForm = container.querySelector('#cine-contact-form');
    const feedback = container.querySelector('#cine-form-feedback');
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector('#cine-name').value;
      const role = container.querySelector('#cine-role').value;
      const msg = container.querySelector('#cine-msg').value;

      if (feedback) {
        feedback.style.display = 'block';
        feedback.textContent = `✓ Thank you ${name}! Your interview invite regarding "${role}" has been recorded.`;
      }

      // Open email client prefilled
      const mailto = `mailto:abhishek1297kumar@gmail.com?subject=Placement Opportunity: ${encodeURIComponent(role)} from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}`;
      window.open(mailto, '_blank');
      contactForm.reset();
    });
  }
}
