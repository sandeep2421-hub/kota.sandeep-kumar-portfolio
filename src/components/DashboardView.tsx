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
  Zap,
  ArrowUpRight,
  Globe,
  FileText,
  Download,
  Layers,
  Activity,
  Cpu,
  ShieldCheck,
  Terminal,
  Database,
  Cloud,
  BookMarked,
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
  const [activeCaseStudyTab, setActiveCaseStudyTab] = useState<"overview" | "architecture" | "challenge">("overview");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-16 lg:space-y-24 z-10 relative select-text">
      {/* STICKY DASHBOARD HEADER NAV */}
      <header
        id="dashboard-sticky-nav"
        className="sticky top-0 z-30 w-full bg-black/90 backdrop-blur-xl border-b border-neutral-900 py-3 px-4 sm:px-8 flex items-center justify-between gap-3 -mx-6 md:-mx-12 xl:-mx-16"
      >
        {/* Candidate Brand */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="font-mono text-xs text-neutral-200 uppercase font-bold tracking-wider leading-none">
            Kota Sandeep Kumar
            <span className="text-neutral-500 hidden md:inline"> | VIT CSE '27</span>
          </span>
        </div>

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-4 lg:gap-6 font-mono text-xs flex-1 justify-center">
          <button onClick={() => scrollToSection("hero")} className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase">Overview</button>
          <button onClick={() => scrollToSection("research")} className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-medium uppercase flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /><span>Research</span>
          </button>
          <button onClick={() => scrollToSection("projects")} className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase">Projects</button>
          <button onClick={() => scrollToSection("skills")} className="text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase">Skills</button>
          <button onClick={() => scrollToSection("education")} className="hidden lg:block text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase">Education</button>
          <button onClick={() => scrollToSection("certifications")} className="hidden lg:block text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium uppercase">Certs</button>
        </nav>

        {/* Always-visible CTA buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 font-mono text-xs">
          <a
            href="resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 fill-black" />
            <span className="hidden xs:inline sm:inline">Resume</span>
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium uppercase transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </header>

      {/* SECTION: HERO / 5-SECOND DELOITTE RECRUITER SPOTLIGHT */}
      <section id="hero" className="w-full pt-2 space-y-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Full-Stack & AI Software Engineer</span>
              </div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase text-white font-display tracking-tight leading-[1.05]">
                Kota Sandeep Kumar
              </h1>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-2 text-neutral-300 font-mono text-xs sm:text-sm">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  <span>B.Tech in Computer Science and Engineering</span>
                </span>
                <span className="text-neutral-600 hidden sm:inline">•</span>
                <span>Vellore Institute of Technology (VIT Vellore)</span>
                <span className="text-neutral-600 hidden sm:inline">•</span>
                <span className="text-emerald-400 font-semibold">Class of 2027</span>
              </div>
            </div>

            {/* Executive Statement with Specializations and Proof */}
            <p className="max-w-2xl text-neutral-300 text-sm sm:text-base leading-relaxed font-sans border-l-2 border-cyan-500/60 pl-4 py-1">
              Computer Science undergraduate specializing in <strong>AI/ML prediction systems</strong>, <strong>FastAPI / Node.js backend architectures</strong>, and <strong>scalable cloud deployments</strong>. Co-authored urban traffic data fusion research submitted to <strong>IEEE INDICON 2026</strong> (Paper ID: 2468) achieving 10–20% empirical accuracy gains.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 pt-2 font-mono text-xs">
              {/* Primary CTAs — full width on mobile */}
              <a
                href="resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 fill-black" />
                <span>Download Resume (PDF)</span>
                <Download className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => scrollToSection("projects")}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase transition-all cursor-pointer shadow-md w-full sm:w-auto"
              >
                <Code2 className="w-4 h-4" />
                <span>Explore Projects</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Secondary CTAs — 2-col grid on mobile */}
              <div className="grid grid-cols-2 gap-2 sm:contents">
                <button
                  onClick={() => scrollToSection("research")}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 border border-emerald-500/40 text-emerald-400 hover:text-white hover:border-emerald-400 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Research</span>
                </button>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-600 transition-all cursor-pointer shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 hidden sm:block" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-600 transition-all cursor-pointer shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 hidden sm:block" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Highlights Bento Card */}
          <div className="lg:col-span-5 space-y-4 bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden"
            style={{ boxShadow: `0 0 40px -10px ${activeColor}22` }}>
            {/* Accent corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none"
              style={{ background: `${activeColor}15` }} />
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <span className="font-mono text-xs font-bold uppercase text-neutral-300 tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Profile Snapshot</span>
              </span>
              <span className="font-mono text-xs text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-semibold">
                Available for Roles
              </span>
            </div>

            <div className="space-y-3.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2.5">
                <span className="text-neutral-400 uppercase">Degree Program</span>
                <span className="text-white font-semibold">B.Tech CSE (2023–2027)</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2.5">
                <span className="text-neutral-400 uppercase">Academic CGPA</span>
                <span className="text-cyan-400 font-bold">7.71 / 10 (VIT Vellore)</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2.5">
                <span className="text-neutral-400 uppercase">IEEE Research</span>
                <span className="text-emerald-400 font-semibold">INDICON '26 (Paper Submitted)</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2.5">
                <span className="text-neutral-400 uppercase">Cloud Cert</span>
                <span className="text-amber-400 font-semibold">Oracle OCI GenAI Pro</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 uppercase">Primary Stack</span>
                <span className="text-white font-medium">FastAPI • React • Next • Python</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: IEEE RESEARCH (HONEST: PAPER SUBMITTED) */}
      <section id="research" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>01 // Academic & Faculty Research (Submitted)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
              IEEE INDICON 2026 Research
            </h2>
          </div>
          <span className="font-mono text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-lg self-start sm:self-auto">
            Vellore Institute of Technology (VIT SCOPE)
          </span>
        </div>

        {RESEARCH_PUBLICATIONS.map((pub, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-6 backdrop-blur-md relative"
          >
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2 border-b border-emerald-900/40 pb-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {pub.paperId}
                </span>
                <span className="font-mono text-xs text-neutral-300">
                  {pub.date}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-neutral-900 text-amber-400 border border-amber-500/30">
                  Submitted Paper
                </span>
              </div>
              <span className="hidden sm:block font-mono text-xs text-neutral-400">
                Conference Venue: <strong className="text-white">{pub.venue}</strong>
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                "{pub.title}"
              </h3>
              <p className="text-sm font-mono text-emerald-400 font-medium">
                {pub.authorship}
              </p>
            </div>

            {/* Architecture Pipeline Banner */}
            <div className="p-4 rounded-xl bg-black/70 border border-neutral-800 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-neutral-300 font-semibold text-xs uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Two-Stage Urban Traffic Data Fusion Architecture</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                  <p className="text-xs text-neutral-400 uppercase">Input Telemetry</p>
                  <p className="font-bold text-white mt-1">Weather & Historic Volume</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                  <p className="text-xs text-neutral-400 uppercase">Processing Engine</p>
                  <p className="font-bold text-cyan-400 mt-1">Data Fusion Matrix</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                  <p className="text-xs text-neutral-400 uppercase">ML Model</p>
                  <p className="font-bold text-emerald-400 mt-1">XGBoost Regressor</p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                  <p className="text-xs text-neutral-400 uppercase">Measured Result</p>
                  <p className="font-bold text-white mt-1">+10–20% Accuracy Gain</p>
                </div>
              </div>
            </div>

            {/* Co-Authors List */}
            <div className="p-4 rounded-xl bg-black/50 border border-neutral-900 font-mono text-xs space-y-2">
              <p className="text-neutral-400 font-semibold">Faculty Advisors & Co-Authors (VIT SCOPE):</p>
              <div className="flex flex-wrap gap-4 text-neutral-300">
                {pub.coAuthors.map((ca, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{ca}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
                Key Contributions & Empirical Findings:
              </h4>
              <ul className="space-y-2">
                {pub.highlights.map((h, i) => (
                  <li key={i} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-3 font-sans leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/sandeep2421-hub/FusionFlowAI"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>Explore FusionFlowAI Implementation Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 2: ENGINEERING PROJECTS & STRUCTURED CASE STUDIES */}
      <section id="projects" className="w-full space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Code2 className="w-4 h-4" />
              <span>02 // Engineering Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
              Featured Projects & Case Studies
            </h2>
          </div>

          {/* Project Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {PORTFOLIO_PROJECTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-bold ${
                  idx === currentIndex
                    ? "border-cyan-400 text-white bg-cyan-950/40 shadow-sm"
                    : "border-neutral-800 text-neutral-400 hover:text-white bg-neutral-950"
                }`}
                style={{
                  borderColor: idx === currentIndex ? activeColor : undefined,
                }}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Project Main Showcase Deck */}
        <div
          className="bg-neutral-950/90 border border-neutral-900 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden space-y-8"
          style={{ boxShadow: `0 0 50px -15px ${activeColor}20, inset 1px 0 0 0 ${activeColor}30` }}
        >
          {/* Top-left accent line */}
          <div className="absolute top-0 left-0 w-1 h-24 rounded-r-full opacity-60"
            style={{ background: `linear-gradient(to bottom, ${activeColor}, transparent)` }} />
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  {currentProject.id}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${activeColor}20`, color: activeColor }}
                >
                  {currentProject.specs.status}
                </span>
                <span className="text-neutral-400 font-mono text-xs">
                  {currentProject.specs.roles}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
                {currentProject.title}
              </h3>
              {currentProject.subtitle && (
                <p className="text-base sm:text-lg font-sans text-neutral-300 font-medium">
                  {currentProject.subtitle}
                </p>
              )}
            </div>

            {/* Project Action Links */}
            <div className="flex flex-col gap-2 font-mono text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-md w-full sm:w-auto"
                >
                  <Github className="w-4 h-4" />
                  <span>View Verified Code</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase transition-all cursor-pointer shadow-md"
                >
                  <Globe className="w-4 h-4" />
                  <span>Live Health Endpoint</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenSimulator(currentProject)}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800 hover:border-cyan-500/50 bg-neutral-900 text-neutral-200 hover:text-white transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Demo</span>
                </button>

                <button
                  onClick={onOpenDetail}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-600 bg-neutral-950 text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  <span>Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Metric Highlights Grid */}
          {currentProject.caseStudy?.metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
              {currentProject.caseStudy.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 rounded-xl border border-neutral-900 bg-black/60 space-y-1"
                >
                  <p className="text-xs uppercase text-neutral-400 tracking-wider">
                    {metric.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ color: activeColor }}>
                    {metric.value}
                  </p>
                  {metric.sub && (
                    <p className="text-xs text-neutral-400">{metric.sub}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Case Study Section Breakdown */}
          {currentProject.caseStudy && (
            <div className="space-y-6 pt-2">
              <div className="flex border-b border-neutral-900 gap-4 font-mono text-xs">
                <button
                  onClick={() => setActiveCaseStudyTab("overview")}
                  className={`pb-2.5 font-bold uppercase transition-colors cursor-pointer border-b-2 ${
                    activeCaseStudyTab === "overview"
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  01. Problem & Impact
                </button>
                <button
                  onClick={() => setActiveCaseStudyTab("architecture")}
                  className={`pb-2.5 font-bold uppercase transition-colors cursor-pointer border-b-2 ${
                    activeCaseStudyTab === "architecture"
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  02. System Architecture
                </button>
                <button
                  onClick={() => setActiveCaseStudyTab("challenge")}
                  className={`pb-2.5 font-bold uppercase transition-colors cursor-pointer border-b-2 ${
                    activeCaseStudyTab === "challenge"
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  03. Technical Challenge
                </button>
              </div>

              {activeCaseStudyTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-900 space-y-2">
                    <h4 className="font-mono text-xs font-bold uppercase text-neutral-300 tracking-wider">
                      The Problem:
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {currentProject.caseStudy.problem}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-900 space-y-2">
                    <h4 className="font-mono text-xs font-bold uppercase text-emerald-400 tracking-wider">
                      Measured Engineering Impact:
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {currentProject.caseStudy.impact}
                    </p>
                  </div>
                </div>
              )}

              {activeCaseStudyTab === "architecture" && (
                <div className="p-5 rounded-xl bg-black/70 border border-neutral-900 space-y-4">
                  <h4 className="font-mono text-xs font-bold uppercase text-neutral-300 tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Pipeline & Component Hierarchy</span>
                  </h4>
                  <div className="space-y-2">
                    {currentProject.caseStudy.architecture.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 text-xs font-mono text-neutral-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCaseStudyTab === "challenge" && (
                <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-900 space-y-2 font-sans">
                  <h4 className="font-mono text-xs font-bold uppercase text-amber-400 tracking-wider">
                    Core Technical Obstacle Solved:
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {currentProject.caseStudy.challenge}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Full Bullet Points from Resume */}
          <div className="space-y-3 pt-2">
            <h4 className="font-mono text-xs font-bold uppercase text-neutral-400 tracking-wider">
              Implementation Details:
            </h4>
            <ul className="space-y-2.5">
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
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2 pt-2 border-t border-neutral-900">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest font-bold block">
              Technologies & Frameworks
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

          {/* Demo disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 font-mono text-xs text-neutral-400">
            <Zap className="w-3.5 h-3.5 text-cyan-400/70 flex-shrink-0 mt-0.5" />
            <span>
              <span className="text-neutral-200 font-semibold">Interactive Demo</span>
              {" "}— illustrative simulation of the project's workflow. Not connected to the production backend or ML model.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Code2 className="w-4 h-4" />
            <span>03 // Core Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            Technical Skills Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNICAL_SKILLS.map((cat, idx) => {
            const categoryIcons: Record<string, React.ReactNode> = {
              "Languages": <Terminal className="w-4 h-4" />,
              "Frameworks & Libraries": <Layers className="w-4 h-4" />,
              "Databases": <Database className="w-4 h-4" />,
              "Cloud & Tools": <Cloud className="w-4 h-4" />,
              "Relevant Coursework": <BookMarked className="w-4 h-4" />,
            };
            const icon = categoryIcons[cat.category] || <Code2 className="w-4 h-4" />;
            return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-900 bg-neutral-950/80 space-y-4 backdrop-blur-md hover:border-neutral-800 transition-colors"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-cyan-400 border-b border-neutral-900 pb-2 flex items-center gap-2">
                {icon}
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
            );
          })}
        </div>
      </section>

      {/* SECTION 4: ACADEMIC EDUCATION */}
      <section id="education" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="w-4 h-4" />
            <span>04 // Academic Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            Education & Qualifications
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
                  <p className="text-xs font-mono text-neutral-300 mt-1">
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

      {/* SECTION 5: CERTIFICATIONS */}
      <section id="certifications" className="w-full space-y-6 scroll-mt-24">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>05 // Industry Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            Professional Certifications
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
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>{cert.issuer}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span>Verified</span>
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: cert.badgeColor }} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 6: CONTACT & RECRUITER DOCK */}
      <section id="contact" className="w-full space-y-8 scroll-mt-24 pt-4">
        <div className="border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Mail className="w-4 h-4" />
            <span>06 // Contact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white mt-1">
            Get in Touch
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
              <p className="text-xs font-mono text-neutral-300 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>{PERSONAL_INFO.college} • {PERSONAL_INFO.location}</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
              Seeking software engineering roles, full-stack development, and AI/ML system opportunities where I can apply scalable engineering, clean code, and empirical problem solving.
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>

          {/* Right Direct Links Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <a
              href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
              className="p-4 rounded-xl border border-neutral-900 bg-black/60 hover:border-emerald-500 flex flex-col justify-between space-y-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-xs text-neutral-400 uppercase block">Phone Contact</span>
                <span className="font-bold text-white text-sm block mt-0.5">{PERSONAL_INFO.phone}</span>
              </div>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-4 rounded-xl border border-neutral-900 bg-black/60 hover:border-cyan-500 flex flex-col justify-between space-y-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-xs text-neutral-400 uppercase block">Email Address</span>
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
                  <span className="text-xs text-neutral-400 uppercase block">LinkedIn Profile</span>
                  <span className="font-bold text-white text-xs block mt-0.5">kota-sandeep-kumar-a13b8a379</span>
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
                  <span className="text-xs text-neutral-400 uppercase block">GitHub Repository</span>
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
                  <span className="text-xs text-emerald-400 font-bold uppercase block">Official Curriculum Vitae</span>
                  <span className="font-bold text-white text-sm block mt-0.5">Download Kota Sandeep Kumar Resume (PDF)</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
            </a>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span>Kota Sandeep Kumar © 2026 • Portfolio</span>
          <span>Built with React 19 + TypeScript + Tailwind CSS</span>
        </div>
      </section>
    </div>
  );
}
