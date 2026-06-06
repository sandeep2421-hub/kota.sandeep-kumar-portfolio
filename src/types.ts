export interface ProjectSpecs {
  skills: string; // matches "React • Node • CSS" (18 chars)
  roles: string;  // matches "Full-Stack Creator" (18 chars)
  status: string; // matches "Remote / global •" (17 chars)
  focus: string;  // matches "Interactive Creative Web" (24 chars)
}

export interface Project {
  id: string;          // e.g. "PR-01: HELIX CORE "
  title: string;       // human readable name
  description: string; // exactly 65 characters description
  specs: ProjectSpecs;
  themeColor: string;  // hex color for neon accents
  glowGradient: string;// CSS tailwind gradient classes
  iconType: "helix" | "chat" | "database" | "audio" | "vision";
}
