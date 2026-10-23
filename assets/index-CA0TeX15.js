(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();class U{constructor(){this.windows=new Map,this.activeWindowId=null,this.topZIndex=100,this.menuBarAppTitleEl=null}init(e){this.menuBarAppTitleEl=e,this.setupGlobalListeners()}registerWindow(e,t){const i=t.el,a=t.defaultWidth||Math.min(840,window.innerWidth-60),n=t.defaultHeight||Math.min(560,window.innerHeight-120),s=this.windows.size*28%180,r=t.x!==void 0?t.x:Math.max(30,(window.innerWidth-a)/2+s-60),l=t.y!==void 0?t.y:Math.max(45,(window.innerHeight-n)/2+s-40),c={id:e,title:t.title,icon:t.icon,el:i,isOpen:!1,isMinimized:!1,isMaximized:!1,width:a,height:n,x:r,y:l,prevBounds:null,onOpen:t.onOpen,onClose:t.onClose};return this.windows.set(e,c),this.applyWindowStyles(c),this.setupWindowControls(c),this.setupDraggable(c),this.setupResizable(c),c}applyWindowStyles(e){const t=e.el;t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.style.transform=`translate3d(${e.x}px, ${e.y}px, 0)`}setupWindowControls(e){const t=e.el;t.addEventListener("mousedown",()=>this.bringToFront(e.id)),t.addEventListener("touchstart",()=>this.bringToFront(e.id),{passive:!0});const i=t.querySelector(".traffic-close"),a=t.querySelector(".traffic-minimize"),n=t.querySelector(".traffic-maximize");i&&i.addEventListener("click",r=>{r.stopPropagation(),this.closeWindow(e.id)}),a&&a.addEventListener("click",r=>{r.stopPropagation(),this.minimizeWindow(e.id)}),n&&n.addEventListener("click",r=>{r.stopPropagation(),this.toggleMaximize(e.id)});const s=t.querySelector(".window-titlebar");s&&s.addEventListener("dblclick",r=>{r.target.closest(".window-controls")||this.toggleMaximize(e.id)})}setupDraggable(e){const t=e.el.querySelector(".window-titlebar");if(!t)return;let i=!1,a,n,s,r;const l=p=>{e.isMaximized||p.target.closest(".window-controls")||p.target.closest("button")||p.target.closest("input")||(i=!0,a=p.clientX||p.touches&&p.touches[0].clientX,n=p.clientY||p.touches&&p.touches[0].clientY,s=e.x,r=e.y,this.bringToFront(e.id),e.el.classList.add("is-dragging"),document.addEventListener("mousemove",c),document.addEventListener("mouseup",d),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",d))},c=p=>{if(!i)return;p.type==="touchmove"&&p.preventDefault();const u=p.clientX||p.touches&&p.touches[0].clientX,h=p.clientY||p.touches&&p.touches[0].clientY,g=u-a,v=h-n,b=-e.width+100,k=window.innerWidth-100,A=32,E=window.innerHeight-80;e.x=Math.max(b,Math.min(k,s+g)),e.y=Math.max(A,Math.min(E,r+v)),e.el.style.transform=`translate3d(${e.x}px, ${e.y}px, 0)`},d=()=>{i&&(i=!1,e.el.classList.remove("is-dragging"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",d))};t.addEventListener("mousedown",l),t.addEventListener("touchstart",l,{passive:!1})}setupResizable(e){const t=e.el.querySelector(".window-resize-handle");if(!t)return;let i=!1,a,n,s,r;const l=p=>{e.isMaximized||(i=!0,a=p.clientX||p.touches&&p.touches[0].clientX,n=p.clientY||p.touches&&p.touches[0].clientY,s=e.width,r=e.height,this.bringToFront(e.id),e.el.classList.add("is-resizing"),document.addEventListener("mousemove",c),document.addEventListener("mouseup",d),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",d))},c=p=>{if(!i)return;p.type==="touchmove"&&p.preventDefault();const u=p.clientX||p.touches&&p.touches[0].clientX,h=p.clientY||p.touches&&p.touches[0].clientY,g=Math.max(380,s+(u-a)),v=Math.max(280,r+(h-n));e.width=Math.min(window.innerWidth-e.x-10,g),e.height=Math.min(window.innerHeight-e.y-60,v),e.el.style.width=`${e.width}px`,e.el.style.height=`${e.height}px`},d=()=>{i&&(i=!1,e.el.classList.remove("is-resizing"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",d))};t.addEventListener("mousedown",l),t.addEventListener("touchstart",l,{passive:!1})}openWindow(e){const t=this.windows.get(e);t&&(t.isOpen=!0,t.isMinimized=!1,t.el.classList.remove("is-minimized","is-hidden"),t.el.classList.add("is-open"),this.bringToFront(e),this.updateDockIndicator(e,!0),t.onOpen&&t.onOpen())}closeWindow(e){const t=this.windows.get(e);if(t){if(t.isOpen=!1,t.isMinimized=!1,t.el.classList.remove("is-open","is-focused"),t.el.classList.add("is-hidden"),this.updateDockIndicator(e,!1),this.activeWindowId===e){this.activeWindowId=null,this.updateMenuBarTitle("Finder");const i=this.getTopVisibleWindow();i&&this.bringToFront(i.id)}t.onClose&&t.onClose()}}minimizeWindow(e){const t=this.windows.get(e);if(t&&(t.isMinimized=!0,t.el.classList.add("is-minimized"),t.el.classList.remove("is-focused"),this.activeWindowId===e)){this.activeWindowId=null;const i=this.getTopVisibleWindow();i?this.bringToFront(i.id):this.updateMenuBarTitle("Finder")}}toggleMaximize(e){const t=this.windows.get(e);t&&(t.isMaximized?(t.prevBounds&&(t.x=t.prevBounds.x,t.y=t.prevBounds.y,t.width=t.prevBounds.width,t.height=t.prevBounds.height),t.isMaximized=!1,t.el.classList.remove("is-maximized")):(t.prevBounds={x:t.x,y:t.y,width:t.width,height:t.height},t.x=10,t.y=36,t.width=window.innerWidth-20,t.height=window.innerHeight-110,t.isMaximized=!0,t.el.classList.add("is-maximized")),this.applyWindowStyles(t),this.bringToFront(e))}bringToFront(e){const t=this.windows.get(e);t&&(t.isMinimized&&(t.isMinimized=!1,t.el.classList.remove("is-minimized")),this.topZIndex+=1,t.el.style.zIndex=this.topZIndex,this.windows.forEach(i=>i.el.classList.remove("is-focused")),t.el.classList.add("is-focused"),this.activeWindowId=e,this.updateMenuBarTitle(t.title))}getTopVisibleWindow(){let e=null,t=-1;return this.windows.forEach(i=>{if(i.isOpen&&!i.isMinimized){const a=parseInt(i.el.style.zIndex||0,10);a>t&&(t=a,e=i)}}),e}toggleWindowFromDock(e){const t=this.windows.get(e);t&&(t.isOpen?t.isMinimized?this.openWindow(e):this.activeWindowId===e?this.minimizeWindow(e):this.bringToFront(e):this.openWindow(e))}updateDockIndicator(e,t){const i=document.querySelector(`.dock-item[data-app="${e}"]`);i&&(t?i.classList.add("is-running"):i.classList.remove("is-running"))}updateMenuBarTitle(e){this.menuBarAppTitleEl&&(this.menuBarAppTitleEl.textContent=e)}setupGlobalListeners(){window.addEventListener("resize",()=>{this.windows.forEach(e=>{e.isMaximized?(e.width=window.innerWidth-20,e.height=window.innerHeight-110,this.applyWindowStyles(e)):(e.x+e.width>window.innerWidth&&(e.x=Math.max(10,window.innerWidth-e.width-20)),e.y+e.height>window.innerHeight&&(e.y=Math.max(36,window.innerHeight-e.height-80)),this.applyWindowStyles(e))})})}}const P=new U,o={personal:{name:"Abhishek Kumar",tagline:"B.Tech ECE 4th Year Candidate | Embedded Systems, VLSI & Software Engineer",address:"Sector-3, Bokaro Steel City, Jharkhand - 827003",location:"Kolkata, West Bengal / Bokaro, Jharkhand, India",email:"abhishek1297kumar@gmail.com",phone:"+91 9470303282",linkedin:"https://www.linkedin.com/in/abhishek947kumar",github:"https://github.com/abhishek947kumar",portfolio:"https://abhishek947kumar.github.io/portfolio/",portfolioHandle:"abhishek947kumar.github.io/portfolio",summary:"B.Tech ECE 4th year candidate at Institute of Engineering & Management (IEM), Kolkata (Class of 2027) with an 8.73 CGPA. Built with a strong foundation in Object-Oriented Programming (OOP), algorithmic logic, control systems, and software-hardware co-design. Experienced in real-time data processing, VLSI design pipelines, and plant automation. Proficient in Python, MATLAB, C/C++, and version control, with proven IEEE publication and high-impact projects in embedded IoT and software architectures."},placementPitch:{keyStrengths:["High Academic Distinction: CGPA 8.73 (up to 6th semester) in B.Tech ECE at IEM Kolkata.","Dual Expertise: Strong grasp across both bare-metal hardware/embedded firmware (Verilog HDL, Vivado, C/C++, microcontrollers) and high-level software & systems engineering (Python, PyTorch, FastAPI, Django, React, AI Cloud).","Computer Architecture & Processor Design: Engineered a complete 32-bit 5-stage pipelined MIPS processor core in Verilog HDL with hazard detection, data forwarding, custom Python cross-assembler, and Artix-7 Basys 3 FPGA synthesis in Xilinx Vivado (94 mW power, 0 DRC errors).","Deep Learning & Multimodal AI: Architected Neural Image Caption Studio (PyTorch MobileNetV3/ResNet-50 + LSTM with Beam Search & token probabilities) and ReturnGuard (Autonomous ReAct agent with multimodal vision defect inspection).","Published IEEE Researcher: First-author publication at IEEE IEMENTECH 2026 on wearable piezoelectric energy harvesting & healthcare technology.","Machine Learning & Cyber Defense: Engineered FraudGuard.AI (sub-10ms XGBoost ensemble & Explainable AI for real-time payment fraud prevention) and Cloud DLP Shield (dual-engine AST SQLi detection & AESX authenticated field encryption).","Digital Forensics & Systems Security: Architected BitTrace DFIR for live volatile RAM inspection and ISO/IEC 27037 evidence preservation.","Computer Vision & Edge Pipelines: Built PlateVision AI (8-stage OpenCV ALPR pipeline with Tesseract OCR multi-PSM ensemble) and Embedded Night-Vision ADAS (active IR + thermal sensor fusion with YOLOv2).","Hands-On Industrial Internships: Bare-metal IC design optimization at Jadavpur University & plant automation software systems at SAIL (Steel Authority of India Limited).","Active Continuous Learner: Built & deployed 18+ production-grade software, AI, cybersecurity, and embedded systems in 2026 alone with continuous GitHub releases (@abhishek947kumar)."]},education:[{institution:"Institute of Engineering & Management (IEM)",location:"Kolkata, West Bengal",degree:"B.Tech in Electronics and Communication Engineering (ECE)",duration:"2023 – 2027",score:"CGPA: 8.73 (up to 6th sem)",highlights:["Core Coursework: Microprocessors & Microcontrollers, Digital Signal Processing, Control Systems, VLSI Design, Data Structures & Algorithms, Analog & Digital Communication.","Consistently maintained high academic standing in top percentile of the department."]},{institution:"M.G.M. Higher Secondary School",location:"Bokaro, Jharkhand",degree:"CBSE Class 12 (PCM + IP)",duration:"2023",score:"Percentage: 86.5%",highlights:["Specialized in Physics, Chemistry, Mathematics, and Informatics Practices (IP / Python)."]},{institution:"M.G.M. Higher Secondary School",location:"Bokaro, Jharkhand",degree:"CBSE Class 10",duration:"2021",score:"Percentage: 95.0%",highlights:["School honors for academic excellence in Science and Mathematics."]}],internships:[{role:"VLSI Design Intern",organization:"Jadavpur University",location:"Kolkata, West Bengal",duration:"December 2025 – January 2026",type:"Research Internship",points:["Studied and analysed IC design and fabrication processes, focusing on hardware-software architecture optimisations.","Evaluated time-critical processing pipelines using EDA tools, applying semiconductor principles to reduce computational overhead in bare-metal environments.","Simulated and benchmarked gate-level delays and power dissipation tradeoffs for high-performance sub-systems."],skillsUsed:["VLSI Design","EDA Tools","Bare-metal optimization","Hardware Architecture","IC Fabrication Flow"]},{role:"Vocational Trainee",organization:"Steel Authority of India Limited (SAIL)",location:"Bokaro Steel City, Jharkhand",duration:"May 2025 – June 2025",type:"Industrial Internship",points:["Developed and maintained software modules for plant automation systems in industrial manufacturing units.","Assisted in database management tasks and operational data analytics to optimize continuous plant data monitoring.","Collaborated with senior process automation engineers on fault logging, telemetry protocols, and automated telemetry alerts."],skillsUsed:["Plant Automation","Industrial Databases","Software Maintenance","Data Telemetry","Industrial Control"]}],projects:[{id:"mips-32bit-processor",title:"32-Bit 5-Stage Pipelined MIPS Processor Core in Verilog & Vivado",subtitle:"Hazard Resolution Unit, Hardware Forwarding, Custom Python Cross-Assembler & Basys 3 FPGA Synthesis",badge:"Latest (Oct 2026) | VLSI & Processor Architecture",createdPeriod:"Latest Release",githubUrl:"https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",tags:["Verilog HDL","Xilinx Vivado","MIPS32 ISA","5-Stage Pipeline","FPGA","Artix-7","Hardware Forwarding","Python Assembler","Computer Architecture"],description:"A production-grade, 5-stage pipelined 32-bit MIPS processor core designed in Verilog HDL following the classic Patterson & Hennessy microarchitecture. Verified via cycle-accurate simulation with custom assembly benchmarks and synthesized targeting Xilinx Artix-7 FPGAs (XC7A35TCPG236-1 / Basys 3) with zero DRC violations and 94 mW total power consumption.",highlights:["Pipelined Microarchitecture & Hazards: 5-stage datapath (IF -> ID -> EX -> MEM -> WB) with EX-to-EX and MEM-to-EX forwarding (zero-stall on ALU-ALU RAW dependencies), hardware load-use hazard detection unit (automatic 1-cycle bubble insertion), and branch/jump pipeline flush control.","FPGA Synthesis & Low Power: Synthesized on Xilinx Artix-7 Basys 3 FPGA utilizing 2,810 Slice LUTs (13.51%), 1,569 Flip-Flops (3.77%), and 0 Block RAM (leveraging distributed LUT-RAM), drawing only 94 mW total on-chip power with zero DRC errors.","Custom Two-Pass Cross-Assembler: Built a Python assembler translating symbolic MIPS assembly to hex/binary MIF memory initialization files with pseudo-instruction macro expansion, label resolution, and syntax validation.","Peripherals & Verification Suite: 4/4 passing automated assembly benchmark suites (Fibonacci sequence, ALU stress, memory load/store, hazard forward verification) with time-multiplexed 4-digit 7-segment display driver and 16 status LEDs."]},{id:"neural-image-caption-studio",title:"Neural Image Caption Studio — Deep Learning Vision-Language Generator",subtitle:"PyTorch CNN (MobileNetV3/ResNet-50) + LSTM Decoder, Dual Beam Search & Cyber-Neural Studio",badge:"Latest (Oct 2026) | Deep Learning & Multimodal AI",createdPeriod:"Latest Release",githubUrl:"https://github.com/abhishek947kumar/image-caption-generator",tags:["PyTorch","Python","FastAPI","Deep Learning","Computer Vision","LSTM","MobileNetV3","Beam Search","BLEU Lab","Multimodal AI"],description:"A full-stack, production-grade computer vision and NLP multimodal system that translates visual scenes into coherent natural language descriptions using merged CNN feature extractors and autoregressive LSTM language decoders trained on Flickr8k.",highlights:["Multimodal Architecture: Combines pre-trained CNN backbones (MobileNetV3 & ResNet-50) with word embedding projections and a 256-unit LSTM recurrent language decoder utilizing teacher forcing and gradient clipping.","Dual Autoregressive Decoding: Implements both ultra-fast greedy argmax search and multi-trajectory Beam Search with length penalty normalization (alpha = 0.7) for optimal linguistic diversity.","Cyber-Neural Web Studio: Interactive dark glassmorphic dashboard featuring drag-and-drop image analysis, token-level softmax inspection tray, Web Speech API text-to-speech (TTS), and top-5 visual concept class activations.","BLEU Benchmark Lab & Feature Caching: Integrated metric calculation suite for BLEU-1 through BLEU-4 with Brevity Penalty (BP), alongside offline penultimate feature caching (features_cache.pt) enabling full training epochs in seconds."]},{id:"return-guard",title:"ReturnGuard — Autonomous ReAct E-Commerce AI Refund Agent",subtitle:"ReAct Cognitive Loop, Multimodal CV Defect Inspection, Policy Matrix & AI Governance Guardrails",badge:"Latest (Oct 2026) | Autonomous AI Agents & Vision",createdPeriod:"Latest Release",githubUrl:"https://github.com/abhishek947kumar/Return-Guard",tags:["Python","FastAPI","React 18","Autonomous Agents","ReAct Framework","Multimodal Vision","AI Governance","Anti-Fraud","REST APIs"],description:"An autonomous, governed ReAct (Reasoning and Acting) AI agent that evaluates customer return inquiries, verifies order states, analyzes category return policies across 6 retail verticals, inspects defect photos via multimodal computer vision, and triggers automated refund/escalation workflows.",highlights:["Autonomous ReAct Cognitive Loop: Step-by-step reasoning trace (Thought -> Action -> Observe) providing a fully transparent internal monologue and tool execution telemetry, resolving valid low-risk returns in under 850ms.","Multimodal Computer Vision Inspection: Evaluates uploaded product defect photos to verify physical damage claims (e.g. cracked displays, broken seal tags, crushed packaging) before granting return approvals.","Multi-Dimensional Anti-Fraud Engine: Detects wardrobing (used occasion wear returned late), serial returners, and empty-box abuse across dynamic policy matrices for Electronics, Fashion, Beauty, and Footwear.","Hard AI Governance & HITL Desk: Programmatic $500 autonomous ceiling with Human-in-the-Loop (HITL) supervisor triage desk for high-value edge cases, achieving ~81% autonomous resolution throughput."]},{id:"platevision-ai",title:"PlateVision AI — Automatic License Plate Recognition (ALPR)",subtitle:"8-Stage OpenCV Pipeline, Tesseract OCR Multi-PSM Ensemble, Deskewing & FastAPI Web Visualizer",badge:"Latest (Oct 2026) | Computer Vision & ALPR",createdPeriod:"Latest Release",githubUrl:"https://github.com/abhishek947kumar/license-plate-recognition",tags:["Python","OpenCV","Tesseract OCR","Computer Vision","FastAPI","Digital Image Processing","Edge Detection","Docker"],description:"An end-to-end, production-grade Automatic License Plate Recognition (ALPR/ANPR) system featuring an 8-stage Computer Vision pipeline, dual-engine comparison (Baseline vs Advanced), multi-PSM Tesseract OCR ensemble, and an interactive dark-mode web visualizer.",highlights:["8-Stage Computer Vision Pipeline: Employs Bilateral Filtering, Morphological TopHat/BlackHat contrast enhancement, Canny Edge Detection, Contour Aspect Ratio (1.5 <= AR <= 6.0) & Solidity Filtering, and Perspective Transform / Deskewing to isolate license plates under harsh glare, shadows, and steep angles.","Multi-PSM OCR Ensemble: Ensembles Tesseract Page Segmentation Modes (--psm 8, 7, and 6) with border padding, character whitelisting, and regex sanitization to maximize alphanumeric plate accuracy.","Dual-Engine Benchmark: Implements both classic OpenCV contour detection and an Advanced Enhanced Pipeline that resolves real-world vehicle grille and windshield false positives.","Interactive Web Visualizer: Modern dark glassmorphic dashboard with real-time CV stage breakdown inspector, webcam/video feed analysis, CLI batch processing, and containerized Docker deployment."]},{id:"fraudguard-ai",title:"FraudGuard.AI — Real-Time Credit Card Fraud Detection Platform",subtitle:"Sub-10ms Risk Scoring, XGBoost Ensemble, Explainable AI & Automated Tiered Action Rules",badge:"Flagship | AI & Cyber Defense",createdPeriod:"Last 1 Month",githubUrl:"https://github.com/abhishek947kumar/credit-card-fraud-detection",tags:["Python","FastAPI","XGBoost","Scikit-Learn","Machine Learning","Explainable AI","Cyber Defense","FinTech","REST APIs"],description:"An enterprise AI platform engineered to evaluate credit card transaction risk in real-time under extreme class imbalance (~1% fraud prevalence). Features sub-10ms inference, domain geo-velocity calculation (impossible travel / card cloning), multi-model ensemble benchmark, and Explainable AI (XAI) diagnostics.",highlights:["Real-Time ML Ensemble: Blended decision engine combining cost-weighted XGBoost, Balanced Random Forest, HistGradientBoosting, and Isolation Forest with 100% recall and 1.000 PR-AUC on holdout test benchmarks, reducing latency to ~2.8ms.","Domain Feature Engineering: Computes real-time geo-velocity (km/h travel speed identifying physical impossible teleportation), 1h/24h authorization velocity surges, cardholder 30-day spend baseline ratios, and device fingerprint suspicion.","Explainable AI (XAI) for Compliance: Structured risk driver diagnostics complying with FCRA and GDPR Art. 22 regulations, providing human fraud analysts with transparent explanations for flagged transactions.","Automated Tiered Action Policies: Instant routing into AUTO_APPROVE (<25% risk), STEP_UP_AUTH (25-65% OTP / 3D Secure challenge), and DECLINE_AND_FREEZE (>65% risk with automated card lock)."]},{id:"cloud-dlp-shield",title:"Cloud DLP Shield — Detecting Data Leaks Using SQL & Cloud DLP Architecture",subtitle:"Dual-Engine Content & Contextual Inspection, Real-Time SQLi Detection & AESX Field Encryption",badge:"Latest (Sep 2026) | Cloud Security & DLP",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/detecting-data-leaks",tags:["JavaScript","Node.js","Cloud Security","Data Loss Prevention","SQL Injection","AES-256-GCM","Server-Sent Events","Express"],description:"An enterprise-grade Cloud Data Loss Prevention (DLP) and application security platform designed to defend e-commerce and cloud web services against data exfiltration. Combines dual-engine inspection (Content & Contextual Analysis) with AESX authenticated field encryption and dynamic honeypot decoy mitigation.",highlights:["Dual-Engine Inspection Gateway: Layer 1 Content Engine intercepts full-spectrum SQL injections (Tautology, Union exfiltration, Schema harvesting), validates credit cards via mathematical Luhn algorithm, and neutralizes keystroke logging scripts; Layer 2 Contextual Engine analyzes user behavior, query velocity bursts, and sub-15ms typing cadence anomalies.","AESX Authenticated Field Encryption: Zero-trust database storage utilizing AES-256-GCM with key whitening, IV randomness, and tamper-resistant 128-bit authentication tags preventing ciphertext bit flipping.","User Threat Categorization & Honeypot Defense: Real-time risk scoring categorizing users into Benign (0-29), Suspicious (30-69), and Assaulter (70-100), serving deceptive Honeytoken decoys to assaulters while safeguarding production data.","Real-Time SOC Observability & Interactive Storefront: Live Server-Sent Events (SSE) threat stream, deep payload AST sandbox terminal, database vault explorer, and dual-mode Nexus E-Shop featuring a toggleable 'DLP Shield vs Vulnerable Raw SQL' demonstration."]},{id:"splitflow",title:"SplitFlow — Smart Group Expense Splitter & Settlement Engine",subtitle:"OCR Receipt Scanner, Live FX Rates, Visual Debt Graph & UPI QR Settlements",badge:"Latest (Sep 2026) | FinTech & Web Systems",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/splitflow",tags:["JavaScript","Web APIs","OCR Scanner","Debt Simplification","D3 / Canvas","FinTech","QR Settlement"],description:"A modern, responsive group expense management platform engineered to eliminate shared financial friction. Features an OCR receipt scanner for itemized split extraction, real-time multi-currency exchange rates, a greedy debt minimization algorithm with interactive debt-flow graph, and automated payment QR codes.",highlights:["Greedy Debt Minimization: Algorithmic settlement engine reducing N-party circular debts into the minimum number of direct transactions, visualized via dynamic Canvas/SVG debt graphs.","OCR Receipt Parsing & Itemized Allocation: Ingests receipt photos to extract itemized costs, taxes, and tips, allowing unequal, percentage-based, and exact share splits.","Live Multi-Currency & Instant Settlement: Real-time currency conversion across global currencies via exchange rate APIs with integrated UPI and instant payment QR code generation.","Export & Audit Trail: Generates court and personal audit-ready exports in PDF, CSV, and Excel formats with tamper-evident balance ledgers."]},{id:"pulseflow-agile",title:"PulseFlow Agile — Enterprise Project Management & Telemetry Platform",subtitle:"Real-Time WebSockets, D3.js Sprint Burndown, AI Copilot & Gantt Roadmap",badge:"Latest (Sep 2026) | Enterprise & Real-Time",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/pulseflow-agile",tags:["JavaScript","WebSockets","D3.js","AI Copilot","Agile / Scrum","Gantt Roadmap","Enterprise Architecture"],description:"An enterprise-grade collaborative agile project management platform designed for distributed engineering teams. Features real-time multi-user Kanban boards via WebSockets, predictive sprint analytics with interactive D3.js burndown charts, AI-assisted user story generation, and interactive Gantt roadmap timelines.",highlights:["Real-Time Collaborative Kanban: Bidirectional WebSockets synchronization with optimistic state updates, conflict resolution, and granular role-based permissions.","Interactive D3.js Sprint Analytics: Mathematical velocity tracking, scope-creep indicators, and dynamic burndown/burnup projections computed in real time.","AI Copilot for Agile Teams: Automated user story drafting, sprint velocity prediction, automated test-case generation, and blocker triage.","Interactive Gantt Roadmap: Drag-and-drop chronological timeline with milestone dependency resolution and critical path calculation."]},{id:"bittrace-dfir",title:"BitTrace DFIR - Automated Live & Postmortem Bitcoin Forensic Tool",subtitle:"Volatile RAM Inspection, Windows Registry Hives & ISO/IEC 27037 Evidence Vault",badge:"Recent (Sep 2026) | Cybersecurity & DFIR",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",tags:["Python","FastAPI","React","Digital Forensics","Cryptography","Windows API","ISO 27037"],description:"An automated digital forensics and incident response (DFIR) platform engineered to conduct both live volatile memory (RAM) and persistent postmortem disk/registry analysis of Bitcoin artifacts on Windows systems. Adheres to ISO/IEC 27037 digital evidence preservation standards with immutable SHA-256/MD5 hashing.",highlights:["Live Volatile Forensics: Inspects running wallet processes (Bitcoin-Qt, Electrum, Armory) to recover 12-24 word BIP-39 seed phrases, WIF/Hex private keys, and addresses with a byte-aligned Hex/ASCII viewer.","Postmortem Remnant Extraction: Scans %APPDATA% for Berkeley DB wallet.dat headers (0x00053162), parses Windows Prefetch (.pf) execution frequencies, and decodes UserAssist ROT13 keys for uninstalled wallet remnants.","Browser Artifacts & Evidence Ledger: Implements SQLite shadow copying across Chrome, Edge, and Firefox without database locks; generates court-ready audit reports with 1-click PDF/HTML export."]},{id:"night-vision",title:"Embedded Night-Vision System for Pedestrian Detection",subtitle:"Active IR + Thermal Sensors with HAAR+AdaBoost & YOLOv2",badge:"Recent (Sep 2026) | AI & Embedded",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",tags:["Python","Embedded Systems","Computer Vision","Thermal IR","YOLOv2","AdaBoost"],description:"Embedded night-vision driver-assistance architecture combining active infrared and thermal imaging feeds. Features a dual-stage detection pipeline utilizing HAAR+AdaBoost for low-compute candidate extraction and custom-pruned YOLOv2 for real-time pedestrian recognition under pitch-black and hazardous road environments.",highlights:["Fused sensor telemetry from active IR and LWIR thermal modules.","Optimized inference latency on resource-constrained embedded edge hardware.","Achieved robust multi-pedestrian localization with low false-positive rates in zero-illumination tests."]},{id:"logistics-sys",title:"Logistics Management System",subtitle:"Commercial Multi-Dealer & Consumer Logistics Platform",badge:"Recent (Sep 2026) | Enterprise Full-Stack",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/Logistics-Management-System",tags:["Python","Django","PostgreSQL","REST APIs","Enterprise Architecture"],description:"An enterprise-grade commercial logistics and supply chain engine designed for multi-dealer inventory synchronization, order dispatch scheduling, route tracking, and automated consignment status updates.",highlights:["Architected modular multi-tenant database schema for independent dealers and logistics coordinators.","Implemented secure JWT authentication, role-based access control, and automated shipment tracking webhooks.","Full tracking pipeline from depot dispatch to consumer delivery confirmation."]},{id:"piezo-wearable",title:"Piezo-Electric Based Acupressure Wearable Device",subtitle:"IoT Wearable Healthcare System Architecture",badge:"Published Research | Hardware & IoT",createdPeriod:"Research & Prototype",githubUrl:"https://github.com/abhishek947kumar",tags:["Embedded C","Wokwi","Microcontrollers","IoT","Sensors","Hardware-Software Co-Design"],description:"Microcontroller-based IoT-enabled wearable system engineered to deliver targeted acupressure therapy while harvesting energy through piezoelectric transducers. Designed and verified using Wokwi simulation and physical prototyping.",highlights:["Programmed robust firmware logic in Embedded C with interrupt-driven sensor sampling.","Interfaced analog piezoelectric sensors and pulse monitoring actuators over SPI/I2C buses.","Accompanied by a published peer-reviewed IEEE conference paper at IEMENTECH 2026."]},{id:"traffic-controller",title:"Camera-Assisted Adaptive 7-State Traffic Controller",subtitle:"Dynamic FSM in C on Xilinx Vivado",badge:"Hardware & Control Systems",createdPeriod:"Academic Milestone",githubUrl:"https://github.com/abhishek947kumar",tags:["C","Xilinx Vivado","Finite State Machines","Control Logic","Real-Time Processing"],description:"Camera-assisted algorithmic traffic control system implemented as an adaptive 7-state Finite State Machine (FSM). Processes live traffic density metrics and dynamically calculates variable green-light intervals to eliminate urban intersection deadlocks.",highlights:["Developed high-performance state execution logic in C to minimize cycle-by-cycle computational latency.","Simulated in Xilinx Vivado environment with timing constraints and clock-domain validation.","Demonstrated 35% reduction in simulated queue wait times compared to fixed-time traffic light cycles."]},{id:"your-finance",title:"YourFinance - AI Expense Tracker & Budget Insights",subtitle:"Full-Stack Financial Dashboard with Google Gemini AI",badge:"Recent (Jul 2026) | AI & Web App",createdPeriod:"Last 6 Months",githubUrl:"https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",tags:["JavaScript","HTML5","CSS3","Gemini AI API","Data Visualization"],description:"Modern full-stack personal finance and wealth management dashboard. Features dynamic category budget tracking with visual alert thresholds, savings milestone progress, and automated financial insights powered by Google Gemini AI.",highlights:["Integrated Google Gemini LLM to analyze spending transactions and recommend personalized budgeting optimizations.","Interactive graphical charts, responsive dark glassmorphic interface, and offline storage synchronization."]},{id:"evershop",title:"EverShop Modern eCommerce Experience",subtitle:"Modular TypeScript & GraphQL Architecture",badge:"Recent (Aug 2026) | Modern Web Architecture",createdPeriod:"Last 6 Months",githubUrl:"https://github.com/abhishek947kumar/Evershop",tags:["TypeScript","React","GraphQL","Node.js","Tailored Commerce"],description:"Modern, TypeScript-first eCommerce platform built on GraphQL and React. Designed with a modular architecture for high-performance product indexing, catalog searches, and seamless checkout pipelines.",highlights:["End-to-end typed schema with GraphQL queries and mutations.","Modular cart state and extensible component hierarchy for rapid UI customizations."]},{id:"cybersecurity-suite",title:"Cryptographic Tools & Security Suite",subtitle:"Prodigy InfoTech Cybersecurity Engineering",badge:"Cybersecurity & Logic",createdPeriod:"Internship Projects",githubUrl:"https://github.com/abhishek947kumar",tags:["Python","C++","Cryptography","Pixel Manipulation","Security Algorithms"],description:"Suite of cybersecurity tools created during security engineering training: image encryption via mathematical pixel transformation (PRODIGY_CS_02), Caesar cipher cryptanalysis engine (PRODIGY_CS_01), password entropy checker (PRODIGY_CS_03), and system event logger (PRODIGY_CS_04).",highlights:["Built byte-level pixel manipulation algorithms preserving visual entropy while maintaining reversibility.","Developed password entropy scoring models with dictionary attack resilience metrics."]}],skills:{domains:[{name:"Processor Design, VLSI & Digital Logic",icon:"git-commit",level:96},{name:"Deep Learning, Multimodal AI & Vision",icon:"cpu",level:95},{name:"Cloud Security, DLP & Digital Forensics",icon:"shield",level:94},{name:"Embedded Systems, Firmware & IoT",icon:"chip",level:93},{name:"FinTech, Real-Time Web & Telemetry",icon:"activity",level:92},{name:"Backend, Systems & API Architecture",icon:"layers",level:91}],categories:[{id:"ai-ml",name:"AI, Deep Learning & Computer Vision",icon:"🤖",projectContext:"Neural Image Caption Studio, ReturnGuard ReAct Agent, PlateVision ALPR & FraudGuard.AI",skills:["PyTorch & Torchvision","CNN + LSTM Encoder-Decoder","Beam Search Decoding (alpha=0.7)","Autonomous ReAct Agents","Multimodal Defect Vision","8-Stage OpenCV ALPR","Tesseract OCR Ensemble","XGBoost Ensemble","Explainable AI (XAI / SHAP)","Scikit-Learn","Balanced Random Forest","Computer Vision (YOLOv2)","Active IR + Thermal Sensor Fusion","Google Gemini AI API","PR-AUC Optimization"]},{id:"embedded-hardware",name:"Processor Architecture, Embedded Systems & VLSI",icon:"🔌",projectContext:"MIPS 32-Bit Processor (Vivado FPGA), IEEE Wearable, Traffic FSM & Jadavpur VLSI",skills:["Verilog HDL","MIPS32 Core Architecture","5-Stage Pipelining (IF/ID/EX/MEM/WB)","Hazard Detection & EX/MEM Forwarding","Xilinx Vivado (Artix-7 XC7A35T Basys 3)","Custom Cross-Assembler (Python)","Microcontrollers (ARM, AVR, ESP32)","Embedded C / C++","Hardware Interfacing (GPIO, UART, SPI, I2C)","Wokwi IoT Simulator","Bare-Metal EDA Optimization","Gate-Level Delay Benchmarking","Control Systems"]},{id:"security-forensics",name:"Cloud Security & Digital Forensics",icon:"🛡️",projectContext:"Cloud DLP Shield, BitTrace DFIR & Security Suite",skills:["Cloud DLP Architecture","AST SQLi Interception","AES-256-GCM Authenticated Encryption","AuthTag Cryptographic Verification","Volatile Memory (RAM) Triage","ISO/IEC 27037 Evidence Handling","Windows Prefetch (.pf) & Registry Analysis","Luhn PAN Validation","Honeytoken Decoy Defense"]},{id:"fintech-realtime",name:"FinTech & Real-Time Distributed Systems",icon:"⚡",projectContext:"SplitFlow, PulseFlow Agile & Cloud DLP SOC",skills:["Greedy Graph Debt Minimization","Bidirectional WebSockets","Server-Sent Events (SSE)","D3.js Sprint Burndown Telemetry","OCR Receipt Scanning & Parsing","Live FX Exchange Rate APIs","Dynamic UPI QR Code Generation","Interactive Gantt Dependency Timelines"]},{id:"languages-frameworks",name:"Languages & Full-Stack Engineering",icon:"💻",projectContext:"Production Full-Stack & Microservices",skills:["Python (FastAPI, Django)","C / C++","Embedded C","JavaScript / TypeScript","Node.js & Express","React 18","SQL (PostgreSQL, SQLite)","MATLAB","RESTful APIs","Git / GitHub / CI-CD","Linux / Bash","LaTeX","Agile / Scrum (Jira)"]}]},publications:[{title:"Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy",venue:"IEMENTECH 2026 (IEEE International Conference)",status:"Published",doi:"10.1109/IEMENTech202669403.2026.11434403",link:"https://doi.org/10.1109/IEMENTech202669403.2026.11434403",summary:"Pioneered a wearable health technology framework combining biomechanical piezoelectric energy harvesting with automated acupressure therapy for depression and stress relief, minimizing external battery charging requirements while optimizing therapeutic stimulation."}],certifications:[{title:"Internet of Things and AI Cloud",issuer:"University of California, San Diego (Coursera)",skills:["IoT Architecture","Cloud Integration","Smart Systems"]}],socialFeed:[{id:"post-li-mips",platform:"LinkedIn",author:"Abhishek Kumar",date:"October 23, 2026",title:"Synthesized 32-Bit 5-Stage Pipelined MIPS Processor Core on Artix-7 FPGA in Vivado! ⚡💻",content:"Delighted to release my latest computer architecture project: a complete 32-bit 5-stage pipelined MIPS processor core implemented in Verilog HDL! Implements full hardware forwarding (EX-to-EX, MEM-to-EX), hardware load-use hazard stall insertion, and branch flush logic. Synthesized in Xilinx Vivado 2019.2 for the Artix-7 Basys 3 FPGA (2,810 LUTs, 1,569 FFs, 94 mW total power, 0 DRC violations). Features a custom two-pass Python cross-assembler and 4-digit 7-segment hardware telemetry driver.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#Verilog","#MIPS","#FPGA","#Vivado","#ComputerArchitecture","#VLSI","#DigitalDesign"]},{id:"post-gh-mips",platform:"GitHub",author:"abhishek947kumar",date:"October 23, 2026",title:"Pushed mips-32bit-pipelined-processor to GitHub @abhishek947kumar 🚀",content:"Open-sourced 5-stage pipelined MIPS processor core in Verilog HDL with Patterson & Hennessy microarchitecture, custom Python cross-assembler, Basys 3 FPGA constraints, and 4/4 passing automated assembly benchmark suites.",url:"https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",tags:["#Verilog","#MIPS","#FPGA","#Vivado","#OpenSource"]},{id:"post-li-caption",platform:"LinkedIn",author:"Abhishek Kumar",date:"October 17, 2026",title:"Unveiled Neural Image Caption Studio: Deep Learning Multimodal AI! 🌌🤖",content:"Excited to share Neural Image Caption Studio, a full-stack deep learning application combining CNN feature extractors (MobileNetV3/ResNet-50) with an autoregressive LSTM language decoder trained on Flickr8k. Features dual decoding (Greedy & Beam Search with length penalty alpha=0.7), an interactive token probability inspector tray, Web Speech API TTS, and a standalone BLEU metric evaluation laboratory.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#DeepLearning","#PyTorch","#ComputerVision","#NLP","#FastAPI","#MachineLearning"]},{id:"post-li-returnguard",platform:"LinkedIn",author:"Abhishek Kumar",date:"October 17, 2026",title:"Launched ReturnGuard: Autonomous ReAct E-Commerce AI Refund Agent! 🛡️🛍️",content:"Thrilled to present ReturnGuard, an autonomous ReAct (Reasoning and Acting) AI agent engineered for governed e-commerce returns. Features an automated cognitive loop (Thought -> Action -> Observe), multimodal computer vision defect inspection, anti-fraud policy enforcement against wardrobing and empty-box claims, and a Human-in-the-Loop review desk. Achieves ~81% autonomous resolution throughput in sub-850ms.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#AutonomousAgents","#ReAct","#AI","#ComputerVision","#FastAPI","#React","#FinTech"]},{id:"post-li-platevision",platform:"LinkedIn",author:"Abhishek Kumar",date:"October 5, 2026",title:"Built PlateVision AI: Automatic License Plate Recognition System! 🚗📸",content:"Engineered PlateVision AI, an end-to-end production ALPR/ANPR system featuring an 8-stage Computer Vision pipeline (Bilateral Filtering, Morphological TopHat/BlackHat, Canny, Aspect Ratio & Solidity filters, Perspective Deskewing) combined with a multi-PSM Tesseract OCR ensemble, dark-mode web visualizer, and FastAPI REST API.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#ComputerVision","#OpenCV","#OCR","#Tesseract","#Python","#FastAPI","#ImageProcessing"]},{id:"post-li-fraudguard",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 30, 2026",title:"Launched FraudGuard.AI: Enterprise Real-Time Credit Card Fraud Detection Platform! 💳🤖",content:"Excited to unveil FraudGuard.AI, an enterprise machine learning platform for real-time digital payment defense! Engineered with Python, FastAPI, and an ensemble of cost-weighted XGBoost, Balanced Random Forest, and Isolation Forest. Features sub-10ms risk scoring, geo-velocity impossible travel calculation (detecting card cloning), automated tiered action policies (Approve, Challenge, Decline & Freeze), and Explainable AI (XAI) diagnostics compliant with FCRA and GDPR Art. 22 standards.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#MachineLearning","#CyberDefense","#FinTech","#XGBoost","#FastAPI","#ExplainableAI","#Python","#AI"]},{id:"post-li-clouddlp",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 30, 2026",title:"Unveiled Cloud DLP Shield: Real-Time SQLi Interception & Cloud Data Loss Prevention! 🛡️☁️",content:"Proud to announce Cloud DLP Shield, an enterprise-grade cloud security system engineered to defend web services and e-commerce stores against data leaks and SQL injections. Powered by a Dual-Engine Gateway (Content Inspection with Luhn verification + Contextual Behavioral Analytics with typing cadence & query velocity tracking) and AESX authenticated field encryption with tamper-proof AuthTags, plus a live SSE Security Operations Center (SOC).",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#Cybersecurity","#CloudSecurity","#DataLossPrevention","#Cryptography","#NodeJS","#AppSec","#InfoSec"]},{id:"post-gh-fraudguard",platform:"GitHub",author:"abhishek947kumar",date:"September 30, 2026",title:"Pushed FraudGuard.AI to GitHub @abhishek947kumar 🚀",content:"Released repository for real-time credit card fraud detection with XGBoost ensemble, automated synthetic data generator, sub-10ms scoring API, and Explainable AI triage dashboard.",url:"https://github.com/abhishek947kumar/credit-card-fraud-detection",tags:["#MachineLearning","#Python","#FastAPI","#OpenSource"]},{id:"post-gh-clouddlp",platform:"GitHub",author:"abhishek947kumar",date:"September 30, 2026",title:"Pushed detecting-data-leaks (Cloud DLP Shield) to GitHub 🛡️",content:"Open-sourced full cloud DLP gateway implementation with AST SQLi parsing, Luhn card validation, AESX 256-bit encryption vault, and live SSE SOC dashboard.",url:"https://github.com/abhishek947kumar/detecting-data-leaks",tags:["#CloudSecurity","#DLP","#NodeJS","#Cryptography"]},{id:"post-li-bittrace",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 21, 2026",title:"Launched BitTrace DFIR: Automated Live & Postmortem Bitcoin Forensics on Windows! 🛡️💻",content:"Excited to unveil my latest cybersecurity & systems project: BitTrace DFIR! An open-source forensic platform designed to conduct live volatile memory (RAM) triage and persistent postmortem disk/registry analysis of cryptocurrency artifacts on Windows. Engineered with a FastAPI bridge, interactive React glassmorphism dashboard, BIP-39 mnemonic recovery, Berkeley DB parser, and ISO/IEC 27037 compliant cryptographic evidence vault.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#DigitalForensics","#DFIR","#Cybersecurity","#Python","#FastAPI","#React","#Bitcoin"]},{id:"post-li-nightvision",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 19, 2026",title:"Engineered Embedded Night-Vision System for Pedestrian Detection! 🌙🚗",content:"Thrilled to share my work on an intelligent Advanced Driver-Assistance System (ADAS). By fusing dual feeds from active 850nm infrared illuminators and LWIR thermal sensors with a hybrid HAAR+AdaBoost candidate filter and quantized YOLOv2 neural network, the system detects pedestrians in zero-visibility conditions with low latency on resource-constrained embedded edge hardware.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#EmbeddedSystems","#ComputerVision","#ADAS","#SensorFusion","#DeepLearning","#EdgeAI"]},{id:"post-li-logistics",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 18, 2026",title:"Built LogiTrack Pro: Enterprise Commercial Logistics Management System 🚚📦",content:"Proud to present LogiTrack Pro, a full-stack commercial multi-dealer and consumer logistics management ecosystem built with Python and Django. Features multi-tenant dealer inventory synchronization, automated shipment manifests, route optimization dispatch schedules, and JWT-authenticated telemetry alerts.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#FullStack","#Python","#Django","#Logistics","#SupplyChain","#EnterpriseSoftware"]},{id:"post-1",platform:"LinkedIn",author:"Abhishek Kumar",date:"August 2026",title:"Thrilled to share our IEEE Publication at IEMENTECH 2026! 🚀",content:"Delighted to announce that our research paper titled 'Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy' has been officially published in IEEE Xplore! In this work, we explored self-sustaining wearable medical systems that harvest biomechanical energy to power automated pressure-point stimulation. Big thanks to my co-authors and mentors at IEM Kolkata!",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#IEEE","#WearableTech","#BiomedicalEngineering","#IoT","#Research"]},{id:"post-2",platform:"LinkedIn",author:"Abhishek Kumar",date:"January 2026",title:"Completed VLSI Design Internship at Jadavpur University! ⚡",content:"Honored to wrap up an enriching winter internship at the prestigious Jadavpur University ETCE department. Worked extensively on IC design and fabrication flows, evaluating timing-critical processing pipelines using state-of-the-art EDA tools and bare-metal hardware optimization.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#VLSI","#Semiconductors","#ICDesign","#JadavpurUniversity","#HardwareEngineering"]},{id:"post-3",platform:"GitHub",author:"abhishek947kumar",date:"September 2026",title:"Pushed updates to Embedded-Night-Vision-System 🌙",content:"Added dual-stream fusion pipeline interfacing active IR and LWIR thermal sensors with HAAR+AdaBoost and lightweight YOLOv2 on embedded hardware. Benchmarked latency under low-light pedestrian crossing scenarios.",url:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",tags:["#ComputerVision","#EmbeddedSystems","#Python","#AutonomousSystems"]},{id:"post-4",platform:"LinkedIn",author:"Abhishek Kumar",date:"June 2025",title:"Completed Vocational Training at Steel Authority of India Limited (SAIL) 🏭",content:"Excited to share that I've concluded my vocational training at SAIL Bokaro Steel Plant. It was an incredible experience working on industrial plant automation software modules, telemetry databases, and real-time process monitoring.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#SAIL","#IndustrialAutomation","#ProcessControl","#EngineeringInternship"]}],qaKnowledgeBase:[{keywords:["mips","processor","verilog","vivado","fpga","basys 3","artix-7","pipeline","hazard","forwarding","assembler","isa"],answer:`32-Bit 5-Stage Pipelined MIPS Processor Core (Released Oct 23, 2026 on GitHub @abhishek947kumar):
• **Microarchitecture & Hazards**: Classic Patterson & Hennessy 5-stage RISC pipeline (IF -> ID -> EX -> MEM -> WB) designed in Verilog HDL. Features EX-to-EX and MEM-to-EX forwarding (zero-stall for consecutive ALU dependencies), hardware load-use hazard detection (automatic 1-cycle bubble insertion), and branch flush controls.
• **FPGA Synthesis in Xilinx Vivado**: Synthesized targeting Xilinx Artix-7 (XC7A35TCPG236-1 / Basys 3) utilizing 2,810 Slice LUTs (13.51%), 1,569 FFs (3.77%), drawing only 94 mW total power with zero DRC errors.
• **Custom Python Cross-Assembler**: Two-pass assembler converting symbolic MIPS assembly to binary/hex MIF files with label resolution, pseudo-instruction macro expansion, and automated verification.
• **Hardware Verification**: 4/4 passing automated assembly benchmark suites (Fibonacci, ALU stress, memory load/store, hazard test) interfaced with a time-multiplexed 4-digit 7-segment display driver and 16 LEDs.
• **Repository**: [github.com/abhishek947kumar/mips-32bit-pipelined-processor](https://github.com/abhishek947kumar/mips-32bit-pipelined-processor)`},{keywords:["image caption","caption generator","pytorch","lstm","cnn","mobilenet","resnet","beam search","bleu","flickr8k"],answer:`Neural Image Caption Studio (Deep Learning Vision-Language Studio - Released Oct 17, 2026 on GitHub @abhishek947kumar):
• **Multimodal Architecture**: Merged Show & Tell architecture combining deep CNN feature extractors (MobileNetV3 / ResNet-50) with an autoregressive LSTM language decoder trained on Flickr8k.
• **Dual Decoding Strategies**: Implements ultra-fast greedy argmax search and multi-hypothesis Beam Search with length penalty normalization (alpha = 0.7).
• **Cyber-Neural Web Studio**: Modern dark glassmorphic dashboard with token-level softmax inspection tray, Web Speech API text-to-speech (TTS), and top-5 ImageNet visual concept activations.
• **BLEU Metric Lab & Fast Caching**: Evaluates BLEU-1 to BLEU-4 benchmarks with Brevity Penalty, with offline penultimate feature caching enabling full epoch training in seconds.
• **Repository**: [github.com/abhishek947kumar/image-caption-generator](https://github.com/abhishek947kumar/image-caption-generator)`},{keywords:["returnguard","return-guard","refund","react","react agent","autonomous agent","ecommerce return","hitl","multimodal vision"],answer:`ReturnGuard (Autonomous ReAct E-Commerce AI Refund Agent - Released Oct 17, 2026 on GitHub @abhishek947kumar):
• **Cognitive ReAct Agent Core**: Step-by-step reasoning trace (Thought -> Action -> Observe) providing a transparent internal monologue and tool execution telemetry, resolving valid returns in sub-850ms.
• **Multimodal Vision Defect Inspection**: Computer vision engine evaluating uploaded product damage photos (screen fractures, severed tags, crushed packaging) to confirm defect claims.
• **AI Governance & Guardrails**: Hard $500 autonomous decision ceiling, anti-hallucination grounding, and Human-in-the-Loop (HITL) review desk for high-value disputes.
• **Anti-Fraud Engine**: Dynamic policy rules across 6 retail categories protecting against wardrobing, empty-box fraud, and serial returners with ~81% autonomous resolution throughput.
• **Repository**: [github.com/abhishek947kumar/Return-Guard](https://github.com/abhishek947kumar/Return-Guard)`},{keywords:["license plate","platevision","alpr","anpr","opencv","tesseract","ocr","deskew"],answer:`PlateVision AI (Automatic License Plate Recognition - Released Oct 5, 2026 on GitHub @abhishek947kumar):
• **8-Stage Computer Vision Pipeline**: Bilateral Filtering, Morphological TopHat/BlackHat contrast enhancement, Canny Edge Detection, Contour Aspect Ratio (1.5 <= AR <= 6.0) & Solidity Filtering, and Perspective Transform / Deskewing.
• **Multi-PSM OCR Ensemble**: Queries Tesseract OCR across Page Segmentation Modes (--psm 8, 7, and 6) with character whitelisting and regex sanitization to maximize alphanumeric precision.
• **Dual Engine Benchmark**: Baseline OpenCV pipeline vs. Advanced Enhanced Pipeline solving real-world reflections, steep tilt angles, and windshield false positives.
• **Interactive Dashboard**: Modern glassmorphic dark-mode web visualizer with real-time CV stage breakdown inspector, webcam feeds, and FastAPI REST API.
• **Repository**: [github.com/abhishek947kumar/license-plate-recognition](https://github.com/abhishek947kumar/license-plate-recognition)`},{keywords:["fraud","fraudguard","credit card","xgboost","explainable ai","xai","financial fraud","sub-10ms"],answer:`FraudGuard.AI (Enterprise Real-Time Credit Card Fraud Detection Platform - Released Sep 30, 2026 on GitHub @abhishek947kumar):
• **Architecture & Performance**: Ultra-fast FastAPI inference service scoring transactions in under 2.8ms, achieving 100% recall and a perfect 1.000 PR-AUC on holdout test benchmarks under extreme class imbalance (~1% fraud prevalence).
• **Machine Learning Ensemble**: Cost-weighted XGBoost, Balanced Random Forest, HistGradientBoosting, and unsupervised Isolation Forest for catching zero-day and anomalous fraud vectors.
• **Feature Engineering & Geo-Velocity**: Calculates real-time physical geo-velocity in km/h to catch impossible travel/card cloning, 1h/24h velocity spikes, and 30-day cardholder spend outlier ratios.
• **Explainable AI (XAI)**: Generates human-readable risk drivers compliant with FCRA and GDPR Art. 22 standards, mapping into automated tiered actions (AUTO_APPROVE, STEP_UP_AUTH with OTP/3D Secure, DECLINE_AND_FREEZE).
• **Repository**: [github.com/abhishek947kumar/credit-card-fraud-detection](https://github.com/abhishek947kumar/credit-card-fraud-detection)`},{keywords:["dlp","data leak","data loss prevention","cloud dlp","sqli","sql injection","aesx","aes-256-gcm","honeypot","honeytoken","luhn"],answer:`Cloud DLP Shield (Detecting Data Leaks Using SQL & Cloud DLP Architecture - Released Sep 30, 2026 on GitHub @abhishek947kumar):
• **Dual-Engine Inspection Gateway**: Layer 1 Content Engine intercepts SQL injection AST signatures (Tautology, Union exfiltration, Schema harvesting), validates credit cards with the mathematical Luhn algorithm, and neutralizes keylogger scripts. Layer 2 Contextual Engine analyzes user behavioral signals, query bursts, and typing cadence anomalies (<15ms).
• **AESX Field Encryption**: Zero-trust database storage utilizing AES-256-GCM authenticated encryption with key whitening, dynamic IVs, and 128-bit authentication tags preventing ciphertext tampering.
• **User Threat Categorization & Honeytokens**: Classifies traffic into Benign (0-29), Suspicious (30-69), and Assaulter (70-100), feeding deceptive synthetic honeytokens to bad actors while locking down production databases.
• **Live SOC & Demo**: Real-time Server-Sent Events (SSE) threat stream, AST sandbox terminal, database vault explorer, and interactive Nexus E-Shop featuring a toggleable 'DLP Shield vs Vulnerable Raw SQL' comparison.
• **Repository**: [github.com/abhishek947kumar/detecting-data-leaks](https://github.com/abhishek947kumar/detecting-data-leaks)`},{keywords:["splitflow","expense splitter","split","expense","receipt","ocr","debt graph","settlement","upi","greedy"],answer:`SplitFlow (Smart Group Expense Splitter & Settlement Engine - Launched Sep 29, 2026 on GitHub @abhishek947kumar):
• **Greedy Debt Minimization**: Algorithmic settlement graph engine eliminating circular debt and reducing multi-person group obligations into the minimum number of direct transactions, visualized via dynamic Canvas/SVG debt graphs.
• **OCR Receipt Parsing**: Ingests receipt photos to extract line-item costs, taxes, and service fees, supporting equal, percentage, and exact custom splits.
• **Real-Time FX & UPI Settlements**: Live multi-currency conversion via exchange rate APIs with integrated UPI and instant dynamic payment QR codes.
• **Audit Trail**: Generates exportable financial reports in PDF, CSV, and Excel with tamper-evident ledgers.
• **Repository**: [github.com/abhishek947kumar/splitflow](https://github.com/abhishek947kumar/splitflow)`},{keywords:["pulseflow","agile","scrum","kanban","burndown","websockets","d3","gantt","copilot"],answer:`PulseFlow Agile (Enterprise Project Management & Telemetry Platform - Launched Sep 29, 2026 on GitHub @abhishek947kumar):
• **Real-Time WebSockets Collaboration**: Multi-user Kanban boards with bidirectional WebSockets, optimistic UI updates, conflict resolution, and granular role permissions.
• **D3.js Sprint Telemetry**: Interactive D3.js burndown/burnup velocity tracking, scope-creep detection, and cumulative flow diagrams computed in real time.
• **AI Copilot for Agile**: Automated drafting of user stories, acceptance criteria, velocity prediction, and blocker triage.
• **Interactive Gantt Timeline**: Drag-and-drop chronological roadmap with milestone dependency tracking and critical path calculation.
• **Repository**: [github.com/abhishek947kumar/pulseflow-agile](https://github.com/abhishek947kumar/pulseflow-agile)`},{keywords:["bittrace","bitcoin","forensic","forensics","dfir","cybersecurity","memory","ram","iso 27037","postmortem","volatile","bip-39"],answer:`BitTrace DFIR (Automated Live & Postmortem Bitcoin Forensic Analysis Tool for Windows - Released Sep 21, 2026 on GitHub @abhishek947kumar):
• **Live Volatile Memory Forensics**: Inspects running wallet processes (Bitcoin-Qt, Electrum, Armory) to recover 12–24 word BIP-39 recovery seeds, WIF/Hex private keys, and addresses with an aligned byte Hex/ASCII memory viewer.
• **Postmortem Disk & Registry Analysis**: Scans %APPDATA% for Berkeley DB wallet.dat files (0x00053162), decodes UserAssist ROT13 registry launch logs, parses Windows Prefetch (.pf) files, and performs SQLite shadow copying on browser wallet extensions.
• **ISO/IEC 27037 Evidence Vault**: Computes SHA-256 and MD5 cryptographic hashes with real-time tamper re-verification and 1-click court-ready printable PDF/HTML reports.
• **Tech Stack**: Python 3.10+, FastAPI, React 18, Vite, Windows API, Cryptography.
• **Repository**: [github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems](https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems)`},{keywords:["night vision","night-vision","pedestrian","thermal","infrared","ir","yolov2","adas","edge ai","haar"],answer:`Embedded Night-Vision System for Pedestrian Detection (Released Sep 19, 2026 on GitHub @abhishek947kumar):
• **Multi-Modal Sensor Fusion**: Combines active 850nm infrared illumination with LWIR thermal imaging streams for reliable night-time object detection under pitch-black and harsh atmospheric road conditions.
• **Dual-Stage Processing Pipeline**: Employs HAAR+AdaBoost candidate filters for fast pre-filtering, paired with a custom-pruned, quantized YOLOv2 convolutional network for precise real-time pedestrian localization.
• **Edge Optimization**: Tailored for resource-constrained embedded automotive and edge hardware, minimizing latency while maintaining high precision and low false-positive rates.
• **Repository**: [github.com/abhishek947kumar/Embedded-Night-Vision-System](https://github.com/abhishek947kumar/Embedded-Night-Vision-System)`},{keywords:["logistics","logitrack","supply chain","fleet","dealer","django","consignment"],answer:`Logistics Management System (LogiTrack Pro - Released Sep 18, 2026 on GitHub @abhishek947kumar):
• **Multi-Tenant Architecture**: Full-stack commercial logistics engine built in Python and Django with PostgreSQL, coordinating inventory, dispatches, and fleet tracking across independent dealer networks.
• **Dispatch & Route Optimization**: Generates automated consignment manifests, shipment dispatch scheduling, and delivery confirmation pipelines.
• **Security & Webhooks**: Implements secure JWT authentication, role-based access control (RBAC), and automated tracking webhook alerts.
• **Repository**: [github.com/abhishek947kumar/Logistics-Management-System](https://github.com/abhishek947kumar/Logistics-Management-System)`},{keywords:["piezo","wearable","acupressure","depression","healthcare","wokwi","transducer","energy harvesting"],answer:`Piezo-electric Acupressure Wearable Device (Published with IEEE at IEMENTECH 2026):
• **Self-Sustaining IoT Architecture**: Healthcare wearable engineered in Embedded C and verified via Wokwi simulation, combining biomechanical energy harvesting with therapeutic acupressure stimulation.
• **Hardware Interfacing**: Interfaces piezoelectric energy transducers and pulse monitoring channels over SPI/I2C micro-buses to extend battery autonomy.
• **Peer-Reviewed Paper**: First-author research officially indexed on IEEE Xplore (DOI: 10.1109/IEMENTech202669403.2026.11434403).`},{keywords:["traffic","vivado","fsm","finite state machine","7-state","xilinx","queue"],answer:`Camera-Assisted Adaptive 7-State Traffic Controller:
• **Hardware Architecture**: Implemented as an adaptive 7-state Finite State Machine (FSM) in C and verified in Xilinx Vivado with full timing closure and clock-domain validation.
• **Dynamic Green-Light Control**: Ingests real-time optical vehicle density metrics to calculate variable phase durations, reducing intersection wait times by 35% compared to static cycles.`},{keywords:["yourfinance","finance","gemini","expense tracker","budget","wealth"],answer:`YourFinance — AI Expense Tracker & Budget Insights (Released Jul 2026):
• **AI Wealth Advisory**: Personal finance control center integrating the Google Gemini AI API to analyze spending transactions and generate actionable budgeting recommendations.
• **Interactive Dashboard**: Modern glassmorphic interface with interactive category expense charts, custom threshold alerts, and local data persistence.
• **Repository**: [github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights](https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights)`},{keywords:["evershop","ecommerce","graphql","typescript","cart","catalog"],answer:`EverShop — Modern eCommerce Platform (Released Aug 2026):
• **Modular Architecture**: Modern full-stack eCommerce platform built with TypeScript, React, and GraphQL for high-performance product indexing and checkout flows.
• **Type-Safe Data**: End-to-end typed queries and mutations with flexible cart and catalog state management.
• **Repository**: [github.com/abhishek947kumar/Evershop](https://github.com/abhishek947kumar/Evershop)`},{keywords:["security suite","cryptographic tools","pixel manipulation","caesar","password entropy","prodigy"],answer:`Cryptographic Tools & Security Suite (Prodigy InfoTech Engineering):
• **Image Encryption**: Pixel manipulation algorithms altering visual entropy while ensuring reversible decryption.
• **Classical Cryptanalysis**: Automated Caesar cipher brute-force and frequency analysis decoder.
• **Security Tools**: Mathematical password entropy scoring engine and event-driven logging utilities.`},{keywords:["project skills","skills in projects","technologies used in projects","how skills relate to projects","skills used"],answer:`Abhishek's skills are directly validated across his production projects:
• **Processor Design & VLSI (96%)**: Applied in **MIPS 32-Bit Pipelined Processor** (Verilog HDL, 5-stage pipeline, hazard forwarding unit, Python cross-assembler, Basys 3 FPGA Vivado synthesis) and **7-State Traffic Controller** (Vivado FSM).
• **Deep Learning & Multimodal AI (95%)**: Applied in **Neural Image Caption Studio** (PyTorch CNN+LSTM, Beam Search alpha=0.7, token softmax probability inspection) and **ReturnGuard** (Autonomous ReAct agent, multimodal CV defect inspection).
• **Computer Vision & OCR (94%)**: Applied in **PlateVision AI** (8-stage OpenCV ALPR pipeline, multi-PSM Tesseract OCR) and **Embedded Night-Vision** (active IR + thermal sensor fusion with quantized YOLOv2).
• **Cloud Security & Digital Forensics (94%)**: Applied in **Cloud DLP Shield** (AST SQLi detection, AES-256-GCM zero-trust encryption, Honeytokens, Luhn validation) and **BitTrace DFIR** (volatile RAM triage, BIP-39 recovery, ISO/IEC 27037 vault).
• **FinTech & Real-Time Web (92%)**: Applied in **FraudGuard.AI** (sub-2.8ms XGBoost ensemble & Explainable AI), **SplitFlow** (greedy debt graph optimization, OCR receipt parsing, UPI QR), and **PulseFlow Agile** (WebSockets, D3.js sprint burndown telemetry, AI Copilot).
• **Embedded Systems & Microcontrollers (93%)**: Applied in **Piezoelectric Wearable** (Embedded C, Wokwi, SPI/I2C, IEEE paper) and **Jadavpur University VLSI Internship** (bare-metal EDA delay optimization).
• **Backend & Full-Stack (91%)**: Applied across **FastAPI**, **Node.js/Express**, **Django**, **React 18**, and **PostgreSQL** in his flagship systems.`},{keywords:["github","recent projects","last 6 months","6 months","latest","new projects","last 1 week","1 week","last week"],answer:`Abhishek engineered and released 18+ high-impact projects on GitHub (@abhishek947kumar) and LinkedIn, featuring brand new October 2026 releases:
• **32-Bit Pipelined MIPS Processor (Oct 23, 2026)**: Complete 5-stage MIPS core in Verilog HDL with hazard detection, data forwarding, Python cross-assembler, and Artix-7 Basys 3 FPGA Vivado synthesis.
• **Neural Image Caption Studio (Oct 17, 2026)**: Full-stack multimodal deep learning app with PyTorch CNN+LSTM, Beam Search decoding, token inspector, and BLEU metric lab.
• **ReturnGuard (Oct 17, 2026)**: Autonomous ReAct e-commerce refund agent with multimodal vision defect inspection, anti-fraud governance, and HITL review desk.
• **PlateVision AI (Oct 5, 2026)**: End-to-end 8-stage OpenCV license plate recognition pipeline with multi-PSM Tesseract OCR ensemble and FastAPI visualizer.
• **FraudGuard.AI (Sep 30, 2026)**: Enterprise credit card fraud detection with sub-2.8ms scoring, XGBoost ensemble, and Explainable AI (XAI).
• **Cloud DLP Shield (Sep 30, 2026)**: Enterprise Cloud Data Loss Prevention platform with AST SQLi interception, Luhn validation, AESX field encryption, and live SSE SOC.
• **SplitFlow (Sep 29, 2026)**: Smart group expense splitter with OCR receipt scanner, live FX conversion, greedy debt simplification graph, and UPI QR settlements.
• **PulseFlow Agile (Sep 29, 2026)**: Enterprise agile platform with real-time WebSockets, D3.js sprint burndown telemetry, AI Copilot, and Gantt roadmaps.
• **BitTrace DFIR (Sep 21, 2026)**: Automated Live RAM and Postmortem Bitcoin Forensics Tool for Windows compliant with ISO/IEC 27037.
• **Embedded-Night-Vision-System (Sep 19, 2026)**: Active IR & thermal sensor fusion with quantized YOLOv2 for real-time pedestrian recognition.
• **Logistics-Management-System (Sep 18, 2026)**: Enterprise commercial multi-dealer logistics and fleet tracking platform in Python and Django.
• **YourFinance & Evershop**: AI wealth advisory (Google Gemini) and TypeScript/GraphQL eCommerce.`},{keywords:["cgpa","marks","grades","percentage","score","academic","standing","result"],answer:`Abhishek maintains an exceptional academic record across engineering and schooling:
• **B.Tech in ECE (IEM Kolkata, 2023–2027)**: 8.73 CGPA (up to 6th semester) with top department standing.
• **CBSE Class 12 (PCM + IP)**: 86.5% at M.G.M. Higher Secondary School, Bokaro (2023).
• **CBSE Class 10**: 95.0% at M.G.M. Higher Secondary School, Bokaro (2021).`},{keywords:["vlsi","jadavpur","semiconductor","eda","ic design","bare-metal","bare metal"],answer:`Abhishek completed a prestigious VLSI Design Internship at Jadavpur University (Dec 2025 – Jan 2026):
• Studied integrated circuit (IC) design and fabrication methodologies for bare-metal systems.
• Optimized hardware-software co-design pipelines to reduce computational latency and silicon area.
• Evaluated time-critical processing architectures using industry-standard EDA simulation suites.`},{keywords:["sail","steel authority","industrial","automation","bokaro","vocational trainee"],answer:`At Steel Authority of India Limited (SAIL) Bokaro (May 2025 – June 2025):
• Developed and maintained real-time software modules for plant automation systems.
• Managed mission-critical database telemetry to monitor continuous plant manufacturing data.
• Gained practical exposure to heavy industrial process control protocols and automation standards.`},{keywords:["publication","paper","research","ieee","iementech","doi"],answer:`Abhishek's Peer-Reviewed IEEE Publication Details:
• **Title**: Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy
• **Conference**: IEEE IEMENTECH 2026
• **Role**: First Author & Lead Hardware Architect
• **DOI**: 10.1109/IEMENTech202669403.2026.11434403`},{keywords:["skills","technologies","languages","tech stack","python","c++","embedded","stacks"],answer:`Abhishek's comprehensive technical proficiencies, validated by production projects:
• **Processor Design & Hardware Architecture**: Verilog HDL, MIPS32 5-stage pipelined datapath, hazard resolution units, data forwarding, Xilinx Vivado (Artix-7 Basys 3 FPGA), custom Python cross-assemblers, timing closure.
• **AI, Deep Learning & Vision**: PyTorch, CNN + LSTM encoder-decoder, Beam Search decoding, Autonomous ReAct agents, 8-stage OpenCV ALPR, Tesseract OCR ensemble, cost-weighted XGBoost, Explainable AI (XAI / SHAP), Scikit-Learn, YOLOv2, Active IR/Thermal sensor fusion, Gemini AI.
• **Cybersecurity & Forensics**: Cloud DLP Architecture, AST SQLi Interception, AES-256-GCM Field Encryption, Live RAM Forensics, ISO/IEC 27037 Evidence Vault, Windows Prefetch & Registry, Luhn Validation.
• **FinTech & Real-Time Systems**: Greedy Graph Debt Minimization, Bidirectional WebSockets, Server-Sent Events (SSE), D3.js Sprint Burndown, OCR Receipt Parsing, Live FX APIs, UPI QR Payments.
• **Embedded & Hardware**: Microcontrollers (ARM, AVR, ESP32), Embedded C, C/C++, Hardware Interfacing (SPI, I2C, UART, GPIO), Vivado FSM, Wokwi Simulator, VLSI EDA Workflows.
• **Languages & Web**: Python, Verilog HDL, C, C++, Embedded C, JavaScript, TypeScript, SQL, MATLAB, FastAPI, Node.js, Express, Django, React 18, Docker, PostgreSQL, SQLite, Git, CI/CD, Agile/Jira.`},{keywords:["why hire","hire","placement","value","strengths","fit","candidate"],answer:`Why Abhishek Kumar is an exceptional candidate for engineering teams:
• **Top Academic Distinction**: 8.73 CGPA in B.Tech ECE with deep fundamentals in OOP, DSA, and Control Systems.
• **End-to-End Dual Capability**: Rare ability to bridge bare-metal processor design & FPGA synthesis (MIPS 32-bit core in Verilog HDL) up to deep learning, autonomous ReAct agents, and high-throughput Python/FastAPI/Node.js/AI systems.
• **Production-Grade Project Portfolio**: Built and deployed MIPS 32-Bit Processor (Vivado FPGA), Neural Image Caption Studio (PyTorch CNN+LSTM), ReturnGuard (ReAct agent), PlateVision ALPR (8-stage OpenCV), FraudGuard.AI (sub-2.8ms ML scoring), Cloud DLP Shield (AST SQLi & AES-256-GCM), SplitFlow, PulseFlow Agile, and BitTrace DFIR.
• **Published IEEE Author**: First-author conference publication at IEEE IEMENTECH 2026 on self-sustaining IoT healthcare.
• **Industrial Internships**: On-site VLSI EDA research at Jadavpur University and industrial plant automation at SAIL.
• **Immediate Value**: Highly adaptable for Processor & VLSI Design, Embedded Firmware, Machine Learning / Computer Vision, Cybersecurity, or Full-Stack Systems roles.`},{keywords:["contact","email","phone","reach","call","address","location","message","portfolio","website","live link","link","url"],answer:`Direct contact channels & portfolio links for Abhishek Kumar:
• **Live Portfolio**: [abhishek947kumar.github.io/portfolio](https://abhishek947kumar.github.io/portfolio/)
• **Email**: abhishek1297kumar@gmail.com
• **Phone / WhatsApp**: +91 9470303282
• **LinkedIn**: [linkedin.com/in/abhishek947kumar](https://www.linkedin.com/in/abhishek947kumar)
• **GitHub**: [github.com/abhishek947kumar](https://github.com/abhishek947kumar)
• **Locations**: Kolkata, West Bengal & Bokaro Steel City, Jharkhand`},{keywords:["activities","ieee","sytron","quizzophrenia","societies"],answer:`Professional societies and extracurricular leadership:
• Active Member of IEEE, IEEE MTT-S (Microwave Theory and Technology), and IEEE CAS-S (Circuits & Systems).
• Official Event Volunteer at SYTRON '25.
• Active participant and competitor in QUIZZOPHRENIA '25.`}]},$={inter:{id:"inter",name:"SF Pro / Inter",category:"macOS Native Sans",fontFamily:'"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',sample:"Clean, elegant, authentic macOS default typography."},outfit:{id:"outfit",name:"Outfit",category:"Futuristic Geometric",fontFamily:'"Outfit", "Inter", sans-serif',sample:"Modern geometric curves tailored for sleek digital interfaces."},jakarta:{id:"jakarta",name:"Plus Jakarta Sans",category:"Modern Tech Sans",fontFamily:'"Plus Jakarta Sans", "Inter", sans-serif',sample:"Crisp contemporary sans-serif engineered for high readability."},jetbrains:{id:"jetbrains",name:"JetBrains Mono",category:"Developer Code Monospace",fontFamily:'"JetBrains Mono", "SF Mono", Menlo, monospace',sample:"True developer terminal aesthetics with high contrast glyphs."},playfair:{id:"playfair",name:"Playfair Display",category:"Executive Editorial Serif",fontFamily:'"Playfair Display", Georgia, "Times New Roman", serif',sample:"Refined editorial serif for prestigious executive portfolios."}};class X{constructor(){this.currentFontId=localStorage.getItem("abhishek_portfolio_font_id")||"inter",this.currentFontSize=parseInt(localStorage.getItem("abhishek_portfolio_font_size")||"100",10),this.currentLetterSpacing=localStorage.getItem("abhishek_portfolio_letter_spacing")||"normal",this.listeners=[],this.applyAll()}onChange(e){this.listeners.push(e)}notify(){this.listeners.forEach(e=>e({fontId:this.currentFontId,fontSize:this.currentFontSize,letterSpacing:this.currentLetterSpacing}))}setFontStyle(e){$[e]&&(this.currentFontId=e,localStorage.setItem("abhishek_portfolio_font_id",e),this.applyAll(),this.notify())}setFontSize(e){const t=Math.max(75,Math.min(140,e));this.currentFontSize=t,localStorage.setItem("abhishek_portfolio_font_size",t.toString()),this.applyAll(),this.notify()}increaseFontSize(e=5){this.setFontSize(this.currentFontSize+e)}decreaseFontSize(e=5){this.setFontSize(this.currentFontSize-e)}setLetterSpacing(e){this.currentLetterSpacing=e,localStorage.setItem("abhishek_portfolio_letter_spacing",e),this.applyAll(),this.notify()}resetDefaults(){this.setFontStyle("inter"),this.setFontSize(100),this.setLetterSpacing("normal")}applyAll(){const e=$[this.currentFontId]||$.inter,t=document.documentElement;t.style.setProperty("--font-system",e.fontFamily),t.style.setProperty("--base-font-size",`${13*(this.currentFontSize/100)}px`),t.style.fontSize=`${13*(this.currentFontSize/100)}px`,this.currentLetterSpacing==="tight"?t.style.setProperty("--letter-spacing-custom","-0.02em"):this.currentLetterSpacing==="wide"?t.style.setProperty("--letter-spacing-custom","0.04em"):t.style.setProperty("--letter-spacing-custom","normal")}}const C=new X;class _{constructor(e,t){this.wm=e,this.onWallpaperChange=t,this.isSpotlightOpen=!1,this.isControlCenterOpen=!1,this.isAppleMenuOpen=!1,this.isBatteryOpen=!1,this.isWifiOpen=!1}init(){this.startClock(),this.setupDropdowns(),this.setupPopovers(),this.setupQuickActions(),this.setupSpotlight(),this.setupControlCenter(),this.setupKeyboardShortcuts()}startClock(){const e=document.querySelector("#menu-clock"),t=()=>{if(!e)return;const i=new Date,a={weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0};e.textContent=i.toLocaleDateString("en-US",a).replace(",","")};t(),setInterval(t,1e3)}setupDropdowns(){var i,a,n,s,r;const e=document.querySelector("#menu-apple-btn"),t=document.querySelector("#apple-dropdown-menu");e==null||e.addEventListener("click",l=>{l.stopPropagation(),this.closeAllMenus(),this.isAppleMenuOpen=!this.isAppleMenuOpen,t==null||t.classList.toggle("is-visible",this.isAppleMenuOpen)}),(i=document.querySelector("#menu-about-mac"))==null||i.addEventListener("click",()=>{this.wm.openWindow("settings"),this.closeAllMenus()}),(a=document.querySelector("#menu-sys-settings"))==null||a.addEventListener("click",()=>{this.wm.openWindow("settings"),this.closeAllMenus()}),(n=document.querySelector("#menu-app-store"))==null||n.addEventListener("click",()=>{this.wm.openWindow("projects"),this.closeAllMenus()}),(s=document.querySelector("#menu-sleep"))==null||s.addEventListener("click",()=>{this.triggerSleepOverlay(),this.closeAllMenus()}),(r=document.querySelector("#menu-restart"))==null||r.addEventListener("click",()=>{location.reload()}),document.addEventListener("click",l=>{var c;if(!l.target.closest("#apple-dropdown-menu")&&!l.target.closest("#menu-apple-btn")&&(t==null||t.classList.remove("is-visible"),this.isAppleMenuOpen=!1),!l.target.closest("#control-center-panel")&&!l.target.closest("#menu-control-center-btn")&&((c=document.querySelector("#control-center-panel"))==null||c.classList.remove("is-visible"),this.isControlCenterOpen=!1),!l.target.closest("#battery-popover")&&!l.target.closest("#menu-battery-btn")){const d=document.querySelector("#battery-popover");d&&(d.style.display="none"),this.isBatteryOpen=!1}if(!l.target.closest("#wifi-popover")&&!l.target.closest("#menu-wifi-btn")){const d=document.querySelector("#wifi-popover");d&&(d.style.display="none"),this.isWifiOpen=!1}})}setupQuickActions(){var e,t,i,a,n,s;(e=document.querySelector("#menu-active-app-name"))==null||e.addEventListener("click",()=>{this.wm.openWindow("settings")}),(t=document.querySelector("#menu-btn-quick-resume"))==null||t.addEventListener("click",()=>{this.wm.openWindow("resume")}),(i=document.querySelector("#menu-btn-quick-projects"))==null||i.addEventListener("click",()=>{this.wm.openWindow("projects")}),(a=document.querySelector("#menu-btn-quick-ai"))==null||a.addEventListener("click",()=>{this.wm.openWindow("siri")}),(n=document.querySelector("#menu-btn-quick-terminal"))==null||n.addEventListener("click",()=>{this.wm.openWindow("terminal")}),(s=document.querySelector("#menu-btn-quick-contact"))==null||s.addEventListener("click",()=>{this.wm.openWindow("mail")})}setupPopovers(){var n;const e=document.querySelector("#menu-battery-btn"),t=document.querySelector("#battery-popover");e==null||e.addEventListener("click",s=>{s.stopPropagation(),this.closeAllMenus(),this.isBatteryOpen=!this.isBatteryOpen,t&&(t.style.display=this.isBatteryOpen?"flex":"none")});const i=document.querySelector("#menu-wifi-btn"),a=document.querySelector("#wifi-popover");i==null||i.addEventListener("click",s=>{s.stopPropagation(),this.closeAllMenus(),this.isWifiOpen=!this.isWifiOpen,a&&(a.style.display=this.isWifiOpen?"flex":"none")}),(n=document.querySelector("#btn-open-network-settings"))==null||n.addEventListener("click",()=>{this.closeAllMenus(),this.wm.openWindow("social")})}setupControlCenter(){const e=document.querySelector("#menu-control-center-btn"),t=document.querySelector("#control-center-panel");e==null||e.addEventListener("click",s=>{s.stopPropagation(),this.closeAllMenus(),this.isControlCenterOpen=!this.isControlCenterOpen,t==null||t.classList.toggle("is-visible",this.isControlCenterOpen)});const i=document.querySelector("#cc-dark-mode-toggle");i==null||i.addEventListener("click",()=>{document.body.classList.toggle("light-mode"),i.classList.toggle("active")});const a=document.querySelector("#cc-focus-toggle");a==null||a.addEventListener("click",()=>{a.classList.toggle("active"),a.classList.contains("active")?(document.body.classList.add("placement-focus-mode"),this.showNotification("Placement Focus Active","Prioritizing candidate CGPA (8.73), VLSI & recent projects.")):document.body.classList.remove("placement-focus-mode")});const n=document.querySelector("#cc-brightness-slider");n==null||n.addEventListener("input",s=>{const r=s.target.value;document.documentElement.style.filter=`brightness(${r}%)`}),this.setupControlCenterTypography()}setupControlCenterTypography(){var l;const e=document.querySelector("#cc-font-size-slider"),t=document.querySelector("#cc-font-size-val"),i=document.querySelector("#btn-font-decrease"),a=document.querySelector("#btn-font-increase"),n=document.querySelector("#btn-font-reset"),s=document.querySelectorAll(".cc-font-pill"),r=c=>{t&&(t.textContent=`${c}%`),e&&(e.value=c)};r(C.currentFontSize),s.forEach(c=>{c.classList.toggle("active",c.getAttribute("data-font")===C.currentFontId),c.addEventListener("click",()=>{const d=c.getAttribute("data-font");C.setFontStyle(d),s.forEach(p=>p.classList.remove("active")),c.classList.add("active")})}),e==null||e.addEventListener("input",c=>{const d=parseInt(c.target.value,10);C.setFontSize(d),t&&(t.textContent=`${d}%`)}),i==null||i.addEventListener("click",()=>{C.decreaseFontSize(5),r(C.currentFontSize)}),a==null||a.addEventListener("click",()=>{C.increaseFontSize(5),r(C.currentFontSize)}),n==null||n.addEventListener("click",()=>{C.setFontSize(100),r(100)}),(l=document.querySelector("#ctx-change-typography"))==null||l.addEventListener("click",()=>{this.wm.openWindow("settings");const c=document.querySelector('.settings-nav-item[data-section="typography"]');c==null||c.click()})}setupSpotlight(){const e=document.querySelector("#menu-spotlight-btn"),t=document.querySelector("#spotlight-overlay"),i=document.querySelector("#spotlight-search-input"),a=document.querySelector("#spotlight-results-list"),n=()=>{this.isSpotlightOpen=!this.isSpotlightOpen,t.style.display=this.isSpotlightOpen?"flex":"none",this.isSpotlightOpen&&(i.value="",this.renderSpotlightResults("",a),setTimeout(()=>i.focus(),50))};e==null||e.addEventListener("click",s=>{s.stopPropagation(),n()}),t==null||t.addEventListener("click",s=>{s.target===t&&n()}),i==null||i.addEventListener("input",s=>{this.renderSpotlightResults(s.target.value,a)}),i==null||i.addEventListener("keydown",s=>{if(s.key==="Escape")n();else if(s.key==="Enter"){const r=a.querySelector(".spotlight-item");r&&r.click()}})}renderSpotlightResults(e,t){var r;const i=e.trim().toLowerCase(),a=[{type:"app",title:"Resume (Preview PDF)",sub:"View or download resume",id:"resume",icon:"📄"},{type:"app",title:"Projects (App Store)",sub:`${o.projects.length} engineering projects (FinTech, real-time, hardware & DFIR)`,id:"projects",icon:"🛍️"},{type:"app",title:"Placement Resume Assistant",sub:"Interactive semantic resume & project intelligence",id:"siri",icon:"🤖"},{type:"detail",title:"Technical Skills Matrix",sub:"AI/ML (XGBoost), Cloud DLP, DFIR, Embedded, WebSockets & VLSI",id:"settings",icon:"💻"},{type:"app",title:"Terminal (zsh)",sub:"Interactive command-line interface",id:"terminal",icon:"💻"},{type:"app",title:"Social & Activity Hub",sub:"Live GitHub commits & LinkedIn posts",id:"social",icon:"⚡"},{type:"app",title:"System Settings",sub:"Academic CGPA, hardware stack, wallpapers",id:"settings",icon:"⚙️"},{type:"app",title:"Safari Browser",sub:"Web demos & publications",id:"safari",icon:"🌐"},{type:"detail",title:"32-Bit Pipelined MIPS Processor",sub:"Verilog HDL 5-stage RISC core, hazard forwarding & Vivado Artix-7 FPGA (Oct 2026)",id:"projects",icon:"💻"},{type:"detail",title:"Neural Image Caption Studio",sub:"Deep Learning PyTorch CNN + LSTM language decoder with Beam Search (Oct 2026)",id:"projects",icon:"🧠"},{type:"detail",title:"ReturnGuard AI — Multimodal Returns Agent",sub:"Autonomous ReAct framework, Gemini Vision defect inspection (Oct 2026)",id:"projects",icon:"🤖"},{type:"detail",title:"PlateVision — Automated License Plate Recognition",sub:"OpenCV 8-stage image pipeline & multi-PSM Tesseract OCR (Oct 2026)",id:"projects",icon:"🚗"},{type:"detail",title:"FraudGuard.AI — Fraud Detection",sub:"Real-time XGBoost ensemble, sub-2.8ms scoring & Explainable AI (Sep 2026)",id:"projects",icon:"💳"},{type:"detail",title:"Cloud DLP Shield — Data Leak Prevention",sub:"Dual-engine SQLi detection, Luhn validation & AESX encryption (Sep 2026)",id:"projects",icon:"🔒"},{type:"detail",title:"SplitFlow — Expense Splitter",sub:"OCR receipt scanner, greedy debt graph & live FX rates (Sep 2026)",id:"projects",icon:"⚡"},{type:"detail",title:"PulseFlow Agile Platform",sub:"Real-time WebSockets, D3.js burndown & AI Copilot (Sep 2026)",id:"projects",icon:"📊"},{type:"detail",title:"CGPA: 8.73 in B.Tech ECE",sub:"Institute of Engineering & Management, Kolkata",id:"resume",icon:"🎓"},{type:"detail",title:"VLSI Design Internship",sub:"Jadavpur University — IC design flow & EDA bare-metal",id:"settings",icon:"⚡"},{type:"detail",title:"Vocational Trainee",sub:"Steel Authority of India Limited (SAIL) — Plant automation",id:"settings",icon:"🏭"},{type:"detail",title:"IEEE IEMENTECH 2026 Publication",sub:"Piezoelectric energy harvesting wearable therapy (DOI)",id:"safari",icon:"📑"},{type:"detail",title:"BitTrace DFIR Bitcoin Forensic Tool",sub:"Live volatile RAM triage, registry hives & ISO/IEC 27037 (Sep 2026)",id:"projects",icon:"🛡️"},{type:"detail",title:"Embedded Night-Vision System",sub:"Active IR + Thermal sensors with YOLOv2 (Sep 2026)",id:"projects",icon:"🌙"},{type:"detail",title:"Logistics Management System",sub:"Python & Django multi-dealer supply chain (Sep 2026)",id:"projects",icon:"📦"}],n=i?a.filter(l=>l.title.toLowerCase().includes(i)||l.sub.toLowerCase().includes(i)):a.slice(0,7);if(n.length===0){t.innerHTML=`
        <div class="spotlight-no-results">
          <p>No matches found for "<strong>${this.escape(i)}</strong>".</p>
          <button class="spotlight-ask-ai" id="btn-spotlight-ask-ai">
            <span>Ask Siri / Gemini AI instead &rarr;</span>
          </button>
        </div>
      `,(r=t.querySelector("#btn-spotlight-ask-ai"))==null||r.addEventListener("click",()=>{var c;document.querySelector("#spotlight-overlay").style.display="none",this.isSpotlightOpen=!1,this.wm.openWindow("siri");const l=document.querySelector("#ai-query-input");l&&(l.value=e,(c=document.querySelector("#ai-chat-form"))==null||c.dispatchEvent(new Event("submit")))});return}t.innerHTML=n.map(l=>`
      <div class="spotlight-item" data-app-id="${l.id}">
        <span class="spotlight-icon">${l.icon}</span>
        <div class="spotlight-text">
          <span class="spotlight-name">${l.title}</span>
          <span class="spotlight-sub">${l.sub}</span>
        </div>
        <span class="spotlight-enter-hint">↵ Open</span>
      </div>
    `).join(""),t.querySelectorAll(".spotlight-item").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-app-id");document.querySelector("#spotlight-overlay").style.display="none",this.isSpotlightOpen=!1,this.wm.openWindow(c)})})}setupKeyboardShortcuts(){window.addEventListener("keydown",e=>{var t;(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"&&(e.preventDefault(),(t=document.querySelector("#menu-spotlight-btn"))==null||t.click())})}closeAllMenus(){var i,a;(i=document.querySelector("#apple-dropdown-menu"))==null||i.classList.remove("is-visible"),(a=document.querySelector("#control-center-panel"))==null||a.classList.remove("is-visible");const e=document.querySelector("#battery-popover");e&&(e.style.display="none");const t=document.querySelector("#wifi-popover");t&&(t.style.display="none"),this.isAppleMenuOpen=!1,this.isControlCenterOpen=!1,this.isBatteryOpen=!1,this.isWifiOpen=!1}triggerSleepOverlay(){const e=document.querySelector("#lock-screen-overlay");e&&(e.style.display="flex",e.addEventListener("click",()=>{e.style.display="none"},{once:!0}))}showNotification(e,t){const i=document.querySelector("#notification-tray");if(!i)return;const a=document.createElement("div");a.className="macos-notification",a.innerHTML=`
      <div class="notif-header">
        <span class="notif-app"> Placement Assistant</span>
        <span class="notif-time">now</span>
      </div>
      <div class="notif-body">
        <strong>${e}</strong>
        <p>${t}</p>
      </div>
    `,i.appendChild(a),setTimeout(()=>{a.classList.add("hide"),setTimeout(()=>a.remove(),400)},4e3)}escape(e){return e.replace(/[&<>'"]/g,"")}}class K{constructor(e){this.wm=e,this.currentWallpaper="sequoia"}init(){this.setupDesktopIcons(),this.setupContextMenu(),this.setWallpaper(this.currentWallpaper)}setupDesktopIcons(){var t;const e=document.querySelectorAll(".desktop-icon");e.forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation(),e.forEach(s=>s.classList.remove("is-selected")),i.classList.add("is-selected")}),i.addEventListener("dblclick",n=>{n.stopPropagation();const s=i.getAttribute("data-app");s&&this.wm.openWindow(s)});let a=0;i.addEventListener("touchend",n=>{const s=new Date().getTime(),r=s-a;if(r<500&&r>0){const l=i.getAttribute("data-app");l&&this.wm.openWindow(l),n.preventDefault()}a=s})}),(t=document.querySelector("#desktop"))==null||t.addEventListener("click",i=>{(i.target.id==="desktop"||i.target.classList.contains("desktop-wallpaper"))&&e.forEach(a=>a.classList.remove("is-selected"))})}setupContextMenu(){var i,a,n,s,r,l,c;const e=document.querySelector("#desktop-context-menu"),t=document.querySelector("#desktop");!e||!t||(t.addEventListener("contextmenu",d=>{if(d.target.closest(".macos-window")||d.target.closest("input")||d.target.closest("textarea"))return;d.preventDefault();const p=Math.min(window.innerWidth-220,d.clientX),u=Math.min(window.innerHeight-260,d.clientY);e.style.left=`${p}px`,e.style.top=`${u}px`,e.classList.add("is-visible")}),document.addEventListener("click",()=>{e.classList.remove("is-visible")}),(i=document.querySelector("#ctx-open-resume"))==null||i.addEventListener("click",()=>{this.wm.openWindow("resume")}),(a=document.querySelector("#ctx-open-projects"))==null||a.addEventListener("click",()=>{this.wm.openWindow("projects")}),(n=document.querySelector("#ctx-open-ai"))==null||n.addEventListener("click",()=>{this.wm.openWindow("siri")}),(s=document.querySelector("#ctx-open-terminal"))==null||s.addEventListener("click",()=>{this.wm.openWindow("terminal")}),(r=document.querySelector("#ctx-change-typography"))==null||r.addEventListener("click",()=>{this.wm.openWindow("settings"),setTimeout(()=>{const d=document.querySelector('.settings-nav-item[data-section="typography"]');d==null||d.click()},50)}),(l=document.querySelector("#ctx-change-wallpaper"))==null||l.addEventListener("click",()=>{this.wm.openWindow("settings"),setTimeout(()=>{const d=document.querySelector('.settings-nav-item[data-section="wallpaper"]');d==null||d.click()},50)}),(c=document.querySelector("#ctx-get-info"))==null||c.addEventListener("click",()=>{this.wm.openWindow("settings")}))}setWallpaper(e){this.currentWallpaper=e;const t=document.querySelector("#desktop-wallpaper");t&&(t.className="desktop-wallpaper wp-"+e,e==="sequoia"?(t.style.backgroundImage="url('/wallpapers/sequoia.jpg')",t.style.backgroundSize="cover",t.style.backgroundPosition="center"):e==="sonoma"?(t.style.backgroundImage="url('/wallpapers/sonoma.jpg')",t.style.backgroundSize="cover",t.style.backgroundPosition="center"):e==="cyberpunk"?t.style.backgroundImage="radial-gradient(circle at top right, #11e8bb 0%, #0d1117 70%)":e==="monterey"?t.style.backgroundImage="linear-gradient(135deg, #7928ca 0%, #ff0080 50%, #ff4d4d 100%)":e==="space"&&(t.style.backgroundImage="radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)"))}}class Q{constructor(e="ambient-3d-canvas"){this.canvas=document.getElementById(e),this.canvas&&(this.ctx=this.canvas.getContext("2d"),this.particles=[],this.numParticles=45,this.mouseX=0,this.mouseY=0,this.targetMouseX=0,this.targetMouseY=0,this.fov=300,this.isRunning=!0,this.init())}init(){this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("mousemove",e=>{this.targetMouseX=(e.clientX-window.innerWidth/2)*.4,this.targetMouseY=(e.clientY-window.innerHeight/2)*.4});for(let e=0;e<this.numParticles;e++)this.particles.push({x:(Math.random()-.5)*window.innerWidth*1.5,y:(Math.random()-.5)*window.innerHeight*1.5,z:Math.random()*600-300,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,vz:(Math.random()-.5)*.8,radius:Math.random()*2.5+1.2,hue:Math.random()>.5?210:280});this.animate()}resize(){this.canvas&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight)}animate(){if(!this.isRunning||!this.ctx)return;this.mouseX+=(this.targetMouseX-this.mouseX)*.05,this.mouseY+=(this.targetMouseY-this.mouseY)*.05,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);const e=this.canvas.width/2,t=this.canvas.height/2,i=[];for(let a of this.particles){a.x+=a.vx,a.y+=a.vy,a.z+=a.vz,a.x<-window.innerWidth&&(a.x=window.innerWidth),a.x>window.innerWidth&&(a.x=-window.innerWidth),a.y<-window.innerHeight&&(a.y=window.innerHeight),a.y>window.innerHeight&&(a.y=-window.innerHeight),a.z<-300&&(a.z=300),a.z>300&&(a.z=-300);const n=a.x-this.mouseX,s=a.y-this.mouseY,r=a.z+500,l=this.fov/r,c=e+n*l,d=t+s*l,p=Math.max(.08,Math.min(.65,(600-a.z)/600));i.push({x:c,y:d,scale:l,alpha:p,radius:a.radius*l,hue:a.hue})}this.ctx.lineWidth=.8;for(let a=0;a<i.length;a++)for(let n=a+1;n<i.length;n++){const s=i[a],r=i[n],l=s.x-r.x,c=s.y-r.y,d=Math.sqrt(l*l+c*c);if(d<130){const p=(1-d/130)*.18*Math.min(s.alpha,r.alpha);this.ctx.strokeStyle=`hsla(210, 85%, 65%, ${p})`,this.ctx.beginPath(),this.ctx.moveTo(s.x,s.y),this.ctx.lineTo(r.x,r.y),this.ctx.stroke()}}for(let a of i)this.ctx.fillStyle=`hsla(${a.hue}, 90%, 65%, ${a.alpha})`,this.ctx.shadowBlur=8,this.ctx.shadowColor=`hsla(${a.hue}, 90%, 65%, 0.6)`,this.ctx.beginPath(),this.ctx.arc(a.x,a.y,Math.max(.5,a.radius),0,Math.PI*2),this.ctx.fill(),this.ctx.shadowBlur=0;requestAnimationFrame(()=>this.animate())}}class x{static attach(e,t={}){const i=t.maxTilt||12,a=t.perspective||1e3,n=t.scale||1.03,s=t.glare!==!1;e.forEach(r=>{if(!r||r.dataset.tiltAttached)return;r.dataset.tiltAttached="true";let l=null;s&&!r.querySelector(".tilt-glare")?(l=document.createElement("div"),l.className="tilt-glare",r.style.position=r.style.position||"relative",r.style.overflow="hidden",r.appendChild(l)):l=r.querySelector(".tilt-glare"),r.style.transformStyle="preserve-3d",r.style.transition="transform 0.15s ease-out";let c=null;const d=()=>{c=r.getBoundingClientRect(),r.style.transition="none"},p=h=>{c||(c=r.getBoundingClientRect());const g=h.clientX-c.left,v=h.clientY-c.top,b=g/c.width*2-1,A=-(v/c.height*2-1)*i,E=b*i;if(r.style.transform=`perspective(${a}px) rotateX(${A.toFixed(2)}deg) rotateY(${E.toFixed(2)}deg) scale3d(${n}, ${n}, ${n})`,l){const L=(g/c.width*100).toFixed(1),D=(v/c.height*100).toFixed(1);l.style.opacity="1",l.style.background=`radial-gradient(circle at ${L}% ${D}%, rgba(255,255,255,0.25) 0%, transparent 65%)`}},u=()=>{r.style.transition="transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",r.style.transform=`perspective(${a}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,l&&(l.style.opacity="0"),c=null};r.addEventListener("mouseenter",d),r.addEventListener("mousemove",p),r.addEventListener("mouseleave",u)})}}class Y{constructor(){this.customApiKey=typeof localStorage<"u"&&localStorage.getItem("abhishek_portfolio_gemini_key")||"",this.systemContext=this.buildSystemPrompt()}setApiKey(e){this.customApiKey=e.trim(),typeof localStorage<"u"&&(this.customApiKey?localStorage.setItem("abhishek_portfolio_gemini_key",this.customApiKey):localStorage.removeItem("abhishek_portfolio_gemini_key"))}hasCustomKey(){return!!this.customApiKey}buildSystemPrompt(){return`You are the "Placement Resume Assistant" for Abhishek Kumar, an articulate, technically authoritative representative of Abhishek Kumar — B.Tech Electronics and Communication Engineering (ECE) candidate (Class of 2027) at Institute of Engineering & Management (IEM), Kolkata.

Your mission is to assist recruiters, engineering leads, and hiring managers by delivering concise, accurate, and persuasive technical details regarding Abhishek's engineering projects, academic credentials, research publications, industrial internships, and core skill stack.

Candidate Profile & Credentials:
- Name: Abhishek Kumar | Email: ${o.personal.email} | Phone: ${o.personal.phone}
- LinkedIn: ${o.personal.linkedin} | GitHub: ${o.personal.github} | Portfolio: ${o.personal.portfolio}
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

Always answer accurately, concisely, and with concrete technical proof from his repositories and credentials.`}async ask(e){const t=e.trim();if(!t)return"Please enter a question about Abhishek's skills, projects, or background.";if(this.customApiKey)try{const i=await this.callGeminiAPI(t);if(i)return i}catch(i){console.warn("Live Gemini API call failed, falling back to local semantic intelligence:",i)}return this.localSemanticSearch(t)}async query(e){return this.ask(e)}async callGeminiAPI(e){var n,s,r,l,c,d;const t=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.customApiKey}`,i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:`${this.systemContext}

User Question: ${e}

Answer concisely in 2-4 sentences with markdown formatting:`}]}],generationConfig:{temperature:.2,maxOutputTokens:350}})});if(!i.ok){const p=await i.json().catch(()=>({}));throw new Error(((n=p.error)==null?void 0:n.message)||`HTTP ${i.status}`)}return(d=(c=(l=(r=(s=(await i.json()).candidates)==null?void 0:s[0])==null?void 0:r.content)==null?void 0:l.parts)==null?void 0:c[0])==null?void 0:d.text}localSemanticSearch(e){const t=e.toLowerCase();let i=null,a=0;for(const n of o.qaKnowledgeBase){let s=0;for(const r of n.keywords)t.includes(r)&&(s+=1);s>a&&(a=s,i=n.answer)}return a>=1?i:t.includes("who")||t.includes("abhishek")||t.includes("intro")||t.includes("about")?`**${o.personal.name}** is a **B.Tech ECE 4th year candidate** (Class of 2027) at **Institute of Engineering & Management (IEM), Kolkata** with an **8.73 CGPA**.

He combines deep bare-metal hardware/VLSI and processor architecture foundations (**32-bit Pipelined MIPS Core in Verilog HDL & Vivado FPGA**) with state-of-the-art software engineering across **Deep Learning & Multimodal AI (Neural Image Caption Studio, ReturnGuard ReAct Agent)**, **Cyber Defense (FraudGuard.AI, Cloud DLP Shield)**, **Computer Vision (PlateVision ALPR)**, and **Digital Forensics (BitTrace DFIR)**. He is a published first author with IEEE (IEMENTECH 2026) and completed internships at **Jadavpur University** and **SAIL**.`:t.includes("project")||t.includes("work")||t.includes("portfolio")||t.includes("build")||t.includes("repo")?`Abhishek has engineered 18+ production projects across processor architecture, deep learning, cloud security, digital forensics, real-time systems, and embedded hardware:

• **32-Bit 5-Stage Pipelined MIPS Processor** (Oct 23, 2026): Custom Verilog RISC processor core with EX/MEM hardware forwarding, load-use hazard bubble unit, custom Python assembler, and Artix-7 Basys 3 FPGA synthesis in Vivado (94 mW, 0 DRC violations).
• **Neural Image Caption Studio** (Oct 17, 2026): Full-stack multimodal deep learning app combining CNN feature extractors (MobileNetV3/ResNet-50) with an autoregressive LSTM decoder, Beam Search, and token probability inspection.
• **ReturnGuard ReAct Agent** (Oct 17, 2026): Autonomous governed ReAct AI agent with multimodal computer vision defect inspection, anti-fraud rules, and Human-in-the-Loop triage.
• **PlateVision AI ALPR** (Oct 05, 2026): End-to-end 8-stage OpenCV license plate recognition pipeline with multi-PSM Tesseract OCR ensemble and FastAPI visualizer.
• **FraudGuard.AI** (Sep 30, 2026): Real-time credit card fraud detection in sub-2.8ms using an XGBoost ensemble, geo-velocity calculation, and Explainable AI (XAI).
• **Cloud DLP Shield** (Sep 30, 2026): Cloud Data Loss Prevention with AST SQLi interception, Luhn validation, AES-256-GCM authenticated field encryption, and live SSE SOC.
• **SplitFlow** (Sep 29, 2026): Smart group expense splitter featuring a greedy graph debt minimization engine, OCR receipt parsing, and UPI QR settlements.
• **PulseFlow Agile** (Sep 29, 2026): Collaborative agile workspace with bidirectional WebSockets, interactive D3.js sprint burndown telemetry, and AI Copilot.
• **BitTrace DFIR** (Sep 21, 2026): Automated live RAM and postmortem Bitcoin forensics tool for Windows compliant with ISO/IEC 27037.
• **Embedded Night-Vision System** (Sep 19, 2026): Active IR + thermal sensor fusion with quantized YOLOv2 for zero-lux pedestrian detection.
• **Logistics Management System** (Sep 18, 2026): Commercial multi-dealer supply chain and fleet tracking platform in Python and Django.
• **Piezoelectric Wearable Device**: Self-sustaining IoT healthcare wearable (Published in IEEE IEMENTECH 2026).
• **Camera-Assisted 7-State Traffic Controller**: Dynamic FSM in C synthesized on Xilinx Vivado reducing queue delays by 35%.
• **YourFinance & EverShop**: AI wealth management (Gemini AI API) and high-performance TypeScript/GraphQL eCommerce.`:t.includes("skill")||t.includes("tech stack")||t.includes("technolog")||t.includes("stack")||t.includes("language")||t.includes("tool")?`Abhishek's skills are directly anchored in his production projects:

• **Processor Design, VLSI & Digital Logic (96%)**: Verilog HDL, MIPS32 5-stage pipelining, hazard detection & EX/MEM forwarding, Xilinx Vivado (Artix-7 Basys 3 FPGA), custom Python cross-assemblers, timing analysis (*MIPS Processor Core, Vivado Traffic FSM, Jadavpur Univ*).
• **Deep Learning, Multimodal AI & Vision (95%)**: PyTorch, CNN + LSTM encoder-decoder, Beam Search decoding (alpha=0.7), Autonomous ReAct agents, 8-stage OpenCV ALPR, Tesseract OCR ensemble, cost-weighted XGBoost, Explainable AI (XAI / SHAP), YOLOv2 (*Caption Studio, ReturnGuard, PlateVision, FraudGuard.AI*).
• **Cloud Security & Digital Forensics (94%)**: Cloud DLP architecture, AST SQLi interception, AES-256-GCM zero-trust field encryption, Live volatile RAM triage, ISO/IEC 27037 evidence vault, Luhn validation (*Cloud DLP Shield, BitTrace DFIR*).
• **FinTech & Real-Time Distributed Systems (92%)**: Greedy graph debt minimization, bidirectional WebSockets, Server-Sent Events (SSE), D3.js sprint burndown analytics, OCR parsing, live FX APIs (*SplitFlow, PulseFlow Agile, Cloud DLP SOC*).
• **Embedded Systems, Microcontrollers & IoT (93%)**: ARM/AVR/ESP32, Embedded C, C/C++, SPI/I2C/UART/GPIO, Wokwi IoT simulator, IC fabrication flows, bare-metal EDA optimization (*IEEE Wearable, Traffic Controller*).
• **Languages & Full-Stack (91%)**: Python (FastAPI, Django), Verilog HDL, C/C++, JavaScript/TypeScript, Node.js, Express, React 18, Docker, SQL (PostgreSQL, SQLite), MATLAB, Git/GitHub, CI/CD, Agile/Jira.`:t.includes("intern")||t.includes("experience")||t.includes("company")||t.includes("work experience")?`Abhishek has completed two prestigious industrial internships:

1. **VLSI Design Intern @ Jadavpur University** (Dec 2025 – Jan 2026): Researched IC design and fabrication flows, evaluated time-critical bare-metal pipelines using EDA tools, and benchmarked gate-level delays.
2. **Vocational Trainee @ Steel Authority of India Limited (SAIL)** (May 2025 – June 2025): Developed and maintained real-time plant automation software modules, managed industrial telemetry databases, and worked on continuous process control.`:t.includes("education")||t.includes("college")||t.includes("school")||t.includes("iem")||t.includes("cgpa")||t.includes("academic")?`Abhishek's verified academic track record:

• **B.Tech in ECE**: Institute of Engineering & Management (IEM), Kolkata (2023–2027) — **CGPA: 8.73** (up to 6th semester, top percentile of the department)
• **Class 12 (CBSE - PCM + IP)**: M.G.M. Higher Secondary School, Bokaro (2023) — **86.5%**
• **Class 10 (CBSE)**: M.G.M. Higher Secondary School, Bokaro (2021) — **95.0%**`:t.includes("hire")||t.includes("placement")||t.includes("recruit")||t.includes("role")||t.includes("fit")?`**Top Reasons to Hire Abhishek Kumar:**

1. **Academic Excellence & Analytical Rigor**: 8.73 CGPA in B.Tech ECE with deep fundamentals in OOP, DSA, and Control Systems.
2. **Rare Hardware-Software Dual Mastery**: Seamlessly bridges bare-metal processor design & FPGA synthesis (MIPS 32-bit core in Verilog HDL) up to deep learning, autonomous ReAct agents, and high-throughput Python/FastAPI/Node.js/AI systems.
3. **Exceptional Project Track Record**: Engineered MIPS 32-Bit Processor (Vivado FPGA), Neural Image Caption Studio (PyTorch CNN+LSTM), ReturnGuard (ReAct agent), PlateVision ALPR (8-stage OpenCV), FraudGuard.AI (sub-2.8ms ML scoring), Cloud DLP Shield, SplitFlow, PulseFlow Agile, and BitTrace DFIR.
4. **Published IEEE Researcher**: First author of a peer-reviewed IEEE paper on wearable healthcare technology at IEMENTECH 2026.
5. **Industrial Experience**: Hands-on exposure at Jadavpur University (VLSI EDA) and SAIL (Plant Automation).
6. **Placement Readiness**: Ready for high-impact roles in Processor Design, Embedded Firmware, Machine Learning & Vision, Cybersecurity/DFIR, or Full-Stack Systems.`:t.includes("contact")||t.includes("email")||t.includes("phone")||t.includes("linkedin")||t.includes("portfolio")||t.includes("link")||t.includes("reach")?`Connect with Abhishek Kumar directly:

• **Live Portfolio**: [abhishek947kumar.github.io/portfolio](https://abhishek947kumar.github.io/portfolio/)
• **Email**: [abhishek1297kumar@gmail.com](mailto:abhishek1297kumar@gmail.com)
• **Phone / WhatsApp**: +91 9470303282
• **LinkedIn**: [linkedin.com/in/abhishek947kumar](https://www.linkedin.com/in/abhishek947kumar)
• **GitHub**: [github.com/abhishek947kumar](https://github.com/abhishek947kumar)
• **Locations**: Kolkata, West Bengal & Bokaro Steel City, Jharkhand`:`Abhishek Kumar is a B.Tech ECE candidate at IEM Kolkata (CGPA 8.73, Class of 2027) with an IEEE publication at IEMENTECH 2026, VLSI internship at Jadavpur University, industrial training at SAIL, and 18+ production projects in Processor Design & FPGA (MIPS 32-Bit Core in Verilog), Deep Learning & Vision (Neural Caption Studio, PlateVision ALPR), Autonomous Agents (ReturnGuard ReAct Agent), Cyber Defense (FraudGuard.AI, Cloud DLP Shield), and Real-Time Systems (SplitFlow, PulseFlow Agile, BitTrace DFIR).

Feel free to ask about his **CGPA (8.73)**, **internships**, **latest flagship projects (MIPS Processor, Caption Studio, ReturnGuard, PlateVision, FraudGuard.AI)**, **skills matrix**, **IEEE paper**, or **why you should hire him**!`}}const G=new Y;class J{constructor(e){this.canvas=document.getElementById(e),this.canvas&&(this.ctx=this.canvas.getContext("2d"),this.scrollProgress=0,this.targetProgress=0,this.rotX=.3,this.rotY=0,this.rotZ=0,this.zoom=1,this.width=0,this.height=0,this.particles=[],this.numParticles=50,this.init())}init(){this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("scroll",()=>this.onScroll(),{passive:!0});for(let e=0;e<this.numParticles;e++)this.particles.push({x:(Math.random()-.5)*600,y:(Math.random()-.5)*600,z:(Math.random()-.5)*600,speed:.2+Math.random()*.4,size:1+Math.random()*2,alpha:.2+Math.random()*.6});this.onScroll(),this.animate()}resize(){if(!this.canvas)return;const e=this.canvas.getBoundingClientRect(),t=Math.min(window.devicePixelRatio||1,2);this.width=e.width||window.innerWidth,this.height=e.height||600,this.canvas.width=this.width*t,this.canvas.height=this.height*t,this.ctx.scale(t,t)}onScroll(){const e=document.getElementById("cinematic-hero");if(!e){const n=document.documentElement.scrollHeight-window.innerHeight;this.targetProgress=n>0?window.scrollY/n:0;return}const t=e.getBoundingClientRect(),i=window.innerHeight*2,a=Math.max(0,Math.min(1,-t.top/i));this.targetProgress=a}animate(){this.scrollProgress+=(this.targetProgress-this.scrollProgress)*.08,this.rotY=this.scrollProgress*Math.PI*2.5+Date.now()*3e-4,this.rotX=.45+Math.sin(this.scrollProgress*Math.PI)*.35,this.rotZ=Math.sin(this.scrollProgress*Math.PI*2)*.2,this.zoom=1+this.scrollProgress*.6,this.render(),requestAnimationFrame(()=>this.animate())}project(e,t,i){let a=Math.cos(this.rotY),n=Math.sin(this.rotY),s=Math.cos(this.rotX),r=Math.sin(this.rotX),l=Math.cos(this.rotZ),c=Math.sin(this.rotZ),d=e*a+i*n,p=t,u=-e*n+i*a,h=d,g=p*s-u*r,v=p*r+u*s,b=h*l-g*c,k=h*c+g*l,A=v;const E=420*this.zoom,L=500+A,D=L>10?E/L:0;return{x:this.width/2+b*D,y:this.height/2+k*D,z:A,scale:D}}render(){const e=this.ctx;e.clearRect(0,0,this.width,this.height),this.particles.forEach(s=>{s.y-=s.speed,s.y<-300&&(s.y=300);const r=this.project(s.x,s.y,s.z);r.scale>0&&(e.beginPath(),e.arc(r.x,r.y,s.size*r.scale*.8,0,Math.PI*2),e.fillStyle=`rgba(100, 210, 255, ${s.alpha*.6})`,e.fill())});const t=130,i=12,a=this.scrollProgress*65;this.drawBox(0,20+a*.4,0,t+40,6,t+40,"#0a2318","#00ff88",.25),this.drawBox(0,8+a*.8,0,t+10,5,t+10,"#161922","#0070f3",.35),this.drawBox(0,-6-a*.2,0,t-20,i,t-20,"#1d2130","#64d2ff",.7),this.drawBox(0,-28-a*1.2,0,t-35,4,t-35,"#2e344a","#a855f7",.85);const n=18;for(let s=-t/2;s<=t/2;s+=n)this.drawPin(s,23+a*.4,-t/2-14),this.drawPin(s,23+a*.4,t/2+14),this.drawPin(-t/2-14,23+a*.4,s),this.drawPin(t/2+14,23+a*.4,s);this.drawCircuitTraces(a),this.drawHologramText(a)}drawBox(e,t,i,a,n,s,r,l,c){const d=this.ctx,p=a/2,u=n/2,h=s/2,g=[[-p,-u,-h],[p,-u,-h],[p,u,-h],[-p,u,-h],[-p,-u,h],[p,-u,h],[p,u,h],[-p,u,h]].map(([b,k,A])=>this.project(e+b,t+k,i+A));[{pts:[0,1,2,3],norm:[0,0,-1]},{pts:[5,4,7,6],norm:[0,0,1]},{pts:[4,0,3,7],norm:[-1,0,0]},{pts:[1,5,6,2],norm:[1,0,0]},{pts:[4,5,1,0],norm:[0,-1,0]},{pts:[3,2,6,7],norm:[0,1,0]}].forEach(b=>{d.beginPath();const k=g[b.pts[0]];d.moveTo(k.x,k.y);for(let A=1;A<b.pts.length;A++){const E=g[b.pts[A]];d.lineTo(E.x,E.y)}d.closePath(),d.fillStyle=r,d.globalAlpha=c,d.fill(),d.strokeStyle=l,d.lineWidth=1,d.stroke(),d.globalAlpha=1})}drawPin(e,t,i){const a=this.project(e,t,i),n=this.project(e,t+8,i);a.scale>0&&n.scale>0&&(this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y),this.ctx.lineTo(n.x,n.y),this.ctx.strokeStyle="#ffd700",this.ctx.lineWidth=2*a.scale,this.ctx.stroke())}drawCircuitTraces(e){const t=this.ctx;[[[-40,-6,-40],[0,-6,-20],[30,-6,-35]],[[-30,-6,20],[-10,-6,0],[40,-6,25]],[[0,-6,-40],[15,-6,0],[-25,-6,35]]].forEach((a,n)=>{t.beginPath();const s=["#00f2fe","#38ef7d","#ff007f"];t.strokeStyle=s[n%s.length],t.lineWidth=1.8,a.forEach(([r,l,c],d)=>{const p=this.project(r,l-e*.2,c);d===0?t.moveTo(p.x,p.y):t.lineTo(p.x,p.y)}),t.stroke()})}drawHologramText(e){const t=this.project(0,-45-e*1.5,0);if(t.scale<=0)return;const i=this.ctx;i.save(),i.font=`700 ${Math.max(10,13*t.scale)}px -apple-system, sans-serif`,i.fillStyle="#64d2ff",i.textAlign="center",i.fillText("ABHISHEK-CORE • ECE 2027",t.x,t.y),i.font=`500 ${Math.max(8,10*t.scale)}px -apple-system, sans-serif`,i.fillStyle="rgba(255, 255, 255, 0.7)",i.fillText("8.73 CGPA • VLSI & BARE-METAL EDA",t.x,t.y+14*t.scale),i.restore()}}class Z{constructor(e){this.modeSwitcher=e,this.scrollyCanvas=null,this.activeFilter="all"}render(){return`
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
            <span class="metric-num">18+</span>
            <span class="metric-title">Production & Embedded Projects</span>
            <span class="metric-desc">From 32-bit MIPS RISC core & PyTorch deep learning to real-time AI fraud detection & IoT architectures.</span>
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
              <h3 class="cine-profile-name">${o.personal.name}</h3>
              <div class="cine-profile-role">B.Tech ECE 4th Year Candidate • VLSI & Software</div>
              <p class="cine-profile-bio">
                ${o.personal.summary}
              </p>
              <div class="cine-social-links-row">
                <a href="${o.personal.portfolio}" target="_blank" class="cine-social-btn" title="Live Portfolio Website">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </a>
                <a href="${o.personal.linkedin}" target="_blank" class="cine-social-btn" title="LinkedIn">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="${o.personal.github}" target="_blank" class="cine-social-btn" title="GitHub">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="mailto:${o.personal.email}" class="cine-social-btn" title="Email">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            <div class="cine-skills-box">
              <h4>Domain Mastery & Technical Breadth</h4>
              <p>Evaluated through academic rigour, industrial internships, simulation environments, and physical deployments:</p>

              ${o.skills.domains.map(e=>`
                <div class="cine-skill-bar-item">
                  <div class="cine-skill-info">
                    <span>${e.name}</span>
                    <span style="color: var(--cine-cyan);">${e.level}%</span>
                  </div>
                  <div class="cine-bar-track">
                    <div class="cine-bar-fill" style="width: ${e.level}%;"></div>
                  </div>
                </div>
              `).join("")}

              <div class="cine-skills-categories-container">
                <div class="cine-skills-cat-title">Project-Validated Technical Proficiencies</div>
                ${o.skills.categories.map(e=>`
                  <div class="cine-skill-cat-block">
                    <div class="cine-skill-cat-head">
                      <span class="cine-cat-icon-name">${e.icon} <strong>${e.name}</strong></span>
                      <span class="cine-cat-context">${e.projectContext}</span>
                    </div>
                    <div class="cine-tags-cluster">
                      ${e.skills.map(t=>`<span class="cine-tech-pill">${t}</span>`).join("")}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </section>

        <!-- ================= FEATURED PROJECTS CASE STUDIES ================= -->
        <section class="cine-section" id="projects">
          <div class="cine-section-header">
            <span class="cine-section-pill">Portfolio Showcase</span>
            <h2 class="cine-section-title">Featured Engineering Projects</h2>
            <p class="cine-section-subtitle">Production systems spanning real-time AI fraud detection, cloud DLP security, FinTech settlement engines, digital forensics, computer vision, and bare-metal hardware.</p>
          </div>

          <div class="cine-filter-tabs">
            <button class="cine-filter-btn active" data-filter="all">All Projects</button>
            <button class="cine-filter-btn" data-filter="recent">🔥 Recent Releases (GitHub)</button>
            <button class="cine-filter-btn" data-filter="embedded">Embedded & VLSI</button>
            <button class="cine-filter-btn" data-filter="software">Software & AI</button>
          </div>

          <div class="cine-projects-grid" id="cine-projects-grid">
            ${this.renderProjectCards("all")}
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
                ${o.internships.map(e=>`
                  <div class="cine-timeline-item">
                    <div class="t-item-head">
                      <span class="t-role">${e.role}</span>
                      <span class="t-date">${e.duration}</span>
                    </div>
                    <div class="t-org">${e.organization} • ${e.location}</div>
                    <ul class="t-bullets">
                      ${e.points.map(t=>`<li>${t}</li>`).join("")}
                    </ul>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Academics Column -->
            <div class="cine-timeline-col">
              <h4>🎓 Academic Qualifications</h4>
              <div class="timeline-cards-wrap">
                ${o.education.map(e=>`
                  <div class="cine-timeline-item">
                    <div class="t-item-head">
                      <span class="t-role">${e.degree}</span>
                      <span class="t-date">${e.duration}</span>
                    </div>
                    <div class="t-org">${e.institution} • <strong>${e.score}</strong></div>
                    <ul class="t-bullets">
                      ${e.highlights.map(t=>`<li>${t}</li>`).join("")}
                    </ul>
                  </div>
                `).join("")}
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
            <h3 class="pub-title-big">"${o.publications[0].title}"</h3>
            <div class="pub-venue-line">${o.publications[0].venue}</div>
            <p class="pub-abstract-text">${o.publications[0].summary}</p>
            <div class="pub-actions-row">
              <a href="${o.publications[0].link}" target="_blank" class="btn-pub-doi">
                <span>View on IEEE Xplore Digital Library</span>
                <span>↗</span>
              </a>
              <span class="pub-author-tag">Authors: Abhishek Kumar et al. • DOI: ${o.publications[0].doi}</span>
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
              <button class="ai-suggest-chip" data-q="Tell me about the 32-bit pipelined MIPS processor project in Verilog">💻 MIPS 32-Bit Core (Verilog & Vivado)</button>
              <button class="ai-suggest-chip" data-q="Tell me about the Image Caption Generator project using PyTorch and LSTM">🧠 Caption Studio (PyTorch CNN-LSTM)</button>
              <button class="ai-suggest-chip" data-q="Tell me about the Return-Guard autonomous AI returns agent">🤖 ReturnGuard (ReAct & Vision Agent)</button>
              <button class="ai-suggest-chip" data-q="Tell me about the license plate recognition project">🚗 PlateVision ALPR (OpenCV & OCR)</button>
              <button class="ai-suggest-chip" data-q="Tell me about FraudGuard.AI credit card fraud detection">💳 FraudGuard.AI (Sub-2.8ms Fraud AI)</button>
              <button class="ai-suggest-chip" data-q="Explain Cloud DLP Shield and AST SQLi interception">🔒 Cloud DLP Shield (SQLi & AESX)</button>
              <button class="ai-suggest-chip" data-q="Why should we hire Abhishek for our engineering team?">⭐ Why Hire Abhishek?</button>
              <button class="ai-suggest-chip" data-q="What is his CGPA and college track record?">🎓 CGPA (8.73) & Internships</button>
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
                  <strong>${o.personal.email}</strong>
                </div>
              </div>

              <div class="contact-meta-row">
                <div class="contact-meta-icon">📱</div>
                <div>
                  <div style="font-size: 11px; color: var(--cine-text-muted);">Phone / WhatsApp</div>
                  <strong>${o.personal.phone}</strong>
                </div>
              </div>

              <div class="contact-meta-row">
                <div class="contact-meta-icon">📍</div>
                <div>
                  <div style="font-size: 11px; color: var(--cine-text-muted);">Primary Locations</div>
                  <strong>${o.personal.location}</strong>
                </div>
              </div>

              <div style="margin-top: 24px; display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="${o.personal.portfolio}" target="_blank" class="btn-cine-primary" style="font-size: 13px;">
                  🌐 Live Portfolio ↗
                </a>
                <a href="${o.personal.linkedin}" target="_blank" class="btn-cine-secondary" style="font-size: 13px;">
                  Connect on LinkedIn ↗
                </a>
                <a href="${o.personal.github}" target="_blank" class="btn-cine-secondary" style="font-size: 13px;">
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
    `}renderProjectCards(e){let t=o.projects;return e==="recent"?t=t.filter(i=>i.createdPeriod==="Last 6 Months"||i.createdPeriod==="Last 1 Week"||i.badge.includes("Recent")||i.badge.includes("Latest")):e==="embedded"?t=t.filter(i=>i.tags.some(a=>["Embedded Systems","VLSI","Verilog HDL","MIPS Architecture","FPGA","Xilinx Vivado","IoT","Wokwi","Hardware","Thermal IR","YOLOv2","Finite State Machines"].includes(a))||i.title.toLowerCase().includes("embedded")||i.title.toLowerCase().includes("mips")||i.title.toLowerCase().includes("traffic")):e==="software"&&(t=t.filter(i=>i.tags.some(a=>["JavaScript","TypeScript","Python","FastAPI","PyTorch","Computer Vision","Deep Learning","Autonomous Agents","ReAct Framework","OpenCV","Tesseract OCR","Django","REST APIs","Enterprise Architecture","AI","Digital Forensics","Cryptography","WebSockets","D3.js","FinTech","OCR Scanner","Debt Simplification","Machine Learning","Explainable AI","Cloud Security","Data Loss Prevention","AES-256-GCM","SQL Injection","XGBoost"].includes(a)))),t.map(i=>{const a=i.createdPeriod==="Last 6 Months"||i.createdPeriod==="Last 1 Week"||i.badge.includes("Latest")||i.badge.includes("Recent");return`
      <div class="cine-project-card ${a?"is-hot":""}">
        <div class="cine-project-top">
          <span class="${a?"cine-tag-hot":"cine-tag-normal"}">
            ${i.badge}
          </span>
          <span class="cine-project-period">${i.createdPeriod}</span>
        </div>

        <h3 class="cine-project-title">${i.title}</h3>
        <div class="cine-project-sub">${i.subtitle}</div>
        <p class="cine-project-desc">${i.description}</p>

        <div class="cine-project-techs">
          ${i.tags.map(n=>`<span class="tech-chip">${n}</span>`).join("")}
        </div>

        <div class="cine-project-actions">
          <a href="${i.githubUrl}" target="_blank" class="btn-card-inspect">
            Explore GitHub Repo ↗
          </a>
          <a href="${i.githubUrl}" target="_blank" class="btn-card-github" title="View Source">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    `}).join("")}initListeners(e){try{this.scrollyCanvas=new J("scrolly-canvas")}catch(m){console.warn("ScrollyCanvas init note:",m)}x.attach(e.querySelectorAll(".cine-project-card"),{maxTilt:8,scale:1.02,glare:!0}),x.attach(e.querySelectorAll(".metric-stat-card"),{maxTilt:6,scale:1.03});const t=e.querySelector("#cine-nav-track"),i=e.querySelector("#cine-nav-slider"),a=e.querySelectorAll(".cine-nav-link"),n=m=>{if(!m||!i||!t)return;const f=t.getBoundingClientRect(),y=m.getBoundingClientRect();if(y.width===0||y.height===0)return;const w=y.left-f.left+(t.scrollLeft||0),M=y.top-f.top+(t.scrollTop||0);i.style.width=`${y.width}px`,i.style.height=`${y.height}px`,i.style.transform=`translate3d(${w}px, ${M}px, 0)`,i.style.opacity="1"},s=["hero","about","projects","experience","research","ai-assistant","contact"];let r=!1,l=null;const c=()=>{if(r)return;const m=Math.min(260,window.innerHeight*.35);let f=s[0];const y=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,document.documentElement.offsetHeight,document.body.offsetHeight),w=window.scrollY||window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;if((window.innerHeight||document.documentElement.clientHeight||800)+w>=y-80)f=s[s.length-1];else for(const B of s){const R=document.getElementById(B);R&&R.getBoundingClientRect().top<=m&&(f=B)}const T=e.querySelector(`.cine-nav-link[data-section="${f}"]`);T&&!T.classList.contains("active")&&(a.forEach(B=>B.classList.remove("active")),T.classList.add("active"),n(T));const O=e.querySelector(`.cine-mobile-nav-link[data-section="${f}"]`);O&&!O.classList.contains("active")&&(e.querySelectorAll(".cine-mobile-nav-link").forEach(B=>B.classList.remove("active")),O.classList.add("active"))};window.addEventListener("scroll",c,{passive:!0}),document.addEventListener("scroll",c,{passive:!0}),document.body.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",()=>{const m=e.querySelector(".cine-nav-link.active")||a[0];n(m)}),window.addEventListener("hashchange",()=>{setTimeout(c,60)});const d=()=>{const m=window.location.hash?window.location.hash.replace("#",""):null;let f=m?e.querySelector(`.cine-nav-link[data-section="${m}"]`):null;f||(f=e.querySelector(".cine-nav-link.active")||a[0]),f&&(a.forEach(y=>y.classList.remove("active")),f.classList.add("active"),n(f))};d(),setTimeout(d,100),setTimeout(d,350),setTimeout(c,400),a.forEach(m=>{m.addEventListener("click",f=>{f.preventDefault();const y=m.getAttribute("href").replace("#",""),w=document.getElementById(y);w&&(r=!0,a.forEach(M=>M.classList.remove("active")),m.classList.add("active"),n(m),w.scrollIntoView({behavior:"smooth"}),history.pushState&&history.pushState(null,"",`#${y}`),clearTimeout(l),l=setTimeout(()=>{r=!1,c()},850))})}),e.querySelectorAll('a[href^="#"]').forEach(m=>{m.classList.contains("cine-nav-link")||m.classList.contains("cine-mobile-nav-link")||m.addEventListener("click",f=>{const y=m.getAttribute("href").replace("#",""),w=document.getElementById(y);if(w&&s.includes(y)){f.preventDefault(),r=!0;const M=e.querySelector(`.cine-nav-link[data-section="${y}"]`);M&&(a.forEach(T=>T.classList.remove("active")),M.classList.add("active"),n(M)),w.scrollIntoView({behavior:"smooth"}),history.pushState&&history.pushState(null,"",`#${y}`),clearTimeout(l),l=setTimeout(()=>{r=!1,c()},850)}})});const u=e.querySelector("#cine-mobile-toggle"),h=e.querySelector("#cine-mobile-drawer"),g=e.querySelectorAll(".cine-mobile-nav-link"),v=(m=!1)=>{!h||!u||(m||h.classList.contains("open")?(h.classList.remove("open"),u.classList.remove("open")):(h.classList.add("open"),u.classList.add("open")))};u==null||u.addEventListener("click",m=>{m.stopPropagation(),v()}),g.forEach(m=>{m.addEventListener("click",f=>{f.preventDefault();const y=m.getAttribute("href").replace("#",""),w=document.getElementById(y);if(v(!0),w){r=!0,g.forEach(T=>T.classList.remove("active")),m.classList.add("active");const M=e.querySelector(`.cine-nav-link[data-section="${y}"]`);M&&(a.forEach(T=>T.classList.remove("active")),M.classList.add("active"),n(M)),w.scrollIntoView({behavior:"smooth"}),history.pushState&&history.pushState(null,"",`#${y}`),clearTimeout(l),l=setTimeout(()=>{r=!1,c()},850)}})}),document.addEventListener("click",m=>{h!=null&&h.classList.contains("open")&&!h.contains(m.target)&&!(u!=null&&u.contains(m.target))&&v(!0)});const b=e.querySelector(".btn-mobile-hire");b==null||b.addEventListener("click",()=>{v(!0)});const k=e.querySelectorAll(".cine-filter-btn"),A=e.querySelector("#cine-projects-grid");k.forEach(m=>{m.addEventListener("click",()=>{k.forEach(y=>y.classList.remove("active")),m.classList.add("active");const f=m.getAttribute("data-filter");this.activeFilter=f,A.innerHTML=this.renderProjectCards(f),x.attach(A.querySelectorAll(".cine-project-card"),{maxTilt:8,scale:1.02,glare:!0})})});const E=e.querySelector("#cine-chat-log"),L=e.querySelector("#cine-ai-form"),D=e.querySelector("#cine-ai-input"),j=e.querySelectorAll(".ai-suggest-chip"),z=m=>{if(!m)return"";const y=m.replace(/([.!?:]?)\s+(?:and\s+)?([1-9]\d?[\.\)])\s+/g,`$1
• `).replace(/([.!?:]?)\s+(?:and\s+)?([•\-])\s+/g,`$1
• `).split(`
`),w=[];for(let M of y){let T=M.trim();if(!T)continue;const O=T.startsWith("•")||T.startsWith("-")||/^([1-9]\d?[\.\)]|[•\-\*])/.test(T);let R=T.replace(/^([•\-\*]|[1-9]\d?[\.\)])\s*/,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");R=R.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),R=R.replace(/\*(.*?)\*/g,"<em>$1</em>"),R=R.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" class="ai-chat-link">$1</a>'),O?w.push(`
            <div class="ai-bullet-item">
              <span class="ai-bullet-icon">🔹</span>
              <div class="ai-bullet-text">${R}</div>
            </div>
          `):w.push(`<div class="ai-para-item">${R}</div>`)}return w.join("")},W=async m=>{if(!m.trim())return;const f=document.createElement("div");f.className="cine-chat-msg user",f.textContent=`Q: ${m}`,E.appendChild(f);const y=document.createElement("div");y.className="cine-chat-msg assistant",y.innerHTML=`<span style="opacity: 0.7;">Thinking... searching Abhishek's verified credentials...</span>`,E.appendChild(y),E.scrollTop=E.scrollHeight;try{const w=await G.query(m);y.innerHTML=z(w)}catch(w){console.error("AI query error:",w),y.innerHTML="I am ready to assist! Please ask about Abhishek's <strong>CGPA (8.73)</strong>, <strong>latest projects (MIPS 32-Bit Processor, Caption Studio, ReturnGuard, PlateVision, FraudGuard.AI)</strong>, <strong>technical skills</strong>, <strong>VLSI internship</strong>, or <strong>IEEE publication</strong>."}E.scrollTop=E.scrollHeight};L==null||L.addEventListener("submit",m=>{m.preventDefault();const f=D.value;D.value="",W(f)}),j.forEach(m=>{m.addEventListener("click",()=>{const f=m.getAttribute("data-q");W(f)})});const F=e.querySelector("#cine-contact-form"),I=e.querySelector("#cine-form-feedback");F==null||F.addEventListener("submit",m=>{m.preventDefault();const f=e.querySelector("#cine-name").value,y=e.querySelector("#cine-role").value,w=e.querySelector("#cine-msg").value;I&&(I.style.display="block",I.textContent=`✓ Thank you ${f}! Your interview invite regarding "${y}" has been recorded.`);const M=`mailto:abhishek1297kumar@gmail.com?subject=Placement Opportunity: ${encodeURIComponent(y)} from ${encodeURIComponent(f)}&body=${encodeURIComponent(w)}`;window.open(M,"_blank"),F.reset()})}}class ee{constructor(){this.currentMode="cinematic",this.cinematicContainer=null,this.desktopContainer=null,this.listeners=[]}init(e,t){this.cinematicContainer=e,this.desktopContainer=t,this.applyMode("cinematic")}onModeChange(e){this.listeners.push(e)}switchTo(e){this.applyMode("cinematic")}applyMode(e){this.cinematicContainer&&(this.cinematicContainer.style.display="block",this.desktopContainer&&(this.desktopContainer.style.display="none"),document.documentElement.style.height="auto",document.documentElement.style.overflowY="auto",document.documentElement.style.overflowX="hidden",document.body.style.height="auto",document.body.style.overflowY="auto",document.body.style.overflowX="hidden",document.title="Abhishek Kumar — Portfolio | B.Tech ECE (8.73 CGPA)")}}const V=new ee;class te{constructor(){this.currentPage=1,this.zoomLevel=100}render(){return`
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
                  <h1 class="doc-name">${o.personal.name}</h1>
                  <p class="doc-address">${o.personal.address}</p>
                  <div class="doc-contact-row">
                    <a href="mailto:${o.personal.email}" class="doc-link">${o.personal.email}</a>
                    <span class="bullet">•</span>
                    <span>${o.personal.phone}</span>
                    <span class="bullet">•</span>
                    <a href="${o.personal.portfolio}" target="_blank" rel="noreferrer" class="doc-link">${o.personal.portfolioHandle}</a>
                    <span class="bullet">•</span>
                    <a href="${o.personal.linkedin}" target="_blank" rel="noreferrer" class="doc-link">linkedin.com/in/abhishek947kumar</a>
                    <span class="bullet">•</span>
                    <a href="${o.personal.github}" target="_blank" rel="noreferrer" class="doc-link">github.com/abhishek947kumar</a>
                  </div>
                </header>

                <!-- ABOUT ME -->
                <section class="doc-section">
                  <h2 class="doc-section-title">ABOUT ME</h2>
                  <div class="doc-divider"></div>
                  <p class="doc-text">${o.personal.summary}</p>
                </section>

                <!-- EDUCATION -->
                <section class="doc-section">
                  <h2 class="doc-section-title">EDUCATION</h2>
                  <div class="doc-divider"></div>
                  ${o.education.map(e=>`
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${e.institution}</span>
                        <span class="doc-location">${e.location}</span>
                      </div>
                      <div class="doc-entry-sub">
                        <span class="doc-italic">${e.degree}</span>
                        <span class="doc-date">${e.duration}</span>
                      </div>
                      <div class="doc-score-highlight">
                        <strong>${e.score}</strong>
                      </div>
                    </div>
                  `).join("")}
                </section>

                <!-- INTERNSHIP -->
                <section class="doc-section">
                  <h2 class="doc-section-title">INTERNSHIP</h2>
                  <div class="doc-divider"></div>
                  ${o.internships.map(e=>`
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${e.organization}</span>
                        <span class="doc-location">${e.location}</span>
                      </div>
                      <div class="doc-entry-sub">
                        <span class="doc-italic">${e.role}</span>
                        <span class="doc-date">${e.duration}</span>
                      </div>
                      <ul class="doc-bullet-list">
                        ${e.points.map(t=>`<li>${t}</li>`).join("")}
                      </ul>
                    </div>
                  `).join("")}
                </section>

                <!-- PROJECTS -->
                <section class="doc-section">
                  <h2 class="doc-section-title">PROJECTS</h2>
                  <div class="doc-divider"></div>
                  ${o.projects.slice(0,2).map(e=>`
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${e.title}</span>
                      </div>
                      <ul class="doc-bullet-list">
                        ${e.highlights.map(t=>`<li>${t}</li>`).join("")}
                      </ul>
                    </div>
                  `).join("")}
                </section>

                <!-- SKILLS -->
                <section class="doc-section">
                  <h2 class="doc-section-title">SKILLS</h2>
                  <div class="doc-divider"></div>
                  <ul class="doc-skills-list">
                    <li><strong>Embedded Systems, Microcontrollers & VLSI:</strong> Verilog HDL (5-Stage Pipelined MIPS Processor, Hazard Unit, Forwarding Paths), Xilinx Vivado (Artix-7 Basys 3 FPGA, Synthesis & Implementation, 94 mW Power), ARM, AVR, ESP32, Embedded C, C/C++, Hardware Interfacing (SPI, I2C, UART, GPIO), Wokwi Simulator.</li>
                    <li><strong>AI & Machine Learning:</strong> Deep Learning (PyTorch CNN + LSTM Captioning, Beam Search, BLEU), Autonomous Agents (ReAct Framework, Google Gemini AI), OpenCV ALPR Computer Vision, Tesseract OCR, Real-time ML Inference, XGBoost Ensemble, Explainable AI (SHAP), Scikit-Learn, YOLOv2.</li>
                    <li><strong>Cybersecurity & Digital Forensics:</strong> Cloud DLP Architecture, AST SQLi Interception, AES-256-GCM Authenticated Encryption, Volatile RAM Memory Forensics, ISO/IEC 27037 Evidence Vault, Windows Prefetch & Registry, Luhn Validation.</li>
                    <li><strong>FinTech & Real-Time Distributed Web:</strong> Greedy Graph Debt Simplification, Bidirectional WebSockets, Server-Sent Events (SSE), D3.js Sprint Burndown Telemetry, OCR Receipt Parsing, Live FX APIs, UPI QR Settlements.</li>
                    <li><strong>Languages & Frameworks:</strong> Verilog HDL, Python (FastAPI, PyTorch, OpenCV, Django), C, C++, Embedded C, JavaScript, TypeScript, Node.js, Express, React 18, SQL (PostgreSQL, SQLite), Docker, Git/GitHub, CI/CD, Linux.</li>
                    <li><strong>Engineering Fundamentals:</strong> Hardware-Software Co-Design, Real-Time Low Latency Optimization (<2.8ms), Zero-Trust Encryption, Graph Optimization Algorithms, Data Structures & Algorithms (DSA), Computer Architecture.</li>
                    <li><strong>Soft Skills & Languages:</strong> Technical Troubleshooting, Architectural Documentation, Problem Solving, Cross-Functional Teamwork. English (Fluent), Hindi (Native), Bengali (Working).</li>
                  </ul>
                </section>

                <div class="doc-page-footer">Page 1 of 2 — (Click 'Next Page' or arrow to flip 3D)</div>
              </div>

              <!-- BACK: PAGE 2 -->
              <div class="paper-sheet paper-back" id="page-2">
                <header class="doc-header mini">
                  <span class="doc-name-small">${o.personal.name} — Page 2</span>
                  <span class="doc-contact-small">${o.personal.email} | ${o.personal.portfolioHandle} | ${o.personal.phone}</span>
                </header>

                <!-- PUBLICATIONS & CERTIFICATIONS -->
                <section class="doc-section">
                  <h2 class="doc-section-title">PUBLICATIONS & CERTIFICATIONS</h2>
                  <div class="doc-divider"></div>
                  <ul class="doc-bullet-list">
                    ${o.publications.map(e=>`
                      <li>
                        <strong>${e.venue}:</strong> “${e.title}.” (Published).
                        <a href="${e.link}" target="_blank" class="doc-link-accent">${e.doi}</a>
                      </li>
                    `).join("")}
                    ${o.certifications.map(e=>`
                      <li>
                        <strong>${e.title}</strong> – ${e.issuer}
                      </li>
                    `).join("")}
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
                  ${o.projects.slice(2,6).map(e=>`
                    <div class="doc-entry">
                      <div class="doc-entry-header">
                        <span class="doc-bold">${e.title}</span>
                        <span class="doc-tag">${e.tags[0]}</span>
                      </div>
                      <p class="doc-text">${e.description}</p>
                    </div>
                  `).join("")}
                </section>

                <div class="doc-page-footer">Page 2 of 2 — (Click 'Previous Page' to flip back)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}initListeners(e){const t=e.querySelector("#resume-prev-page"),i=e.querySelector("#resume-next-page"),a=e.querySelector("#resume-page-num"),n=e.querySelector("#resume-flipper"),s=b=>{this.currentPage=b,a.textContent=`Page ${b} of 2`,b===2?n==null||n.classList.add("is-flipped"):n==null||n.classList.remove("is-flipped")};t&&t.addEventListener("click",()=>s(1)),i&&i.addEventListener("click",()=>s(2));const r=e.querySelector("#resume-zoom-in"),l=e.querySelector("#resume-zoom-out"),c=e.querySelector("#resume-zoom-val"),d=e.querySelector("#paper-3d-scene"),p=b=>{this.zoomLevel=Math.max(70,Math.min(140,this.zoomLevel+b)),c.textContent=`${this.zoomLevel}%`,d.style.transform=`scale(${this.zoomLevel/100})`,d.style.transformOrigin="top center"};r&&r.addEventListener("click",()=>p(10)),l&&l.addEventListener("click",()=>p(-10));const u=e.querySelector("#btn-print-resume");u&&u.addEventListener("click",()=>{window.print()});const h=e.querySelector("#btn-copy-resume-text");h&&h.addEventListener("click",async()=>{const b=`ABHISHEK KUMAR
Sector-3, Bokaro Steel City, Jharkhand - 827003
${o.personal.email} | ${o.personal.phone}
Portfolio: ${o.personal.portfolio}
LinkedIn: ${o.personal.linkedin}
GitHub: ${o.personal.github}

ABOUT ME:
${o.personal.summary}

EDUCATION:
B.Tech in ECE, IEM Kolkata (2023-2027) | CGPA: 8.73
Class 12, MGM Bokaro (2023): 86.5%
Class 10, MGM Bokaro (2021): 95%

INTERNSHIPS:
1. VLSI Design Intern, Jadavpur University (Dec 2025 - Jan 2026)
2. Vocational Trainee, SAIL (May 2025 - June 2025)

PUBLICATIONS:
IEMENTECH 2026: Enhancing Wearable Depression Management (DOI: 10.1109/IEMENTech202669403.2026.11434403)

CERTIFICATIONS:
IoT and AI Cloud - UC San Diego

FLAGSHIP ENGINEERING PROJECTS:
1. 32-Bit 5-Stage Pipelined MIPS Processor: Synthesizable Verilog HDL RISC Core with Hazard Detection, Forwarding Paths & Vivado Artix-7 Basys 3 FPGA Implementation (94 mW, 0 DRC Violations)
2. Neural Image Caption Studio: Deep Learning PyTorch CNN (MobileNetV3/ResNet-50) + LSTM Language Decoder with Beam Search (alpha=0.7) & BLEU Metric Lab
3. ReturnGuard: Autonomous Multimodal E-Commerce Returns Agent (ReAct Framework, Google Gemini Vision, Defect Inspection & HITL Review Desk)
4. PlateVision: End-to-End Automated License Plate Recognition (OpenCV 8-Stage Image Pipeline, Multi-PSM Tesseract OCR & FastAPI Visualizer)
5. FraudGuard.AI: Real-Time Credit Card Fraud Detection Platform (FastAPI, XGBoost Ensemble, Sub-2.8ms Scoring, Explainable AI)
6. Cloud DLP Shield: Detecting Data Leaks Using SQL & Cloud DLP Architecture (Node.js, AES-256-GCM, AST SQLi, Luhn Algorithm, Live SOC)
7. SplitFlow: Smart Group Expense Splitter & Settlement Engine (OCR Scanner, Greedy Debt Graph & Live FX Rates)
8. PulseFlow Agile: Enterprise Project Management & Telemetry (WebSockets, D3.js Sprint Burndown & AI Copilot)
9. BitTrace DFIR: Automated Live RAM & Postmortem Bitcoin Forensics Tool for Windows (ISO/IEC 27037)
10. Embedded Night-Vision System for Pedestrian Detection (Active IR + Thermal + YOLOv2)
11. Logistics Management System: Enterprise Multi-Dealer Logistics Platform (Python, Django, PostgreSQL)
12. Piezo-Electric Acupressure Wearable: IoT Healthcare Wearable Architecture (Embedded C, Wokwi, IEEE Paper)

PROJECT-VALIDATED SKILLS:
Embedded Systems & VLSI (Verilog HDL, 5-Stage Pipelined MIPS, Hazard Unit, Vivado Synthesis/Implementation, Artix-7 Basys 3 FPGA, ARM/AVR/ESP32, Embedded C, Wokwi, SPI/I2C/UART/GPIO)
AI & Machine Learning (Deep Learning PyTorch CNN+LSTM, Beam Search, Autonomous ReAct Agents, OpenCV ALPR, Tesseract OCR, XGBoost, Explainable AI, Scikit-Learn, YOLOv2, Gemini AI)
Cybersecurity & Digital Forensics (Cloud DLP, AST SQLi Defense, AES-256-GCM Authenticated Encryption, Live RAM Triage, ISO/IEC 27037, Luhn Algorithm)
FinTech & Real-Time Distributed Web (Greedy Debt Graphs, WebSockets, Server-Sent Events, D3.js Burndown, OCR Parsing, Live FX, UPI QR)
Languages & Frameworks (Verilog HDL, Python, C, C++, Embedded C, JavaScript, TypeScript, Node.js, Express, React 18, Django, PostgreSQL, Docker, Git/GitHub, CI/CD, Linux).`;try{await navigator.clipboard.writeText(b);const k=h.innerHTML;h.innerHTML="<span>Copied ATS Resume!</span>",setTimeout(()=>{h.innerHTML=k},2e3)}catch{alert("Resume ATS text copied!")}});const g=e.querySelector(".paper-front"),v=e.querySelector(".paper-back");g&&v&&x.attach([g,v],{maxTilt:6,scale:1.01,glare:!1})}}class ie{constructor(){this.activeFilter="all",this.searchQuery="",this.selectedProject=null}render(){return`
      <div class="appstore-container">
        <!-- App Store Sidebar -->
        <aside class="appstore-sidebar">
          <div class="sidebar-brand">
            <span class="appstore-logo"></span>
            <span class="appstore-title">Project Store</span>
          </div>

          <div class="sidebar-search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="projects-search-input" placeholder="Search projects, tags..." />
          </div>

          <nav class="sidebar-nav">
            <button class="nav-item active" data-filter="all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Discover All</span>
            </button>
            <button class="nav-item special-highlight" data-filter="recent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Recent (Last 1 Week)</span>
              <span class="nav-pill">Hot</span>
            </button>
            <button class="nav-item" data-filter="embedded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              <span>Embedded & VLSI</span>
            </button>
            <button class="nav-item" data-filter="software">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              <span>AI & Full Stack</span>
            </button>
            <button class="nav-item" data-filter="security">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>Cybersecurity & DFIR</span>
            </button>
          </nav>

          <div class="sidebar-github-link">
            <a href="https://github.com/abhishek947kumar" target="_blank" rel="noreferrer" class="github-profile-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>abhishek947kumar</span>
            </a>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="appstore-main">
          <!-- Featured Header with 3D Depth Card -->
          <div class="appstore-hero 3d-hero-card" id="appstore-hero-card">
            <div class="hero-badge">PLACEMENT SHOWCASE 2026</div>
            <h2 class="hero-title">Embedded Systems, DFIR Security & Production Software</h2>
            <p class="hero-subtitle">High-performance engineering projects built with algorithmic precision, hardware-software co-design, and modern scalable architectures.</p>
            <div class="hero-stats">
              <div class="stat-box">
                <span class="stat-num">8.73</span>
                <span class="stat-label">B.Tech ECE CGPA</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">1</span>
                <span class="stat-label">IEEE Publication</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">18+</span>
                <span class="stat-label">GitHub Repos</span>
              </div>
              <div class="stat-box">
                <span class="stat-num">2</span>
                <span class="stat-label">Core Internships</span>
              </div>
            </div>
          </div>

          <!-- Section Title -->
          <div class="section-header-bar">
            <h3 class="section-heading" id="projects-section-title">All Engineering Projects</h3>
            <span class="section-count" id="projects-count-label">${o.projects.length} Projects</span>
          </div>

          <!-- Projects Grid with 3D Tilt Elements -->
          <div class="projects-card-grid" id="projects-card-grid">
            ${this.renderProjectCards()}
          </div>
        </main>

        <!-- Project Detail Modal with 3D perspective dialog -->
        <div class="project-modal-backdrop" id="project-modal" style="display: none;">
          <div class="project-modal-dialog" id="project-modal-dialog">
            <button class="modal-close-btn" id="modal-close-btn" title="Close Modal">&times;</button>
            <div class="modal-content" id="modal-content-body">
              <!-- Dynamically Populated -->
            </div>
          </div>
        </div>
      </div>
    `}filterProjects(){return o.projects.filter(e=>{if(this.activeFilter==="recent"){if(e.createdPeriod!=="Last 6 Months"&&e.createdPeriod!=="Last 1 Week"&&e.createdPeriod!=="Latest Release"&&!e.badge.includes("Recent")&&!e.badge.includes("Latest"))return!1}else if(this.activeFilter==="embedded"){if(!e.tags.some(i=>["Embedded Systems","Embedded C","Microcontrollers","Wokwi","Xilinx Vivado","Finite State Machines","Thermal IR","YOLOv2","Verilog HDL","MIPS32 ISA","5-Stage Pipeline","FPGA","Artix-7","Hardware Forwarding","Computer Architecture"].includes(i)))return!1}else if(this.activeFilter==="software"){if(!e.tags.some(i=>["JavaScript","TypeScript","Python","FastAPI","Django","React","GraphQL","Gemini AI API","WebSockets","D3.js","FinTech","Enterprise Architecture","Machine Learning","Explainable AI","XGBoost","PyTorch","Deep Learning","Computer Vision","LSTM","MobileNetV3","Beam Search","Autonomous Agents","ReAct Framework","Multimodal Vision","OpenCV","Tesseract OCR"].includes(i)))return!1}else if(this.activeFilter==="security"&&!e.tags.some(i=>["Digital Forensics","Cryptography","Security Algorithms","Pixel Manipulation","Windows API","ISO 27037","C++","Cloud Security","Data Loss Prevention","Cyber Defense","SQL Injection","AES-256-GCM"].includes(i)))return!1;if(this.searchQuery){const t=this.searchQuery.toLowerCase(),i=e.title.toLowerCase().includes(t),a=e.description.toLowerCase().includes(t),n=e.tags.some(s=>s.toLowerCase().includes(t));return i||a||n}return!0})}renderProjectCards(){const e=this.filterProjects();return e.length===0?`
        <div class="empty-projects-state">
          <p>No projects match your filter or search query.</p>
          <button class="clear-filter-btn" id="btn-reset-filter">Reset Filters</button>
        </div>
      `:e.map(t=>{const i=t.createdPeriod==="Last 6 Months"||t.createdPeriod==="Last 1 Week"||t.badge.includes("Latest")||t.badge.includes("Recent");return`
        <div class="project-card 3d-tilt-card ${i?"is-recent":""}" data-project-id="${t.id}">
          <div class="card-header">
            <span class="card-badge ${i?"badge-hot":"badge-normal"}">${t.badge}</span>
            <span class="card-period">${t.createdPeriod}</span>
          </div>

          <h4 class="card-title">${t.title}</h4>
          <p class="card-subtitle">${t.subtitle}</p>

          <p class="card-desc">${t.description}</p>

          <div class="card-tags">
            ${t.tags.slice(0,4).map(a=>`<span class="tag-chip">${a}</span>`).join("")}
            ${t.tags.length>4?`<span class="tag-chip more">+${t.tags.length-4}</span>`:""}
          </div>

          <div class="card-footer">
            <button class="btn-inspect-proj" data-id="${t.id}">
              <span>View Architecture</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <a href="${t.githubUrl}" target="_blank" rel="noreferrer" class="btn-github-link" title="Open on GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      `}).join("")}openDetailModal(e,t){const i=o.projects.find(l=>l.id===e);if(!i)return;const a=t.querySelector("#project-modal"),n=t.querySelector("#modal-content-body"),s=t.querySelector("#project-modal-dialog");n.innerHTML=`
      <div class="modal-proj-header">
        <span class="modal-badge">${i.badge}</span>
        <h3 class="modal-title">${i.title}</h3>
        <p class="modal-sub">${i.subtitle}</p>
      </div>

      <div class="modal-tech-row">
        ${i.tags.map(l=>`<span class="tech-badge">${l}</span>`).join("")}
      </div>

      <div class="modal-desc-box">
        <h5 class="modal-section-h5">Executive Summary</h5>
        <p>${i.description}</p>
      </div>

      <div class="modal-highlights-box">
        <h5 class="modal-section-h5">Technical Architecture & Engineering Highlights</h5>
        <ul>
          ${i.highlights.map(l=>`<li>${l}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-actions-bar">
        <a href="${i.githubUrl}" target="_blank" rel="noreferrer" class="modal-primary-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>Open on GitHub</span>
        </a>
        <button class="modal-secondary-btn" id="modal-btn-close-bottom">
          <span>Close Window</span>
        </button>
      </div>
    `,a.style.display="flex",s&&x.attach([s],{maxTilt:5,scale:1.01,glare:!1});const r=a.querySelector("#modal-btn-close-bottom");r&&(r.onclick=()=>{a.style.display="none"})}initListeners(e){const t=e.querySelectorAll(".sidebar-nav .nav-item"),i=e.querySelector("#projects-search-input"),a=e.querySelector("#projects-card-grid"),n=e.querySelector("#project-modal"),s=e.querySelector("#modal-close-btn"),r=e.querySelector("#appstore-hero-card");r&&x.attach([r],{maxTilt:6,scale:1.01});const l=()=>{a.innerHTML=this.renderProjectCards();const d=this.filterProjects().length,p=e.querySelector("#projects-count-label");p&&(p.textContent=`${d} Project${d===1?"":"s"}`),c()},c=()=>{e.querySelectorAll(".btn-inspect-proj").forEach(h=>{h.addEventListener("click",g=>{g.stopPropagation();const v=h.getAttribute("data-id");this.openDetailModal(v,e)})});const p=e.querySelectorAll(".project-card");p.forEach(h=>{h.addEventListener("click",()=>{const g=h.getAttribute("data-project-id");this.openDetailModal(g,e)})}),x.attach(p,{maxTilt:10,scale:1.025});const u=e.querySelector("#btn-reset-filter");u&&u.addEventListener("click",()=>{var h;this.activeFilter="all",this.searchQuery="",i&&(i.value=""),t.forEach(g=>g.classList.remove("active")),(h=e.querySelector('.nav-item[data-filter="all"]'))==null||h.classList.add("active"),l()})};t.forEach(d=>{d.addEventListener("click",()=>{t.forEach(p=>p.classList.remove("active")),d.classList.add("active"),this.activeFilter=d.getAttribute("data-filter"),l()})}),i&&i.addEventListener("input",d=>{this.searchQuery=d.target.value.trim(),l()}),s&&s.addEventListener("click",()=>{n.style.display="none"}),n&&n.addEventListener("click",d=>{d.target===n&&(n.style.display="none")}),c()}}class ae{constructor(){this.history=[{role:"assistant",text:`Hello! I am **Resume Assistant for Abhishek**, an AI assistant pre-trained on Abhishek Kumar's verified engineering credentials, latest October 2026 GitHub releases, and technical skills.

Recruiters and hiring managers can query anything directly about his **32-Bit Pipelined MIPS Processor (Verilog HDL)**, **Neural Image Caption Studio (PyTorch CNN-LSTM)**, **ReturnGuard Multimodal Agent**, **PlateVision ALPR**, **FraudGuard.AI**, **Cloud DLP Shield**, **8.73 CGPA**, **VLSI internship**, or **IEEE paper**! Try asking below or click a prompt chip.`}],this.isThinking=!1}render(){return`
      <div class="ai-app-container">
        <!-- AI Header with 3D Apple Intelligence Gyroscopic Orb -->
        <header class="ai-app-header">
          <div class="ai-orb-wrapper">
            <div class="ai-orb-3d-scene">
              <div class="orb-3d-rings">
                <div class="orb-ring ring-x"></div>
                <div class="orb-ring ring-y"></div>
                <div class="orb-ring ring-z"></div>
                <div class="orb-core-3d"></div>
              </div>
            </div>
            <div class="ai-title-meta">
              <div class="ai-title-row">
                <span class="ai-title">Placement Resume Assistant</span>
                <span class="ai-status-badge" id="ai-active-mode-badge">Resume Intelligence Ready</span>
              </div>
              <span class="ai-subtitle">Direct semantic resume & project search for recruiters and engineering leads</span>
            </div>
          </div>

          <div class="ai-header-actions">
            <button class="ai-action-btn" id="btn-ai-key-settings" title="Configure Live Google Gemini API Key">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span>API Key</span>
            </button>
            <button class="ai-action-btn" id="btn-clear-ai-chat" title="Clear Chat History">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Clear</span>
            </button>
          </div>
        </header>

        <!-- Chat Conversation Body -->
        <div class="ai-chat-body" id="ai-chat-messages">
          ${this.renderMessages()}
        </div>

        <!-- Suggestion Chips Bar with 3D hover pills -->
        <div class="ai-suggestions-tray">
          <span class="suggestion-tray-title">Quick Recruiter Prompts:</span>
          <div class="suggestion-chips-carousel">
            <button class="chip-btn 3d-chip" data-query="Tell me about the 32-bit pipelined MIPS processor project in Verilog">💻 MIPS 32-Bit Core (Verilog & Vivado)</button>
            <button class="chip-btn 3d-chip" data-query="Tell me about the Image Caption Generator project using PyTorch and LSTM">🧠 Caption Studio (PyTorch CNN-LSTM)</button>
            <button class="chip-btn 3d-chip" data-query="Tell me about the Return-Guard autonomous AI returns agent">🤖 ReturnGuard (ReAct & Vision Agent)</button>
            <button class="chip-btn 3d-chip" data-query="Tell me about the license plate recognition project">🚗 PlateVision ALPR (OpenCV & OCR)</button>
            <button class="chip-btn 3d-chip" data-query="Tell me about FraudGuard.AI credit card fraud detection">💳 FraudGuard.AI (Sub-2.8ms Fraud AI)</button>
            <button class="chip-btn 3d-chip" data-query="Explain Cloud DLP Shield and AST SQLi interception">🔒 Cloud DLP Shield (SQLi & AESX)</button>
            <button class="chip-btn 3d-chip" data-query="How do SplitFlow and PulseFlow Agile work?">⚡ SplitFlow & PulseFlow</button>
            <button class="chip-btn 3d-chip" data-query="Tell me about his VLSI internship at Jadavpur University">⚡ VLSI Internship</button>
            <button class="chip-btn 3d-chip" data-query="Explain his published IEEE research paper">📄 IEEE Publication</button>
            <button class="chip-btn 3d-chip" data-query="Why should our company hire Abhishek for an engineering role?">⭐ Why Hire Abhishek?</button>
            <button class="chip-btn 3d-chip" data-query="How can I contact Abhishek for an interview?">✉️ Contact & Email</button>
          </div>
        </div>

        <!-- Input Bar -->
        <footer class="ai-input-footer">
          <form class="ai-input-form" id="ai-chat-form">
            <div class="input-glow-box">
              <input type="text" id="ai-query-input" placeholder="Ask anything about Abhishek (e.g. 'Tell me about his night vision project')..." autocomplete="off" />
              <button type="button" class="btn-voice-speak" id="btn-ai-voice" title="Read Aloud with Siri Voice">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </button>
              <button type="submit" class="btn-ai-send" id="btn-ai-send" title="Send Question">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </footer>

        <!-- Gemini API Key Modal -->
        <div class="gemini-key-modal" id="gemini-key-modal" style="display: none;">
          <div class="gemini-modal-content">
            <h4>Google Gemini API Settings</h4>
            <p class="modal-subtext">The assistant works out-of-the-box using Abhishek's structured resume knowledge engine. To connect live Google Gemini 1.5 Flash LLM, paste your Google AI Studio API key below:</p>
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." value="${G.customApiKey}" />
            <div class="gemini-modal-actions">
              <button class="btn-save-key" id="btn-save-gemini-key">Save & Activate</button>
              <button class="btn-clear-key" id="btn-clear-gemini-key">Use Built-in Engine</button>
              <button class="btn-cancel-modal" id="btn-close-gemini-modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `}renderMessages(){return this.history.map((e,t)=>{const i=e.role==="user";return`
        <div class="chat-row ${i?"user-row":"assistant-row"}">
          <div class="chat-avatar">
            ${i?"👤":""}
          </div>
          <div class="chat-bubble">
            <div class="chat-text">${this.formatMarkdown(e.text)}</div>
            ${!i&&t===this.history.length-1?`
              <div class="chat-bubble-tools">
                <button class="chat-tool-btn copy-ans" data-text="${encodeURIComponent(e.text)}" title="Copy Answer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            `:""}
          </div>
        </div>
      `}).join("")}formatMarkdown(e){let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return t=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/^• (.*)$/gm,"<li>$1</li>"),t=t.replace(/^(<li>.*<\/li>)+$/gm,"<ul>$&</ul>"),t=t.replace(/\n\n/g,"<br><br>"),t=t.replace(/\n/g,"<br>"),t=t.replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noreferrer" class="chat-link">$1</a>'),t}async handleQuery(e,t){if(!e||this.isThinking)return;this.history.push({role:"user",text:e}),this.isThinking=!0;const i=t.querySelector("#ai-chat-messages");i.innerHTML=this.renderMessages()+`
      <div class="chat-row assistant-row thinking-row">
        <div class="chat-avatar"></div>
        <div class="chat-bubble thinking">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>
      </div>
    `,i.scrollTop=i.scrollHeight;try{const a=await G.ask(e);this.history.push({role:"assistant",text:a})}catch{this.history.push({role:"assistant",text:"Abhishek Kumar is a B.Tech ECE candidate at IEM Kolkata (8.73 CGPA) with 18+ production projects in Processor Design & FPGA (MIPS 32-Bit Core in Verilog), Deep Learning & Vision (Neural Caption Studio, PlateVision ALPR), Autonomous Agents (ReturnGuard), Cyber Defense (FraudGuard.AI, Cloud DLP Shield), Systems (SplitFlow, PulseFlow, BitTrace DFIR), VLSI EDA at Jadavpur, and an IEEE publication."})}finally{this.isThinking=!1,i.innerHTML=this.renderMessages(),i.scrollTop=i.scrollHeight,this.attachMessageListeners(t)}}speakLastAnswer(){if(!("speechSynthesis"in window))return;const e=this.history[this.history.length-1];if(e&&e.role==="assistant"){window.speechSynthesis.cancel();const t=e.text.replace(/\*\*/g,"").replace(/•/g,"").replace(/\[(.*?)\]\(.*?\)/g,"$1"),i=new SpeechSynthesisUtterance(t);i.rate=1.05,i.pitch=1,window.speechSynthesis.speak(i)}}initListeners(e){const t=e.querySelector("#ai-chat-form"),i=e.querySelector("#ai-query-input"),a=e.querySelectorAll(".chip-btn"),n=e.querySelector("#btn-ai-voice"),s=e.querySelector("#btn-clear-ai-chat"),r=e.querySelector("#btn-ai-key-settings"),l=e.querySelector("#gemini-key-modal"),c=e.querySelector("#gemini-key-input"),d=e.querySelector("#btn-save-gemini-key"),p=e.querySelector("#btn-clear-gemini-key"),u=e.querySelector("#btn-close-gemini-modal"),h=e.querySelector("#ai-active-mode-badge"),g=()=>{G.hasCustomKey()?h&&(h.textContent="Live Gemini 1.5 Active",h.classList.add("badge-gemini-live")):h&&(h.textContent="Resume Intelligence Ready",h.classList.remove("badge-gemini-live"))};g(),t&&t.addEventListener("submit",v=>{v.preventDefault();const b=i.value.trim();b&&(i.value="",this.handleQuery(b,e))}),a.forEach(v=>{v.addEventListener("click",()=>{const b=v.getAttribute("data-query");b&&this.handleQuery(b,e)})}),n&&n.addEventListener("click",()=>this.speakLastAnswer()),s&&s.addEventListener("click",()=>{this.history=[{role:"assistant",text:"Chat reset! Ask me anything about Abhishek's projects, CGPA, research, or internships."}];const v=e.querySelector("#ai-chat-messages");v&&(v.innerHTML=this.renderMessages()),this.attachMessageListeners(e)}),r&&r.addEventListener("click",()=>{l.style.display="flex"}),u&&u.addEventListener("click",()=>{l.style.display="none"}),d&&d.addEventListener("click",()=>{const v=c.value.trim();G.setApiKey(v),g(),l.style.display="none"}),p&&p.addEventListener("click",()=>{G.setApiKey(""),c.value="",g(),l.style.display="none"}),this.attachMessageListeners(e)}attachMessageListeners(e){e.querySelectorAll(".copy-ans").forEach(i=>{i.addEventListener("click",async()=>{const a=decodeURIComponent(i.getAttribute("data-text"));await navigator.clipboard.writeText(a),i.classList.add("copied"),setTimeout(()=>i.classList.remove("copied"),1500)})})}}class se{constructor(){this.currentUrl="https://github.com/abhishek947kumar",this.history=[this.currentUrl],this.historyIndex=0}render(){return`
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
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/mips-32bit-pipelined-processor">
            <span class="bm-icon">⚡</span> MIPS 32-Bit Core
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/image-caption-generator">
            <span class="bm-icon">🌌</span> Caption Studio
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/Return-Guard">
            <span class="bm-icon">🛡️</span> ReturnGuard Agent
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/license-plate-recognition">
            <span class="bm-icon">🚗</span> PlateVision ALPR
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/credit-card-fraud-detection">
            <span class="bm-icon">💳</span> FraudGuard.AI
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/detecting-data-leaks">
            <span class="bm-icon">🔒</span> Cloud DLP Shield
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/splitflow">
            <span class="bm-icon">⚡</span> SplitFlow App
          </button>
          <button class="safari-bookmark" data-url="https://github.com/abhishek947kumar/pulseflow-agile">
            <span class="bm-icon">📊</span> PulseFlow Agile
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
    `}renderPageContent(e){return e.includes("linkedin.com")?`
        <div class="safari-web-page linkedin-page">
          <div class="page-card linkedin-card">
            <div class="linkedin-banner"></div>
            <div class="linkedin-profile-header">
              <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="li-avatar" />
              <div class="li-info">
                <h2>${o.personal.name}</h2>
                <p class="li-headline">B.Tech ECE '27 @ IEM Kolkata | VLSI Intern @ Jadavpur University | IEEE Published Author</p>
                <span class="li-loc">${o.personal.location}</span>
                <div class="li-buttons">
                  <a href="${o.personal.linkedin}" target="_blank" class="li-btn-primary">Connect on LinkedIn</a>
                  <a href="mailto:${o.personal.email}" class="li-btn-secondary">Message / Email</a>
                </div>
              </div>
            </div>

            <div class="li-body-section">
              <h3>About</h3>
              <p>${o.personal.summary}</p>
            </div>

            <div class="li-body-section">
              <h3>Featured Publication</h3>
              <div class="li-pub-card">
                <h4>${o.publications[0].title}</h4>
                <p>${o.publications[0].venue} • Published 2026</p>
                <a href="${o.publications[0].link}" target="_blank" class="li-link">View in IEEE Xplore &rarr;</a>
              </div>
            </div>

            <div class="li-body-section">
              <h3>Featured Projects & Activity (Latest Releases)</h3>
              <div class="li-projects-list">
                <div class="li-project-item">
                  <div class="li-proj-icon">⚡</div>
                  <div class="li-proj-details">
                    <h4>32-Bit 5-Stage Pipelined MIPS Processor Core (Verilog & Vivado)</h4>
                    <p class="li-proj-meta">Launched Oct 23, 2026 • Verilog HDL, Vivado, Artix-7 Basys 3 FPGA, Python Assembler</p>
                    <p class="li-proj-desc">Classic Patterson & Hennessy 5-stage RISC pipeline with EX-to-EX/MEM-to-EX forwarding, load-use hazard stall unit, custom Python assembler, and Artix-7 FPGA synthesis (2,810 LUTs, 94 mW power, 0 DRC violations).</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/mips-32bit-pipelined-processor" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">🌌</div>
                  <div class="li-proj-details">
                    <h4>Neural Image Caption Studio: Deep Learning Multimodal AI</h4>
                    <p class="li-proj-meta">Launched Oct 17, 2026 • PyTorch, CNN (MobileNetV3/ResNet-50) + LSTM, Beam Search</p>
                    <p class="li-proj-desc">Multimodal computer vision and NLP app translating visual scenes into English captions. Features dual decoding (Greedy vs. Beam Search alpha=0.7), token-level softmax inspection tray, and BLEU metric lab.</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/image-caption-generator" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">🛡️</div>
                  <div class="li-proj-details">
                    <h4>ReturnGuard: Autonomous ReAct E-Commerce AI Refund Agent</h4>
                    <p class="li-proj-meta">Launched Oct 17, 2026 • Python, FastAPI, React 18, Autonomous Agents, Multimodal CV</p>
                    <p class="li-proj-desc">Governed ReAct cognitive loop (Thought -> Action -> Observe) verifying order states, evaluating defect photos with vision AI, and enforcing anti-fraud rules with a Human-in-the-Loop review desk.</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/Return-Guard" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">💳</div>
                  <div class="li-proj-details">
                    <h4>FraudGuard.AI: Real-Time Credit Card Fraud Detection Platform</h4>
                    <p class="li-proj-meta">Launched Sep 30, 2026 • Python, FastAPI, XGBoost, Scikit-Learn & Explainable AI (XAI)</p>
                    <p class="li-proj-desc">Evaluates transaction risk under extreme class imbalance with 100% recall and PR-AUC 1.000, sub-10ms latency, geo-velocity impossible travel calculation, and automated tiered action routing (Approve, Challenge, Decline & Freeze).</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/credit-card-fraud-detection" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">🔒</div>
                  <div class="li-proj-details">
                    <h4>Cloud DLP Shield: Detecting Data Leaks Using SQL & Cloud DLP Architecture</h4>
                    <p class="li-proj-meta">Launched Sep 30, 2026 • JavaScript, Node.js, Cloud Security, AES-256-GCM & Live SSE SOC</p>
                    <p class="li-proj-desc">Dual-engine security combining AST Content Inspection (SQLi prevention, Luhn card verification) and Contextual Behavioral Analytics (sub-15ms typing cadence), with AESX field encryption and deceptive Honeypot Decoy Tokens.</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/detecting-data-leaks" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">⚡</div>
                  <div class="li-proj-details">
                    <h4>SplitFlow: Smart Group Expense Splitter & Settlement Engine</h4>
                    <p class="li-proj-meta">Launched Sep 29, 2026 • JavaScript, OCR Scanner, Live FX Rates & QR Payments</p>
                    <p class="li-proj-desc">Automated greedy debt minimization graph reducing multi-person circular debts, OCR itemized receipt parsing, and real-time multi-currency settlement links.</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/splitflow" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">📊</div>
                  <div class="li-proj-details">
                    <h4>PulseFlow Agile: Enterprise Project Management & Telemetry</h4>
                    <p class="li-proj-meta">Launched Sep 29, 2026 • JavaScript, WebSockets, D3.js & AI Copilot</p>
                    <p class="li-proj-desc">Real-time collaborative Kanban with WebSocket synchronization, mathematical D3.js sprint burndown analytics, AI user story generation, and interactive Gantt roadmap.</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/pulseflow-agile" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>

                <div class="li-project-item">
                  <div class="li-proj-icon">🛡️</div>
                  <div class="li-proj-details">
                    <h4>BitTrace DFIR: Automated Live & Postmortem Bitcoin Forensics</h4>
                    <p class="li-proj-meta">Launched Sep 21, 2026 • Python, FastAPI, React & ISO/IEC 27037</p>
                    <p class="li-proj-desc">Automated volatile RAM inspection (BIP-39 mnemonic recovery, WIF keys), Berkeley DB wallet.dat parsing, ROT13 UserAssist decoding, and court-ready audit reports.</p>
                    <div class="li-proj-links">
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
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
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
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
                      <a href="${o.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
                      <a href="https://github.com/abhishek947kumar/Logistics-Management-System" target="_blank" class="li-link-gh">GitHub Repo &rarr;</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems")||e.includes("BitTrace")?`
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
      `:e.includes("doi.org")||e.includes("IEMENTech")?`
        <div class="safari-web-page ieee-page">
          <div class="page-card ieee-card">
            <div class="ieee-header">
              <span class="ieee-badge">IEEE Xplore Digital Library</span>
              <span class="ieee-conf">IEMENTECH 2026</span>
            </div>
            <h2>${o.publications[0].title}</h2>
            <div class="ieee-meta">
              <p><strong>Authors:</strong> Abhishek Kumar et al.</p>
              <p><strong>Conference:</strong> 2026 8th International Conference on Electronics, Materials Engineering & Nano-Technology (IEMENTech)</p>
              <p><strong>Electronic ISBN:</strong> 10.1109/IEMENTech202669403.2026.11434403</p>
            </div>
            <hr class="ieee-line" />
            <div class="ieee-abstract">
              <h4>Abstract:</h4>
              <p>${o.publications[0].summary}</p>
            </div>
            <div class="ieee-actions">
              <a href="${o.publications[0].link}" target="_blank" class="ieee-download-btn">Read on IEEE Xplore Official Portal</a>
            </div>
          </div>
        </div>
      `:e.includes("Embedded-Night-Vision-System")?`
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
      `:e.includes("Logistics-Management-System")?`
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
      `:e.includes("mips-32bit-pipelined-processor")||e.includes("mips")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">⚡</span>
              <h3>abhishek947kumar / <strong>mips-32bit-pipelined-processor</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">Custom 32-bit 5-stage pipelined MIPS processor core in Verilog with hazard detection, forwarding, custom Python assembler, and Xilinx Vivado synthesis on Artix-7 (Basys 3).</p>
            <div class="gh-meta-row">
              <span>💎 Verilog HDL</span>
              <span>⚙️ Xilinx Vivado 2019.2+</span>
              <span>⚡ Artix-7 Basys 3 FPGA</span>
              <span>⭐ Latest Release (Oct 23, 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Pipelined Microarchitecture:</strong> Classic Patterson & Hennessy 5-stage datapath (IF -> ID -> EX -> MEM -> WB) with EX-to-EX and MEM-to-EX data forwarding (zero stalls on ALU RAW dependencies) and hardware load-use hazard bubble insertion.</p>
              <p><strong>Vivado Synthesis & Power:</strong> Synthesized for XC7A35TCPG236-1 utilizing 2,810 Slice LUTs (13.51%), 1,569 FFs (3.77%), drawing only 94 mW total on-chip power with zero DRC violations.</p>
              <p><strong>Python Cross-Assembler & Verification:</strong> Custom two-pass assembler translating assembly to MIF machine code with 4/4 passing benchmark suites (Fibonacci, ALU, memory, hazards) and 7-segment display driver.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/mips-32bit-pipelined-processor" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("image-caption-generator")||e.includes("caption")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">🌌</span>
              <h3>abhishek947kumar / <strong>image-caption-generator</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">Full-stack AI Image Caption Generator using Deep Learning (CNN Feature Extractor + LSTM Language Decoder) with PyTorch, FastAPI, and an interactive Cyber-Neural Web Studio.</p>
            <div class="gh-meta-row">
              <span>🔥 PyTorch 2.0+</span>
              <span>🐍 Python 3.10+</span>
              <span>⚡ FastAPI & Docker</span>
              <span>⭐ Latest Release (Oct 17, 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Multimodal Architecture:</strong> Merged Show & Tell framework combining pre-trained CNN backbones (MobileNetV3 / ResNet-50) with an autoregressive LSTM decoder trained on Flickr8k.</p>
              <p><strong>Dual Decoding Strategies:</strong> Fast deterministic greedy argmax search alongside multi-hypothesis Beam Search with length penalty normalization (alpha = 0.7).</p>
              <p><strong>Interactive Cyber-Neural Studio:</strong> Token-level softmax probability inspector tray, Web Speech API TTS, and BLEU-1 to BLEU-4 benchmark lab with offline feature vector caching.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/image-caption-generator" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("Return-Guard")||e.includes("returnguard")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">🛡️</span>
              <h3>abhishek947kumar / <strong>Return-Guard</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">Autonomous ReAct (Reasoning and Acting) AI agent for e-commerce return verification, multimodal computer vision damage inspection, and automated refund/escalation workflows.</p>
            <div class="gh-meta-row">
              <span>🧠 ReAct Architecture</span>
              <span>📸 Multimodal Vision</span>
              <span>⚡ FastAPI + React 18</span>
              <span>⭐ Latest Release (Oct 17, 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Autonomous ReAct Core:</strong> Governed cognitive loop (Thought -> Action -> Observe) with tool telemetry resolving legitimate returns in under 850ms with ~81% throughput.</p>
              <p><strong>Multimodal Defect Inspection:</strong> Evaluates customer defect photos (screen damage, broken seals) before return authorization.</p>
              <p><strong>Anti-Fraud & Governance:</strong> Multi-dimensional fraud prevention (wardrobing, empty-box claims) with a $500 hard safety ceiling and Human-in-the-Loop review console.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/Return-Guard" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("license-plate-recognition")||e.includes("platevision")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">🚗</span>
              <h3>abhishek947kumar / <strong>license-plate-recognition</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">End-to-end Automatic License Plate Recognition (ALPR) system with an 8-stage OpenCV pipeline, Tesseract OCR ensemble, FastAPI visualizer, and CLI.</p>
            <div class="gh-meta-row">
              <span>👁️ OpenCV 4.8+</span>
              <span>🔍 Tesseract 5.x</span>
              <span>⚡ FastAPI REST API</span>
              <span>⭐ Latest Release (Oct 05, 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>8-Stage CV Pipeline:</strong> Bilateral Filtering, Morphological TopHat/BlackHat, Canny edge detection, Aspect Ratio & Solidity filters, and Perspective Transform / Deskewing.</p>
              <p><strong>Multi-PSM OCR Ensemble:</strong> Queries Tesseract OCR across modes (--psm 8, 7, 6) with character whitelisting and regex sanitization.</p>
              <p><strong>Interactive Web Dashboard:</strong> Real-time stage inspector, video/webcam live stream processing, and Docker deployment.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/license-plate-recognition" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("credit-card-fraud-detection")||e.includes("fraudguard")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">💳</span>
              <h3>abhishek947kumar / <strong>credit-card-fraud-detection</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">Enterprise Real-Time Credit Card Fraud Detection AI Platform with Sub-10ms Latency & Explainable AI (FastAPI + XGBoost).</p>
            <div class="gh-meta-row">
              <span>🐍 Python 3.13+</span>
              <span>⚡ FastAPI & XGBoost</span>
              <span>🔍 Explainable AI (XAI)</span>
              <span>⭐ Latest Release (Sep 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Sub-10ms Scoring & Ensemble Benchmark:</strong> Evaluates transactions under extreme class imbalance (~1% fraud prevalence) with cost-weighted XGBoost, Balanced Random Forest, and Isolation Forest achieving 100% recall and 1.000 PR-AUC.</p>
              <p><strong>Geo-Velocity Calculation:</strong> Calculates travel velocity in km/h between successive transactions to immediately flag impossible physical teleportation (card cloning).</p>
              <p><strong>Automated Tiered Actions:</strong> Automated routing policies: AUTO_APPROVE (<25%), STEP_UP_AUTH (25-65% OTP / 3D Secure challenge), and DECLINE_AND_FREEZE (>65% risk with automated card lock).</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/credit-card-fraud-detection" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("detecting-data-leaks")||e.includes("cloud-dlp")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">🔒</span>
              <h3>abhishek947kumar / <strong>detecting-data-leaks</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">Cloud DLP system detecting SQL injections and data leaks via Content Inspection, Contextual Behavioral Analysis, and AESX Authenticated Field-Level Encryption.</p>
            <div class="gh-meta-row">
              <span>🟡 JavaScript / Node.js</span>
              <span>🛡️ Dual-Engine Cloud DLP</span>
              <span>🔐 AES-256-GCM AuthTag</span>
              <span>⭐ Latest Release (Sep 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Dual-Engine Inspection Gateway:</strong> Layer 1 Content Engine intercepts SQL injection AST attacks, validates credit cards with mathematical Luhn algorithm, and neutralizes keyloggers; Layer 2 Contextual Engine tracks sub-15ms typing cadence and query burst velocity.</p>
              <p><strong>AESX Field Encryption:</strong> Zero-trust database vault utilizing AES-256-GCM with key whitening, IV randomness, and tamper-resistant 128-bit authentication tags.</p>
              <p><strong>Threat Categorization & Honeypots:</strong> Real-time risk categorization (Benign, Suspicious, Assaulter), serving deceptive Honeypot Decoy Tokens to assaulters.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/detecting-data-leaks" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("splitflow")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">⚡</span>
              <h3>abhishek947kumar / <strong>splitflow</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">⚡ A modern group expense splitter with live multi-currency rates, flexible splits, OCR receipt scanner, visual debt graph, and payment QR codes.</p>
            <div class="gh-meta-row">
              <span>🟡 JavaScript (ES6 Modules)</span>
              <span>📷 Tesseract OCR</span>
              <span>⭐ Latest Release (Sep 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Greedy Debt Simplification:</strong> Graph-theoretic algorithm consolidating circular group IOUs into the minimum possible transactions with visual Canvas flow diagram.</p>
              <p><strong>OCR Receipt Ingestion:</strong> Optical character recognition parsing scanned receipts to automatically populate line items, tax, and discretionary tips.</p>
              <p><strong>Multi-Currency FX & UPI QR:</strong> Live foreign exchange rate caching with instant dynamic UPI and settlement QR codes.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/splitflow" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:e.includes("pulseflow-agile")||e.includes("pulseflow")?`
        <div class="safari-web-page gh-repo-page">
          <div class="page-card gh-card">
            <div class="gh-repo-header">
              <span class="gh-icon">📊</span>
              <h3>abhishek947kumar / <strong>pulseflow-agile</strong></h3>
              <span class="gh-public-tag">Public</span>
            </div>
            <p class="gh-repo-desc">⚡ Enterprise Agile Project Management Platform with Real-Time WebSockets, D3.js Sprint Burndown, AI Copilot, Gantt Roadmap, and Multi-Theme Engine.</p>
            <div class="gh-meta-row">
              <span>🟡 JavaScript</span>
              <span>🔌 Real-Time WebSockets</span>
              <span>📈 D3.js Analytics</span>
              <span>⭐ Latest Release (Sep 2026)</span>
            </div>
            <div class="gh-readme-box">
              <h4>README.md</h4>
              <p><strong>Real-Time Sync:</strong> Bi-directional WebSocket channels broadcasting Kanban task transitions, assignments, and comments with zero layout shift.</p>
              <p><strong>D3.js Burndown Engine:</strong> Mathematical sprint burndown curves, team velocity distributions, and cumulative flow velocity tracking.</p>
              <p><strong>AI Copilot Integration:</strong> Automatic acceptance criteria generation, sprint risk assessment, and smart task estimation.</p>
              <div class="gh-actions-row">
                <a href="https://github.com/abhishek947kumar/pulseflow-agile" target="_blank" class="gh-open-btn">View Full Code & Repository on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      `:`
      <div class="safari-web-page gh-profile-page">
        <div class="page-card gh-card">
          <div class="gh-profile-head">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="gh-big-avatar" />
            <div class="gh-profile-text">
              <h2>Abhishek Kumar</h2>
              <p class="gh-sub">abhishek947kumar • Class of 2027 ECE Undergrad</p>
              <p>${o.personal.summary}</p>
              <a href="https://github.com/abhishek947kumar" target="_blank" class="gh-open-btn">Visit GitHub Profile</a>
            </div>
          </div>

          <div class="gh-pinned-repos">
            <h4>Pinned & Recent Repositories (Latest Releases)</h4>
            <div class="gh-pinned-grid">
              <div class="gh-pin-card">
                <h5>credit-card-fraud-detection</h5>
                <p>Real-time fraud prevention with XGBoost ensemble, sub-10ms scoring & Explainable AI.</p>
                <span class="pin-lang">Python & FastAPI</span>
              </div>
              <div class="gh-pin-card">
                <h5>detecting-data-leaks</h5>
                <p>Cloud DLP system with AST SQLi detection, Luhn validation & AESX field encryption.</p>
                <span class="pin-lang">JavaScript & Node.js</span>
              </div>
              <div class="gh-pin-card">
                <h5>splitflow</h5>
                <p>Modern group expense splitter with OCR receipt scanner, visual debt graph & FX rates.</p>
                <span class="pin-lang">JavaScript & FinTech</span>
              </div>
              <div class="gh-pin-card">
                <h5>pulseflow-agile</h5>
                <p>Enterprise Agile workspace with real-time WebSockets, D3.js burndown & AI Copilot.</p>
                <span class="pin-lang">JavaScript & D3.js</span>
              </div>
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
    `}navigateTo(e,t){this.currentUrl=e,this.history.push(e),this.historyIndex=this.history.length-1;const i=t.querySelector("#safari-address-input"),a=t.querySelector("#safari-external-link"),n=t.querySelector("#safari-viewport-content");i&&(i.value=e),a&&(a.href=e),n&&(n.innerHTML=this.renderPageContent(e))}initListeners(e){const t=e.querySelectorAll(".safari-bookmark"),i=e.querySelector("#safari-back"),a=e.querySelector("#safari-forward"),n=e.querySelector("#safari-refresh");t.forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-url");r&&this.navigateTo(r,e)})}),i&&i.addEventListener("click",()=>{if(this.historyIndex>0){this.historyIndex-=1;const s=this.history[this.historyIndex];this.navigateTo(s,e)}}),a&&a.addEventListener("click",()=>{if(this.historyIndex<this.history.length-1){this.historyIndex+=1;const s=this.history[this.historyIndex];this.navigateTo(s,e)}}),n&&n.addEventListener("click",()=>{const s=e.querySelector("#safari-viewport-content");s&&(s.style.opacity="0.5",setTimeout(()=>{s.innerHTML=this.renderPageContent(this.currentUrl),s.style.opacity="1"},300))})}}class ne{constructor(){this.history=[],this.historyIndex=-1}render(){return`
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
    `}executeCommand(e,t){const i=e.trim().toLowerCase(),a=i.split(" "),n=a[0],s=document.createElement("div");if(s.className="term-line term-cmd-echo",s.innerHTML=`<span class="prompt-user">abhishek@macbook-pro</span><span class="prompt-separator">:</span><span class="prompt-path">~</span><span class="prompt-symbol">%</span> ${this.escapeHTML(e)}`,t.appendChild(s),!i)return;let r="";switch(n){case"help":r=`
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
</div>`;break;case"whoami":r=`
<div class="term-box">
  <span class="term-bold">${o.personal.name}</span> (${o.personal.tagline})<br>
  📍 ${o.personal.location}<br>
  🎓 CGPA: 8.73 in B.Tech ECE (Institute of Engineering & Management, Kolkata)<br>
  ⚡ Published IEEE Author (IEMENTECH 2026) | VLSI Intern (Jadavpur Univ) | FPGA Core Designer | Automation Trainee (SAIL)<br>
  💼 Target: VLSI / FPGA Design, Embedded Software, Firmware, Deep Learning & Systems Roles.
</div>`;break;case"skills":r=`
<div class="term-section-title">=== TECHNICAL SKILLS & PROJECT PROFICIENCY ===</div>
<br>
<span class="term-bold">Programming Languages:</span><br>
• Python           [====================] 96% (PyTorch, Deep Learning, FastAPI, OpenCV, Forensics)<br>
• Verilog HDL      [=================== ] 94% (5-Stage Pipelined MIPS, Hazard Unit, Forwarding)<br>
• C / C++          [=================== ] 92% (Bare-Metal Systems, Vivado FSM, Assembler Engine)<br>
• Embedded C       [=================== ] 91% (Microcontrollers, Firmware, Sensors, Wokwi)<br>
• JS / TypeScript  [=================== ] 90% (Node.js, Express, React, WebSockets, D3.js)<br>
• SQL              [==================  ] 88% (PostgreSQL, SQLite, AST SQLi Defense)<br>
• MATLAB           [=================   ] 85% (Simulation & Signal Modeling)<br>
<br>
<span class="term-bold">Project-Validated Engineering Domains:</span><br>
• <span class="term-cmd">Embedded & VLSI (96%):</span> Synthesizable 32-Bit 5-Stage MIPS Core, Hazard Unit & Forwarding, Xilinx Vivado (Artix-7 Basys 3 FPGA, 94 mW), ARM/AVR/ESP Microcontrollers, SPI/I2C/UART/GPIO, Wokwi<br>
• <span class="term-cmd">AI & Machine Learning (95%):</span> PyTorch CNN+LSTM Captioning, Beam Search, Autonomous ReAct Agents (Gemini AI), OpenCV ALPR Pipeline, Cost-Weighted XGBoost, Explainable AI (SHAP), YOLOv2<br>
• <span class="term-cmd">Cloud Security & DFIR (94%):</span> Cloud DLP Architecture, AST SQLi Interception, AES-256-GCM Zero-Trust, Live RAM Forensics, ISO/IEC 27037 (Cloud DLP Shield, BitTrace DFIR)<br>
• <span class="term-cmd">FinTech & Real-Time (92%):</span> Greedy Debt Graph Simplification, Bidirectional WebSockets, Server-Sent Events, D3.js Burndown, OCR Parsing (SplitFlow, PulseFlow Agile)<br>
<br>
<span class="term-bold">Frameworks, Tools & Platforms:</span><br>
Xilinx Vivado, Basys 3 FPGA, PyTorch, OpenCV, Tesseract OCR, FastAPI, Node.js, Express, React 18, D3.js, Wokwi Simulator, Docker, Git/GitHub, CI/CD, PostgreSQL, SQLite, Linux/Bash.`;break;case"projects":r=`
<div class="term-section-title">=== NOTABLE ENGINEERING PROJECTS ===</div>
<br>
${o.projects.map((l,c)=>`
<div class="term-proj-item">
  <span class="term-cmd">${c+1}. ${l.title}</span> [${l.badge}]<br>
  &nbsp;&nbsp;Tech: ${l.tags.join(", ")}<br>
  &nbsp;&nbsp;Desc: ${l.description}<br>
  &nbsp;&nbsp;Link: <a href="${l.githubUrl}" target="_blank" class="term-link">${l.githubUrl}</a>
</div>
`).join("<br>")}`;break;case"education":r=`
<div class="term-section-title">=== ACADEMIC CREDENTIALS ===</div>
<br>
${o.education.map(l=>`
<div>
  <span class="term-bold">${l.institution}</span> (${l.location})<br>
  ${l.degree} | ${l.duration}<br>
  <span class="term-highlight">${l.score}</span>
</div>
`).join("<br>")}`;break;case"internships":r=`
<div class="term-section-title">=== INDUSTRIAL INTERNSHIPS ===</div>
<br>
${o.internships.map(l=>`
<div>
  <span class="term-bold">${l.role}</span> — ${l.organization} (${l.location})<br>
  Duration: ${l.duration} | Type: ${l.type}<br>
  ${l.points.map(c=>`• ${c}`).join("<br>")}<br>
  Skills: ${l.skillsUsed.join(", ")}
</div>
`).join("<br>")}`;break;case"publications":r=`
<div class="term-section-title">=== IEEE PUBLICATIONS ===</div>
<br>
<span class="term-bold">${o.publications[0].venue}</span><br>
Title: "${o.publications[0].title}"<br>
Status: ${o.publications[0].status}<br>
DOI: <a href="${o.publications[0].link}" target="_blank" class="term-link">${o.publications[0].doi}</a><br>
Summary: ${o.publications[0].summary}`;break;case"hire":r=`
<div class="term-section-title">=== WHY HIRE ABHISHEK KUMAR? ===</div>
<br>
${o.placementPitch.keyStrengths.map((l,c)=>`${c+1}. ${l}`).join("<br><br>")}
<br><br>
<span class="term-highlight">Immediate Placement Availability. Prepared for technical and algorithmic rounds.</span>`;break;case"contact":r=`
<div class="term-box">
  <span class="term-bold">Get In Touch with Abhishek Kumar:</span><br>
  🌐 Portfolio: <a href="${o.personal.portfolio}" target="_blank" class="term-link">${o.personal.portfolio}</a><br>
  📧 Email: <a href="mailto:${o.personal.email}" class="term-link">${o.personal.email}</a><br>
  📞 Phone: ${o.personal.phone}<br>
  💼 LinkedIn: <a href="${o.personal.linkedin}" target="_blank" class="term-link">${o.personal.linkedin}</a><br>
  🐙 GitHub: <a href="${o.personal.github}" target="_blank" class="term-link">${o.personal.github}</a><br>
  📍 Address: ${o.personal.address}
</div>`;break;case"cat":a[1]==="resume"||a[1]==="resume.txt"||a[1]==="resume.pdf"?r=`
<div class="term-cat-resume">
============================================================<br>
ABHISHEK KUMAR<br>
${o.personal.address} | ${o.personal.phone}<br>
${o.personal.email} | ${o.personal.linkedin}<br>
============================================================<br>
ABOUT ME:<br>
${o.personal.summary}<br><br>
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
Verilog HDL, 5-Stage MIPS Vivado FPGA, PyTorch CNN-LSTM, OpenCV, ReAct AI, Embedded C, C++, Python, Microcontrollers, Wokwi, Git, Docker, Linux.
</div>`:r=`cat: ${a[1]||"file"}: No such file or directory. Try 'cat resume'.`;break;case"clear":t.innerHTML="";return;case"neofetch":r=`
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
   <span class="nf-apple">  .XMMMMMMMMMMMMMMMMMMMMMMMMk   </span> <span class="nf-bold">Proficiency:</span> Verilog HDL, PyTorch, C++, Python
   <span class="nf-apple">    .cooollllllccccllllllol.    </span>
</pre>`;break;default:r=`zsh: command not found: ${this.escapeHTML(n)}. Type '<span class="term-highlight">help</span>' for a list of commands.`;break}if(r){const l=document.createElement("div");l.className="term-line term-response",l.innerHTML=r,t.appendChild(l)}}escapeHTML(e){return e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}initListeners(e){const t=e.querySelector("#terminal-input"),i=e.querySelector("#terminal-output"),a=e.querySelector("#terminal-body");a.addEventListener("click",()=>{t.focus()}),t.addEventListener("keydown",n=>{if(n.key==="Enter"){const s=t.value;s.trim()&&(this.history.push(s),this.historyIndex=this.history.length),this.executeCommand(s,i),t.value="",a.scrollTop=a.scrollHeight}else n.key==="ArrowUp"?(n.preventDefault(),this.history.length>0&&this.historyIndex>0&&(this.historyIndex-=1,t.value=this.history[this.historyIndex]||"")):n.key==="ArrowDown"&&(n.preventDefault(),this.historyIndex<this.history.length-1?(this.historyIndex+=1,t.value=this.history[this.historyIndex]||""):(this.historyIndex=this.history.length,t.value=""))})}}const oe="abhishek947kumar",N="agy_portfolio_repos_cache",q="agy_portfolio_events_cache",re=10*60*1e3;class le{constructor(){this.username=oe,this.listeners=[]}onUpdate(e){this.listeners.push(e)}notifyListeners(e){this.listeners.forEach(t=>t(e))}async fetchUserData(){try{const e=await fetch(`https://api.github.com/users/${this.username}`);if(e.ok)return await e.json()}catch(e){console.warn("Could not fetch GitHub user profile:",e)}return{login:this.username,name:o.personal.name,avatar_url:"https://avatars.githubusercontent.com/u/153946376?v=4",html_url:`https://github.com/${this.username}`,public_repos:18,followers:1,following:3,bio:o.personal.tagline}}async fetchRepositories(e=!1){if(!e){const t=this.getCached(N);if(t)return t}try{const t=await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100`);if(t.ok){const i=await t.json(),a=this.processRepos(i);return this.setCached(N,a),this.notifyListeners({type:"repos",data:a}),a}}catch(t){console.warn("Error fetching live GitHub repositories, using fallback:",t)}return this.getFallbackRepos()}async fetchEvents(e=!1){if(!e){const t=this.getCached(q);if(t)return t}try{const t=await fetch(`https://api.github.com/users/${this.username}/events?per_page=30`);if(t.ok){const i=await t.json(),a=this.processEvents(i);return this.setCached(q,a),this.notifyListeners({type:"events",data:a}),a}}catch(t){console.warn("Error fetching live GitHub events, using fallback:",t)}return this.getFallbackEvents()}processRepos(e){const t=new Date,i=new Date(t.getFullYear(),t.getMonth()-6,t.getDate());return e.map(a=>{const n=new Date(a.updated_at),s=n>=i;return{id:a.id,name:a.name,fullName:a.full_name,description:a.description||"No description provided.",url:a.html_url,language:a.language||"Code",stars:a.stargazers_count,forks:a.forks_count,openIssues:a.open_issues_count,updatedAt:a.updated_at,updatedFormatted:n.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),isLast6Months:s,topics:a.topics||[]}})}processEvents(e){return e.slice(0,15).map(t=>{var l,c,d,p,u,h,g,v;const a=new Date(t.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),n=t.repo?t.repo.name.replace(`${this.username}/`,""):"Repository";let s="Activity on repository",r="git-commit";if(t.type==="PushEvent"){const b=((c=(l=t.payload)==null?void 0:l.commits)==null?void 0:c.length)||1,k=((u=(p=(d=t.payload)==null?void 0:d.commits)==null?void 0:p[0])==null?void 0:u.message)||"Code update";s=`Pushed ${b} commit(s): "${k.length>50?k.substring(0,50)+"...":k}"`,r="git-push"}else t.type==="CreateEvent"?(s=`Created ${((h=t.payload)==null?void 0:h.ref_type)||"resource"} ${((g=t.payload)==null?void 0:g.ref)||n}`,r="plus-circle"):t.type==="WatchEvent"&&(s=`Starred repository ${n}`,r="star");return{id:t.id,type:t.type,repo:n,repoUrl:`https://github.com/${((v=t.repo)==null?void 0:v.name)||this.username}`,date:a,rawDate:t.created_at,description:s,icon:r}})}getCached(e){try{const t=localStorage.getItem(e);if(!t)return null;const i=JSON.parse(t);if(Date.now()-i.timestamp<re)return i.data}catch{}return null}setCached(e,t){try{localStorage.setItem(e,JSON.stringify({timestamp:Date.now(),data:t}))}catch{}}getFallbackRepos(){return[{id:1430565363,name:"mips-32bit-pipelined-processor",fullName:"abhishek947kumar/mips-32bit-pipelined-processor",description:"⚡ Custom 32-bit 5-stage pipelined MIPS processor core in Verilog with hazard detection, forwarding, custom Python assembler, and Xilinx Vivado synthesis on Artix-7 (Basys 3).",url:"https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",language:"Verilog",stars:0,forks:0,updatedFormatted:"Oct 23, 2026",isLast6Months:!0,topics:["mips","verilog","vivado","fpga","basys3","processor","pipelining","computer-architecture"]},{id:1422992846,name:"image-caption-generator",fullName:"abhishek947kumar/image-caption-generator",description:"🌌 Full-stack AI Image Caption Generator using Deep Learning (CNN Feature Extractor + LSTM Language Decoder) with PyTorch, FastAPI, and an interactive Cyber-Neural Web Studio.",url:"https://github.com/abhishek947kumar/image-caption-generator",language:"Python",stars:0,forks:0,updatedFormatted:"Oct 17, 2026",isLast6Months:!0,topics:["deep-learning","pytorch","image-captioning","lstm","fastapi","computer-vision","nlp","beam-search"]},{id:1422962824,name:"Return-Guard",fullName:"abhishek947kumar/Return-Guard",description:"🛡️ Autonomous ReAct (Reasoning and Acting) AI agent for e-commerce return verification, multimodal computer vision damage inspection, and automated refund/escalation workflows.",url:"https://github.com/abhishek947kumar/Return-Guard",language:"JavaScript",stars:0,forks:0,updatedFormatted:"Oct 17, 2026",isLast6Months:!0,topics:["ai-agent","react-agent","fastapi","multimodal-vision","ecommerce","refunds","governance"]},{id:1406033578,name:"license-plate-recognition",fullName:"abhishek947kumar/license-plate-recognition",description:"🚗 End-to-end Automatic License Plate Recognition (ALPR) system with an 8-stage OpenCV pipeline, Tesseract OCR ensemble, FastAPI visualizer, and CLI.",url:"https://github.com/abhishek947kumar/license-plate-recognition",language:"Python",stars:0,forks:0,updatedFormatted:"Oct 05, 2026",isLast6Months:!0,topics:["opencv","alpr","anpr","tesseract-ocr","fastapi","computer-vision","image-processing"]},{id:1397001001,name:"detecting-data-leaks",fullName:"abhishek947kumar/detecting-data-leaks",description:"🛡️ Cloud DLP system detecting SQL injections and data leaks via Content Inspection, Contextual Behavioral Analysis, and AESX Authenticated Field-Level Encryption.",url:"https://github.com/abhishek947kumar/detecting-data-leaks",language:"JavaScript",stars:0,forks:0,updatedFormatted:"Sep 30, 2026",isLast6Months:!0,topics:["cloud-security","dlp","sqli-detection","aes-256-gcm","data-loss-prevention","honeytokens"]},{id:1397002002,name:"credit-card-fraud-detection",fullName:"abhishek947kumar/credit-card-fraud-detection",description:"💳 Enterprise Real-Time Credit Card Fraud Detection AI Platform with Sub-10ms Latency & Explainable AI (XGBoost + FastAPI).",url:"https://github.com/abhishek947kumar/credit-card-fraud-detection",language:"Python",stars:0,forks:0,updatedFormatted:"Sep 30, 2026",isLast6Months:!0,topics:["fraud-detection","xgboost","fastapi","machine-learning","explainable-ai","fintech"]},{id:1396154535,name:"splitflow",fullName:"abhishek947kumar/splitflow",description:"⚡ A modern group expense splitter with live multi-currency rates, flexible splits, OCR receipt scanner, visual debt graph, and payment QR codes.",url:"https://github.com/abhishek947kumar/splitflow",language:"JavaScript",stars:0,forks:0,updatedFormatted:"Sep 29, 2026",isLast6Months:!0,topics:["expense-splitter","ocr-scanner","debt-graph","fintech","currency-converter","qr-payments"]},{id:1395897468,name:"pulseflow-agile",fullName:"abhishek947kumar/pulseflow-agile",description:"⚡ Enterprise Agile Project Management Platform with Real-Time WebSockets, D3.js Sprint Burndown, AI Copilot, Gantt Roadmap, and Multi-Theme Engine.",url:"https://github.com/abhishek947kumar/pulseflow-agile",language:"JavaScript",stars:0,forks:0,updatedFormatted:"Sep 29, 2026",isLast6Months:!0,topics:["agile","scrum","kanban","websockets","d3js","sprint-burndown","ai-copilot","gantt"]},{id:0,name:"Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",fullName:"abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",description:"BitTrace DFIR: Automated live volatile memory (RAM) and postmortem disk/registry analysis tool for Bitcoin on Windows systems with ISO/IEC 27037 chain of custody.",url:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",language:"Python",stars:1,forks:0,updatedFormatted:"Sep 21, 2026",isLast6Months:!0,topics:["digital-forensics","bitcoin","fastapi","react","volatile-memory","iso-27037","dfir"]},{id:1,name:"Embedded-Night-Vision-System",fullName:"abhishek947kumar/Embedded-Night-Vision-System",description:"Embedded Night-Vision System for Pedestrian Detection using Active IR and Thermal Sensors with HAAR+AdaBoost and YOLOv2",url:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",language:"Python",stars:1,forks:0,updatedFormatted:"Sep 19, 2026",isLast6Months:!0,topics:["embedded","night-vision","yolov2","infrared","deep-learning"]},{id:2,name:"Logistics-Management-System",fullName:"abhishek947kumar/Logistics-Management-System",description:"Enterprise-Grade Commercial Multi-Dealer & Consumer Logistics Management System in Python & Django.",url:"https://github.com/abhishek947kumar/Logistics-Management-System",language:"Python",stars:1,forks:0,updatedFormatted:"Sep 18, 2026",isLast6Months:!0,topics:["django","logistics","supply-chain","enterprise"]},{id:3,name:"YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",fullName:"abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",description:"Modern financial control center with category budgets, savings milestones, and Google Gemini AI spending analytics.",url:"https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",language:"JavaScript",stars:1,forks:0,updatedFormatted:"Jul 19, 2026",isLast6Months:!0,topics:["finance","gemini-ai","budgeting","expense-tracker"]},{id:4,name:"Evershop",fullName:"abhishek947kumar/Evershop",description:"Modern, TypeScript-first eCommerce platform built with GraphQL and React with modular, customizable architecture.",url:"https://github.com/abhishek947kumar/Evershop",language:"TypeScript",stars:0,forks:0,updatedFormatted:"Aug 5, 2026",isLast6Months:!0,topics:["typescript","react","graphql","ecommerce"]},{id:5,name:"PRODIGY_CS_02",fullName:"abhishek947kumar/PRODIGY_CS_02",description:"Image encryption tool using pixel manipulation: pixel value swapping and mathematical reversible transformations.",url:"https://github.com/abhishek947kumar/PRODIGY_CS_02",language:"Python",stars:1,forks:0,updatedFormatted:"May 20, 2024",isLast6Months:!1,topics:["cryptography","image-encryption","security"]},{id:6,name:"PRODIGY_CS_01",fullName:"abhishek947kumar/PRODIGY_CS_01",description:"Caesar Cipher program to encrypt and decrypt messages by character shifts.",url:"https://github.com/abhishek947kumar/PRODIGY_CS_01",language:"Python",stars:1,forks:0,updatedFormatted:"May 12, 2025",isLast6Months:!1,topics:["cryptography","caesar-cipher"]}]}getFallbackEvents(){return[{id:"evt-mips-1",type:"PushEvent",repo:"mips-32bit-pipelined-processor",repoUrl:"https://github.com/abhishek947kumar/mips-32bit-pipelined-processor",date:"Oct 23, 2026",description:"Pushed: 'Release 32-bit pipelined MIPS core: 5-stage datapath, hazard forwarding & Vivado Artix-7 synthesis'",icon:"git-push"},{id:"evt-caption-1",type:"PushEvent",repo:"image-caption-generator",repoUrl:"https://github.com/abhishek947kumar/image-caption-generator",date:"Oct 17, 2026",description:"Pushed: 'Release Neural Image Caption Studio: PyTorch CNN+LSTM, Beam Search & BLEU benchmark lab'",icon:"git-push"},{id:"evt-returnguard-1",type:"PushEvent",repo:"Return-Guard",repoUrl:"https://github.com/abhishek947kumar/Return-Guard",date:"Oct 17, 2026",description:"Pushed: 'Release ReturnGuard: ReAct cognitive loop, multimodal CV defect inspection & anti-fraud governance'",icon:"git-push"},{id:"evt-alpr-1",type:"PushEvent",repo:"license-plate-recognition",repoUrl:"https://github.com/abhishek947kumar/license-plate-recognition",date:"Oct 05, 2026",description:"Pushed: 'Release PlateVision AI: 8-stage OpenCV ALPR pipeline, multi-PSM Tesseract OCR & dark web studio'",icon:"git-push"},{id:"evt-leaks-1",type:"PushEvent",repo:"detecting-data-leaks",repoUrl:"https://github.com/abhishek947kumar/detecting-data-leaks",date:"Sep 30, 2026",description:"Pushed: 'Release Cloud DLP Shield: Dual-engine AST SQLi detection, Luhn validation & AESX encryption'",icon:"git-push"},{id:"evt-fraud-1",type:"PushEvent",repo:"credit-card-fraud-detection",repoUrl:"https://github.com/abhishek947kumar/credit-card-fraud-detection",date:"Sep 30, 2026",description:"Pushed: 'Release FraudGuard.AI: Real-time XGBoost ensemble, sub-10ms scoring & Explainable AI'",icon:"git-push"},{id:"evt-splitflow-1",type:"PushEvent",repo:"splitflow",repoUrl:"https://github.com/abhishek947kumar/splitflow",date:"Sep 29, 2026",description:"Pushed: 'Release SplitFlow: OCR receipt scanner, greedy debt graph & live FX currency settlement'",icon:"git-push"},{id:"evt-pulseflow-1",type:"PushEvent",repo:"pulseflow-agile",repoUrl:"https://github.com/abhishek947kumar/pulseflow-agile",date:"Sep 29, 2026",description:"Pushed: 'PulseFlow Enterprise Agile: WebSocket sync, D3.js sprint analytics & AI Copilot'",icon:"git-push"},{id:"evt-0",type:"PushEvent",repo:"Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",repoUrl:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",date:"Sep 21, 2026",description:"Pushed 3 commits: 'BitTrace DFIR live memory triage, ROT13 decoder & ISO 27037 ledger'",icon:"git-push"},{id:"evt-0b",type:"CreateEvent",repo:"Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",repoUrl:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",date:"Sep 21, 2026",description:"Created repository 'Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems'",icon:"plus-circle"},{id:"evt-1",type:"PushEvent",repo:"Embedded-Night-Vision-System",repoUrl:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",date:"Sep 19, 2026",description:"Pushed 2 commits: 'Optimized YOLOv2 inference pipeline on embedded edge unit'",icon:"git-push"},{id:"evt-2",type:"PushEvent",repo:"Logistics-Management-System",repoUrl:"https://github.com/abhishek947kumar/Logistics-Management-System",date:"Sep 18, 2026",description:"Pushed 3 commits: 'Enterprise dealer dispatch scheduling & consignment tracking'",icon:"git-push"},{id:"evt-3",type:"CreateEvent",repo:"Logistics-Management-System",repoUrl:"https://github.com/abhishek947kumar/Logistics-Management-System",date:"Sep 18, 2026",description:"Created branch 'main' with multi-dealer logistics architecture",icon:"plus-circle"},{id:"evt-4",type:"PushEvent",repo:"YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",repoUrl:"https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",date:"Jul 19, 2026",description:"Pushed 4 commits: 'Integrated Google Gemini AI for smart wealth recommendations'",icon:"git-push"}]}}const H=new le;class ce{constructor(){this.activeTab="all",this.repos=[],this.events=[],this.customPosts=this.loadCustomPosts(),this.isRefreshing=!1}loadCustomPosts(){try{const e=localStorage.getItem("abhishek_portfolio_custom_posts");if(e)return JSON.parse(e)}catch{}return[]}saveCustomPosts(e){try{localStorage.setItem("abhishek_portfolio_custom_posts",JSON.stringify(e))}catch{}}render(){return`
      <div class="social-app-container">
        <!-- Top Navigation Header -->
        <header class="social-header">
          <div class="social-profile-summary">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="social-avatar" />
            <div class="social-profile-text">
              <div class="profile-name-row">
                <h3>${o.personal.name}</h3>
                <span class="verified-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  Verified Profile
                </span>
              </div>
              <p class="profile-bio">${o.personal.tagline}</p>
                <a href="${o.personal.portfolio}" target="_blank" rel="noreferrer" class="social-tag portfolio" style="background: rgba(0, 112, 243, 0.15); border-color: rgba(0, 112, 243, 0.35); color: #60a5fa;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <span>abhishek947kumar.github.io/portfolio</span>
                </a>
                <a href="${o.personal.github}" target="_blank" rel="noreferrer" class="social-tag github">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span>github.com/abhishek947kumar</span>
                </a>
                <a href="${o.personal.linkedin}" target="_blank" rel="noreferrer" class="social-tag linkedin">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>linkedin.com/in/abhishek947kumar</span>
                </a>
              </div>
            </div>
          </div>

          <div class="social-header-controls">
            <button class="btn-refresh-social" id="btn-refresh-social" title="Refresh Live Data from GitHub API">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-target"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              <span>Refresh Feeds</span>
            </button>
            <button class="btn-new-post" id="btn-open-post-modal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              <span>Broadcast Post</span>
            </button>
          </div>
        </header>

        <!-- Segmented Tab Bar -->
        <div class="social-tabs-bar">
          <button class="soc-tab active" data-tab="all">All Activity Feed</button>
          <button class="soc-tab" data-tab="github">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub Projects & Commits
          </button>
          <button class="soc-tab" data-tab="linkedin">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn Posts & Research
          </button>
          <span class="live-sync-indicator">
            <span class="pulse-dot"></span> Live Sync
          </span>
        </div>

        <!-- Main Feed Scroll Area -->
        <div class="social-content-area" id="social-feed-content">
          <!-- Dynamically Loaded Feed -->
          <div class="feed-loading">Loading live updates from GitHub & LinkedIn...</div>
        </div>

        <!-- Post Creation Modal (Allows Abhishek or user to broadcast new posts that immediately update the portfolio) -->
        <div class="broadcast-modal-backdrop" id="broadcast-modal" style="display: none;">
          <div class="broadcast-dialog">
            <div class="dialog-header">
              <h4>Create & Broadcast Post</h4>
              <button class="btn-dialog-close" id="btn-close-broadcast">&times;</button>
            </div>
            <form id="broadcast-post-form">
              <div class="form-group">
                <label>Platform</label>
                <select id="post-platform-select">
                  <option value="LinkedIn">LinkedIn Post</option>
                  <option value="GitHub">GitHub Project Update</option>
                </select>
              </div>
              <div class="form-group">
                <label>Post Title</label>
                <input type="text" id="post-title-input" placeholder="e.g. Published new optimization module for YOLOv2" required />
              </div>
              <div class="form-group">
                <label>Post Content</label>
                <textarea id="post-content-input" rows="4" placeholder="Write your announcement, engineering achievement, or milestone..." required></textarea>
              </div>
              <div class="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" id="post-tags-input" placeholder="#VLSI, #Embedded, #Python" />
              </div>
              <div class="form-group">
                <label>URL / Link (optional)</label>
                <input type="url" id="post-url-input" placeholder="https://linkedin.com/... or https://github.com/..." />
              </div>
              <div class="dialog-actions">
                <button type="submit" class="btn-submit-post">Publish to Portfolio</button>
                <button type="button" class="btn-cancel-post" id="btn-cancel-broadcast">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `}async loadFeeds(e,t=!1){if(e.querySelector("#social-feed-content")){if(t){const a=e.querySelector("#btn-refresh-social");a==null||a.classList.add("is-refreshing")}try{const[a,n]=await Promise.all([H.fetchRepositories(t),H.fetchEvents(t)]);this.repos=a,this.events=n}catch(a){console.warn("Using fallback feeds:",a),this.repos=H.getFallbackRepos(),this.events=H.getFallbackEvents()}finally{const a=e.querySelector("#btn-refresh-social");a==null||a.classList.remove("is-refreshing"),this.renderFeedItems(e)}}}renderFeedItems(e){const t=e.querySelector("#social-feed-content");if(!t)return;const i=[];this.customPosts.forEach(s=>{i.push({type:"post",platform:s.platform,title:s.title,content:s.content,date:s.date,url:s.url||(s.platform==="LinkedIn"?o.personal.linkedin:o.personal.github),tags:s.tags,isCustom:!0})}),o.socialFeed.forEach(s=>{i.push({type:"post",platform:s.platform,title:s.title,content:s.content,date:s.date,url:s.url,tags:s.tags,isCustom:!1})}),this.events.forEach(s=>{i.push({type:"github-event",platform:"GitHub",title:`${s.repo}: ${s.description}`,content:`Direct repository update pushed to branch main. Repository: ${s.repo}`,date:s.date,url:s.repoUrl,tags:["#GitHubActivity","#LiveCommit"],isEvent:!0})});let a=i;this.activeTab==="github"?a=i.filter(s=>s.platform==="GitHub"):this.activeTab==="linkedin"&&(a=i.filter(s=>s.platform==="LinkedIn"));const n=this.repos.filter(s=>s.isLast6Months);t.innerHTML=`
      ${this.activeTab==="all"||this.activeTab==="github"?`
        <div class="recent-repos-spotlight">
          <div class="spotlight-title-row">
            <span class="spotlight-badge">DYNAMIC GITHUB SYNC</span>
            <h4>Projects Updated in the Last 6 Months</h4>
          </div>
          <div class="spotlight-grid">
            ${n.map(s=>`
              <div class="spotlight-card">
                <div class="spotlight-card-top">
                  <span class="repo-name-text">${s.name}</span>
                  <span class="repo-lang-pill">${s.language}</span>
                </div>
                <p class="repo-desc-text">${s.description}</p>
                <div class="spotlight-card-bottom">
                  <span class="repo-time-text">Updated ${s.updatedFormatted}</span>
                  <a href="${s.url}" target="_blank" rel="noreferrer" class="repo-visit-link">
                    <span>View Repo</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `:""}

      <div class="feed-posts-stream">
        ${a.map(s=>`
          <article class="feed-card platform-${s.platform.toLowerCase()}">
            <div class="feed-card-header">
              <div class="feed-badge-group">
                <span class="platform-icon-pill ${s.platform.toLowerCase()}">
                  ${s.platform==="LinkedIn"?"LinkedIn":"GitHub"}
                </span>
                ${s.isCustom?'<span class="badge-custom-broadcast">New Broadcast</span>':""}
              </div>
              <span class="feed-date">${s.date}</span>
            </div>

            <h4 class="feed-title">${s.title}</h4>
            <p class="feed-content">${s.content}</p>

            ${s.tags&&s.tags.length>0?`
              <div class="feed-tags-row">
                ${s.tags.map(r=>`<span class="feed-tag">${r}</span>`).join("")}
              </div>
            `:""}

            <div class="feed-card-actions">
              <a href="${s.url}" target="_blank" rel="noreferrer" class="feed-action-link">
                <span>View on ${s.platform}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </article>
        `).join("")}
      </div>
    `}initListeners(e){const t=e.querySelectorAll(".soc-tab"),i=e.querySelector("#btn-refresh-social"),a=e.querySelector("#btn-open-post-modal"),n=e.querySelector("#broadcast-modal"),s=e.querySelector("#btn-close-broadcast"),r=e.querySelector("#btn-cancel-broadcast"),l=e.querySelector("#broadcast-post-form");t.forEach(d=>{d.addEventListener("click",()=>{t.forEach(p=>p.classList.remove("active")),d.classList.add("active"),this.activeTab=d.getAttribute("data-tab"),this.renderFeedItems(e)})}),i&&i.addEventListener("click",()=>{this.loadFeeds(e,!0)}),a&&a.addEventListener("click",()=>{n.style.display="flex"});const c=()=>{n.style.display="none"};s&&s.addEventListener("click",c),r&&r.addEventListener("click",c),l&&l.addEventListener("submit",d=>{d.preventDefault();const p=e.querySelector("#post-platform-select").value,u=e.querySelector("#post-title-input").value.trim(),h=e.querySelector("#post-content-input").value.trim(),g=e.querySelector("#post-tags-input").value.trim(),v=e.querySelector("#post-url-input").value.trim(),b=g?g.split(",").map(L=>L.trim().startsWith("#")?L.trim():`#${L.trim()}`):[],A=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),E={id:"custom-"+Date.now(),platform:p,title:u,content:h,date:A,tags:b,url:v};this.customPosts.unshift(E),this.saveCustomPosts(this.customPosts),l.reset(),c(),this.renderFeedItems(e)}),this.loadFeeds(e)}}class de{constructor(e){this.activeSection="general",this.onWallpaperChange=e}render(){return`
      <div class="settings-app-container">
        <!-- Settings Sidebar -->
        <aside class="settings-sidebar">
          <div class="settings-user-card">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek" class="settings-avatar" />
            <div class="settings-user-meta">
              <span class="settings-name">${o.personal.name}</span>
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
          ${this.renderSection("general")}
        </main>
      </div>
    `}renderSection(e){switch(e){case"general":return`
          <div class="settings-section">
            <h3 class="settings-heading">About This Engineer</h3>
            <div class="mac-specs-card">
              <div class="mac-logo-big"></div>
              <div class="mac-specs-list">
                <h4>MacBook Pro 16" — Abhishek Kumar Edition</h4>
                <div class="spec-row">
                  <span class="spec-k">Candidate</span>
                  <span class="spec-v">${o.personal.name}</span>
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
                  <span class="spec-v">${o.personal.location}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">Contact</span>
                  <span class="spec-v">${o.personal.email} | ${o.personal.phone}</span>
                </div>
              </div>
            </div>

            <div class="settings-subgroup">
              <h4>Placement Readiness</h4>
              <p class="settings-desc">${o.personal.summary}</p>
              <div class="target-roles-row">
                <span class="role-pill">VLSI & FPGA Design</span>
                <span class="role-pill">Embedded Software & Firmware</span>
                <span class="role-pill">AI & Deep Learning</span>
                <span class="role-pill">Full Stack & Systems</span>
                <span class="role-pill">IoT Edge Computing</span>
              </div>
            </div>
          </div>
        `;case"typography":const t=C.currentFontId,i=C.currentFontSize,a=C.currentLetterSpacing;return`
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
                <span class="typo-scale-badge" id="settings-font-scale-badge">${i}%</span>
              </div>

              <div class="font-scale-slider-wrap">
                <span class="scale-label small">75% (Compact)</span>
                <input type="range" min="75" max="140" value="${i}" class="typo-range-input" id="settings-font-size-slider" />
                <span class="scale-label large">140% (Large)</span>
              </div>

              <div class="scale-presets-row">
                <button class="preset-pill ${i===85?"active":""}" data-size="85">Compact (85%)</button>
                <button class="preset-pill ${i===100?"active":""}" data-size="100">Default (100%)</button>
                <button class="preset-pill ${i===115?"active":""}" data-size="115">Enhanced (115%)</button>
                <button class="preset-pill ${i===130?"active":""}" data-size="130">High Legibility (130%)</button>
              </div>
            </div>

            <!-- Font Style Families Grid -->
            <div class="typo-families-section">
              <h4>System Font Families</h4>
              <p class="settings-desc">Select a typography aesthetic for the macOS wrapper and windows:</p>

              <div class="font-families-grid">
                ${Object.values($).map(n=>`
                  <div class="font-family-card ${n.id===t?"selected":""}" data-font-id="${n.id}">
                    <div class="font-card-top">
                      <span class="font-name" style="font-family: ${n.fontFamily};">${n.name}</span>
                      <span class="font-category-tag">${n.category}</span>
                    </div>
                    <p class="font-preview-line" style="font-family: ${n.fontFamily};">
                      Abhishek Kumar — B.Tech ECE (8.73 CGPA)
                    </p>
                    <p class="font-desc" style="font-family: ${n.fontFamily};">${n.sample}</p>
                    <div class="font-card-footer">
                      <span class="font-active-status">${n.id===t?"✓ Active Typography":"Click to Apply"}</span>
                    </div>
                  </div>
                `).join("")}
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
                <button class="spacing-btn ${a==="tight"?"active":""}" data-spacing="tight">Tight (-0.02em)</button>
                <button class="spacing-btn ${a==="normal"?"active":""}" data-spacing="normal">Normal (Default)</button>
                <button class="spacing-btn ${a==="wide"?"active":""}" data-spacing="wide">Wide (+0.04em)</button>
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
        `;case"wallpaper":return`
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
        `;case"hardware":return`
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
                  <span class="pin-tag">MIPS-32 Core</span>
                  <span class="pin-tag">Verilog HDL</span>
                  <span class="pin-tag">Artix-7 FPGA</span>
                  <span class="pin-tag">Hazard Unit</span>
                  <span class="pin-tag">PyTorch DL</span>
                  <span class="pin-tag">OpenCV ALPR</span>
                  <span class="pin-tag">GPIO</span>
                  <span class="pin-tag">UART</span>
                  <span class="pin-tag">SPI / I2C</span>
                  <span class="pin-tag">Vivado Timing</span>
                  <span class="pin-tag">Cloud DLP</span>
                  <span class="pin-tag">AES-256-GCM</span>
                  <span class="pin-tag">WebSockets</span>
                  <span class="pin-tag">ReAct AI</span>
                </div>
              </div>
            </div>

            <div class="skills-breakdown-list">
              ${o.skills.domains.map(n=>`
                <div class="domain-meter-row">
                  <div class="domain-info">
                    <span class="domain-name">${n.name}</span>
                    <span class="domain-pct">${n.level}%</span>
                  </div>
                  <div class="meter-bar-track">
                    <div class="meter-bar-fill" style="width: ${n.level}%;"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;case"education":return`
          <div class="settings-section">
            <h3 class="settings-heading">Academic Track Record</h3>
            <div class="education-timeline">
              ${o.education.map(n=>`
                <div class="edu-card">
                  <div class="edu-header">
                    <h4>${n.institution}</h4>
                    <span class="edu-score-badge">${n.score}</span>
                  </div>
                  <p class="edu-degree">${n.degree} (${n.duration})</p>
                  <span class="edu-location">${n.location}</span>
                  <ul class="edu-highlights">
                    ${n.highlights.map(s=>`<li>${s}</li>`).join("")}
                  </ul>
                </div>
              `).join("")}
            </div>
          </div>
        `;case"internships":return`
          <div class="settings-section">
            <h3 class="settings-heading">Industrial Internships & Training</h3>
            <div class="internship-cards-list">
              ${o.internships.map(n=>`
                <div class="intern-card">
                  <div class="intern-head">
                    <div>
                      <h4>${n.role}</h4>
                      <span class="intern-company">${n.organization} (${n.location})</span>
                    </div>
                    <span class="intern-dates">${n.duration}</span>
                  </div>
                  <ul class="intern-bullets">
                    ${n.points.map(s=>`<li>${s}</li>`).join("")}
                  </ul>
                  <div class="intern-skills-used">
                    <strong>Skills Applied:</strong>
                    ${n.skillsUsed.map(s=>`<span class="s-tag">${s}</span>`).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;case"credentials":return`
          <div class="settings-section">
            <h3 class="settings-heading">Research Publications & Honors</h3>
            <div class="credential-box">
              <h4>IEEE Conference Publication</h4>
              <p class="pub-title">"${o.publications[0].title}"</p>
              <p class="pub-venue">${o.publications[0].venue}</p>
              <p class="pub-doi">DOI: <a href="${o.publications[0].link}" target="_blank">${o.publications[0].doi}</a></p>
              <p class="pub-sum">${o.publications[0].summary}</p>
            </div>

            <div class="credential-box">
              <h4>Professional Memberships</h4>
              <ul class="cert-list">
                ${o.activities[0].items.map(n=>`<li>${n}</li>`).join("")}
              </ul>
            </div>

            <div class="credential-box">
              <h4>Industrial Certifications</h4>
              <ul class="cert-list">
                ${o.certifications.map(n=>`<li><strong>${n.title}</strong> — ${n.issuer}</li>`).join("")}
              </ul>
            </div>
          </div>
        `;default:return""}}initListeners(e){const t=e.querySelectorAll(".settings-nav-item"),i=e.querySelector("#settings-main-pane");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(n=>n.classList.remove("active")),a.classList.add("active"),this.activeSection=a.getAttribute("data-section"),i.innerHTML=this.renderSection(this.activeSection),this.attachSectionListeners(i)})}),this.attachSectionListeners(i)}attachSectionListeners(e){const t=e.querySelectorAll(".wp-card");t.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-wallpaper");this.onWallpaperChange&&this.onWallpaperChange(d),t.forEach(p=>p.classList.remove("selected")),c.classList.add("selected")})});const i=e.querySelectorAll(".font-family-card");i.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-font-id");C.setFontStyle(d),i.forEach(h=>{h.classList.remove("selected");const g=h.querySelector(".font-active-status");g&&(g.textContent="Click to Apply")}),c.classList.add("selected");const p=c.querySelector(".font-active-status");p&&(p.textContent="✓ Active Typography"),document.querySelectorAll(".cc-font-pill").forEach(h=>{h.getAttribute("data-font")===d?h.classList.add("active"):h.classList.remove("active")})})});const a=e.querySelector("#settings-font-size-slider"),n=e.querySelector("#settings-font-scale-badge");a&&a.addEventListener("input",c=>{const d=parseInt(c.target.value,10);C.setFontSize(d),n&&(n.textContent=`${d}%`),e.querySelectorAll(".preset-pill").forEach(g=>{g.classList.toggle("active",parseInt(g.getAttribute("data-size"),10)===d)});const u=document.querySelector("#cc-font-size-val"),h=document.querySelector("#cc-font-size-slider");u&&(u.textContent=`${d}%`),h&&(h.value=d)});const s=e.querySelectorAll(".preset-pill");s.forEach(c=>{c.addEventListener("click",()=>{const d=parseInt(c.getAttribute("data-size"),10);C.setFontSize(d),a&&(a.value=d),n&&(n.textContent=`${d}%`),s.forEach(h=>h.classList.remove("active")),c.classList.add("active");const p=document.querySelector("#cc-font-size-val"),u=document.querySelector("#cc-font-size-slider");p&&(p.textContent=`${d}%`),u&&(u.value=d)})});const r=e.querySelectorAll(".spacing-btn");r.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-spacing");C.setLetterSpacing(d),r.forEach(p=>p.classList.remove("active")),c.classList.add("active")})});const l=e.querySelector("#btn-reset-typography");l&&l.addEventListener("click",()=>{C.resetDefaults(),e.innerHTML=this.renderSection("typography"),this.attachSectionListeners(e)}),x.attach(e.querySelectorAll(".font-family-card"),{maxTilt:8,scale:1.02})}}class pe{render(){return`
      <div class="mail-app-container">
        <!-- Mail Sidebar -->
        <aside class="mail-sidebar">
          <div class="mail-compose-btn-row">
            <button class="btn-new-message" id="btn-new-mail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              <span>New Message</span>
            </button>
          </div>
          <nav class="mail-nav">
            <div class="mail-nav-item active">
              <span>📥 Inbox (Placement)</span>
              <span class="mail-badge-count">1</span>
            </div>
            <div class="mail-nav-item">
              <span>📤 Sent</span>
            </div>
            <div class="mail-nav-item">
              <span>⭐ Important</span>
            </div>
          </nav>

          <div class="mail-contact-card">
            <h5>Direct Contact</h5>
            <p><strong>Email:</strong> ${o.personal.email}</p>
            <p><strong>Phone:</strong> ${o.personal.phone}</p>
            <p><strong>Address:</strong> ${o.personal.address}</p>
            <button class="btn-copy-contact" id="btn-copy-contact-all">Copy Contact Info</button>
          </div>
        </aside>

        <!-- Mail Main Form -->
        <main class="mail-main">
          <div class="mail-compose-header">
            <h4>Compose Recruitment Invitation</h4>
            <div class="template-selector-row">
              <span>Quick Template:</span>
              <button class="template-chip" data-template="interview">Technical Interview</button>
              <button class="template-chip" data-template="embedded">Embedded Role</button>
              <button class="template-chip" data-template="software">Software SDE Role</button>
            </div>
          </div>

          <form class="mail-form" id="placement-mail-form">
            <div class="mail-field-row">
              <label>To:</label>
              <input type="text" value="Abhishek Kumar <${o.personal.email}>" readonly class="mail-input-readonly" />
            </div>
            <div class="mail-field-row">
              <label>From:</label>
              <input type="email" id="mail-from" placeholder="recruiter@company.com" required />
            </div>
            <div class="mail-field-row">
              <label>Company / Org:</label>
              <input type="text" id="mail-company" placeholder="e.g. Texas Instruments, Qualcomm, Google, Intel" required />
            </div>
            <div class="mail-field-row">
              <label>Subject:</label>
              <input type="text" id="mail-subject" value="Placement Interview Opportunity: Abhishek Kumar" required />
            </div>
            <div class="mail-body-row">
              <textarea id="mail-body" rows="9" required placeholder="Dear Abhishek, we were impressed by your academic record (8.73 CGPA), VLSI internship, and projects..."></textarea>
            </div>
            <div class="mail-actions-footer">
              <button type="submit" class="btn-send-mail">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                <span>Send Invitation (Mailto)</span>
              </button>
              <span class="mail-sent-msg" id="mail-sent-feedback" style="display: none;">Draft ready! Opening default email client...</span>
            </div>
          </form>
        </main>
      </div>
    `}initListeners(e){const t=e.querySelector("#placement-mail-form"),i=e.querySelector("#mail-company"),a=e.querySelector("#mail-subject"),n=e.querySelector("#mail-body"),s=e.querySelectorAll(".template-chip"),r=e.querySelector("#btn-copy-contact-all"),l=e.querySelector("#mail-sent-feedback");s.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-template");d==="interview"?(a.value="Technical Interview Invitation - Campus Placements | Abhishek Kumar",n.value=`Hi Abhishek,

We reviewed your academic profile (8.73 CGPA at IEM Kolkata), your VLSI internship at Jadavpur University, and your IEEE publication. We would love to invite you for a Technical Interview for our engineering team.

Please let us know your availability.

Best regards,
Recruitment Team`):d==="embedded"?(a.value="Job Opportunity: Embedded Firmware / Systems Engineer - Abhishek Kumar",n.value=`Hi Abhishek,

Your work on the Embedded Night-Vision System, the Piezo-electric wearable, and your Vivado 7-state traffic controller is exceptional. We have an exciting role for an Embedded Firmware Engineer and believe you would be a strong fit.

Could we schedule a call this week?

Warm regards,
Talent Acquisition`):d==="software"&&(a.value="SDE Opportunity: Software Engineering Team - Abhishek Kumar",n.value=`Hi Abhishek,

We came across your portfolio and noted your proficiency in Python, C++, Django, and algorithms. We are hiring for our Software Development Engineering team.

Let us know if you are open to discussing opportunities.

Best regards,
Engineering Hiring`)})}),t&&t.addEventListener("submit",c=>{c.preventDefault();const d=encodeURIComponent(a.value),p=encodeURIComponent(n.value+`

Company: `+i.value),u=`mailto:${o.personal.email}?subject=${d}&body=${p}`;l.style.display="inline-block",setTimeout(()=>{window.location.href=u},300)}),r&&r.addEventListener("click",async()=>{const c=`Abhishek Kumar
Email: ${o.personal.email}
Phone: ${o.personal.phone}
Portfolio: ${o.personal.portfolio}
LinkedIn: ${o.personal.linkedin}
GitHub: ${o.personal.github}`;await navigator.clipboard.writeText(c),r.textContent="Copied to Clipboard!",setTimeout(()=>{r.textContent="Copy Contact Info"},2e3)})}}document.addEventListener("DOMContentLoaded",()=>{const S=document.querySelector("#cinematic-portfolio"),e=document.querySelector("#desktop");if(S){const I=new Z(V);S.innerHTML=I.render(),I.initListeners(S)}try{new Q("ambient-3d-canvas")}catch(I){console.warn("3D Ambient Canvas initialization notice:",I)}const t=document.querySelector("#menu-active-app-name");P.init(t);const i=new K(P);i.init();const a=new _(P,I=>i.setWallpaper(I));a.init();const n=new te,s=document.querySelector("#content-resume");s&&(s.innerHTML=n.render(),n.initListeners(s));const r=new ie,l=document.querySelector("#content-projects");l&&(l.innerHTML=r.render(),r.initListeners(l));const c=new ae,d=document.querySelector("#content-siri");d&&(d.innerHTML=c.render(),c.initListeners(d));const p=new se,u=document.querySelector("#content-safari");u&&(u.innerHTML=p.render(),p.initListeners(u));const h=new ne,g=document.querySelector("#content-terminal");g&&(g.innerHTML=h.render(),h.initListeners(g));const v=new ce,b=document.querySelector("#content-social");b&&(b.innerHTML=v.render(),v.initListeners(b));const k=new de(I=>i.setWallpaper(I)),A=document.querySelector("#content-settings");A&&(A.innerHTML=k.render(),k.initListeners(A));const E=new pe,L=document.querySelector("#content-mail");L&&(L.innerHTML=E.render(),E.initListeners(L)),P.registerWindow("resume",{title:"Preview",icon:"📄",el:document.querySelector("#win-resume"),defaultWidth:780,defaultHeight:560,x:40,y:50}),P.registerWindow("projects",{title:"Project Store",icon:"🛍️",el:document.querySelector("#win-projects"),defaultWidth:840,defaultHeight:580,x:100,y:60}),P.registerWindow("siri",{title:"Siri & Gemini AI",icon:"🤖",el:document.querySelector("#win-siri"),defaultWidth:640,defaultHeight:540,x:180,y:70}),P.registerWindow("safari",{title:"Safari",icon:"🌐",el:document.querySelector("#win-safari"),defaultWidth:800,defaultHeight:560,x:140,y:60}),P.registerWindow("terminal",{title:"Terminal",icon:"💻",el:document.querySelector("#win-terminal"),defaultWidth:700,defaultHeight:460,x:120,y:90}),P.registerWindow("social",{title:"Activity Hub",icon:"⚡",el:document.querySelector("#win-social"),defaultWidth:800,defaultHeight:560,x:80,y:65}),P.registerWindow("settings",{title:"System Settings",icon:"⚙️",el:document.querySelector("#win-settings"),defaultWidth:760,defaultHeight:520,x:160,y:75}),P.registerWindow("mail",{title:"Mail",icon:"✉️",el:document.querySelector("#win-mail"),defaultWidth:680,defaultHeight:500,x:150,y:80});const D=document.querySelectorAll(".desktop-icon");x.attach(D,{maxTilt:16,scale:1.05,glare:!1});const j=document.querySelectorAll(".dock-item");x.attach(j,{maxTilt:18,scale:1.15,glare:!1});const z=document.querySelectorAll(".stat-box");x.attach(z,{maxTilt:10,scale:1.04,glare:!0}),document.querySelectorAll(".dock-item[data-app]").forEach(I=>{I.addEventListener("click",()=>{const m=I.getAttribute("data-app");m==="finder"?P.openWindow("resume"):m&&P.toggleWindowFromDock(m)})});const F=document.querySelector("#dock-trash");F==null||F.addEventListener("click",()=>{a.showNotification("Trash is Clean","All compiler warnings and bugs were resolved in pre-commit hooks! 🧹")}),V.init(S,e),V.onModeChange(I=>{I==="desktop"&&(P.openWindow("resume"),setTimeout(()=>{P.openWindow("siri")},200))}),V.currentMode==="desktop"&&setTimeout(()=>{P.openWindow("resume"),setTimeout(()=>{P.openWindow("siri")},200)},100)});
