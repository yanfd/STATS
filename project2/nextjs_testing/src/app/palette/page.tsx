"use client";

import { motion } from "framer-motion";

const PALETTES = [
  {
    name: "dissociation",
    colors: ["#0a0a14", "#1a1a2e", "#16213e", "#1a0a2e", "#2d1b4e"],
  },
  {
    name: "4am shanghai",
    colors: ["#0d1117", "#161b22", "#1f6feb", "#58a6ff", "#8b949e"],
  },
  {
    name: "fake plastic trees",
    colors: ["#1a2f1a", "#2d4a2d", "#4a7c4a", "#7cb57c", "#a8d5a8"],
  },
  {
    name: "kid a",
    colors: ["#1a0a0a", "#2e0e0e", "#4a1a1a", "#8b2500", "#d4573a"],
  },
  {
    name: "terminal",
    colors: ["#0c0c0c", "#1a1a1a", "#33ff33", "#00cc00", "#009900"],
  },
];

export default function PalettePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="mb-16 text-center">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          color palettes
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight"
          style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
          the colors I live in
        </h1>
      </div>

      <div className="space-y-10 w-full max-w-2xl">
        {PALETTES.map((palette, pi) => (
          <motion.div
            key={pi}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.15, duration: 0.6 }}
          >
            <p className="text-white/30 text-sm mb-3"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              {palette.name}
            </p>
            <div className="flex gap-[2px] h-20 md:h-24">
              {palette.colors.map((color, ci) => (
                <motion.div
                  key={ci}
                  className="flex-1 relative group cursor-pointer"
                  whileHover={{ y: -4 }}
                  style={{
                    backgroundColor: color,
                    borderRadius: ci === 0 ? "4px 0 0 4px" : ci === palette.colors.length - 1 ? "0 4px 4px 0" : "0",
                  }}
                >
                  <div className="absolute inset-x-0 -bottom-6 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white/30"
                      style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                      {color}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* large showcase */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-20 w-full max-w-2xl"
      >
        <div className="h-1 rounded-full overflow-hidden flex">
          {PALETTES.flatMap((p) => p.colors.slice(2, 3)).map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      </motion.div>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace" }}>
        palette
      </div>
    </div>
  );
}
