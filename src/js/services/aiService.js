// AI Assistant Service for Abhishek Kumar's Portfolio
import { resumeData } from '../data/resumeData.js';

export class AIService {
  constructor() {
    this.customApiKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('abhishek_portfolio_gemini_key') || '') : '';
    this.systemContext = this.buildSystemPrompt();
  }

  setApiKey(key) {
    this.customApiKey = key.trim();
    if (typeof localStorage !== 'undefined') {
      if (this.customApiKey) {
        localStorage.setItem('abhishek_portfolio_gemini_key', this.customApiKey);
      } else {
        localStorage.removeItem('abhishek_portfolio_gemini_key');
      }
    }
  }

  hasCustomKey() {
    return Boolean(this.customApiKey);
  }

  buildSystemPrompt() {
    return `You are "Siri for Abhishek", an intelligent, articulate, and highly professional placement agent representing Abhishek Kumar, a B.Tech Electronics and Communication Engineering (ECE) student (Class of 2027) at Institute of Engineering & Management (IEM), Kolkata.

Your job is to assist recruiters, hiring managers, and interviewers by providing crisp, accurate, and compelling details about Abhishek's qualifications, internships, projects, skills, and academic achievements.

Profile Highlights:
- Name: Abhishek Kumar
- Email: ${resumeData.personal.email} | Phone: ${resumeData.personal.phone}
- LinkedIn: ${resumeData.personal.linkedin} | GitHub: ${resumeData.personal.github}
- Education: B.Tech in ECE at IEM Kolkata (2023-2027), CGPA 8.73 (up to 6th sem). Class 12: 86.5%, Class 10: 95.0% (MGM Higher Secondary School Bokaro).
- Internships:
  1) VLSI Design Intern at Jadavpur University (Dec 2025 - Jan 2026): Bare-metal hardware optimization, IC design & fabrication flows, EDA tools, gate-level delays.
  2) Vocational Trainee at Steel Authority of India Limited (SAIL) (May 2025 - June 2025): Plant automation software modules, industrial database telemetry.
- Publications:
  1) IEEE IEMENTECH 2026: "Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy." (Published, DOI: 10.1109/IEMENTech202669403.2026.11434403).
- Projects:
  1) Piezo-Electric Acupressure Wearable (IoT, Wokwi, Embedded C, Sensors)
  2) Camera-Assisted Adaptive 7-State Traffic Controller (Xilinx Vivado, FSM in C)
  3) Embedded Night-Vision System for Pedestrian Detection (Active IR + Thermal sensors with YOLOv2 & HAAR) - Created/Updated in last 6 months (Sep 2026)
  4) Logistics Management System (Python/Django enterprise logistics) - Created/Updated in last 6 months (Sep 2026)
  5) YourFinance (Full-stack personal finance with Gemini AI) - Created/Updated in last 6 months (Jul 2026)
  6) EverShop (TypeScript, React, GraphQL eCommerce) - Created/Updated in last 6 months (Aug 2026)
  7) Cybersecurity Suite (Image encryption using pixel manipulation, Caesar cipher, password checker, keylogger)
- Core Skills: Microprocessors, Microcontrollers, Embedded C, C/C++, Python, MATLAB, JavaScript/TypeScript, Hardware Interfacing (GPIO, UART, SPI, I2C), VLSI Design, Xilinx Vivado, Wokwi, Git, Agile/Jira.
- Certifications: Internet of Things and AI Cloud (UC San Diego / Coursera).
- Activities: IEEE, IEEE MTT-S, IEEE CAS-S Member, SYTRON '25 Volunteer.

Always answer warmly, concisely, and with persuasive evidence of Abhishek's technical readiness for placements.`;
  }

  async ask(query) {
    const cleanQuery = query.trim();
    if (!cleanQuery) return "Please enter a question about Abhishek's skills, projects, or background.";

    // If user provided a Gemini API Key, try live Gemini API first
    if (this.customApiKey) {
      try {
        const liveAnswer = await this.callGeminiAPI(cleanQuery);
        if (liveAnswer) return liveAnswer;
      } catch (err) {
        console.warn("Live Gemini API call failed, falling back to local semantic intelligence:", err);
      }
    }

    // High-precision local semantic matching engine
    return this.localSemanticSearch(cleanQuery);
  }

  async query(query) {
    return this.ask(query);
  }

  async callGeminiAPI(query) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.customApiKey}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${this.systemContext}\n\nUser Question: ${query}\n\nAnswer concisely in 2-4 sentences with markdown formatting:` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 300
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  }

  localSemanticSearch(query) {
    const qLower = query.toLowerCase();

    // 1. Direct match with curated Q&A knowledge base
    let bestMatch = null;
    let maxMatches = 0;

    for (const item of resumeData.qaKnowledgeBase) {
      let count = 0;
      for (const kw of item.keywords) {
        if (qLower.includes(kw)) {
          count += 1;
        }
      }
      if (count > maxMatches) {
        maxMatches = count;
        bestMatch = item.answer;
      }
    }

    if (maxMatches >= 1) {
      return bestMatch;
    }

    // 2. Specific intent handlers
    if (qLower.includes('who') || qLower.includes('abhishek') || qLower.includes('intro') || qLower.includes('about')) {
      return `**${resumeData.personal.name}** is an Electronics & Communication Engineering undergraduate (Class of 2027) at **Institute of Engineering & Management (IEM), Kolkata** with a **8.73 CGPA**.\n\nHe specializes in **Embedded Systems, Hardware-Software Co-Design, and Software Engineering (Python/C++)**. He has published research with IEEE (IEMENTECH 2026) and completed industrial internships at **Jadavpur University** (VLSI Design) and **SAIL** (Plant Automation).`;
    }

    if (qLower.includes('project') || qLower.includes('work') || qLower.includes('portfolio') || qLower.includes('build')) {
      return `Abhishek has engineered standout projects across hardware, AI, and software:\n\n` +
        `• **Embedded Night-Vision System** (Recent): Active IR + Thermal sensor fusion with YOLOv2 for pedestrian recognition.\n` +
        `• **Piezo-electric Acupressure Wearable**: Microcontroller IoT system harvesting kinetic energy for depression management (Published in IEEE).\n` +
        `• **Camera-Assisted 7-State Traffic Controller**: Dynamic algorithmic FSM in C simulated on Xilinx Vivado.\n` +
        `• **Logistics Management System**: Enterprise multi-dealer tracking engine in Python/Django.\n` +
        `• **YourFinance**: Budget control center powered by Google Gemini AI.`;
    }

    if (qLower.includes('intern') || qLower.includes('experience') || qLower.includes('company') || qLower.includes('work experience')) {
      return `Abhishek has completed two high-impact internships:\n\n` +
        `1. **VLSI Design Intern @ Jadavpur University** (Dec 2025 - Jan 2026): Optimized IC architectures and analyzed time-critical processing pipelines using EDA tools in bare-metal environments.\n` +
        `2. **Vocational Trainee @ Steel Authority of India Limited (SAIL)** (May 2025 - June 2025): Developed plant automation modules and managed telemetry databases for industrial manufacturing lines.`;
    }

    if (qLower.includes('education') || qLower.includes('college') || qLower.includes('school') || qLower.includes('iem')) {
      return `Abhishek's academic qualifications:\n\n` +
        `• **B.Tech in ECE**: Institute of Engineering & Management (IEM), Kolkata (2023–2027) — **CGPA: 8.73**\n` +
        `• **Class 12 (CBSE)**: M.G.M. Higher Secondary School, Bokaro (2023) — **86.5%**\n` +
        `• **Class 10 (CBSE)**: M.G.M. Higher Secondary School, Bokaro (2021) — **95.0%**`;
    }

    if (qLower.includes('skill') || qLower.includes('language') || qLower.includes('tool') || qLower.includes('python') || qLower.includes('c++')) {
      return `Abhishek's technical stack:\n\n` +
        `• **Core Languages**: C, C++, Embedded C, Python, MATLAB, JavaScript/TypeScript, OOP\n` +
        `• **Embedded & Hardware**: Microcontrollers (ARM/AVR/ESP), GPIO/UART/SPI/I2C interfacing, Digital Logic, FSMs, Control Systems\n` +
        `• **Tools & Platforms**: Xilinx Vivado, Wokwi Simulator, EDA tools, Git/GitHub, CI/CD, Agile/Jira, LaTeX\n` +
        `• **Frameworks & Cloud**: Django, REST APIs, UC San Diego IoT & AI Cloud certification`;
    }

    if (qLower.includes('hire') || qLower.includes('placement') || qLower.includes('recruit') || qLower.includes('role')) {
      return `**Top Reasons to Hire Abhishek Kumar:**\n\n` +
        `1. **Strong Academic Pedigree**: 8.73 CGPA with deep grasp of control systems, digital logic, and algorithms.\n` +
        `2. **Dual-Spectrum Competency**: Rare skill combination of bare-metal embedded firmware/VLSI + modern high-level Python/web/AI engineering.\n` +
        `3. **Published IEEE Author**: Demonstrates independent research, peer-reviewed rigor, and creative problem-solving.\n` +
        `4. **Industrial Proof**: Proven delivery in bare-metal EDA research at Jadavpur Univ and plant automation at SAIL.`;
    }

    if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('linkedin')) {
      return `Get in touch with Abhishek:\n\n` +
        `• **Email**: [abhishek1297kumar@gmail.com](mailto:abhishek1297kumar@gmail.com)\n` +
        `• **Phone**: +91 9470303282\n` +
        `• **LinkedIn**: [linkedin.com/in/abhishek947kumar](https://www.linkedin.com/in/abhishek947kumar)\n` +
        `• **GitHub**: [github.com/abhishek947kumar](https://github.com/abhishek947kumar)`;
    }

    // Default intelligent overview
    return `Abhishek Kumar is a B.Tech ECE student at IEM Kolkata (CGPA 8.73, Class of 2027) with an IEEE publication at IEMENTECH 2026, VLSI internship at Jadavpur University, industrial training at SAIL, and multiple recent projects in Embedded Systems (YOLOv2 Night-Vision, Piezoelectric wearable, 7-state Vivado traffic controller) and Software/AI.\n\nFeel free to ask about his **CGPA**, **internships**, **projects from the last 6 months**, **IEEE paper**, or **why you should hire him**!`;
  }
}

export const aiService = new AIService();
