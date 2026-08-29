import { useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  BookOpen,
  Award,
  Code2,
  Phone,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  ExternalLink,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Settings,
  Scan,
  Zap,
  Terminal,
  ArrowUpRight,
  Globe,
  FileText,
  Download,
} from "lucide-react";
import {
  PERSONAL_INFO,
  PORTFOLIO_PROJECTS,
  TECHNICAL_SKILLS,
  RESEARCH_PUBLICATIONS,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
} from "../data";
import { Project } from "../types";

interface DashboardViewProps {
  currentIndex: number;
  setCurrentIndex: (idx: number | ((prev: number) => number)) => void;
  activeColor: string;
  overclock: boolean;
  setOverclock: (val: boolean | ((prev: boolean) => boolean)) => void;
  theaterMode: boolean;
  setTheaterMode: (val: boolean) => void;
  setGridOpacity: (val: number) => void;
  showConfig: boolean;
  setShowConfig: (val: boolean) => void;
  onOpenDetail: () => void;
  onTriggerDemo: () => void;
  onOpenSimulator: (project: Project) => void;
}

export default function DashboardView({
  currentIndex,
  setCurrentIndex,
  activeColor,
  overclock,
  setOverclock,
  theaterMode,
  setTheaterMode,
  setGridOpacity,
  showConfig,
  setShowConfig,
  onOpenDetail,
  onTriggerDemo,
  onOpenSimulator,
}: DashboardViewProps) {
  const safeIndex = Math.max(0, Math.min(currentIndex || 0, PORTFOLIO_PROJECTS.length - 1));
  const currentProject: Project = PORTFOLIO_PROJECTS[safeIndex] || PORTFOLIO_PROJECTS[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-16 lg:space-y-24 z-10 relative">
      {/* STICKY DASHBOARD HEADER NAV */}
      <header
        id="dashboard-sticky-nav"
        className="sticky top-0 z-30 w-full bg-black/80 backdrop-blur-xl border-b border-neutral-900/80 py-3.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 -mx-6 md:-mx-12 xl:-mx-16"
      >
        {/* SYS Indicator */}
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse transition-all duration-300"
            style={{ backgroundColor: activeColor }}
          />
          <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-bold">
            {overclock ? "OVERCLOCK ENGAGED" : "SYS CORE ACTIVE"}
          </span>
        </div>

        {/* Scroll Nav Anchors */}
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase"
          >
            PROJECTS
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase"
          >
            SKILLS
          </button>
          <button
            onClick={() => scrollToSection("research")}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase"
          >
            RESEARCH
          </button>
          <button
            onClick={() => scrollToSection("education")}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase"
          >
            EDUCATION
          </button>
          <button
            onClick={() => scrollToSection("certifications")}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase"
          >
            CERTS
          </button>
          <a
            href="resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 shadow"
          >
            <FileText className="w-3.5 h-3.5 fill-black" />
            <span>RESUME PDF</span>
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-3 py-1 rounded bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            CONTACT & PROFILE
          </button>
        </nav>

        {/* Quick Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="p-2 rounded-full border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-all cursor-pointer bg-black/40"
            title="System Config"
          >
            <Settings className="w-3.5 h-3.5" style={{ color: showConfig ? activeColor : undefined }} />
          </button>
          <button
            onClick={() => {
              setTheaterMode(!theaterMode);
              setGridOpacity(theaterMode ? 20 : 6);
            }}
            className="p-2 rounded-full border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-all cursor-pointer bg-black/40"
            title="Theater Mode"
          >
            <Scan className="w-3.5 h-3.5" style={{ color: theaterMode ? activeColor : undefined }} />
          </button>
          <button
            onClick={() => setOverclock(!overclock)}
            className="p-2 rounded-full border border-neutral-800 hover:border-white transition-all cursor-pointer bg-black/40"
            title="Overclock Mode"
          >
            <Zap className={`w-3.5 h-3.5 ${overclock ? "text-red-500 fill-red-500 animate-pulse" : "text-neutral-400"}`} />
          </button>
        </div>
      </header>

      {/* SECTION 1: HERO / BRAND TITLE & OBJECTIVE */}
      <section id="hero" className="w-full pt-4 space-y-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1 block select-text">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[3.8rem] sm:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] font-black uppercase text-white font-display tracking-tighter"
                style={{
                  textShadow: overclock
                    ? "3px 0px 0px rgba(255,0,0,0.5), -3px 0px 0px rgba(0,255,255,0.5)"
                    : "none",
                }}
              >
                KOTA.
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[3.8rem] sm:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] font-black uppercase tracking-tighter font-display text-transparent"
                style={{
                  WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.95)",
                }}
              >
                SANDEEP
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[3.8rem] sm:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] font-black uppercase text-white font-display tracking-tight"
              >
                KUMAR
              </motion.h1>
            </div>

            {/* Subtitle & Role Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="px-3.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider border border-neutral-800"
                style={{ color: activeColor, backgroundColor: `${activeColor}15` }}
              >
                {PERSONAL_INFO.role}
              </span>
              <span className="px-3.5 py-1 rounded text-xs font-mono font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                {PERSONAL_INFO.college}
              </span>
            </div>

            {/* Objective Paragraph */}
            <p className="max-w-2xl text-neutral-300 text-sm md:text-base leading-relaxed tracking-wide font-sans select-text border-l-2 border-neutral-800 pl-4 py-1">
              {PERSONAL_INFO.objective}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
              <a
                href="resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-black font-bold uppercase transition-all cursor-pointer shadow-xl hover:scale-105"
                style={{ backgroundColor: activeColor }}
              >
                <FileText className="w-4 h-4 fill-black" />
                <span>DOWNLOAD RESUME (PDF)</span>
                <Download className="w-3.5 h-3.5" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-600 transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>CONTACT ME</span>
              </button>
            </div>
          </div>

          {/* Right Highlights Panel */}
          <div className="lg:col-span-5 space-y-4 bg-neutral-950/80 border border-neutral-900 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <span className="font-mono text-xs font-bold uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                <Code2 className="w-4 h-4" style={{ color: activeColor }} />
                <span>PROFILE AT A GLANCE</span>
              </span>
              <span className="font-mono text-[9px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                AVAILABLE FOR ROLES
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2">
                <span className="text-neutral-500 uppercase">DEGREE PROGRAM</span>
                <span className="text-white font-semibold">B.Tech CSE (2023 - 2027)</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2">
                <span className="text-neutral-500 uppercase">ACADEMIC CGPA</span>
                <span className="text-cyan-400 font-bold">7.71 / 10 (VIT Vellore)</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2">
                <span className="text-neutral-500 uppercase">IEEE PUBLICATION</span>
                <span className="text-emerald-400 font-semibold">INDICON 2026 (Paper 2468)</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2">
                <span className="text-neutral-500 uppercase">CORE STACK</span>
                <span className="text-white">React • Next • FastAPI • Python</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 uppercase">LOCATION</span>
                <span className="text-neutral-300">Vellore, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROJECTS SHOWCASE DECK */}
      <section id="projects" className="w-full space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              <span>01 // FEATURED PROJECTS & SYSTEMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
              ENGINEERING PORTFOLIO
            </h2>
          </div>

          {/* Project Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {PORTFOLIO_PROJECTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-bold ${
                  idx === currentIndex
                    ? "border-cyan-400 text-white bg-cyan-950/40"
                    : "border-neutral-800 text-neutral-400 hover:text-white bg-neutral-950"
                }`}
                style={{
                  borderColor: idx === currentIndex ? activeColor : undefined,
                  boxShadow: idx === currentIndex ? `0 0 12px ${activeColor}30` : undefined,
                }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Project Main Deck Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-950/90 border border-neutral-900 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
          {/* Left Column: Project Summary & Resume Bullets */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  {currentProject.id}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${activeColor}20`, color: activeColor }}
                >
                  {currentProject.specs.status}
                </span>
              </div>
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white hover:text-cyan-400 transition-colors cursor-pointer"
                title="Open GitHub Repository in New Tab"
              >
                <span>{currentProject.title}</span>
                <ArrowUpRight className="w-6 h-6 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              {currentProject.subtitle && (
                <p className="text-base sm:text-lg font-sans text-neutral-300 font-medium">
                  {currentProject.subtitle}
                </p>
              )}
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 pt-2">
              {currentProject.fullDescription?.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: activeColor }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack Pills */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-bold block">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
              <button
                onClick={() => onOpenSimulator(currentProject)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-black font-bold uppercase transition-all cursor-pointer shadow-lg animate-pulse"
                style={{ backgroundColor: activeColor }}
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>LAUNCH LIVE INTERACTIVE APP</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 text-white font-bold uppercase hover:bg-neutral-800 transition-all cursor-pointer border border-neutral-800"
                >
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>OPEN GITHUB CODE</span>
                </a>
              )}

              <button
                onClick={onTriggerDemo}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800 hover:border-cyan-500/50 bg-neutral-900 text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>TERMINAL COMPILER</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Visual Box & Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Visual Box */}
            <div className="w-full h-48 sm:h-56 rounded-xl bg-black/80 border border-neutral-800 relative flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full p-4" viewBox="0 0 100 100">
                <path
                  d="M 10,0 L 10,100 M 30,0 L 30,100 M 50,0 L 50,100 M 70,0 L 70,100 M 90,0 L 90,100"
                  stroke="#151515"
                  strokeWidth="0.5"
                />
                <path
                  d="M 0,10 L 100,10 M 0,30 L 100,30 M 0,50 L 100,50 M 0,70 L 100,70 M 0,90 L 100,90"
                  stroke="#151515"
                  strokeWidth="0.5"
                />
                {currentProject.iconType === "helix" && (
                  <g>
                    <path
                      d="M 15,50 Q 35,15 50,50 T 85,50"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 15,50 Q 35,85 50,50 T 85,50"
                      fill="none"
                      stroke={`${activeColor}50`}
                      strokeWidth="1.5"
                    />
                    <circle cx="50" cy="50" r="4" fill={activeColor} />
                  </g>
                )}
                {currentProject.iconType === "chat" && (
                  <g>
                    <circle cx="50" cy="50" r="25" fill="none" stroke={activeColor} strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="10" fill={activeColor} opacity="0.4" />
                    <rect x="42" y="42" width="16" height="16" rx="3" fill="#000" stroke={activeColor} strokeWidth="2" />
                  </g>
                )}
                {currentProject.iconType === "database" && (
                  <g transform="translate(50,50)">
                    <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="none" stroke={activeColor} strokeWidth="2" />
                    <line x1="0" y1="0" x2="0" y2="25" stroke={activeColor} strokeWidth="1.5" />
                  </g>
                )}
                {currentProject.iconType === "audio" && (
                  <g>
                    <circle cx="50" cy="50" r="20" fill="none" stroke={activeColor} strokeWidth="2" />
                    <line x1="30" y1="50" x2="70" y2="50" stroke={activeColor} strokeWidth="2" />
                  </g>
                )}
                {currentProject.iconType === "vision" && (
                  <g>
                    <line x1="10" y1="50" x2="90" y2="50" stroke={activeColor} strokeWidth="1" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke={activeColor} strokeWidth="1.5" strokeDasharray="4,4" />
                  </g>
                )}
              </svg>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg border border-neutral-900 bg-black/60">
                <span className="text-neutral-500 uppercase text-[9px] block">ROLE</span>
                <span className="text-white font-semibold truncate block mt-0.5">
                  {currentProject.specs.roles}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-neutral-900 bg-black/60">
                <span className="text-neutral-500 uppercase text-[9px] block">FOCUS</span>
                <span className="text-cyan-400 font-semibold truncate block mt-0.5">
                  {currentProject.specs.focus}
                </span>
              </div>
            </div>

            {/* Carousel Nav Arrows */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-900 font-mono text-xs">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length)
                }
                className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <span className="text-neutral-500">
                {currentIndex + 1} / {PORTFOLIO_PROJECTS.length}
              </span>

              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % PORTFOLIO_PROJECTS.length)
                }
                className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <span>02 // CORE COMPETENCIES & STACK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            TECHNICAL SKILLS MATRIX
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNICAL_SKILLS.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-900 bg-neutral-950/80 space-y-4 backdrop-blur-md hover:border-neutral-800 transition-colors"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-cyan-400 border-b border-neutral-900 pb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>{cat.category}</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-200 hover:border-cyan-500/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: RESEARCH & IEEE PUBLICATIONS */}
      <section id="research" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
            <span>03 // ACADEMIC & FACULTY RESEARCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            RESEARCH & PUBLICATIONS
          </h2>
        </div>

        {RESEARCH_PUBLICATIONS.map((pub, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-6 backdrop-blur-md relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/40 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {pub.paperId}
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  {pub.date}
                </span>
              </div>
              <span className="font-mono text-xs text-neutral-300 font-semibold">
                {pub.institution}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-sans text-white">
                "{pub.title}"
              </h3>
              <p className="text-sm font-mono text-emerald-400 font-medium">
                {pub.authorship} | {pub.venue}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-neutral-900 font-mono text-xs text-neutral-400 space-y-2">
              <p className="text-neutral-200 font-bold">Faculty Research Collaborators (VIT SCOPE):</p>
              <div className="flex flex-wrap gap-4 text-neutral-300">
                {pub.coAuthors.map((ca, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {ca}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
                TECHNICAL METHODOLOGY & EMPIRICAL METRICS:
              </h4>
              <ul className="space-y-2.5">
                {pub.highlights.map((h, i) => (
                  <li key={i} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-3 font-sans leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 5: ACADEMIC EDUCATION */}
      <section id="education" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <span>04 // ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            EDUCATION & QUALIFICATIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-900 bg-neutral-950/80 space-y-4 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="px-3 py-1 rounded text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-900 inline-block">
                  {edu.timeline}
                </span>

                <div>
                  <h3 className="text-lg font-bold text-white font-sans leading-snug">
                    {edu.institution}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1">
                    {edu.degree}
                  </p>
                </div>

                {edu.highlights && (
                  <ul className="space-y-1.5 pt-2 border-t border-neutral-900">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-neutral-400 flex items-start gap-2 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-900">
                <span className="font-mono text-xs font-bold text-white px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 block text-center">
                  {edu.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CERTIFICATIONS GRID */}
      <section id="certifications" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            <span>05 // CREDENTIALS & CERTIFICATES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            PROFESSIONAL CERTIFICATIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <a
              key={idx}
              href={cert.link || "#"}
              target="_blank"
              rel="noreferrer"
              className="group p-5 rounded-xl border border-neutral-900 bg-neutral-950/80 backdrop-blur-md space-y-3 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-neutral-900/60 transition-all cursor-pointer shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Award className="w-5 h-5" style={{ color: cert.badgeColor }} />
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="text-xs font-bold text-white font-sans leading-snug group-hover:text-cyan-300 transition-colors">
                  {cert.name}
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>{cert.issuer}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span>VERIFIED</span>
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: cert.badgeColor }} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 7: CONTACT & FULL RESUME PROFILE FOOTER */}
      <section id="contact" className="w-full space-y-8 scroll-mt-24 pt-8">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <span>06 // CONNECT & GET IN TOUCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            PROFILE & CONTACT DOCK
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-950/90 border border-neutral-900 rounded-2xl p-6 sm:p-10 backdrop-blur-md">
          {/* Left Summary */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-3xl font-black font-display uppercase text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-sm font-mono text-cyan-400 mt-1">
                {PERSONAL_INFO.role}
              </p>
              <p className="text-xs font-mono text-neutral-400 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                {PERSONAL_INFO.college} • {PERSONAL_INFO.location}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Interested in full-stack software development, AI integration, machine learning prediction models, or scalable backend architectures? Feel free to reach out via phone, email, or connect directly on LinkedIn/GitHub!
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
              >
                <Mail className="w-4 h-4" />
                <span>SEND DIRECT EMAIL</span>
              </a>
            </div>
          </div>

          {/* Right Direct Links Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="p-4 rounded-xl border border-neutral-900 bg-black/60 hover:border-emerald-500 flex flex-col justify-between space-y-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">PHONE CONTACT</span>
                <span className="font-bold text-white text-sm block mt-0.5">+{PERSONAL_INFO.phone}</span>
              </div>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-4 rounded-xl border border-neutral-900 bg-black/60 hover:border-cyan-500 flex flex-col justify-between space-y-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">EMAIL ADDRESS</span>
                <span className="font-bold text-white text-xs block mt-0.5 truncate">{PERSONAL_INFO.email}</span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-neutral-900 bg-black/60 hover:border-blue-500 flex flex-col justify-between space-y-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Linkedin className="w-5 h-5 text-blue-400" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">LINKEDIN PROFILE</span>
                  <span className="font-bold text-white text-xs block mt-0.5">kota-sandeep-kumar</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </div>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-neutral-900 bg-black/60 hover:border-purple-500 flex flex-col justify-between space-y-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Github className="w-5 h-5 text-purple-400" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">GITHUB REPOSITORY</span>
                  <span className="font-bold text-white text-xs block mt-0.5">sandeep2421-hub</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </div>
            </a>

            <a
              href="resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-400 flex flex-col justify-between space-y-3 text-neutral-300 hover:text-white transition-all cursor-pointer sm:col-span-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <FileText className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                <Download className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">OFFICIAL DOCUMENT</span>
                  <span className="font-bold text-white text-sm block mt-0.5">DOWNLOAD KOTA SANDEEP KUMAR RESUME (PDF)</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
            </a>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span>KOTA SANDEEP KUMAR © 2026 • PORTFOLIO</span>
          <span>BUILT WITH REACT 19 + TAILWIND + VITE</span>
        </div>
      </section>
    </div>
  );
}
