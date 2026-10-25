// GitHub Service for real-time portfolio integration
import { resumeData } from '../data/resumeData.js';

const GITHUB_USERNAME = 'abhishek947kumar';
const CACHE_KEY_REPOS = 'agy_portfolio_repos_cache_v4';
const CACHE_KEY_EVENTS = 'agy_portfolio_events_cache_v4';
const CACHE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

export class GitHubService {
  constructor() {
    this.username = GITHUB_USERNAME;
    this.listeners = [];
  }

  onUpdate(callback) {
    this.listeners.push(callback);
  }

  notifyListeners(data) {
    this.listeners.forEach(fn => fn(data));
  }

  async fetchUserData() {
    try {
      const res = await fetch(`https://api.github.com/users/${this.username}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch GitHub user profile:', e);
    }
    return {
      login: this.username,
      name: resumeData.personal.name,
      avatar_url: "https://avatars.githubusercontent.com/u/153946376?v=4",
      html_url: `https://github.com/${this.username}`,
      public_repos: 22,
      followers: 1,
      following: 3,
      bio: resumeData.personal.tagline
    };
  }

  async fetchRepositories(forceRefresh = false) {
    if (!forceRefresh) {
      const cached = this.getCached(CACHE_KEY_REPOS);
      if (cached) return cached;
    }

    try {
      const res = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100`);
      if (res.ok) {
        const repos = await res.json();
        const processed = this.processRepos(repos);
        this.setCached(CACHE_KEY_REPOS, processed);
        this.notifyListeners({ type: 'repos', data: processed });
        return processed;
      }
    } catch (e) {
      console.warn('Error fetching live GitHub repositories, using fallback:', e);
    }

    return this.getFallbackRepos();
  }

  async fetchEvents(forceRefresh = false) {
    if (!forceRefresh) {
      const cached = this.getCached(CACHE_KEY_EVENTS);
      if (cached) return cached;
    }

    try {
      const res = await fetch(`https://api.github.com/users/${this.username}/events?per_page=30`);
      if (res.ok) {
        const events = await res.json();
        const processed = this.processEvents(events);
        this.setCached(CACHE_KEY_EVENTS, processed);
        this.notifyListeners({ type: 'events', data: processed });
        return processed;
      }
    } catch (e) {
      console.warn('Error fetching live GitHub events, using fallback:', e);
    }

    return this.getFallbackEvents();
  }

  processRepos(rawRepos) {
    // Determine 6-month threshold based on current date (Sep 2026)
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());

    return rawRepos.map(repo => {
      const updatedAt = new Date(repo.updated_at);
      const isLast6Months = updatedAt >= sixMonthsAgo;

      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description provided.',
        url: repo.html_url,
        language: repo.language || 'Code',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        updatedAt: repo.updated_at,
        updatedFormatted: updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isLast6Months,
        topics: repo.topics || []
      };
    });
  }

  processEvents(rawEvents) {
    return rawEvents.slice(0, 15).map(event => {
      const d = new Date(event.created_at);
      const dateFormatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const repoName = event.repo ? event.repo.name.replace(`${this.username}/`, '') : 'Repository';

      let description = 'Activity on repository';
      let icon = 'git-commit';

      if (event.type === 'PushEvent') {
        const commitCount = event.payload?.commits?.length || 1;
        const msg = event.payload?.commits?.[0]?.message || 'Code update';
        description = `Pushed ${commitCount} commit(s): "${msg.length > 50 ? msg.substring(0, 50) + '...' : msg}"`;
        icon = 'git-push';
      } else if (event.type === 'CreateEvent') {
        description = `Created ${event.payload?.ref_type || 'resource'} ${event.payload?.ref || repoName}`;
        icon = 'plus-circle';
      } else if (event.type === 'WatchEvent') {
        description = `Starred repository ${repoName}`;
        icon = 'star';
      }

      return {
        id: event.id,
        type: event.type,
        repo: repoName,
        repoUrl: `https://github.com/${event.repo?.name || this.username}`,
        date: dateFormatted,
        rawDate: event.created_at,
        description,
        icon
      };
    });
  }

  getCached(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
        return parsed.data;
      }
    } catch (e) {
      // Ignore localStorage error
    }
    return null;
  }

  setCached(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (e) {
      // Ignore quota error
    }
  }

  getFallbackRepos() {
    return [
      {
        id: 1435300000,
        name: "air-canvas-ai",
        fullName: "abhishek947kumar/air-canvas-ai",
        description: "🎨 Touchless gesture-based virtual drawing system in Python using MediaPipe 3D Hand Landmarker, OpenCV, velocity-adaptive EMA coordinate smoothing, and touchless dwell & pinch selection.",
        url: "https://github.com/abhishek947kumar/air-canvas-ai",
        language: "Python",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 25, 2026",
        isLast6Months: true,
        topics: ["python", "opencv", "mediapipe", "computer-vision", "hand-tracking", "gesture-recognition", "virtual-canvas"]
      },
      {
        id: 1435201001,
        name: "sensor-status-decision-unit",
        fullName: "abhishek947kumar/sensor-status-decision-unit",
        description: "🚨 Combinational logic-based sensor decision unit designed in Verilog HDL using AMD/Xilinx Vivado. Classifies 8-bit digital sensor input into Normal, Warning, and Critical states with active LED indicators, alarm buzzer, and automated test suite. Synthesized for Artix-7 (Basys 3).",
        url: "https://github.com/abhishek947kumar/sensor-status-decision-unit",
        language: "Verilog",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 25, 2026",
        isLast6Months: true,
        topics: ["verilog", "vivado", "fpga", "basys3", "artix7", "combinational-logic", "sensor-decision", "telemetry"]
      },
      {
        id: 1435102002,
        name: "simple-memory-module",
        fullName: "abhishek947kumar/simple-memory-module",
        description: "💾 Production-ready synthesizable RAM module project in Verilog RTL for AMD/Xilinx Vivado. Demonstrates Single-Port & True Dual-Port synchronous RAMs with READ_FIRST/WRITE_FIRST modes, BRAM & Distributed LUT RAM inference, and GitHub Actions CI.",
        url: "https://github.com/abhishek947kumar/simple-memory-module",
        language: "Verilog",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 25, 2026",
        isLast6Months: true,
        topics: ["verilog", "vivado", "fpga", "ram", "bram", "lut-ram", "dual-port", "semiconductor-memory", "icarus-verilog"]
      },
      {
        id: 1430983003,
        name: "axi-protocol-fpga",
        fullName: "abhishek947kumar/axi-protocol-fpga",
        description: "🏛️ ARM AMBA AXI4 high-performance communication protocol subsystem for Xilinx Artix-7 FPGAs with 5-channel burst engine (1-256 beats), 1x2 crossbar router, AXI4-Lite bridge, dual-port BRAM, 100 MHz timing closure, and SystemVerilog SVA test suite.",
        url: "https://github.com/abhishek947kumar/axi-protocol-fpga",
        language: "Verilog",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 23, 2026",
        isLast6Months: true,
        topics: ["amba", "axi4", "axi4-lite", "verilog", "systemverilog", "sva", "vivado", "fpga", "artix7", "soc", "timing-closure"]
      },
      {
        id: 1430565363,
        name: "mips-32bit-pipelined-processor",
        fullName: "abhishek947kumar/mips-32bit-pipelined-processor",
        description: "⚡ Custom 32-bit 5-stage pipelined MIPS processor core in Verilog with hazard detection, forwarding, custom Python assembler, and Xilinx Vivado synthesis on Artix-7 (Basys 3).",
        url: "https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",
        language: "Verilog",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 23, 2026",
        isLast6Months: true,
        topics: ["mips", "verilog", "vivado", "fpga", "basys3", "processor", "pipelining", "computer-architecture"]
      },
      {
        id: 1422992846,
        name: "image-caption-generator",
        fullName: "abhishek947kumar/image-caption-generator",
        description: "🌌 Full-stack AI Image Caption Generator using Deep Learning (CNN Feature Extractor + LSTM Language Decoder) with PyTorch, FastAPI, and an interactive Cyber-Neural Web Studio.",
        url: "https://github.com/abhishek947kumar/image-caption-generator",
        language: "Python",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 17, 2026",
        isLast6Months: true,
        topics: ["deep-learning", "pytorch", "image-captioning", "lstm", "fastapi", "computer-vision", "nlp", "beam-search"]
      },
      {
        id: 1422962824,
        name: "Return-Guard",
        fullName: "abhishek947kumar/Return-Guard",
        description: "🛡️ Autonomous ReAct (Reasoning and Acting) AI agent for e-commerce return verification, multimodal computer vision damage inspection, and automated refund/escalation workflows.",
        url: "https://github.com/abhishek947kumar/Return-Guard",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 17, 2026",
        isLast6Months: true,
        topics: ["ai-agent", "react-agent", "fastapi", "multimodal-vision", "ecommerce", "refunds", "governance"]
      },
      {
        id: 1406033578,
        name: "license-plate-recognition",
        fullName: "abhishek947kumar/license-plate-recognition",
        description: "🚗 End-to-end Automatic License Plate Recognition (ALPR) system with an 8-stage OpenCV pipeline, Tesseract OCR ensemble, FastAPI visualizer, and CLI.",
        url: "https://github.com/abhishek947kumar/license-plate-recognition",
        language: "Python",
        stars: 0,
        forks: 0,
        updatedFormatted: "Oct 05, 2026",
        isLast6Months: true,
        topics: ["opencv", "alpr", "anpr", "tesseract-ocr", "fastapi", "computer-vision", "image-processing"]
      },
      {
        id: 1397001001,
        name: "detecting-data-leaks",
        fullName: "abhishek947kumar/detecting-data-leaks",
        description: "🛡️ Cloud DLP system detecting SQL injections and data leaks via Content Inspection, Contextual Behavioral Analysis, and AESX Authenticated Field-Level Encryption.",
        url: "https://github.com/abhishek947kumar/detecting-data-leaks",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        updatedFormatted: "Sep 30, 2026",
        isLast6Months: true,
        topics: ["cloud-security", "dlp", "sqli-detection", "aes-256-gcm", "data-loss-prevention", "honeytokens"]
      },
      {
        id: 1397002002,
        name: "credit-card-fraud-detection",
        fullName: "abhishek947kumar/credit-card-fraud-detection",
        description: "💳 Enterprise Real-Time Credit Card Fraud Detection AI Platform with Sub-10ms Latency & Explainable AI (XGBoost + FastAPI).",
        url: "https://github.com/abhishek947kumar/credit-card-fraud-detection",
        language: "Python",
        stars: 0,
        forks: 0,
        updatedFormatted: "Sep 30, 2026",
        isLast6Months: true,
        topics: ["fraud-detection", "xgboost", "fastapi", "machine-learning", "explainable-ai", "fintech"]
      },
      {
        id: 1396154535,
        name: "splitflow",
        fullName: "abhishek947kumar/splitflow",
        description: "⚡ A modern group expense splitter with live multi-currency rates, flexible splits, OCR receipt scanner, visual debt graph, and payment QR codes.",
        url: "https://github.com/abhishek947kumar/splitflow",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        updatedFormatted: "Sep 29, 2026",
        isLast6Months: true,
        topics: ["expense-splitter", "ocr-scanner", "debt-graph", "fintech", "currency-converter", "qr-payments"]
      },
      {
        id: 1395897468,
        name: "pulseflow-agile",
        fullName: "abhishek947kumar/pulseflow-agile",
        description: "⚡ Enterprise Agile Project Management Platform with Real-Time WebSockets, D3.js Sprint Burndown, AI Copilot, Gantt Roadmap, and Multi-Theme Engine.",
        url: "https://github.com/abhishek947kumar/pulseflow-agile",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        updatedFormatted: "Sep 29, 2026",
        isLast6Months: true,
        topics: ["agile", "scrum", "kanban", "websockets", "d3js", "sprint-burndown", "ai-copilot", "gantt"]
      },
      {
        id: 0,
        name: "Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
        fullName: "abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
        description: "BitTrace DFIR: Automated live volatile memory (RAM) and postmortem disk/registry analysis tool for Bitcoin on Windows systems with ISO/IEC 27037 chain of custody.",
        url: "https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "Sep 21, 2026",
        isLast6Months: true,
        topics: ["digital-forensics", "bitcoin", "fastapi", "react", "volatile-memory", "iso-27037", "dfir"]
      },
      {
        id: 1,
        name: "Embedded-Night-Vision-System",
        fullName: "abhishek947kumar/Embedded-Night-Vision-System",
        description: "Embedded Night-Vision System for Pedestrian Detection using Active IR and Thermal Sensors with HAAR+AdaBoost and YOLOv2",
        url: "https://github.com/abhishek947kumar/Embedded-Night-Vision-System",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "Sep 19, 2026",
        isLast6Months: true,
        topics: ["embedded", "night-vision", "yolov2", "infrared", "deep-learning"]
      },
      {
        id: 2,
        name: "Logistics-Management-System",
        fullName: "abhishek947kumar/Logistics-Management-System",
        description: "Enterprise-Grade Commercial Multi-Dealer & Consumer Logistics Management System in Python & Django.",
        url: "https://github.com/abhishek947kumar/Logistics-Management-System",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "Sep 18, 2026",
        isLast6Months: true,
        topics: ["django", "logistics", "supply-chain", "enterprise"]
      },
      {
        id: 3,
        name: "YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        fullName: "abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        description: "Modern financial control center with category budgets, savings milestones, and Google Gemini AI spending analytics.",
        url: "https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        language: "JavaScript",
        stars: 1,
        forks: 0,
        updatedFormatted: "Jul 19, 2026",
        isLast6Months: true,
        topics: ["finance", "gemini-ai", "budgeting", "expense-tracker"]
      },
      {
        id: 4,
        name: "Evershop",
        fullName: "abhishek947kumar/Evershop",
        description: "Modern, TypeScript-first eCommerce platform built with GraphQL and React with modular, customizable architecture.",
        url: "https://github.com/abhishek947kumar/Evershop",
        language: "TypeScript",
        stars: 0,
        forks: 0,
        updatedFormatted: "Aug 5, 2026",
        isLast6Months: true,
        topics: ["typescript", "react", "graphql", "ecommerce"]
      },
      {
        id: 5,
        name: "PRODIGY_CS_02",
        fullName: "abhishek947kumar/PRODIGY_CS_02",
        description: "Image encryption tool using pixel manipulation: pixel value swapping and mathematical reversible transformations.",
        url: "https://github.com/abhishek947kumar/PRODIGY_CS_02",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "May 20, 2024",
        isLast6Months: false,
        topics: ["cryptography", "image-encryption", "security"]
      },
      {
        id: 6,
        name: "PRODIGY_CS_01",
        fullName: "abhishek947kumar/PRODIGY_CS_01",
        description: "Caesar Cipher program to encrypt and decrypt messages by character shifts.",
        url: "https://github.com/abhishek947kumar/PRODIGY_CS_01",
        language: "Python",
        stars: 1,
        forks: 0,
        updatedFormatted: "May 12, 2025",
        isLast6Months: false,
        topics: ["cryptography", "caesar-cipher"]
      }
    ];
  }

  getFallbackEvents() {
    return [
      {
        id: "evt-aircanvas-1",
        type: "PushEvent",
        repo: "air-canvas-ai",
        repoUrl: "https://github.com/abhishek947kumar/air-canvas-ai",
        date: "Oct 25, 2026",
        description: "Pushed: 'Release AirCanvas AI: MediaPipe 21-landmark 3D hand tracking, adaptive EMA smoothing & dual-panel canvas'",
        icon: "git-push"
      },
      {
        id: "evt-sensor-1",
        type: "PushEvent",
        repo: "sensor-status-decision-unit",
        repoUrl: "https://github.com/abhishek947kumar/sensor-status-decision-unit",
        date: "Oct 25, 2026",
        description: "Pushed: 'Release combinational sensor decision unit: 8-bit range classifier, Artix-7 Basys 3 XDC & Python tester'",
        icon: "git-push"
      },
      {
        id: "evt-memory-1",
        type: "PushEvent",
        repo: "simple-memory-module",
        repoUrl: "https://github.com/abhishek947kumar/simple-memory-module",
        date: "Oct 25, 2026",
        description: "Pushed: 'Release synthesizable RAM modules: Single/True Dual-Port RAMs, BRAM/LUT inference & Icarus CI'",
        icon: "git-push"
      },
      {
        id: "evt-axi-1",
        type: "PushEvent",
        repo: "axi-protocol-fpga",
        repoUrl: "https://github.com/abhishek947kumar/axi-protocol-fpga",
        date: "Oct 23, 2026",
        description: "Pushed: 'Release AMBA AXI4 protocol subsystem: 5 channels, 1x2 crossbar, 100 MHz timing closure & SVA tests'",
        icon: "git-push"
      },
      {
        id: "evt-mips-1",
        type: "PushEvent",
        repo: "mips-32bit-pipelined-processor",
        repoUrl: "https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",
        date: "Oct 23, 2026",
        description: "Pushed: 'Release 32-bit pipelined MIPS core: 5-stage datapath, hazard forwarding & Vivado Artix-7 synthesis'",
        icon: "git-push"
      },
      {
        id: "evt-caption-1",
        type: "PushEvent",
        repo: "image-caption-generator",
        repoUrl: "https://github.com/abhishek947kumar/image-caption-generator",
        date: "Oct 17, 2026",
        description: "Pushed: 'Release Neural Image Caption Studio: PyTorch CNN+LSTM, Beam Search & BLEU benchmark lab'",
        icon: "git-push"
      },
      {
        id: "evt-returnguard-1",
        type: "PushEvent",
        repo: "Return-Guard",
        repoUrl: "https://github.com/abhishek947kumar/Return-Guard",
        date: "Oct 17, 2026",
        description: "Pushed: 'Release ReturnGuard: ReAct cognitive loop, multimodal CV defect inspection & anti-fraud governance'",
        icon: "git-push"
      },
      {
        id: "evt-alpr-1",
        type: "PushEvent",
        repo: "license-plate-recognition",
        repoUrl: "https://github.com/abhishek947kumar/license-plate-recognition",
        date: "Oct 05, 2026",
        description: "Pushed: 'Release PlateVision AI: 8-stage OpenCV ALPR pipeline, multi-PSM Tesseract OCR & dark web studio'",
        icon: "git-push"
      },
      {
        id: "evt-leaks-1",
        type: "PushEvent",
        repo: "detecting-data-leaks",
        repoUrl: "https://github.com/abhishek947kumar/detecting-data-leaks",
        date: "Sep 30, 2026",
        description: "Pushed: 'Release Cloud DLP Shield: Dual-engine AST SQLi detection, Luhn validation & AESX encryption'",
        icon: "git-push"
      },
      {
        id: "evt-fraud-1",
        type: "PushEvent",
        repo: "credit-card-fraud-detection",
        repoUrl: "https://github.com/abhishek947kumar/credit-card-fraud-detection",
        date: "Sep 30, 2026",
        description: "Pushed: 'Release FraudGuard.AI: Real-time XGBoost ensemble, sub-10ms scoring & Explainable AI'",
        icon: "git-push"
      },
      {
        id: "evt-splitflow-1",
        type: "PushEvent",
        repo: "splitflow",
        repoUrl: "https://github.com/abhishek947kumar/splitflow",
        date: "Sep 29, 2026",
        description: "Pushed: 'Release SplitFlow: OCR receipt scanner, greedy debt graph & live FX currency settlement'",
        icon: "git-push"
      },
      {
        id: "evt-pulseflow-1",
        type: "PushEvent",
        repo: "pulseflow-agile",
        repoUrl: "https://github.com/abhishek947kumar/pulseflow-agile",
        date: "Sep 29, 2026",
        description: "Pushed: 'PulseFlow Enterprise Agile: WebSocket sync, D3.js sprint analytics & AI Copilot'",
        icon: "git-push"
      },
      {
        id: "evt-0",
        type: "PushEvent",
        repo: "Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
        repoUrl: "https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
        date: "Sep 21, 2026",
        description: "Pushed 3 commits: 'BitTrace DFIR live memory triage, ROT13 decoder & ISO 27037 ledger'",
        icon: "git-push"
      },
      {
        id: "evt-0b",
        type: "CreateEvent",
        repo: "Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
        repoUrl: "https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
        date: "Sep 21, 2026",
        description: "Created repository 'Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems'",
        icon: "plus-circle"
      },
      {
        id: "evt-1",
        type: "PushEvent",
        repo: "Embedded-Night-Vision-System",
        repoUrl: "https://github.com/abhishek947kumar/Embedded-Night-Vision-System",
        date: "Sep 19, 2026",
        description: "Pushed 2 commits: 'Optimized YOLOv2 inference pipeline on embedded edge unit'",
        icon: "git-push"
      },
      {
        id: "evt-2",
        type: "PushEvent",
        repo: "Logistics-Management-System",
        repoUrl: "https://github.com/abhishek947kumar/Logistics-Management-System",
        date: "Sep 18, 2026",
        description: "Pushed 3 commits: 'Enterprise dealer dispatch scheduling & consignment tracking'",
        icon: "git-push"
      },
      {
        id: "evt-3",
        type: "CreateEvent",
        repo: "Logistics-Management-System",
        repoUrl: "https://github.com/abhishek947kumar/Logistics-Management-System",
        date: "Sep 18, 2026",
        description: "Created branch 'main' with multi-dealer logistics architecture",
        icon: "plus-circle"
      },
      {
        id: "evt-4",
        type: "PushEvent",
        repo: "YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        repoUrl: "https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
        date: "Jul 19, 2026",
        description: "Pushed 4 commits: 'Integrated Google Gemini AI for smart wealth recommendations'",
        icon: "git-push"
      }
    ];
  }
}

export const githubService = new GitHubService();
