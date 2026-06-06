import { Project } from "./types";

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "PR-01: HELIX CORE ",
    title: "Projecty Engine",
    description: "Modern portfolio crafted with responsive motion and deep layout.",
    specs: {
      skills: "React • Node • CSS",
      roles: "Full-Stack Creator",
      status: "Remote / global •",
      focus: "Interactive Creative Web"
    },
    themeColor: "#00f3ff", // neon cyan
    glowGradient: "from-cyan-500/20 to-blue-600/5",
    iconType: "helix"
  },
  {
    id: "PR-02: NEST CHAT  ",
    title: "Nest Chat Gateway",
    description: "Highly scalable websocket server providing real-time data sync..",
    specs: {
      skills: "Socket • Redis • Go",
      roles: "Systems Architect ",
      status: "Active / Live •  ",
      focus: "High-Performance Backend"
    },
    themeColor: "#00ff66", // neon green
    glowGradient: "from-emerald-500/20 to-teal-600/5",
    iconType: "chat"
  },
  {
    id: "PR-03: KRONOS DB  ",
    title: "Kronos Database",
    description: "Durable cloud persistence layer with advanced caching protocols.",
    specs: {
      skills: "SQL • Postgres • TS",
      roles: "Database Engineer ",
      status: "Closed Beta •    ",
      focus: "Optimized Query Planning"
    },
    themeColor: "#ff9900", // neon orange/amber
    glowGradient: "from-amber-500/20 to-orange-600/5",
    iconType: "database"
  },
  {
    id: "PR-04: LYRA AUDIO ",
    title: "Lyra Audio DSP",
    description: "Interactive sound modules with real-time audio waveform loading.",
    specs: {
      skills: "WebAudio • WebGL • ",
      roles: "Audio Programmer  ",
      status: "Open Source •    ",
      focus: "Digital Signal Processing"
    },
    themeColor: "#ff0066", // neon crimson
    glowGradient: "from-rose-500/20 to-purple-600/5",
    iconType: "audio"
  },
  {
    id: "PR-05: AURA VISION",
    title: "Aura Jetson Tracking",
    description: "Autonomous object tracking with high-performance neural networks.",
    specs: {
      skills: "Python • PyTorch • ",
      roles: "ML Research Lead  ",
      status: "Internship •     ",
      focus: "Computer Vision Pipeline"
    },
    themeColor: "#9d4edd", // neon violet
    glowGradient: "from-purple-500/20 to-indigo-600/5",
    iconType: "vision"
  }
];
