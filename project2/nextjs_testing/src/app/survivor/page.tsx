"use client";

import { motion } from "framer-motion";

/* ─── film grain overlay ─── */
function FilmGrain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function Vignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
      }}
    />
  );
}

/* ─── data ─── */

const PROFILE = {
  name: "YANFD",
  handle: "@yanfd",
  status: "Active",
  location: "Shanghai, China",
  joined: "2019",
  bio: "Frontend developer. DJ. Photographer. Looking for something that doesn't exist yet.",
};

const STATS = [
  { label: "Projects Completed", value: 23, max: 50 },
  { label: "Lines Written", value: 84720, max: 100000, format: (v: number) => (v / 1000).toFixed(0) + "K" },
  { label: "Deployments Survived", value: 248, max: 500 },
  { label: "Bugs Eliminated", value: 1247, max: 2000, format: (v: number) => (v / 1000).toFixed(1) + "K" },
];

const SKILLS = [
  { name: "Frontend", level: 9, max: 10 },
  { name: "GLSL / Shaders", level: 6, max: 10 },
  { name: "Python", level: 8, max: 10 },
  { name: "Three.js", level: 5, max: 10 },
  { name: "Design", level: 6, max: 10 },
  { name: "Audio / DJ", level: 4, max: 10 },
  { name: "Photography", level: 5, max: 10 },
  { name: "Pentesting", level: 3, max: 10 },
];

const EQUIPMENT = [
  { name: "Samsung Galaxy S24", type: "Primary Device", condition: "Good" },
  { name: "Samsung Notebook", type: "Development", condition: "Fair" },
  { name: "VS Code", type: "IDE", condition: "Excellent" },
  { name: "Neovim", type: "Backup IDE", condition: "Pristine" },
  { name: "Figma", type: "Design", condition: "Good" },
  { name: "Cursor", type: "AI Assistant", condition: "Experimental" },
];

const TIMELINE_EVENTS = [
  { year: "2019", event: "First contact with code" },
  { year: "2020", event: "Survived the lockdown year. Built 14 projects." },
  { year: "2021", event: "Discovered frontend. Lost 3 months to CSS animations." },
  { year: "2022", event: "Created the STATS playground." },
  { year: "2023", event: "Relocated to Shanghai." },
  { year: "2024", event: "Found GLSL. Nothing was the same." },
  { year: "2025", event: "Still here. Still building." },
];

/* ─── components ─── */

