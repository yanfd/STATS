"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "Frontend", value: 0.85 },
  { name: "GLSL", value: 0.65 },
  { name: "Python", value: 0.78 },
  { name: "Design", value: 0.6 },
  { name: "Three.js", value: 0.55 },
  { name: "Backend", value: 0.5 },
  { name: "DevOps", value: 0.35 },
  { name: "Audio", value: 0.45 },
];

export default function SkillsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = 150;
    const n = SKILLS.length;

    // draw rings
    for (let r = 1; r <= 4; r++) {
      const radius = (maxR / 4) * r;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.03 + r * 0.01})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // draw spokes
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + maxR * Math.cos(angle);
      const y = cy + maxR * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // draw data polygon
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = maxR * SKILLS[i].value;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(100,200,255,0.06)";
    ctx.fill();
    ctx.strokeStyle = "rgba(100,200,255,0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // draw dots on vertices
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = maxR * SKILLS[i].value;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100,200,255,0.8)";
      ctx.fill();
      // glow
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100,200,255,0.15)";
      ctx.fill();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          skills
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight"
          style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
          what I can do
        </h1>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="block" />

        {/* labels */}
        {SKILLS.map((s, i) => {
          const angle = (Math.PI * 2 * i) / SKILLS.length - Math.PI / 2;
          const labelR = 180;
          const x = 200 + labelR * Math.cos(angle);
          const y = 200 + labelR * Math.sin(angle);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="absolute text-center pointer-events-none"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <p className="text-xs text-white/50 whitespace-nowrap">{s.name}</p>
              <p className="text-[10px] text-white/20"
                style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                {Math.round(s.value * 100)}%
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* bottom stats */}
      <div className="mt-12 grid grid-cols-3 gap-8">
        {[
          { label: "years coding", value: "6" },
          { label: "languages", value: "5" },
          { label: "frameworks", value: "12+" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.1 }}
            className="text-center"
          >
            <p className="text-2xl font-light"
              style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>{s.value}</p>
            <p className="text-[10px] text-white/20 tracking-[0.15em] uppercase mt-1"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace" }}>
        skills
      </div>
    </div>
  );
}
