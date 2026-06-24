"use client";

import { motion } from "framer-motion";

const EVENTS = [
  { year: "2019", title: "First line of code", desc: "Started with Python. Wrote a script that did nothing useful. Felt powerful.", side: "left" as const },
  { year: "2020", title: "The pandemic year", desc: "Built 14 projects. Abandoned 13. Learned that shipping matters more than perfecting.", side: "right" as const },
  { year: "2021", title: "Fell in love with frontend", desc: "Discovered CSS animations. Lost 3 months to making buttons feel right. No regrets.", side: "left" as const },
  { year: "2022", title: "Started STATS", desc: "A playground for experiments. Still alive. Still growing. Still has no clear direction.", side: "right" as const },
  { year: "2023", title: "Moved to Shanghai", desc: "Left everything familiar. Found noise, neon, and 4am convenience stores.", side: "left" as const },
  { year: "2024", title: "Found GLSL", desc: "Wrote my first shader. Understood nothing. Wrote the second one. Understood less. Felt everything.", side: "right" as const },
  { year: "2025", title: "Dissociation", desc: "Still here. Still building. Still not sure what any of this is for. That might be the point.", side: "left" as const },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      {/* header */}
      <div className="mb-20 text-center">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          timeline
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight"
          style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
          how I got here
        </h1>
      </div>

      {/* timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

        <div className="space-y-16">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: ev.side === "left" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative flex items-start gap-6 ${ev.side === "right" ? "flex-row-reverse" : ""}`}
            >
              {/* content */}
              <div className={`flex-1 ${ev.side === "right" ? "text-left pl-8 md:pl-16" : "text-right pr-8 md:pr-16"}`}>
                <p className="text-white/25 text-xs tracking-[0.2em] mb-1"
                  style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                  {ev.year}
                </p>
                <h3 className="text-lg md:text-xl font-light"
                  style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
                  {ev.title}
                </h3>
                <p className="text-white/30 text-sm mt-2 leading-relaxed">
                  {ev.desc}
                </p>
              </div>

              {/* dot on center line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-white/20 border border-white/10"
                  style={{ boxShadow: "0 0 12px rgba(255,255,255,0.1)" }} />
              </div>

              {/* spacer for the other side */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>

        {/* end dot */}
        <div className="flex justify-center mt-8">
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-white/30"
          />
        </div>
      </div>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace", zIndex: 2 }}>
        timeline
      </div>
    </div>
  );
}