function StatBar({ label, value, max, format }: { label: string; value: number; max: number; format?: (v: number) => string }) {
  const pct = (value / max) * 100;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs text-amber-200/60 uppercase tracking-[0.15em]">{label}</span>
        <span className="text-xs text-amber-200/80 font-mono tabular-nums">
          {format ? format(value) : value}
        </span>
      </div>
      <div className="h-[3px] bg-amber-200/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #92400e, #d97706, #f59e0b)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillDot({ level, max }: { level: number; max: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-[1px]"
          style={{
            backgroundColor: i < level ? "rgba(217, 119, 6, 0.7)" : "rgba(217, 119, 6, 0.1)",
            boxShadow: i < level ? "0 0 4px rgba(217, 119, 6, 0.2)" : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── page ─── */

export default function SurvivorPage() {
  return (
    <div className="min-h-screen text-amber-200 overflow-hidden relative"
      style={{
        background: `
          linear-gradient(180deg, #0a0f0a 0%, #0d1a0d 30%, #0a120a 60%, #060a06 100%)
        `,
      }}
    >
      <FilmGrain />
      <Vignette />

      {/* subtle scanlines */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-400/70 uppercase tracking-[0.3em] font-mono">
              {PROFILE.status}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-amber-100/90 mb-2"
            style={{ fontFamily: "'Neue Haas Display', Georgia, 'Times New Roman', serif" }}>
            SURVIVOR DOSSIER
          </h1>
          <p className="text-xs text-amber-200/30 font-mono tracking-[0.2em]">
            FILED UNDER: PERSONNEL RECORDS — CLASSIFIED
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* left column */}
          <div className="space-y-6">
            {/* identity card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-amber-200/10 rounded-sm p-5"
              style={{ background: "linear-gradient(135deg, rgba(146,64,14,0.08), rgba(0,0,0,0.3))" }}
            >
              <div className="flex items-start gap-4">
                {/* avatar placeholder */}
                <div className="w-20 h-20 rounded-sm flex-shrink-0 flex items-center justify-center text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #1a2e1a, #0d1a0d)",
                    border: "1px solid rgba(217,119,6,0.15)",
                  }}>
                  <span className="text-amber-200/40" style={{ fontFamily: "Georgia, serif" }}>Y</span>
                </div>
                <div>
                  <h2 className="text-xl font-light text-amber-100/80 mb-0.5">{PROFILE.name}</h2>
                  <p className="text-xs text-amber-200/40 font-mono mb-3">{PROFILE.handle}</p>
                  <p className="text-sm text-amber-200/50 leading-relaxed">{PROFILE.bio}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-200/5 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-amber-200/30 uppercase tracking-wider">Location</p>
                  <p className="text-sm text-amber-200/60">{PROFILE.location}</p>
                </div>
                <div>
                  <p className="text-[10px] text-amber-200/30 uppercase tracking-wider">Active Since</p>
                  <p className="text-sm text-amber-200/60">{PROFILE.joined}</p>
                </div>
              </div>
            </motion.div>

            {/* stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border border-amber-200/10 rounded-sm p-5"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-xs text-amber-200/30 uppercase tracking-[0.2em] mb-4 font-mono">
                ▸ VITAL STATISTICS
              </h3>
              {STATS.map((s, i) => (
                <StatBar
                  key={i}
                  label={s.label}
                  value={s.value}
                  max={s.max}
                  format={s.format}
                />
              ))}
            </motion.div>

            {/* equipment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="border border-amber-200/10 rounded-sm p-5"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-xs text-amber-200/30 uppercase tracking-[0.2em] mb-4 font-mono">
                ▸ EQUIPMENT
              </h3>
              <div className="space-y-2.5">
                {EQUIPMENT.map((e, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-amber-200/5 last:border-0">
                    <div>
                      <p className="text-sm text-amber-200/70">{e.name}</p>
                      <p className="text-[10px] text-amber-200/25 font-mono">{e.type}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-mono ${
                      e.condition === "Excellent" ? "text-emerald-400/60 bg-emerald-400/10" :
                      e.condition === "Good" ? "text-amber-400/60 bg-amber-400/10" :
                      e.condition === "Pristine" ? "text-blue-400/60 bg-blue-400/10" :
                      "text-amber-200/30 bg-amber-200/5"
                    }`}>
                      {e.condition}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* right column: skills + timeline */}
          <div className="space-y-6">
            {/* skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border border-amber-200/10 rounded-sm p-5"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-xs text-amber-200/30 uppercase tracking-[0.2em] mb-4 font-mono">
                ▸ SKILL ASSESSMENT
              </h3>
              <div className="space-y-3">
                {SKILLS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-amber-200/60 w-32">{s.name}</span>
                    <SkillDot level={s.level} max={s.max} />
                    <span className="text-xs text-amber-200/30 font-mono w-8 text-right">{s.level}/{s.max}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border border-amber-200/10 rounded-sm p-5"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-xs text-amber-200/30 uppercase tracking-[0.2em] mb-4 font-mono">
                ▸ FIELD JOURNAL
              </h3>
              <div className="space-y-0">
                {TIMELINE_EVENTS.map((e, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex gap-4 py-3 border-b border-amber-200/5 last:border-0"
                  >
                    <span className="text-xs text-amber-200/25 font-mono w-10 flex-shrink-0 pt-0.5">{e.year}</span>
                    <div className="flex-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-200/15 -ml-[23px] mr-[19px] mt-1.5 float-left" />
                      <p className="text-sm text-amber-200/50 leading-relaxed">{e.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* threat level */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="border border-amber-200/10 rounded-sm p-5"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-xs text-amber-200/30 uppercase tracking-[0.2em] mb-3 font-mono">
                ▸ CURRENT STATUS
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Mood", value: "Dissociation", color: "text-purple-400/60" },
                  { label: "Energy", value: "Low", color: "text-amber-400/60" },
                  { label: "Focus", value: "Fragmented", color: "text-red-400/60" },
                  { label: "Output", value: "High", color: "text-emerald-400/60" },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-[10px] text-amber-200/25 uppercase tracking-wider">{s.label}</p>
                    <p className={`text-sm font-mono ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 text-center"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-200/10 to-transparent mb-4" />
          <p className="text-[10px] text-amber-200/15 font-mono tracking-[0.2em]">
            FILE NO. 2025-0624 — STATUS: ACTIVE — CLEARANCE: PERSONAL
          </p>
        </motion.div>
      </div>
    </div>
  );
}
