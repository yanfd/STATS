"use client";

import { motion } from "framer-motion";

const ITEMS = [
  { bg: "#1a1a2e", text: "dissociation", sub: "状态", span: "row-span-2" },
  { bg: "linear-gradient(135deg, #0f0f23, #1a0a2e)", text: "", sub: "", span: "" },
  { bg: "#16213e", text: "4:00 AM", sub: "the only honest hour", span: "col-span-2" },
  { bg: "#0a0a0a", text: "", sub: "", span: "" },
  { bg: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)", text: "Radiohead", sub: "Fake Plastic Trees", span: "" },
  { bg: "#1e1e3f", text: "", sub: "", span: "row-span-2" },
  { bg: "#0d1117", text: "Shanghai", sub: "31°14′N 121°28′E", span: "" },
  { bg: "linear-gradient(45deg, #1a0a2e, #0a1628)", text: "INFP", sub: "Turbulent Mediator", span: "" },
  { bg: "#111827", text: "", sub: "", span: "col-span-2" },
  { bg: "#0f0f23", text: "Somewhere I Belong", sub: "", span: "" },
  { bg: "#16213e", text: "", sub: "", span: "" },
  { bg: "#1a1a2e", text: "TypeScript", sub: "Python · GLSL", span: "col-span-2" },
  { bg: "#0a0a14", text: "", sub: "", span: "" },
  { bg: "#1a0a2e", text: "memento mori", sub: "", span: "" },
  { bg: "#0d0d1a", text: "", sub: "", span: "col-span-2" },
];

export default function MoodboardPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center">
      {/* header */}
      <div className="mb-12 text-center">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          moodboard
        </p>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight"
          style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
          somewhere between here and gone
        </h1>
      </div>

      {/* grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-[2px] max-w-4xl w-full auto-rows-[100px] md:auto-rows-[120px]">
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className={`${item.span} relative overflow-hidden flex flex-col items-start justify-end p-4 rounded-sm`}
            style={{ background: item.bg }}
          >
            {item.text && (
              <>
                <p className="text-sm md:text-base font-light text-white/70"
                  style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
                  {item.text}
                </p>
                {item.sub && (
                  <p className="text-[10px] text-white/25 tracking-[0.1em] mt-1"
                    style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                    {item.sub}
                  </p>
                )}
              </>
            )}
            {/* subtle noise overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
            />
          </motion.div>
        ))}
      </div>

      {/* bottom quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="mt-12 text-white/15 text-sm text-center max-w-md"
        style={{ fontFamily: "'Neue Haas Display', sans-serif" }}
      >
        &quot;I want to create a body that doesn&apos;t die, a lover without an end.&quot;
      </motion.p>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace", zIndex: 2 }}>
        moodboard
      </div>
    </div>
  );
}
