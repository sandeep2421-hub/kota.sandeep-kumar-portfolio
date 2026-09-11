import {
  Project,
  EducationItem,
  SkillCategory,
  Publication,
  Certification,
  PersonalInfo,
} from "./types";

export const PERSONAL_INFO: PersonalInfo = {
  name: "Kota Sandeep Kumar",
  phone: "6281754852",
  email: "kotasandeepkumar2006@gmail.com",
  linkedin: "https://www.linkedin.com/in/kota-sandeep-kumar-a13b8a379/",
  github: "https://github.com/sandeep2421-hub",
  college: "Vellore Institute of Technology, Vellore",
  role: "Full-Stack & AI Software Engineer",
  location: "Vellore, Tamil Nadu, India",
  objective:
    "Computer Science undergraduate with experience in full-stack development, AI-powered applications, ML-based prediction systems, and cloud technologies. Passionate about building scalable software solutions and seeking a software engineering role where I can contribute while continuously learning.",
};

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "PR-01: FUSIONFLOW AI",
    title: "FusionFlowAI",
    subtitle: "Urban Traffic Congestion Predictor",
    description:
      "Smart city AI platform predicting real-time traffic volume with XGBoost & weather telemetry.",
    fullDescription: [
      "Built a smart city AI platform predicting real-time traffic volume at Silk Board Junction, Bengaluru using XGBoost Regressor fused with live weather telemetry (temperature, humidity, and weather condition).",
      "Implemented a dual ML architecture – Historic Baseline Model and a Weather-Fused Prediction Model – achieving 10–20% accuracy improvement over static historical baselines, evaluated via RMSE, R-squared, MAE, and MAPE metrics.",
      "Developed an interactive Next.js dashboard with 24-hour comparative charts, hour-by-hour congestion heatmaps, and a model validation table.",
      "Built a secure Admin Panel with live weather simulation, on-demand model retraining, and database ingestion, all controllable from the browser.",
      "Deployed FastAPI backend on Render and Next.js frontend on Vercel for continuous 24/7 cloud hosting.",
    ],
    techStack: ["Next.js", "FastAPI", "Python", "XGBoost", "TailwindCSS", "Recharts"],
    specs: {
      skills: "Next.js • FastAPI • XGBoost",
      roles: "Lead AI/ML Engineer",
      status: "Submitted IEEE INDICON '26",
      focus: "Urban Traffic Data Fusion",
    },
    themeColor: "#00f3ff", // neon cyan
    glowGradient: "from-cyan-500/20 to-blue-600/5",
    iconType: "helix",
    githubUrl: "https://github.com/sandeep2421-hub/FusionFlowAI",
    caseStudy: {
      problem: "Silk Board Junction in Bengaluru suffers from extreme vehicular bottlenecks. Traditional static historical models fail to predict congestion spikes when rainfall or extreme weather conditions disrupt normal traffic flows.",
      architecture: [
        "Live Weather Telemetry (OpenWeather API) + Historical Traffic Baseline Dataset",
        "Data Fusion & Feature Engineering Pipeline (fusing precipitation, humidity, temperature)",
        "Dual XGBoost Regressor (Historic Baseline Model vs Weather-Fused Prediction Model)",
        "Asynchronous FastAPI Backend Deployed on Render",
        "Next.js Dashboard with Recharts & Hour-by-Hour Congestion Heatmaps"
      ],
      challenge: "Aligning asynchronous real-time weather streams with variable traffic volume data while preventing feature leakage and avoiding server inference delays.",
      impact: "Achieved an empirical 10–20% accuracy improvement over static baselines across RMSE, R², MAE, and MAPE metrics. Co-authored and submitted to IEEE INDICON 2026 (Paper ID: 2468).",
      metrics: [
        { label: "Accuracy Gain", value: "10–20%", sub: "Over static baselines" },
        { label: "Validation", value: "RMSE & R²", sub: "Empirical metrics" },
        { label: "Architecture", value: "2-Stage ML", sub: "Weather-fused XGBoost" },
        { label: "Forecast Horizon", value: "24 Hours", sub: "Hour-by-hour predictions" }
      ]
    }
  },
  {
    id: "PR-02: STUDY AI",
    title: "Study AI Desktop Assistant",
    subtitle: "Command Center & Cross-Platform Engine",
    description:
      "Cross-platform desktop assistant with low-profile capture & API key load balancing.",
    fullDescription: [
      "Developed a cross-platform desktop application using Electron and Node.js for silent, low-profile screen and audio capture.",
      "Built and deployed a stateless serverless Express backend on Vercel, integrating Firebase Firestore to manage license keys, HWID tracking, and connection logs.",
      "Designed a high-performance image preprocessing pipeline with client-side resizing (to 1280 px) and JPEG compression, reducing request payload sizes by 95%+ (from 8 MB+ to under 70 KB) to bypass Vercel's 4.5 MB payload limit.",
      "Implemented stateless API key load balancing across a dynamic pool of Gemini API keys to prevent rate-limiting and quota blocks.",
      "Created global keyboard hooks for stealth overlays and automated code injection using VBScript and PowerShell scripts.",
    ],
    techStack: [
      "Electron",
      "Node.js",
      "Express.js",
      "Firebase Firestore",
      "Vercel",
      "JavaScript",
    ],
    specs: {
      skills: "Electron • Express • Gemini API",
      roles: "Desktop & Backend Architect",
      status: "Deployed Serverless API",
      focus: "Screen Capture & AI Pipeline",
    },
    themeColor: "#00ff66", // neon green
    glowGradient: "from-emerald-500/20 to-teal-600/5",
    iconType: "chat",
    githubUrl: "https://github.com/sandeep2421-hub/study-ai-assistant",
    liveUrl: "https://study-ai-assistant-tawny.vercel.app",
    caseStudy: {
      problem: "Raw desktop screen captures generate large file payloads (8MB+) that exceed serverless cloud limits (Vercel's 4.5MB ceiling) and result in slow multi-second network roundtrips, while high LLM request volume triggers quota rate-limits.",
      architecture: [
        "Electron & Node.js Native Desktop Client with Global Hotkey Listeners",
        "Client-Side Canvas Image Resizing (to 1280px) & Optimized JPEG Compression",
        "Stateless Serverless Express Backend on Vercel with Sub-Second Routing",
        "Firebase Firestore for Secure Hardware ID (HWID) Tracking & Authentication",
        "Dynamic Pool Load Balancer Cycling Multiple Gemini API Keys"
      ],
      challenge: "Compressing high-resolution screen regions by over 95% without degrading text and code readability required by Gemini vision models for accurate OCR extraction.",
      impact: "Compressed request payloads from 8MB+ down to <70KB (95%+ reduction), eliminating serverless payload errors and providing fast, dependable AI assistance.",
      metrics: [
        { label: "Payload Reduction", value: "95%+", sub: "8MB down to <70KB" },
        { label: "Client Preprocessing", value: "1280px", sub: "Canvas JPEG pipeline" },
        { label: "Backend Deployment", value: "Serverless", sub: "Vercel Express API" },
        { label: "Quota Reliability", value: "Zero Blocks", sub: "Multi-key pool rotation" }
      ]
    }
  },
  {
    id: "PR-03: HOSPITAL SYSTEM",
    title: "Hospital Management",
    subtitle: "Async Healthcare Management Engine",
    description:
      "Scalable web portal built with React, FastAPI, and async MongoDB Motor CRUD operations.",
    fullDescription: [
      "Developed a scalable full-stack web application with a React frontend and a high-performance Python FastAPI backend.",
      "Designed and integrated an asynchronous MongoDB database using Motor for efficient, non-blocking CRUD operations.",
      "Implemented secure user authentication and session management using JWT (JSON Web Tokens) across RESTful APIs.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "MongoDB",
    ],
    specs: {
      skills: "React • FastAPI • MongoDB",
      roles: "Full-Stack Developer",
      status: "Active Architecture",
      focus: "Non-Blocking Async Web",
    },
    themeColor: "#ff9900", // neon amber
    glowGradient: "from-amber-500/20 to-orange-600/5",
    iconType: "database",
    githubUrl: "https://github.com/sandeep2421-hub/dsa-project-hospital-website",
    caseStudy: {
      problem: "Traditional synchronous healthcare management portals suffer database thread blocks and high latency during peak hours when handling concurrent patient registrations, medical appointments, and medical history lookups.",
      architecture: [
        "React Component-Driven Single Page Frontend with Tailwind CSS",
        "Python FastAPI Backend Powered by Uvicorn ASGI Server",
        "Motor Asynchronous MongoDB Driver for Non-Blocking Database I/O",
        "Stateless JWT Authentication and Role-Based Access Control (Admin/Doctor/Patient)"
      ],
      challenge: "Designing an asynchronous document schema that maintains record integrity across doctors, departments, and admitted patients without query race conditions.",
      impact: "Constructed an end-to-end non-blocking async architecture delivering fast database response times for hospital administrative workflows.",
      metrics: [
        { label: "Web Framework", value: "FastAPI", sub: "High-throughput ASGI" },
        { label: "Async Database", value: "Motor", sub: "Non-blocking MongoDB" },
        { label: "Security", value: "JWT Auth", sub: "Role-based authorization" },
        { label: "Repository", value: "Verified", sub: "Clean modular code" }
      ]
    }
  },
  {
    id: "PR-04: UNISPHERE",
    title: "UniSphere",
    subtitle: "Student Collaborative Knowledge Hub",
    description:
      "Real-time student portal for doubt clarification, knowledge sharing, and event management.",
    fullDescription: [
      "Created a collaborative platform enabling students to share knowledge, clarify doubts, and manage events online.",
      "Built a responsive React.js frontend and integrated backend functionality using Node.js.",
      "Implemented discussion forums, event management, and real-time interaction features.",
    ],
    techStack: ["React.js", "JavaScript", "HTML", "CSS", "Node.js"],
    specs: {
      skills: "React.js • Node.js • Web API",
      roles: "Full-Stack Engineer",
      status: "Verified Repository",
      focus: "Knowledge Sharing Forums",
    },
    themeColor: "#ff0066", // neon crimson
    glowGradient: "from-rose-500/20 to-purple-600/5",
    iconType: "audio",
    githubUrl: "https://github.com/sandeep2421-hub/UniSphere",
    caseStudy: {
      problem: "College students often face fragmented channels for academic discussion, doubt solving, and club event announcements across campus.",
      architecture: [
        "React.js Frontend UI with Modular Forum Component Trees",
        "Node.js & Express RESTful API Endpoints",
        "Categorized Data Storage for Question Threads and Campus Events",
        "Responsive Client Layouts Built for Desktop and Mobile Browsers"
      ],
      challenge: "Structuring thread nesting and category filtering so students can quickly discover discussions relevant to specific academic modules.",
      impact: "Developed a functional peer-to-peer campus platform promoting active academic collaboration and event discovery.",
      metrics: [
        { label: "Platform", value: "Full-Stack", sub: "React & Node.js" },
        { label: "Domain", value: "EdTech", sub: "Campus collaboration" },
        { label: "API Design", value: "RESTful", sub: "Clean endpoint schema" }
      ]
    }
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Vellore Institute of Technology, Vellore",
    degree: "B.Tech in Computer Science and Engineering",
    timeline: "2023 – 2027",
    score: "CGPA: 7.71 / 10",
    highlights: [
      "Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, OOP, Software Engineering",
      "Focusing on Machine Learning, AI Applications, and Distributed Cloud Systems.",
    ],
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Intermediate (CBSE)",
    timeline: "2021 – 2023",
    score: "Percentage: 70.4%",
    highlights: ["Mathematics, Physics, Chemistry focus"],
  },
  {
    institution: "Sri Chaitanya Techno School",
    degree: "10th (SSC)",
    timeline: "2020 – 2021",
    score: "GPA: 10 / 10",
    highlights: ["Perfect Academic Score (GPA 10.0)"],
  },
];

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Java", "Python", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Next.js",
      "Electron",
      "XGBoost",
      "scikit-learn",
      "Framer Motion",
      "Recharts",
      "TailwindCSS",
    ],
  },
  {
    category: "Databases",
    skills: ["MySQL", "MongoDB", "Firebase Firestore"],
  },
  {
    category: "Cloud & Tools",
    skills: [
      "Oracle Cloud Infrastructure (OCI)",
      "Git",
      "GitHub",
      "Vercel",
      "Render",
      "Uvicorn",
      "VS Code",
      "Linux",
      "Cisco Packet Tracer",
    ],
  },
  {
    category: "Relevant Coursework",
    skills: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Object-Oriented Programming (OOP)",
      "Software Engineering",
    ],
  },
];

