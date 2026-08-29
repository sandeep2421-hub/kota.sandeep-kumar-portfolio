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
import { PORTFOLIO_PROJECTS, PERSONAL_INFO } from "./data";
import { Project } from "./types";
import HeroLoader from "./components/HeroLoader";
import ProjectDetail from "./components/ProjectDetail";
import ProjectNarrative from "./components/ProjectNarrative";
import ResumeSections from "./components/ResumeSections";
import DashboardView from "./components/DashboardView";
import LiveAppSimulator from "./components/LiveAppSimulator";

function getYouTubeId(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
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
  const [view, setView] = useState<'main' | 'detail' | 'narrative'>('main');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overclock, setOverclock] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [activeResumeSection, setActiveResumeSection] = useState<'education' | 'research' | 'skills' | 'contact' | null>(null);
  const [activeSimulatorProject, setActiveSimulatorProject] = useState<Project | null>(null);

  // Custom config states selectable in settings
  const [scanlines, setScanlines] = useState(true);
  const [gridOpacity, setGridOpacity] = useState(20); // 10% - 40%
  const [customColor, setCustomColor] = useState<string | null>(null);

  // Video Background States with localStorage fallback
  const [enableVideoBackground, setEnableVideoBackground] = useState(() => {
    try {
      const saved = localStorage.getItem("enable_video_bg");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("video_bg_url");
      if (
        !saved ||
        typeof saved !== "string" ||
        saved === "undefined" ||
        saved === "null" ||
        saved.includes("ForBiggerJoyrides.mp4") ||
        saved.includes("gemini.google.com")
      ) {
        return "background.mp4";
      }
      return saved;
    } catch {
      return "background.mp4";
    }
  });
  const [videoOpacity, setVideoOpacity] = useState(() => {
    try {
      const saved = localStorage.getItem("video_bg_opacity");
      if (saved !== null) {
        if (saved === "25") {
          return 60;
        }
        return Number(saved) || 60;
      }
      return 60;
    } catch {
      return 60;
    }
  });
  const [videoBlendMode, setVideoBlendMode] = useState<string>(() => {
    try {
      return localStorage.getItem("video_bg_blend_mode") || "normal";
    } catch {
      return "normal";
    }
  });
  const [videoStatus, setVideoStatus] = useState<
    "loading" | "playing" | "error"
  >("loading");

  // Safe helper to check videoUrl inclusion
  const isVideoUrl = (str: string) => (videoUrl || "").includes(str);

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

    const projectStackStr = currentProject.techStack.join(" • ");
    const logs = [
      `[SYS]: INITIALIZING KOTA.SANDEEP.KUMAR OS v5.08...`,
      `[SYS]: CONNECTING DIRECT PATHWAY TO ${currentProject.title.toUpperCase()}...`,
      `[SYS]: VERIFYING SECURE CHANNELS (${projectStackStr})...`,
      `[SYS]: COMPILING ENGINE ASSETS & RUNTIME DEPENDENCIES...`,
      `[SYS]: ${currentProject.specs.focus.toUpperCase()} SYSTEM INITIALIZED SUCCESSFULLY.`,
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
        if (step === logs.length) {
          interval = setTimeout(() => {
            setCompilingStep(9);
          }, 1000);
        } else {
          interval = setTimeout(addLogStep, 500 + Math.random() * 400);
        }
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

  const safeIndex = Math.max(0, Math.min(currentIndex || 0, PORTFOLIO_PROJECTS.length - 1));
  const currentProject = PORTFOLIO_PROJECTS[safeIndex] || PORTFOLIO_PROJECTS[0];

  const activeColor =
    customColor || (overclock ? "#ff3333" : (currentProject?.themeColor || "#00f3ff"));

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
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000">
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
        className="fixed top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{
          background: `radial-gradient(circle, ${activeColor}15 0%, transparent 70%)`,
        }}
      />

      <AnimatePresence mode="wait">
        {view === 'main' && (
          <motion.div
            key="main-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full z-10"
          >
            <DashboardView
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              activeColor={activeColor}
              overclock={overclock}
              setOverclock={setOverclock}
              theaterMode={theaterMode}
              setTheaterMode={setTheaterMode}
              setGridOpacity={setGridOpacity}
              showConfig={showConfig}
              setShowConfig={setShowConfig}
              onOpenDetail={() => setView('detail')}
              onTriggerDemo={triggerDemo}
              onOpenSimulator={(p) => setActiveSimulatorProject(p)}
            />
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
            onReadMore={() => setView('narrative')}
          />
        )}

        {view === 'narrative' && (
          <ProjectNarrative 
            key="narrative-view"
            project={PORTFOLIO_PROJECTS[currentIndex]} 
            activeColor={activeColor} 
            onBack={() => setView('detail')} 
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
                              isVideoUrl("vhbkCEnNXcY")
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: isVideoUrl("vhbkCEnNXcY")
                                ? activeColor
                                : undefined,
                              color: isVideoUrl("vhbkCEnNXcY")
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
                              isVideoUrl("lYah5-xEeck")
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: isVideoUrl("lYah5-xEeck")
                                ? activeColor
                                : undefined,
                              color: isVideoUrl("lYah5-xEeck")
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
                              isVideoUrl("gemini.google.com/share/2a250c55c6a3") || isVideoUrl("TZGWNH-iaHk")
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: isVideoUrl("gemini.google.com/share/2a250c55c6a3") || isVideoUrl("TZGWNH-iaHk")
                                ? activeColor
                                : undefined,
                              color: isVideoUrl("gemini.google.com/share/2a250c55c6a3") || isVideoUrl("TZGWNH-iaHk")
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
                            onClick={() => setVideoUrl("background.mp4")}
                            className={`py-1.5 px-2 rounded border text-[9px] text-left transition-all duration-200 cursor-pointer uppercase flex justify-between items-center ${
                              videoUrl === "background.mp4"
                                ? "border-cyan-500 text-cyan-400 bg-cyan-950/20"
                                : "border-neutral-900 text-neutral-600 bg-black/30"
                            }`}
                            style={{
                              borderColor: videoUrl === "background.mp4" ? activeColor : undefined,
                              color: videoUrl === "background.mp4" ? activeColor : undefined,
                            }}
                          >
                            <span>background.mp4</span>
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
                        (log || "").includes("SUCCESS")
                          ? "text-emerald-400 font-bold"
                          : (log || "").includes("SYS")
                            ? "text-neutral-500"
                            : "text-neutral-300"
                      }
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Compiling loading bar if running */}
                {compilingStep < 9 && (
                  <div className="flex items-center gap-2 text-neutral-500 pt-2 border-t border-neutral-950 select-none">
                    <span>BUILD PROGRESS:</span>
                    <div className="flex-1 h-3 bg-neutral-950 rounded relative overflow-hidden border border-neutral-900">
                      <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${Math.min(100, (compilingStep / 8) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Simulated Live Action Sandbox Mock Dashboard after successful compile */}
              {compilingStep === 9 && (
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
                        PROJECT ROLE
                      </span>
                      <span className="text-emerald-400 block font-semibold">
                        {currentProject.specs.roles}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-500 block">
                        SYSTEM FOCUS
                      </span>
                      <span className="text-white block truncate">
                        {currentProject.specs.focus}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-500 block">
                        ENVIRONMENT STATUS
                      </span>
                      <span className="text-cyan-400 block animate-pulse font-semibold">
                        {currentProject.specs.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-neutral-500 block">
                        CORE STACK
                      </span>
                      <span className="text-white block truncate">
                        {currentProject.techStack.slice(0, 3).join(", ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Dismiss controls & GitHub action */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {(currentProject.liveUrl || currentProject.githubUrl) && (
                  <a
                    href={currentProject.liveUrl || currentProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-3 bg-white text-black hover:bg-neutral-200 font-mono text-[10px] font-bold tracking-[0.25em] uppercase border border-white transition-colors cursor-pointer rounded-lg text-center flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Globe className="w-3.5 h-3.5 text-cyan-600" />
                    <span>LAUNCH LIVE DEMO / REPO</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => {
                    setDemoActive(false);
                    setActiveSimulatorProject(currentProject);
                  }}
                  className="w-full sm:flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[10px] font-bold tracking-[0.25em] uppercase transition-colors cursor-pointer rounded-lg flex items-center justify-center gap-2 shadow-lg"
                >
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  <span>OPEN INTERACTIVE LIVE APP</span>
                </button>
                <button
                  onClick={() => {
                    setDemoActive(false);
                    setView("detail");
                  }}
                  className="w-full sm:flex-1 py-3 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold tracking-[0.25em] uppercase transition-colors cursor-pointer rounded-lg flex items-center justify-center gap-2"
                >
                  <span>VIEW DECK</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDemoActive(false)}
                  className="w-full sm:w-auto px-4 py-3 bg-neutral-900 hover:bg-red-500/20 hover:text-red-400 font-mono text-[10px] font-bold tracking-[0.25em] uppercase border border-neutral-800 transition-colors cursor-pointer rounded-lg"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: RESUME & ACADEMIC SECTIONS ================= */}
      <ResumeSections
        activeSection={activeResumeSection}
        onClose={() => setActiveResumeSection(null)}
        activeColor={activeColor}
      />

      {/* ================= MODAL: FULL INTERACTIVE LIVE APP SIMULATOR ================= */}
      <AnimatePresence>
        {activeSimulatorProject && (
          <LiveAppSimulator
            project={activeSimulatorProject}
            onClose={() => setActiveSimulatorProject(null)}
            activeColor={activeColor}
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
