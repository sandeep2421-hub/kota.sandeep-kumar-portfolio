import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Code2, Award, ArrowUpRight } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailProps {
  key?: string;
  project: Project;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  activeColor: string;
  onReadMore: () => void;
}

export default function ProjectDetail({
  project,
  onBack,
  onNext,
  onPrev,
  activeColor,
  onReadMore,
}: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 xl:p-16 h-full w-full pointer-events-auto bg-[#000000] overflow-y-auto"
    >
      {/* Background Video Layer */}
      <div className="absolute top-0 right-0 left-0 h-[55vh] md:inset-0 md:h-full z-0 pointer-events-none overflow-hidden opacity-30">
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="moon.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full flex items-center justify-between select-none pb-6 border-b border-neutral-900">
        <div className="flex items-center gap-3">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: activeColor }}
          />
          <span className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-widest">
            {project.id}
          </span>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all cursor-pointer font-mono font-semibold uppercase tracking-widest text-[11px] px-3 py-1.5 rounded border border-neutral-800 hover:border-neutral-600 bg-black/50"
        >
          <ChevronLeft className="w-4 h-4" style={{ color: activeColor }} />
          <span>RETURN TO DASHBOARD</span>
        </button>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 flex-grow py-8 items-start">
        {/* Left Side: Title, Subtitle, Tech Badges, Specs */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <div className="space-y-4">
            <span
              className="inline-block px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest uppercase border border-neutral-800"
              style={{ color: activeColor, backgroundColor: `${activeColor}15` }}
            >
              {project.specs.focus}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-xl sm:text-2xl font-sans text-neutral-300 font-light">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest font-bold block">
              TECHNOLOGY STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-900 border border-neutral-800 text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
              >
                <Github className="w-4 h-4" />
                <span>VIEW GITHUB CODE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onReadMore}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-600 bg-neutral-950 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <Code2 className="w-4 h-4" style={{ color: activeColor }} />
              <span>SYSTEM NARRATIVE</span>
            </button>
          </div>

          {/* Specifications Matrix */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-900">
            <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-900">
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                ROLE
              </p>
              <p className="text-sm font-semibold text-white mt-1">
                {project.specs.roles}
              </p>
            </div>
            <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-900">
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                STATUS
              </p>
              <p className="text-sm font-semibold text-emerald-400 mt-1">
                {project.specs.status}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Key Highlights & Detailed Bullet Points */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="bg-neutral-950/90 border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] font-bold text-neutral-400 flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: activeColor }} />
                <span>PROJECT HIGHLIGHTS & ARCHITECTURE</span>
              </h3>
            </div>

            <ul className="space-y-4">
              {project.fullDescription ? (
                project.fullDescription.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: activeColor }}
                    />
                    <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                      {bullet}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              )}
            </ul>
          </div>

          {/* Bottom Project Switcher Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-900 font-mono text-xs">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS PROJECT</span>
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <span>NEXT PROJECT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
