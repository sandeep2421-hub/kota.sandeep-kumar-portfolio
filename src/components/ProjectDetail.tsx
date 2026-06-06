import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "../types";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  activeColor: string;
}

export default function ProjectDetail({ project, onBack, onNext, onPrev, activeColor }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 xl:p-16 h-full w-full pointer-events-auto bg-[#000000] overflow-y-auto md:overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute top-0 right-0 left-0 h-[55vh] md:inset-0 md:h-full z-0 pointer-events-none overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="moon.mp4" type="video/mp4" />
        </video>
        {/* Mobile Fade-Out Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent md:hidden" />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#000000] via-[#000000]/50 to-transparent md:hidden" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full flex items-center justify-end select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-all cursor-pointer font-semibold uppercase tracking-widest text-[11px]"
        >
          <ChevronLeft className="w-3.5 h-3.5" style={{ color: activeColor }} />
          <span>BACK HOME</span>
        </button>
      </header>

      {/* Main Content Grid matching screenshot style */}
      <main className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 flex-grow items-center pt-[45vh] md:pt-0">
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
              We create high-performance<br/>
              digital architectures.
            </h2>
          </div>

          {/* Stats / Badges */}
          <div className="grid grid-cols-2 gap-8 pt-8 max-w-lg">
            <div className="border-t border-neutral-800 pt-4">
              <p className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest">
                01 // {project.specs?.roles?.toUpperCase() || "CORE ARCHITECTURE"}
              </p>
              <p className="text-sm font-semibold text-neutral-300 mt-2 uppercase tracking-wider">
                {project.specs?.skills || "CHECK OFFICE IN LOS ANGELES"}
              </p>
            </div>
            <div className="border-t border-neutral-800 pt-4">
              <p className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest">
                02 // {project.specs?.status?.toUpperCase()?.replace(' •', '') || "PERFORMANCE METRICS"}
              </p>
              <p className="text-sm font-semibold text-neutral-300 mt-2 uppercase tracking-wider">
                Our Effective Execution
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-between h-full pt-12 lg:pt-0 pb-12">
          <div className="flex-1 flex flex-col justify-center max-w-md lg:ml-auto">
            <div className="space-y-8">
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed tracking-wider font-light">
                {project.title} is our flagship engine, built for extreme speed and modularity. It redefines how modern web applications are structured, focusing on elegant rendering pipelines. Our final results are brilliant.
                <br/><br/>
                Check out our portfolio and see how {project.description?.toLowerCase()}
              </p>
              
              <button 
                className="text-xs tracking-[0.2em] font-semibold text-white uppercase border-b border-white hover:text-neutral-300 hover:border-neutral-300 transition-all pb-1 tracking-widest block w-max"
              >
                READ MORE
              </button>
            </div>
          </div>

          {/* Bottom Right Pagination */}
          <div className="mt-8 flex flex-col lg:items-end w-full space-y-4 text-right">
            <div className="flex items-center gap-6 text-neutral-400 lg:justify-end">
              <button onClick={onPrev} className="hover:text-white transition-all cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={onNext} className="hover:text-white transition-all cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1 pt-4 border-t border-neutral-800 w-full max-w-[200px] ml-auto">
              <div className="flex items-center justify-end gap-2 text-[10px] tracking-widest text-neutral-500 uppercase font-mono">
                <span>25 MARCH 2021 | BLOG</span>
              </div>
              <p className="text-sm text-neutral-300 text-right">
                Photographs that attract<br/>attention.
              </p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
