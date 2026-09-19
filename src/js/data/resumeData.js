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
    summary: "B.Tech ECE 4th year candidate at Institute of Engineering & Management (IEM), Kolkata (Class of 2027) with an 8.73 CGPA. Built with a strong foundation in Object-Oriented Programming (OOP), algorithmic logic, control systems, and software-hardware co-design. Experienced in real-time data processing, VLSI design pipelines, and plant automation. Proficient in Python, MATLAB, C/C++, and version control, with proven IEEE publication and high-impact projects in embedded IoT and software architectures."
  },

  placementPitch: {
    headline: "Placement Candidate Profile: Abhishek Kumar",
    keyStrengths: [
      "High Academic Distinction: CGPA 8.73 (up to 6th semester) in B.Tech ECE at IEM Kolkata.",
      "Dual Expertise: Strong grasp across both bare-metal hardware/embedded firmware (Wokwi, Vivado, C/C++, microcontrollers) and high-level software engineering (Python, Django, React, AI Cloud).",
      "Published IEEE Researcher: First-author publication at IEEE IEMENTECH 2026 on wearable piezoelectric energy harvesting & healthcare technology.",
      "Hands-On Industrial Internships: Bare-metal IC design optimization at Jadavpur University & plant automation software systems at SAIL (Steel Authority of India Limited).",
      "Active Continuous Learner: Built & updated 5+ production-grade software and embedded systems in the last 6 months alone."
    ],
    targetRoles: [
      "Embedded Software Engineer / Firmware Engineer",
      "VLSI Design & Hardware Systems Engineer",
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
      id: "night-vision",
      title: "Embedded Night-Vision System for Pedestrian Detection",
      subtitle: "Active IR + Thermal Sensors with HAAR+AdaBoost & YOLOv2",
      badge: "Recent (Sep 2026) | AI & Embedded",
      createdPeriod: "Last 6 Months",
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
      createdPeriod: "Last 6 Months",
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
      { name: "VLSI Design & EDA Workflows", icon: "layers", level: 84 },
      { name: "Control Systems & Real-Time Processing", icon: "activity", level: 86 }
    ],
    languages: [
      { name: "C / C++", level: 92, tag: "Primary Systems Language" },
      { name: "Embedded C", level: 90, tag: "Firmware & Microcontrollers" },
      { name: "Python", level: 94, tag: "AI, Automation, Backend" },
      { name: "MATLAB", level: 85, tag: "Simulation & Modeling" },
      { name: "JavaScript / TypeScript", level: 82, tag: "Web & Tooling" },
      { name: "OOP (Object-Oriented Programming)", level: 90, tag: "Software Architecture" }
    ],
    tools: [
      "Xilinx Vivado", "Wokwi Simulator", "Git / GitHub", "CI/CD Pipelines",
      "LaTeX", "Agile / Jira", "Linux / Bash", "EDA Tools", "VS Code", "Django", "REST APIs"
    ],
    fundamentals: [
      "Data Structures & Algorithms (DSA)",
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
      issuer: "University of California San Diego (Coursera)",
      skills: ["IoT Cloud Architecture", "Sensor Telemetry", "Edge-to-Cloud Pipelines", "Cloud Analytics"],
      verificationUrl: "https://coursera.org"
    }
  ],

  activities: [
    {
      type: "Professional Memberships",
      items: [
        "Member of IEEE (Institute of Electrical and Electronics Engineers)",
        "Member of IEEE MTT-S (Microwave Theory and Technology Society)",
        "Member of IEEE CAS-S (Circuits and Systems Society)"
      ]
    },
    {
      type: "Volunteering & Leadership",
      items: [
        "Volunteer at SYTRON '25 (Technical Symposium)",
        "Student Mentorship & Peer Electronics Workshop Mentor"
      ]
    },
    {
      type: "Competitions",
      items: [
        "Participant in QUIZZOPHRENIA '25 (National Level Technical Quiz)"
      ]
    }
  ],

  socialFeed: [
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
      keywords: ["github", "recent projects", "last 6 months", "6 months", "latest", "new projects"],
      answer: "Over the last 6 months (2026), Abhishek built and updated key repositories on GitHub (@abhishek947kumar):\n• **Embedded-Night-Vision-System**: Active IR & thermal sensor fusion with YOLOv2 for real-time pedestrian recognition.\n• **Logistics-Management-System**: Enterprise commercial logistics and fleet tracking engine engineered in Python and Django.\n• **YourFinance**: Modern financial tracker with AI-driven expense categorization powered by Google Gemini.\n• **Evershop**: High-performance full-stack eCommerce platform built with TypeScript and React."
    },
    {
      keywords: ["publication", "paper", "research", "ieee", "iementech", "doi"],
      answer: "Abhishek's Peer-Reviewed IEEE Publication Details:\n• **Title**: Enhancing Wearable Depression Management: Integrating Piezoelectric Energy Harvesting and Acupressure-Based Therapy\n• **Conference**: IEEE IEMENTECH 2026\n• **Role**: First Author & Lead Hardware Architect\n• **DOI**: 10.1109/IEMENTech202669403.2026.11434403"
    },
    {
      keywords: ["skills", "technologies", "languages", "tech stack", "python", "c++", "embedded"],
      answer: "Abhishek's verified technical proficiencies:\n• **Programming Languages**: C, C++, Embedded C, Python, MATLAB, JavaScript/TypeScript, SQL\n• **Hardware & Protocols**: ARM/AVR/ESP Microcontrollers, GPIO, UART, SPI, I2C, VLSI Design, Control Systems\n• **EDA & Simulation Tools**: Xilinx Vivado, Wokwi Simulator, Logic Analyzers, Multisim\n• **Software & Web Engineering**: Django, REST APIs, Google Gemini AI, Git/GitHub, CI/CD, Agile/Jira"
    },
    {
      keywords: ["why hire", "hire", "placement", "value", "strengths", "fit", "candidate"],
      answer: "Why Abhishek Kumar is a top candidate for engineering teams:\n• **Top Academic Rigor**: 8.73 CGPA in B.Tech ECE with deep fundamentals in OOP, DSA, and Control Systems.\n• **Rare Bridge of Hardware & Software**: Hands-on mastery from bare-metal VLSI/firmware up to Python/Django/AI systems.\n• **Proven Researcher**: First-author IEEE conference publication at IEMENTECH 2026.\n• **Real Industrial Exposure**: On-site internships at Jadavpur University (VLSI EDA) and SAIL (Plant Automation).\n• **Placement Ready**: Immediately productive in Embedded Systems, Firmware, Hardware Design, or Software Engineering roles."
    },
    {
      keywords: ["contact", "email", "phone", "reach", "call", "address", "location", "message"],
      answer: "Direct contact channels for Abhishek Kumar:\n• **Email**: abhishek1297kumar@gmail.com\n• **Phone / WhatsApp**: +91 9470303282\n• **LinkedIn**: linkedin.com/in/abhishek947kumar\n• **GitHub**: github.com/abhishek947kumar\n• **Locations**: Kolkata, West Bengal & Bokaro Steel City, Jharkhand"
    },
    {
      keywords: ["activities", "ieee", "sytron", "quizzophrenia", "societies"],
      answer: "Professional societies and extracurricular leadership:\n• Active Member of IEEE, IEEE MTT-S (Microwave Theory and Technology), and IEEE CAS-S (Circuits & Systems).\n• Official Event Volunteer at SYTRON '25.\n• Active participant and competitor in QUIZZOPHRENIA '25."
    }
  ]
};
