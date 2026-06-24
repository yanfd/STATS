"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VercelNav } from "@/components/vercel/VercelNav";

/* ─── sparkline ─── */
function Sparkline({ data, color = "white", width = 120, height = 32 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);

    ctx.beginPath();
    data.forEach((v, i) => {
      const x = i * step;
      const y = height - 4 - ((v - min) / range) * (height - 8);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color === "white" ? "rgba(255,255,255,0.3)" : color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, color === "white" ? "rgba(255,255,255,0.05)" : "rgba(59,130,246,0.1)");
    grad.addColorStop(1, "transparent");
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }, [data, color, width, height]);

  return <canvas ref={canvasRef} />;
}

/* ─── page ─── */

const PAGE_VIEWS_DATA = [120, 180, 150, 220, 310, 280, 350, 420, 380, 450, 510, 490, 520, 480, 550, 610, 580, 640, 700, 680, 720, 750, 710, 780, 820, 790, 850, 880, 920, 900];
const VISITORS_DATA = [80, 120, 100, 160, 200, 180, 240, 280, 250, 300, 340, 320, 350, 310, 370, 410, 390, 430, 470, 450, 480, 500, 470, 520, 550, 530, 570, 600, 630, 610];
const BANDWIDTH_DATA = [2.1, 3.4, 2.8, 4.1, 5.2, 4.8, 6.1, 7.3, 6.8, 7.9, 8.5, 8.2, 8.8, 7.9, 9.1, 10.2, 9.8, 10.8, 11.5, 11.2, 11.8, 12.1, 11.5, 12.5, 13.1, 12.8, 13.5, 14.0, 14.8, 14.2];

const TOP_PAGES = [
  { path: "/", views: "3,847", pct: 35 },
  { path: "/log", views: "2,156", pct: 20 },
  { path: "/v3", views: "1,842", pct: 17 },
  { path: "/hughes", views: "987", pct: 9 },
  { path: "/dj_backdrop", views: "654", pct: 6 },
  { path: "/pricing", views: "432", pct: 4 },
  { path: "/mood", views: "321", pct: 3 },
];

const REFERRERS = [
  { source: "Direct", visits: "4,521", pct: 42 },
  { source: "Twitter / X", visits: "2,847", pct: 26 },
  { source: "GitHub", visits: "1,562", pct: 14 },
  { source: "Google", visits: "987", pct: 9 },
  { source: "Other", visits: "983", pct: 9 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VercelNav />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium">Analytics</h1>
            <p className="text-sm text-white/30 mt-1">Last 30 days · stats.yanfd.cn</p>
          </div>
          <div className="flex items-center gap-2">
            {["7D", "30D", "90D"].map((t, i) => (
              <button
                key={t}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  i === 1
                    ? "border-white/20 bg-white/[0.06] text-white"
                    : "border-white/[0.06] text-white/30 hover:text-white/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Page Views", value: "10,800", change: "+12.3%", data: PAGE_VIEWS_DATA, color: "white" },
            { label: "Unique Visitors", value: "7,234", change: "+8.7%", data: VISITORS_DATA, color: "white" },
            { label: "Bandwidth", value: "12.3 GB", change: "+15.1%", data: BANDWIDTH_DATA, color: "white" },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="border border-white/[0.08] rounded-lg p-4"
            >
              <p className="text-xs text-white/30 mb-1">{m.label}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-medium tabular-nums">{m.value}</p>
                  <p className="text-xs text-emerald-400 mt-0.5">{m.change}</p>
                </div>
                <Sparkline data={m.data} color={m.color} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* traffic chart area */}
        <div className="border border-white/[0.08] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Traffic</h2>
            <div className="flex items-center gap-4 text-[11px] text-white/30">
              <span className="flex items-center gap-1.5"><span className="w-2 h-[2px] bg-white/30 inline-block" /> Page Views</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-[2px] bg-blue-400/50 inline-block" /> Visitors</span>
            </div>
          </div>
          <Sparkline data={PAGE_VIEWS_DATA} width={800} height={160} color="white" />
        </div>

        {/* bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* top pages */}
          <div className="border border-white/[0.08] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-medium">Top Pages</h3>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {TOP_PAGES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="px-4 py-2.5 flex items-center gap-3 hover:bg-white/[0.02]"
                >
                  <span className="text-sm text-white/60 font-mono flex-1 truncate">{p.path}</span>
                  <span className="text-xs text-white/40 font-mono">{p.views}</span>
                  <div className="w-20 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full bg-white/20 rounded-full" style={{ width: `${p.pct}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* referrers */}
          <div className="border border-white/[0.08] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-medium">Referrers</h3>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {REFERRERS.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="px-4 py-2.5 flex items-center gap-3 hover:bg-white/[0.02]"
                >
                  <span className="text-sm text-white/60 flex-1">{r.source}</span>
                  <span className="text-xs text-white/40 font-mono">{r.visits}</span>
                  <div className="w-20 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400/30 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
