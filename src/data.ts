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
  phone: "+91 6281754852",
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
    id: "PR-02: HOSPITAL SYSTEM",
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
      problem: "Healthcare management portals often rely on synchronous blocking database calls, which limits their ability to handle concurrent patient registrations, appointment scheduling, and medical record lookups without degrading responsiveness.",
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
    id: "PR-03: UNISPHERE",
    title: "UniSphere",
    subtitle: "University Management & Student Portal",
    description:
      "Complete university management web application with student attendance, hostel, library, and campus collaboration.",
    fullDescription: [
      "Developed a comprehensive university management web application using React.js and RESTful architecture.",
      "Built modules for Academic Calendars, Student Attendance Tracking, Library Management, Hostel Accommodations, and Exam Schedules.",
      "Integrated collaborative discussion boards, event coordination, and hackathon announcement hubs for campus students.",
    ],
    techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "Node.js", "REST APIs"],
    specs: {
      skills: "React.js • Node.js • REST APIs",
      roles: "Full-Stack Engineer",
      status: "Verified Repository",
      focus: "University Management & Forums",
    },
    themeColor: "#00ff66", // emerald/green
    glowGradient: "from-emerald-500/20 to-teal-600/5",
    iconType: "audio",
    githubUrl: "https://github.com/sandeep2421-hub/UniSphere",
    caseStudy: {
      problem: "University students and administrators navigate fragmented disjointed systems for class attendance, hostel room allocations, library book checkouts, and exam notices.",
      architecture: [
        "React.js Single Page Application with modular portal views",
        "Centralized Academic State Management for Attendance & Schedules",
        "RESTful Services for Library, Hostel, and Exam queries",
        "Interactive Campus Forum for Doubt Solving and Event Announcements"
      ],
      challenge: "Coordinating multiple campus administrative modules (Hostel, Attendance, Library, Fees) into a unified, responsive client experience.",
      impact: "Delivered a centralized campus management portal simplifying academic coordination and peer collaboration for university students.",
      metrics: [
        { label: "Architecture", value: "Modular React", sub: "Campus management" },
        { label: "Core Modules", value: "8 Modules", sub: "Hostel, Library, Exams" },
        { label: "Collaboration", value: "Real-Time", sub: "Campus discussion" },
        { label: "Repository", value: "Verified", sub: "Active open source" }
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
    degree: "Intermediate (CBSE) — MPC (Mathematics, Physics, Chemistry)",
    timeline: "2021 – 2023 (May 2023)",
    score: "Percentage: 70.4%",
    highlights: ["Mathematics, Physics, Chemistry academic focus"],
  },
  {
    institution: "Sri Chaitanya Techno School",
    degree: "10th Standard (SSC — Board of Secondary Education Andhra Pradesh)",
    timeline: "2020 – 2021 (June 2021)",
    score: "GPA: 10.0 / 10 (100%)",
    highlights: ["Perfect Academic Score (GPA 10.0 / 100%)"],
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
    authorship: "Research Co-Author | Submitted to IEEE INDICON 2026",
    venue: "IEEE INDICON 2026 (India Council International Conference) — Paper Submitted",
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
