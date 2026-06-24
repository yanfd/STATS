"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

/* seeded random for deterministic heatmap */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const DAYS = ["Mon", "", "Wed", "", "Fri", "", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getIntensity(rand: () => number, dayOfWeek: number): number {
  const base = rand();
  // make weekdays heavier
  const weight = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.2 : 0.6;
  const v = base * weight;
  if (v > 0.85) return 4;
  if (v > 0.65) return 3;
  if (v > 0.4) return 2;
  if (v > 0.2) return 1;
  return 0;
}

const COLORS = [
  "rgba(255,255,255,0.03)",
  "rgba(100,255,120,0.2)",
  "rgba(100,255,120,0.4)",
  "rgba(100,255,120,0.65)",
  "rgba(100,255,120,0.9)",
];

export default function HeatmapPage() {
  const grid = useMemo(() => {
    const rand = seededRandom(42);
    const weeks: number[][] = [];
    for (let w = 0; w < 52; w++) {
      const days: number[] = [];
      for (let d = 0; d < 7; d++) {
        days.push(getIntensity(rand, d));
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const stats = [
    { label: "contributions", value: "3,847" },
    { label: "longest streak", value: "42 days" },
    { label: "active days", value: "289" },
    { label: "repos", value: "23" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      {/* title */}
      <div className="mb-12 text-center">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          github contributions
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight"
          style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
          3,847
        </h1>
        <p className="text-white/30 text-sm mt-2">contributions in the last year</p>
      </div>

      {/* heatmap grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="overflow-x-auto max-w-full"
      >
        <div className="inline-block">
          {/* month labels */}
          <div className="flex gap-[3px] ml-6 mb-1">
            {MONTHS.map((m, i) => (
              <span key={i} className="text-[9px] text-white/15 w-[52px] text-center"
                style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                {m}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* day labels */}
            <div className="flex flex-col gap-[3px] mr-1">
              {DAYS.map((d, i) => (
                <span key={i} className="text-[9px] text-white/15 h-[10px] leading-[10px] text-right w-4"
                  style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                  {d}
                </span>
              ))}
            </div>

            {/* cells */}
            <div className="flex gap-[3px]">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((intensity, di) => (
                    <motion.div
                      key={`${wi}-${di}`}
                      className="w-[10px] h-[10px] rounded-[2px]"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: wi * 0.01 + di * 0.005,
                        duration: 0.3,
                      }}
                      style={{
                        backgroundColor: COLORS[intensity],
                        boxShadow: intensity >= 3 ? `0 0 ${intensity * 3}px rgba(100,255,120,${intensity * 0.15})` : "none",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* legend */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-[9px] text-white/15"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>less</span>
        {COLORS.map((c, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
        ))}
        <span className="text-[9px] text-white/15"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>more</span>
      </div>

      {/* stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-light"
              style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
              {s.value}
            </p>
            <p className="text-[10px] text-white/20 tracking-[0.15em] uppercase mt-1"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* languages */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {[
          { name: "TypeScript", pct: 45, color: "#3178c6" },
          { name: "Python", pct: 28, color: "#f7d060" },
          { name: "GLSL", pct: 12, color: "#a855f7" },
          { name: "Rust", pct: 8, color: "#ff6b35" },
          { name: "Other", pct: 7, color: "#666" },
        ].map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-xs text-white/50">{l.name}</span>
            <span className="text-xs text-white/20"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>{l.pct}%</span>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace" }}>
        heatmap
      </div>
    </div>
  );
}
