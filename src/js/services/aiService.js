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
    return `You are the "Placement Resume Assistant" for Abhishek Kumar, an articulate, technically authoritative representative of Abhishek Kumar — B.Tech Electronics and Communication Engineering (ECE) candidate (Class of 2027) at Institute of Engineering & Management (IEM), Kolkata.

Your mission is to assist recruiters, engineering leads, and hiring managers by delivering concise, accurate, and persuasive technical details regarding Abhishek's engineering projects, academic credentials, research publications, industrial internships, and core skill stack.

Candidate Profile & Credentials:
- Name: Abhishek Kumar | Email: ${resumeData.personal.email} | Phone: ${resumeData.personal.phone}
- LinkedIn: ${resumeData.personal.linkedin} | GitHub: ${resumeData.personal.github} | Portfolio: ${resumeData.personal.portfolio}
- Academic Record: B.Tech in ECE at IEM Kolkata (2023–2027), CGPA 8.73 (up to 6th sem). CBSE Class 12: 86.5%, Class 10: 95.0% (MGM Higher Secondary School, Bokaro).
- Research & Publication: First Author, IEEE IEMENTECH 2026: "Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy" (DOI: 10.1109/IEMENTech202669403.2026.11434403).
- Internships:
  1) VLSI Design Intern @ Jadavpur University (Dec 2025 – Jan 2026): IC design & fabrication flows, bare-metal hardware optimization, EDA simulation tools, gate-level delays.
  2) Vocational Trainee @ Steel Authority of India Limited (SAIL) (May 2025 – June 2025): Real-time plant automation software modules, industrial database telemetry, fault logging.

Flagship Engineering Projects (Verified on GitHub @abhishek947kumar):
1) 32-Bit 5-Stage Pipelined MIPS Processor Core (Released Oct 23, 2026):
   - Patterson & Hennessy 5-stage RISC pipeline (IF -> ID -> EX -> MEM -> WB) in Verilog HDL.
   - Hardware forwarding unit (EX-to-EX & MEM-to-EX zero-stall ALU dependencies), hardware load-use hazard stall unit (1-cycle bubble), and branch flush control.
   - Synthesized on Xilinx Artix-7 Basys 3 FPGA (XC7A35TCPG236-1) in Vivado: 2,810 Slice LUTs (13.51%), 1,569 FFs (3.77%), 94 mW total power, 0 DRC violations.
   - Custom two-pass Python cross-assembler generating MIF/HEX files with 4/4 passing benchmark suites (Fibonacci, ALU, memory, hazard forwarding) and 7-segment display driver.
   - Tech: Verilog HDL, Xilinx Vivado, Artix-7 FPGA, Python Assembler, Computer Architecture.

2) Neural Image Caption Studio (Released Oct 17, 2026):
   - Full-stack multimodal vision-language generator using merged CNN (MobileNetV3 / ResNet-50) + LSTM language decoder trained on Flickr8k.
   - Dual decoding: ultra-fast greedy argmax search and multi-trajectory Beam Search with length penalty normalization (alpha=0.7).
   - Interactive Cyber-Neural Web Studio: token-level softmax probability inspector tray, Web Speech API TTS, and BLEU-1 to BLEU-4 benchmark lab.
   - Offline feature vector caching (features_cache.pt) enabling epoch training in seconds.
   - Tech: PyTorch, Python, FastAPI, Deep Learning, Computer Vision, LSTM, Beam Search.

3) ReturnGuard — Autonomous ReAct E-Commerce Refund Agent (Released Oct 17, 2026):
   - Autonomous ReAct (Reasoning and Acting) cognitive loop (Thought -> Action -> Observe) for governed e-commerce returns.
   - Multimodal computer vision inspection evaluating product defect photos (cracked screens, broken seals, carton damage).
   - Strict AI safety guardrails: hard $500 autonomous ceiling, anti-hallucination grounding, and Human-in-the-Loop (HITL) supervisor triage desk.
   - Dynamic anti-fraud rules across 6 retail categories mitigating wardrobing and empty-box claims with sub-850ms latency and ~81% resolution throughput.
   - Tech: Python, FastAPI, React 18, Autonomous Agents, Multimodal Vision, AI Governance.

4) PlateVision AI — Automatic License Plate Recognition (Released Oct 05, 2026):
   - End-to-end ALPR/ANPR system with an 8-stage Computer Vision pipeline: Bilateral Filtering, Morphological TopHat/BlackHat, Canny edge detection, Aspect Ratio ($1.5 <= AR <= 6.0$) & Solidity Filtering, and Perspective Transform / Deskewing.
   - Multi-PSM Tesseract OCR ensemble (--psm 8, 7, 6) with character whitelisting and regex sanitization.
   - Dual-engine comparison (Baseline OpenCV vs Advanced Enhanced Pipeline) resolving glare, shadows, and steep angles.
   - Interactive glassmorphic dark web dashboard with live camera feeds and FastAPI REST API.
   - Tech: Python, OpenCV, Tesseract OCR, Computer Vision, FastAPI, Docker.

5) FraudGuard.AI (Released Sep 30, 2026):
   - Real-time credit card fraud detection platform evaluating transactions in sub-2.8ms.
   - Cost-weighted ML ensemble: XGBoost, Balanced Random Forest, HistGradientBoosting, and Isolation Forest with 100% recall & 1.000 PR-AUC under 1% fraud class imbalance.
   - Feature engineering computes physical geo-velocity in km/h (catches impossible travel & card cloning), velocity surges, and 30-day cardholder spend ratios.
   - Explainable AI (XAI) diagnostics compliant with FCRA & GDPR Art. 22 standards, mapping into automated tiered actions (AUTO_APPROVE, STEP_UP_AUTH OTP challenge, DECLINE_AND_FREEZE).
   - Tech: Python, FastAPI, XGBoost, Scikit-Learn, REST APIs.

2) Cloud DLP Shield (Released Sep 30, 2026):
   - Enterprise Cloud Data Loss Prevention (DLP) and application security platform.
   - Dual-Engine inspection gateway: Layer 1 Content Engine intercepts full-spectrum SQLi AST signatures (Tautology, Union exfiltration, Schema harvesting), Luhn card validation, anti-keylogger protection. Layer 2 Contextual Engine analyzes user behavior, query velocity bursts, and typing cadences (<15ms).
   - AESX Authenticated Field Encryption: Zero-trust AES-256-GCM authenticated encryption with key whitening and 128-bit AuthTags preventing bit-flipping.
   - Threat categorization (Benign, Suspicious, Assaulter) serving deceptive Honeytokens to attackers.
   - Real-time SOC observability via Server-Sent Events (SSE), AST sandbox terminal, and toggleable 'DLP Shield vs Vulnerable Raw SQL' storefront.
   - Tech: JavaScript, Node.js, Express, AES-256-GCM, Server-Sent Events.

3) SplitFlow (Released Sep 29, 2026):
   - Smart group expense management and debt settlement engine.
   - Greedy debt minimization algorithm simplifying circular group debts into minimal transactions, rendered via dynamic Canvas/SVG debt graphs.
   - OCR receipt parser extracting itemized totals, taxes, and service fees for custom unequal splits.
   - Real-time multi-currency conversion via live exchange rate APIs, instant UPI QR payments, and audit-ready PDF/CSV/Excel ledgers.
   - Tech: JavaScript, Web APIs, OCR Scanner, Graph Algorithms, D3 / Canvas, UPI QR.

4) PulseFlow Agile (Released Sep 29, 2026):
   - Enterprise agile project management and telemetry platform.
   - Bidirectional WebSockets real-time synchronization with optimistic UI state and conflict resolution.
   - D3.js interactive sprint burndown, velocity distribution, and cumulative flow diagrams computed in real time.
   - AI Copilot for drafting user stories, acceptance criteria, blocker triage, and velocity forecasting.
   - Drag-and-drop Gantt roadmap timelines with milestone dependency resolution.
   - Tech: JavaScript, WebSockets, D3.js, AI Copilot, Agile / Scrum.

5) BitTrace DFIR (Released Sep 21, 2026):
   - Automated live volatile memory (RAM) and postmortem disk/registry Bitcoin forensic tool for Windows.
   - Recovers 12-24 word BIP-39 mnemonic seeds and WIF/Hex private keys from running wallet processes with aligned byte Hex/ASCII memory viewer.
   - Postmortem parsing of %APPDATA% Berkeley DB wallet.dat files, Windows Prefetch (.pf) execution logs, UserAssist ROT13 keys, and browser SQLite shadow copying.
   - ISO/IEC 27037 compliant cryptographic evidence vault computing SHA-256 and MD5 hashes with court-ready printable PDF/HTML reports.
   - Tech: Python, FastAPI, React 18, Windows API, Cryptography.

6) Embedded Night-Vision System for Pedestrian Detection (Released Sep 19, 2026):
   - Fuses active 850nm infrared illumination with LWIR thermal sensor streams for pedestrian recognition in pitch darkness.
   - Dual-stage pipeline: HAAR+AdaBoost candidate filter paired with custom-pruned, quantized YOLOv2 neural network on resource-constrained embedded edge hardware.
   - Tech: Python, Computer Vision, Thermal IR, YOLOv2, Sensor Fusion.

7) Logistics Management System / LogiTrack Pro (Released Sep 18, 2026):
   - Full-stack commercial multi-dealer logistics and fleet dispatch platform in Python and Django.
   - Multi-tenant architecture, JWT authentication, automated consignment manifests, route tracking, and shipment status webhooks.
   - Tech: Python, Django, PostgreSQL, REST APIs.

8) Piezo-Electric Wearable Acupressure Device (Published IEEE IEMENTECH 2026):
   - Self-sustaining IoT healthcare wearable designed in Embedded C and verified via Wokwi simulation.
   - Biomechanical energy harvesting using piezoelectric transducers combined with therapeutic acupressure stimulation over SPI/I2C buses.

9) Camera-Assisted Adaptive 7-State Traffic Controller:
   - Dynamic 7-state Finite State Machine (FSM) in C simulated on Xilinx Vivado with full timing analysis, cutting intersection queue latency by 35%.

Project-Validated Skills Matrix:
- AI & Machine Learning (95%): XGBoost Ensemble, Explainable AI (XAI / SHAP), Scikit-Learn, YOLOv2, Active IR/Thermal Sensor Fusion, Google Gemini LLM API, Geo-Velocity Calculation, PR-AUC.
- Cybersecurity & Digital Forensics (94%): Cloud DLP Architecture, AST SQLi Detection, AES-256-GCM Field Encryption, Volatile RAM Triage, ISO/IEC 27037 Evidence Handling, Windows Prefetch & Registry Analysis, Luhn Algorithm.
- FinTech & Real-Time Systems (92%): Greedy Graph Debt Minimization, Bidirectional WebSockets, Server-Sent Events (SSE), D3.js Sprint Burndown Telemetry, OCR Receipt Parsing, Live FX APIs, Dynamic UPI QR.
- Embedded Systems & VLSI (92%): Microcontrollers (ARM, AVR, ESP32), Embedded C, C/C++, Hardware Interfacing (SPI, I2C, UART, GPIO), Xilinx Vivado (7-State FSM), Wokwi Simulator, IC Fabrication & EDA Optimization.
- Backend & Full-Stack (91%): Python (FastAPI, Django), Node.js, Express, React 18, TypeScript, PostgreSQL, SQLite, REST APIs, Git/GitHub, CI/CD, Agile/Jira.

Always answer accurately, concisely, and with concrete technical proof from his repositories and credentials.`;
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
          maxOutputTokens: 350
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

    // 2. Specific intent handlers for project and skill inquiries
    if (qLower.includes('who') || qLower.includes('abhishek') || qLower.includes('intro') || qLower.includes('about')) {
      return `**${resumeData.personal.name}** is a **B.Tech ECE 4th year candidate** (Class of 2027) at **Institute of Engineering & Management (IEM), Kolkata** with an **8.73 CGPA**.\n\nHe combines deep bare-metal hardware/VLSI and processor architecture foundations (**32-bit Pipelined MIPS Core in Verilog HDL & Vivado FPGA**) with state-of-the-art software engineering across **Deep Learning & Multimodal AI (Neural Image Caption Studio, ReturnGuard ReAct Agent)**, **Cyber Defense (FraudGuard.AI, Cloud DLP Shield)**, **Computer Vision (PlateVision ALPR)**, and **Digital Forensics (BitTrace DFIR)**. He is a published first author with IEEE (IEMENTECH 2026) and completed internships at **Jadavpur University** and **SAIL**.`;
    }

    if (qLower.includes('project') || qLower.includes('work') || qLower.includes('portfolio') || qLower.includes('build') || qLower.includes('repo')) {
      return `Abhishek has engineered 18+ production projects across processor architecture, deep learning, cloud security, digital forensics, real-time systems, and embedded hardware:\n\n` +
        `• **32-Bit 5-Stage Pipelined MIPS Processor** (Oct 23, 2026): Custom Verilog RISC processor core with EX/MEM hardware forwarding, load-use hazard bubble unit, custom Python assembler, and Artix-7 Basys 3 FPGA synthesis in Vivado (94 mW, 0 DRC violations).\n` +
        `• **Neural Image Caption Studio** (Oct 17, 2026): Full-stack multimodal deep learning app combining CNN feature extractors (MobileNetV3/ResNet-50) with an autoregressive LSTM decoder, Beam Search, and token probability inspection.\n` +
        `• **ReturnGuard ReAct Agent** (Oct 17, 2026): Autonomous governed ReAct AI agent with multimodal computer vision defect inspection, anti-fraud rules, and Human-in-the-Loop triage.\n` +
        `• **PlateVision AI ALPR** (Oct 05, 2026): End-to-end 8-stage OpenCV license plate recognition pipeline with multi-PSM Tesseract OCR ensemble and FastAPI visualizer.\n` +
        `• **FraudGuard.AI** (Sep 30, 2026): Real-time credit card fraud detection in sub-2.8ms using an XGBoost ensemble, geo-velocity calculation, and Explainable AI (XAI).\n` +
        `• **Cloud DLP Shield** (Sep 30, 2026): Cloud Data Loss Prevention with AST SQLi interception, Luhn validation, AES-256-GCM authenticated field encryption, and live SSE SOC.\n` +
        `• **SplitFlow** (Sep 29, 2026): Smart group expense splitter featuring a greedy graph debt minimization engine, OCR receipt parsing, and UPI QR settlements.\n` +
        `• **PulseFlow Agile** (Sep 29, 2026): Collaborative agile workspace with bidirectional WebSockets, interactive D3.js sprint burndown telemetry, and AI Copilot.\n` +
        `• **BitTrace DFIR** (Sep 21, 2026): Automated live RAM and postmortem Bitcoin forensics tool for Windows compliant with ISO/IEC 27037.\n` +
        `• **Embedded Night-Vision System** (Sep 19, 2026): Active IR + thermal sensor fusion with quantized YOLOv2 for zero-lux pedestrian detection.\n` +
        `• **Logistics Management System** (Sep 18, 2026): Commercial multi-dealer supply chain and fleet tracking platform in Python and Django.\n` +
        `• **Piezoelectric Wearable Device**: Self-sustaining IoT healthcare wearable (Published in IEEE IEMENTECH 2026).\n` +
        `• **Camera-Assisted 7-State Traffic Controller**: Dynamic FSM in C synthesized on Xilinx Vivado reducing queue delays by 35%.\n` +
        `• **YourFinance & EverShop**: AI wealth management (Gemini AI API) and high-performance TypeScript/GraphQL eCommerce.`;
    }

    if (qLower.includes('skill') || qLower.includes('tech stack') || qLower.includes('technolog') || qLower.includes('stack') || qLower.includes('language') || qLower.includes('tool')) {
      return `Abhishek's skills are directly anchored in his production projects:\n\n` +
        `• **Processor Design, VLSI & Digital Logic (96%)**: Verilog HDL, MIPS32 5-stage pipelining, hazard detection & EX/MEM forwarding, Xilinx Vivado (Artix-7 Basys 3 FPGA), custom Python cross-assemblers, timing analysis (*MIPS Processor Core, Vivado Traffic FSM, Jadavpur Univ*).\n` +
        `• **Deep Learning, Multimodal AI & Vision (95%)**: PyTorch, CNN + LSTM encoder-decoder, Beam Search decoding (alpha=0.7), Autonomous ReAct agents, 8-stage OpenCV ALPR, Tesseract OCR ensemble, cost-weighted XGBoost, Explainable AI (XAI / SHAP), YOLOv2 (*Caption Studio, ReturnGuard, PlateVision, FraudGuard.AI*).\n` +
        `• **Cloud Security & Digital Forensics (94%)**: Cloud DLP architecture, AST SQLi interception, AES-256-GCM zero-trust field encryption, Live volatile RAM triage, ISO/IEC 27037 evidence vault, Luhn validation (*Cloud DLP Shield, BitTrace DFIR*).\n` +
        `• **FinTech & Real-Time Distributed Systems (92%)**: Greedy graph debt minimization, bidirectional WebSockets, Server-Sent Events (SSE), D3.js sprint burndown analytics, OCR parsing, live FX APIs (*SplitFlow, PulseFlow Agile, Cloud DLP SOC*).\n` +
        `• **Embedded Systems, Microcontrollers & IoT (93%)**: ARM/AVR/ESP32, Embedded C, C/C++, SPI/I2C/UART/GPIO, Wokwi IoT simulator, IC fabrication flows, bare-metal EDA optimization (*IEEE Wearable, Traffic Controller*).\n` +
        `• **Languages & Full-Stack (91%)**: Python (FastAPI, Django), Verilog HDL, C/C++, JavaScript/TypeScript, Node.js, Express, React 18, Docker, SQL (PostgreSQL, SQLite), MATLAB, Git/GitHub, CI/CD, Agile/Jira.`;
    }

    if (qLower.includes('intern') || qLower.includes('experience') || qLower.includes('company') || qLower.includes('work experience')) {
      return `Abhishek has completed two prestigious industrial internships:\n\n` +
        `1. **VLSI Design Intern @ Jadavpur University** (Dec 2025 – Jan 2026): Researched IC design and fabrication flows, evaluated time-critical bare-metal pipelines using EDA tools, and benchmarked gate-level delays.\n` +
        `2. **Vocational Trainee @ Steel Authority of India Limited (SAIL)** (May 2025 – June 2025): Developed and maintained real-time plant automation software modules, managed industrial telemetry databases, and worked on continuous process control.`;
    }

    if (qLower.includes('education') || qLower.includes('college') || qLower.includes('school') || qLower.includes('iem') || qLower.includes('cgpa') || qLower.includes('academic')) {
      return `Abhishek's verified academic track record:\n\n` +
        `• **B.Tech in ECE**: Institute of Engineering & Management (IEM), Kolkata (2023–2027) — **CGPA: 8.73** (up to 6th semester, top percentile of the department)\n` +
        `• **Class 12 (CBSE - PCM + IP)**: M.G.M. Higher Secondary School, Bokaro (2023) — **86.5%**\n` +
        `• **Class 10 (CBSE)**: M.G.M. Higher Secondary School, Bokaro (2021) — **95.0%**`;
    }

    if (qLower.includes('hire') || qLower.includes('placement') || qLower.includes('recruit') || qLower.includes('role') || qLower.includes('fit')) {
      return `**Top Reasons to Hire Abhishek Kumar:**\n\n` +
        `1. **Academic Excellence & Analytical Rigor**: 8.73 CGPA in B.Tech ECE with deep fundamentals in OOP, DSA, and Control Systems.\n` +
        `2. **Rare Hardware-Software Dual Mastery**: Seamlessly bridges bare-metal processor design & FPGA synthesis (MIPS 32-bit core in Verilog HDL) up to deep learning, autonomous ReAct agents, and high-throughput Python/FastAPI/Node.js/AI systems.\n` +
        `3. **Exceptional Project Track Record**: Engineered MIPS 32-Bit Processor (Vivado FPGA), Neural Image Caption Studio (PyTorch CNN+LSTM), ReturnGuard (ReAct agent), PlateVision ALPR (8-stage OpenCV), FraudGuard.AI (sub-2.8ms ML scoring), Cloud DLP Shield, SplitFlow, PulseFlow Agile, and BitTrace DFIR.\n` +
        `4. **Published IEEE Researcher**: First author of a peer-reviewed IEEE paper on wearable healthcare technology at IEMENTECH 2026.\n` +
        `5. **Industrial Experience**: Hands-on exposure at Jadavpur University (VLSI EDA) and SAIL (Plant Automation).\n` +
        `6. **Placement Readiness**: Ready for high-impact roles in Processor Design, Embedded Firmware, Machine Learning & Vision, Cybersecurity/DFIR, or Full-Stack Systems.`;
    }

    if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('linkedin') || qLower.includes('portfolio') || qLower.includes('link') || qLower.includes('reach')) {
      return `Connect with Abhishek Kumar directly:\n\n` +
        `• **Live Portfolio**: [abhishek947kumar.github.io/portfolio](https://abhishek947kumar.github.io/portfolio/)\n` +
        `• **Email**: [abhishek1297kumar@gmail.com](mailto:abhishek1297kumar@gmail.com)\n` +
        `• **Phone / WhatsApp**: +91 9470303282\n` +
        `• **LinkedIn**: [linkedin.com/in/abhishek947kumar](https://www.linkedin.com/in/abhishek947kumar)\n` +
        `• **GitHub**: [github.com/abhishek947kumar](https://github.com/abhishek947kumar)\n` +
        `• **Locations**: Kolkata, West Bengal & Bokaro Steel City, Jharkhand`;
    }

    // Default intelligent overview
    return `Abhishek Kumar is a B.Tech ECE candidate at IEM Kolkata (CGPA 8.73, Class of 2027) with an IEEE publication at IEMENTECH 2026, VLSI internship at Jadavpur University, industrial training at SAIL, and 18+ production projects in Processor Design & FPGA (MIPS 32-Bit Core in Verilog), Deep Learning & Vision (Neural Caption Studio, PlateVision ALPR), Autonomous Agents (ReturnGuard ReAct Agent), Cyber Defense (FraudGuard.AI, Cloud DLP Shield), and Real-Time Systems (SplitFlow, PulseFlow Agile, BitTrace DFIR).\n\nFeel free to ask about his **CGPA (8.73)**, **internships**, **latest flagship projects (MIPS Processor, Caption Studio, ReturnGuard, PlateVision, FraudGuard.AI)**, **skills matrix**, **IEEE paper**, or **why you should hire him**!`;
  }
}

export const aiService = new AIService();