export const RESEARCH_PUBLICATIONS: Publication[] = [
  {
    title: "Real-Time Data Fusion for Urban Traffic Prediction",
    authorship: "Co-Author | Submitted to IEEE INDICON 2026",
    venue: "IEEE INDICON 2026 (India Council International Conference)",
    paperId: "Paper ID: 2468",
    date: "August 2026",
    institution: "Vellore Institute of Technology, Vellore",
    coAuthors: ["Sivarangani A. (VIT SCOPE)", "Priya Ponnuswamy P. (VIT SCOPE)"],
    highlights: [
      "Proposed a two-stage ML pipeline fusing real-time weather and traffic data with historical baselines using XGBoost Regressor for accurate urban traffic volume forecasting.",
      "Demonstrated 10–20% accuracy improvement over static historical baselines, evaluated using RMSE, R-squared, MAE, and MAPE metrics.",
      "Co-authored with faculty researchers at VIT SCOPE.",
    ],
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: "Oracle Cloud Infrastructure – Generative AI Professional",
    issuer: "Oracle Cloud",
    badgeColor: "#ff0000",
    link: "https://drive.google.com/file/d/1pGzEp6mVNMxDVdIWfQD4gwpLNjr1_nXB/view",
  },
  {
    name: "Google AI Professional Certificate",
    issuer: "Google",
    badgeColor: "#4285F4",
    link: "https://drive.google.com/file/d/1HYw1avT0NKEvPqK2-YdjZvBwiR2zTFJE/view",
  },
  {
    name: "be10X – AI Tools Workshop",
    issuer: "be10X",
    badgeColor: "#00f3ff",
    link: "https://drive.google.com/file/d/1fon1Q70IRIi-CUzxfbQj0hSG54qMS9z2/view",
  },
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    badgeColor: "#d97706",
    link: "https://drive.google.com/file/d/1YbBtuGtX9YLXNRt6NREwUasHQUXLH7vZ/view",
  },
];
