"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── grain ─── */
function FilmGrain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ─── codex data ─── */

type Entry = {
  id: string;
  name: string;
  category: string;
  rarity: string;
  desc: string;
  flavor: string;
  stats?: Record<string, string>;
};

const CODEX: Entry[] = [
  {
    id: "item-001",
    name: "STATS Playground",
    category: "TOOL",
    rarity: "Legendary",
    desc: "A mutable workspace for frontend experiments. Contains 30+ pages, each a different expression of the same restless mind. Runs on Next.js 15, FastAPI, and caffeine.",
    flavor: "Every dead project taught something the live ones couldn't.",
    stats: { pages: "30+", uptime: "99.7%", deploys: "248", created: "2022" },
  },
  {
    id: "item-002",
    name: "Shader Engine",
    category: "WEAPON",
    rarity: "Rare",
    desc: "Custom GLSL fragment shaders rendered via WebGL2. Generates procedural aurora, clouds, and abstract visual fields. Each shader is hand-written, never AI-generated.",
    flavor: "Writing shaders is painting with math. Understanding would ruin it.",
    stats: { shaders: "12", fps: "60", complexity: "Medium", language: "GLSL" },
  },
  {
    id: "item-003",
    name: "Hughes Archive",
    category: "ARTIFACT",
    rarity: "Uncommon",
    desc: "A curated collection of text entries synced from GitHub repositories. Rendered with monochrome rain effects and markdown parsing. A digital museum of fragments.",
    flavor: "Send your dreams where nobody hides.",
    stats: { entries: "847", synced: "GitHub", format: "Markdown", period: "2020-2025" },
  },
  {
    id: "item-004",
    name: "DJ Backdrop",
    category: "TOOL",
    rarity: "Rare",
    desc: "Real-time audio visualizer with genre-adaptive themes. Uses Web Audio API for frequency analysis and Canvas2D for rendering. Supports jazz, hip-hop, electronic, and ambient modes.",
    flavor: "The music doesn't start until you stop thinking about it.",
    stats: { genres: "6", input: "Microphone", render: "Canvas2D", latency: "<16ms" },
  },
  {
    id: "item-005",
    name: "Gallery",
    category: "ARTIFACT",
    rarity: "Epic",
    desc: "Photography portfolio hosted on gallery.yanfd.cn. Dark aesthetic, masonry layout, full-screen lightbox. Each photograph is a frozen moment from Shanghai's midnight streets.",
    flavor: "Every photograph is a letter to someone who doesn't exist.",
    stats: { photos: "200+", domain: "gallery.yanfd.cn", style: "Masonry", theme: "Dark" },
  },
  {
    id: "item-006",
    name: "Python Backend",
    category: "INFRASTRUCTURE",
    rarity: "Common",
    desc: "FastAPI server handling audio processing, waveform generation, data sync, comments, and pricing calculations. Runs on Uvicorn with periodic background tasks.",
    flavor: "The server doesn't care about your feelings. It just responds.",
    stats: { routes: "6", runtime: "Python 3.13", framework: "FastAPI", port: "8000" },
  },
];

const CATEGORIES = ["ALL", "TOOL", "WEAPON", "ARTIFACT", "INFRASTRUCTURE"];

const RARITY_COLORS: Record<string, string> = {
  Common: "text-gray-400/60 border-gray-400/20",
  Uncommon: "text-green-400/60 border-green-400/20",
  Rare: "text-blue-400/60 border-blue-400/20",
  Epic: "text-purple-400/60 border-purple-400/20",
  Legendary: "text-amber-400/60 border-amber-400/20",
};

const RARITY_GLOW: Record<string, string> = {
  Common: "",
  Uncommon: "",
  Rare: "0 0 20px rgba(59,130,246,0.06)",
  Epic: "0 0 20px rgba(168,85,247,0.08)",
  Legendary: "0 0 30px rgba(217,119,6,0.1)",
};

/* ─── page ─── */

export default function CodexPage() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? CODEX : CODEX.filter((e) => e.category === filter);

  return (
    <div className="min-h-screen text-amber-200 overflow-hidden relative"
      style={{ background: "linear-gradient(180deg, #080c08 0%, #0a100a 50%, #060806 100%)" }}
    >
      <FilmGrain />
      <div className="fixed inset-0 pointer-events-none z-40"
        style={{ background: "radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(0,0,0,0.6) 100%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <p className="text-[10px] text-amber-200/20 font-mono tracking-[0.3em] uppercase mb-2">
            ◈ COMPANION CODEX
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-amber-100/80"
            style={{ fontFamily: "Georgia, serif" }}>
            Inventory
          </h1>
          <p className="text-sm text-amber-200/30 mt-2 max-w-lg">
            Items collected along the way. Each one a tool, a weapon, or a piece of something larger.
          </p>
        </motion.div>

        {/* category filter */}
        <div className="flex items-center gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors ${
                filter === c
                  ? "border-amber-200/20 bg-amber-200/5 text-amber-200/70"
                  : "border-amber-200/5 text-amber-200/20 hover:text-amber-200/40 hover:border-amber-200/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* codex grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((entry, i) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setActive(active === entry.id ? null : entry.id)}
                className="border border-amber-200/8 rounded-sm p-5 cursor-pointer transition-all hover:border-amber-200/15"
                style={{
                  background: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(146,64,14,0.03))",
                  boxShadow: RARITY_GLOW[entry.rarity] || "none",
                }}
              >
                {/* item header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] text-amber-200/20 font-mono">{entry.id}</span>
                    <h3 className="text-base text-amber-100/80 mt-0.5"
                      style={{ fontFamily: "Georgia, serif" }}>
                      {entry.name}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-amber-200/20 font-mono">{entry.category}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm border font-mono ${RARITY_COLORS[entry.rarity]}`}>
                      {entry.rarity}
                    </span>
                  </div>
                </div>

                {/* description */}
                <p className="text-sm text-amber-200/40 leading-relaxed mb-3">
                  {entry.desc}
                </p>

                {/* expanded stats */}
                <AnimatePresence>
                  {active === entry.id && entry.stats && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-amber-200/5 grid grid-cols-2 gap-2 mb-3">
                        {Object.entries(entry.stats).map(([k, v]) => (
                          <div key={k}>
                            <p className="text-[10px] text-amber-200/20 font-mono uppercase">{k}</p>
                            <p className="text-xs text-amber-200/50">{v}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* flavor text */}
                <p className="text-xs text-amber-200/15 italic"
                  style={{ fontFamily: "Georgia, serif" }}>
                  &quot;{entry.flavor}&quot;
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* footer count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-[10px] text-amber-200/10 font-mono tracking-[0.2em]">
            {filtered.length} / {CODEX.length} ITEMS — CLICK TO INSPECT
          </p>
        </motion.div>
      </div>
    </div>
  );
}
