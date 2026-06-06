import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Settings,
  Scan,
  Zap,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Terminal,
  X,
  ExternalLink,
  Laptop,
  Flame,
  Wrench,
  Globe,
  Radio,
} from "lucide-react";
import { PORTFOLIO_PROJECTS } from "./data";
import { Project } from "./types";
import HeroLoader from "./components/HeroLoader";
import ProjectDetail from "./components/ProjectDetail";

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // If the user pastes the Gemini share link, map it to the actual YouTube video within that share link
  if (trimmed.includes("gemini.google.com/share")) {
    return "TZGWNH-iaHk";
  }

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  if (
    trimmed.length === 11 &&
    !trimmed.includes("/") &&
    !trimmed.includes(".")
  ) {
    return trimmed;
  }
  return null;
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [view, setView] = useState<'main' | 'detail'>('main');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overclock, setOverclock] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Custom config states selectable in settings
  const [scanlines, setScanlines] = useState(true);
  const [gridOpacity, setGridOpacity] = useState(20); // 10% - 40%
  const [customColor, setCustomColor] = useState<string | null>(null);

  // Video Background States with localStorage fallback
  const [enableVideoBackground, setEnableVideoBackground] = useState(() => {
    const saved = localStorage.getItem("enable_video_bg");
    return saved !== null ? saved === "true" : true;
  });
  const [videoUrl, setVideoUrl] = useState(() => {
    const saved = localStorage.getItem("video_bg_url");
    if (
      !saved ||
      saved.includes("ForBiggerJoyrides.mp4") ||
      saved.includes("gemini.google.com")
    ) {
      return "/background.mp4";
    }
    return saved;
  });
  const [videoOpacity, setVideoOpacity] = useState(() => {
    const saved = localStorage.getItem("video_bg_opacity");
    if (saved !== null) {
      if (saved === "25") {
        // override previous 25 default
        return 60;
      }
      return Number(saved);
    }
    return 60;
  });
  const [videoBlendMode, setVideoBlendMode] = useState<string>(() => {
    return localStorage.getItem("video_bg_blend_mode") || "normal"; // default to normal for maximum browser compatibility
  });
  const [videoStatus, setVideoStatus] = useState<
    "loading" | "playing" | "error"
  >("loading");

  // Persist states using primitive dependencies
  useEffect(() => {
    localStorage.setItem("enable_video_bg", String(enableVideoBackground));
  }, [enableVideoBackground]);

  useEffect(() => {
    localStorage.setItem("video_bg_url", videoUrl);
    if (getYouTubeId(videoUrl)) {
      setVideoStatus("playing");
    } else {
      setVideoStatus("loading"); // Reset state when URL changes
    }
  }, [videoUrl]);

  useEffect(() => {
    localStorage.setItem("video_bg_opacity", String(videoOpacity));
  }, [videoOpacity]);

  useEffect(() => {
    localStorage.setItem("video_bg_blend_mode", videoBlendMode);
  }, [videoBlendMode]);

  // Terminal execution modal for demo simulation
  const [demoActive, setDemoActive] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [compilingStep, setCompilingStep] = useState(0);

  const currentProject = PORTFOLIO_PROJECTS[currentIndex];

  // Cycling forward through portfolio projects
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PORTFOLIO_PROJECTS.length);
  };

  // Cycling backward
  const handlePrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length,
    );
  };

  // Simulate compiler sequence on clicking 'Explore/Launch Demo'
  const triggerDemo = () => {
    setDemoActive(true);
    setTerminalLogs([]);
    setCompilingStep(0);
  };

  useEffect(() => {
    if (!demoActive) return;

    const logs = [
      `[SYS]: INITIALIZING KOTA.SANDEEP.KUMAR OS v5.08...`,
      `[SYS]: CONNECTING DIRECT PATHWAY TO ${currentProject.title.toUpperCase()}...`,
      `[SYS]: VERIFYING SECURE SSL CHANNELS & CONTAINER SUITE...`,
      `[SYS]: COMPILING TYPESCRIPT ENGINE AND ASSETS...`,
      `[SYS]: DRIZZLE PG CONNECTION ESTABLISHED SUCCESSFULLY.`,
      `[SYS]: RENDERING CYBERNETIC DEEP LAYOUT AT PORT 3000...`,
      `[SYS]: ACCELERATING GPU NODE CORES FOR RENDER SYNCHRONICITIES...`,
      `[SUCCESS]: DEPLOYMENT OF '${currentProject.title.toUpperCase()}' COMPLETE! LIVE ACCESSIBLE ENVIRONMENT CREATED.`,
    ];

    let interval: NodeJS.Timeout;
    let step = 0;

    const addLogStep = () => {
      if (step < logs.length) {
        setTerminalLogs((prev) => [...prev, logs[step]]);
        setCompilingStep(step + 1);
        step += 1;
        interval = setTimeout(addLogStep, 500 + Math.random() * 400);
      }
    };

    addLogStep();

    return () => clearTimeout(interval);
  }, [demoActive, currentIndex]);

  // Handle keypresses for accessibility and cool factor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") {
        setDemoActive(false);
        setShowConfig(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const activeColor =
    customColor || (overclock ? "#ff3333" : currentProject.themeColor);

  return (
    <>
      <AnimatePresence>
        {isInitialLoading && (
          <HeroLoader key="hero-loader" onComplete={() => setIsInitialLoading(false)} />
        )}
      </AnimatePresence>
      <div
        id="root-container"
      className="min-h-screen bg-[#000000] text-white select-none overflow-x-hidden font-sans relative flex flex-col justify-between p-6 md:p-12 xl:p-16"
      style={{
        cursor: "crosshair",
        backgroundImage: `linear-gradient(rgba(255, 255, 255, ${gridOpacity / 1000}) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, ${gridOpacity / 1000}) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Immersive Scanlines Overlay if enabled */}
      {scanlines && (
        <div
          id="crt-scanlines"
          className="pointer-events-none fixed inset-0 z-55 opacity-[0.06] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]"
        />
      )}

      {/* Cyber Overclock Grid Border Flash */}
      <AnimatePresence>
        {overclock && (
          <motion.div
            id="overclock-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 border-[6px] border-red-600/30 z-40 bg-red-950/[0.03]"
          />
        )}
      </AnimatePresence>

      {/* BACKGROUND VIDEO LOOP */}
      {enableVideoBackground && (
        <div className="absolute top-0 right-0 left-0 h-[55vh] md:inset-0 md:h-full z-0 pointer-events-none overflow-hidden transition-opacity duration-1000">
          {(() => {
            const ytId = getYouTubeId(videoUrl);
            if (ytId) {
              return (
                <div
                  key={`yt-bg-${ytId}`}
                  className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-1000 bg-[#020205]"
                  style={{ opacity: videoOpacity / 100 }}
                >
                  <iframe
                    onLoad={() => setVideoStatus("playing")}
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&disablekb=1&fs=0`}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) scale(1.6)`,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      pointerEvents: "none",
                      mixBlendMode: videoBlendMode as any,
                    }}
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              );
            }
            return (
              <video
                key={videoUrl}
                ref={(el) => {
                  if (el) {
                    el.play().catch(() => {});
                  }
                }}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                onLoadStart={() => setVideoStatus("loading")}
                onCanPlay={() => setVideoStatus("playing")}
                onError={() => setVideoStatus("error")}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000"
                style={{
                  opacity: videoOpacity / 100,
                  mixBlendMode: videoBlendMode as any,
                }}
              >
                <source
                  src={videoUrl}
                  type="video/mp4"
                  onError={() => setVideoStatus("error")}
                />
              </video>
            );
          })()}
          {/* Mobile Fade-Out Gradient */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent md:hidden" />
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#000000] via-[#000000]/50 to-transparent md:hidden" />
        </div>
      )}

      {/* BACKGROUND GRAPHIC BLOBS (Muted unless overclocked) */}
      <div
        id="bg-glow"
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{
          background: `radial-gradient(circle, ${activeColor}15 0%, transparent 70%)`,
        }}
      />

      <AnimatePresence mode="wait">
        {view === 'main' && (
          <motion.div
            key="main-view"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between flex-grow h-full w-full z-10 space-y-8"
          >
      {/* ================= HEADER & NAV SECTION ================= */}
      <header
        id="portfolio-header"
        className="w-full flex items-center justify-between z-10 select-none"
      >
        {/* Simple visual utility tag layout matching target screen layout */}
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full animate-pulse transition-all duration-300"
            style={{ backgroundColor: activeColor }}
          />
          <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
            {overclock
              ? "CORES RUNNING OVERCLOCKED : STATE 5.8GHZ"
              : "SYS CORE ACTIVE // ONLINE"}
          </span>
        </div>

        {/* Dynamic Project Index Navigation Bar (Exactly mimics '1/20 --------- NEXT PRODUCT') */}
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <span className="text-neutral-400 tracking-wider font-semibold">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(PORTFOLIO_PROJECTS.length).padStart(2, "0")}
          </span>
          <div className="w-16 md:w-28 h-px bg-neutral-800 relative overflow-hidden">
            <motion.div
              className="absolute h-full left-0 top-0 transition-colors duration-500"
              style={{ backgroundColor: activeColor }}
              initial={{ width: "20%" }}
              animate={{
                width: `${((currentIndex + 1) / PORTFOLIO_PROJECTS.length) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <button
            id="next-project-btn"
            onClick={() => setView('detail')}
            className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-all cursor-pointer font-semibold uppercase tracking-widest text-[11px]"
          >
            <span>NEXT PROJECT</span>
            <ChevronRight
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
              style={{ color: activeColor }}
            />
          </button>
        </div>
      </header>

      {/* ================= PRIMARY GRID CONTENT ================= */}
      <main
        id="portfolio-main-grid"
        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto z-10 py-8 pt-[45vh] md:pt-0 lg:py-0"
      >
        {/* LEFT COLUMN: TITLE AND CONTROLS (6 COLS) */}
        <section className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-10 text-left">
          {/* TITLE BLOCK - EXACTLY CHAR MATCHED IN PROPORTION */}
          <div className="space-y-1 block select-text">
            <motion.h1
              id="portfolio-title-line-1"
              key={`h1-l1-${overclock}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[4rem] sm:text-[5.5rem] xl:text-[6.8rem] leading-[0.9] font-black uppercase text-white font-display tracking-tighter"
              style={{
                textShadow: overclock
                  ? "3px 0px 0px rgba(255,0,0,0.5), -3px 0px 0px rgba(0,255,255,0.5)"
                  : "none",
              }}
            >
              KOTA.
            </motion.h1>

            <motion.h1
              id="portfolio-title-line-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[4rem] sm:text-[5.5rem] xl:text-[6.8rem] leading-[0.9] font-black uppercase tracking-tighter font-display text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.95)",
                textStroke: "1px rgba(255, 255, 255, 0.95)",
              }}
            >
              SANDEEP
            </motion.h1>

            <motion.h1
              id="portfolio-title-line-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[4rem] sm:text-[5.5rem] xl:text-[6.8rem] leading-[0.9] font-black uppercase text-white font-display tracking-tight"
            >
              KUMAR
            </motion.h1>
          </div>

          {/* PORTFOLIO DESCRIPTION - EXACTLY 133 CHARACTERS LENGTH FOR GEOMETRIC BALANCE */}
          <motion.div
            id="portfolio-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl text-neutral-400 text-sm md:text-base leading-relaxed tracking-wider font-light font-sans select-text"
          >
            Architects with high-end skills and a zero-gravity vision for those
            who don’t just watch the future—they build it. Shift your coding.
          </motion.div>

          {/* INTERACTIVE ROUNDED CIRCLE ACTIONS (Settings, Immersive Scan, Overclock) */}
          <motion.div
            id="controls-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 pt-2"
          >
            {/* Gear Configuration Trigger */}
            <button
              id="gear-cfg-btn"
              onClick={() => setShowConfig(!showConfig)}
              className="w-11 h-11 rounded-full border border-neutral-800 hover:border-white flex items-center justify-center cursor-pointer transition-all duration-300 relative group bg-black/40 backdrop-blur-sm"
              style={{
                borderColor: showConfig ? activeColor : undefined,
                boxShadow: showConfig ? `0 0 10px ${activeColor}20` : undefined,
              }}
              title="System Configuration"
            >
              <Settings
                className={`w-4 h-4 transition-transform duration-500 ${showConfig ? "rotate-90 text-white" : "text-neutral-400 group-hover:text-white"}`}
                style={{ color: showConfig ? activeColor : undefined }}
              />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-[9px] font-mono whitespace-nowrap py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                SYSTEM CONFIG
              </span>
            </button>

            {/* Immersive Scan / Grid Toggle */}
            <button
              id="theater-mode-btn"
              onClick={() => {
                setTheaterMode(!theaterMode);
                setGridOpacity(theaterMode ? 20 : 6);
              }}
              className="w-11 h-11 rounded-full border border-neutral-800 hover:border-white flex items-center justify-center cursor-pointer transition-all duration-300 relative group bg-black/40 backdrop-blur-sm"
              style={{
                borderColor: theaterMode ? activeColor : undefined,
                boxShadow: theaterMode
                  ? `0 0 10px ${activeColor}20`
                  : undefined,
              }}
              title="Toggle Fullscreen Focus"
            >
              <Scan
                className={`w-4 h-4 transition-transform ${theaterMode ? "scale-110" : "text-neutral-400 group-hover:text-white"}`}
                style={{ color: theaterMode ? activeColor : undefined }}
              />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-[9px] font-mono whitespace-nowrap py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                THEATER FOCUS
              </span>
            </button>

            {/* Overclock Extreme Core Mode */}
            <button
              id="overclock-btn"
              onClick={() => setOverclock(!overclock)}
              className="w-11 h-11 rounded-full border border-neutral-800 hover:border-white flex items-center justify-center cursor-pointer transition-all duration-500 relative group bg-black/40 backdrop-blur-sm overflow-hidden"
              style={{
                borderColor: overclock ? "#ff3333" : undefined,
                boxShadow: overclock
                  ? `0 0 12px rgba(255,51,51,0.4)`
                  : undefined,
                backgroundColor: overclock ? "rgba(255,51,51,0.05)" : undefined,
              }}
              title="Toggle Overclock Engine"
            >
              <Zap
                className={`w-4 h-4 transition-all duration-300 ${overclock ? "animate-bounce text-red-500 fill-red-500" : "text-neutral-400 group-hover:text-white"}`}
              />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-[9px] font-mono whitespace-nowrap py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {overclock ? "DISABLE OVERCLOCK" : "OVERCLOCK CORE"}
              </span>
            </button>

            {/* Extra mini status gauge */}
            <div className="h-6 w-px bg-neutral-800 mx-1 hidden sm:block" />
            <div className="flex-col hidden sm:flex text-left">
              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
                FRAMEWORK
              </span>
              <span className="text-[10px] font-mono font-medium text-neutral-300 tracking-wider">
                VITE / TS v5.3
              </span>
            </div>
          </motion.div>
        </section>

        {/* RIGHT COLUMN: TECHNICAL SPECS TABLE (5 COLS) */}
        <section
          id="tech-specs-section"
          className="lg:col-span-5 flex flex-col justify-center space-y-6 xl:pl-10"
        >
          {/* TECHNICAL SPECS FRAME */}
          <div className="border-t border-b border-neutral-900 py-4 space-y-3">
            <div className="flex items-center justify-between tracking-[0.25em] text-neutral-500 text-[10px] font-mono font-bold uppercase pb-1">
              <span>TECHNICAL SPECS</span>
              <span style={{ color: activeColor }} className="text-[9px]">
                READY // EST
              </span>
            </div>

            {/* SPEC ROWS (Updating dynamically per selected project) */}
            <div className="divide-y divide-neutral-900 border-t border-neutral-900">
              {/* Row 1: Skills */}
              <div
                id="spec-row-skills"
                className="grid grid-cols-12 py-3.5 items-center"
              >
                <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold self-center">
                  Skills
                </span>
                <span className="col-span-8 font-mono text-xs text-white/90 font-medium text-right tracking-wide truncate">
                  {currentProject.specs.skills}
                </span>
              </div>

              {/* Row 2: Roles */}
              <div
                id="spec-row-roles"
                className="grid grid-cols-12 py-3.5 items-center"
              >
                <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold self-center">
                  Roles
                </span>
                <span className="col-span-8 font-mono text-xs text-white/90 font-medium text-right tracking-wide truncate">
                  {currentProject.specs.roles}
                </span>
              </div>

              {/* Row 3: Status */}
              <div
                id="spec-row-status"
                className="grid grid-cols-12 py-3.5 items-center"
              >
                <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold self-center">
                  Status
                </span>
                <span
                  className="col-span-8 font-mono text-xs text-white/90 font-medium text-right tracking-wide truncate"
                  style={{ color: overclock ? "#ff3333" : undefined }}
                >
                  {currentProject.specs.status}
                </span>
              </div>

              {/* Row 4: Focus */}
              <div
                id="spec-row-focus"
                className="grid grid-cols-12 py-3.5 items-center"
              >
                <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold self-center">
                  Focus
                </span>
                <span className="col-span-8 font-mono text-xs text-white/90 font-medium text-right tracking-wide truncate">
                  {currentProject.specs.focus}
                </span>
              </div>
            </div>
          </div>

          {/* Quick cycle dots for visual page indicator */}
          <div className="flex items-center gap-2 pt-2 justify-end">
            {PORTFOLIO_PROJECTS.map((p, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => setCurrentIndex(index)}
                className="w-5 h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor:
                    index === currentIndex ? activeColor : "#1c1c1c",
                  boxShadow:
                    index === currentIndex
                      ? `0 0 8px ${activeColor}55`
                      : "none",
                }}
                title={`Go to Project ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </main>

      {/* ================= BOTTOM ROW: DYNAMIC PORTFOLIO CARD & BADGES ================= */}
      <footer
        id="portfolio-footer"
        className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 items-end pt-8 lg:pt-0 z-10 select-none"
      >
        {/* BOTTOM LEFT: PR-01 NEURAL COVER DISPLAY (Exactly mimics bottom-left card in target image) */}
        <div className="xl:col-span-7 flex justify-start">
          <motion.div
            id="featured-project-card"
            key={`card-${currentIndex}`}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full max-w-xl rounded-2xl border border-neutral-900/85 bg-neutral-950/70 p-3.5 flex flex-col sm:flex-row items-center gap-4 backdrop-blur-md relative"
            style={{
              boxShadow: `0 10px 30px -15px ${activeColor}15`,
            }}
          >
            {/* Visual Dynamic Generator (replicates futuristic 3D graphics showing glowing nodes/connections) */}
            <div
              id="project-visual-box"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-black/60 relative flex-shrink-0 flex items-center justify-center border border-neutral-900"
            >
              {/* Dynamic canvas render with SVG */}
              <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    id="neonGlowGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={activeColor}
                      stopOpacity="0.8"
                    />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Grid backdrop */}
                <path
                  d="M 10,0 L 10,100 M 30,0 L 30,100 M 50,0 L 50,100 M 70,0 L 70,100 M 90,0 L 90,100"
                  stroke="#111"
                  strokeWidth="0.5"
                />
                <path
                  d="M 0,10 L 100,10 M 0,30 L 100,30 M 0,50 L 100,50 M 0,70 L 100,70 M 0,90 L 100,90"
                  stroke="#111"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />

                {/* Dynamic SVG Visuals depending on project type */}
                {currentProject.iconType === "helix" && (
                  <g>
                    {/* Spinning DNA / Helix wires */}
                    <motion.path
                      d="M 20,50 Q 35,20 50,50 T 80,50"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="2.5"
                      animate={{
                        d: [
                          "M 20,50 Q 35,20 50,50 T 80,50",
                          "M 20,50 Q 35,80 50,50 T 80,50",
                          "M 20,50 Q 35,20 50,50 T 80,50",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.path
                      d="M 20,50 Q 35,80 50,50 T 80,50"
                      fill="none"
                      stroke={`${activeColor}40`}
                      strokeWidth="1.5"
                      animate={{
                        d: [
                          "M 20,50 Q 35,80 50,50 T 80,50",
                          "M 20,50 Q 35,20 50,50 T 80,50",
                          "M 20,50 Q 35,80 50,50 T 80,50",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                    />
                    <circle cx="20" cy="50" r="3" fill={activeColor} />
                    <circle cx="35" cy="35" r="2.5" fill="#fff" />
                    <circle cx="50" cy="50" r="3" fill={activeColor} />
                    <circle cx="65" cy="65" r="2.5" fill="#fff" />
                    <circle cx="80" cy="50" r="3" fill={activeColor} />
                  </g>
                )}

                {currentProject.iconType === "chat" && (
                  <g>
                    {/* Pulsating Websocket rings / waves */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="10"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="1"
                      animate={{ r: [10, 38], opacity: [1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeOut",
                      }}
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke={`${activeColor}80`}
                      strokeWidth="1.5"
                      animate={{ r: [1, 40], opacity: [0.3, 0.8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        ease: "easeOut",
                        delay: 1,
                      }}
                    />
                    <rect
                      x="42"
                      y="42"
                      width="16"
                      height="16"
                      rx="4"
                      fill="#000"
                      stroke={activeColor}
                      strokeWidth="2"
                    />
                    <circle cx="50" cy="50" r="3.5" fill={activeColor} />
                  </g>
                )}

                {currentProject.iconType === "database" && (
                  <g>
                    {/* Isometric rotating cyber cube */}
                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "linear",
                      }}
                      transform="translate(50,50)"
                    >
                      {/* Isometric hexagon base */}
                      <polygon
                        points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12"
                        fill="none"
                        stroke={activeColor}
                        strokeWidth="2"
                      />
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="25"
                        stroke={activeColor}
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="0"
                        x2="22"
                        y2="-12"
                        stroke={activeColor}
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="0"
                        x2="-22"
                        y2="-12"
                        stroke={activeColor}
                        strokeWidth="1.5"
                      />
                    </motion.g>
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="4"
                      fill="#fff"
                      animate={{ scale: [1, 1.8, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                  </g>
                )}

                {currentProject.iconType === "audio" && (
                  <g>
                    {/* Reactive soundwaves circle */}
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i * Math.PI) / 4;
                      const x1 = 50 + Math.cos(angle) * 15;
                      const y1 = 50 + Math.sin(angle) * 15;
                      const x2 = 50 + Math.cos(angle) * 28;
                      const y2 = 50 + Math.sin(angle) * 28;

                      return (
                        <motion.line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={activeColor}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          animate={{
                            x2: [
                              x2,
                              50 + Math.cos(angle) * (20 + Math.random() * 14),
                              x2,
                            ],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1 + Math.random() * 0.8,
                          }}
                        />
                      );
                    })}
                    <circle
                      cx="50"
                      cy="50"
                      r="10"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="1"
                    />
                  </g>
                )}

                {currentProject.iconType === "vision" && (
                  <g>
                    {/* Cyber Target scanning grid */}
                    <motion.line
                      x1="10"
                      y1="50"
                      x2="90"
                      y2="50"
                      stroke={activeColor}
                      strokeWidth="1"
                      animate={{ y1: [15, 85, 15], y2: [15, 85, 15] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        ease: "easeInOut",
                      }}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke={`${activeColor}30`}
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <rect
                      x="44"
                      y="44"
                      width="12"
                      height="12"
                      fill="none"
                      stroke={activeColor}
                      strokeWidth="1.5"
                    />
                    <circle cx="34" cy="30" r="2.5" fill="#ff3333" />
                    <circle cx="68" cy="72" r="2.5" fill={activeColor} />
                  </g>
                )}
              </svg>

              {/* Overclock particle blur overlay */}
              {overclock && (
                <div className="absolute inset-0 bg-red-600/10 mix-blend-color-dodge animate-pulse pointer-events-none" />
              )}
            </div>

            {/* DESCRIPTION/TITLE BLOCK OF PROJECT CARD */}
            <div className="flex-1 text-left space-y-2.5 w-full">
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] tracking-widest text-neutral-500 font-bold block uppercase">
                  PROJECT SHOWCASE
                </span>
                <span className="font-mono text-[14px] font-bold text-white tracking-wider block">
                  {currentProject.id}
                </span>
              </div>

              <p className="text-neutral-400 text-[11px] sm:text-[12px] leading-relaxed tracking-wide min-h-[36px]">
                {currentProject.description}
              </p>

              {/* ACTION: 'Add to Cart' rewritten perfectly for Portfolio */}
              <button
                id="explore-project-launcher"
                onClick={triggerDemo}
                className="w-full sm:w-auto px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 relative overflow-hidden group border"
                style={{
                  backgroundColor: `${activeColor}12`,
                  borderColor: `${activeColor}33`,
                  color: "#ffffff",
                }}
              >
                {/* background slide transition */}
                <span
                  className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300 -z-10"
                  style={{ backgroundColor: activeColor }}
                />
                <span className="relative z-10 flex items-center justify-center gap-1.5 group-hover:text-black">
                  CONNECT CORE
                  <ExternalLink className="w-3 h-3" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM RIGHT: FIXED BADGES MATCHING Screenshot (8K RAW -> NEXTJS, ULTRA-WIDE -> FULL-STACK etc.) */}
        <div id="badge-dock" className="xl:col-span-5 flex-col space-y-4">
          {/* Badge dock layout with absolute character match & custom scale motion container */}
          <div className="flex flex-wrap items-center justify-end gap-2 text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-400">
            {/* NEXTJS badge (6 chars) */}
            <div
              className="bg-neutral-900 border border-neutral-800 text-white rounded-full px-4 py-2 transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: overclock
                  ? "0 0 10px rgba(239, 68, 68, 0.1)"
                  : "none",
              }}
            >
              NEXTJS
            </div>

            {/* AI badge (2 chars) */}
            <div className="bg-neutral-900 border border-neutral-800 text-white rounded-full px-3.5 py-2 transition-all duration-300 hover:scale-105">
              AI
            </div>

            {/* FULL-STACK badge (10 chars) */}
            <div className="bg-neutral-900 border border-neutral-800 text-white rounded-full px-4.5 py-2 transition-all duration-300 hover:scale-105">
              FULL-STACK
            </div>

            {/* CLOUD-SCALE badge (11 chars) */}
            <div className="bg-white text-black border border-white rounded-full px-4.5 py-2 transition-all duration-300 hover:bg-transparent hover:text-white">
              CLOUD-SCALE
            </div>
          </div>

          {/* Twinkling four-pointed sci-fi star (exactly mimics star in bottom right of screenshot) */}
          <div className="flex items-center justify-end gap-3 text-neutral-500 font-mono text-[9px] tracking-wider font-semibold">
            <span>K.S.K © 2026</span>
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="origin-center"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: activeColor }}
              >
                <path d="M12 2L14.83 9.17L22 12L14.83 14.83L12 22L9.17 14.83L2 12L9.17 9.17L12 2Z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </footer>
          </motion.div>
        )}
        
        {view === 'detail' && (
          <ProjectDetail 
            key="detail-view"
            project={PORTFOLIO_PROJECTS[currentIndex]} 
            activeColor={activeColor} 
            onBack={() => setView('main')} 
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>

      {/* ================= MODAL: SYSTEM CONFIGURATION TRAY ================= */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            id="config-tray-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              id="config-tray-box"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 relative shadow-2xl"
              style={{
                boxShadow: `0 20px 50px -10px ${activeColor}33`,
              }}
            >
              <button
                onClick={() => setShowConfig(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-6 text-neutral-400">
                <Wrench className="w-4 h-4" style={{ color: activeColor }} />
                <h3 className="font-mono text-sm tracking-[0.2em] font-bold uppercase">
                  SYSTEM CONFIG
                </h3>
              </div>

              <div className="space-y-6 font-mono text-xs">
                {/* Accent Overrider */}
                <div className="space-y-2">
                  <span className="text-neutral-500 uppercase tracking-widest block">
                    Core Color Override
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCustomColor(null)}
                      className="w-6 h-6 rounded-full border border-white/20 hover:border-white bg-[#00f3ff] relative cursor-pointer"
                      title="Helix Blue"
                    >
                      {!customColor && (
                        <div className="absolute inset-0.5 bg-black rounded-full" />
                      )}
                    </button>
                    <button
                      onClick={() => setCustomColor("#00ff66")}
                      className="w-6 h-6 rounded-full border border-white/20 hover:border-white bg-[#00ff66] relative cursor-pointer"
                      title="Nest Green"
                    >
                      {customColor === "#00ff66" && (
                        <div className="absolute inset-0.5 bg-black rounded-full" />
                      )}
                    </button>
                    <button
                      onClick={() => setCustomColor("#ff9900")}
                      className="w-6 h-6 rounded-full border border-white/20 hover:border-white bg-[#ff9900] relative cursor-pointer"
                      title="Kronos Amber"
                    >
                      {customColor === "#ff9900" && (
                        <div className="absolute inset-0.5 bg-black rounded-full" />
                      )}
                    </button>
                    <button
                      onClick={() => setCustomColor("#ff0066")}
                      className="w-6 h-6 rounded-full border border-white/20 hover:border-white bg-[#ff0066] relative cursor-pointer"
                      title="Lyra Crimson"
                    >
                      {customColor === "#ff0066" && (
                        <div className="absolute inset-0.5 bg-black rounded-full" />
                      )}
                    </button>
                    <button
                      onClick={() => setCustomColor("#9d4edd")}
                      className="w-6 h-6 rounded-full border border-white/20 hover:border-white bg-[#9d4edd] relative cursor-pointer"
                      title="Aura Violet"
                    >
                      {customColor === "#9d4edd" && (
                        <div className="absolute inset-0.5 bg-black rounded-full" />
                      )}
                    </button>
                  </div>
                </div>

                {/* CRT scanlines toggle */}
                <div className="flex items-center justify-between py-2 border-t border-neutral-900">
                  <span className="text-neutral-500 uppercase tracking-widest">
                    CRT Scanline Filter
                  </span>
                  <input
                    type="checkbox"
                    checked={scanlines}
                    onChange={(e) => setScanlines(e.target.checked)}
                    className="w-4 h-4 rounded accent-cyan-500 cursor-pointer"
                  />
                </div>

                {/* Matrix background density */}
                <div className="space-y-2 pt-2 border-t border-neutral-900">
                  <div className="flex justify-between text-neutral-500 uppercase tracking-widest">
                    <span>Grid Opacity</span>
                    <span className="text-white">{gridOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={gridOpacity}
                    onChange={(e) => setGridOpacity(Number(e.target.value))}
                    className="w-full bg-neutral-900 h-1 rounded cursor-pointer"
                    style={{ accentColor: activeColor }}
                  />
                </div>

                {/* Video Background Settings */}
                <div className="space-y-4 pt-4 border-t border-neutral-900">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px]">
                      Video Background
                    </span>
                    <input
                      type="checkbox"
                      checked={enableVideoBackground}
                      onChange={(e) =>
                        setEnableVideoBackground(e.target.checked)
                      }
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: activeColor }}
                    />
                  </div>

                  {enableVideoBackground && (
                    <>
                      {/* Video Status Diagnostic */}
                      <div className="flex flex-col gap-1.5 p-2 rounded bg-black/50 border border-neutral-900 font-mono text-[9px]">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500">LINK STATUS:</span>
                          {videoStatus === "loading" ? (
                            <span className="text-yellow-500 animate-pulse">
                              ● CONNECTING...
                            </span>
                          ) : videoStatus === "playing" ? (
                            <span className="text-green-500 font-bold">
                              ● ACTIVE
                            </span>
                          ) : (
                            <span className="text-red-500 font-bold">
                              ● ERROR / INVALID LINK
                            </span>
                          )}
                        </div>
                      </div>

                      {videoStatus === "error" && (
                        <div className="p-2 bg-red-950/20 border border-red-900/30 rounded text-[8px] text-red-400 font-mono leading-relaxed">
                          ⚠️ NOTICE: Browser blocked mixing of this video inside
                          the sandbox iframe.
                        </div>
                      )}

                      {/* Video Opacity Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-neutral-500 uppercase tracking-widest text-[9px]">
                          <span>Video Opacity</span>
                          <span className="text-white">{videoOpacity}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={videoOpacity}
                          onChange={(e) =>
                            setVideoOpacity(Number(e.target.value))
                          }
                          className="w-full bg-neutral-900 h-1 rounded cursor-pointer"
                          style={{ accentColor: activeColor }}
                        />
                      </div>

                      {/* Blending Mode Selection */}
                      <div className="space-y-1.5 font-mono">
                        <div className="flex justify-between text-neutral-500 uppercase tracking-widest text-[9px]">
                          <span>Iframe Blend Mode</span>
                          <span className="text-white capitalize">
                            {videoBlendMode}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => setVideoBlendMode("normal")}
                            className={`py-1 rounded border text-[8px] transition-all duration-200 cursor-pointer uppercase ${
                              videoBlendMode === "normal"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 hover:text-white bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoBlendMode === "normal"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoBlendMode === "normal"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Normal (Highly Compatible)
                          </button>
                          <button
                            type="button"
                            onClick={() => setVideoBlendMode("screen")}
                            className={`py-1 rounded border text-[8px] transition-all duration-200 cursor-pointer uppercase ${
                              videoBlendMode === "screen"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 hover:text-white bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoBlendMode === "screen"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoBlendMode === "screen"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Screen (High Contrast)
                          </button>
                        </div>
                        <span className="text-[8px] leading-snug text-neutral-600 block">
                          *Select "Normal" if video feels invisible in this
                          editor view.
                        </span>
                      </div>

                      {/* YouTube Cinematic Loops */}
                      <div className="space-y-1.5 font-mono">
                        <span className="text-neutral-500 uppercase tracking-widest block text-[9px] text-cyan-400">
                          🔥 RECOMMENDED YOUTUBE LOOPS
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://www.youtube.com/watch?v=vhbkCEnNXcY",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl.includes("vhbkCEnNXcY")
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: videoUrl.includes("vhbkCEnNXcY")
                                ? activeColor
                                : undefined,
                              color: videoUrl.includes("vhbkCEnNXcY")
                                ? activeColor
                                : undefined,
                            }}
                          >
                            Cyber City
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://www.youtube.com/watch?v=lYah5-xEeck",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl.includes("lYah5-xEeck")
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: videoUrl.includes("lYah5-xEeck")
                                ? activeColor
                                : undefined,
                              color: videoUrl.includes("lYah5-xEeck")
                                ? activeColor
                                : undefined,
                            }}
                          >
                            Cyber Drive
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://gemini.google.com/share/2a250c55c6a3",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl.includes("gemini.google.com/share/2a250c55c6a3") || videoUrl.includes("TZGWNH-iaHk")
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: videoUrl.includes("gemini.google.com/share/2a250c55c6a3") || videoUrl.includes("TZGWNH-iaHk")
                                ? activeColor
                                : undefined,
                              color: videoUrl.includes("gemini.google.com/share/2a250c55c6a3") || videoUrl.includes("TZGWNH-iaHk")
                                ? activeColor
                                : undefined,
                            }}
                          >
                            Cyber Void
                          </button>
                        </div>
                      </div>

                      {/* Native Loop */}
                      <div className="space-y-1.5 font-mono mt-3">
                        <span className="text-neutral-500 uppercase tracking-widest block text-[9px] flex justify-between">
                          <span>Local Project Upload</span>
                        </span>
                        <div className="grid grid-cols-1 gap-1">
                          <button
                            type="button"
                            onClick={() => setVideoUrl("/background.mp4")}
                            className={`py-1.5 px-2 rounded border text-[9px] text-left transition-all duration-200 cursor-pointer uppercase flex justify-between items-center ${
                              videoUrl === "/background.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: videoUrl === "/background.mp4" ? activeColor : undefined,
                              color: videoUrl === "/background.mp4" ? activeColor : undefined,
                            }}
                          >
                            <span>/background.mp4</span>
                            <span className="text-[7px] text-neutral-500 lowercase opacity-70">(perfect smooth loop)</span>
                          </button>
                        </div>
                      </div>

                      {/* CDN loops */}
                      <div className="space-y-1.5 font-mono mt-3">
                        <span className="text-neutral-500 uppercase tracking-widest block text-[9px]">
                          CORS-Reliable Loops (Fast CDN)
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl ===
                              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoUrl ===
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoUrl ===
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Fast Helix
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl ===
                              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoUrl ===
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoUrl ===
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Vibrant Fire
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl ===
                              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoUrl ===
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoUrl ===
                                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Cyber Run
                          </button>
                        </div>
                      </div>

                      {/* Mixkit loops */}
                      <div className="space-y-1.5 font-mono">
                        <span className="text-neutral-500 uppercase tracking-widest block text-[9px]">
                          Additional cinematic loops
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-on-black-background-44158-large.mp4",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl ===
                              "https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-on-black-background-44158-large.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoUrl ===
                                "https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-on-black-background-44158-large.mp4"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoUrl ===
                                "https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-on-black-background-44158-large.mp4"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Cyber Lines
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-lights-30247-large.mp4",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl ===
                              "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-lights-30247-large.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoUrl ===
                                "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-lights-30247-large.mp4"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoUrl ===
                                "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-lights-30247-large.mp4"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Tech Tunnel
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setVideoUrl(
                                "https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-with-lights-background-32693-large.mp4",
                              )
                            }
                            className={`py-1.5 px-0.5 rounded border text-[8px] truncate transition-all duration-200 cursor-pointer uppercase ${
                              videoUrl ===
                              "https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-with-lights-background-32693-large.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor:
                                videoUrl ===
                                "https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-with-lights-background-32693-large.mp4"
                                  ? activeColor
                                  : undefined,
                              color:
                                videoUrl ===
                                "https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-with-lights-background-32693-large.mp4"
                                  ? activeColor
                                  : undefined,
                            }}
                          >
                            Digital Net
                          </button>
                        </div>
                      </div>

                      {/* Custom URL Input Field */}
                      <div className="space-y-1">
                        <span className="text-neutral-500 uppercase tracking-widest block text-[9px]">
                          Custom Video Link (.mp4 URL)
                        </span>
                        <input
                          type="text"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          placeholder="Paste direct MP4 web link..."
                          className="w-full bg-black text-[11px] text-neutral-300 rounded border border-neutral-800 py-1.5 px-3 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                          style={{
                            borderColor:
                              videoUrl &&
                              videoUrl !==
                                "https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-lines-on-black-background-44158-large.mp4" &&
                              videoUrl !==
                                "https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-blue-lights-30247-large.mp4" &&
                              videoUrl !==
                                "https://assets.mixkit.co/videos/preview/mixkit-network-of-connections-with-lights-background-32693-large.mp4"
                                ? activeColor
                                : undefined,
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Overclock telemetry toggle */}
                <div className="flex items-center justify-between py-2 border-t border-neutral-900">
                  <span className="text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-red-500" /> Overclock
                    Engine
                  </span>
                  <button
                    onClick={() => setOverclock(!overclock)}
                    className="px-3 py-1 rounded border text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-900"
                    style={{
                      borderColor: overclock ? "#ff3333" : "#333",
                      color: overclock ? "#ff3333" : "#888",
                    }}
                  >
                    {overclock ? "ENGAGED" : "OFFLINE"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowConfig(false)}
                className="w-full mt-6 py-2.5 bg-neutral-900 hover:bg-white hover:text-black font-mono text-[10px] font-bold tracking-[0.25em] uppercase border border-neutral-800 transition-colors cursor-pointer"
              >
                APPLY PARAMETERS
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: OVERLOCKED TERMINAL COMPILER DIALOG ================= */}
      <AnimatePresence>
        {demoActive && (
          <motion.div
            id="demo-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-hidden"
          >
            {/* HERO ACTION COMPILING OVERLAY VIDEO BACKGROUND */}
            {enableVideoBackground &&
              (() => {
                const ytId = getYouTubeId(videoUrl);
                if (ytId) {
                  return (
                    <div
                      key={`modal-yt-bg-${ytId}`}
                      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 transition-opacity duration-1000 bg-[#020205]"
                      style={{ opacity: videoOpacity / 100 }}
                    >
                      <iframe
                        onLoad={() => setVideoStatus("playing")}
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1&disablekb=1&fs=0`}
                        className="absolute"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) scale(1.6)`,
                          width: "100%",
                          height: "100%",
                          border: "none",
                          pointerEvents: "none",
                          mixBlendMode: videoBlendMode as any,
                        }}
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  );
                }
                return (
                  <video
                    key={`modal-${videoUrl}`}
                    ref={(el) => {
                      if (el) {
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-1000"
                    style={{
                      opacity: videoOpacity / 100, // optimal muted opacity for high text contrast
                      mixBlendMode: videoBlendMode as any,
                    }}
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                );
              })()}

            <motion.div
              id="terminal-box"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-2xl bg-[#030303]/90 border border-neutral-800 rounded-2xl p-6 shadow-2xl overflow-hidden flex flex-col justify-between relative z-10 backdrop-blur-sm"
              style={{
                boxShadow: `0 25px 60px -10px ${activeColor}20`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-900 mb-4 select-none">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-neutral-400">
                    CONSOLE@KOTA.SANDEEP // {currentProject.id.trim()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer"
                    onClick={() => setDemoActive(false)}
                  />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              {/* Terminal code streams */}
              <div
                id="logs-area"
                className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto font-mono text-[11px] space-y-2 text-left bg-black p-4 rounded-xl border border-neutral-950/80 mb-6"
              >
                <AnimatePresence>
                  {terminalLogs.map((log, i) => (
                    <motion.div
                      key={`log-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={
                        log.includes("SUCCESS")
                          ? "text-emerald-400 font-bold"
                          : log.includes("SYS")
                            ? "text-neutral-500"
                            : "text-neutral-300"
                      }
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Compiling loading bar if running */}
                {compilingStep < 8 && (
                  <div className="flex items-center gap-2 text-neutral-500 pt-2 border-t border-neutral-950 select-none">
                    <span>BUILD PROGRESS:</span>
                    <div className="flex-1 h-3 bg-neutral-950 rounded relative overflow-hidden border border-neutral-900">
                      <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(compilingStep / 8) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Simulated Live Action Sandbox Mock Dashboard after successful compile */}
              {compilingStep === 8 && (
                <motion.div
                  id="sandbox-mock-dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-950 rounded-xl p-5 border border-neutral-900 select-text text-left mb-6"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-neutral-900 pb-2">
                    <div className="flex items-center gap-1.5 font-bold font-mono text-xs text-white">
                      <Laptop
                        className="w-3.5 h-3.5"
                        style={{ color: activeColor }}
                      />
                      <span>
                        {currentProject.title.toUpperCase()} PROTO ENVIRONMENT
                      </span>
                    </div>
                    <span className="font-mono text-[8px] px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                      STABLE CORE
                    </span>
                  </div>

                  <p className="text-neutral-400 text-xs mb-4 leading-relaxed font-sans">
                    Demonstrating a simulated live deployment with functional
                    web integration. Registered to stack of developer Sandeep
                    Kumar.
                  </p>

                  <div className="grid grid-cols-2 gap-4 font-mono text-[10px] bg-black p-3 rounded border border-neutral-950">
                    <div className="space-y-1">
                      <span className="text-neutral-500 block">
                        DEPLOYMENT IP
                      </span>
                      <span className="text-emerald-400 block">
                        10.0.32.254
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-500 block">
                        DURABILITY ENGINE
                      </span>
                      <span className="text-white block">
                        Postgres / Drizzle
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-500 block">
                        CPU THREAD LOAD
                      </span>
                      <span className="text-white block animate-pulse">
                        0.02% VIRTUAL
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-500 block">
                        CONNECTION FLOW
                      </span>
                      <span className="text-white block truncate">
                        Secure WebSockets
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Dismiss controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDemoActive(false)}
                  className="flex-1 py-3 bg-neutral-900 hover:bg-white hover:text-black font-mono text-[10px] font-bold tracking-[0.25em] uppercase border border-neutral-800 transition-colors cursor-pointer rounded-lg"
                >
                  DISCONNECT SANDBOX
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
