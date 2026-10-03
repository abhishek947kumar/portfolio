export const resumeData = {
  personal: {
    name: "Abhishek Kumar",
    tagline: "B.Tech ECE 4th Year Candidate | Embedded Systems, VLSI & Software Engineer",
    address: "Sector-3, Bokaro Steel City, Jharkhand - 827003",
    location: "Kolkata, West Bengal / Bokaro, Jharkhand, India",
    email: "abhishek1297kumar@gmail.com",
    phone: "+91 9470303282",
    linkedin: "https://www.linkedin.com/in/abhishek947kumar",
    linkedinHandle: "abhishek947kumar",
    github: "https://github.com/abhishek947kumar",
    githubHandle: "abhishek947kumar",
    portfolio: "https://abhishek947kumar.github.io/portfolio/",
    portfolioHandle: "abhishek947kumar.github.io/portfolio",
    summary: "B.Tech ECE 4th year candidate at Institute of Engineering & Management (IEM), Kolkata (Class of 2027) with an 8.73 CGPA. Built with a strong foundation in Object-Oriented Programming (OOP), algorithmic logic, control systems, and software-hardware co-design. Experienced in real-time data processing, VLSI design pipelines, and plant automation. Proficient in Python, MATLAB, C/C++, and version control, with proven IEEE publication and high-impact projects in embedded IoT and software architectures."
  },

  placementPitch: {
    headline: "Placement Candidate Profile: Abhishek Kumar",
    keyStrengths: [
      "High Academic Distinction: CGPA 8.73 (up to 6th semester) in B.Tech ECE at IEM Kolkata.",
      "Dual Expertise: Strong grasp across both bare-metal hardware/embedded firmware (Wokwi, Vivado, C/C++, microcontrollers) and high-level software & systems engineering (Python, FastAPI, Django, React, AI Cloud).",
      "Published IEEE Researcher: First-author publication at IEEE IEMENTECH 2026 on wearable piezoelectric energy harvesting & healthcare technology.",
      "Machine Learning & Cyber Defense: Engineered FraudGuard.AI (sub-10ms XGBoost ensemble & Explainable AI for real-time payment fraud prevention) and Cloud DLP Shield (dual-engine AST SQLi detection & AESX authenticated field encryption).",
      "Digital Forensics & Systems Security: Architected BitTrace DFIR for live volatile RAM inspection and ISO/IEC 27037 evidence preservation.",
      "Hands-On Industrial Internships: Bare-metal IC design optimization at Jadavpur University & plant automation software systems at SAIL (Steel Authority of India Limited).",
      "Active Continuous Learner: Built & deployed 14+ production-grade software, AI, cybersecurity, and embedded systems in 2026 alone with continuous GitHub releases."
    ],
    targetRoles: [
      "Embedded Software Engineer / Firmware Engineer",
      "VLSI Design & Hardware Systems Engineer",
      "Digital Forensics & Incident Response (DFIR) / Systems Security Engineer",
      "AI / Machine Learning Engineer (Fraud Defense & Systems)",
      "IoT Systems & Hardware-Software Co-Design Engineer",
      "Software Development Engineer (Python / C++ / Full Stack)",
      "Systems Validation & Automation Engineer"
    ]
  },

  education: [
    {
      institution: "Institute of Engineering & Management (IEM)",
      location: "Kolkata, West Bengal",
      degree: "B.Tech in Electronics and Communication Engineering (ECE)",
      duration: "2023 – 2027",
      score: "CGPA: 8.73 (up to 6th sem)",
      highlights: [
        "Core Coursework: Microprocessors & Microcontrollers, Digital Signal Processing, Control Systems, VLSI Design, Data Structures & Algorithms, Analog & Digital Communication.",
        "Consistently maintained high academic standing in top percentile of the department."
      ]
    },
    {
      institution: "M.G.M. Higher Secondary School",
      location: "Bokaro, Jharkhand",
      degree: "CBSE Class 12 (PCM + IP)",
      duration: "2023",
      score: "Percentage: 86.5%",
      highlights: [
        "Specialized in Physics, Chemistry, Mathematics, and Informatics Practices (IP / Python)."
      ]
    },
    {
      institution: "M.G.M. Higher Secondary School",
      location: "Bokaro, Jharkhand",
      degree: "CBSE Class 10",
      duration: "2021",
      score: "Percentage: 95.0%",
      highlights: [
        "School honors for academic excellence in Science and Mathematics."
      ]
    }
  ],

  internships: [
    {
      role: "VLSI Design Intern",
      organization: "Jadavpur University",
      location: "Kolkata, West Bengal",
      duration: "December 2025 – January 2026",
      type: "Research Internship",
      points: [
        "Studied and analysed IC design and fabrication processes, focusing on hardware-software architecture optimisations.",
        "Evaluated time-critical processing pipelines using EDA tools, applying semiconductor principles to reduce computational overhead in bare-metal environments.",
        "Simulated and benchmarked gate-level delays and power dissipation tradeoffs for high-performance sub-systems."
      ],
      skillsUsed: ["VLSI Design", "EDA Tools", "Bare-metal optimization", "Hardware Architecture", "IC Fabrication Flow"]
    },
    {
      role: "Vocational Trainee",
      organization: "Steel Authority of India Limited (SAIL)",
      location: "Bokaro Steel City, Jharkhand",
      duration: "May 2025 – June 2025",
      type: "Industrial Internship",
      points: [
        "Developed and maintained software modules for plant automation systems in industrial manufacturing units.",
        "Assisted in database management tasks and operational data analytics to optimize continuous plant data monitoring.",
        "Collaborated with senior process automation engineers on fault logging, telemetry protocols, and automated telemetry alerts."
      ],
      skillsUsed: ["Plant Automation", "Industrial Databases", "Software Maintenance", "Data Telemetry", "Industrial Control"]
    }
  ],

  projects: [
    {
      id: "fraudguard-ai",
      title: "FraudGuard.AI — Real-Time Credit Card Fraud Detection Platform",
      subtitle: "Sub-10ms Risk Scoring, XGBoost Ensemble, Explainable AI & Automated Tiered Action Rules",
      badge: "Latest (Sep 2026) | AI & Cyber Defense",
      createdPeriod: "Last 1 Week",
      githubUrl: "https://github.com/abhishek947kumar/credit-card-fraud-detection",
      tags: ["Python", "FastAPI", "XGBoost", "Scikit-Learn", "Machine Learning", "Explainable AI", "Cyber Defense", "FinTech", "REST APIs"],
      description: "An enterprise AI platform engineered to evaluate credit card transaction risk in real-time under extreme class imbalance (~1% fraud prevalence). Features sub-10ms inference, domain geo-velocity calculation (impossible travel / card cloning), multi-model ensemble benchmark, and Explainable AI (XAI) diagnostics.",
      highlights: [
        "Real-Time ML Ensemble: Blended decision engine combining cost-weighted XGBoost, Balanced Random Forest, HistGradientBoosting, and Isolation Forest with 100% recall and 1.000 PR-AUC on holdout test benchmarks, reducing latency to ~2.8ms.",
        "Domain Feature Engineering: Computes real-time geo-velocity (km/h travel speed identifying physical impossible teleportation), 1h/24h authorization velocity surges, cardholder 30-day spend baseline ratios, and device fingerprint suspicion.",
        "Explainable AI (XAI) for Compliance: Structured risk driver diagnostics complying with FCRA and GDPR Art. 22 regulations, providing human fraud analysts with transparent explanations for flagged transactions.",
        "Automated Tiered Action Policies: Instant routing into AUTO_APPROVE (<25% risk), STEP_UP_AUTH (25-65% OTP / 3D Secure challenge), and DECLINE_AND_FREEZE (>65% risk with automated card lock)."
      ]
    },
    {
      id: "cloud-dlp-shield",
      title: "Cloud DLP Shield — Detecting Data Leaks Using SQL & Cloud DLP Architecture",
      subtitle: "Dual-Engine Content & Contextual Inspection, Real-Time SQLi Detection & AESX Field Encryption",
      badge: "Latest (Sep 2026) | Cloud Security & DLP",
      createdPeriod: "Last 1 Week",
      githubUrl: "https://github.com/abhishek947kumar/detecting-data-leaks",
      tags: ["JavaScript", "Node.js", "Cloud Security", "Data Loss Prevention", "SQL Injection", "AES-256-GCM", "Server-Sent Events", "Express"],
      description: "An enterprise-grade Cloud Data Loss Prevention (DLP) and application security platform designed to defend e-commerce and cloud web services against data exfiltration. Combines dual-engine inspection (Content & Contextual Analysis) with AESX authenticated field encryption and dynamic honeypot decoy mitigation.",
      highlights: [
        "Dual-Engine Inspection Gateway: Layer 1 Content Engine intercepts full-spectrum SQL injections (Tautology, Union exfiltration, Schema harvesting), validates credit cards via mathematical Luhn algorithm, and neutralizes keystroke logging scripts; Layer 2 Contextual Engine analyzes user behavior, query velocity bursts, and sub-15ms typing cadence anomalies.",
        "AESX Authenticated Field Encryption: Zero-trust database storage utilizing AES-256-GCM with key whitening, IV randomness, and tamper-resistant 128-bit authentication tags preventing ciphertext bit flipping.",
        "User Threat Categorization & Honeypot Defense: Real-time risk scoring categorizing users into Benign (0-29), Suspicious (30-69), and Assaulter (70-100), serving deceptive Honeytoken decoys to assaulters while safeguarding production data.",
        "Real-Time SOC Observability & Interactive Storefront: Live Server-Sent Events (SSE) threat stream, deep payload AST sandbox terminal, database vault explorer, and dual-mode Nexus E-Shop featuring a toggleable 'DLP Shield vs Vulnerable Raw SQL' demonstration."
      ]
    },
    {
      id: "splitflow",
      title: "SplitFlow — Smart Group Expense Splitter & Settlement Engine",
      subtitle: "OCR Receipt Scanner, Live FX Rates, Visual Debt Graph & UPI QR Settlements",
      badge: "Latest (Sep 2026) | FinTech & Web Systems",
      createdPeriod: "Last 1 Week",
      githubUrl: "https://github.com/abhishek947kumar/splitflow",
      tags: ["JavaScript", "Web APIs", "OCR Scanner", "Debt Simplification", "D3 / Canvas", "FinTech", "QR Settlement"],
      description: "A modern, responsive group expense management platform engineered to eliminate shared financial friction. Features an OCR receipt scanner for itemized split extraction, real-time multi-currency exchange rates, a greedy debt minimization algorithm with interactive debt-flow graph, and automated payment QR codes.",
      highlights: [
        "Greedy Debt Minimization: Algorithmic settlement engine reducing N-party circular debts into the minimum number of direct transactions, visualized via dynamic Canvas/SVG debt graphs.",
        "OCR Receipt Parsing & Itemized Allocation: Ingests receipt photos to extract itemized costs, taxes, and tips, allowing unequal, percentage-based, and exact share splits.",
        "Live Multi-Currency & Instant Settlement: Real-time currency conversion across global currencies via exchange rate APIs with integrated UPI and instant payment QR code generation.",
        "Export & Audit Trail: Generates court and personal audit-ready exports in PDF, CSV, and Excel formats with tamper-evident balance ledgers."
      ]
    },
    {
      id: "pulseflow-agile",
      title: "PulseFlow Agile — Enterprise Project Management & Telemetry Platform",
      subtitle: "Real-Time WebSockets, D3.js Sprint Burndown, AI Copilot & Gantt Roadmap",
      badge: "Latest (Sep 2026) | Enterprise & Real-Time",
      createdPeriod: "Last 1 Week",
      githubUrl: "https://github.com/abhishek947kumar/pulseflow-agile",
      tags: ["JavaScript", "WebSockets", "D3.js", "AI Copilot", "Agile / Scrum", "Gantt Roadmap", "Enterprise Architecture"],
      description: "An enterprise-grade collaborative agile project management platform designed for distributed engineering teams. Features real-time multi-user Kanban boards via WebSockets, predictive sprint analytics with interactive D3.js burndown charts, AI-assisted user story generation, and interactive Gantt roadmap timelines.",
      highlights: [
        "Real-Time Collaborative Kanban: Bidirectional WebSockets synchronization with optimistic state updates, conflict resolution, and granular role-based permissions.",
        "Interactive D3.js Sprint Analytics: Mathematical velocity tracking, scope-creep indicators, and dynamic burndown/burnup projections computed in real time.",
        "AI Copilot for Agile Teams: Automated user story drafting, sprint velocity prediction, automated test-case generation, and blocker triage.",
        "Interactive Gantt Roadmap: Drag-and-drop chronological timeline with milestone dependency resolution and critical path calculation."
      ]
    },
    {
      id: "bittrace-dfir",
      title: "BitTrace DFIR - Automated Live & Postmortem Bitcoin Forensic Tool",
      subtitle: "Volatile RAM Inspection, Windows Registry Hives & ISO/IEC 27037 Evidence Vault",
      badge: "Recent (Sep 2026) | Cybersecurity & DFIR",
      createdPeriod: "Last 1 Week",
      githubUrl: "https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",
      tags: ["Python", "FastAPI", "React", "Digital Forensics", "Cryptography", "Windows API", "ISO 27037"],
      description: "An automated digital forensics and incident response (DFIR) platform engineered to conduct both live volatile memory (RAM) and persistent postmortem disk/registry analysis of Bitcoin artifacts on Windows systems. Adheres to ISO/IEC 27037 digital evidence preservation standards with immutable SHA-256/MD5 hashing.",
      highlights: [
        "Live Volatile Forensics: Inspects running wallet processes (Bitcoin-Qt, Electrum, Armory) to recover 12-24 word BIP-39 seed phrases, WIF/Hex private keys, and addresses with a byte-aligned Hex/ASCII viewer.",
        "Postmortem Remnant Extraction: Scans %APPDATA% for Berkeley DB wallet.dat headers (0x00053162), parses Windows Prefetch (.pf) execution frequencies, and decodes UserAssist ROT13 keys for uninstalled wallet remnants.",
        "Browser Artifacts & Evidence Ledger: Implements SQLite shadow copying across Chrome, Edge, and Firefox without database locks; generates court-ready audit reports with 1-click PDF/HTML export."
      ]
    },
    {
      id: "night-vision",
      title: "Embedded Night-Vision System for Pedestrian Detection",
      subtitle: "Active IR + Thermal Sensors with HAAR+AdaBoost & YOLOv2",
      badge: "Recent (Sep 2026) | AI & Embedded",
      createdPeriod: "Last 1 Week",
      githubUrl: "https://github.com/abhishek947kumar/Embedded-Night-Vision-System",
      tags: ["Python", "Embedded Systems", "Computer Vision", "Thermal IR", "YOLOv2", "AdaBoost"],
      description: "Embedded night-vision driver-assistance architecture combining active infrared and thermal imaging feeds. Features a dual-stage detection pipeline utilizing HAAR+AdaBoost for low-compute candidate extraction and custom-pruned YOLOv2 for real-time pedestrian recognition under pitch-black and hazardous road environments.",
      highlights: [
        "Fused sensor telemetry from active IR and LWIR thermal modules.",
        "Optimized inference latency on resource-constrained embedded edge hardware.",
        "Achieved robust multi-pedestrian localization with low false-positive rates in zero-illumination tests."
      ]
    },
    {
      id: "logistics-sys",
      title: "Logistics Management System",
      subtitle: "Commercial Multi-Dealer & Consumer Logistics Platform",
      badge: "Recent (Sep 2026) | Enterprise Full-Stack",
      createdPeriod: "Last 1 Week",
      githubUrl: "https://github.com/abhishek947kumar/Logistics-Management-System",
      tags: ["Python", "Django", "PostgreSQL", "REST APIs", "Enterprise Architecture"],
      description: "An enterprise-grade commercial logistics and supply chain engine designed for multi-dealer inventory synchronization, order dispatch scheduling, route tracking, and automated consignment status updates.",
      highlights: [
        "Architected modular multi-tenant database schema for independent dealers and logistics coordinators.",
        "Implemented secure JWT authentication, role-based access control, and automated shipment tracking webhooks.",
        "Full tracking pipeline from depot dispatch to consumer delivery confirmation."
      ]
    },
    {
      id: "piezo-wearable",
      title: "Piezo-Electric Based Acupressure Wearable Device",
      subtitle: "IoT Wearable Healthcare System Architecture",
      badge: "Published Research | Hardware & IoT",
      createdPeriod: "Research & Prototype",
      githubUrl: "https://github.com/abhishek947kumar",
      tags: ["Embedded C", "Wokwi", "Microcontrollers", "IoT", "Sensors", "Hardware-Software Co-Design"],
      description: "Microcontroller-based IoT-enabled wearable system engineered to deliver targeted acupressure therapy while harvesting energy through piezoelectric transducers. Designed and verified using Wokwi simulation and physical prototyping.",
      highlights: [
        "Programmed robust firmware logic in Embedded C with interrupt-driven sensor sampling.",
        "Interfaced analog piezoelectric sensors and pulse monitoring actuators over SPI/I2C buses.",
        "Accompanied by a published peer-reviewed IEEE conference paper at IEMENTECH 2026."
      ]
    },
    {
      id: "traffic-controller",
      title: "Camera-Assisted Adaptive 7-State Traffic Controller",
      subtitle: "Dynamic FSM in C on Xilinx Vivado",
      badge: "Hardware & Control Systems",
      createdPeriod: "Academic Milestone",
      githubUrl: "https://github.com/abhishek947kumar",
      tags: ["C", "Xilinx Vivado", "Finite State Machines", "Control Logic", "Real-Time Processing"],
      description: "Camera-assisted algorithmic traffic control system implemented as an adaptive 7-state Finite State Machine (FSM). Processes live traffic density metrics and dynamically calculates variable green-light intervals to eliminate urban intersection deadlocks.",
      highlights: [
        "Developed high-performance state execution logic in C to minimize cycle-by-cycle computational latency.",
        "Simulated in Xilinx Vivado environment with timing constraints and clock-domain validation.",
        "Demonstrated 35% reduction in simulated queue wait times compared to fixed-time traffic light cycles."
      ]
    },
    {
      id: "your-finance",
      title: "YourFinance - AI Expense Tracker & Budget Insights",
      subtitle: "Full-Stack Financial Dashboard with Google Gemini AI",
      badge: "Recent (Jul 2026) | AI & Web App",
      createdPeriod: "Last 6 Months",
      githubUrl: "https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",
      tags: ["JavaScript", "HTML5", "CSS3", "Gemini AI API", "Data Visualization"],
      description: "Modern full-stack personal finance and wealth management dashboard. Features dynamic category budget tracking with visual alert thresholds, savings milestone progress, and automated financial insights powered by Google Gemini AI.",
      highlights: [
        "Integrated Google Gemini LLM to analyze spending transactions and recommend personalized budgeting optimizations.",
        "Interactive graphical charts, responsive dark glassmorphic interface, and offline storage synchronization."
      ]
    },
    {
      id: "evershop",
      title: "EverShop Modern eCommerce Experience",
      subtitle: "Modular TypeScript & GraphQL Architecture",
      badge: "Recent (Aug 2026) | Modern Web Architecture",
      createdPeriod: "Last 6 Months",
      githubUrl: "https://github.com/abhishek947kumar/Evershop",
      tags: ["TypeScript", "React", "GraphQL", "Node.js", "Tailored Commerce"],
      description: "Modern, TypeScript-first eCommerce platform built on GraphQL and React. Designed with a modular architecture for high-performance product indexing, catalog searches, and seamless checkout pipelines.",
      highlights: [
        "End-to-end typed schema with GraphQL queries and mutations.",
        "Modular cart state and extensible component hierarchy for rapid UI customizations."
      ]
    },
    {
      id: "cybersecurity-suite",
      title: "Cryptographic Tools & Security Suite",
      subtitle: "Prodigy InfoTech Cybersecurity Engineering",
      badge: "Cybersecurity & Logic",
      createdPeriod: "Internship Projects",
      githubUrl: "https://github.com/abhishek947kumar",
      tags: ["Python", "C++", "Cryptography", "Pixel Manipulation", "Security Algorithms"],
      description: "Suite of cybersecurity tools created during security engineering training: image encryption via mathematical pixel transformation (PRODIGY_CS_02), Caesar cipher cryptanalysis engine (PRODIGY_CS_01), password entropy checker (PRODIGY_CS_03), and system event logger (PRODIGY_CS_04).",
      highlights: [
        "Built byte-level pixel manipulation algorithms preserving visual entropy while maintaining reversibility.",
        "Developed password entropy scoring models with dictionary attack resilience metrics."
      ]
    }
  ],

  skills: {
    domains: [
      { name: "Microprocessors & Microcontrollers", icon: "cpu", level: 92 },
      { name: "Embedded Systems & Firmware", icon: "chip", level: 90 },
      { name: "Digital Electronics & Logic Design", icon: "git-commit", level: 88 },
      { name: "Hardware Interfacing (GPIO, UART, SPI, I2C)", icon: "sliders", level: 92 },
      { name: "Digital Forensics & Security Engineering", icon: "shield", level: 88 },
      { name: "VLSI Design & EDA Workflows", icon: "layers", level: 84 },
      { name: "Control Systems & Real-Time Processing", icon: "activity", level: 86 }
    ],
    languages: [
      { name: "C / C++", level: 92, tag: "Primary Systems Language" },
      { name: "Embedded C", level: 90, tag: "Firmware & Microcontrollers" },
      { name: "Python", level: 95, tag: "Forensics, AI, Automation, Backend" },
      { name: "MATLAB", level: 85, tag: "Simulation & Modeling" },
      { name: "JavaScript / TypeScript", level: 84, tag: "Web & Tooling" },
      { name: "OOP (Object-Oriented Programming)", level: 90, tag: "Software Architecture" }
    ],
    tools: [
      "Xilinx Vivado", "Wokwi Simulator", "Git / GitHub", "CI/CD Pipelines",
      "FastAPI", "React", "LaTeX", "Agile / Jira", "Linux / Bash", "EDA Tools", "VS Code", "Django", "REST APIs"
    ],
    fundamentals: [
      "Data Structures & Algorithms (DSA)",
      "Digital Evidence Preservation (ISO/IEC 27037)",
      "Finite State Machines (FSM)",
      "Hardware-Software Co-Design",
      "Software Testing & Validation",
      "Power & Delay Optimization"
    ],
    languagesSpoken: [
      { language: "English", proficiency: "Professional / Fluent" },
      { language: "Hindi", proficiency: "Native / Bilingual" },
      { language: "Bengali", proficiency: "Working / Basic" }
    ]
  },

  publications: [
    {
      title: "Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy",
      venue: "IEMENTECH 2026 (IEEE International Conference)",
      status: "Published",
      doi: "10.1109/IEMENTech202669403.2026.11434403",
      link: "https://doi.org/10.1109/IEMENTech202669403.2026.11434403",
      summary: "Pioneered a wearable health technology framework combining biomechanical piezoelectric energy harvesting with automated acupressure therapy for depression and stress relief, minimizing external battery charging requirements while optimizing therapeutic stimulation."
    }
  ],

  certifications: [
    {
      title: "Internet of Things and AI Cloud",
      issuer: "University of California, San Diego (Coursera)",
      skills: ["IoT Architecture", "Cloud Integration", "Smart Systems"]
    }
  ],

  extracurriculars: [
    {
      category: "Professional Memberships",
      items: [
        "Member of IEEE (Institute of Electrical and Electronics Engineers)",
        "Member of IEEE MTT-S (Microwave Theory and Technology Society)",
        "Member of IEEE CAS-S (Circuits and Systems Society)"
      ]
    },
    {
      category: "Volunteering & Leadership",
      items: [
        "Volunteer at SYTRON '25 (Annual Tech Fest, Department of ECE, IEM Kolkata)"
      ]
    },
    {
      category: "Competitions",
      items: [
        "Participant in QUIZZOPHRENIA '25 (National Level Technical Quiz)"
      ]
    }
  ],

  socialFeed: [
    {
      id: "post-li-fraudguard",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "September 30, 2026",
      title: "Launched FraudGuard.AI: Enterprise Real-Time Credit Card Fraud Detection Platform! 💳🤖",
      content: "Excited to unveil FraudGuard.AI, an enterprise machine learning platform for real-time digital payment defense! Engineered with Python, FastAPI, and an ensemble of cost-weighted XGBoost, Balanced Random Forest, and Isolation Forest. Features sub-10ms risk scoring, geo-velocity impossible travel calculation (detecting card cloning), automated tiered action policies (Approve, Challenge, Decline & Freeze), and Explainable AI (XAI) diagnostics compliant with FCRA and GDPR Art. 22 standards.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#MachineLearning", "#CyberDefense", "#FinTech", "#XGBoost", "#FastAPI", "#ExplainableAI", "#Python", "#AI"]
    },
    {
      id: "post-li-clouddlp",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "September 30, 2026",
      title: "Unveiled Cloud DLP Shield: Real-Time SQLi Interception & Cloud Data Loss Prevention! 🛡️☁️",
      content: "Proud to announce Cloud DLP Shield, an enterprise-grade cloud security system engineered to defend web services and e-commerce stores against data leaks and SQL injections. Powered by a Dual-Engine Gateway (Content Inspection with Luhn verification + Contextual Behavioral Analytics with typing cadence & query velocity tracking) and AESX authenticated field encryption with tamper-proof AuthTags, plus a live SSE Security Operations Center (SOC).",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#Cybersecurity", "#CloudSecurity", "#DataLossPrevention", "#Cryptography", "#NodeJS", "#AppSec", "#InfoSec"]
    },
    {
      id: "post-gh-fraudguard",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "September 30, 2026",
      title: "Pushed FraudGuard.AI to GitHub @abhishek947kumar 🚀",
      content: "Released repository for real-time credit card fraud detection with XGBoost ensemble, automated synthetic data generator, sub-10ms scoring API, and Explainable AI triage dashboard.",
      url: "https://github.com/abhishek947kumar/credit-card-fraud-detection",
      tags: ["#MachineLearning", "#Python", "#FastAPI", "#OpenSource"]
    },
    {
      id: "post-gh-clouddlp",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "September 30, 2026",
      title: "Pushed detecting-data-leaks (Cloud DLP Shield) to GitHub 🛡️",
      content: "Open-sourced full cloud DLP gateway implementation with AST SQLi parsing, Luhn card validation, AESX 256-bit encryption vault, and live SSE SOC dashboard.",
      url: "https://github.com/abhishek947kumar/detecting-data-leaks",
      tags: ["#CloudSecurity", "#DLP", "#NodeJS", "#Cryptography"]
    },
    {
      id: "post-li-bittrace",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "September 21, 2026",
      title: "Launched BitTrace DFIR: Automated Live & Postmortem Bitcoin Forensics on Windows! 🛡️💻",
      content: "Excited to unveil my latest cybersecurity & systems project: BitTrace DFIR! An open-source forensic platform designed to conduct live volatile memory (RAM) triage and persistent postmortem disk/registry analysis of cryptocurrency artifacts on Windows. Engineered with a FastAPI bridge, interactive React glassmorphism dashboard, BIP-39 mnemonic recovery, Berkeley DB parser, and ISO/IEC 27037 compliant cryptographic evidence vault.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#DigitalForensics", "#DFIR", "#Cybersecurity", "#Python", "#FastAPI", "#React", "#Bitcoin"]
    },
    {
      id: "post-li-nightvision",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "September 19, 2026",
      title: "Engineered Embedded Night-Vision System for Pedestrian Detection! 🌙🚗",
      content: "Thrilled to share my work on an intelligent Advanced Driver-Assistance System (ADAS). By fusing dual feeds from active 850nm infrared illuminators and LWIR thermal sensors with a hybrid HAAR+AdaBoost candidate filter and quantized YOLOv2 neural network, the system detects pedestrians in zero-visibility conditions with low latency on resource-constrained embedded edge hardware.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#EmbeddedSystems", "#ComputerVision", "#ADAS", "#SensorFusion", "#DeepLearning", "#EdgeAI"]
    },
    {
      id: "post-li-logistics",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "September 18, 2026",
      title: "Built LogiTrack Pro: Enterprise Commercial Logistics Management System 🚚📦",
      content: "Proud to present LogiTrack Pro, a full-stack commercial multi-dealer and consumer logistics management ecosystem built with Python and Django. Features multi-tenant dealer inventory synchronization, automated shipment manifests, route optimization dispatch schedules, and JWT-authenticated telemetry alerts.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#FullStack", "#Python", "#Django", "#Logistics", "#SupplyChain", "#EnterpriseSoftware"]
    },
    {
      id: "post-1",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "August 2026",
      title: "Thrilled to share our IEEE Publication at IEMENTECH 2026! 🚀",
      content: "Delighted to announce that our research paper titled 'Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy' has been officially published in IEEE Xplore! In this work, we explored self-sustaining wearable medical systems that harvest biomechanical energy to power automated pressure-point stimulation. Big thanks to my co-authors and mentors at IEM Kolkata!",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#IEEE", "#WearableTech", "#BiomedicalEngineering", "#IoT", "#Research"]
    },
    {
      id: "post-2",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "January 2026",
      title: "Completed VLSI Design Internship at Jadavpur University! ⚡",
      content: "Honored to wrap up an enriching winter internship at the prestigious Jadavpur University ETCE department. Worked extensively on IC design and fabrication flows, evaluating timing-critical processing pipelines using state-of-the-art EDA tools and bare-metal hardware optimization.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#VLSI", "#Semiconductors", "#ICDesign", "#JadavpurUniversity", "#HardwareEngineering"]
    },
    {
      id: "post-3",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "September 2026",
      title: "Pushed updates to Embedded-Night-Vision-System 🌙",
      content: "Added dual-stream fusion pipeline interfacing active IR and LWIR thermal sensors with HAAR+AdaBoost and lightweight YOLOv2 on embedded hardware. Benchmarked latency under low-light pedestrian crossing scenarios.",
      url: "https://github.com/abhishek947kumar/Embedded-Night-Vision-System",
      tags: ["#ComputerVision", "#EmbeddedSystems", "#Python", "#AutonomousSystems"]
    },
    {
      id: "post-4",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "June 2025",
      title: "Completed Vocational Training at Steel Authority of India Limited (SAIL) 🏭",
      content: "Excited to share that I've concluded my vocational training at SAIL Bokaro Steel Plant. It was an incredible experience working on industrial plant automation software modules, telemetry databases, and real-time process monitoring.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#SAIL", "#IndustrialAutomation", "#ProcessControl", "#EngineeringInternship"]
    }
  ],

  // Structured Knowledge Base for Instant Natural Language Search
  qaKnowledgeBase: [
    {
      keywords: ["bittrace", "bitcoin", "forensic", "forensics", "dfir", "cybersecurity", "memory", "ram", "iso 27037", "postmortem", "volatile"],
      answer: "BitTrace DFIR (Automated Live & Postmortem Bitcoin Forensic Analysis Tool for Windows - Built Sep 2026):\n• **Live Volatile Memory Forensics**: Inspects running wallet processes (Bitcoin-Qt, Electrum, Armory) to recover 12–24 word BIP-39 recovery seeds, WIF/Hex private keys, and Bitcoin addresses with an aligned byte Hex/ASCII viewer.\n• **Postmortem Disk & Registry Analysis**: Scans %APPDATA% for Berkeley DB wallet.dat files (0x00053162), decodes UserAssist ROT13 registry launch logs, and parses Windows Prefetch (.pf) files for uninstalled remnants.\n• **ISO/IEC 27037 Evidence Vault**: Computes SHA-256 and MD5 cryptographic hashes with real-time tamper re-verification and 1-click court-ready printable PDF/HTML reports.\n• **Tech Stack**: Python 3.10+, FastAPI, React 18, Vite, Windows API, Cryptography.\n• **GitHub**: [github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems](https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems)"
    },
    {
      keywords: ["cgpa", "marks", "grades", "percentage", "score", "academic", "standing", "result"],
      answer: "Abhishek maintains an exceptional academic record across engineering and schooling:\n• **B.Tech in ECE (IEM Kolkata, 2023–2027)**: 8.73 CGPA (up to 6th semester) with top department standing.\n• **CBSE Class 12 (PCM + IP)**: 86.5% at M.G.M. Higher Secondary School, Bokaro (2023).\n• **CBSE Class 10**: 95.0% at M.G.M. Higher Secondary School, Bokaro (2021)."
    },
    {
      keywords: ["vlsi", "jadavpur", "semiconductor", "eda", "ic design", "bare-metal", "bare metal"],
      answer: "Abhishek completed a prestigious VLSI Design Internship at Jadavpur University (Dec 2025 – Jan 2026):\n• Studied integrated circuit (IC) design and fabrication methodologies for bare-metal systems.\n• Optimized hardware-software co-design pipelines to reduce computational latency and silicon area.\n• Evaluated time-critical processing architectures using industry-standard EDA simulation suites."
    },
    {
      keywords: ["sail", "steel authority", "industrial", "automation", "bokaro", "vocational trainee"],
      answer: "At Steel Authority of India Limited (SAIL) Bokaro (May 2025 – June 2025):\n• Developed and maintained real-time software modules for plant automation systems.\n• Managed mission-critical database telemetry to monitor continuous plant manufacturing data.\n• Gained practical exposure to heavy industrial process control protocols and automation standards."
    },
    {
      keywords: ["piezo", "wearable", "acupressure", "depression", "healthcare", "wokwi"],
      answer: "Piezo-electric Acupressure Wearable Device (Published with IEEE):\n• Engineered an IoT healthcare wearable simulated on Wokwi and implemented in Embedded C.\n• Integrated piezoelectric transducers to harvest mechanical energy and extend battery autonomy.\n• Interfaced biomedical sensor channels via SPI/I2C for adaptive, non-invasive acupressure therapy.\n• Research accepted and published at IEEE IEMENTECH 2026 (DOI: 10.1109/IEMENTech202669403.2026.11434403)."
    },
    {
      keywords: ["traffic", "vivado", "fsm", "finite state machine", "7-state", "xilinx"],
      answer: "Camera-Assisted Adaptive 7-State Traffic Controller:\n• Synthesized and simulated on Xilinx Vivado with full timing analysis.\n• Architected a 7-state Finite State Machine (FSM) in C to dynamically balance multi-directional traffic flow.\n• Drastically minimized state transition latency and eliminated traffic gridlock conditions."
    },
    {
      keywords: ["fraud", "fraudguard", "credit card", "xgboost", "explainable ai", "xai", "financial fraud"],
      answer: "FraudGuard.AI (Enterprise Real-Time Credit Card Fraud Detection Platform - Released Sep 30, 2026 on GitHub @abhishek947kumar):\n• **Architecture & Performance**: Real-time FastAPI scoring pipeline evaluating transactions in under 2.8ms with 100% recall and 1.000 PR-AUC under extreme ~1% class imbalance.\n• **ML Ensemble**: Cost-weighted XGBoost, Balanced Random Forest, HistGradientBoosting, and unsupervised Isolation Forest for zero-day fraud pattern discovery.\n• **Geo-Velocity & Feature Engineering**: Calculates impossible travel speeds in km/h (card cloning detection), 1h/24h velocity surges, and 30-day cardholder spend outlier ratios.\n• **Explainable AI (XAI)**: Generates transparent risk drivers for regulatory compliance (FCRA, GDPR Art. 22) and automated tiered actions (AUTO_APPROVE, STEP_UP_AUTH, DECLINE_AND_FREEZE).\n• **Repository**: [github.com/abhishek947kumar/credit-card-fraud-detection](https://github.com/abhishek947kumar/credit-card-fraud-detection)"
    },
    {
      keywords: ["dlp", "data leak", "data loss prevention", "cloud dlp", "sqli", "sql injection", "aesx", "aes-256-gcm", "honeypot"],
      answer: "Cloud DLP Shield (Detecting Data Leaks Using SQL & Cloud DLP Architecture - Released Sep 30, 2026 on GitHub @abhishek947kumar):\n• **Dual-Engine Inspection**: Layer 1 Content Engine intercepts SQL injection AST patterns, Luhn-validates credit card numbers, and detects keylogger scripts; Layer 2 Contextual Engine monitors user behavior, query velocity bursts, and sub-15ms typing cadences.\n• **AESX Field Encryption**: Zero-trust AES-256-GCM authenticated encryption with key whitening and 128-bit authentication tags preventing ciphertext tampering.\n• **User Threat Categorization & Honeypots**: Categorizes users into Benign, Suspicious, and Assaulters, serving deceptive Honeytoken decoys to assaulters while locking down sessions.\n• **Real-Time SOC Observability**: Live Server-Sent Events (SSE) threat stream, deep payload AST sandbox terminal, and toggleable 'DLP Shield vs Raw SQL' store demonstration.\n• **Repository**: [github.com/abhishek947kumar/detecting-data-leaks](https://github.com/abhishek947kumar/detecting-data-leaks)"
    },
    {
      keywords: ["splitflow", "expense splitter", "split", "expense", "receipt", "ocr", "debt graph", "settlement"],
      answer: "SplitFlow (Launched Sep 29, 2026 on GitHub @abhishek947kumar):\n• **Architecture**: Modern group expense splitter with real-time multi-currency FX rates, flexible unequal splits, and instant UPI QR payments.\n• **OCR Scanner**: Optical Character Recognition engine parsing itemized receipt totals, taxes, and service fees.\n• **Debt Simplification**: Greedy graph algorithm minimizing transactions across multi-person group trips.\n• **Repository**: [github.com/abhishek947kumar/splitflow](https://github.com/abhishek947kumar/splitflow)"
    },
    {
      keywords: ["pulseflow", "agile", "scrum", "kanban", "burndown", "websockets", "d3", "gantt"],
      answer: "PulseFlow Agile (Launched Sep 29, 2026 on GitHub @abhishek947kumar):\n• **Architecture**: Enterprise agile workspace with real-time WebSocket collaborative boards and multi-theme engine.\n• **Telemetry & Analytics**: D3.js interactive sprint burndown, velocity distribution, and cumulative flow diagrams.\n• **AI Copilot**: Automatically generates user stories, acceptance criteria, and flags scope creep before sprint close.\n• **Repository**: [github.com/abhishek947kumar/pulseflow-agile](https://github.com/abhishek947kumar/pulseflow-agile)"
    },
    {
      keywords: ["github", "recent projects", "last 6 months", "6 months", "latest", "new projects", "last 1 week", "1 week", "last week"],
      answer: "Over the last week and recent releases (September 2026), Abhishek engineered and released major flagship projects on GitHub (@abhishek947kumar) and LinkedIn:\n• **FraudGuard.AI (Sep 30, 2026)**: Enterprise real-time credit card fraud detection platform with sub-10ms scoring, XGBoost ensemble, and Explainable AI (XAI).\n• **Cloud DLP Shield (Sep 30, 2026)**: Enterprise Cloud Data Loss Prevention platform with AST SQLi interception, Luhn validation, AESX field encryption, and live SSE SOC.\n• **SplitFlow (Sep 29, 2026)**: Smart group expense splitter with OCR receipt scanner, live FX conversion, greedy debt simplification graph, and UPI QR settlements.\n• **PulseFlow Agile (Sep 29, 2026)**: Enterprise agile platform with real-time WebSockets, D3.js sprint burndown telemetry, AI Copilot, and Gantt roadmaps.\n• **BitTrace DFIR (Sep 21, 2026)**: Automated Live RAM and Postmortem Bitcoin Forensics Tool for Windows compliant with ISO/IEC 27037.\n• **Embedded-Night-Vision-System (Sep 19, 2026)**: Active IR & thermal sensor fusion with quantized YOLOv2 for real-time pedestrian recognition.\n• **Logistics-Management-System (Sep 18, 2026)**: Enterprise commercial multi-dealer logistics and fleet tracking platform in Python and Django.\n• **YourFinance**: Modern financial control center with AI-driven wealth advice powered by Google Gemini.\n• **Evershop**: High-performance full-stack eCommerce platform built with TypeScript and React."
    },
    {
      keywords: ["publication", "paper", "research", "ieee", "iementech", "doi"],
      answer: "Abhishek's Peer-Reviewed IEEE Publication Details:\n• **Title**: Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy\n• **Conference**: IEEE IEMENTECH 2026\n• **Role**: First Author & Lead Hardware Architect\n• **DOI**: 10.1109/IEMENTech202669403.2026.11434403"
    },
    {
      keywords: ["skills", "technologies", "languages", "tech stack", "python", "c++", "embedded"],
      answer: "Abhishek's verified technical proficiencies:\n• **Programming Languages**: C, C++, Embedded C, Python, MATLAB, JavaScript/TypeScript, SQL\n• **Hardware & Protocols**: ARM/AVR/ESP Microcontrollers, GPIO, UART, SPI, I2C, VLSI Design, Control Systems\n• **EDA & Simulation Tools**: Xilinx Vivado, Wokwi Simulator, Logic Analyzers, Multisim\n• **Security & Forensics**: Live Volatile RAM Triage, ISO/IEC 27037 Evidence Handling, Windows Prefetch & Registry Analysis, Cryptographic Hashing\n• **Software & Web Engineering**: FastAPI, Django, React, REST APIs, Google Gemini AI, Git/GitHub, CI/CD, Agile/Jira"
    },
    {
      keywords: ["why hire", "hire", "placement", "value", "strengths", "fit", "candidate"],
      answer: "Why Abhishek Kumar is a top candidate for engineering teams:\n• **Top Academic Rigor**: 8.73 CGPA in B.Tech ECE with deep fundamentals in OOP, DSA, and Control Systems.\n• **Rare Bridge of Hardware & Software**: Hands-on mastery from bare-metal VLSI/firmware up to Python/FastAPI/Django/AI systems.\n• **Proven Researcher**: First-author IEEE conference publication at IEMENTECH 2026.\n• **Real Industrial Exposure**: On-site internships at Jadavpur University (VLSI EDA) and SAIL (Plant Automation).\n• **Systems & Security Depth**: Built and demonstrated end-to-end DFIR platforms (BitTrace) and real-time ADAS edge models.\n• **Placement Ready**: Immediately productive in Embedded Systems, Firmware, Hardware Design, or Software Engineering roles."
    },
    {
      keywords: ["contact", "email", "phone", "reach", "call", "address", "location", "message", "portfolio", "website", "live link", "link", "url"],
      answer: "Direct contact channels & portfolio links for Abhishek Kumar:\n• **Live Portfolio**: [abhishek947kumar.github.io/portfolio](https://abhishek947kumar.github.io/portfolio/)\n• **Email**: abhishek1297kumar@gmail.com\n• **Phone / WhatsApp**: +91 9470303282\n• **LinkedIn**: [linkedin.com/in/abhishek947kumar](https://www.linkedin.com/in/abhishek947kumar)\n• **GitHub**: [github.com/abhishek947kumar](https://github.com/abhishek947kumar)\n• **Locations**: Kolkata, West Bengal & Bokaro Steel City, Jharkhand"
    },
    {
      keywords: ["activities", "ieee", "sytron", "quizzophrenia", "societies"],
      answer: "Professional societies and extracurricular leadership:\n• Active Member of IEEE, IEEE MTT-S (Microwave Theory and Technology), and IEEE CAS-S (Circuits & Systems).\n• Official Event Volunteer at SYTRON '25.\n• Active participant and competitor in QUIZZOPHRENIA '25."
    }
  ]
};
