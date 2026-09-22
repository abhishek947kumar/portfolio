(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class U{constructor(){this.windows=new Map,this.activeWindowId=null,this.topZIndex=100,this.menuBarAppTitleEl=null}init(e){this.menuBarAppTitleEl=e,this.setupGlobalListeners()}registerWindow(e,t){const i=t.el,s=t.defaultWidth||Math.min(840,window.innerWidth-60),n=t.defaultHeight||Math.min(560,window.innerHeight-120),a=this.windows.size*28%180,o=t.x!==void 0?t.x:Math.max(30,(window.innerWidth-s)/2+a-60),r=t.y!==void 0?t.y:Math.max(45,(window.innerHeight-n)/2+a-40),c={id:e,title:t.title,icon:t.icon,el:i,isOpen:!1,isMinimized:!1,isMaximized:!1,width:s,height:n,x:o,y:r,prevBounds:null,onOpen:t.onOpen,onClose:t.onClose};return this.windows.set(e,c),this.applyWindowStyles(c),this.setupWindowControls(c),this.setupDraggable(c),this.setupResizable(c),c}applyWindowStyles(e){const t=e.el;t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.style.transform=`translate3d(${e.x}px, ${e.y}px, 0)`}setupWindowControls(e){const t=e.el;t.addEventListener("mousedown",()=>this.bringToFront(e.id)),t.addEventListener("touchstart",()=>this.bringToFront(e.id),{passive:!0});const i=t.querySelector(".traffic-close"),s=t.querySelector(".traffic-minimize"),n=t.querySelector(".traffic-maximize");i&&i.addEventListener("click",o=>{o.stopPropagation(),this.closeWindow(e.id)}),s&&s.addEventListener("click",o=>{o.stopPropagation(),this.minimizeWindow(e.id)}),n&&n.addEventListener("click",o=>{o.stopPropagation(),this.toggleMaximize(e.id)});const a=t.querySelector(".window-titlebar");a&&a.addEventListener("dblclick",o=>{o.target.closest(".window-controls")||this.toggleMaximize(e.id)})}setupDraggable(e){const t=e.el.querySelector(".window-titlebar");if(!t)return;let i=!1,s,n,a,o;const r=p=>{e.isMaximized||p.target.closest(".window-controls")||p.target.closest("button")||p.target.closest("input")||(i=!0,s=p.clientX||p.touches&&p.touches[0].clientX,n=p.clientY||p.touches&&p.touches[0].clientY,a=e.x,o=e.y,this.bringToFront(e.id),e.el.classList.add("is-dragging"),document.addEventListener("mousemove",c),document.addEventListener("mouseup",d),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",d))},c=p=>{if(!i)return;p.type==="touchmove"&&p.preventDefault();const u=p.clientX||p.touches&&p.touches[0].clientX,h=p.clientY||p.touches&&p.touches[0].clientY,g=u-s,v=h-n,b=-e.width+100,k=window.innerWidth-100,E=32,I=window.innerHeight-80;e.x=Math.max(b,Math.min(k,a+g)),e.y=Math.max(E,Math.min(I,o+v)),e.el.style.transform=`translate3d(${e.x}px, ${e.y}px, 0)`},d=()=>{i&&(i=!1,e.el.classList.remove("is-dragging"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",d))};t.addEventListener("mousedown",r),t.addEventListener("touchstart",r,{passive:!1})}setupResizable(e){const t=e.el.querySelector(".window-resize-handle");if(!t)return;let i=!1,s,n,a,o;const r=p=>{e.isMaximized||(i=!0,s=p.clientX||p.touches&&p.touches[0].clientX,n=p.clientY||p.touches&&p.touches[0].clientY,a=e.width,o=e.height,this.bringToFront(e.id),e.el.classList.add("is-resizing"),document.addEventListener("mousemove",c),document.addEventListener("mouseup",d),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",d))},c=p=>{if(!i)return;p.type==="touchmove"&&p.preventDefault();const u=p.clientX||p.touches&&p.touches[0].clientX,h=p.clientY||p.touches&&p.touches[0].clientY,g=Math.max(380,a+(u-s)),v=Math.max(280,o+(h-n));e.width=Math.min(window.innerWidth-e.x-10,g),e.height=Math.min(window.innerHeight-e.y-60,v),e.el.style.width=`${e.width}px`,e.el.style.height=`${e.height}px`},d=()=>{i&&(i=!1,e.el.classList.remove("is-resizing"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),document.removeEventListener("touchmove",c),document.removeEventListener("touchend",d))};t.addEventListener("mousedown",r),t.addEventListener("touchstart",r,{passive:!1})}openWindow(e){const t=this.windows.get(e);t&&(t.isOpen=!0,t.isMinimized=!1,t.el.classList.remove("is-minimized","is-hidden"),t.el.classList.add("is-open"),this.bringToFront(e),this.updateDockIndicator(e,!0),t.onOpen&&t.onOpen())}closeWindow(e){const t=this.windows.get(e);if(t){if(t.isOpen=!1,t.isMinimized=!1,t.el.classList.remove("is-open","is-focused"),t.el.classList.add("is-hidden"),this.updateDockIndicator(e,!1),this.activeWindowId===e){this.activeWindowId=null,this.updateMenuBarTitle("Finder");const i=this.getTopVisibleWindow();i&&this.bringToFront(i.id)}t.onClose&&t.onClose()}}minimizeWindow(e){const t=this.windows.get(e);if(t&&(t.isMinimized=!0,t.el.classList.add("is-minimized"),t.el.classList.remove("is-focused"),this.activeWindowId===e)){this.activeWindowId=null;const i=this.getTopVisibleWindow();i?this.bringToFront(i.id):this.updateMenuBarTitle("Finder")}}toggleMaximize(e){const t=this.windows.get(e);t&&(t.isMaximized?(t.prevBounds&&(t.x=t.prevBounds.x,t.y=t.prevBounds.y,t.width=t.prevBounds.width,t.height=t.prevBounds.height),t.isMaximized=!1,t.el.classList.remove("is-maximized")):(t.prevBounds={x:t.x,y:t.y,width:t.width,height:t.height},t.x=10,t.y=36,t.width=window.innerWidth-20,t.height=window.innerHeight-110,t.isMaximized=!0,t.el.classList.add("is-maximized")),this.applyWindowStyles(t),this.bringToFront(e))}bringToFront(e){const t=this.windows.get(e);t&&(t.isMinimized&&(t.isMinimized=!1,t.el.classList.remove("is-minimized")),this.topZIndex+=1,t.el.style.zIndex=this.topZIndex,this.windows.forEach(i=>i.el.classList.remove("is-focused")),t.el.classList.add("is-focused"),this.activeWindowId=e,this.updateMenuBarTitle(t.title))}getTopVisibleWindow(){let e=null,t=-1;return this.windows.forEach(i=>{if(i.isOpen&&!i.isMinimized){const s=parseInt(i.el.style.zIndex||0,10);s>t&&(t=s,e=i)}}),e}toggleWindowFromDock(e){const t=this.windows.get(e);t&&(t.isOpen?t.isMinimized?this.openWindow(e):this.activeWindowId===e?this.minimizeWindow(e):this.bringToFront(e):this.openWindow(e))}updateDockIndicator(e,t){const i=document.querySelector(`.dock-item[data-app="${e}"]`);i&&(t?i.classList.add("is-running"):i.classList.remove("is-running"))}updateMenuBarTitle(e){this.menuBarAppTitleEl&&(this.menuBarAppTitleEl.textContent=e)}setupGlobalListeners(){window.addEventListener("resize",()=>{this.windows.forEach(e=>{e.isMaximized?(e.width=window.innerWidth-20,e.height=window.innerHeight-110,this.applyWindowStyles(e)):(e.x+e.width>window.innerWidth&&(e.x=Math.max(10,window.innerWidth-e.width-20)),e.y+e.height>window.innerHeight&&(e.y=Math.max(36,window.innerHeight-e.height-80)),this.applyWindowStyles(e))})})}}const M=new U,l={personal:{name:"Abhishek Kumar",tagline:"B.Tech ECE 4th Year Candidate | Embedded Systems, VLSI & Software Engineer",address:"Sector-3, Bokaro Steel City, Jharkhand - 827003",location:"Kolkata, West Bengal / Bokaro, Jharkhand, India",email:"abhishek1297kumar@gmail.com",phone:"+91 9470303282",linkedin:"https://www.linkedin.com/in/abhishek947kumar",github:"https://github.com/abhishek947kumar",portfolio:"https://abhishek947kumar.github.io/portfolio/",portfolioHandle:"abhishek947kumar.github.io/portfolio",summary:"B.Tech ECE 4th year candidate at Institute of Engineering & Management (IEM), Kolkata (Class of 2027) with an 8.73 CGPA. Built with a strong foundation in Object-Oriented Programming (OOP), algorithmic logic, control systems, and software-hardware co-design. Experienced in real-time data processing, VLSI design pipelines, and plant automation. Proficient in Python, MATLAB, C/C++, and version control, with proven IEEE publication and high-impact projects in embedded IoT and software architectures."},placementPitch:{keyStrengths:["High Academic Distinction: CGPA 8.73 (up to 6th semester) in B.Tech ECE at IEM Kolkata.","Dual Expertise: Strong grasp across both bare-metal hardware/embedded firmware (Wokwi, Vivado, C/C++, microcontrollers) and high-level software & systems engineering (Python, FastAPI, Django, React, AI Cloud).","Published IEEE Researcher: First-author publication at IEEE IEMENTECH 2026 on wearable piezoelectric energy harvesting & healthcare technology.","Digital Forensics & Systems Security: Architected BitTrace DFIR for live volatile RAM inspection and ISO/IEC 27037 evidence preservation.","Hands-On Industrial Internships: Bare-metal IC design optimization at Jadavpur University & plant automation software systems at SAIL (Steel Authority of India Limited).","Active Continuous Learner: Built & updated 6+ production-grade software, cybersecurity, and embedded systems in 2026 alone."]},education:[{institution:"Institute of Engineering & Management (IEM)",location:"Kolkata, West Bengal",degree:"B.Tech in Electronics and Communication Engineering (ECE)",duration:"2023 – 2027",score:"CGPA: 8.73 (up to 6th sem)",highlights:["Core Coursework: Microprocessors & Microcontrollers, Digital Signal Processing, Control Systems, VLSI Design, Data Structures & Algorithms, Analog & Digital Communication.","Consistently maintained high academic standing in top percentile of the department."]},{institution:"M.G.M. Higher Secondary School",location:"Bokaro, Jharkhand",degree:"CBSE Class 12 (PCM + IP)",duration:"2023",score:"Percentage: 86.5%",highlights:["Specialized in Physics, Chemistry, Mathematics, and Informatics Practices (IP / Python)."]},{institution:"M.G.M. Higher Secondary School",location:"Bokaro, Jharkhand",degree:"CBSE Class 10",duration:"2021",score:"Percentage: 95.0%",highlights:["School honors for academic excellence in Science and Mathematics."]}],internships:[{role:"VLSI Design Intern",organization:"Jadavpur University",location:"Kolkata, West Bengal",duration:"December 2025 – January 2026",type:"Research Internship",points:["Studied and analysed IC design and fabrication processes, focusing on hardware-software architecture optimisations.","Evaluated time-critical processing pipelines using EDA tools, applying semiconductor principles to reduce computational overhead in bare-metal environments.","Simulated and benchmarked gate-level delays and power dissipation tradeoffs for high-performance sub-systems."],skillsUsed:["VLSI Design","EDA Tools","Bare-metal optimization","Hardware Architecture","IC Fabrication Flow"]},{role:"Vocational Trainee",organization:"Steel Authority of India Limited (SAIL)",location:"Bokaro Steel City, Jharkhand",duration:"May 2025 – June 2025",type:"Industrial Internship",points:["Developed and maintained software modules for plant automation systems in industrial manufacturing units.","Assisted in database management tasks and operational data analytics to optimize continuous plant data monitoring.","Collaborated with senior process automation engineers on fault logging, telemetry protocols, and automated telemetry alerts."],skillsUsed:["Plant Automation","Industrial Databases","Software Maintenance","Data Telemetry","Industrial Control"]}],projects:[{id:"bittrace-dfir",title:"BitTrace DFIR - Automated Live & Postmortem Bitcoin Forensic Tool",subtitle:"Volatile RAM Inspection, Windows Registry Hives & ISO/IEC 27037 Evidence Vault",badge:"Recent (Sep 2026) | Cybersecurity & DFIR",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",tags:["Python","FastAPI","React","Digital Forensics","Cryptography","Windows API","ISO 27037"],description:"An automated digital forensics and incident response (DFIR) platform engineered to conduct both live volatile memory (RAM) and persistent postmortem disk/registry analysis of Bitcoin artifacts on Windows systems. Adheres to ISO/IEC 27037 digital evidence preservation standards with immutable SHA-256/MD5 hashing.",highlights:["Live Volatile Forensics: Inspects running wallet processes (Bitcoin-Qt, Electrum, Armory) to recover 12-24 word BIP-39 seed phrases, WIF/Hex private keys, and addresses with a byte-aligned Hex/ASCII viewer.","Postmortem Remnant Extraction: Scans %APPDATA% for Berkeley DB wallet.dat headers (0x00053162), parses Windows Prefetch (.pf) execution frequencies, and decodes UserAssist ROT13 keys for uninstalled wallet remnants.","Browser Artifacts & Evidence Ledger: Implements SQLite shadow copying across Chrome, Edge, and Firefox without database locks; generates court-ready audit reports with 1-click PDF/HTML export."]},{id:"night-vision",title:"Embedded Night-Vision System for Pedestrian Detection",subtitle:"Active IR + Thermal Sensors with HAAR+AdaBoost & YOLOv2",badge:"Recent (Sep 2026) | AI & Embedded",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",tags:["Python","Embedded Systems","Computer Vision","Thermal IR","YOLOv2","AdaBoost"],description:"Embedded night-vision driver-assistance architecture combining active infrared and thermal imaging feeds. Features a dual-stage detection pipeline utilizing HAAR+AdaBoost for low-compute candidate extraction and custom-pruned YOLOv2 for real-time pedestrian recognition under pitch-black and hazardous road environments.",highlights:["Fused sensor telemetry from active IR and LWIR thermal modules.","Optimized inference latency on resource-constrained embedded edge hardware.","Achieved robust multi-pedestrian localization with low false-positive rates in zero-illumination tests."]},{id:"logistics-sys",title:"Logistics Management System",subtitle:"Commercial Multi-Dealer & Consumer Logistics Platform",badge:"Recent (Sep 2026) | Enterprise Full-Stack",createdPeriod:"Last 1 Week",githubUrl:"https://github.com/abhishek947kumar/Logistics-Management-System",tags:["Python","Django","PostgreSQL","REST APIs","Enterprise Architecture"],description:"An enterprise-grade commercial logistics and supply chain engine designed for multi-dealer inventory synchronization, order dispatch scheduling, route tracking, and automated consignment status updates.",highlights:["Architected modular multi-tenant database schema for independent dealers and logistics coordinators.","Implemented secure JWT authentication, role-based access control, and automated shipment tracking webhooks.","Full tracking pipeline from depot dispatch to consumer delivery confirmation."]},{id:"piezo-wearable",title:"Piezo-Electric Based Acupressure Wearable Device",subtitle:"IoT Wearable Healthcare System Architecture",badge:"Published Research | Hardware & IoT",createdPeriod:"Research & Prototype",githubUrl:"https://github.com/abhishek947kumar",tags:["Embedded C","Wokwi","Microcontrollers","IoT","Sensors","Hardware-Software Co-Design"],description:"Microcontroller-based IoT-enabled wearable system engineered to deliver targeted acupressure therapy while harvesting energy through piezoelectric transducers. Designed and verified using Wokwi simulation and physical prototyping.",highlights:["Programmed robust firmware logic in Embedded C with interrupt-driven sensor sampling.","Interfaced analog piezoelectric sensors and pulse monitoring actuators over SPI/I2C buses.","Accompanied by a published peer-reviewed IEEE conference paper at IEMENTECH 2026."]},{id:"traffic-controller",title:"Camera-Assisted Adaptive 7-State Traffic Controller",subtitle:"Dynamic FSM in C on Xilinx Vivado",badge:"Hardware & Control Systems",createdPeriod:"Academic Milestone",githubUrl:"https://github.com/abhishek947kumar",tags:["C","Xilinx Vivado","Finite State Machines","Control Logic","Real-Time Processing"],description:"Camera-assisted algorithmic traffic control system implemented as an adaptive 7-state Finite State Machine (FSM). Processes live traffic density metrics and dynamically calculates variable green-light intervals to eliminate urban intersection deadlocks.",highlights:["Developed high-performance state execution logic in C to minimize cycle-by-cycle computational latency.","Simulated in Xilinx Vivado environment with timing constraints and clock-domain validation.","Demonstrated 35% reduction in simulated queue wait times compared to fixed-time traffic light cycles."]},{id:"your-finance",title:"YourFinance - AI Expense Tracker & Budget Insights",subtitle:"Full-Stack Financial Dashboard with Google Gemini AI",badge:"Recent (Jul 2026) | AI & Web App",createdPeriod:"Last 6 Months",githubUrl:"https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",tags:["JavaScript","HTML5","CSS3","Gemini AI API","Data Visualization"],description:"Modern full-stack personal finance and wealth management dashboard. Features dynamic category budget tracking with visual alert thresholds, savings milestone progress, and automated financial insights powered by Google Gemini AI.",highlights:["Integrated Google Gemini LLM to analyze spending transactions and recommend personalized budgeting optimizations.","Interactive graphical charts, responsive dark glassmorphic interface, and offline storage synchronization."]},{id:"evershop",title:"EverShop Modern eCommerce Experience",subtitle:"Modular TypeScript & GraphQL Architecture",badge:"Recent (Aug 2026) | Modern Web Architecture",createdPeriod:"Last 6 Months",githubUrl:"https://github.com/abhishek947kumar/Evershop",tags:["TypeScript","React","GraphQL","Node.js","Tailored Commerce"],description:"Modern, TypeScript-first eCommerce platform built on GraphQL and React. Designed with a modular architecture for high-performance product indexing, catalog searches, and seamless checkout pipelines.",highlights:["End-to-end typed schema with GraphQL queries and mutations.","Modular cart state and extensible component hierarchy for rapid UI customizations."]},{id:"cybersecurity-suite",title:"Cryptographic Tools & Security Suite",subtitle:"Prodigy InfoTech Cybersecurity Engineering",badge:"Cybersecurity & Logic",createdPeriod:"Internship Projects",githubUrl:"https://github.com/abhishek947kumar",tags:["Python","C++","Cryptography","Pixel Manipulation","Security Algorithms"],description:"Suite of cybersecurity tools created during security engineering training: image encryption via mathematical pixel transformation (PRODIGY_CS_02), Caesar cipher cryptanalysis engine (PRODIGY_CS_01), password entropy checker (PRODIGY_CS_03), and system event logger (PRODIGY_CS_04).",highlights:["Built byte-level pixel manipulation algorithms preserving visual entropy while maintaining reversibility.","Developed password entropy scoring models with dictionary attack resilience metrics."]}],skills:{domains:[{name:"Microprocessors & Microcontrollers",icon:"cpu",level:92},{name:"Embedded Systems & Firmware",icon:"chip",level:90},{name:"Digital Electronics & Logic Design",icon:"git-commit",level:88},{name:"Hardware Interfacing (GPIO, UART, SPI, I2C)",icon:"sliders",level:92},{name:"Digital Forensics & Security Engineering",icon:"shield",level:88},{name:"VLSI Design & EDA Workflows",icon:"layers",level:84},{name:"Control Systems & Real-Time Processing",icon:"activity",level:86}],tools:["Xilinx Vivado","Wokwi Simulator","Git / GitHub","CI/CD Pipelines","FastAPI","React","LaTeX","Agile / Jira","Linux / Bash","EDA Tools","VS Code","Django","REST APIs"]},publications:[{title:"Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy",venue:"IEMENTECH 2026 (IEEE International Conference)",status:"Published",doi:"10.1109/IEMENTech202669403.2026.11434403",link:"https://doi.org/10.1109/IEMENTech202669403.2026.11434403",summary:"Pioneered a wearable health technology framework combining biomechanical piezoelectric energy harvesting with automated acupressure therapy for depression and stress relief, minimizing external battery charging requirements while optimizing therapeutic stimulation."}],certifications:[{title:"Internet of Things and AI Cloud",issuer:"University of California, San Diego (Coursera)",skills:["IoT Architecture","Cloud Integration","Smart Systems"]}],socialFeed:[{id:"post-li-bittrace",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 21, 2026",title:"Launched BitTrace DFIR: Automated Live & Postmortem Bitcoin Forensics on Windows! 🛡️💻",content:"Excited to unveil my latest cybersecurity & systems project: BitTrace DFIR! An open-source forensic platform designed to conduct live volatile memory (RAM) triage and persistent postmortem disk/registry analysis of cryptocurrency artifacts on Windows. Engineered with a FastAPI bridge, interactive React glassmorphism dashboard, BIP-39 mnemonic recovery, Berkeley DB parser, and ISO/IEC 27037 compliant cryptographic evidence vault.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#DigitalForensics","#DFIR","#Cybersecurity","#Python","#FastAPI","#React","#Bitcoin"]},{id:"post-li-nightvision",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 19, 2026",title:"Engineered Embedded Night-Vision System for Pedestrian Detection! 🌙🚗",content:"Thrilled to share my work on an intelligent Advanced Driver-Assistance System (ADAS). By fusing dual feeds from active 850nm infrared illuminators and LWIR thermal sensors with a hybrid HAAR+AdaBoost candidate filter and quantized YOLOv2 neural network, the system detects pedestrians in zero-visibility conditions with low latency on resource-constrained embedded edge hardware.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#EmbeddedSystems","#ComputerVision","#ADAS","#SensorFusion","#DeepLearning","#EdgeAI"]},{id:"post-li-logistics",platform:"LinkedIn",author:"Abhishek Kumar",date:"September 18, 2026",title:"Built LogiTrack Pro: Enterprise Commercial Logistics Management System 🚚📦",content:"Proud to present LogiTrack Pro, a full-stack commercial multi-dealer and consumer logistics management ecosystem built with Python and Django. Features multi-tenant dealer inventory synchronization, automated shipment manifests, route optimization dispatch schedules, and JWT-authenticated telemetry alerts.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#FullStack","#Python","#Django","#Logistics","#SupplyChain","#EnterpriseSoftware"]},{id:"post-1",platform:"LinkedIn",author:"Abhishek Kumar",date:"August 2026",title:"Thrilled to share our IEEE Publication at IEMENTECH 2026! 🚀",content:"Delighted to announce that our research paper titled 'Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy' has been officially published in IEEE Xplore! In this work, we explored self-sustaining wearable medical systems that harvest biomechanical energy to power automated pressure-point stimulation. Big thanks to my co-authors and mentors at IEM Kolkata!",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#IEEE","#WearableTech","#BiomedicalEngineering","#IoT","#Research"]},{id:"post-2",platform:"LinkedIn",author:"Abhishek Kumar",date:"January 2026",title:"Completed VLSI Design Internship at Jadavpur University! ⚡",content:"Honored to wrap up an enriching winter internship at the prestigious Jadavpur University ETCE department. Worked extensively on IC design and fabrication flows, evaluating timing-critical processing pipelines using state-of-the-art EDA tools and bare-metal hardware optimization.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#VLSI","#Semiconductors","#ICDesign","#JadavpurUniversity","#HardwareEngineering"]},{id:"post-3",platform:"GitHub",author:"abhishek947kumar",date:"September 2026",title:"Pushed updates to Embedded-Night-Vision-System 🌙",content:"Added dual-stream fusion pipeline interfacing active IR and LWIR thermal sensors with HAAR+AdaBoost and lightweight YOLOv2 on embedded hardware. Benchmarked latency under low-light pedestrian crossing scenarios.",url:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",tags:["#ComputerVision","#EmbeddedSystems","#Python","#AutonomousSystems"]},{id:"post-4",platform:"LinkedIn",author:"Abhishek Kumar",date:"June 2025",title:"Completed Vocational Training at Steel Authority of India Limited (SAIL) 🏭",content:"Excited to share that I've concluded my vocational training at SAIL Bokaro Steel Plant. It was an incredible experience working on industrial plant automation software modules, telemetry databases, and real-time process monitoring.",url:"https://www.linkedin.com/in/abhishek947kumar",tags:["#SAIL","#IndustrialAutomation","#ProcessControl","#EngineeringInternship"]}],qaKnowledgeBase:[{keywords:["bittrace","bitcoin","forensic","forensics","dfir","cybersecurity","memory","ram","iso 27037","postmortem","volatile"],answer:`BitTrace DFIR (Automated Live & Postmortem Bitcoin Forensic Analysis Tool for Windows - Built Sep 2026):
• **Live Volatile Memory Forensics**: Inspects running wallet processes (Bitcoin-Qt, Electrum, Armory) to recover 12–24 word BIP-39 recovery seeds, WIF/Hex private keys, and Bitcoin addresses with an aligned byte Hex/ASCII viewer.
• **Postmortem Disk & Registry Analysis**: Scans %APPDATA% for Berkeley DB wallet.dat files (0x00053162), decodes UserAssist ROT13 registry launch logs, and parses Windows Prefetch (.pf) files for uninstalled remnants.
• **ISO/IEC 27037 Evidence Vault**: Computes SHA-256 and MD5 cryptographic hashes with real-time tamper re-verification and 1-click court-ready printable PDF/HTML reports.
• **Tech Stack**: Python 3.10+, FastAPI, React 18, Vite, Windows API, Cryptography.
• **GitHub**: [github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems](https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems)`},{keywords:["cgpa","marks","grades","percentage","score","academic","standing","result"],answer:`Abhishek maintains an exceptional academic record across engineering and schooling:
• **B.Tech in ECE (IEM Kolkata, 2023–2027)**: 8.73 CGPA (up to 6th semester) with top department standing.
• **CBSE Class 12 (PCM + IP)**: 86.5% at M.G.M. Higher Secondary School, Bokaro (2023).
• **CBSE Class 10**: 95.0% at M.G.M. Higher Secondary School, Bokaro (2021).`},{keywords:["vlsi","jadavpur","semiconductor","eda","ic design","bare-metal","bare metal"],answer:`Abhishek completed a prestigious VLSI Design Internship at Jadavpur University (Dec 2025 – Jan 2026):
• Studied integrated circuit (IC) design and fabrication methodologies for bare-metal systems.
• Optimized hardware-software co-design pipelines to reduce computational latency and silicon area.
• Evaluated time-critical processing architectures using industry-standard EDA simulation suites.`},{keywords:["sail","steel authority","industrial","automation","bokaro","vocational trainee"],answer:`At Steel Authority of India Limited (SAIL) Bokaro (May 2025 – June 2025):
• Developed and maintained real-time software modules for plant automation systems.
• Managed mission-critical database telemetry to monitor continuous plant manufacturing data.
• Gained practical exposure to heavy industrial process control protocols and automation standards.`},{keywords:["piezo","wearable","acupressure","depression","healthcare","wokwi"],answer:`Piezo-electric Acupressure Wearable Device (Published with IEEE):
• Engineered an IoT healthcare wearable simulated on Wokwi and implemented in Embedded C.
• Integrated piezoelectric transducers to harvest mechanical energy and extend battery autonomy.
• Interfaced biomedical sensor channels via SPI/I2C for adaptive, non-invasive acupressure therapy.
• Research accepted and published at IEEE IEMENTECH 2026 (DOI: 10.1109/IEMENTech202669403.2026.11434403).`},{keywords:["traffic","vivado","fsm","finite state machine","7-state","xilinx"],answer:`Camera-Assisted Adaptive 7-State Traffic Controller:
• Synthesized and simulated on Xilinx Vivado with full timing analysis.
• Architected a 7-state Finite State Machine (FSM) in C to dynamically balance multi-directional traffic flow.
• Drastically minimized state transition latency and eliminated traffic gridlock conditions.`},{keywords:["github","recent projects","last 6 months","6 months","latest","new projects","last 1 week","1 week","last week"],answer:`Over the last week and recent months (September 2026), Abhishek engineered and released major flagship projects on GitHub (@abhishek947kumar) and LinkedIn:
• **BitTrace DFIR (Built Sep 21, 2026)**: Automated Live RAM and Postmortem Bitcoin Forensics Tool for Windows compliant with ISO/IEC 27037.
• **Embedded-Night-Vision-System (Built Sep 19, 2026)**: Active IR & thermal sensor fusion with quantized YOLOv2 for real-time pedestrian recognition.
• **Logistics-Management-System (Built Sep 18, 2026)**: Enterprise commercial multi-dealer logistics and fleet tracking platform in Python and Django.
• **YourFinance**: Modern financial tracker with AI-driven wealth advice powered by Google Gemini.
• **Evershop**: High-performance full-stack eCommerce platform built with TypeScript and React.`},{keywords:["publication","paper","research","ieee","iementech","doi"],answer:`Abhishek's Peer-Reviewed IEEE Publication Details:
• **Title**: Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy
• **Conference**: IEEE IEMENTECH 2026
• **Role**: First Author & Lead Hardware Architect
• **DOI**: 10.1109/IEMENTech202669403.2026.11434403`},{keywords:["skills","technologies","languages","tech stack","python","c++","embedded"],answer:`Abhishek's verified technical proficiencies:
• **Programming Languages**: C, C++, Embedded C, Python, MATLAB, JavaScript/TypeScript, SQL
• **Hardware & Protocols**: ARM/AVR/ESP Microcontrollers, GPIO, UART, SPI, I2C, VLSI Design, Control Systems
• **EDA & Simulation Tools**: Xilinx Vivado, Wokwi Simulator, Logic Analyzers, Multisim
• **Security & Forensics**: Live Volatile RAM Triage, ISO/IEC 27037 Evidence Handling, Windows Prefetch & Registry Analysis, Cryptographic Hashing
• **Software & Web Engineering**: FastAPI, Django, React, REST APIs, Google Gemini AI, Git/GitHub, CI/CD, Agile/Jira`},{keywords:["why hire","hire","placement","value","strengths","fit","candidate"],answer:`Why Abhishek Kumar is a top candidate for engineering teams:
• **Top Academic Rigor**: 8.73 CGPA in B.Tech ECE with deep fundamentals in OOP, DSA, and Control Systems.
• **Rare Bridge of Hardware & Software**: Hands-on mastery from bare-metal VLSI/firmware up to Python/FastAPI/Django/AI systems.
• **Proven Researcher**: First-author IEEE conference publication at IEMENTECH 2026.
• **Real Industrial Exposure**: On-site internships at Jadavpur University (VLSI EDA) and SAIL (Plant Automation).
• **Systems & Security Depth**: Built and demonstrated end-to-end DFIR platforms (BitTrace) and real-time ADAS edge models.
• **Placement Ready**: Immediately productive in Embedded Systems, Firmware, Hardware Design, or Software Engineering roles.`},{keywords:["contact","email","phone","reach","call","address","location","message","portfolio","website","live link","link","url"],answer:`Direct contact channels & portfolio links for Abhishek Kumar:
• **Live Portfolio**: [abhishek947kumar.github.io/portfolio](https://abhishek947kumar.github.io/portfolio/)
• **Email**: abhishek1297kumar@gmail.com
• **Phone / WhatsApp**: +91 9470303282
• **LinkedIn**: [linkedin.com/in/abhishek947kumar](https://www.linkedin.com/in/abhishek947kumar)
• **GitHub**: [github.com/abhishek947kumar](https://github.com/abhishek947kumar)
• **Locations**: Kolkata, West Bengal & Bokaro Steel City, Jharkhand`},{keywords:["activities","ieee","sytron","quizzophrenia","societies"],answer:`Professional societies and extracurricular leadership:
• Active Member of IEEE, IEEE MTT-S (Microwave Theory and Technology), and IEEE CAS-S (Circuits & Systems).
• Official Event Volunteer at SYTRON '25.
• Active participant and competitor in QUIZZOPHRENIA '25.`}]},O={inter:{id:"inter",name:"SF Pro / Inter",category:"macOS Native Sans",fontFamily:'"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',sample:"Clean, elegant, authentic macOS default typography."},outfit:{id:"outfit",name:"Outfit",category:"Futuristic Geometric",fontFamily:'"Outfit", "Inter", sans-serif',sample:"Modern geometric curves tailored for sleek digital interfaces."},jakarta:{id:"jakarta",name:"Plus Jakarta Sans",category:"Modern Tech Sans",fontFamily:'"Plus Jakarta Sans", "Inter", sans-serif',sample:"Crisp contemporary sans-serif engineered for high readability."},jetbrains:{id:"jetbrains",name:"JetBrains Mono",category:"Developer Code Monospace",fontFamily:'"JetBrains Mono", "SF Mono", Menlo, monospace',sample:"True developer terminal aesthetics with high contrast glyphs."},playfair:{id:"playfair",name:"Playfair Display",category:"Executive Editorial Serif",fontFamily:'"Playfair Display", Georgia, "Times New Roman", serif',sample:"Refined editorial serif for prestigious executive portfolios."}};class _{constructor(){this.currentFontId=localStorage.getItem("abhishek_portfolio_font_id")||"inter",this.currentFontSize=parseInt(localStorage.getItem("abhishek_portfolio_font_size")||"100",10),this.currentLetterSpacing=localStorage.getItem("abhishek_portfolio_letter_spacing")||"normal",this.listeners=[],this.applyAll()}onChange(e){this.listeners.push(e)}notify(){this.listeners.forEach(e=>e({fontId:this.currentFontId,fontSize:this.currentFontSize,letterSpacing:this.currentLetterSpacing}))}setFontStyle(e){O[e]&&(this.currentFontId=e,localStorage.setItem("abhishek_portfolio_font_id",e),this.applyAll(),this.notify())}setFontSize(e){const t=Math.max(75,Math.min(140,e));this.currentFontSize=t,localStorage.setItem("abhishek_portfolio_font_size",t.toString()),this.applyAll(),this.notify()}increaseFontSize(e=5){this.setFontSize(this.currentFontSize+e)}decreaseFontSize(e=5){this.setFontSize(this.currentFontSize-e)}setLetterSpacing(e){this.currentLetterSpacing=e,localStorage.setItem("abhishek_portfolio_letter_spacing",e),this.applyAll(),this.notify()}resetDefaults(){this.setFontStyle("inter"),this.setFontSize(100),this.setLetterSpacing("normal")}applyAll(){const e=O[this.currentFontId]||O.inter,t=document.documentElement;t.style.setProperty("--font-system",e.fontFamily),t.style.setProperty("--base-font-size",`${13*(this.currentFontSize/100)}px`),t.style.fontSize=`${13*(this.currentFontSize/100)}px`,this.currentLetterSpacing==="tight"?t.style.setProperty("--letter-spacing-custom","-0.02em"):this.currentLetterSpacing==="wide"?t.style.setProperty("--letter-spacing-custom","0.04em"):t.style.setProperty("--letter-spacing-custom","normal")}}const L=new _;class K{constructor(e,t){this.wm=e,this.onWallpaperChange=t,this.isSpotlightOpen=!1,this.isControlCenterOpen=!1,this.isAppleMenuOpen=!1,this.isBatteryOpen=!1,this.isWifiOpen=!1}init(){this.startClock(),this.setupDropdowns(),this.setupPopovers(),this.setupQuickActions(),this.setupSpotlight(),this.setupControlCenter(),this.setupKeyboardShortcuts()}startClock(){const e=document.querySelector("#menu-clock"),t=()=>{if(!e)return;const i=new Date,s={weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0};e.textContent=i.toLocaleDateString("en-US",s).replace(",","")};t(),setInterval(t,1e3)}setupDropdowns(){var i,s,n,a,o;const e=document.querySelector("#menu-apple-btn"),t=document.querySelector("#apple-dropdown-menu");e==null||e.addEventListener("click",r=>{r.stopPropagation(),this.closeAllMenus(),this.isAppleMenuOpen=!this.isAppleMenuOpen,t==null||t.classList.toggle("is-visible",this.isAppleMenuOpen)}),(i=document.querySelector("#menu-about-mac"))==null||i.addEventListener("click",()=>{this.wm.openWindow("settings"),this.closeAllMenus()}),(s=document.querySelector("#menu-sys-settings"))==null||s.addEventListener("click",()=>{this.wm.openWindow("settings"),this.closeAllMenus()}),(n=document.querySelector("#menu-app-store"))==null||n.addEventListener("click",()=>{this.wm.openWindow("projects"),this.closeAllMenus()}),(a=document.querySelector("#menu-sleep"))==null||a.addEventListener("click",()=>{this.triggerSleepOverlay(),this.closeAllMenus()}),(o=document.querySelector("#menu-restart"))==null||o.addEventListener("click",()=>{location.reload()}),document.addEventListener("click",r=>{var c;if(!r.target.closest("#apple-dropdown-menu")&&!r.target.closest("#menu-apple-btn")&&(t==null||t.classList.remove("is-visible"),this.isAppleMenuOpen=!1),!r.target.closest("#control-center-panel")&&!r.target.closest("#menu-control-center-btn")&&((c=document.querySelector("#control-center-panel"))==null||c.classList.remove("is-visible"),this.isControlCenterOpen=!1),!r.target.closest("#battery-popover")&&!r.target.closest("#menu-battery-btn")){const d=document.querySelector("#battery-popover");d&&(d.style.display="none"),this.isBatteryOpen=!1}if(!r.target.closest("#wifi-popover")&&!r.target.closest("#menu-wifi-btn")){const d=document.querySelector("#wifi-popover");d&&(d.style.display="none"),this.isWifiOpen=!1}})}setupQuickActions(){var e,t,i,s,n,a;(e=document.querySelector("#menu-active-app-name"))==null||e.addEventListener("click",()=>{this.wm.openWindow("settings")}),(t=document.querySelector("#menu-btn-quick-resume"))==null||t.addEventListener("click",()=>{this.wm.openWindow("resume")}),(i=document.querySelector("#menu-btn-quick-projects"))==null||i.addEventListener("click",()=>{this.wm.openWindow("projects")}),(s=document.querySelector("#menu-btn-quick-ai"))==null||s.addEventListener("click",()=>{this.wm.openWindow("siri")}),(n=document.querySelector("#menu-btn-quick-terminal"))==null||n.addEventListener("click",()=>{this.wm.openWindow("terminal")}),(a=document.querySelector("#menu-btn-quick-contact"))==null||a.addEventListener("click",()=>{this.wm.openWindow("mail")})}setupPopovers(){var n;const e=document.querySelector("#menu-battery-btn"),t=document.querySelector("#battery-popover");e==null||e.addEventListener("click",a=>{a.stopPropagation(),this.closeAllMenus(),this.isBatteryOpen=!this.isBatteryOpen,t&&(t.style.display=this.isBatteryOpen?"flex":"none")});const i=document.querySelector("#menu-wifi-btn"),s=document.querySelector("#wifi-popover");i==null||i.addEventListener("click",a=>{a.stopPropagation(),this.closeAllMenus(),this.isWifiOpen=!this.isWifiOpen,s&&(s.style.display=this.isWifiOpen?"flex":"none")}),(n=document.querySelector("#btn-open-network-settings"))==null||n.addEventListener("click",()=>{this.closeAllMenus(),this.wm.openWindow("social")})}setupControlCenter(){const e=document.querySelector("#menu-control-center-btn"),t=document.querySelector("#control-center-panel");e==null||e.addEventListener("click",a=>{a.stopPropagation(),this.closeAllMenus(),this.isControlCenterOpen=!this.isControlCenterOpen,t==null||t.classList.toggle("is-visible",this.isControlCenterOpen)});const i=document.querySelector("#cc-dark-mode-toggle");i==null||i.addEventListener("click",()=>{document.body.classList.toggle("light-mode"),i.classList.toggle("active")});const s=document.querySelector("#cc-focus-toggle");s==null||s.addEventListener("click",()=>{s.classList.toggle("active"),s.classList.contains("active")?(document.body.classList.add("placement-focus-mode"),this.showNotification("Placement Focus Active","Prioritizing candidate CGPA (8.73), VLSI & recent projects.")):document.body.classList.remove("placement-focus-mode")});const n=document.querySelector("#cc-brightness-slider");n==null||n.addEventListener("input",a=>{const o=a.target.value;document.documentElement.style.filter=`brightness(${o}%)`}),this.setupControlCenterTypography()}setupControlCenterTypography(){var r;const e=document.querySelector("#cc-font-size-slider"),t=document.querySelector("#cc-font-size-val"),i=document.querySelector("#btn-font-decrease"),s=document.querySelector("#btn-font-increase"),n=document.querySelector("#btn-font-reset"),a=document.querySelectorAll(".cc-font-pill"),o=c=>{t&&(t.textContent=`${c}%`),e&&(e.value=c)};o(L.currentFontSize),a.forEach(c=>{c.classList.toggle("active",c.getAttribute("data-font")===L.currentFontId),c.addEventListener("click",()=>{const d=c.getAttribute("data-font");L.setFontStyle(d),a.forEach(p=>p.classList.remove("active")),c.classList.add("active")})}),e==null||e.addEventListener("input",c=>{const d=parseInt(c.target.value,10);L.setFontSize(d),t&&(t.textContent=`${d}%`)}),i==null||i.addEventListener("click",()=>{L.decreaseFontSize(5),o(L.currentFontSize)}),s==null||s.addEventListener("click",()=>{L.increaseFontSize(5),o(L.currentFontSize)}),n==null||n.addEventListener("click",()=>{L.setFontSize(100),o(100)}),(r=document.querySelector("#ctx-change-typography"))==null||r.addEventListener("click",()=>{this.wm.openWindow("settings");const c=document.querySelector('.settings-nav-item[data-section="typography"]');c==null||c.click()})}setupSpotlight(){const e=document.querySelector("#menu-spotlight-btn"),t=document.querySelector("#spotlight-overlay"),i=document.querySelector("#spotlight-search-input"),s=document.querySelector("#spotlight-results-list"),n=()=>{this.isSpotlightOpen=!this.isSpotlightOpen,t.style.display=this.isSpotlightOpen?"flex":"none",this.isSpotlightOpen&&(i.value="",this.renderSpotlightResults("",s),setTimeout(()=>i.focus(),50))};e==null||e.addEventListener("click",a=>{a.stopPropagation(),n()}),t==null||t.addEventListener("click",a=>{a.target===t&&n()}),i==null||i.addEventListener("input",a=>{this.renderSpotlightResults(a.target.value,s)}),i==null||i.addEventListener("keydown",a=>{if(a.key==="Escape")n();else if(a.key==="Enter"){const o=s.querySelector(".spotlight-item");o&&o.click()}})}renderSpotlightResults(e,t){var o;const i=e.trim().toLowerCase(),s=[{type:"app",title:"Resume (Preview PDF)",sub:"View or download resume",id:"resume",icon:"📄"},{type:"app",title:"Projects (App Store)",sub:"8 engineering projects (recent & hardware/DFIR)",id:"projects",icon:"🛍️"},{type:"app",title:"Siri & Gemini AI Assistant",sub:"Ask questions about Abhishek with AI",id:"siri",icon:"🤖"},{type:"app",title:"Terminal (zsh)",sub:"Interactive command-line interface",id:"terminal",icon:"💻"},{type:"app",title:"Social & Activity Hub",sub:"Live GitHub commits & LinkedIn posts",id:"social",icon:"⚡"},{type:"app",title:"System Settings",sub:"Academic CGPA, hardware stack, wallpapers",id:"settings",icon:"⚙️"},{type:"app",title:"Safari Browser",sub:"Web demos & publications",id:"safari",icon:"🌐"},{type:"app",title:"Mail",sub:"Send placement interview invitation",id:"mail",icon:"✉️"},{type:"detail",title:"CGPA: 8.73 in B.Tech ECE",sub:"Institute of Engineering & Management, Kolkata",id:"resume",icon:"🎓"},{type:"detail",title:"VLSI Design Internship",sub:"Jadavpur University — IC design flow & EDA bare-metal",id:"settings",icon:"⚡"},{type:"detail",title:"Vocational Trainee",sub:"Steel Authority of India Limited (SAIL) — Plant automation",id:"settings",icon:"🏭"},{type:"detail",title:"IEEE IEMENTECH 2026 Publication",sub:"Piezoelectric energy harvesting wearable therapy (DOI)",id:"safari",icon:"📑"},{type:"detail",title:"BitTrace DFIR Bitcoin Forensic Tool",sub:"Live volatile RAM triage, registry hives & ISO/IEC 27037 (Sep 2026)",id:"projects",icon:"🛡️"},{type:"detail",title:"Embedded Night-Vision System",sub:"Active IR + Thermal sensors with YOLOv2 (Sep 2026)",id:"projects",icon:"🌙"},{type:"detail",title:"Logistics Management System",sub:"Python & Django multi-dealer supply chain (Sep 2026)",id:"projects",icon:"📦"}],n=i?s.filter(r=>r.title.toLowerCase().includes(i)||r.sub.toLowerCase().includes(i)):s.slice(0,7);if(n.length===0){t.innerHTML=`
        <div class="spotlight-no-results">
          <p>No matches found for "<strong>${this.escape(i)}</strong>".</p>
          <button class="spotlight-ask-ai" id="btn-spotlight-ask-ai">
            <span>Ask Siri / Gemini AI instead &rarr;</span>
          </button>
        </div>
      `,(o=t.querySelector("#btn-spotlight-ask-ai"))==null||o.addEventListener("click",()=>{var c;document.querySelector("#spotlight-overlay").style.display="none",this.isSpotlightOpen=!1,this.wm.openWindow("siri");const r=document.querySelector("#ai-query-input");r&&(r.value=e,(c=document.querySelector("#ai-chat-form"))==null||c.dispatchEvent(new Event("submit")))});return}t.innerHTML=n.map(r=>`
      <div class="spotlight-item" data-app-id="${r.id}">
        <span class="spotlight-icon">${r.icon}</span>
        <div class="spotlight-text">
          <span class="spotlight-name">${r.title}</span>
          <span class="spotlight-sub">${r.sub}</span>
        </div>
        <span class="spotlight-enter-hint">↵ Open</span>
      </div>
    `).join(""),t.querySelectorAll(".spotlight-item").forEach(r=>{r.addEventListener("click",()=>{const c=r.getAttribute("data-app-id");document.querySelector("#spotlight-overlay").style.display="none",this.isSpotlightOpen=!1,this.wm.openWindow(c)})})}setupKeyboardShortcuts(){window.addEventListener("keydown",e=>{var t;(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"&&(e.preventDefault(),(t=document.querySelector("#menu-spotlight-btn"))==null||t.click())})}closeAllMenus(){var i,s;(i=document.querySelector("#apple-dropdown-menu"))==null||i.classList.remove("is-visible"),(s=document.querySelector("#control-center-panel"))==null||s.classList.remove("is-visible");const e=document.querySelector("#battery-popover");e&&(e.style.display="none");const t=document.querySelector("#wifi-popover");t&&(t.style.display="none"),this.isAppleMenuOpen=!1,this.isControlCenterOpen=!1,this.isBatteryOpen=!1,this.isWifiOpen=!1}triggerSleepOverlay(){const e=document.querySelector("#lock-screen-overlay");e&&(e.style.display="flex",e.addEventListener("click",()=>{e.style.display="none"},{once:!0}))}showNotification(e,t){const i=document.querySelector("#notification-tray");if(!i)return;const s=document.createElement("div");s.className="macos-notification",s.innerHTML=`
      <div class="notif-header">
        <span class="notif-app"> Placement Assistant</span>
        <span class="notif-time">now</span>
      </div>
      <div class="notif-body">
        <strong>${e}</strong>
        <p>${t}</p>
      </div>
    `,i.appendChild(s),setTimeout(()=>{s.classList.add("hide"),setTimeout(()=>s.remove(),400)},4e3)}escape(e){return e.replace(/[&<>'"]/g,"")}}class Y{constructor(e){this.wm=e,this.currentWallpaper="sequoia"}init(){this.setupDesktopIcons(),this.setupContextMenu(),this.setWallpaper(this.currentWallpaper)}setupDesktopIcons(){var t;const e=document.querySelectorAll(".desktop-icon");e.forEach(i=>{i.addEventListener("click",n=>{n.stopPropagation(),e.forEach(a=>a.classList.remove("is-selected")),i.classList.add("is-selected")}),i.addEventListener("dblclick",n=>{n.stopPropagation();const a=i.getAttribute("data-app");a&&this.wm.openWindow(a)});let s=0;i.addEventListener("touchend",n=>{const a=new Date().getTime(),o=a-s;if(o<500&&o>0){const r=i.getAttribute("data-app");r&&this.wm.openWindow(r),n.preventDefault()}s=a})}),(t=document.querySelector("#desktop"))==null||t.addEventListener("click",i=>{(i.target.id==="desktop"||i.target.classList.contains("desktop-wallpaper"))&&e.forEach(s=>s.classList.remove("is-selected"))})}setupContextMenu(){var i,s,n,a,o,r,c;const e=document.querySelector("#desktop-context-menu"),t=document.querySelector("#desktop");!e||!t||(t.addEventListener("contextmenu",d=>{if(d.target.closest(".macos-window")||d.target.closest("input")||d.target.closest("textarea"))return;d.preventDefault();const p=Math.min(window.innerWidth-220,d.clientX),u=Math.min(window.innerHeight-260,d.clientY);e.style.left=`${p}px`,e.style.top=`${u}px`,e.classList.add("is-visible")}),document.addEventListener("click",()=>{e.classList.remove("is-visible")}),(i=document.querySelector("#ctx-open-resume"))==null||i.addEventListener("click",()=>{this.wm.openWindow("resume")}),(s=document.querySelector("#ctx-open-projects"))==null||s.addEventListener("click",()=>{this.wm.openWindow("projects")}),(n=document.querySelector("#ctx-open-ai"))==null||n.addEventListener("click",()=>{this.wm.openWindow("siri")}),(a=document.querySelector("#ctx-open-terminal"))==null||a.addEventListener("click",()=>{this.wm.openWindow("terminal")}),(o=document.querySelector("#ctx-change-typography"))==null||o.addEventListener("click",()=>{this.wm.openWindow("settings"),setTimeout(()=>{const d=document.querySelector('.settings-nav-item[data-section="typography"]');d==null||d.click()},50)}),(r=document.querySelector("#ctx-change-wallpaper"))==null||r.addEventListener("click",()=>{this.wm.openWindow("settings"),setTimeout(()=>{const d=document.querySelector('.settings-nav-item[data-section="wallpaper"]');d==null||d.click()},50)}),(c=document.querySelector("#ctx-get-info"))==null||c.addEventListener("click",()=>{this.wm.openWindow("settings")}))}setWallpaper(e){this.currentWallpaper=e;const t=document.querySelector("#desktop-wallpaper");t&&(t.className="desktop-wallpaper wp-"+e,e==="sequoia"?(t.style.backgroundImage="url('/wallpapers/sequoia.jpg')",t.style.backgroundSize="cover",t.style.backgroundPosition="center"):e==="sonoma"?(t.style.backgroundImage="url('/wallpapers/sonoma.jpg')",t.style.backgroundSize="cover",t.style.backgroundPosition="center"):e==="cyberpunk"?t.style.backgroundImage="radial-gradient(circle at top right, #11e8bb 0%, #0d1117 70%)":e==="monterey"?t.style.backgroundImage="linear-gradient(135deg, #7928ca 0%, #ff0080 50%, #ff4d4d 100%)":e==="space"&&(t.style.backgroundImage="radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)"))}}class J{constructor(e="ambient-3d-canvas"){this.canvas=document.getElementById(e),this.canvas&&(this.ctx=this.canvas.getContext("2d"),this.particles=[],this.numParticles=45,this.mouseX=0,this.mouseY=0,this.targetMouseX=0,this.targetMouseY=0,this.fov=300,this.isRunning=!0,this.init())}init(){this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("mousemove",e=>{this.targetMouseX=(e.clientX-window.innerWidth/2)*.4,this.targetMouseY=(e.clientY-window.innerHeight/2)*.4});for(let e=0;e<this.numParticles;e++)this.particles.push({x:(Math.random()-.5)*window.innerWidth*1.5,y:(Math.random()-.5)*window.innerHeight*1.5,z:Math.random()*600-300,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,vz:(Math.random()-.5)*.8,radius:Math.random()*2.5+1.2,hue:Math.random()>.5?210:280});this.animate()}resize(){this.canvas&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight)}animate(){if(!this.isRunning||!this.ctx)return;this.mouseX+=(this.targetMouseX-this.mouseX)*.05,this.mouseY+=(this.targetMouseY-this.mouseY)*.05,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);const e=this.canvas.width/2,t=this.canvas.height/2,i=[];for(let s of this.particles){s.x+=s.vx,s.y+=s.vy,s.z+=s.vz,s.x<-window.innerWidth&&(s.x=window.innerWidth),s.x>window.innerWidth&&(s.x=-window.innerWidth),s.y<-window.innerHeight&&(s.y=window.innerHeight),s.y>window.innerHeight&&(s.y=-window.innerHeight),s.z<-300&&(s.z=300),s.z>300&&(s.z=-300);const n=s.x-this.mouseX,a=s.y-this.mouseY,o=s.z+500,r=this.fov/o,c=e+n*r,d=t+a*r,p=Math.max(.08,Math.min(.65,(600-s.z)/600));i.push({x:c,y:d,scale:r,alpha:p,radius:s.radius*r,hue:s.hue})}this.ctx.lineWidth=.8;for(let s=0;s<i.length;s++)for(let n=s+1;n<i.length;n++){const a=i[s],o=i[n],r=a.x-o.x,c=a.y-o.y,d=Math.sqrt(r*r+c*c);if(d<130){const p=(1-d/130)*.18*Math.min(a.alpha,o.alpha);this.ctx.strokeStyle=`hsla(210, 85%, 65%, ${p})`,this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y),this.ctx.lineTo(o.x,o.y),this.ctx.stroke()}}for(let s of i)this.ctx.fillStyle=`hsla(${s.hue}, 90%, 65%, ${s.alpha})`,this.ctx.shadowBlur=8,this.ctx.shadowColor=`hsla(${s.hue}, 90%, 65%, 0.6)`,this.ctx.beginPath(),this.ctx.arc(s.x,s.y,Math.max(.5,s.radius),0,Math.PI*2),this.ctx.fill(),this.ctx.shadowBlur=0;requestAnimationFrame(()=>this.animate())}}class ${static attach(e,t={}){const i=t.maxTilt||12,s=t.perspective||1e3,n=t.scale||1.03,a=t.glare!==!1;e.forEach(o=>{if(!o||o.dataset.tiltAttached)return;o.dataset.tiltAttached="true";let r=null;a&&!o.querySelector(".tilt-glare")?(r=document.createElement("div"),r.className="tilt-glare",o.style.position=o.style.position||"relative",o.style.overflow="hidden",o.appendChild(r)):r=o.querySelector(".tilt-glare"),o.style.transformStyle="preserve-3d",o.style.transition="transform 0.15s ease-out";let c=null;const d=()=>{c=o.getBoundingClientRect(),o.style.transition="none"},p=h=>{c||(c=o.getBoundingClientRect());const g=h.clientX-c.left,v=h.clientY-c.top,b=g/c.width*2-1,E=-(v/c.height*2-1)*i,I=b*i;if(o.style.transform=`perspective(${s}px) rotateX(${E.toFixed(2)}deg) rotateY(${I.toFixed(2)}deg) scale3d(${n}, ${n}, ${n})`,r){const C=(g/c.width*100).toFixed(1),D=(v/c.height*100).toFixed(1);r.style.opacity="1",r.style.background=`radial-gradient(circle at ${C}% ${D}%, rgba(255,255,255,0.25) 0%, transparent 65%)`}},u=()=>{o.style.transition="transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",o.style.transform=`perspective(${s}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,r&&(r.style.opacity="0"),c=null};o.addEventListener("mouseenter",d),o.addEventListener("mousemove",p),o.addEventListener("mouseleave",u)})}}class X{constructor(){this.customApiKey=typeof localStorage<"u"&&localStorage.getItem("abhishek_portfolio_gemini_key")||"",this.systemContext=this.buildSystemPrompt()}setApiKey(e){this.customApiKey=e.trim(),typeof localStorage<"u"&&(this.customApiKey?localStorage.setItem("abhishek_portfolio_gemini_key",this.customApiKey):localStorage.removeItem("abhishek_portfolio_gemini_key"))}hasCustomKey(){return!!this.customApiKey}buildSystemPrompt(){return`You are "Siri for Abhishek", an intelligent, articulate, and highly professional placement agent representing Abhishek Kumar, a B.Tech Electronics and Communication Engineering (ECE) student (Class of 2027) at Institute of Engineering & Management (IEM), Kolkata.

Your job is to assist recruiters, hiring managers, and interviewers by providing crisp, accurate, and compelling details about Abhishek's qualifications, internships, projects, skills, and academic achievements.

Profile Highlights:
- Name: Abhishek Kumar
- Email: ${l.personal.email} | Phone: ${l.personal.phone}
- LinkedIn: ${l.personal.linkedin} | GitHub: ${l.personal.github}
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

Always answer warmly, concisely, and with persuasive evidence of Abhishek's technical readiness for placements.`}async ask(e){const t=e.trim();if(!t)return"Please enter a question about Abhishek's skills, projects, or background.";if(this.customApiKey)try{const i=await this.callGeminiAPI(t);if(i)return i}catch(i){console.warn("Live Gemini API call failed, falling back to local semantic intelligence:",i)}return this.localSemanticSearch(t)}async query(e){return this.ask(e)}async callGeminiAPI(e){var n,a,o,r,c,d;const t=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.customApiKey}`,i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:`${this.systemContext}

User Question: ${e}

Answer concisely in 2-4 sentences with markdown formatting:`}]}],generationConfig:{temperature:.2,maxOutputTokens:300}})});if(!i.ok){const p=await i.json().catch(()=>({}));throw new Error(((n=p.error)==null?void 0:n.message)||`HTTP ${i.status}`)}return(d=(c=(r=(o=(a=(await i.json()).candidates)==null?void 0:a[0])==null?void 0:o.content)==null?void 0:r.parts)==null?void 0:c[0])==null?void 0:d.text}localSemanticSearch(e){const t=e.toLowerCase();let i=null,s=0;for(const n of l.qaKnowledgeBase){let a=0;for(const o of n.keywords)t.includes(o)&&(a+=1);a>s&&(s=a,i=n.answer)}return s>=1?i:t.includes("who")||t.includes("abhishek")||t.includes("intro")||t.includes("about")?`**${l.personal.name}** is a **B.Tech ECE 4th year candidate** (Class of 2027) at **Institute of Engineering & Management (IEM), Kolkata** with an **8.73 CGPA**.

He specializes in **Embedded Systems, Hardware-Software Co-Design, and Software Engineering (Python/C++)**. He has published research with IEEE (IEMENTECH 2026) and completed industrial internships at **Jadavpur University** (VLSI Design) and **SAIL** (Plant Automation).`:t.includes("project")||t.includes("work")||t.includes("portfolio")||t.includes("build")?`Abhishek has engineered standout projects across digital forensics, hardware, AI, and software:

• **BitTrace DFIR** (Recent): Automated Live RAM & Postmortem Bitcoin Forensic platform with ISO/IEC 27037 evidence vault.
• **Embedded Night-Vision System** (Recent): Active IR + Thermal sensor fusion with YOLOv2 for pedestrian recognition.
• **Logistics Management System** (Recent): Enterprise multi-dealer supply-chain tracking engine in Python/Django.
• **Piezo-electric Acupressure Wearable**: Microcontroller IoT system harvesting kinetic energy for depression management (Published in IEEE).
• **Camera-Assisted 7-State Traffic Controller**: Dynamic algorithmic FSM in C simulated on Xilinx Vivado.
• **YourFinance**: Budget control center powered by Google Gemini AI.`:t.includes("intern")||t.includes("experience")||t.includes("company")||t.includes("work experience")?`Abhishek has completed two high-impact internships:

1. **VLSI Design Intern @ Jadavpur University** (Dec 2025 - Jan 2026): Optimized IC architectures and analyzed time-critical processing pipelines using EDA tools in bare-metal environments.
2. **Vocational Trainee @ Steel Authority of India Limited (SAIL)** (May 2025 - June 2025): Developed plant automation modules and managed telemetry databases for industrial manufacturing lines.`:t.includes("education")||t.includes("college")||t.includes("school")||t.includes("iem")?`Abhishek's academic qualifications:

• **B.Tech in ECE**: Institute of Engineering & Management (IEM), Kolkata (2023–2027) — **CGPA: 8.73**
• **Class 12 (CBSE)**: M.G.M. Higher Secondary School, Bokaro (2023) — **86.5%**
• **Class 10 (CBSE)**: M.G.M. Higher Secondary School, Bokaro (2021) — **95.0%**`:t.includes("skill")||t.includes("language")||t.includes("tool")||t.includes("python")||t.includes("c++")?`Abhishek's technical stack:

• **Core Languages**: C, C++, Embedded C, Python, MATLAB, JavaScript/TypeScript, OOP
• **Embedded & Hardware**: Microcontrollers (ARM/AVR/ESP), GPIO/UART/SPI/I2C interfacing, Digital Logic, FSMs, Control Systems
• **Security & Forensics**: Live Volatile RAM Triage, ISO/IEC 27037 Evidence Handling, Windows Prefetch & Registry Analysis, Cryptographic Hashing
• **Tools & Platforms**: Xilinx Vivado, Wokwi Simulator, EDA tools, Git/GitHub, CI/CD, Agile/Jira, LaTeX
• **Frameworks & Cloud**: FastAPI, React, Django, REST APIs, UC San Diego IoT & AI Cloud certification`:t.includes("hire")||t.includes("placement")||t.includes("recruit")||t.includes("role")?`**Top Reasons to Hire Abhishek Kumar:**

1. **Strong Academic Pedigree**: 8.73 CGPA with deep grasp of control systems, digital logic, and algorithms.
2. **Dual-Spectrum Competency**: Rare skill combination of bare-metal embedded firmware/VLSI + modern high-level Python/FastAPI/Django/AI systems.
3. **Published IEEE Author**: Demonstrates independent research, peer-reviewed rigor, and creative problem-solving.
4. **Systems & Security Depth**: Engineered BitTrace DFIR for live volatile memory analysis and cryptographic chain of custody.
5. **Industrial Proof**: Proven delivery in bare-metal EDA research at Jadavpur Univ and plant automation at SAIL.`:t.includes("contact")||t.includes("email")||t.includes("phone")||t.includes("linkedin")||t.includes("portfolio")||t.includes("link")||t.includes("website")?`Get in touch with Abhishek:

• **Live Portfolio**: [abhishek947kumar.github.io/portfolio](https://abhishek947kumar.github.io/portfolio/)
• **Email**: [abhishek1297kumar@gmail.com](mailto:abhishek1297kumar@gmail.com)
• **Phone**: +91 9470303282
• **LinkedIn**: [linkedin.com/in/abhishek947kumar](https://www.linkedin.com/in/abhishek947kumar)
• **GitHub**: [github.com/abhishek947kumar](https://github.com/abhishek947kumar)`:`Abhishek Kumar is a B.Tech ECE student at IEM Kolkata (CGPA 8.73, Class of 2027) with an IEEE publication at IEMENTECH 2026, VLSI internship at Jadavpur University, industrial training at SAIL, and multiple recent projects in Systems & Forensics (BitTrace DFIR), Embedded Systems (YOLOv2 Night-Vision, Piezoelectric wearable, 7-state Vivado traffic controller) and Software/AI.

Feel free to ask about his **CGPA**, **internships**, **recent projects from the last week**, **IEEE paper**, or **why you should hire him**!`}}const F=new X;class Q{constructor(e){this.canvas=document.getElementById(e),this.canvas&&(this.ctx=this.canvas.getContext("2d"),this.scrollProgress=0,this.targetProgress=0,this.rotX=.3,this.rotY=0,this.rotZ=0,this.zoom=1,this.width=0,this.height=0,this.particles=[],this.numParticles=50,this.init())}init(){this.resize(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("scroll",()=>this.onScroll(),{passive:!0});for(let e=0;e<this.numParticles;e++)this.particles.push({x:(Math.random()-.5)*600,y:(Math.random()-.5)*600,z:(Math.random()-.5)*600,speed:.2+Math.random()*.4,size:1+Math.random()*2,alpha:.2+Math.random()*.6});this.onScroll(),this.animate()}resize(){if(!this.canvas)return;const e=this.canvas.getBoundingClientRect(),t=Math.min(window.devicePixelRatio||1,2);this.width=e.width||window.innerWidth,this.height=e.height||600,this.canvas.width=this.width*t,this.canvas.height=this.height*t,this.ctx.scale(t,t)}onScroll(){const e=document.getElementById("cinematic-hero");if(!e){const n=document.documentElement.scrollHeight-window.innerHeight;this.targetProgress=n>0?window.scrollY/n:0;return}const t=e.getBoundingClientRect(),i=window.innerHeight*2,s=Math.max(0,Math.min(1,-t.top/i));this.targetProgress=s}animate(){this.scrollProgress+=(this.targetProgress-this.scrollProgress)*.08,this.rotY=this.scrollProgress*Math.PI*2.5+Date.now()*3e-4,this.rotX=.45+Math.sin(this.scrollProgress*Math.PI)*.35,this.rotZ=Math.sin(this.scrollProgress*Math.PI*2)*.2,this.zoom=1+this.scrollProgress*.6,this.render(),requestAnimationFrame(()=>this.animate())}project(e,t,i){let s=Math.cos(this.rotY),n=Math.sin(this.rotY),a=Math.cos(this.rotX),o=Math.sin(this.rotX),r=Math.cos(this.rotZ),c=Math.sin(this.rotZ),d=e*s+i*n,p=t,u=-e*n+i*s,h=d,g=p*a-u*o,v=p*o+u*a,b=h*r-g*c,k=h*c+g*r,E=v;const I=420*this.zoom,C=500+E,D=C>10?I/C:0;return{x:this.width/2+b*D,y:this.height/2+k*D,z:E,scale:D}}render(){const e=this.ctx;e.clearRect(0,0,this.width,this.height),this.particles.forEach(a=>{a.y-=a.speed,a.y<-300&&(a.y=300);const o=this.project(a.x,a.y,a.z);o.scale>0&&(e.beginPath(),e.arc(o.x,o.y,a.size*o.scale*.8,0,Math.PI*2),e.fillStyle=`rgba(100, 210, 255, ${a.alpha*.6})`,e.fill())});const t=130,i=12,s=this.scrollProgress*65;this.drawBox(0,20+s*.4,0,t+40,6,t+40,"#0a2318","#00ff88",.25),this.drawBox(0,8+s*.8,0,t+10,5,t+10,"#161922","#0070f3",.35),this.drawBox(0,-6-s*.2,0,t-20,i,t-20,"#1d2130","#64d2ff",.7),this.drawBox(0,-28-s*1.2,0,t-35,4,t-35,"#2e344a","#a855f7",.85);const n=18;for(let a=-t/2;a<=t/2;a+=n)this.drawPin(a,23+s*.4,-t/2-14),this.drawPin(a,23+s*.4,t/2+14),this.drawPin(-t/2-14,23+s*.4,a),this.drawPin(t/2+14,23+s*.4,a);this.drawCircuitTraces(s),this.drawHologramText(s)}drawBox(e,t,i,s,n,a,o,r,c){const d=this.ctx,p=s/2,u=n/2,h=a/2,g=[[-p,-u,-h],[p,-u,-h],[p,u,-h],[-p,u,-h],[-p,-u,h],[p,-u,h],[p,u,h],[-p,u,h]].map(([b,k,E])=>this.project(e+b,t+k,i+E));[{pts:[0,1,2,3],norm:[0,0,-1]},{pts:[5,4,7,6],norm:[0,0,1]},{pts:[4,0,3,7],norm:[-1,0,0]},{pts:[1,5,6,2],norm:[1,0,0]},{pts:[4,5,1,0],norm:[0,-1,0]},{pts:[3,2,6,7],norm:[0,1,0]}].forEach(b=>{d.beginPath();const k=g[b.pts[0]];d.moveTo(k.x,k.y);for(let E=1;E<b.pts.length;E++){const I=g[b.pts[E]];d.lineTo(I.x,I.y)}d.closePath(),d.fillStyle=o,d.globalAlpha=c,d.fill(),d.strokeStyle=r,d.lineWidth=1,d.stroke(),d.globalAlpha=1})}drawPin(e,t,i){const s=this.project(e,t,i),n=this.project(e,t+8,i);s.scale>0&&n.scale>0&&(this.ctx.beginPath(),this.ctx.moveTo(s.x,s.y),this.ctx.lineTo(n.x,n.y),this.ctx.strokeStyle="#ffd700",this.ctx.lineWidth=2*s.scale,this.ctx.stroke())}drawCircuitTraces(e){const t=this.ctx;[[[-40,-6,-40],[0,-6,-20],[30,-6,-35]],[[-30,-6,20],[-10,-6,0],[40,-6,25]],[[0,-6,-40],[15,-6,0],[-25,-6,35]]].forEach((s,n)=>{t.beginPath();const a=["#00f2fe","#38ef7d","#ff007f"];t.strokeStyle=a[n%a.length],t.lineWidth=1.8,s.forEach(([o,r,c],d)=>{const p=this.project(o,r-e*.2,c);d===0?t.moveTo(p.x,p.y):t.lineTo(p.x,p.y)}),t.stroke()})}drawHologramText(e){const t=this.project(0,-45-e*1.5,0);if(t.scale<=0)return;const i=this.ctx;i.save(),i.font=`700 ${Math.max(10,13*t.scale)}px -apple-system, sans-serif`,i.fillStyle="#64d2ff",i.textAlign="center",i.fillText("ABHISHEK-CORE • ECE 2027",t.x,t.y),i.font=`500 ${Math.max(8,10*t.scale)}px -apple-system, sans-serif`,i.fillStyle="rgba(255, 255, 255, 0.7)",i.fillText("8.73 CGPA • VLSI & BARE-METAL EDA",t.x,t.y+14*t.scale),i.restore()}}class Z{constructor(e){this.modeSwitcher=e,this.scrollyCanvas=null,this.activeFilter="all"}render(){return`
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
              <h3 class="cine-profile-name">${l.personal.name}</h3>
              <div class="cine-profile-role">B.Tech ECE 4th Year Candidate • VLSI & Software</div>
              <p class="cine-profile-bio">
                ${l.personal.summary}
              </p>
              <div class="cine-social-links-row">
                <a href="${l.personal.portfolio}" target="_blank" class="cine-social-btn" title="Live Portfolio Website">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </a>
                <a href="${l.personal.linkedin}" target="_blank" class="cine-social-btn" title="LinkedIn">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="${l.personal.github}" target="_blank" class="cine-social-btn" title="GitHub">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="mailto:${l.personal.email}" class="cine-social-btn" title="Email">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            <div class="cine-skills-box">
              <h4>Domain Mastery & Technical Breadth</h4>
              <p>Evaluated through academic rigour, industrial internships, simulation environments, and physical deployments:</p>

              ${l.skills.domains.map(e=>`
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

              <div class="cine-tags-cluster">
                ${l.skills.tools.map(e=>`<span class="cine-tech-pill">${e}</span>`).join("")}
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
                ${l.internships.map(e=>`
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
                ${l.education.map(e=>`
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
            <h3 class="pub-title-big">"${l.publications[0].title}"</h3>
            <div class="pub-venue-line">${l.publications[0].venue}</div>
            <p class="pub-abstract-text">${l.publications[0].summary}</p>
            <div class="pub-actions-row">
              <a href="${l.publications[0].link}" target="_blank" class="btn-pub-doi">
                <span>View on IEEE Xplore Digital Library</span>
                <span>↗</span>
              </a>
              <span class="pub-author-tag">Authors: Abhishek Kumar et al. • DOI: ${l.publications[0].doi}</span>
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
              <button class="ai-suggest-chip" data-q="Tell me about the BitTrace Bitcoin Forensics tool built this week">BitTrace Bitcoin Forensics?</button>
              <button class="ai-suggest-chip" data-q="What are Abhishek's VLSI and bare-metal EDA skills?">VLSI & Bare-Metal Skills?</button>
              <button class="ai-suggest-chip" data-q="Tell me about his IEEE conference publication">IEEE Publication Details?</button>
              <button class="ai-suggest-chip" data-q="What projects did Abhishek build in the last week and recent months?">Projects in Last Week?</button>
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
                  <strong>${l.personal.email}</strong>
                </div>
              </div>

              <div class="contact-meta-row">
                <div class="contact-meta-icon">📱</div>
                <div>
                  <div style="font-size: 11px; color: var(--cine-text-muted);">Phone / WhatsApp</div>
                  <strong>${l.personal.phone}</strong>
                </div>
              </div>

              <div class="contact-meta-row">
                <div class="contact-meta-icon">📍</div>
                <div>
                  <div style="font-size: 11px; color: var(--cine-text-muted);">Primary Locations</div>
                  <strong>${l.personal.location}</strong>
                </div>
              </div>

              <div style="margin-top: 24px; display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="${l.personal.portfolio}" target="_blank" class="btn-cine-primary" style="font-size: 13px;">
                  🌐 Live Portfolio ↗
                </a>
                <a href="${l.personal.linkedin}" target="_blank" class="btn-cine-secondary" style="font-size: 13px;">
                  Connect on LinkedIn ↗
                </a>
                <a href="${l.personal.github}" target="_blank" class="btn-cine-secondary" style="font-size: 13px;">
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
    `}renderProjectCards(e){let t=l.projects;return e==="recent"?t=t.filter(i=>i.createdPeriod==="Last 6 Months"||i.createdPeriod==="Last 1 Week"||i.badge.includes("Recent")):e==="embedded"?t=t.filter(i=>i.tags.some(s=>["Embedded Systems","VLSI","IoT","Wokwi","Hardware"].includes(s))||i.title.toLowerCase().includes("embedded")||i.title.toLowerCase().includes("traffic")):e==="software"&&(t=t.filter(i=>i.tags.some(s=>["Python","FastAPI","Django","REST APIs","Enterprise Architecture","AI","Digital Forensics","Cryptography"].includes(s)))),t.map(i=>`
      <div class="cine-project-card ${i.createdPeriod==="Last 6 Months"||i.createdPeriod==="Last 1 Week"?"is-hot":""}">
        <div class="cine-project-top">
          <span class="${i.createdPeriod==="Last 6 Months"||i.createdPeriod==="Last 1 Week"?"cine-tag-hot":"cine-tag-normal"}">
            ${i.badge}
          </span>
          <span class="cine-project-period">${i.createdPeriod}</span>
        </div>

        <h3 class="cine-project-title">${i.title}</h3>
        <div class="cine-project-sub">${i.subtitle}</div>
        <p class="cine-project-desc">${i.description}</p>

        <div class="cine-project-techs">
          ${i.tags.map(s=>`<span class="tech-chip">${s}</span>`).join("")}
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
    `).join("")}initListeners(e){try{this.scrollyCanvas=new Q("scrolly-canvas")}catch(m){console.warn("ScrollyCanvas init note:",m)}$.attach(e.querySelectorAll(".cine-project-card"),{maxTilt:8,scale:1.02,glare:!0}),$.attach(e.querySelectorAll(".metric-stat-card"),{maxTilt:6,scale:1.03});const t=e.querySelector("#cine-nav-track"),i=e.querySelector("#cine-nav-slider"),s=e.querySelectorAll(".cine-nav-link"),n=m=>{if(!m||!i||!t)return;const f=t.getBoundingClientRect(),y=m.getBoundingClientRect();if(y.width===0||y.height===0)return;const S=y.left-f.left+(t.scrollLeft||0),P=y.top-f.top+(t.scrollTop||0);i.style.width=`${y.width}px`,i.style.height=`${y.height}px`,i.style.transform=`translate3d(${S}px, ${P}px, 0)`,i.style.opacity="1"},a=["hero","about","projects","experience","research","ai-assistant","contact"];let o=!1,r=null;const c=()=>{if(o)return;const m=Math.min(260,window.innerHeight*.35);let f=a[0];const y=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,document.documentElement.offsetHeight,document.body.offsetHeight),S=window.scrollY||window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;if((window.innerHeight||document.documentElement.clientHeight||800)+S>=y-80)f=a[a.length-1];else for(const R of a){const T=document.getElementById(R);T&&T.getBoundingClientRect().top<=m&&(f=R)}const x=e.querySelector(`.cine-nav-link[data-section="${f}"]`);x&&!x.classList.contains("active")&&(s.forEach(R=>R.classList.remove("active")),x.classList.add("active"),n(x));const q=e.querySelector(`.cine-mobile-nav-link[data-section="${f}"]`);q&&!q.classList.contains("active")&&(e.querySelectorAll(".cine-mobile-nav-link").forEach(R=>R.classList.remove("active")),q.classList.add("active"))};window.addEventListener("scroll",c,{passive:!0}),document.addEventListener("scroll",c,{passive:!0}),document.body.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",()=>{const m=e.querySelector(".cine-nav-link.active")||s[0];n(m)}),window.addEventListener("hashchange",()=>{setTimeout(c,60)});const d=()=>{const m=window.location.hash?window.location.hash.replace("#",""):null;let f=m?e.querySelector(`.cine-nav-link[data-section="${m}"]`):null;f||(f=e.querySelector(".cine-nav-link.active")||s[0]),f&&(s.forEach(y=>y.classList.remove("active")),f.classList.add("active"),n(f))};d(),setTimeout(d,100),setTimeout(d,350),setTimeout(c,400),s.forEach(m=>{m.addEventListener("click",f=>{f.preventDefault();const y=m.getAttribute("href").replace("#",""),S=document.getElementById(y);S&&(o=!0,s.forEach(P=>P.classList.remove("active")),m.classList.add("active"),n(m),S.scrollIntoView({behavior:"smooth"}),history.pushState&&history.pushState(null,"",`#${y}`),clearTimeout(r),r=setTimeout(()=>{o=!1,c()},850))})}),e.querySelectorAll('a[href^="#"]').forEach(m=>{m.classList.contains("cine-nav-link")||m.classList.contains("cine-mobile-nav-link")||m.addEventListener("click",f=>{const y=m.getAttribute("href").replace("#",""),S=document.getElementById(y);if(S&&a.includes(y)){f.preventDefault(),o=!0;const P=e.querySelector(`.cine-nav-link[data-section="${y}"]`);P&&(s.forEach(x=>x.classList.remove("active")),P.classList.add("active"),n(P)),S.scrollIntoView({behavior:"smooth"}),history.pushState&&history.pushState(null,"",`#${y}`),clearTimeout(r),r=setTimeout(()=>{o=!1,c()},850)}})});const u=e.querySelector("#cine-mobile-toggle"),h=e.querySelector("#cine-mobile-drawer"),g=e.querySelectorAll(".cine-mobile-nav-link"),v=(m=!1)=>{!h||!u||(m||h.classList.contains("open")?(h.classList.remove("open"),u.classList.remove("open")):(h.classList.add("open"),u.classList.add("open")))};u==null||u.addEventListener("click",m=>{m.stopPropagation(),v()}),g.forEach(m=>{m.addEventListener("click",f=>{f.preventDefault();const y=m.getAttribute("href").replace("#",""),S=document.getElementById(y);if(v(!0),S){o=!0,g.forEach(x=>x.classList.remove("active")),m.classList.add("active");const P=e.querySelector(`.cine-nav-link[data-section="${y}"]`);P&&(s.forEach(x=>x.classList.remove("active")),P.classList.add("active"),n(P)),S.scrollIntoView({behavior:"smooth"}),history.pushState&&history.pushState(null,"",`#${y}`),clearTimeout(r),r=setTimeout(()=>{o=!1,c()},850)}})}),document.addEventListener("click",m=>{h!=null&&h.classList.contains("open")&&!h.contains(m.target)&&!(u!=null&&u.contains(m.target))&&v(!0)});const b=e.querySelector(".btn-mobile-hire");b==null||b.addEventListener("click",()=>{v(!0)});const k=e.querySelectorAll(".cine-filter-btn"),E=e.querySelector("#cine-projects-grid");k.forEach(m=>{m.addEventListener("click",()=>{k.forEach(y=>y.classList.remove("active")),m.classList.add("active");const f=m.getAttribute("data-filter");this.activeFilter=f,E.innerHTML=this.renderProjectCards(f),$.attach(E.querySelectorAll(".cine-project-card"),{maxTilt:8,scale:1.02,glare:!0})})});const I=e.querySelector("#cine-chat-log"),C=e.querySelector("#cine-ai-form"),D=e.querySelector("#cine-ai-input"),z=e.querySelectorAll(".ai-suggest-chip"),j=m=>{if(!m)return"";const y=m.replace(/([.!?:]?)\s+(?:and\s+)?([1-9]\d?[\.\)])\s+/g,`$1
• `).replace(/([.!?:]?)\s+(?:and\s+)?([•\-])\s+/g,`$1
• `).split(`
`),S=[];for(let P of y){let x=P.trim();if(!x)continue;const q=x.startsWith("•")||x.startsWith("-")||/^([1-9]\d?[\.\)]|[•\-\*])/.test(x);let T=x.replace(/^([•\-\*]|[1-9]\d?[\.\)])\s*/,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");T=T.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),T=T.replace(/\*(.*?)\*/g,"<em>$1</em>"),T=T.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" class="ai-chat-link">$1</a>'),q?S.push(`
            <div class="ai-bullet-item">
              <span class="ai-bullet-icon">🔹</span>
              <div class="ai-bullet-text">${T}</div>
            </div>
          `):S.push(`<div class="ai-para-item">${T}</div>`)}return S.join("")},G=async m=>{if(!m.trim())return;const f=document.createElement("div");f.className="cine-chat-msg user",f.textContent=`Q: ${m}`,I.appendChild(f);const y=document.createElement("div");y.className="cine-chat-msg assistant",y.innerHTML=`<span style="opacity: 0.7;">Thinking... searching Abhishek's verified credentials...</span>`,I.appendChild(y),I.scrollTop=I.scrollHeight;try{const S=await F.query(m);y.innerHTML=j(S)}catch(S){console.error("AI query error:",S),y.innerHTML="I am ready to assist! Please ask about Abhishek's <strong>CGPA (8.73)</strong>, <strong>VLSI internship</strong>, <strong>SAIL automation</strong>, <strong>IEEE publication</strong>, or <strong>projects in the last 6 months</strong>."}I.scrollTop=I.scrollHeight};C==null||C.addEventListener("submit",m=>{m.preventDefault();const f=D.value;D.value="",G(f)}),z.forEach(m=>{m.addEventListener("click",()=>{const f=m.getAttribute("data-q");G(f)})});const B=e.querySelector("#cine-contact-form"),A=e.querySelector("#cine-form-feedback");B==null||B.addEventListener("submit",m=>{m.preventDefault();const f=e.querySelector("#cine-name").value,y=e.querySelector("#cine-role").value,S=e.querySelector("#cine-msg").value;A&&(A.style.display="block",A.textContent=`✓ Thank you ${f}! Your interview invite regarding "${y}" has been recorded.`);const P=`mailto:abhishek1297kumar@gmail.com?subject=Placement Opportunity: ${encodeURIComponent(y)} from ${encodeURIComponent(f)}&body=${encodeURIComponent(S)}`;window.open(P,"_blank"),B.reset()})}}class ee{constructor(){this.currentMode="cinematic",this.cinematicContainer=null,this.desktopContainer=null,this.listeners=[]}init(e,t){this.cinematicContainer=e,this.desktopContainer=t,this.applyMode("cinematic")}onModeChange(e){this.listeners.push(e)}switchTo(e){this.applyMode("cinematic")}applyMode(e){this.cinematicContainer&&(this.cinematicContainer.style.display="block",this.desktopContainer&&(this.desktopContainer.style.display="none"),document.documentElement.style.height="auto",document.documentElement.style.overflowY="auto",document.documentElement.style.overflowX="hidden",document.body.style.height="auto",document.body.style.overflowY="auto",document.body.style.overflowX="hidden",document.title="Abhishek Kumar — Portfolio | B.Tech ECE (8.73 CGPA)")}}const H=new ee;class te{constructor(){this.currentPage=1,this.zoomLevel=100}render(){return`
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
                  <h1 class="doc-name">${l.personal.name}</h1>
                  <p class="doc-address">${l.personal.address}</p>
                  <div class="doc-contact-row">
                    <a href="mailto:${l.personal.email}" class="doc-link">${l.personal.email}</a>
                    <span class="bullet">•</span>
                    <span>${l.personal.phone}</span>
                    <span class="bullet">•</span>
                    <a href="${l.personal.portfolio}" target="_blank" rel="noreferrer" class="doc-link">${l.personal.portfolioHandle}</a>
                    <span class="bullet">•</span>
                    <a href="${l.personal.linkedin}" target="_blank" rel="noreferrer" class="doc-link">linkedin.com/in/abhishek947kumar</a>
                    <span class="bullet">•</span>
                    <a href="${l.personal.github}" target="_blank" rel="noreferrer" class="doc-link">github.com/abhishek947kumar</a>
                  </div>
                </header>

                <!-- ABOUT ME -->
                <section class="doc-section">
                  <h2 class="doc-section-title">ABOUT ME</h2>
                  <div class="doc-divider"></div>
                  <p class="doc-text">${l.personal.summary}</p>
                </section>

                <!-- EDUCATION -->
                <section class="doc-section">
                  <h2 class="doc-section-title">EDUCATION</h2>
                  <div class="doc-divider"></div>
                  ${l.education.map(e=>`
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
                  ${l.internships.map(e=>`
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
                  ${l.projects.slice(0,2).map(e=>`
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
                  <span class="doc-name-small">${l.personal.name} — Page 2</span>
                  <span class="doc-contact-small">${l.personal.email} | ${l.personal.portfolioHandle} | ${l.personal.phone}</span>
                </header>

                <!-- PUBLICATIONS & CERTIFICATIONS -->
                <section class="doc-section">
                  <h2 class="doc-section-title">PUBLICATIONS & CERTIFICATIONS</h2>
                  <div class="doc-divider"></div>
                  <ul class="doc-bullet-list">
                    ${l.publications.map(e=>`
                      <li>
                        <strong>${e.venue}:</strong> “${e.title}.” (Published).
                        <a href="${e.link}" target="_blank" class="doc-link-accent">${e.doi}</a>
                      </li>
                    `).join("")}
                    ${l.certifications.map(e=>`
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
                  ${l.projects.slice(2,6).map(e=>`
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
    `}initListeners(e){const t=e.querySelector("#resume-prev-page"),i=e.querySelector("#resume-next-page"),s=e.querySelector("#resume-page-num"),n=e.querySelector("#resume-flipper"),a=b=>{this.currentPage=b,s.textContent=`Page ${b} of 2`,b===2?n==null||n.classList.add("is-flipped"):n==null||n.classList.remove("is-flipped")};t&&t.addEventListener("click",()=>a(1)),i&&i.addEventListener("click",()=>a(2));const o=e.querySelector("#resume-zoom-in"),r=e.querySelector("#resume-zoom-out"),c=e.querySelector("#resume-zoom-val"),d=e.querySelector("#paper-3d-scene"),p=b=>{this.zoomLevel=Math.max(70,Math.min(140,this.zoomLevel+b)),c.textContent=`${this.zoomLevel}%`,d.style.transform=`scale(${this.zoomLevel/100})`,d.style.transformOrigin="top center"};o&&o.addEventListener("click",()=>p(10)),r&&r.addEventListener("click",()=>p(-10));const u=e.querySelector("#btn-print-resume");u&&u.addEventListener("click",()=>{window.print()});const h=e.querySelector("#btn-copy-resume-text");h&&h.addEventListener("click",async()=>{const b=`ABHISHEK KUMAR
Sector-3, Bokaro Steel City, Jharkhand - 827003
${l.personal.email} | ${l.personal.phone}
Portfolio: ${l.personal.portfolio}
LinkedIn: ${l.personal.linkedin}
GitHub: ${l.personal.github}

ABOUT ME:
${l.personal.summary}

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

KEY RECENT PROJECTS:
1. BitTrace DFIR: Automated Live RAM & Postmortem Bitcoin Forensics Tool for Windows (ISO/IEC 27037)
2. Embedded Night-Vision System for Pedestrian Detection (Active IR + Thermal + YOLOv2)
3. Logistics Management System (Python & Django Enterprise Supply Chain)

SKILLS:
Embedded Systems, Microcontrollers, VLSI, Digital Forensics, C/C++, Python, FastAPI, Django, React, MATLAB, Vivado, Wokwi, Git.`;try{await navigator.clipboard.writeText(b);const k=h.innerHTML;h.innerHTML="<span>Copied ATS Resume!</span>",setTimeout(()=>{h.innerHTML=k},2e3)}catch{alert("Resume ATS text copied!")}});const g=e.querySelector(".paper-front"),v=e.querySelector(".paper-back");g&&v&&$.attach([g,v],{maxTilt:6,scale:1.01,glare:!1})}}class ie{constructor(){this.activeFilter="all",this.searchQuery="",this.selectedProject=null}render(){return`
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
                <span class="stat-num">9+</span>
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
            <span class="section-count" id="projects-count-label">${l.projects.length} Projects</span>
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
    `}filterProjects(){return l.projects.filter(e=>{if(this.activeFilter==="recent"){if(e.createdPeriod!=="Last 6 Months"&&e.createdPeriod!=="Last 1 Week"&&!e.badge.includes("Recent"))return!1}else if(this.activeFilter==="embedded"){if(!e.tags.some(i=>["Embedded Systems","Embedded C","Microcontrollers","Wokwi","Xilinx Vivado","Finite State Machines"].includes(i)))return!1}else if(this.activeFilter==="software"){if(!e.tags.some(i=>["Python","FastAPI","Django","React","GraphQL","Gemini AI API","TypeScript"].includes(i)))return!1}else if(this.activeFilter==="security"&&!e.tags.some(i=>["Digital Forensics","Cryptography","Security Algorithms","Pixel Manipulation","Windows API","ISO 27037","C++"].includes(i)))return!1;if(this.searchQuery){const t=this.searchQuery.toLowerCase(),i=e.title.toLowerCase().includes(t),s=e.description.toLowerCase().includes(t),n=e.tags.some(a=>a.toLowerCase().includes(t));return i||s||n}return!0})}renderProjectCards(){const e=this.filterProjects();return e.length===0?`
        <div class="empty-projects-state">
          <p>No projects match your filter or search query.</p>
          <button class="clear-filter-btn" id="btn-reset-filter">Reset Filters</button>
        </div>
      `:e.map(t=>{const i=t.createdPeriod==="Last 6 Months";return`
        <div class="project-card 3d-tilt-card ${i?"is-recent":""}" data-project-id="${t.id}">
          <div class="card-header">
            <span class="card-badge ${i?"badge-hot":"badge-normal"}">${t.badge}</span>
            <span class="card-period">${t.createdPeriod}</span>
          </div>

          <h4 class="card-title">${t.title}</h4>
          <p class="card-subtitle">${t.subtitle}</p>

          <p class="card-desc">${t.description}</p>

          <div class="card-tags">
            ${t.tags.slice(0,4).map(s=>`<span class="tag-chip">${s}</span>`).join("")}
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
      `}).join("")}openDetailModal(e,t){const i=l.projects.find(r=>r.id===e);if(!i)return;const s=t.querySelector("#project-modal"),n=t.querySelector("#modal-content-body"),a=t.querySelector("#project-modal-dialog");n.innerHTML=`
      <div class="modal-proj-header">
        <span class="modal-badge">${i.badge}</span>
        <h3 class="modal-title">${i.title}</h3>
        <p class="modal-sub">${i.subtitle}</p>
      </div>

      <div class="modal-tech-row">
        ${i.tags.map(r=>`<span class="tech-badge">${r}</span>`).join("")}
      </div>

      <div class="modal-desc-box">
        <h5 class="modal-section-h5">Executive Summary</h5>
        <p>${i.description}</p>
      </div>

      <div class="modal-highlights-box">
        <h5 class="modal-section-h5">Technical Architecture & Engineering Highlights</h5>
        <ul>
          ${i.highlights.map(r=>`<li>${r}</li>`).join("")}
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
    `,s.style.display="flex",a&&$.attach([a],{maxTilt:5,scale:1.01,glare:!1});const o=s.querySelector("#modal-btn-close-bottom");o&&(o.onclick=()=>{s.style.display="none"})}initListeners(e){const t=e.querySelectorAll(".sidebar-nav .nav-item"),i=e.querySelector("#projects-search-input"),s=e.querySelector("#projects-card-grid"),n=e.querySelector("#project-modal"),a=e.querySelector("#modal-close-btn"),o=e.querySelector("#appstore-hero-card");o&&$.attach([o],{maxTilt:6,scale:1.01});const r=()=>{s.innerHTML=this.renderProjectCards();const d=this.filterProjects().length,p=e.querySelector("#projects-count-label");p&&(p.textContent=`${d} Project${d===1?"":"s"}`),c()},c=()=>{e.querySelectorAll(".btn-inspect-proj").forEach(h=>{h.addEventListener("click",g=>{g.stopPropagation();const v=h.getAttribute("data-id");this.openDetailModal(v,e)})});const p=e.querySelectorAll(".project-card");p.forEach(h=>{h.addEventListener("click",()=>{const g=h.getAttribute("data-project-id");this.openDetailModal(g,e)})}),$.attach(p,{maxTilt:10,scale:1.025});const u=e.querySelector("#btn-reset-filter");u&&u.addEventListener("click",()=>{var h;this.activeFilter="all",this.searchQuery="",i&&(i.value=""),t.forEach(g=>g.classList.remove("active")),(h=e.querySelector('.nav-item[data-filter="all"]'))==null||h.classList.add("active"),r()})};t.forEach(d=>{d.addEventListener("click",()=>{t.forEach(p=>p.classList.remove("active")),d.classList.add("active"),this.activeFilter=d.getAttribute("data-filter"),r()})}),i&&i.addEventListener("input",d=>{this.searchQuery=d.target.value.trim(),r()}),a&&a.addEventListener("click",()=>{n.style.display="none"}),n&&n.addEventListener("click",d=>{d.target===n&&(n.style.display="none")}),c()}}class se{constructor(){this.history=[{role:"assistant",text:`Hello! I am **Siri for Abhishek**, an AI assistant pre-trained on Abhishek Kumar's complete engineering resume, research publications, and GitHub activity.

Recruiters and visitors can search anything directly about his **8.73 CGPA**, **VLSI internship at Jadavpur**, **SAIL automation training**, **IEEE paper**, or **projects built in the last 6 months**! Try asking below or click a suggestion chip.`}],this.isThinking=!1}render(){return`
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
                <span class="ai-title">Apple Intelligence & Gemini AI</span>
                <span class="ai-status-badge" id="ai-active-mode-badge">Resume Intelligence Ready</span>
              </div>
              <span class="ai-subtitle">Direct semantic resume search for recruiters & hiring managers</span>
            </div>
          </div>

          <div class="ai-header-actions">
            <button class="ai-action-btn" id="btn-ai-key-settings" title="Configure Live Google Gemini API Key">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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
            <button class="chip-btn 3d-chip" data-query="What is Abhishek's CGPA and academic background?">🎓 CGPA & College</button>
            <button class="chip-btn 3d-chip" data-query="Tell me about his VLSI internship at Jadavpur University">⚡ VLSI Internship</button>
            <button class="chip-btn 3d-chip" data-query="What projects has he created in the last 6 months on GitHub?">🚀 Last 6-Month Projects</button>
            <button class="chip-btn 3d-chip" data-query="Explain his published IEEE research paper">📄 IEEE Publication</button>
            <button class="chip-btn 3d-chip" data-query="Why should our company hire Abhishek for an engineering role?">⭐ Why Hire Abhishek?</button>
            <button class="chip-btn 3d-chip" data-query="What are his core technical skills and programming languages?">💻 Core Tech Skills</button>
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
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." value="${F.customApiKey}" />
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
    `,i.scrollTop=i.scrollHeight;try{const s=await F.ask(e);this.history.push({role:"assistant",text:s})}catch{this.history.push({role:"assistant",text:"Abhishek Kumar is an ECE undergraduate at IEM Kolkata (8.73 CGPA) with VLSI and automation internships, IEEE publication, and strong hands-on embedded and software engineering skills."})}finally{this.isThinking=!1,i.innerHTML=this.renderMessages(),i.scrollTop=i.scrollHeight,this.attachMessageListeners(t)}}speakLastAnswer(){if(!("speechSynthesis"in window))return;const e=this.history[this.history.length-1];if(e&&e.role==="assistant"){window.speechSynthesis.cancel();const t=e.text.replace(/\*\*/g,"").replace(/•/g,"").replace(/\[(.*?)\]\(.*?\)/g,"$1"),i=new SpeechSynthesisUtterance(t);i.rate=1.05,i.pitch=1,window.speechSynthesis.speak(i)}}initListeners(e){const t=e.querySelector("#ai-chat-form"),i=e.querySelector("#ai-query-input"),s=e.querySelectorAll(".chip-btn"),n=e.querySelector("#btn-ai-voice"),a=e.querySelector("#btn-clear-ai-chat"),o=e.querySelector("#btn-ai-key-settings"),r=e.querySelector("#gemini-key-modal"),c=e.querySelector("#gemini-key-input"),d=e.querySelector("#btn-save-gemini-key"),p=e.querySelector("#btn-clear-gemini-key"),u=e.querySelector("#btn-close-gemini-modal"),h=e.querySelector("#ai-active-mode-badge"),g=()=>{F.hasCustomKey()?h&&(h.textContent="Live Gemini 1.5 Active",h.classList.add("badge-gemini-live")):h&&(h.textContent="Resume Intelligence Ready",h.classList.remove("badge-gemini-live"))};g(),t&&t.addEventListener("submit",v=>{v.preventDefault();const b=i.value.trim();b&&(i.value="",this.handleQuery(b,e))}),s.forEach(v=>{v.addEventListener("click",()=>{const b=v.getAttribute("data-query");b&&this.handleQuery(b,e)})}),n&&n.addEventListener("click",()=>this.speakLastAnswer()),a&&a.addEventListener("click",()=>{this.history=[{role:"assistant",text:"Chat reset! Ask me anything about Abhishek's projects, CGPA, research, or internships."}];const v=e.querySelector("#ai-chat-messages");v&&(v.innerHTML=this.renderMessages()),this.attachMessageListeners(e)}),o&&o.addEventListener("click",()=>{r.style.display="flex"}),u&&u.addEventListener("click",()=>{r.style.display="none"}),d&&d.addEventListener("click",()=>{const v=c.value.trim();F.setApiKey(v),g(),r.style.display="none"}),p&&p.addEventListener("click",()=>{F.setApiKey(""),c.value="",g(),r.style.display="none"}),this.attachMessageListeners(e)}attachMessageListeners(e){e.querySelectorAll(".copy-ans").forEach(i=>{i.addEventListener("click",async()=>{const s=decodeURIComponent(i.getAttribute("data-text"));await navigator.clipboard.writeText(s),i.classList.add("copied"),setTimeout(()=>i.classList.remove("copied"),1500)})})}}class ae{constructor(){this.currentUrl="https://github.com/abhishek947kumar",this.history=[this.currentUrl],this.historyIndex=0}render(){return`
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
    `}renderPageContent(e){return e.includes("linkedin.com")?`
        <div class="safari-web-page linkedin-page">
          <div class="page-card linkedin-card">
            <div class="linkedin-banner"></div>
            <div class="linkedin-profile-header">
              <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="li-avatar" />
              <div class="li-info">
                <h2>${l.personal.name}</h2>
                <p class="li-headline">B.Tech ECE '27 @ IEM Kolkata | VLSI Intern @ Jadavpur University | IEEE Published Author</p>
                <span class="li-loc">${l.personal.location}</span>
                <div class="li-buttons">
                  <a href="${l.personal.linkedin}" target="_blank" class="li-btn-primary">Connect on LinkedIn</a>
                  <a href="mailto:${l.personal.email}" class="li-btn-secondary">Message / Email</a>
                </div>
              </div>
            </div>

            <div class="li-body-section">
              <h3>About</h3>
              <p>${l.personal.summary}</p>
            </div>

            <div class="li-body-section">
              <h3>Featured Publication</h3>
              <div class="li-pub-card">
                <h4>${l.publications[0].title}</h4>
                <p>${l.publications[0].venue} • Published 2026</p>
                <a href="${l.publications[0].link}" target="_blank" class="li-link">View in IEEE Xplore &rarr;</a>
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
                      <a href="${l.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
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
                      <a href="${l.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
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
                      <a href="${l.personal.linkedin}" target="_blank" class="li-link">View Post on LinkedIn &rarr;</a>
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
            <h2>${l.publications[0].title}</h2>
            <div class="ieee-meta">
              <p><strong>Authors:</strong> Abhishek Kumar et al.</p>
              <p><strong>Conference:</strong> 2026 8th International Conference on Electronics, Materials Engineering & Nano-Technology (IEMENTech)</p>
              <p><strong>Electronic ISBN:</strong> 10.1109/IEMENTech202669403.2026.11434403</p>
            </div>
            <hr class="ieee-line" />
            <div class="ieee-abstract">
              <h4>Abstract:</h4>
              <p>${l.publications[0].summary}</p>
            </div>
            <div class="ieee-actions">
              <a href="${l.publications[0].link}" target="_blank" class="ieee-download-btn">Read on IEEE Xplore Official Portal</a>
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
      `:`
      <div class="safari-web-page gh-profile-page">
        <div class="page-card gh-card">
          <div class="gh-profile-head">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="gh-big-avatar" />
            <div class="gh-profile-text">
              <h2>Abhishek Kumar</h2>
              <p class="gh-sub">abhishek947kumar • Class of 2027 ECE Undergrad</p>
              <p>${l.personal.summary}</p>
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
    `}navigateTo(e,t){this.currentUrl=e,this.history.push(e),this.historyIndex=this.history.length-1;const i=t.querySelector("#safari-address-input"),s=t.querySelector("#safari-external-link"),n=t.querySelector("#safari-viewport-content");i&&(i.value=e),s&&(s.href=e),n&&(n.innerHTML=this.renderPageContent(e))}initListeners(e){const t=e.querySelectorAll(".safari-bookmark"),i=e.querySelector("#safari-back"),s=e.querySelector("#safari-forward"),n=e.querySelector("#safari-refresh");t.forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-url");o&&this.navigateTo(o,e)})}),i&&i.addEventListener("click",()=>{if(this.historyIndex>0){this.historyIndex-=1;const a=this.history[this.historyIndex];this.navigateTo(a,e)}}),s&&s.addEventListener("click",()=>{if(this.historyIndex<this.history.length-1){this.historyIndex+=1;const a=this.history[this.historyIndex];this.navigateTo(a,e)}}),n&&n.addEventListener("click",()=>{const a=e.querySelector("#safari-viewport-content");a&&(a.style.opacity="0.5",setTimeout(()=>{a.innerHTML=this.renderPageContent(this.currentUrl),a.style.opacity="1"},300))})}}class ne{constructor(){this.history=[],this.historyIndex=-1}render(){return`
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
    `}executeCommand(e,t){const i=e.trim().toLowerCase(),s=i.split(" "),n=s[0],a=document.createElement("div");if(a.className="term-line term-cmd-echo",a.innerHTML=`<span class="prompt-user">abhishek@macbook-pro</span><span class="prompt-separator">:</span><span class="prompt-path">~</span><span class="prompt-symbol">%</span> ${this.escapeHTML(e)}`,t.appendChild(a),!i)return;let o="";switch(n){case"help":o=`
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
</div>`;break;case"whoami":o=`
<div class="term-box">
  <span class="term-bold">${l.personal.name}</span> (${l.personal.tagline})<br>
  📍 ${l.personal.location}<br>
  🎓 CGPA: 8.73 in B.Tech ECE (Institute of Engineering & Management, Kolkata)<br>
  ⚡ Published IEEE Author (IEMENTECH 2026) | VLSI Intern (Jadavpur Univ) | Automation Trainee (SAIL)<br>
  💼 Target: Embedded Software, VLSI / Hardware Co-Design, Firmware & Python/Systems Roles.
</div>`;break;case"skills":o=`
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
Xilinx Vivado, Wokwi Simulator, Git, CI/CD, Agile (Jira), Linux/Bash, Django, LaTeX.`;break;case"projects":o=`
<div class="term-section-title">=== NOTABLE ENGINEERING PROJECTS ===</div>
<br>
${l.projects.map((r,c)=>`
<div class="term-proj-item">
  <span class="term-cmd">${c+1}. ${r.title}</span> [${r.badge}]<br>
  &nbsp;&nbsp;Tech: ${r.tags.join(", ")}<br>
  &nbsp;&nbsp;Desc: ${r.description}<br>
  &nbsp;&nbsp;Link: <a href="${r.githubUrl}" target="_blank" class="term-link">${r.githubUrl}</a>
</div>
`).join("<br>")}`;break;case"education":o=`
<div class="term-section-title">=== ACADEMIC CREDENTIALS ===</div>
<br>
${l.education.map(r=>`
<div>
  <span class="term-bold">${r.institution}</span> (${r.location})<br>
  ${r.degree} | ${r.duration}<br>
  <span class="term-highlight">${r.score}</span>
</div>
`).join("<br>")}`;break;case"internships":o=`
<div class="term-section-title">=== INDUSTRIAL INTERNSHIPS ===</div>
<br>
${l.internships.map(r=>`
<div>
  <span class="term-bold">${r.role}</span> — ${r.organization} (${r.location})<br>
  Duration: ${r.duration} | Type: ${r.type}<br>
  ${r.points.map(c=>`• ${c}`).join("<br>")}<br>
  Skills: ${r.skillsUsed.join(", ")}
</div>
`).join("<br>")}`;break;case"publications":o=`
<div class="term-section-title">=== IEEE PUBLICATIONS ===</div>
<br>
<span class="term-bold">${l.publications[0].venue}</span><br>
Title: "${l.publications[0].title}"<br>
Status: ${l.publications[0].status}<br>
DOI: <a href="${l.publications[0].link}" target="_blank" class="term-link">${l.publications[0].doi}</a><br>
Summary: ${l.publications[0].summary}`;break;case"hire":o=`
<div class="term-section-title">=== WHY HIRE ABHISHEK KUMAR? ===</div>
<br>
${l.placementPitch.keyStrengths.map((r,c)=>`${c+1}. ${r}`).join("<br><br>")}
<br><br>
<span class="term-highlight">Immediate Placement Availability. Prepared for technical and algorithmic rounds.</span>`;break;case"contact":o=`
<div class="term-box">
  <span class="term-bold">Get In Touch with Abhishek Kumar:</span><br>
  🌐 Portfolio: <a href="${l.personal.portfolio}" target="_blank" class="term-link">${l.personal.portfolio}</a><br>
  📧 Email: <a href="mailto:${l.personal.email}" class="term-link">${l.personal.email}</a><br>
  📞 Phone: ${l.personal.phone}<br>
  💼 LinkedIn: <a href="${l.personal.linkedin}" target="_blank" class="term-link">${l.personal.linkedin}</a><br>
  🐙 GitHub: <a href="${l.personal.github}" target="_blank" class="term-link">${l.personal.github}</a><br>
  📍 Address: ${l.personal.address}
</div>`;break;case"cat":s[1]==="resume"||s[1]==="resume.txt"||s[1]==="resume.pdf"?o=`
<div class="term-cat-resume">
============================================================<br>
ABHISHEK KUMAR<br>
${l.personal.address} | ${l.personal.phone}<br>
${l.personal.email} | ${l.personal.linkedin}<br>
============================================================<br>
ABOUT ME:<br>
${l.personal.summary}<br><br>
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
</div>`:o=`cat: ${s[1]||"file"}: No such file or directory. Try 'cat resume'.`;break;case"clear":t.innerHTML="";return;case"neofetch":o=`
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
</pre>`;break;default:o=`zsh: command not found: ${this.escapeHTML(n)}. Type '<span class="term-highlight">help</span>' for a list of commands.`;break}if(o){const r=document.createElement("div");r.className="term-line term-response",r.innerHTML=o,t.appendChild(r)}}escapeHTML(e){return e.replace(/[&<>'"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[t]||t)}initListeners(e){const t=e.querySelector("#terminal-input"),i=e.querySelector("#terminal-output"),s=e.querySelector("#terminal-body");s.addEventListener("click",()=>{t.focus()}),t.addEventListener("keydown",n=>{if(n.key==="Enter"){const a=t.value;a.trim()&&(this.history.push(a),this.historyIndex=this.history.length),this.executeCommand(a,i),t.value="",s.scrollTop=s.scrollHeight}else n.key==="ArrowUp"?(n.preventDefault(),this.history.length>0&&this.historyIndex>0&&(this.historyIndex-=1,t.value=this.history[this.historyIndex]||"")):n.key==="ArrowDown"&&(n.preventDefault(),this.historyIndex<this.history.length-1?(this.historyIndex+=1,t.value=this.history[this.historyIndex]||""):(this.historyIndex=this.history.length,t.value=""))})}}const oe="abhishek947kumar",V="agy_portfolio_repos_cache",N="agy_portfolio_events_cache",re=10*60*1e3;class le{constructor(){this.username=oe,this.listeners=[]}onUpdate(e){this.listeners.push(e)}notifyListeners(e){this.listeners.forEach(t=>t(e))}async fetchUserData(){try{const e=await fetch(`https://api.github.com/users/${this.username}`);if(e.ok)return await e.json()}catch(e){console.warn("Could not fetch GitHub user profile:",e)}return{login:this.username,name:l.personal.name,avatar_url:"https://avatars.githubusercontent.com/u/153946376?v=4",html_url:`https://github.com/${this.username}`,public_repos:9,followers:1,following:3,bio:l.personal.tagline}}async fetchRepositories(e=!1){if(!e){const t=this.getCached(V);if(t)return t}try{const t=await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=100`);if(t.ok){const i=await t.json(),s=this.processRepos(i);return this.setCached(V,s),this.notifyListeners({type:"repos",data:s}),s}}catch(t){console.warn("Error fetching live GitHub repositories, using fallback:",t)}return this.getFallbackRepos()}async fetchEvents(e=!1){if(!e){const t=this.getCached(N);if(t)return t}try{const t=await fetch(`https://api.github.com/users/${this.username}/events?per_page=30`);if(t.ok){const i=await t.json(),s=this.processEvents(i);return this.setCached(N,s),this.notifyListeners({type:"events",data:s}),s}}catch(t){console.warn("Error fetching live GitHub events, using fallback:",t)}return this.getFallbackEvents()}processRepos(e){const t=new Date,i=new Date(t.getFullYear(),t.getMonth()-6,t.getDate());return e.map(s=>{const n=new Date(s.updated_at),a=n>=i;return{id:s.id,name:s.name,fullName:s.full_name,description:s.description||"No description provided.",url:s.html_url,language:s.language||"Code",stars:s.stargazers_count,forks:s.forks_count,openIssues:s.open_issues_count,updatedAt:s.updated_at,updatedFormatted:n.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),isLast6Months:a,topics:s.topics||[]}})}processEvents(e){return e.slice(0,15).map(t=>{var r,c,d,p,u,h,g,v;const s=new Date(t.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),n=t.repo?t.repo.name.replace(`${this.username}/`,""):"Repository";let a="Activity on repository",o="git-commit";if(t.type==="PushEvent"){const b=((c=(r=t.payload)==null?void 0:r.commits)==null?void 0:c.length)||1,k=((u=(p=(d=t.payload)==null?void 0:d.commits)==null?void 0:p[0])==null?void 0:u.message)||"Code update";a=`Pushed ${b} commit(s): "${k.length>50?k.substring(0,50)+"...":k}"`,o="git-push"}else t.type==="CreateEvent"?(a=`Created ${((h=t.payload)==null?void 0:h.ref_type)||"resource"} ${((g=t.payload)==null?void 0:g.ref)||n}`,o="plus-circle"):t.type==="WatchEvent"&&(a=`Starred repository ${n}`,o="star");return{id:t.id,type:t.type,repo:n,repoUrl:`https://github.com/${((v=t.repo)==null?void 0:v.name)||this.username}`,date:s,rawDate:t.created_at,description:a,icon:o}})}getCached(e){try{const t=localStorage.getItem(e);if(!t)return null;const i=JSON.parse(t);if(Date.now()-i.timestamp<re)return i.data}catch{}return null}setCached(e,t){try{localStorage.setItem(e,JSON.stringify({timestamp:Date.now(),data:t}))}catch{}}getFallbackRepos(){return[{id:0,name:"Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",fullName:"abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",description:"BitTrace DFIR: Automated live volatile memory (RAM) and postmortem disk/registry analysis tool for Bitcoin on Windows systems with ISO/IEC 27037 chain of custody.",url:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",language:"Python",stars:1,forks:0,updatedFormatted:"Sep 21, 2026",isLast6Months:!0,topics:["digital-forensics","bitcoin","fastapi","react","volatile-memory","iso-27037","dfir"]},{id:1,name:"Embedded-Night-Vision-System",fullName:"abhishek947kumar/Embedded-Night-Vision-System",description:"Embedded Night-Vision System for Pedestrian Detection using Active IR and Thermal Sensors with HAAR+AdaBoost and YOLOv2",url:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",language:"Python",stars:1,forks:0,updatedFormatted:"Sep 19, 2026",isLast6Months:!0,topics:["embedded","night-vision","yolov2","infrared","deep-learning"]},{id:2,name:"Logistics-Management-System",fullName:"abhishek947kumar/Logistics-Management-System",description:"Enterprise-Grade Commercial Multi-Dealer & Consumer Logistics Management System in Python & Django.",url:"https://github.com/abhishek947kumar/Logistics-Management-System",language:"Python",stars:1,forks:0,updatedFormatted:"Sep 18, 2026",isLast6Months:!0,topics:["django","logistics","supply-chain","enterprise"]},{id:3,name:"YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",fullName:"abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",description:"Modern financial control center with category budgets, savings milestones, and Google Gemini AI spending analytics.",url:"https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",language:"JavaScript",stars:1,forks:0,updatedFormatted:"Jul 19, 2026",isLast6Months:!0,topics:["finance","gemini-ai","budgeting","expense-tracker"]},{id:4,name:"Evershop",fullName:"abhishek947kumar/Evershop",description:"Modern, TypeScript-first eCommerce platform built with GraphQL and React with modular, customizable architecture.",url:"https://github.com/abhishek947kumar/Evershop",language:"TypeScript",stars:0,forks:0,updatedFormatted:"Aug 5, 2026",isLast6Months:!0,topics:["typescript","react","graphql","ecommerce"]},{id:5,name:"PRODIGY_CS_02",fullName:"abhishek947kumar/PRODIGY_CS_02",description:"Image encryption tool using pixel manipulation: pixel value swapping and mathematical reversible transformations.",url:"https://github.com/abhishek947kumar/PRODIGY_CS_02",language:"Python",stars:1,forks:0,updatedFormatted:"May 20, 2024",isLast6Months:!1,topics:["cryptography","image-encryption","security"]},{id:6,name:"PRODIGY_CS_01",fullName:"abhishek947kumar/PRODIGY_CS_01",description:"Caesar Cipher program to encrypt and decrypt messages by character shifts.",url:"https://github.com/abhishek947kumar/PRODIGY_CS_01",language:"Python",stars:1,forks:0,updatedFormatted:"May 12, 2025",isLast6Months:!1,topics:["cryptography","caesar-cipher"]}]}getFallbackEvents(){return[{id:"evt-0",type:"PushEvent",repo:"Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",repoUrl:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",date:"Sep 21, 2026",description:"Pushed 3 commits: 'BitTrace DFIR live memory triage, ROT13 decoder & ISO 27037 ledger'",icon:"git-push"},{id:"evt-0b",type:"CreateEvent",repo:"Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",repoUrl:"https://github.com/abhishek947kumar/Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems",date:"Sep 21, 2026",description:"Created repository 'Automated-Live-Forensic-and-Postmortem-Analysis-Tool-for-Bitcoin-on-Windows-Systems'",icon:"plus-circle"},{id:"evt-1",type:"PushEvent",repo:"Embedded-Night-Vision-System",repoUrl:"https://github.com/abhishek947kumar/Embedded-Night-Vision-System",date:"Sep 19, 2026",description:"Pushed 2 commits: 'Optimized YOLOv2 inference pipeline on embedded edge unit'",icon:"git-push"},{id:"evt-2",type:"PushEvent",repo:"Logistics-Management-System",repoUrl:"https://github.com/abhishek947kumar/Logistics-Management-System",date:"Sep 18, 2026",description:"Pushed 3 commits: 'Enterprise dealer dispatch scheduling & consignment tracking'",icon:"git-push"},{id:"evt-3",type:"CreateEvent",repo:"Logistics-Management-System",repoUrl:"https://github.com/abhishek947kumar/Logistics-Management-System",date:"Sep 18, 2026",description:"Created branch 'main' with multi-dealer logistics architecture",icon:"plus-circle"},{id:"evt-4",type:"PushEvent",repo:"YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",repoUrl:"https://github.com/abhishek947kumar/YourFinance-Advanced-Expense-Tracker-with-Budget-Insights",date:"Jul 19, 2026",description:"Pushed 4 commits: 'Integrated Google Gemini AI for smart wealth recommendations'",icon:"git-push"}]}}const W=new le;class ce{constructor(){this.activeTab="all",this.repos=[],this.events=[],this.customPosts=this.loadCustomPosts(),this.isRefreshing=!1}loadCustomPosts(){try{const e=localStorage.getItem("abhishek_portfolio_custom_posts");if(e)return JSON.parse(e)}catch{}return[]}saveCustomPosts(e){try{localStorage.setItem("abhishek_portfolio_custom_posts",JSON.stringify(e))}catch{}}render(){return`
      <div class="social-app-container">
        <!-- Top Navigation Header -->
        <header class="social-header">
          <div class="social-profile-summary">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek Kumar" class="social-avatar" />
            <div class="social-profile-text">
              <div class="profile-name-row">
                <h3>${l.personal.name}</h3>
                <span class="verified-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  Verified Profile
                </span>
              </div>
              <p class="profile-bio">${l.personal.tagline}</p>
                <a href="${l.personal.portfolio}" target="_blank" rel="noreferrer" class="social-tag portfolio" style="background: rgba(0, 112, 243, 0.15); border-color: rgba(0, 112, 243, 0.35); color: #60a5fa;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  <span>abhishek947kumar.github.io/portfolio</span>
                </a>
                <a href="${l.personal.github}" target="_blank" rel="noreferrer" class="social-tag github">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  <span>github.com/abhishek947kumar</span>
                </a>
                <a href="${l.personal.linkedin}" target="_blank" rel="noreferrer" class="social-tag linkedin">
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
    `}async loadFeeds(e,t=!1){if(e.querySelector("#social-feed-content")){if(t){const s=e.querySelector("#btn-refresh-social");s==null||s.classList.add("is-refreshing")}try{const[s,n]=await Promise.all([W.fetchRepositories(t),W.fetchEvents(t)]);this.repos=s,this.events=n}catch(s){console.warn("Using fallback feeds:",s),this.repos=W.getFallbackRepos(),this.events=W.getFallbackEvents()}finally{const s=e.querySelector("#btn-refresh-social");s==null||s.classList.remove("is-refreshing"),this.renderFeedItems(e)}}}renderFeedItems(e){const t=e.querySelector("#social-feed-content");if(!t)return;const i=[];this.customPosts.forEach(a=>{i.push({type:"post",platform:a.platform,title:a.title,content:a.content,date:a.date,url:a.url||(a.platform==="LinkedIn"?l.personal.linkedin:l.personal.github),tags:a.tags,isCustom:!0})}),l.socialFeed.forEach(a=>{i.push({type:"post",platform:a.platform,title:a.title,content:a.content,date:a.date,url:a.url,tags:a.tags,isCustom:!1})}),this.events.forEach(a=>{i.push({type:"github-event",platform:"GitHub",title:`${a.repo}: ${a.description}`,content:`Direct repository update pushed to branch main. Repository: ${a.repo}`,date:a.date,url:a.repoUrl,tags:["#GitHubActivity","#LiveCommit"],isEvent:!0})});let s=i;this.activeTab==="github"?s=i.filter(a=>a.platform==="GitHub"):this.activeTab==="linkedin"&&(s=i.filter(a=>a.platform==="LinkedIn"));const n=this.repos.filter(a=>a.isLast6Months);t.innerHTML=`
      ${this.activeTab==="all"||this.activeTab==="github"?`
        <div class="recent-repos-spotlight">
          <div class="spotlight-title-row">
            <span class="spotlight-badge">DYNAMIC GITHUB SYNC</span>
            <h4>Projects Updated in the Last 6 Months</h4>
          </div>
          <div class="spotlight-grid">
            ${n.map(a=>`
              <div class="spotlight-card">
                <div class="spotlight-card-top">
                  <span class="repo-name-text">${a.name}</span>
                  <span class="repo-lang-pill">${a.language}</span>
                </div>
                <p class="repo-desc-text">${a.description}</p>
                <div class="spotlight-card-bottom">
                  <span class="repo-time-text">Updated ${a.updatedFormatted}</span>
                  <a href="${a.url}" target="_blank" rel="noreferrer" class="repo-visit-link">
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
        ${s.map(a=>`
          <article class="feed-card platform-${a.platform.toLowerCase()}">
            <div class="feed-card-header">
              <div class="feed-badge-group">
                <span class="platform-icon-pill ${a.platform.toLowerCase()}">
                  ${a.platform==="LinkedIn"?"LinkedIn":"GitHub"}
                </span>
                ${a.isCustom?'<span class="badge-custom-broadcast">New Broadcast</span>':""}
              </div>
              <span class="feed-date">${a.date}</span>
            </div>

            <h4 class="feed-title">${a.title}</h4>
            <p class="feed-content">${a.content}</p>

            ${a.tags&&a.tags.length>0?`
              <div class="feed-tags-row">
                ${a.tags.map(o=>`<span class="feed-tag">${o}</span>`).join("")}
              </div>
            `:""}

            <div class="feed-card-actions">
              <a href="${a.url}" target="_blank" rel="noreferrer" class="feed-action-link">
                <span>View on ${a.platform}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </article>
        `).join("")}
      </div>
    `}initListeners(e){const t=e.querySelectorAll(".soc-tab"),i=e.querySelector("#btn-refresh-social"),s=e.querySelector("#btn-open-post-modal"),n=e.querySelector("#broadcast-modal"),a=e.querySelector("#btn-close-broadcast"),o=e.querySelector("#btn-cancel-broadcast"),r=e.querySelector("#broadcast-post-form");t.forEach(d=>{d.addEventListener("click",()=>{t.forEach(p=>p.classList.remove("active")),d.classList.add("active"),this.activeTab=d.getAttribute("data-tab"),this.renderFeedItems(e)})}),i&&i.addEventListener("click",()=>{this.loadFeeds(e,!0)}),s&&s.addEventListener("click",()=>{n.style.display="flex"});const c=()=>{n.style.display="none"};a&&a.addEventListener("click",c),o&&o.addEventListener("click",c),r&&r.addEventListener("submit",d=>{d.preventDefault();const p=e.querySelector("#post-platform-select").value,u=e.querySelector("#post-title-input").value.trim(),h=e.querySelector("#post-content-input").value.trim(),g=e.querySelector("#post-tags-input").value.trim(),v=e.querySelector("#post-url-input").value.trim(),b=g?g.split(",").map(C=>C.trim().startsWith("#")?C.trim():`#${C.trim()}`):[],E=new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),I={id:"custom-"+Date.now(),platform:p,title:u,content:h,date:E,tags:b,url:v};this.customPosts.unshift(I),this.saveCustomPosts(this.customPosts),r.reset(),c(),this.renderFeedItems(e)}),this.loadFeeds(e)}}class de{constructor(e){this.activeSection="general",this.onWallpaperChange=e}render(){return`
      <div class="settings-app-container">
        <!-- Settings Sidebar -->
        <aside class="settings-sidebar">
          <div class="settings-user-card">
            <img src="https://avatars.githubusercontent.com/u/153946376?v=4" alt="Abhishek" class="settings-avatar" />
            <div class="settings-user-meta">
              <span class="settings-name">${l.personal.name}</span>
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
                  <span class="spec-v">${l.personal.name}</span>
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
                  <span class="spec-v">${l.personal.location}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-k">Contact</span>
                  <span class="spec-v">${l.personal.email} | ${l.personal.phone}</span>
                </div>
              </div>
            </div>

            <div class="settings-subgroup">
              <h4>Placement Readiness</h4>
              <p class="settings-desc">${l.personal.summary}</p>
              <div class="target-roles-row">
                <span class="role-pill">Embedded Systems</span>
                <span class="role-pill">VLSI Hardware Co-Design</span>
                <span class="role-pill">Firmware Engineering</span>
                <span class="role-pill">Python / Software Engineering</span>
                <span class="role-pill">IoT Systems</span>
              </div>
            </div>
          </div>
        `;case"typography":const t=L.currentFontId,i=L.currentFontSize,s=L.currentLetterSpacing;return`
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
                ${Object.values(O).map(n=>`
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
                <button class="spacing-btn ${s==="tight"?"active":""}" data-spacing="tight">Tight (-0.02em)</button>
                <button class="spacing-btn ${s==="normal"?"active":""}" data-spacing="normal">Normal (Default)</button>
                <button class="spacing-btn ${s==="wide"?"active":""}" data-spacing="wide">Wide (+0.04em)</button>
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
                  <span class="pin-tag">GPIO</span>
                  <span class="pin-tag">UART</span>
                  <span class="pin-tag">SPI</span>
                  <span class="pin-tag">I2C</span>
                  <span class="pin-tag">FSM 7-State</span>
                  <span class="pin-tag">EDA Bare-Metal</span>
                  <span class="pin-tag">Vivado Timing</span>
                  <span class="pin-tag">Wokwi IoT</span>
                </div>
              </div>
            </div>

            <div class="skills-breakdown-list">
              ${l.skills.domains.map(n=>`
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
              ${l.education.map(n=>`
                <div class="edu-card">
                  <div class="edu-header">
                    <h4>${n.institution}</h4>
                    <span class="edu-score-badge">${n.score}</span>
                  </div>
                  <p class="edu-degree">${n.degree} (${n.duration})</p>
                  <span class="edu-location">${n.location}</span>
                  <ul class="edu-highlights">
                    ${n.highlights.map(a=>`<li>${a}</li>`).join("")}
                  </ul>
                </div>
              `).join("")}
            </div>
          </div>
        `;case"internships":return`
          <div class="settings-section">
            <h3 class="settings-heading">Industrial Internships & Training</h3>
            <div class="internship-cards-list">
              ${l.internships.map(n=>`
                <div class="intern-card">
                  <div class="intern-head">
                    <div>
                      <h4>${n.role}</h4>
                      <span class="intern-company">${n.organization} (${n.location})</span>
                    </div>
                    <span class="intern-dates">${n.duration}</span>
                  </div>
                  <ul class="intern-bullets">
                    ${n.points.map(a=>`<li>${a}</li>`).join("")}
                  </ul>
                  <div class="intern-skills-used">
                    <strong>Skills Applied:</strong>
                    ${n.skillsUsed.map(a=>`<span class="s-tag">${a}</span>`).join("")}
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
              <p class="pub-title">"${l.publications[0].title}"</p>
              <p class="pub-venue">${l.publications[0].venue}</p>
              <p class="pub-doi">DOI: <a href="${l.publications[0].link}" target="_blank">${l.publications[0].doi}</a></p>
              <p class="pub-sum">${l.publications[0].summary}</p>
            </div>

            <div class="credential-box">
              <h4>Professional Memberships</h4>
              <ul class="cert-list">
                ${l.activities[0].items.map(n=>`<li>${n}</li>`).join("")}
              </ul>
            </div>

            <div class="credential-box">
              <h4>Industrial Certifications</h4>
              <ul class="cert-list">
                ${l.certifications.map(n=>`<li><strong>${n.title}</strong> — ${n.issuer}</li>`).join("")}
              </ul>
            </div>
          </div>
        `;default:return""}}initListeners(e){const t=e.querySelectorAll(".settings-nav-item"),i=e.querySelector("#settings-main-pane");t.forEach(s=>{s.addEventListener("click",()=>{t.forEach(n=>n.classList.remove("active")),s.classList.add("active"),this.activeSection=s.getAttribute("data-section"),i.innerHTML=this.renderSection(this.activeSection),this.attachSectionListeners(i)})}),this.attachSectionListeners(i)}attachSectionListeners(e){const t=e.querySelectorAll(".wp-card");t.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-wallpaper");this.onWallpaperChange&&this.onWallpaperChange(d),t.forEach(p=>p.classList.remove("selected")),c.classList.add("selected")})});const i=e.querySelectorAll(".font-family-card");i.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-font-id");L.setFontStyle(d),i.forEach(h=>{h.classList.remove("selected");const g=h.querySelector(".font-active-status");g&&(g.textContent="Click to Apply")}),c.classList.add("selected");const p=c.querySelector(".font-active-status");p&&(p.textContent="✓ Active Typography"),document.querySelectorAll(".cc-font-pill").forEach(h=>{h.getAttribute("data-font")===d?h.classList.add("active"):h.classList.remove("active")})})});const s=e.querySelector("#settings-font-size-slider"),n=e.querySelector("#settings-font-scale-badge");s&&s.addEventListener("input",c=>{const d=parseInt(c.target.value,10);L.setFontSize(d),n&&(n.textContent=`${d}%`),e.querySelectorAll(".preset-pill").forEach(g=>{g.classList.toggle("active",parseInt(g.getAttribute("data-size"),10)===d)});const u=document.querySelector("#cc-font-size-val"),h=document.querySelector("#cc-font-size-slider");u&&(u.textContent=`${d}%`),h&&(h.value=d)});const a=e.querySelectorAll(".preset-pill");a.forEach(c=>{c.addEventListener("click",()=>{const d=parseInt(c.getAttribute("data-size"),10);L.setFontSize(d),s&&(s.value=d),n&&(n.textContent=`${d}%`),a.forEach(h=>h.classList.remove("active")),c.classList.add("active");const p=document.querySelector("#cc-font-size-val"),u=document.querySelector("#cc-font-size-slider");p&&(p.textContent=`${d}%`),u&&(u.value=d)})});const o=e.querySelectorAll(".spacing-btn");o.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-spacing");L.setLetterSpacing(d),o.forEach(p=>p.classList.remove("active")),c.classList.add("active")})});const r=e.querySelector("#btn-reset-typography");r&&r.addEventListener("click",()=>{L.resetDefaults(),e.innerHTML=this.renderSection("typography"),this.attachSectionListeners(e)}),$.attach(e.querySelectorAll(".font-family-card"),{maxTilt:8,scale:1.02})}}class pe{render(){return`
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
            <p><strong>Email:</strong> ${l.personal.email}</p>
            <p><strong>Phone:</strong> ${l.personal.phone}</p>
            <p><strong>Address:</strong> ${l.personal.address}</p>
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
              <input type="text" value="Abhishek Kumar <${l.personal.email}>" readonly class="mail-input-readonly" />
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
    `}initListeners(e){const t=e.querySelector("#placement-mail-form"),i=e.querySelector("#mail-company"),s=e.querySelector("#mail-subject"),n=e.querySelector("#mail-body"),a=e.querySelectorAll(".template-chip"),o=e.querySelector("#btn-copy-contact-all"),r=e.querySelector("#mail-sent-feedback");a.forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-template");d==="interview"?(s.value="Technical Interview Invitation - Campus Placements | Abhishek Kumar",n.value=`Hi Abhishek,

We reviewed your academic profile (8.73 CGPA at IEM Kolkata), your VLSI internship at Jadavpur University, and your IEEE publication. We would love to invite you for a Technical Interview for our engineering team.

Please let us know your availability.

Best regards,
Recruitment Team`):d==="embedded"?(s.value="Job Opportunity: Embedded Firmware / Systems Engineer - Abhishek Kumar",n.value=`Hi Abhishek,

Your work on the Embedded Night-Vision System, the Piezo-electric wearable, and your Vivado 7-state traffic controller is exceptional. We have an exciting role for an Embedded Firmware Engineer and believe you would be a strong fit.

Could we schedule a call this week?

Warm regards,
Talent Acquisition`):d==="software"&&(s.value="SDE Opportunity: Software Engineering Team - Abhishek Kumar",n.value=`Hi Abhishek,

We came across your portfolio and noted your proficiency in Python, C++, Django, and algorithms. We are hiring for our Software Development Engineering team.

Let us know if you are open to discussing opportunities.

Best regards,
Engineering Hiring`)})}),t&&t.addEventListener("submit",c=>{c.preventDefault();const d=encodeURIComponent(s.value),p=encodeURIComponent(n.value+`

Company: `+i.value),u=`mailto:${l.personal.email}?subject=${d}&body=${p}`;r.style.display="inline-block",setTimeout(()=>{window.location.href=u},300)}),o&&o.addEventListener("click",async()=>{const c=`Abhishek Kumar
Email: ${l.personal.email}
Phone: ${l.personal.phone}
Portfolio: ${l.personal.portfolio}
LinkedIn: ${l.personal.linkedin}
GitHub: ${l.personal.github}`;await navigator.clipboard.writeText(c),o.textContent="Copied to Clipboard!",setTimeout(()=>{o.textContent="Copy Contact Info"},2e3)})}}document.addEventListener("DOMContentLoaded",()=>{const w=document.querySelector("#cinematic-portfolio"),e=document.querySelector("#desktop");if(w){const A=new Z(H);w.innerHTML=A.render(),A.initListeners(w)}try{new J("ambient-3d-canvas")}catch(A){console.warn("3D Ambient Canvas initialization notice:",A)}const t=document.querySelector("#menu-active-app-name");M.init(t);const i=new Y(M);i.init();const s=new K(M,A=>i.setWallpaper(A));s.init();const n=new te,a=document.querySelector("#content-resume");a&&(a.innerHTML=n.render(),n.initListeners(a));const o=new ie,r=document.querySelector("#content-projects");r&&(r.innerHTML=o.render(),o.initListeners(r));const c=new se,d=document.querySelector("#content-siri");d&&(d.innerHTML=c.render(),c.initListeners(d));const p=new ae,u=document.querySelector("#content-safari");u&&(u.innerHTML=p.render(),p.initListeners(u));const h=new ne,g=document.querySelector("#content-terminal");g&&(g.innerHTML=h.render(),h.initListeners(g));const v=new ce,b=document.querySelector("#content-social");b&&(b.innerHTML=v.render(),v.initListeners(b));const k=new de(A=>i.setWallpaper(A)),E=document.querySelector("#content-settings");E&&(E.innerHTML=k.render(),k.initListeners(E));const I=new pe,C=document.querySelector("#content-mail");C&&(C.innerHTML=I.render(),I.initListeners(C)),M.registerWindow("resume",{title:"Preview",icon:"📄",el:document.querySelector("#win-resume"),defaultWidth:780,defaultHeight:560,x:40,y:50}),M.registerWindow("projects",{title:"Project Store",icon:"🛍️",el:document.querySelector("#win-projects"),defaultWidth:840,defaultHeight:580,x:100,y:60}),M.registerWindow("siri",{title:"Siri & Gemini AI",icon:"🤖",el:document.querySelector("#win-siri"),defaultWidth:640,defaultHeight:540,x:180,y:70}),M.registerWindow("safari",{title:"Safari",icon:"🌐",el:document.querySelector("#win-safari"),defaultWidth:800,defaultHeight:560,x:140,y:60}),M.registerWindow("terminal",{title:"Terminal",icon:"💻",el:document.querySelector("#win-terminal"),defaultWidth:700,defaultHeight:460,x:120,y:90}),M.registerWindow("social",{title:"Activity Hub",icon:"⚡",el:document.querySelector("#win-social"),defaultWidth:800,defaultHeight:560,x:80,y:65}),M.registerWindow("settings",{title:"System Settings",icon:"⚙️",el:document.querySelector("#win-settings"),defaultWidth:760,defaultHeight:520,x:160,y:75}),M.registerWindow("mail",{title:"Mail",icon:"✉️",el:document.querySelector("#win-mail"),defaultWidth:680,defaultHeight:500,x:150,y:80});const D=document.querySelectorAll(".desktop-icon");$.attach(D,{maxTilt:16,scale:1.05,glare:!1});const z=document.querySelectorAll(".dock-item");$.attach(z,{maxTilt:18,scale:1.15,glare:!1});const j=document.querySelectorAll(".stat-box");$.attach(j,{maxTilt:10,scale:1.04,glare:!0}),document.querySelectorAll(".dock-item[data-app]").forEach(A=>{A.addEventListener("click",()=>{const m=A.getAttribute("data-app");m==="finder"?M.openWindow("resume"):m&&M.toggleWindowFromDock(m)})});const B=document.querySelector("#dock-trash");B==null||B.addEventListener("click",()=>{s.showNotification("Trash is Clean","All compiler warnings and bugs were resolved in pre-commit hooks! 🧹")}),H.init(w,e),H.onModeChange(A=>{A==="desktop"&&(M.openWindow("resume"),setTimeout(()=>{M.openWindow("siri")},200))}),H.currentMode==="desktop"&&setTimeout(()=>{M.openWindow("resume"),setTimeout(()=>{M.openWindow("siri")},200)},100)});
