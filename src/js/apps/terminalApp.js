// macOS Zsh Terminal App
import { resumeData } from '../data/resumeData.js';

export class TerminalApp {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
  }

  render() {
    return `
      <div class="terminal-app-container">
        <div class="terminal-body" id="terminal-body">
          <div class="terminal-output" id="terminal-output">
            <div class="term-line term-welcome">Last login: ${new Date().toLocaleString()} on ttys001</div>
            <div class="term-line term-banner">
              =======================================================<br>
              &nbsp;&nbsp; Abhishek Kumar — Interactive Placement Terminal<br>
              &nbsp;&nbsp;B.Tech ECE (Class of 2027) | IEM Kolkata | CGPA: 8.73<br>
              =======================================================<br>
              Type '<span class="term-highlight">help</span>' to list available commands or '<span class="term-highlight">whoami</span>' to begin.
            </div>
          </div>
          <div class="terminal-prompt-line">
            <span class="prompt-user">abhishek@macbook-pro</span>
            <span class="prompt-separator">:</span>
            <span class="prompt-path">~</span>
            <span class="prompt-symbol">%</span>
            <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" autofocus />
          </div>
        </div>
      </div>
    `;
  }

  executeCommand(cmdRaw, outputEl) {
    const cmd = cmdRaw.trim().toLowerCase();
    const parts = cmd.split(' ');
    const mainCmd = parts[0];

    // Add command echo
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line term-cmd-echo';
    echoLine.innerHTML = `<span class="prompt-user">abhishek@macbook-pro</span><span class="prompt-separator">:</span><span class="prompt-path">~</span><span class="prompt-symbol">%</span> ${this.escapeHTML(cmdRaw)}`;
    outputEl.appendChild(echoLine);

    if (!cmd) return;

    let response = '';

    switch (mainCmd) {
      case 'help':
        response = `
<div class="term-help-grid">
  <div><span class="term-cmd">help</span></div><div>Show list of commands</div>
  <div><span class="term-cmd">whoami</span></div><div>Display candidate summary & elevator pitch</div>
  <div><span class="term-cmd">skills</span></div><div>List technical domains, languages & tools</div>
  <div><span class="term-cmd">projects</span></div><div>List hardware, IoT & software projects</div>
  <div><span class="term-cmd">education</span></div><div>Display IEM Kolkata & MGM Bokaro credentials</div>
  <div><span class="term-cmd">internships</span></div><div>Display Jadavpur Univ & SAIL experiences</div>
  <div><span class="term-cmd">publications</span></div><div>Display IEEE conference publication</div>
  <div><span class="term-cmd">hire</span></div><div>Why should our company hire Abhishek?</div>
  <div><span class="term-cmd">contact</span></div><div>Display email, phone, GitHub, LinkedIn</div>
  <div><span class="term-cmd">cat resume</span></div><div>Output full plain-text resume</div>
  <div><span class="term-cmd">neofetch</span></div><div>Display system specifications</div>
  <div><span class="term-cmd">clear</span></div><div>Clear terminal screen</div>
</div>`;
        break;

      case 'whoami':
        response = `
<div class="term-box">
  <span class="term-bold">${resumeData.personal.name}</span> (${resumeData.personal.tagline})<br>
  📍 ${resumeData.personal.location}<br>
  🎓 CGPA: 8.73 in B.Tech ECE (Institute of Engineering & Management, Kolkata)<br>
  ⚡ Published IEEE Author (IEMENTECH 2026) | VLSI Intern (Jadavpur Univ) | Automation Trainee (SAIL)<br>
  💼 Target: Embedded Software, VLSI / Hardware Co-Design, Firmware & Python/Systems Roles.
</div>`;
        break;

      case 'skills':
        response = `
<div class="term-section-title">=== TECHNICAL SKILLS & PROFICIENCY ===</div>
<br>
<span class="term-bold">Programming Languages:</span><br>
• C / C++          [====================] 92% (Primary Systems Language)<br>
• Embedded C       [=================== ] 90% (Firmware, Microcontrollers)<br>
• Python           [====================] 94% (AI, Backend, Automation)<br>
• MATLAB           [=================   ] 85% (Simulation & Modeling)<br>
• JS / TypeScript  [=================   ] 82% (Web & Tooling)<br>
<br>
<span class="term-bold">Hardware & Embedded Domains:</span><br>
• Microprocessors & Microcontrollers (ARM, ESP, 8051, AVR)<br>
• Hardware Interfacing: GPIO, UART, SPI, I2C Buses<br>
• VLSI Design & EDA Workflows (IC Fabrication Flow, Bare-metal pipelines)<br>
• Control Systems, Finite State Machines (FSM), Real-Time Processing<br>
<br>
<span class="term-bold">Tools & Platforms:</span><br>
Xilinx Vivado, Wokwi Simulator, Git, CI/CD, Agile (Jira), Linux/Bash, Django, LaTeX.`;
        break;

      case 'projects':
        response = `
<div class="term-section-title">=== NOTABLE ENGINEERING PROJECTS ===</div>
<br>
${resumeData.projects.map((p, i) => `
<div class="term-proj-item">
  <span class="term-cmd">${i + 1}. ${p.title}</span> [${p.badge}]<br>
  &nbsp;&nbsp;Tech: ${p.tags.join(', ')}<br>
  &nbsp;&nbsp;Desc: ${p.description}<br>
  &nbsp;&nbsp;Link: <a href="${p.githubUrl}" target="_blank" class="term-link">${p.githubUrl}</a>
</div>
`).join('<br>')}`;
        break;

      case 'education':
        response = `
<div class="term-section-title">=== ACADEMIC CREDENTIALS ===</div>
<br>
${resumeData.education.map(e => `
<div>
  <span class="term-bold">${e.institution}</span> (${e.location})<br>
  ${e.degree} | ${e.duration}<br>
  <span class="term-highlight">${e.score}</span>
</div>
`).join('<br>')}`;
        break;

      case 'internships':
        response = `
<div class="term-section-title">=== INDUSTRIAL INTERNSHIPS ===</div>
<br>
${resumeData.internships.map(intern => `
<div>
  <span class="term-bold">${intern.role}</span> — ${intern.organization} (${intern.location})<br>
  Duration: ${intern.duration} | Type: ${intern.type}<br>
  ${intern.points.map(pt => `• ${pt}`).join('<br>')}<br>
  Skills: ${intern.skillsUsed.join(', ')}
</div>
`).join('<br>')}`;
        break;

      case 'publications':
        response = `
<div class="term-section-title">=== IEEE PUBLICATIONS ===</div>
<br>
<span class="term-bold">${resumeData.publications[0].venue}</span><br>
Title: "${resumeData.publications[0].title}"<br>
Status: ${resumeData.publications[0].status}<br>
DOI: <a href="${resumeData.publications[0].link}" target="_blank" class="term-link">${resumeData.publications[0].doi}</a><br>
Summary: ${resumeData.publications[0].summary}`;
        break;

      case 'hire':
        response = `
<div class="term-section-title">=== WHY HIRE ABHISHEK KUMAR? ===</div>
<br>
${resumeData.placementPitch.keyStrengths.map((s, i) => `${i + 1}. ${s}`).join('<br><br>')}
<br><br>
<span class="term-highlight">Immediate Placement Availability. Prepared for technical and algorithmic rounds.</span>`;
        break;

      case 'contact':
        response = `
<div class="term-box">
  <span class="term-bold">Get In Touch with Abhishek Kumar:</span><br>
  🌐 Portfolio: <a href="${resumeData.personal.portfolio}" target="_blank" class="term-link">${resumeData.personal.portfolio}</a><br>
  📧 Email: <a href="mailto:${resumeData.personal.email}" class="term-link">${resumeData.personal.email}</a><br>
  📞 Phone: ${resumeData.personal.phone}<br>
  💼 LinkedIn: <a href="${resumeData.personal.linkedin}" target="_blank" class="term-link">${resumeData.personal.linkedin}</a><br>
  🐙 GitHub: <a href="${resumeData.personal.github}" target="_blank" class="term-link">${resumeData.personal.github}</a><br>
  📍 Address: ${resumeData.personal.address}
</div>`;
        break;

      case 'cat':
        if (parts[1] === 'resume' || parts[1] === 'resume.txt' || parts[1] === 'resume.pdf') {
          response = `
<div class="term-cat-resume">
============================================================<br>
ABHISHEK KUMAR<br>
${resumeData.personal.address} | ${resumeData.personal.phone}<br>
${resumeData.personal.email} | ${resumeData.personal.linkedin}<br>
============================================================<br>
ABOUT ME:<br>
${resumeData.personal.summary}<br><br>
EDUCATION:<br>
• B.Tech ECE, IEM Kolkata (2023-2027) | CGPA: 8.73<br>
• Class 12, MGM Bokaro (2023) | 86.5%<br>
• Class 10, MGM Bokaro (2021) | 95.0%<br><br>
INTERNSHIPS:<br>
• VLSI Design Intern @ Jadavpur University (Dec 2025 - Jan 2026)<br>
• Vocational Trainee @ Steel Authority of India Limited (May - June 2025)<br><br>
PUBLICATIONS:<br>
• IEEE IEMENTECH 2026: Enhancing Wearable Depression Management (DOI: 10.1109/IEMENTech202669403.2026.11434403)<br><br>
SKILLS:<br>
Microcontrollers, Embedded C, C++, Python, MATLAB, Vivado, Wokwi, Git, GPIO/UART/SPI/I2C.
</div>`;
        } else {
          response = `cat: ${parts[1] || 'file'}: No such file or directory. Try 'cat resume'.`;
        }
        break;

      case 'clear':
        outputEl.innerHTML = '';
        return;

      case 'neofetch':
        response = `
<pre class="neofetch-art">
   <span class="nf-apple">                    'c.          </span> <span class="nf-bold">abhishek@macbook-pro</span>
   <span class="nf-apple">                 ,xNMM.          </span> --------------------
   <span class="nf-apple">               .OMMMMo           </span> <span class="nf-bold">OS:</span> macOS Sequoia 15.0
   <span class="nf-apple">               OMMM0,            </span> <span class="nf-bold">Host:</span> MacBook Pro (16-inch, M3 Max)
   <span class="nf-apple">     .;loddo:' loolloddol;.      </span> <span class="nf-bold">Candidate:</span> Abhishek Kumar
   <span class="nf-apple">   cKMMMMMMMMMMNWMMMMMMMMMM0:    </span> <span class="nf-bold">Degree:</span> B.Tech in ECE (2023–2027)
   <span class="nf-apple"> .KMMMMMMMMMMMMMMMMMMMMMMMWd.   </span> <span class="nf-bold">College:</span> IEM Kolkata
   <span class="nf-apple"> XMMMMMMMMMMMMMMMMMMMMMMMX.     </span> <span class="nf-bold">CGPA:</span> 8.73 / 10.0
   <span class="nf-apple">;MMMMMMMMMMMMMMMMMMMMMMMM:      </span> <span class="nf-bold">Paper:</span> IEEE IEMENTECH 2026
   <span class="nf-apple">:MMMMMMMMMMMMMMMMMMMMMMMM:      </span> <span class="nf-bold">Internships:</span> Jadavpur Univ & SAIL
   <span class="nf-apple">.MMMMMMMMMMMMMMMMMMMMMMMMX.     </span> <span class="nf-bold">Shell:</span> zsh 5.9 (x86_64-apple-darwin24.0)
   <span class="nf-apple"> kMMMMMMMMMMMMMMMMMMMMMMMMWd.   </span> <span class="nf-bold">Uptime:</span> 6 Semesters Completed
   <span class="nf-apple">  .XMMMMMMMMMMMMMMMMMMMMMMMMk   </span> <span class="nf-bold">Memory:</span> 94% Python, 92% C++, 90% Emb-C
   <span class="nf-apple">    .cooollllllccccllllllol.    </span>
</pre>`;
        break;

      default:
        response = `zsh: command not found: ${this.escapeHTML(mainCmd)}. Type '<span class="term-highlight">help</span>' for a list of commands.`;
        break;
    }

    if (response) {
      const respLine = document.createElement('div');
      respLine.className = 'term-line term-response';
      respLine.innerHTML = response;
      outputEl.appendChild(respLine);
    }
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  initListeners(container) {
    const input = container.querySelector('#terminal-input');
    const outputEl = container.querySelector('#terminal-output');
    const termBody = container.querySelector('#terminal-body');

    termBody.addEventListener('click', () => {
      input.focus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        if (val.trim()) {
          this.history.push(val);
          this.historyIndex = this.history.length;
        }
        this.executeCommand(val, outputEl);
        input.value = '';
        termBody.scrollTop = termBody.scrollHeight;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex -= 1;
          input.value = this.history[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex += 1;
          input.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          input.value = '';
        }
      }
    });
  }
}
