"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useNow() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return { time, date };
}

const STATUS_ITEMS = [
  { label: "location", value: "Shanghai, CN", icon: "◉" },
  { label: "mood", value: "dissociation", icon: "◎" },
  { label: "listening", value: "Fake Plastic Trees — Radiohead", icon: "♫" },
  { label: "working on", value: "STATS playground", icon: "⌘" },
  { label: "reading", value: "Norwegian Wood", icon: "◇" },
  { label: "coffee today", value: "3 cups", icon: "○" },
  { label: "sleep last night", value: "4.5 hours", icon: "◈" },
  { label: "energy", value: "████░░░░░░ 40%", icon: "△" },
];

export default function NowPage() {
  const { time, date } = useNow();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      {/* subtle bg */}
      <div
        className="fixed inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(30,30,60,0.15) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* card */}
        <div className="border border-white/5 rounded-sm p-8 md:p-10"
          style={{ background: "rgba(255,255,255,0.01)" }}>

          {/* header */}
          <div className="mb-8">
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              current status
            </p>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl md:text-6xl font-extralight tracking-tight tabular-nums"
                style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                {time}
              </span>
            </div>
            <p className="text-white/20 text-xs mt-2"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              {date}
            </p>
          </div>

          {/* divider */}
          <div className="w-full h-px bg-white/5 mb-6" />

          {/* status items */}
          <div className="space-y-3">
            {STATUS_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="text-white/15 text-xs w-4 text-center">{item.icon}</span>
                <span className="text-[10px] text-white/20 tracking-[0.15em] uppercase w-24 flex-shrink-0"
                  style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                  {item.label}
                </span>
                <span className="text-sm text-white/50 font-light">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* footer */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-white/10 text-[10px] text-center tracking-[0.15em]"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              updated in real-time · yanfd.tech
            </p>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace", zIndex: 2 }}>
        now
      </div>
    </div>
  );
}
