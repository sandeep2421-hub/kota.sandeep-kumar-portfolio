import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { Project } from "../types";

interface ProjectNarrativeProps {
  key?: string;
  project: Project;
  onBack: () => void;
  activeColor: string;
}

export default function ProjectNarrative({ project, onBack, activeColor }: ProjectNarrativeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 xl:p-16 h-full w-full pointer-events-auto bg-[#000000] overflow-y-auto md:overflow-hidden"
    >
      {/* Top Header */}
      <header className="relative z-10 w-full flex items-center justify-end select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all cursor-pointer font-semibold uppercase tracking-widest text-[11px]"
        >
          <ChevronLeft className="w-3.5 h-3.5" style={{ color: activeColor }} />
          <span>BACK TO DETAILS</span>
        </button>
      </header>

      {/* Main Content Grid */}
      <main className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 flex-grow items-center pt-[10vh] md:pt-0">
        {/* Left Side */}
        <div className="flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] font-black uppercase font-display tracking-tighter w-full">
              {project.title.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className={`block ${i % 2 !== 0 ? "text-transparent [-webkit-text-stroke:2px_white]" : "text-white"}`}
                >
                  {word}
                </span>
              ))}
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif text-white max-w-md">
              System architecture, modular integration, and detailed specifications.
            </h2>
          </div>

          {/* Specs / Meta */}
          <div className="grid grid-cols-2 gap-8 pt-8 max-w-lg">
            <div className="border-t border-neutral-800 pt-4">
              <p className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest">
                DEVELOPMENT STACK //
              </p>
              <p className="text-sm font-semibold text-neutral-300 mt-2 uppercase tracking-wider">
                {project.specs?.skills || "REACT • NODE • TS"}
              </p>
            </div>
            <div className="border-t border-neutral-800 pt-4">
              <p className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest">
                PROJECT METRICS //
              </p>
              <p className="text-sm font-semibold text-neutral-300 mt-2 uppercase tracking-wider">
                {project.specs?.status || "ACTIVE ENVIRONMENT"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-between h-full pt-12 lg:pt-0 pb-12">
          <div className="flex-1 flex flex-col justify-center max-w-md lg:ml-auto">
            <div className="space-y-8 text-neutral-400 text-sm md:text-base leading-relaxed tracking-wider font-light">
              <h3 className="text-white font-mono text-xs uppercase tracking-[0.25em] font-bold">
                [ TECHNICAL DOCUMENTATION ]
              </h3>
              <p>
                The {project.title} project represents a breakthrough in design efficiency. By deploying cloud-native technologies and keeping the interface clean and reactive, we deliver an unmatched, frictionless user experience.
              </p>
              <p>
                We treat core modules as isolated components. This architecture ensures high fault-tolerance and simplifies future scale operations. All system calls are secured, monitored, and optimized for sub-millisecond response times.
              </p>
              <p>
                Focusing on {project.specs?.focus?.toLowerCase()}, this project ensures that developers and visitors have immediate, reliable access to all required data nodes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
