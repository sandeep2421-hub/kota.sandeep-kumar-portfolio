import { motion, AnimatePresence } from "motion/react";
import {
  X,
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
  FileText,
} from "lucide-react";
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  TECHNICAL_SKILLS,
  RESEARCH_PUBLICATIONS,
  CERTIFICATIONS_DATA,
} from "../data";

interface ResumeSectionsProps {
  activeSection: "education" | "research" | "skills" | "contact" | null;
  onClose: () => void;
  activeColor: string;
}

export default function ResumeSections({
  activeSection,
  onClose,
  activeColor,
}: ResumeSectionsProps) {
  if (!activeSection) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-10 relative shadow-2xl my-auto text-white overflow-hidden max-h-[90vh] flex flex-col"
          style={{
            boxShadow: `0 25px 60px -15px ${activeColor}30`,
          }}
        >
          {/* Top Close Button & Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-900 select-none">
            <div className="flex items-center gap-3">
              {activeSection === "education" && (
                <GraduationCap className="w-6 h-6" style={{ color: activeColor }} />
              )}
              {activeSection === "research" && (
                <BookOpen className="w-6 h-6" style={{ color: activeColor }} />
              )}
              {activeSection === "skills" && (
                <Code2 className="w-6 h-6" style={{ color: activeColor }} />
              )}
              {activeSection === "contact" && (
                <FileText className="w-6 h-6" style={{ color: activeColor }} />
              )}
              <div>
                <h2 className="font-mono text-sm tracking-[0.25em] font-bold uppercase text-white">
                  {activeSection === "education" && "ACADEMIC EDUCATION"}
                  {activeSection === "research" && "RESEARCH & PUBLICATIONS"}
                  {activeSection === "skills" && "TECHNICAL SKILLS MATRIX"}
                  {activeSection === "contact" && "KOTA SANDEEP KUMAR // PROFILE"}
                </h2>
                <p className="text-xs text-neutral-500 font-mono">
                  {PERSONAL_INFO.name} • {PERSONAL_INFO.college}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors cursor-pointer bg-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Body */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
            {/* EDUCATION SECTION */}
            {activeSection === "education" && (
              <div className="space-y-6">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-neutral-900 bg-neutral-900/40 relative space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white font-sans">
                          {edu.institution}
                        </h3>
                        <p className="text-sm font-mono text-cyan-400 font-medium">
                          {edu.degree}
                        </p>
                      </div>
                      <div className="text-right sm:text-right font-mono text-xs">
                        <span className="inline-block px-3 py-1 rounded bg-neutral-800 text-neutral-300 font-bold border border-neutral-700">
                          {edu.score}
                        </span>
                        <p className="text-[10px] text-neutral-500 mt-1">
                          {edu.timeline}
                        </p>
                      </div>
                    </div>

                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {edu.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-neutral-400 flex items-start gap-2 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* RESEARCH & PUBLICATIONS SECTION */}
            {activeSection === "research" && (
              <div className="space-y-6">
                {RESEARCH_PUBLICATIONS.map((pub, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-cyan-500/30 bg-cyan-950/10 space-y-4 relative"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                        {pub.paperId}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {pub.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-sans text-white">
                      "{pub.title}"
                    </h3>

                    <p className="text-xs font-mono text-neutral-400">
                      <span className="text-neutral-300 font-bold">{pub.authorship}</span> | {pub.venue}
                    </p>

                    <div className="p-3 rounded bg-black/60 border border-neutral-900 font-mono text-xs text-neutral-400 space-y-1">
                      <p className="text-neutral-300 font-semibold">Co-Authors & Faculty Advisors:</p>
                      {pub.coAuthors.map((ca, i) => (
                        <p key={i} className="text-neutral-400 pl-2">
                          • {ca}
                        </p>
                      ))}
                    </div>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
                        KEY CONTRIBUTION & RESULTS:
                      </h4>
                      <ul className="space-y-2">
                        {pub.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-neutral-300 flex items-start gap-2 font-sans">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* CERTIFICATIONS MATRIX IN RESEARCH SECTION AS WELL */}
                <div className="pt-6 border-t border-neutral-900 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-neutral-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>PROFESSIONAL CERTIFICATIONS</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CERTIFICATIONS_DATA.map((cert, idx) => (
                      <a
                        key={idx}
                        href={cert.link || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="group p-4 rounded-lg border border-neutral-900 bg-neutral-900/50 hover:border-cyan-500/40 hover:bg-neutral-900 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                            {cert.name}
                          </p>
                          <p className="text-[10px] font-mono text-neutral-400">
                            Issuer: {cert.issuer} • <span className="text-emerald-400">VERIFIED</span>
                          </p>
                        </div>
                        <ExternalLink
                          className="w-4 h-4 flex-shrink-0 ml-2 text-neutral-500 group-hover:text-cyan-400 transition-colors"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TECHNICAL SKILLS SECTION */}
            {activeSection === "skills" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TECHNICAL_SKILLS.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-neutral-900 bg-neutral-900/40 space-y-3"
                    >
                      <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-cyan-400 border-b border-neutral-800 pb-2">
                        {cat.category}
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 rounded text-xs font-mono bg-neutral-950 border border-neutral-800 text-neutral-200 hover:border-cyan-500/50 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT & FULL RESUME PROFILE */}
            {activeSection === "contact" && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white">
                        {PERSONAL_INFO.name}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400 mt-1">
                        {PERSONAL_INFO.role} • {PERSONAL_INFO.college}
                      </p>
                      <p className="text-xs font-mono text-neutral-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {PERSONAL_INFO.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {PERSONAL_INFO.objective}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="p-3 rounded-lg border border-neutral-800 hover:border-cyan-500 bg-black flex items-center gap-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span className="truncate">{PERSONAL_INFO.email}</span>
                    </a>

                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="p-3 rounded-lg border border-neutral-800 hover:border-cyan-500 bg-black flex items-center gap-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>+{PERSONAL_INFO.phone}</span>
                    </a>

                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-lg border border-neutral-800 hover:border-cyan-500 bg-black flex items-center gap-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span className="truncate">LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-neutral-500" />
                    </a>

                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-lg border border-neutral-800 hover:border-cyan-500 bg-black flex items-center gap-3 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    >
                      <Github className="w-4 h-4 text-purple-400" />
                      <span className="truncate">GitHub Profile</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-neutral-500" />
                    </a>
                  </div>
                </div>

                {/* Quick Summary Dock */}
                <div className="grid grid-cols-3 gap-3 font-mono text-center text-xs">
                  <div className="p-3 rounded-lg border border-neutral-900 bg-neutral-950">
                    <p className="text-[10px] text-neutral-500">DEGREE</p>
                    <p className="font-bold text-white mt-1">B.Tech CSE</p>
                    <p className="text-[9px] text-neutral-400">VIT Vellore '27</p>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-900 bg-neutral-950">
                    <p className="text-[10px] text-neutral-500">CGPA</p>
                    <p className="font-bold text-cyan-400 mt-1">7.71 / 10</p>
                    <p className="text-[9px] text-neutral-400">Computer Science</p>
                  </div>
                  <div className="p-3 rounded-lg border border-neutral-900 bg-neutral-950">
                    <p className="text-[10px] text-neutral-500">RESEARCH</p>
                    <p className="font-bold text-emerald-400 mt-1">IEEE INDICON '26</p>
                    <p className="text-[9px] text-neutral-400">Paper ID: 2468</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
