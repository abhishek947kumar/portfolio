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
      "Dual Expertise: Strong grasp across both bare-metal hardware/embedded firmware (Verilog HDL, Vivado, C/C++, microcontrollers) and high-level software & systems engineering (Python, PyTorch, FastAPI, Django, React, AI Cloud).",
      "Computer Architecture & Processor Design: Engineered a complete 32-bit 5-stage pipelined MIPS processor core in Verilog HDL with hazard detection, data forwarding, custom Python cross-assembler, and Artix-7 Basys 3 FPGA synthesis in Xilinx Vivado (94 mW power, 0 DRC errors).",
      "SoC Bus Protocols & Memory Systems: Implemented industry-standard AMBA AXI4 protocol subsystem on FPGA (5 channels, multi-beat bursts, crossbar router, AXI4-Lite bridge, 100 MHz Artix-7 timing closure), synthesizable dual-port BRAM/LUT-RAM semiconductor memories, and combinational sensor decision units.",
      "Deep Learning & Multimodal AI: Architected Neural Image Caption Studio (PyTorch MobileNetV3/ResNet-50 + LSTM with Beam Search & token probabilities) and ReturnGuard (Autonomous ReAct agent with multimodal vision defect inspection).",
      "Published IEEE Researcher: First-author publication at IEEE IEMENTECH 2026 on wearable piezoelectric energy harvesting & healthcare technology.",
      "Machine Learning & Cyber Defense: Engineered FraudGuard.AI (sub-10ms XGBoost ensemble & Explainable AI for real-time payment fraud prevention) and Cloud DLP Shield (dual-engine AST SQLi detection & AESX authenticated field encryption).",
      "Digital Forensics & Systems Security: Architected BitTrace DFIR for live volatile RAM inspection and ISO/IEC 27037 evidence preservation.",
      "Computer Vision & Gesture Systems: Engineered AirCanvas AI, a real-time touchless drawing application utilizing MediaPipe 21-landmark 3D hand tracking, velocity-adaptive EMA coordinate smoothing, and touchless dwell/pinch interactions.",
      "Computer Vision & Edge Pipelines: Built PlateVision AI (8-stage OpenCV ALPR pipeline with Tesseract OCR multi-PSM ensemble) and Embedded Night-Vision ADAS (active IR + thermal sensor fusion with YOLOv2).",
      "Hands-On Industrial Internships: Bare-metal IC design optimization at Jadavpur University & plant automation software systems at SAIL (Steel Authority of India Limited).",
      "Active Continuous Learner: Built & deployed 22+ production-grade software, AI, cybersecurity, and embedded systems in 2026 alone with continuous GitHub releases (@abhishek947kumar)."
    ],
    targetRoles: [
      "Embedded Software Engineer / Firmware Engineer",
      "VLSI Design & Hardware Systems Engineer",
      "Processor & Computer Architecture Engineer",
      "AI / Machine Learning Engineer (Deep Learning & Computer Vision)",
      "Digital Forensics & Incident Response (DFIR) / Systems Security Engineer",
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
      id: "axi-protocol-fpga",
      title: "AMBA AXI4 High-Performance Protocol Subsystem on FPGA",
      subtitle: "5-Channel Memory-Mapped Engine, Multi-Beat Bursts (INCR/WRAP/FIXED), Crossbar Router & 100MHz Artix-7 Timing Closure",
      badge: "Latest (Oct 2026) | SoC Bus Protocols & VLSI",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/axi-protocol-fpga",
      tags: ["Verilog HDL", "AMBA AXI4", "AXI4-Lite", "Xilinx Vivado", "Artix-7", "SystemVerilog (SVA)", "SoC Interconnect", "Bus Protocols", "Timing Closure"],
      description: "An industry-standard implementation of the ARM AMBA AXI4 communication protocol subsystem for Xilinx FPGAs. Implements high-throughput memory-mapped transfers across 5 independent channels (AW, W, B, AR, R), multi-beat burst generation (INCR, WRAP, FIXED), crossbar interconnect with address decoding, protocol conversion to AXI4-Lite CSR peripherals, and 100 MHz timing closure on Xilinx Artix-7.",
      highlights: [
        "Full AMBA AXI4 5-Channel Engine: Concurrent bidirectional transfers with decoupled handshake signaling (VALID/READY), supporting burst lengths up to 256 beats and outstanding transactions.",
        "Single-Cycle WRAP Hardware Optimization: Patented bitwise masking formula replacing hardware division/multiplication for power-of-2 cacheline WRAP bursts, saving DSP48 slices and eliminating multi-cycle latency.",
        "Crossbar Router & Protocol Bridge: Address-decoding 1x2 interconnect routing bursts to high-speed dual-port BRAM and protocol bridging single-beat transfers to AXI4-Lite control/status registers with DECERR error handling.",
        "100 MHz Timing Closure & SVA Verification: Synthesized on Xilinx Artix-7 (xc7a35t) meeting timing at 106.4 MHz (+0.605ns positive WNS, 0 failing endpoints) with 21/21 passed testbench verification scenarios validated with SystemVerilog Assertions (SVA)."
      ]
    },
    {
      id: "sensor-status-decision-unit",
      title: "Sensor Status Decision Unit in Verilog HDL & Artix-7 FPGA",
      subtitle: "Combinational Range Telemetry Classifier (Normal / Warning / Critical), Status LED Drivers & Vivado Synthesis",
      badge: "Latest (Oct 2026) | Verilog & FPGA Logic",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/sensor-status-decision-unit",
      tags: ["Verilog HDL", "Xilinx Vivado", "Artix-7", "FPGA", "Combinational Logic", "Sensor Telemetry", "Hardware Design", "Basys 3"],
      description: "An optimized, combinational logic-based decision unit designed in Verilog HDL and synthesized for AMD/Xilinx Artix-7 FPGA (Digilent Basys 3) using Vivado Design Suite. Real-time classification of raw 8-bit digital sensor telemetry into Normal, Warning, and Critical states with zero-latency hardware LED drivers and critical audio/visual alarm outputs.",
      highlights: [
        "Pure Combinational Architecture: Single-cycle, zero-latency combinational datapath (zero flip-flops, zero latches) evaluating 8-bit unsigned sensor telemetry (0 to 255) in real time.",
        "Deterministic 3-State Partitioning: Classifies inputs into Normal (0–49, green LED), Warning (50–79, yellow LED), and Critical (80–255, red LED + continuous alarm buzzer) operational states.",
        "FPGA Synthesis & Timing Verification: Fully synthesized, placed, and routed for AMD/Xilinx Artix-7 (XC7A35TCPG236-1) with complete Basys 3 XDC constraints and clean DRC reports.",
        "Automated Verification & Interactive CLI: Exhaustive testbench covering boundary edge conditions (49/50, 79/80, 0, 255) alongside an interactive Python terminal tester."
      ]
    },
    {
      id: "simple-memory-module",
      title: "Synthesizable Synchronous RAM Modules in Verilog RTL",
      subtitle: "Parameterized Single-Port & True Dual-Port RAMs, READ/WRITE_FIRST Modes & Vivado BRAM Synthesis",
      badge: "Latest (Oct 2026) | Semiconductor Memories & RTL",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/simple-memory-module",
      tags: ["Verilog HDL", "Xilinx Vivado", "RAM", "Block RAM (BRAM)", "Distributed LUT RAM", "FPGA", "RTL Design", "Digital Design"],
      description: "A production-ready, synthesizable semiconductor RAM memory project in Verilog RTL developed for AMD/Xilinx Vivado and open-source simulators (Icarus Verilog CI). Demonstrates parameterized Single-Port and True Dual-Port synchronous RAM architectures synthesized into FPGA Block RAM (BRAM) and Distributed LUT RAM primitives with timing and resource utilization benchmarks.",
      highlights: [
        "Single-Port & True Dual-Port Architectures: Parameterized address and data widths supporting independent synchronous read/write access with concurrent clock domains and chip enables.",
        "Read-During-Write Hazard Mitigation: Implements both READ_FIRST (native BRAM read-before-write) and WRITE_FIRST (transparent feed-through) memory access behaviors.",
        "FPGA Hardware Mapping: Synthesizable into Xilinx 7-Series target primitives, validating automated inference between dedicated Block RAM (BRAM) and distributed Slice LUT-RAM.",
        "Self-Checking Verification & CI: Comprehensive testbench with automated data integrity scoreboards running in continuous integration (GitHub Actions + Icarus Verilog)."
      ]
    },
    {
      id: "air-canvas-ai",
      title: "AirCanvas AI — Touchless Gesture-Based Virtual Drawing System",
      subtitle: "MediaPipe 21-Landmark Hand Tracking, Velocity-Adaptive EMA Smoothing, 7-Color Palette & Virtual Canvas",
      badge: "Latest (Oct 2026) | Computer Vision & AI Gestures",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/air-canvas-ai",
      tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "NumPy", "Gesture Recognition", "Interactive AI", "Digital Canvas"],
      description: "A real-time, touchless drawing application that transforms physical hand gestures into digital brush strokes via webcam, enabling users to create art in the air without a mouse, keyboard, or touchscreen. Powered by Google MediaPipe Hand Landmarker (21 3D landmarks) and velocity-adaptive Exponential Moving Average (EMA) coordinate smoothing.",
      highlights: [
        "3D Hand Landmarker Pipeline: Tracks 21 3D hand coordinates in real time at 30+ FPS using MediaPipe, distinguishing single-finger drawing, two-finger pointer/hover, 3-finger/fist eraser, and 5-finger hold-to-clear gestures.",
        "Velocity-Adaptive EMA Smoothing: Implements an exponential moving average filter with dynamic alpha scaling that eliminates camera sensor jitter during slow deliberate drawing while preserving responsiveness during rapid strokes.",
        "Touchless Interactive Studio: Dual-panel workspace with live mirrored skeleton webcam feed and digital drawing canvas featuring 7 vibrant colors, 4 brush thicknesses, dwell-time visual countdown, and instant thumb-index pinch selection.",
        "Advanced Canvas Controls: Hold-to-clear 5-finger palm confirmation, multi-level stroke undo/redo stack, eraser mode, dark slate / light paper theme toggling, and timestamped high-resolution PNG export."
      ]
    },
    {
      id: "mips-32bit-processor",
      title: "32-Bit 5-Stage Pipelined MIPS Processor Core in Verilog & Vivado",
      subtitle: "Hazard Resolution Unit, Hardware Forwarding, Custom Python Cross-Assembler & Basys 3 FPGA Synthesis",
      badge: "Latest (Oct 2026) | VLSI & Processor Architecture",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",
      tags: ["Verilog HDL", "Xilinx Vivado", "MIPS32 ISA", "5-Stage Pipeline", "FPGA", "Artix-7", "Hardware Forwarding", "Python Assembler", "Computer Architecture"],
      description: "A production-grade, 5-stage pipelined 32-bit MIPS processor core designed in Verilog HDL following the classic Patterson & Hennessy microarchitecture. Verified via cycle-accurate simulation with custom assembly benchmarks and synthesized targeting Xilinx Artix-7 FPGAs (XC7A35TCPG236-1 / Basys 3) with zero DRC violations and 94 mW total power consumption.",
      highlights: [
        "Pipelined Microarchitecture & Hazards: 5-stage datapath (IF -> ID -> EX -> MEM -> WB) with EX-to-EX and MEM-to-EX forwarding (zero-stall on ALU-ALU RAW dependencies), hardware load-use hazard detection unit (automatic 1-cycle bubble insertion), and branch/jump pipeline flush control.",
        "FPGA Synthesis & Low Power: Synthesized on Xilinx Artix-7 Basys 3 FPGA utilizing 2,810 Slice LUTs (13.51%), 1,569 Flip-Flops (3.77%), and 0 Block RAM (leveraging distributed LUT-RAM), drawing only 94 mW total on-chip power with zero DRC errors.",
        "Custom Two-Pass Cross-Assembler: Built a Python assembler translating symbolic MIPS assembly to hex/binary MIF memory initialization files with pseudo-instruction macro expansion, label resolution, and syntax validation.",
        "Peripherals & Verification Suite: 4/4 passing automated assembly benchmark suites (Fibonacci sequence, ALU stress, memory load/store, hazard forward verification) with time-multiplexed 4-digit 7-segment display driver and 16 status LEDs."
      ]
    },
    {
      id: "neural-image-caption-studio",
      title: "Neural Image Caption Studio — Deep Learning Vision-Language Generator",
      subtitle: "PyTorch CNN (MobileNetV3/ResNet-50) + LSTM Decoder, Dual Beam Search & Cyber-Neural Studio",
      badge: "Latest (Oct 2026) | Deep Learning & Multimodal AI",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/image-caption-generator",
      tags: ["PyTorch", "Python", "FastAPI", "Deep Learning", "Computer Vision", "LSTM", "MobileNetV3", "Beam Search", "BLEU Lab", "Multimodal AI"],
      description: "A full-stack, production-grade computer vision and NLP multimodal system that translates visual scenes into coherent natural language descriptions using merged CNN feature extractors and autoregressive LSTM language decoders trained on Flickr8k.",
      highlights: [
        "Multimodal Architecture: Combines pre-trained CNN backbones (MobileNetV3 & ResNet-50) with word embedding projections and a 256-unit LSTM recurrent language decoder utilizing teacher forcing and gradient clipping.",
        "Dual Autoregressive Decoding: Implements both ultra-fast greedy argmax search and multi-trajectory Beam Search with length penalty normalization (alpha = 0.7) for optimal linguistic diversity.",
        "Cyber-Neural Web Studio: Interactive dark glassmorphic dashboard featuring drag-and-drop image analysis, token-level softmax inspection tray, Web Speech API text-to-speech (TTS), and top-5 visual concept class activations.",
        "BLEU Benchmark Lab & Feature Caching: Integrated metric calculation suite for BLEU-1 through BLEU-4 with Brevity Penalty (BP), alongside offline penultimate feature caching (features_cache.pt) enabling full training epochs in seconds."
      ]
    },
    {
      id: "return-guard",
      title: "ReturnGuard — Autonomous ReAct E-Commerce AI Refund Agent",
      subtitle: "ReAct Cognitive Loop, Multimodal CV Defect Inspection, Policy Matrix & AI Governance Guardrails",
      badge: "Latest (Oct 2026) | Autonomous AI Agents & Vision",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/Return-Guard",
      tags: ["Python", "FastAPI", "React 18", "Autonomous Agents", "ReAct Framework", "Multimodal Vision", "AI Governance", "Anti-Fraud", "REST APIs"],
      description: "An autonomous, governed ReAct (Reasoning and Acting) AI agent that evaluates customer return inquiries, verifies order states, analyzes category return policies across 6 retail verticals, inspects defect photos via multimodal computer vision, and triggers automated refund/escalation workflows.",
      highlights: [
        "Autonomous ReAct Cognitive Loop: Step-by-step reasoning trace (Thought -> Action -> Observe) providing a fully transparent internal monologue and tool execution telemetry, resolving valid low-risk returns in under 850ms.",
        "Multimodal Computer Vision Inspection: Evaluates uploaded product defect photos to verify physical damage claims (e.g. cracked displays, broken seal tags, crushed packaging) before granting return approvals.",
        "Multi-Dimensional Anti-Fraud Engine: Detects wardrobing (used occasion wear returned late), serial returners, and empty-box abuse across dynamic policy matrices for Electronics, Fashion, Beauty, and Footwear.",
        "Hard AI Governance & HITL Desk: Programmatic $500 autonomous ceiling with Human-in-the-Loop (HITL) supervisor triage desk for high-value edge cases, achieving ~81% autonomous resolution throughput."
      ]
    },
    {
      id: "platevision-ai",
      title: "PlateVision AI — Automatic License Plate Recognition (ALPR)",
      subtitle: "8-Stage OpenCV Pipeline, Tesseract OCR Multi-PSM Ensemble, Deskewing & FastAPI Web Visualizer",
      badge: "Latest (Oct 2026) | Computer Vision & ALPR",
      createdPeriod: "Latest Release",
      githubUrl: "https://github.com/abhishek947kumar/license-plate-recognition",
      tags: ["Python", "OpenCV", "Tesseract OCR", "Computer Vision", "FastAPI", "Digital Image Processing", "Edge Detection", "Docker"],
      description: "An end-to-end, production-grade Automatic License Plate Recognition (ALPR/ANPR) system featuring an 8-stage Computer Vision pipeline, dual-engine comparison (Baseline vs Advanced), multi-PSM Tesseract OCR ensemble, and an interactive dark-mode web visualizer.",
      highlights: [
        "8-Stage Computer Vision Pipeline: Employs Bilateral Filtering, Morphological TopHat/BlackHat contrast enhancement, Canny Edge Detection, Contour Aspect Ratio (1.5 <= AR <= 6.0) & Solidity Filtering, and Perspective Transform / Deskewing to isolate license plates under harsh glare, shadows, and steep angles.",
        "Multi-PSM OCR Ensemble: Ensembles Tesseract Page Segmentation Modes (--psm 8, 7, and 6) with border padding, character whitelisting, and regex sanitization to maximize alphanumeric plate accuracy.",
        "Dual-Engine Benchmark: Implements both classic OpenCV contour detection and an Advanced Enhanced Pipeline that resolves real-world vehicle grille and windshield false positives.",
        "Interactive Web Visualizer: Modern dark glassmorphic dashboard with real-time CV stage breakdown inspector, webcam/video feed analysis, CLI batch processing, and containerized Docker deployment."
      ]
    },
    {
      id: "fraudguard-ai",
      title: "FraudGuard.AI — Real-Time Credit Card Fraud Detection Platform",
      subtitle: "Sub-10ms Risk Scoring, XGBoost Ensemble, Explainable AI & Automated Tiered Action Rules",
      badge: "Flagship | AI & Cyber Defense",
      createdPeriod: "Last 1 Month",
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
      { name: "Processor Design, VLSI & Digital Logic", icon: "git-commit", level: 96 },
      { name: "Deep Learning, Multimodal AI & Vision", icon: "cpu", level: 95 },
      { name: "Cloud Security, DLP & Digital Forensics", icon: "shield", level: 94 },
      { name: "Embedded Systems, Firmware & IoT", icon: "chip", level: 93 },
      { name: "FinTech, Real-Time Web & Telemetry", icon: "activity", level: 92 },
      { name: "Backend, Systems & API Architecture", icon: "layers", level: 91 }
    ],
    categories: [
      {
        id: "ai-ml",
        name: "AI, Deep Learning & Computer Vision",
        icon: "🤖",
        projectContext: "AirCanvas AI, Neural Image Caption Studio, ReturnGuard ReAct Agent, PlateVision ALPR & FraudGuard.AI",
        skills: [
          "MediaPipe Hand Landmarker (21 3D)", "Velocity-Adaptive EMA Smoothing", "Gesture Recognition Systems",
          "PyTorch & Torchvision", "CNN + LSTM Encoder-Decoder", "Beam Search Decoding (alpha=0.7)",
          "Autonomous ReAct Agents", "Multimodal Defect Vision", "8-Stage OpenCV ALPR",
          "Tesseract OCR Ensemble", "XGBoost Ensemble", "Explainable AI (XAI / SHAP)",
          "Scikit-Learn", "Balanced Random Forest", "Computer Vision (YOLOv2)",
          "Active IR + Thermal Sensor Fusion", "Google Gemini AI API", "PR-AUC Optimization"
        ]
      },
      {
        id: "embedded-hardware",
        name: "Processor Architecture, Embedded Systems & VLSI",
        icon: "🔌",
        projectContext: "AMBA AXI4 Protocol Subsystem, MIPS 32-Bit Core, Dual-Port BRAM, Sensor Unit & Vivado FPGA",
        skills: [
          "Verilog HDL", "AMBA AXI4 Protocol Subsystem", "MIPS32 Core Architecture", "5-Stage Pipelining (IF/ID/EX/MEM/WB)",
          "Hazard Detection & EX/MEM Forwarding", "Xilinx Vivado (Artix-7 XC7A35T Basys 3)", "Block RAM (BRAM) & Distributed LUT-RAM",
          "Single-Cycle WRAP Boundary Optimization", "Combinational Sensor Decision Logic", "SystemVerilog (SVA) Verification",
          "Custom Cross-Assembler (Python)", "Microcontrollers (ARM, AVR, ESP32)", "Embedded C / C++",
          "Hardware Interfacing (GPIO, UART, SPI, I2C)", "Wokwi IoT Simulator",
          "Bare-Metal EDA Optimization", "Gate-Level Delay Benchmarking", "Control Systems"
        ]
      },
      {
        id: "security-forensics",
        name: "Cloud Security & Digital Forensics",
        icon: "🛡️",
        projectContext: "Cloud DLP Shield, BitTrace DFIR & Security Suite",
        skills: [
          "Cloud DLP Architecture", "AST SQLi Interception", "AES-256-GCM Authenticated Encryption",
          "AuthTag Cryptographic Verification", "Volatile Memory (RAM) Triage", "ISO/IEC 27037 Evidence Handling",
          "Windows Prefetch (.pf) & Registry Analysis", "Luhn PAN Validation", "Honeytoken Decoy Defense"
        ]
      },
      {
        id: "fintech-realtime",
        name: "FinTech & Real-Time Distributed Systems",
        icon: "⚡",
        projectContext: "SplitFlow, PulseFlow Agile & Cloud DLP SOC",
        skills: [
          "Greedy Graph Debt Minimization", "Bidirectional WebSockets", "Server-Sent Events (SSE)",
          "D3.js Sprint Burndown Telemetry", "OCR Receipt Scanning & Parsing", "Live FX Exchange Rate APIs",
          "Dynamic UPI QR Code Generation", "Interactive Gantt Dependency Timelines"
        ]
      },
      {
        id: "languages-frameworks",
        name: "Languages & Full-Stack Engineering",
        icon: "💻",
        projectContext: "Production Full-Stack & Microservices",
        skills: [
          "Python (FastAPI, Django)", "C / C++", "Embedded C", "JavaScript / TypeScript",
          "Node.js & Express", "React 18", "SQL (PostgreSQL, SQLite)", "MATLAB", "RESTful APIs",
          "Git / GitHub / CI-CD", "Linux / Bash", "LaTeX", "Agile / Scrum (Jira)"
        ]
      }
    ],
    languages: [
      { name: "Python", level: 96, tag: "AI, PyTorch, FastAPI, Django, Forensics, CV" },
      { name: "Verilog HDL", level: 95, tag: "AMBA AXI4, MIPS Core, Vivado FPGA Synthesis, Basys 3" },
      { name: "C / C++", level: 92, tag: "Embedded Systems, Bare-Metal, Vivado FSM" },
      { name: "Embedded C", level: 91, tag: "Microcontrollers (ARM, AVR, ESP), Sensors" },
      { name: "JavaScript / TypeScript", level: 90, tag: "Node.js, Express, React, WebSockets, D3" },
      { name: "SQL", level: 88, tag: "PostgreSQL, SQLite, AST SQLi Defense" },
      { name: "MATLAB", level: 85, tag: "Signal Modeling & Simulation" },
      { name: "OOP Architecture", level: 92, tag: "Object-Oriented Design & Clean Code" }
    ],
    tools: [
      "PyTorch", "OpenCV", "Tesseract OCR", "Xilinx Vivado", "Artix-7 Basys 3 FPGA",
      "AMBA AXI4 Bus Interconnect", "SystemVerilog (SVA)", "Icarus Verilog",
      "FastAPI", "XGBoost", "Scikit-Learn", "Node.js", "Express", "React 18", "D3.js",
      "Django", "Wokwi Simulator", "Git / GitHub", "CI/CD Pipelines", "Docker",
      "PostgreSQL", "SQLite", "Linux / Bash", "EDA Tools", "WebSockets", "Server-Sent Events", "LaTeX", "Agile / Jira"
    ],
    fundamentals: [
      "SoC Bus Protocols & Handshakes (AMBA AXI4 / AXI-Lite)",
      "Synchronous Semiconductor Memory Synthesis (BRAM & LUT-RAM)",
      "Real-Time ML Inference & Explainable AI (XAI)",
      "Zero-Trust Cryptography & Authenticated Encryption (AESX)",
      "Greedy Graph Debt Simplification & FSM Control Logic",
      "Digital Evidence Preservation (ISO/IEC 27037)",
      "Sensor Fusion & Edge Computer Vision",
      "Hardware-Software Co-Design & Bare-Metal EDA",
      "Data Structures & Algorithms (DSA) & OOP",
      "Real-Time Telemetry & WebSocket Concurrency"
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
      id: "post-li-aircanvas",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 25, 2026",
      title: "Launched AirCanvas AI — Touchless Gesture Drawing System with MediaPipe & Python! 🎨🖐️",
      content: "Delighted to release AirCanvas AI: a real-time touchless drawing application transforming hand gestures into digital brush strokes via webcam! Uses Google's MediaPipe Hand Landmarker to track 21 3D landmarks at 30+ FPS, paired with a custom velocity-adaptive Exponential Moving Average (EMA) filter that completely eliminates camera sensor jitter. Features a dual-panel studio with skeleton tracking, 7 vibrant colors, 4 brush thicknesses, dwell-time & pinch selection, hold-to-clear palm confirmation, and high-res PNG export.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#ComputerVision", "#MediaPipe", "#Python", "#OpenCV", "#GestureRecognition", "#AI", "#HCI"]
    },
    {
      id: "post-gh-aircanvas",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "October 25, 2026",
      title: "Released air-canvas-ai on GitHub @abhishek947kumar 🎨",
      content: "Touchless gesture-based virtual drawing system in Python using MediaPipe 3D Hand Landmarker, OpenCV, velocity-adaptive EMA coordinate smoothing, and touchless dwell & pinch selection.",
      url: "https://github.com/abhishek947kumar/air-canvas-ai",
      tags: ["#Python", "#OpenCV", "#MediaPipe", "#ComputerVision", "#GestureRecognition"]
    },
    {
      id: "post-li-sensor",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 25, 2026",
      title: "Synthesized Combinational Sensor Status Decision Unit on Artix-7 FPGA in Vivado! 🚨⚡",
      content: "Excited to open-source my latest digital design project: an optimized Sensor Status Decision Unit implemented in Verilog HDL! The architecture performs pure combinational classification of raw 8-bit digital sensor telemetry (0-255) into Normal (0-49), Warning (50-79), and Critical (80-255) operational states with single-cycle zero latency (zero FFs, zero latches). Features active LED status indicators, critical audio/visual alarm outputs, Basys 3 XDC constraints, and an interactive Python terminal tester.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#Verilog", "#FPGA", "#Vivado", "#Basys3", "#DigitalDesign", "#Hardware", "#Telemetry"]
    },
    {
      id: "post-gh-sensor",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "October 25, 2026",
      title: "Released sensor-status-decision-unit on GitHub @abhishek947kumar 🚨",
      content: "Combinational logic-based sensor decision unit designed in Verilog HDL using AMD/Xilinx Vivado. Classifies 8-bit digital sensor input into Normal, Warning, and Critical states with active LED indicators, alarm buzzer, and automated test suite.",
      url: "https://github.com/abhishek947kumar/sensor-status-decision-unit",
      tags: ["#Verilog", "#Vivado", "#FPGA", "#OpenSource", "#Artix7"]
    },
    {
      id: "post-li-memory",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 25, 2026",
      title: "Synthesized Parameterized Synchronous RAM Modules in Vivado RTL! 💾⚡",
      content: "Proud to share my latest semiconductor memory project: Synthesizable Synchronous RAM Modules in Verilog-2001! Demonstrates parameterized Single-Port and True Dual-Port RAM architectures with configurable address and data widths, handling READ_FIRST and WRITE_FIRST (transparent) modes. Synthesized targeting Xilinx Artix-7 FPGAs with automated inference between Block RAM (BRAM) and Distributed LUT-RAM primitives, verified with automated Icarus Verilog CI testbenches.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#Verilog", "#MemoryDesign", "#BRAM", "#Vivado", "#FPGA", "#Semiconductors", "#RTL"]
    },
    {
      id: "post-gh-memory",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "October 25, 2026",
      title: "Pushed simple-memory-module to GitHub @abhishek947kumar 💾",
      content: "Synthesizable Single-Port and True Dual-Port synchronous RAM modules in Verilog RTL with Vivado synthesis scripts, timing/utilization reports, and GitHub Actions CI workflow.",
      url: "https://github.com/abhishek947kumar/simple-memory-module",
      tags: ["#Verilog", "#FPGA", "#Vivado", "#RAM", "#OpenSource"]
    },
    {
      id: "post-li-axi",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 23, 2026",
      title: "Architected AMBA AXI4 Protocol Subsystem on FPGA with 100 MHz Timing Closure! 🏛️⚡",
      content: "Thrilled to unveil my AMBA AXI4 High-Performance Protocol Subsystem for Xilinx FPGAs! Implements full 5-channel memory-mapped transfers (AW, W, B, AR, R) with multi-beat burst engines (INCR, WRAP, FIXED), crossbar interconnect with address decoding, and an AXI4-Lite CSR bridge. Features single-cycle bitwise WRAP boundary masking that completely eliminates DSP48 multiplier slices. Synthesized with Vivado on Artix-7 meeting timing at 106.4 MHz (+0.605ns positive WNS) with 21/21 passing verification scenarios validated via SystemVerilog Assertions (SVA).",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#AMBA", "#AXI4", "#Verilog", "#FPGA", "#Vivado", "#SystemVerilog", "#SoC", "#VLSI", "#TimingClosure"]
    },
    {
      id: "post-gh-axi",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "October 23, 2026",
      title: "Open-Sourced axi-protocol-fpga on GitHub @abhishek947kumar 🏛️",
      content: "Complete AMBA AXI4 communication protocol subsystem for Xilinx Artix-7 FPGAs with 5-channel burst engine, 1x2 crossbar router, AXI4-Lite bridge, dual-port BRAM slave, 100 MHz timing closure, and SystemVerilog SVA test suite.",
      url: "https://github.com/abhishek947kumar/axi-protocol-fpga",
      tags: ["#AXI4", "#AMBA", "#Verilog", "#FPGA", "#Vivado", "#OpenSource"]
    },
    {
      id: "post-li-mips",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 23, 2026",
      title: "Synthesized 32-Bit 5-Stage Pipelined MIPS Processor Core on Artix-7 FPGA in Vivado! ⚡💻",
      content: "Delighted to release my latest computer architecture project: a complete 32-bit 5-stage pipelined MIPS processor core implemented in Verilog HDL! Implements full hardware forwarding (EX-to-EX, MEM-to-EX), hardware load-use hazard stall insertion, and branch flush logic. Synthesized in Xilinx Vivado 2019.2 for the Artix-7 Basys 3 FPGA (2,810 LUTs, 1,569 FFs, 94 mW total power, 0 DRC violations). Features a custom two-pass Python cross-assembler and 4-digit 7-segment hardware telemetry driver.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#Verilog", "#MIPS", "#FPGA", "#Vivado", "#ComputerArchitecture", "#VLSI", "#DigitalDesign"]
    },
    {
      id: "post-gh-mips",
      platform: "GitHub",
      author: "abhishek947kumar",
      date: "October 23, 2026",
      title: "Pushed mips-32bit-pipelined-processor to GitHub @abhishek947kumar 🚀",
      content: "Open-sourced 5-stage pipelined MIPS processor core in Verilog HDL with Patterson & Hennessy microarchitecture, custom Python cross-assembler, Basys 3 FPGA constraints, and 4/4 passing automated assembly benchmark suites.",
      url: "https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",
      tags: ["#Verilog", "#MIPS", "#FPGA", "#Vivado", "#OpenSource"]
    },
    {
      id: "post-li-caption",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 17, 2026",
      title: "Unveiled Neural Image Caption Studio: Deep Learning Multimodal AI! 🌌🤖",
      content: "Excited to share Neural Image Caption Studio, a full-stack deep learning application combining CNN feature extractors (MobileNetV3/ResNet-50) with an autoregressive LSTM language decoder trained on Flickr8k. Features dual decoding (Greedy & Beam Search with length penalty alpha=0.7), an interactive token probability inspector tray, Web Speech API TTS, and a standalone BLEU metric evaluation laboratory.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#DeepLearning", "#PyTorch", "#ComputerVision", "#NLP", "#FastAPI", "#MachineLearning"]
    },
    {
      id: "post-li-returnguard",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 17, 2026",
      title: "Launched ReturnGuard: Autonomous ReAct E-Commerce AI Refund Agent! 🛡️🛍️",
      content: "Thrilled to present ReturnGuard, an autonomous ReAct (Reasoning and Acting) AI agent engineered for governed e-commerce returns. Features an automated cognitive loop (Thought -> Action -> Observe), multimodal computer vision defect inspection, anti-fraud policy enforcement against wardrobing and empty-box claims, and a Human-in-the-Loop review desk. Achieves ~81% autonomous resolution throughput in sub-850ms.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#AutonomousAgents", "#ReAct", "#AI", "#ComputerVision", "#FastAPI", "#React", "#FinTech"]
    },
    {
      id: "post-li-platevision",
      platform: "LinkedIn",
      author: "Abhishek Kumar",
      date: "October 5, 2026",
      title: "Built PlateVision AI: Automatic License Plate Recognition System! 🚗📸",
      content: "Engineered PlateVision AI, an end-to-end production ALPR/ANPR system featuring an 8-stage Computer Vision pipeline (Bilateral Filtering, Morphological TopHat/BlackHat, Canny, Aspect Ratio & Solidity filters, Perspective Deskewing) combined with a multi-PSM Tesseract OCR ensemble, dark-mode web visualizer, and FastAPI REST API.",
      url: "https://www.linkedin.com/in/abhishek947kumar",
      tags: ["#ComputerVision", "#OpenCV", "#OCR", "#Tesseract", "#Python", "#FastAPI", "#ImageProcessing"]
    },
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
      keywords: ["aircanvas", "air canvas", "gesture", "drawing", "hand tracking", "mediapipe", "hand landmarker", "touchless", "brush", "canvas"],
      answer: "AirCanvas AI — Touchless Gesture-Based Virtual Drawing System (Released Oct 25, 2026):\n• **Computer Vision & Hand Tracking**: Powered by Google MediaPipe Hand Landmarker tracking 21 3D hand landmarks in real time at 30+ FPS, distinguishing draw (1 finger), select/hover (2 fingers), erase (3 fingers/fist), and hold-to-clear (5-finger open palm) states.\n• **Velocity-Adaptive EMA Smoothing**: Features an adaptive exponential moving average filter with dynamic alpha coefficient scaling based on fingertip velocity, eliminating camera sensor jitter while preserving sharp corners and rapid strokes.\n• **Interactive Studio**: Dual-panel interface with mirrored camera feed and high-resolution digital art canvas featuring 7 vibrant colors, 4 brush thicknesses, dwell-time visual countdown, and instant thumb-index pinch selection.\n• **Advanced Features**: Multi-level stroke undo/redo stack, hold confirmation for canvas clearing, dark/light paper theme toggle, and 1-click timestamped PNG export.\n• **Repository**: [github.com/abhishek947kumar/air-canvas-ai](https://github.com/abhishek947kumar/air-canvas-ai)"
    },
    {
      keywords: ["sensor", "sensor status", "decision unit", "telemetry", "alarm", "normal_led", "warning_led", "critical_led", "combinational logic"],
      answer: "Sensor Status Decision Unit (Verilog HDL & Artix-7 FPGA - Released Oct 25, 2026 on GitHub @abhishek947kumar):\n• **Combinational Architecture**: Optimized combinational logic core in Verilog HDL evaluating raw 8-bit unsigned digital telemetry (0-255) with single-cycle zero latency (zero flip-flops, zero latches).\n• **Operational States**: Maps telemetry into 3 discrete states: Normal (0-49, green LED), Warning (50-79, yellow LED), and Critical (80-255, red LED + continuous alarm buzzer output).\n• **FPGA Synthesis**: Synthesized and routed for AMD/Xilinx Artix-7 (XC7A35TCPG236-1 / Basys 3) using Vivado Design Suite with clean DRC reports and Basys 3 XDC constraints.\n• **Interactive Tester**: Includes automated testbenches covering edge boundaries (49/50, 79/80, 0, 255) alongside an interactive Python CLI simulator.\n• **Repository**: [github.com/abhishek947kumar/sensor-status-decision-unit](https://github.com/abhishek947kumar/sensor-status-decision-unit)"
    },
    {
      keywords: ["ram", "memory module", "simple memory", "dual-port", "single-port", "bram", "lut ram", "read_first", "write_first", "semiconductor memory"],
      answer: "Synthesizable Synchronous RAM Modules in Verilog RTL (Released Oct 25, 2026 on GitHub @abhishek947kumar):\n• **Architecture & RTL**: Production-ready Single-Port and True Dual-Port synchronous semiconductor RAM memory designs in Verilog-2001.\n• **Read/Write Behaviors**: Implements parameterized address/data widths with support for both READ_FIRST (native BRAM read-before-write) and WRITE_FIRST (transparent feedthrough) simultaneous access modes.\n• **FPGA Hardware Mapping**: Fully synthesized targeting AMD/Xilinx Artix-7 FPGAs in Vivado, demonstrating automated primitive inference between dedicated Block RAM (BRAM) and distributed Slice LUT-RAM.\n• **Automated CI**: Automated GitHub Actions CI workflow using Icarus Verilog running self-checking testbenches with data verification scoreboards.\n• **Repository**: [github.com/abhishek947kumar/simple-memory-module](https://github.com/abhishek947kumar/simple-memory-module)"
    },
    {
      keywords: ["axi", "amba", "axi4", "bus protocol", "crossbar", "axi4-lite", "timing closure", "burst", "wrap", "incr", "sva"],
      answer: "AMBA AXI4 High-Performance Protocol Subsystem on FPGA (Released Oct 23, 2026 on GitHub @abhishek947kumar):\n• **5-Channel Protocol Engine**: Industry-standard ARM AMBA AXI4 memory-mapped subsystem supporting decoupled handshakes (VALID/READY) across all 5 channels (AW, W, B, AR, R) with multi-beat burst generation up to 256 beats.\n• **Single-Cycle WRAP Optimization**: Custom bitwise masking formula replacing hardware division/multiplication for power-of-2 cacheline WRAP bursts, saving FPGA DSP48 slices and eliminating multi-cycle latency.\n• **Crossbar & Protocol Bridge**: Address-decoding 1x2 interconnect routing high-throughput bursts to dual-port BRAM and bridging single-beat transfers to AXI4-Lite control/status registers with DECERR responder.\n• **100 MHz Timing Closure**: Synthesized on Xilinx Artix-7 (xc7a35t) meeting timing at 106.4 MHz (+0.605ns positive WNS, 0 failing endpoints) with 21/21 passed verification scenarios validated with SystemVerilog Assertions (SVA).\n• **Repository**: [github.com/abhishek947kumar/axi-protocol-fpga](https://github.com/abhishek947kumar/axi-protocol-fpga)"
    },
    {
      keywords: ["mips", "processor", "verilog", "vivado", "fpga", "basys 3", "artix-7", "pipeline", "hazard", "forwarding", "assembler", "isa"],
      answer: "32-Bit 5-Stage Pipelined MIPS Processor Core (Released Oct 23, 2026 on GitHub @abhishek947kumar):\n• **Microarchitecture & Hazards**: Classic Patterson & Hennessy 5-stage RISC pipeline (IF -> ID -> EX -> MEM -> WB) designed in Verilog HDL. Features EX-to-EX and MEM-to-EX forwarding (zero-stall for consecutive ALU dependencies), hardware load-use hazard detection (automatic 1-cycle bubble insertion), and branch flush controls.\n• **FPGA Synthesis in Xilinx Vivado**: Synthesized targeting Xilinx Artix-7 (XC7A35TCPG236-1 / Basys 3) utilizing 2,810 Slice LUTs (13.51%), 1,569 FFs (3.77%), drawing only 94 mW total power with zero DRC errors.\n• **Custom Python Cross-Assembler**: Two-pass assembler converting symbolic MIPS assembly to binary/hex MIF files with label resolution, pseudo-instruction macro expansion, and automated verification.\n• **Hardware Verification**: 4/4 passing automated assembly benchmark suites (Fibonacci, ALU stress, memory load/store, hazard test) interfaced with a time-multiplexed 4-digit 7-segment display driver and 16 LEDs.\n• **Repository**: [github.com/abhishek947kumar/mips-32bit-pipelined-processor](https://github.com/abhishek947kumar/mips-32bit-pipelined-processor)"
    },
    {
      keywords: ["image caption", "caption generator", "pytorch", "lstm", "cnn", "mobilenet", "resnet", "beam search", "bleu", "flickr8k"],
      answer: "Neural Image Caption Studio (Deep Learning Vision-Language Studio - Released Oct 17, 2026 on GitHub @abhishek947kumar):\n• **Multimodal Architecture**: Merged Show & Tell architecture combining deep CNN feature extractors (MobileNetV3 / ResNet-50) with an autoregressive LSTM language decoder trained on Flickr8k.\n• **Dual Decoding Strategies**: Implements ultra-fast greedy argmax search and multi-hypothesis Beam Search with length penalty normalization (alpha = 0.7).\n• **Cyber-Neural Web Studio**: Modern dark glassmorphic dashboard with token-level softmax inspection tray, Web Speech API text-to-speech (TTS), and top-5 ImageNet visual concept activations.\n• **BLEU Metric Lab & Fast Caching**: Evaluates BLEU-1 to BLEU-4 benchmarks with Brevity Penalty, with offline penultimate feature caching enabling full epoch training in seconds.\n• **Repository**: [github.com/abhishek947kumar/image-caption-generator](https://github.com/abhishek947kumar/image-caption-generator)"
    },
    {
      keywords: ["returnguard", "return-guard", "refund", "react", "react agent", "autonomous agent", "ecommerce return", "hitl", "multimodal vision"],
      answer: "ReturnGuard (Autonomous ReAct E-Commerce AI Refund Agent - Released Oct 17, 2026 on GitHub @abhishek947kumar):\n• **Cognitive ReAct Agent Core**: Step-by-step reasoning trace (Thought -> Action -> Observe) providing a transparent internal monologue and tool execution telemetry, resolving valid returns in sub-850ms.\n• **Multimodal Vision Defect Inspection**: Computer vision engine evaluating uploaded product damage photos (screen fractures, severed tags, crushed packaging) to confirm defect claims.\n• **AI Governance & Guardrails**: Hard $500 autonomous decision ceiling, anti-hallucination grounding, and Human-in-the-Loop (HITL) review desk for high-value disputes.\n• **Anti-Fraud Engine**: Dynamic policy rules across 6 retail categories protecting against wardrobing, empty-box fraud, and serial returners with ~81% autonomous resolution throughput.\n• **Repository**: [github.com/abhishek947kumar/Return-Guard](https://github.com/abhishek947kumar/Return-Guard)"
    },
    {
      keywords: ["license plate", "platevision", "alpr", "anpr", "opencv", "tesseract", "ocr", "deskew"],
      answer: "PlateVision AI (Automatic License Plate Recognition - Released Oct 5, 2026 on GitHub @abhishek947kumar):\n• **8-Stage Computer Vision Pipeline**: Bilateral Filtering, Morphological TopHat/BlackHat contrast enhancement, Canny Edge Detection, Contour Aspect Ratio (1.5 <= AR <= 6.0) & Solidity Filtering, and Perspective Transform / Deskewing.\n• **Multi-PSM OCR Ensemble**: Queries Tesseract OCR across Page Segmentation Modes (--psm 8, 7, and 6) with character whitelisting and regex sanitization to maximize alphanumeric precision.\n• **Dual Engine Benchmark**: Baseline OpenCV pipeline vs. Advanced Enhanced Pipeline solving real-world reflections, steep tilt angles, and windshield false positives.\n• **Interactive Dashboard**: Modern glassmorphic dark-mode web visualizer with real-time CV stage breakdown inspector, webcam feeds, and FastAPI REST API.\n• **Repository**: [github.com/abhishek947kumar/license-plate-recognition](https://github.com/abhishek947kumar/license-plate-recognition)"
    },
    {
      keywords: ["fraud", "fraudguard", "credit card", "xgboost", "explainable ai", "xai", "financial fraud", "sub-10ms"],
      answer: "FraudGuard.AI (Enterprise Real-Time Credit Card Fraud Detection Platform - Released Sep 30, 2026 on GitHub @abhishek947kumar):\n• **Architecture & Performance**: Ultra-fast FastAPI inference service scoring transactions in under 2.8ms, achieving 100% recall and a perfect 1.000 PR-AUC on holdout test benchmarks under extreme class imbalance (~1% fraud prevalence).\n• **Machine Learning Ensemble**: Cost-weighted XGBoost, Balanced Random Forest, HistGradientBoosting, and unsupervised Isolation Forest for catching zero-day and anomalous fraud vectors.\n• **Feature Engineering & Geo-Velocity**: Calculates real-time physical geo-velocity in km/h to catch impossible travel/card cloning, 1h/24h velocity spikes, and 30-day cardholder spend outlier ratios.\n• **Explainable AI (XAI)**: Generates human-readable risk drivers compliant with FCRA and GDPR Art. 22 standards, mapping into automated tiered actions (AUTO_APPROVE, STEP_UP_AUTH with OTP/3D Secure, DECLINE_AND_FREEZE).\n• **Repository**: [github.com/abhishek947kumar/credit-card-fraud-detection](https://github.com/abhishek947kumar/credit-card-fraud-detection)"
    },
    {
      keywords: ["dlp", "data leak", "data loss prevention", "cloud dlp", "sqli", "sql injection", "aesx", "aes-256-gcm", "honeypot", "honeytoken", "luhn"],
      answer: "Cloud DLP Shield (Detecting Data Leaks Using SQL & Cloud DLP Architecture - Released Sep 30, 2026 on GitHub @abhishek947kumar):\n• **Dual-Engine Inspection Gateway**: Layer 1 Content Engine intercepts SQL injection AST signatures (Tautology, Union exfiltration, Schema harvesting), validates credit cards with the mathematical Luhn algorithm, and neutralizes keylogger scripts. Layer 2 Contextual Engine analyzes user behavioral signals, query bursts, and typing cadence anomalies (<15ms).\n• **AESX Field Encryption**: Zero-trust database storage utilizing AES-256-GCM authenticated encryption with key whitening, dynamic IVs, and 128-bit authentication tags preventing ciphertext tampering.\n• **User Threat Categorization & Honeytokens**: Classifies traffic into Benign (0-29), Suspicious (30-69), and Assaulter (70-100), feeding deceptive synthetic honeytokens to bad actors while locking down production databases.\n• **Live SOC & Demo**: Real-time Server-Sent Events (SSE) threat stream, AST sandbox terminal, database vault explorer, and interactive Nexus E-Shop featuring a toggleable 'DLP Shield vs Vulnerable Raw SQL' comparison.\n• **Repository**: [github.com/abhishek947kumar/detecting-data-leaks](https://github.com/abhishek947kumar/detecting-data-leaks)"
    },
    {
      keywords: ["splitflow", "expense splitter", "split", "expense", "receipt", "ocr", "debt graph", "settlement", "upi", "greedy"],
      answer: "SplitFlow (Smart Group Expense Splitter & Settlement Engine - Launched Sep 29, 2026 on GitHub @abhishek947kumar):\n• **Greedy Debt Minimization**: Algorithmic settlement graph engine eliminating circular debt and reducing multi-person group obligations into the minimum number of direct transactions, visualized via dynamic Canvas/SVG debt graphs.\n• **OCR Receipt Parsing**: Ingests receipt photos to extract line-item costs, taxes, and service fees, supporting equal, percentage, and exact custom splits.\n• **Real-Time FX & UPI Settlements**: Live multi-currency conversion via exchange rate APIs with integrated UPI and instant dynamic payment QR codes.\n• **Audit Trail**: Generates exportable financial reports in PDF, CSV, and Excel with tamper-evident ledgers.\n• **Repository**: [github.com/abhishek947kumar/splitflow](https://github.com/abhishek947kumar/splitflow)"
    },
    {
      keywords: ["pulseflow", "agile", "scrum", "kanban", "burndown", "websockets", "d3", "gantt", "copilot"],
      answer: "PulseFlow Agile (Enterprise Project Management & Telemetry Platform - Launched Sep 29, 2026 on GitHub @abhishek947kumar):\n• **Real-Time WebSockets Collaboration**: Multi-user Kanban boards with bidirectional WebSockets, optimistic UI updates, conflict resolution, and granular role permissions.\n• **D3.js Sprint Telemetry**: Interactive D3.js burndown/burnup velocity tracking, scope-creep detection, and cumulative flow diagrams computed in real time.\n• **AI Copilot for Agile**: Automated drafting of user stories, acceptance criteria, velocity prediction, and blocker triage.\n• **Interactive Gantt Timeline**: Drag-and-drop chronological roadmap with milestone dependency tracking and critical path calculation.\n• **Repository**: [github.com/abhishek947kumar/pulseflow-agile](https://github.com/abhishek947kumar/pulseflow-agile)"
    },
    {
      keywords: ["bittrace", "bitcoin", "forensic", "forensics", "dfir", "cybersecurity", "memory", "ram", "iso 27037", "postmortem", "volatile", "bip-39"],
      answer: "BitTrace DFIR (Automated Live & Postmortem Bitcoin Forensic Analysis Tool for Windows - Released Sep 21, 2026 on GitHub @abhishek947kumar):\n• **Live Volatile Memory Forensics**: Inspects running wallet processes (Bitcoin-Qt, Electrum, Armory) to recover 12–24 word BIP-39 recovery seeds, WIF/Hex private keys, and addresses with an aligned byte Hex/ASCII memory viewer.\n• **Postmortem Disk & Registry Analysis**: Scans %APPDATA% for Berkeley DB wallet.dat files (0x00053162), decodes UserAssist ROT13 registry launch logs, parses Windows Prefetch (.pf) files, and performs SQLite shadow copying on browser wallet extensions.\n• **ISO/IEC 27037 Evidence Vault**: Computes SHA-256 and MD5 cryptographic hashes with real-time tamper re-verification and 1-click court-ready printable PDF/HTML reports.\n• **Tech Stack**: Python 3.10+, FastAPI, React 18, Vite, Windows API, Cryptography.\n• **Repository**: [github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems](https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems)"
    },
    {
      keywords: ["night vision", "night-vision", "pedestrian", "thermal", "infrared", "ir", "yolov2", "adas", "edge ai", "haar"],
      answer: "Embedded Night-Vision System for Pedestrian Detection (Released Sep 19, 2026 on GitHub @abhishek947kumar):\n• **Multi-Modal Sensor Fusion**: Combines active 850nm infrared illumination with LWIR thermal imaging streams for reliable night-time object detection under pitch-black and harsh atmospheric road conditions.\n• **Dual-Stage Processing Pipeline**: Employs HAAR+AdaBoost candidate filters for fast pre-filtering, paired with a custom-pruned, quantized YOLOv2 convolutional network for precise real-time pedestrian localization.\n• **Edge Optimization**: Tailored for resource-constrained embedded automotive and edge hardware, minimizing latency while maintaining high precision and low false-positive rates.\n• **Repository**: [github.com/abhishek947kumar/Embedded-Night-Vision-System](https://github.com/abhishek947kumar/Embedded-Night-Vision-System)"
    },
    {
      keywords: ["logistics", "logitrack", "supply chain", "fleet", "dealer", "django", "consignment"],
      answer: "Logistics Management System (LogiTrack Pro - Released Sep 18, 2026 on GitHub @abhishek947kumar):\n• **Multi-Tenant Architecture**: Full-stack commercial logistics engine built in Python and Django with PostgreSQL, coordinating inventory, dispatches, and fleet tracking across independent dealer networks.\n• **Dispatch & Route Optimization**: Generates automated consignment manifests, shipment dispatch scheduling, and delivery confirmation pipelines.\n• **Security & Webhooks**: Implements secure JWT authentication, role-based access control (RBAC), and automated tracking webhook alerts.\n• **Repository**: [github.com/abhishek947kumar/Logistics-Management-System](https://github.com/abhishek947kumar/Logistics-Management-System)"
    },
    {
      keywords: ["piezo", "wearable", "acupressure", "depression", "healthcare", "wokwi", "transducer", "energy harvesting"],
      answer: "Piezo-electric Acupressure Wearable Device (Published with IEEE at IEMENTECH 2026):\n• **Self-Sustaining IoT Architecture**: Healthcare wearable engineered in Embedded C and verified via Wokwi simulation, combining biomechanical energy harvesting with therapeutic acupressure stimulation.\n• **Hardware Interfacing**: Interfaces piezoelectric energy transducers and pulse monitoring channels over SPI/I2C micro-buses to extend battery autonomy.\n• **Peer-Reviewed Paper**: First-author research officially indexed on IEEE Xplore (DOI: 10.1109/IEMENTech202669403.2026.11434403)."
    },
    {
      keywords: ["traffic", "vivado", "fsm", "finite state machine", "7-state", "xilinx", "queue"],
      answer: "Camera-Assisted Adaptive 7-State Traffic Controller:\n• **Hardware Architecture**: Implemented as an adaptive 7-state Finite State Machine (FSM) in C and verified in Xilinx Vivado with full timing closure and clock-domain validation.\n• **Dynamic Green-Light Control**: Ingests real-time optical vehicle density metrics to calculate variable phase durations, reducing intersection wait times by 35% compared to static cycles."
    },
    {
      keywords: ["yourfinance", "finance", "gemini", "expense tracker", "budget", "wealth"],
      answer: "YourFinance — AI Expense Tracker & Budget Insights (Released Jul 2026):\n• **AI Wealth Advisory**: Personal finance control center integrating the Google Gemini AI API to analyze spending transactions and generate actionable budgeting recommendations.\n• **Interactive Dashboard**: Modern glassmorphic interface with interactive category expense charts, custom threshold alerts, and local data persistence.\n• **Repository**: [github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights](https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights)"
    },
    {
      keywords: ["evershop", "ecommerce", "graphql", "typescript", "cart", "catalog"],
      answer: "EverShop — Modern eCommerce Platform (Released Aug 2026):\n• **Modular Architecture**: Modern full-stack eCommerce platform built with TypeScript, React, and GraphQL for high-performance product indexing and checkout flows.\n• **Type-Safe Data**: End-to-end typed queries and mutations with flexible cart and catalog state management.\n• **Repository**: [github.com/abhishek947kumar/Evershop](https://github.com/abhishek947kumar/Evershop)"
    },
    {
      keywords: ["security suite", "cryptographic tools", "pixel manipulation", "caesar", "password entropy", "prodigy"],
      answer: "Cryptographic Tools & Security Suite (Prodigy InfoTech Engineering):\n• **Image Encryption**: Pixel manipulation algorithms altering visual entropy while ensuring reversible decryption.\n• **Classical Cryptanalysis**: Automated Caesar cipher brute-force and frequency analysis decoder.\n• **Security Tools**: Mathematical password entropy scoring engine and event-driven logging utilities."
    },
    {
      keywords: ["project skills", "skills in projects", "technologies used in projects", "how skills relate to projects", "skills used"],
      answer: "Abhishek's skills are directly validated across his production projects:\n• **Processor Design, SoC Protocols & VLSI (96%)**: Applied in **AMBA AXI4 Protocol Subsystem** (5-channel burst engine, crossbar interconnect, AXI4-Lite bridge, 100 MHz Artix-7 timing closure, SystemVerilog SVA), **MIPS 32-Bit Pipelined Processor** (Verilog HDL, 5-stage datapath, hazard forwarding unit, Python assembler, Basys 3 FPGA synthesis), **Synthesizable Synchronous RAM Modules** (dual-port BRAM/LUT-RAM), and **Sensor Status Decision Unit** (combinational telemetry classifier).\n• **Deep Learning & Multimodal AI (95%)**: Applied in **Neural Image Caption Studio** (PyTorch CNN+LSTM, Beam Search alpha=0.7, token softmax probability inspection) and **ReturnGuard** (Autonomous ReAct agent, multimodal CV defect inspection).\n• **Computer Vision & OCR (94%)**: Applied in **PlateVision AI** (8-stage OpenCV ALPR pipeline, multi-PSM Tesseract OCR) and **Embedded Night-Vision** (active IR + thermal sensor fusion with quantized YOLOv2).\n• **Cloud Security & Digital Forensics (94%)**: Applied in **Cloud DLP Shield** (AST SQLi detection, AES-256-GCM zero-trust encryption, Honeytokens, Luhn validation) and **BitTrace DFIR** (volatile RAM triage, BIP-39 recovery, ISO/IEC 27037 vault).\n• **FinTech & Real-Time Web (92%)**: Applied in **FraudGuard.AI** (sub-2.8ms XGBoost ensemble & Explainable AI), **SplitFlow** (greedy debt graph optimization, OCR receipt parsing, UPI QR), and **PulseFlow Agile** (WebSockets, D3.js sprint burndown telemetry, AI Copilot).\n• **Embedded Systems & Microcontrollers (93%)**: Applied in **Piezoelectric Wearable** (Embedded C, Wokwi, SPI/I2C, IEEE paper) and **Jadavpur University VLSI Internship** (bare-metal EDA delay optimization).\n• **Backend & Full-Stack (91%)**: Applied across **FastAPI**, **Node.js/Express**, **Django**, **React 18**, and **PostgreSQL** in his flagship systems."
    },
    {
      keywords: ["github", "recent projects", "last 6 months", "6 months", "latest", "new projects", "last 1 week", "1 week", "last week"],
      answer: "Abhishek engineered and released 21+ high-impact projects on GitHub (@abhishek947kumar) and LinkedIn, featuring brand new October 2026 releases:\n• **Sensor Status Decision Unit (Oct 25, 2026)**: Combinational logic-based 8-bit sensor telemetry classifier in Verilog HDL for Artix-7 Basys 3 FPGA with zero-latency LED/alarm drivers.\n• **Synthesizable Synchronous RAM Modules (Oct 25, 2026)**: Parameterized Single-Port & True Dual-Port RAMs in Verilog RTL with Vivado BRAM / Distributed LUT-RAM inference and CI testbench.\n• **AMBA AXI4 Protocol Subsystem (Oct 23, 2026)**: 5-channel high-performance memory-mapped AXI4 burst engine, 1x2 crossbar router, AXI4-Lite bridge, SystemVerilog SVA, and 100 MHz Artix-7 timing closure.\n• **32-Bit Pipelined MIPS Processor (Oct 23, 2026)**: Complete 5-stage MIPS core in Verilog HDL with hazard detection, data forwarding, Python cross-assembler, and Artix-7 Basys 3 FPGA Vivado synthesis.\n• **Neural Image Caption Studio (Oct 17, 2026)**: Full-stack multimodal deep learning app with PyTorch CNN+LSTM, Beam Search decoding, token inspector, and BLEU metric lab.\n• **ReturnGuard (Oct 17, 2026)**: Autonomous ReAct e-commerce refund agent with multimodal vision defect inspection, anti-fraud governance, and HITL review desk.\n• **PlateVision AI (Oct 5, 2026)**: End-to-end 8-stage OpenCV license plate recognition pipeline with multi-PSM Tesseract OCR ensemble and FastAPI visualizer.\n• **FraudGuard.AI (Sep 30, 2026)**: Enterprise credit card fraud detection with sub-2.8ms scoring, XGBoost ensemble, and Explainable AI (XAI).\n• **Cloud DLP Shield (Sep 30, 2026)**: Enterprise Cloud Data Loss Prevention platform with AST SQLi interception, Luhn validation, AESX field encryption, and live SSE SOC.\n• **SplitFlow (Sep 29, 2026)**: Smart group expense splitter with OCR receipt scanner, live FX conversion, greedy debt simplification graph, and UPI QR settlements.\n• **PulseFlow Agile (Sep 29, 2026)**: Enterprise agile platform with real-time WebSockets, D3.js sprint burndown telemetry, AI Copilot, and Gantt roadmaps.\n• **BitTrace DFIR (Sep 21, 2026)**: Automated Live RAM and Postmortem Bitcoin Forensics Tool for Windows compliant with ISO/IEC 27037.\n• **Embedded-Night-Vision-System (Sep 19, 2026)**: Active IR & thermal sensor fusion with quantized YOLOv2 for real-time pedestrian recognition.\n• **Logistics-Management-System (Sep 18, 2026)**: Enterprise commercial multi-dealer logistics and fleet tracking platform in Python and Django.\n• **YourFinance & Evershop**: AI wealth advisory (Google Gemini) and TypeScript/GraphQL eCommerce."
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
      keywords: ["publication", "paper", "research", "ieee", "iementech", "doi"],
      answer: "Abhishek's Peer-Reviewed IEEE Publication Details:\n• **Title**: Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy\n• **Conference**: IEEE IEMENTECH 2026\n• **Role**: First Author & Lead Hardware Architect\n• **DOI**: 10.1109/IEMENTech202669403.2026.11434403"
    },
    {
      keywords: ["skills", "technologies", "languages", "tech stack", "python", "c++", "embedded", "stacks"],
      answer: "Abhishek's comprehensive technical proficiencies, validated by production projects:\n• **SoC Protocols, Memory Systems & Processor Design**: AMBA AXI4 / AXI4-Lite bus protocols, 5-channel burst engines, crossbar routers, True Dual-Port BRAM & Distributed LUT-RAM, Verilog HDL, MIPS32 5-stage pipelined datapath, hazard resolution units, data forwarding, Xilinx Vivado (Artix-7 Basys 3 FPGA), SystemVerilog (SVA), custom Python cross-assemblers, timing closure.\n• **AI, Deep Learning & Vision**: PyTorch, CNN + LSTM encoder-decoder, Beam Search decoding, Autonomous ReAct agents, 8-stage OpenCV ALPR, Tesseract OCR ensemble, cost-weighted XGBoost, Explainable AI (XAI / SHAP), Scikit-Learn, YOLOv2, Active IR/Thermal sensor fusion, Gemini AI.\n• **Cybersecurity & Forensics**: Cloud DLP Architecture, AST SQLi Interception, AES-256-GCM Field Encryption, Live RAM Forensics, ISO/IEC 27037 Evidence Vault, Windows Prefetch & Registry, Luhn Validation.\n• **FinTech & Real-Time Systems**: Greedy Graph Debt Minimization, Bidirectional WebSockets, Server-Sent Events (SSE), D3.js Sprint Burndown, OCR Receipt Parsing, Live FX APIs, UPI QR Payments.\n• **Embedded & Hardware**: Microcontrollers (ARM, AVR, ESP32), Embedded C, C/C++, Hardware Interfacing (SPI, I2C, UART, GPIO), Vivado FSM, Wokwi Simulator, VLSI EDA Workflows.\n• **Languages & Web**: Python, Verilog HDL, C, C++, Embedded C, JavaScript, TypeScript, SQL, MATLAB, FastAPI, Node.js, Express, Django, React 18, Docker, PostgreSQL, SQLite, Git, CI/CD, Agile/Jira."
    },
    {
      keywords: ["why hire", "hire", "placement", "value", "strengths", "fit", "candidate"],
      answer: "Why Abhishek Kumar is an exceptional candidate for engineering teams:\n• **Top Academic Distinction**: 8.73 CGPA in B.Tech ECE with deep fundamentals in OOP, DSA, and Control Systems.\n• **End-to-End Dual Capability**: Rare ability to bridge bare-metal processor design & FPGA synthesis (AMBA AXI4 protocol subsystem, 32-bit pipelined MIPS core, dual-port BRAM) up to deep learning, autonomous ReAct agents, and high-throughput Python/FastAPI/Node.js/AI systems.\n• **Production-Grade Project Portfolio**: Built and deployed AMBA AXI4 Subsystem (100 MHz timing met), MIPS 32-Bit Processor (Vivado FPGA), Sensor Status Decision Unit, Simple Memory Module, Neural Image Caption Studio (PyTorch CNN+LSTM), ReturnGuard (ReAct agent), PlateVision ALPR (8-stage OpenCV), FraudGuard.AI (sub-2.8ms ML scoring), Cloud DLP Shield (AST SQLi & AES-256-GCM), SplitFlow, PulseFlow Agile, and BitTrace DFIR.\n• **Published IEEE Author**: First-author conference publication at IEEE IEMENTECH 2026 on self-sustaining IoT healthcare.\n• **Industrial Internships**: On-site VLSI EDA research at Jadavpur University and industrial plant automation at SAIL.\n• **Immediate Value**: Highly adaptable for Processor & VLSI Design, SoC Verification, Embedded Firmware, Machine Learning / Computer Vision, Cybersecurity, or Full-Stack Systems roles."
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
