import React, { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  Zap,
  Cpu,
  Sliders,
  Thermometer,
  CloudRain,
  Key,
  Plus,
  MessageSquare,
  ThumbsUp,
  Wallet,
  ExternalLink,
  Globe,
  Code2,
  RefreshCw,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Project } from "../types";

interface LiveAppSimulatorProps {
  project: Project;
  onClose: () => void;
  activeColor: string;
}

export default function LiveAppSimulator({
  project,
  onClose,
  activeColor,
}: LiveAppSimulatorProps) {
  const [activeTab, setActiveTab] = useState<"embedded" | "simulator">("simulator");
  const [iframeKey, setIframeKey] = useState(0);

  // ----------------------------------------------------
  // PR-01: FusionFlowAI Simulator States
  // ----------------------------------------------------
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(72);
  const [rainCondition, setRainCondition] = useState<"clear" | "moderate" | "heavy">("moderate");
  const [modelType, setModelType] = useState<"weather-fused" | "historic">("weather-fused");
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState({
    congestionIndex: 84,
    speedKm: 14.2,
    accuracyBoost: 18.6,
    status: "HIGH CONGESTION DETECTED AT SILK BOARD JUNCTION",
  });

  const handlePredictTraffic = () => {
    setIsPredicting(true);
    setTimeout(() => {
      let baseIndex = 65;
      if (rainCondition === "moderate") baseIndex += 15;
      if (rainCondition === "heavy") baseIndex += 25;
      if (temperature > 32) baseIndex += 5;

      const noise = Math.floor(Math.random() * 8) - 4;
      const finalIndex = Math.min(99, Math.max(20, baseIndex + noise));
      const speed = Math.max(5, Math.floor(60 - finalIndex * 0.55));
      const boost = modelType === "weather-fused" ? 17.8 + Math.random() * 3 : 0;

      setPredictionResult({
        congestionIndex: finalIndex,
        speedKm: speed,
        accuracyBoost: Math.round(boost * 10) / 10,
        status:
          finalIndex > 80
            ? "SEVERE BOTTLE-NECK - REROUTE RECOMMENDED"
            : finalIndex > 50
              ? "MODERATE FLOW WITH TRAFFIC QUEUES"
              : "SMOOTH VEHICULAR FLOW",
      });
      setIsPredicting(false);
    }, 450);
  };

  // ----------------------------------------------------
  // PR-02: Study AI Assistant Simulator States
  // ----------------------------------------------------
  const [captureActive, setCaptureActive] = useState(false);
  const [apiKeyPool, setApiKeyPool] = useState([
    { id: "GEMINI_KEY_01", load: "14%", status: "HEALTHY" },
    { id: "GEMINI_KEY_02", load: "42%", status: "HEALTHY" },
    { id: "GEMINI_KEY_03", load: "05%", status: "STANDBY" },
  ]);
  const [ocrResultText, setOcrResultText] = useState(
    "Click 'Trigger Screen Capture' to run silent OCR and Gemini AI code explanation."
  );

  const triggerStudyCapture = () => {
    setCaptureActive(true);
    setOcrResultText(
      "Capturing 1280px region... Applying JPEG compression (reduced payload to 64KB)..."
    );
    setTimeout(() => {
      setOcrResultText(
        `[OCR DETECTED CODE]\nfunction calculateXGBoostBaseline(data: Matrix) {\n  return data.map(row => row.weight * 0.92);\n}\n\n[GEMINI AI EXPLANATION]:\nThis snippet calculates a weighted feature matrix for baseline traffic prediction. Payload passed Vercel 4.5MB limit checks cleanly.`
      );
      setCaptureActive(false);
      setApiKeyPool((prev) =>
        prev.map((k, idx) =>
          idx === 0
            ? { ...k, load: `${Math.floor(Math.random() * 30 + 20)}%` }
            : k
        )
      );
    }, 700);
  };

  // ----------------------------------------------------
  // PR-03: Hospital Management System States
  // ----------------------------------------------------
  const [patients, setPatients] = useState([
    { id: "PAT-8021", name: "Rahul Verma", dept: "Cardiology", status: "Admitted", doc: "Dr. A. Sharma" },
    { id: "PAT-8022", name: "Ananya Rao", dept: "Neurology", status: "Outpatient", doc: "Dr. K. Patel" },
    { id: "PAT-8023", name: "Vikram Seth", dept: "Orthopedics", status: "In Treatment", doc: "Dr. S. Kumar" },
  ]);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientDept, setNewPatientDept] = useState("General Medicine");

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;
    const newId = `PAT-${Math.floor(8000 + Math.random() * 1000)}`;
    setPatients([
      { id: newId, name: newPatientName, dept: newPatientDept, status: "Admitted", doc: "Dr. Sandeep Kumar" },
      ...patients,
    ]);
    setNewPatientName("");
  };

  // ----------------------------------------------------
  // PR-04: Unisphere Forum States
  // ----------------------------------------------------
  const [threads, setThreads] = useState([
    { id: 1, author: "Priya S.", title: "Best resources for XGBoost & Traffic ML models?", votes: 24, replies: 6, tag: "Machine Learning" },
    { id: 2, author: "Arjun M.", title: "VIT CSE 2026 Hackathon Team Formation", votes: 19, replies: 12, tag: "Campus Events" },
    { id: 3, author: "Sandeep K.", title: "FastAPI + Motor Async MongoDB Integration Notes", votes: 41, replies: 15, tag: "Web Dev" },
  ]);
  const [newPostTitle, setNewPostTitle] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;
    setThreads([
      { id: Date.now(), author: "You (Recruiter / Visitor)", title: newPostTitle, votes: 1, replies: 0, tag: "General Discussion" },
      ...threads,
    ]);
    setNewPostTitle("");
  };

  // ----------------------------------------------------
  // PR-05: Crypto Transaction Manager States
  // ----------------------------------------------------
  const [walletBalance, setWalletBalance] = useState(4.8521);
  const [cryptoTxHistory, setCryptoTxHistory] = useState([
    { txHash: "0x8f2a...91b4", amount: 0.25, coin: "ETH", status: "VALIDATED (SHA-256)", time: "2 mins ago" },
    { txHash: "0x3c1d...4e0a", amount: 0.05, coin: "BTC", status: "VALIDATED (C# ASP)", time: "14 mins ago" },
  ]);
  const [sendAmount, setSendAmount] = useState("0.1");

  const handleSendCrypto = () => {
    const val = parseFloat(sendAmount);
    if (isNaN(val) || val <= 0 || val > walletBalance) return;

    setWalletBalance((prev) => Math.max(0, Math.round((prev - val) * 10000) / 10000));
    const randomHash = `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`;
    setCryptoTxHistory([
      { txHash: randomHash, amount: val, coin: "ETH", status: "VALIDATED (SHA-256 C#)", time: "Just now" },
      ...cryptoTxHistory,
    ]);
    setSendAmount("0.1");
  };

  const projectTargetUrl = project.liveUrl || project.githubUrl || "https://github.com/sandeep2421-hub";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
    >
      <div
        className="w-full max-w-6xl bg-neutral-950 border rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]"
        style={{ borderColor: `${activeColor}40`, boxShadow: `0 0 50px ${activeColor}15` }}
      >
        {/* TOP BAR / BROWSER FRAME HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 bg-black border-b border-neutral-900 gap-3 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {project.title.toUpperCase()} // LIVE REPOSITORY & APP
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800 font-mono text-xs">
            <button
              onClick={() => setActiveTab("embedded")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                activeTab === "embedded"
                  ? "bg-white text-black shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>LIVE GITHUB EMBED</span>
            </button>

            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                activeTab === "simulator"
                  ? "bg-emerald-500 text-black shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>INTERACTIVE SIMULATOR</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={projectTargetUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase transition-colors shadow-md"
            >
              <span>OPEN REPO IN NEW TAB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ADDRESS BAR FOR EMBEDDED MODE */}
        {activeTab === "embedded" && (
          <div className="px-4 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setIframeKey((prev) => prev + 1)}
              className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Reload Frame"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <div className="flex-1 bg-black border border-neutral-800 rounded px-3 py-1 text-emerald-400 flex items-center gap-2 text-[11px] truncate">
              <span className="text-neutral-600">HTTPS://</span>
              <span>{projectTargetUrl.replace("https://", "")}</span>
            </div>
            <span className="text-[10px] text-neutral-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
              SSL SECURED
            </span>
          </div>
        )}

        {/* BODY CONTENT */}
        <div className="flex-1 overflow-hidden relative bg-black">
          {/* TAB 1: OFFICIAL REPOSITORY CODE HUB CARD */}
          {activeTab === "embedded" && (
            <div className="w-full h-full p-6 sm:p-10 overflow-y-auto font-sans flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                  <div>
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest block">
                      OFFICIAL SOURCE REPOSITORY
                    </span>
                    <h2 className="text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
                      {project.title}
                    </h2>
                    <p className="text-sm font-sans text-neutral-300 mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                  <a
                    href={projectTargetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <span>OPEN GITHUB REPOSITORY SITE</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Bullets & Meta */}
                <div className="space-y-4 font-mono text-xs bg-neutral-950 p-6 rounded-xl border border-neutral-900">
                  <span className="text-neutral-500 uppercase tracking-widest block text-[10px]">
                    TECHNICAL IMPLEMENTATION SUMMARY
                  </span>
                  <ul className="space-y-3 font-sans text-sm text-neutral-300">
                    {project.fullDescription?.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
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
                <div className="space-y-2 font-mono">
                  <span className="text-neutral-500 uppercase tracking-widest block text-[10px]">
                    REGISTERED TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded text-xs bg-neutral-900 border border-neutral-800 text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-black/90 p-4 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="text-white font-bold block">
                      REPOS: github.com/sandeep2421-hub/{project.title}
                    </span>
                    <span className="text-neutral-500 text-[10px]">
                      Security Note: GitHub blocks frame embedding; click the button above to view full source code.
                    </span>
                  </div>
                </div>

                <a
                  href={projectTargetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 bg-white text-black font-bold uppercase rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <span>VIEW FULL CODEBASE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SIMULATOR */}
          {activeTab === "simulator" && (
            <div className="p-4 sm:p-8 overflow-y-auto h-full font-sans text-white">
              {project.id.includes("PR-01") && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                        Silk Board Junction Traffic Predictor Dashboard
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        Real-time data fusion model comparing XGBoost historic baseline against weather telemetry.
                      </p>
                    </div>
                    <button
                      onClick={handlePredictTraffic}
                      disabled={isPredicting}
                      className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
                    >
                      <Zap className="w-4 h-4 fill-black" />
                      <span>{isPredicting ? "RUNNING INFERENCE..." : "RUN ML TRAFFIC PREDICTION"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5 bg-neutral-900/40 p-5 rounded-xl border border-neutral-900 space-y-5">
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase border-b border-neutral-900 pb-2">
                        <Sliders className="w-4 h-4" />
                        <span>SIMULATE LIVE WEATHER TELEMETRY</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-400 flex items-center gap-1">
                            <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Temperature:
                          </span>
                          <span className="text-white font-bold">{temperature}°C</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="42"
                          value={temperature}
                          onChange={(e) => setTemperature(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-neutral-400 flex items-center gap-1">
                            <CloudRain className="w-3.5 h-3.5 text-blue-400" /> Humidity:
                          </span>
                          <span className="text-white font-bold">{humidity}%</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="98"
                          value={humidity}
                          onChange={(e) => setHumidity(Number(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono text-neutral-400 block">Rainfall Condition:</label>
                        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                          {(["clear", "moderate", "heavy"] as const).map((cond) => (
                            <button
                              key={cond}
                              onClick={() => setRainCondition(cond)}
                              className={`py-2 rounded border uppercase text-[10px] font-bold transition-all cursor-pointer ${
                                rainCondition === cond
                                  ? "border-cyan-400 text-cyan-300 bg-cyan-950/40"
                                  : "border-neutral-800 text-neutral-500 bg-black/40"
                              }`}
                            >
                              {cond}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-neutral-900">
                        <label className="text-xs font-mono text-neutral-400 block">Architecture Model:</label>
                        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                          <button
                            onClick={() => setModelType("weather-fused")}
                            className={`py-2 px-3 rounded border text-[10px] font-bold text-left transition-all cursor-pointer ${
                              modelType === "weather-fused"
                                ? "border-emerald-400 text-emerald-400 bg-emerald-950/30"
                                : "border-neutral-800 text-neutral-500 bg-black/40"
                            }`}
                          >
                            ● Weather-Fused (+18% Accuracy)
                          </button>
                          <button
                            onClick={() => setModelType("historic")}
                            className={`py-2 px-3 rounded border text-[10px] font-bold text-left transition-all cursor-pointer ${
                              modelType === "historic"
                                ? "border-amber-400 text-amber-400 bg-amber-950/30"
                                : "border-neutral-800 text-neutral-500 bg-black/40"
                            }`}
                          >
                            ○ Static Historic Model
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">
                            CONGESTION INDEX
                          </span>
                          <span className="text-3xl font-black text-white font-mono mt-1 block">
                            {predictionResult.congestionIndex} / 100
                          </span>
                        </div>

                        <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">
                            ESTIMATED SPEED
                          </span>
                          <span className="text-3xl font-black text-cyan-400 font-mono mt-1 block">
                            {predictionResult.speedKm} km/h
                          </span>
                        </div>

                        <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">
                            ACCURACY BOOST
                          </span>
                          <span className="text-3xl font-black text-emerald-400 font-mono mt-1 block">
                            +{predictionResult.accuracyBoost}%
                          </span>
                        </div>
                      </div>

                      <div className="bg-black/80 p-5 rounded-xl border border-neutral-800 font-mono space-y-3">
                        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-900 pb-2">
                          <span>INFERENCE STATUS</span>
                          <span className="text-emerald-400">XGBoost REGRESSOR READY</span>
                        </div>
                        <p className="text-sm font-semibold text-cyan-300">
                          {predictionResult.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.id.includes("PR-02") && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                        Study AI Desktop Screen & OCR Assistant
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        Electron & Node.js desktop assistant with Vercel serverless load balancing & Gemini AI.
                      </p>
                    </div>
                    <button
                      onClick={triggerStudyCapture}
                      disabled={captureActive}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      <Cpu className="w-4 h-4" />
                      <span>{captureActive ? "CAPTURING FRAME..." : "TRIGGER SCREEN CAPTURE & AI"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 bg-black p-4 rounded-xl border border-neutral-800 font-mono space-y-4 relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-xs">
                        <span className="text-emerald-400 font-bold">● VIRTUAL DESKTOP CAPTURE HUD</span>
                        <span className="text-neutral-500">PAYLOAD COMPRESSION: 95.2%</span>
                      </div>

                      <div className="min-h-[160px] bg-neutral-950 p-4 rounded border border-neutral-900 text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
                        {ocrResultText}
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-neutral-900/40 p-5 rounded-xl border border-neutral-900 space-y-4 font-mono">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase border-b border-neutral-900 pb-2">
                        <Key className="w-4 h-4" />
                        <span>GEMINI API KEY LOAD BALANCER</span>
                      </div>

                      <div className="space-y-2">
                        {apiKeyPool.map((key, i) => (
                          <div key={i} className="flex items-center justify-between bg-black/60 p-3 rounded border border-neutral-900 text-xs">
                            <div>
                              <span className="text-white font-bold block">{key.id}</span>
                              <span className="text-[10px] text-neutral-500">Load: {key.load}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              {key.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.id.includes("PR-03") && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                        Hospital Patient & Appointment Portal
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        React + FastAPI Async MongoDB Motor CRUD operations with JWT authentication.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-xs font-bold rounded">
                      JWT AUTH: ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
                    <form onSubmit={handleAddPatient} className="lg:col-span-5 bg-neutral-900/40 p-5 rounded-xl border border-neutral-900 space-y-4">
                      <div className="text-xs font-bold text-amber-400 uppercase border-b border-neutral-900 pb-2 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>ASYNC PATIENT ADMISSION FORM</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-neutral-400 block">Patient Name:</label>
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Kumar"
                          value={newPatientName}
                          onChange={(e) => setNewPatientName(e.target.value)}
                          className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-neutral-400 block">Department:</label>
                        <select
                          value={newPatientDept}
                          onChange={(e) => setNewPatientDept(e.target.value)}
                          className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:border-amber-400 outline-none"
                        >
                          <option>Cardiology</option>
                          <option>Neurology</option>
                          <option>Orthopedics</option>
                          <option>General Medicine</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase text-xs rounded transition-colors cursor-pointer"
                      >
                        + ADMIT PATIENT (ASYNC MOTOR CRUD)
                      </button>
                    </form>

                    <div className="lg:col-span-7 bg-black p-5 rounded-xl border border-neutral-800 space-y-4">
                      <div className="flex justify-between items-center text-xs border-b border-neutral-900 pb-2">
                        <span className="text-white font-bold">PATIENT REGISTRY RECORD</span>
                        <span className="text-neutral-500">DATABASE: MongoDB Motor</span>
                      </div>

                      <div className="space-y-2 max-h-[220px] overflow-y-auto">
                        {patients.map((p) => (
                          <div key={p.id} className="flex items-center justify-between bg-neutral-950 p-3 rounded border border-neutral-900 text-xs">
                            <div>
                              <span className="text-white font-bold block">{p.name} ({p.id})</span>
                              <span className="text-neutral-500 text-[10px]">{p.dept} • {p.doc}</span>
                            </div>
                            <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              {p.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.id.includes("PR-04") && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                        Unisphere Campus Discussion Forum
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        Real-time student portal for doubt clarification & academic event collaboration.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono text-xs font-bold rounded">
                      FORUM ONLINE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
                    <form onSubmit={handleCreatePost} className="lg:col-span-5 bg-neutral-900/40 p-5 rounded-xl border border-neutral-900 space-y-4">
                      <div className="text-xs font-bold text-rose-400 uppercase border-b border-neutral-900 pb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>POST ACADEMIC DOUBT / QUESTION</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-neutral-400 block">Question Title / Topic:</label>
                        <input
                          type="text"
                          placeholder="e.g. How to optimize React render hooks?"
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:border-rose-400 outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-bold uppercase text-xs rounded transition-colors cursor-pointer"
                      >
                        PUBLISH DISCUSSION THREAD
                      </button>
                    </form>

                    <div className="lg:col-span-7 bg-black p-5 rounded-xl border border-neutral-800 space-y-3">
                      <span className="text-xs font-bold text-white block border-b border-neutral-900 pb-2">
                        RECENT DISCUSSIONS & DOUBT THREADS
                      </span>
                      <div className="space-y-3 max-h-[240px] overflow-y-auto">
                        {threads.map((t) => (
                          <div key={t.id} className="bg-neutral-950 p-3 rounded border border-neutral-900 space-y-1 text-xs">
                            <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                              <span>{t.author}</span>
                              <span className="text-rose-400">{t.tag}</span>
                            </div>
                            <h4 className="text-white font-semibold">{t.title}</h4>
                            <div className="flex items-center gap-4 text-[10px] text-neutral-500 pt-1">
                              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-cyan-400" /> {t.votes} Upvotes</span>
                              <span>• {t.replies} Replies</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.id.includes("PR-05") && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                    <div>
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                        Cryptocurrency Transaction Manager Simulator
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">
                        C# ASP backend transaction processor with SHA-256 cryptographic hash validation.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono text-xs font-bold rounded">
                      SHA-256 SECURED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
                    <div className="lg:col-span-5 bg-neutral-900/40 p-5 rounded-xl border border-neutral-900 space-y-4">
                      <div className="flex justify-between items-center border-b border-neutral-900 pb-2 text-xs">
                        <span className="text-purple-400 font-bold uppercase flex items-center gap-2">
                          <Wallet className="w-4 h-4" /> WALLET BALANCE
                        </span>
                        <span className="text-white font-bold">{walletBalance} ETH</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-neutral-400 block">Amount to Transfer (ETH):</label>
                        <input
                          type="number"
                          step="0.05"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(e.target.value)}
                          className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:border-purple-400 outline-none"
                        />
                      </div>

                      <button
                        onClick={handleSendCrypto}
                        className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase text-xs rounded transition-colors cursor-pointer"
                      >
                        SEND TRANSACTION & COMPUTE HASH
                      </button>
                    </div>

                    <div className="lg:col-span-7 bg-black p-5 rounded-xl border border-neutral-800 space-y-3">
                      <span className="text-xs font-bold text-white block border-b border-neutral-900 pb-2">
                        VALIDATED TRANSACTION LEDGER
                      </span>
                      <div className="space-y-2 max-h-[220px] overflow-y-auto text-xs">
                        {cryptoTxHistory.map((tx, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-neutral-950 p-3 rounded border border-neutral-900">
                            <div>
                              <span className="text-white font-bold block">{tx.amount} {tx.coin}</span>
                              <span className="text-[10px] text-neutral-500 font-mono">Hash: {tx.txHash}</span>
                            </div>
                            <div className="text-right">
                              <span className="px-2 py-0.5 rounded text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/30 block">
                                {tx.status}
                              </span>
                              <span className="text-[9px] text-neutral-600 block mt-1">{tx.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM ACTION DOCK */}
        <div className="p-3 bg-black border-t border-neutral-900 flex justify-between items-center font-mono text-xs">
          <span className="text-neutral-500 text-[10px]">
            REAL PROJECT CODE REPOSITORY & LIVE ARCHITECTURE FOR SANDEEP KUMAR
          </span>
          <a
            href={projectTargetUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-[11px] rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>LAUNCH OFFICIAL GITHUB PAGE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
