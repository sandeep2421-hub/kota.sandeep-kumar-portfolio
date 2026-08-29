export interface ProjectSpecs {
  skills: string;
  roles: string;
  status: string;
  focus: string;
}

export interface Project {
  id: string;          // e.g. "PR-01: FUSIONFLOW AI"
  title: string;       // e.g. "FusionFlowAI"
  subtitle?: string;   // e.g. "Urban Traffic Congestion Predictor"
  description: string; // 65-100 character summary
  fullDescription?: string[]; // Detailed bullet points from resume
  techStack: string[];
  specs: ProjectSpecs;
  themeColor: string;  // Hex color for neon accents
  glowGradient: string;// CSS tailwind gradient classes
  iconType: "helix" | "chat" | "database" | "audio" | "vision";
  githubUrl?: string;
  liveUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  timeline: string;
  score: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Publication {
  title: string;
  authorship: string;
  venue: string;
  paperId: string;
  date: string;
  institution: string;
  highlights: string[];
  coAuthors: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  badgeColor: string;
  link?: string;
}

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  college: string;
  role: string;
  objective: string;
  location: string;
}
