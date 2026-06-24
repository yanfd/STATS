"use client";

import { motion } from "framer-motion";
import { VercelNav } from "@/components/vercel/VercelNav";

/* ─── data ─── */

const PROJECTS = [
  { name: "stats-playground", framework: "Next.js", status: "Ready", branch: "main", commit: "feat:update log page", time: "2m ago", domain: "stats.yanfd.cn" },
  { name: "gallery", framework: "Next.js", status: "Ready", branch: "main", commit: "fix:image loading", time: "1h ago", domain: "gallery.yanfd.cn" },
  { name: "api-server", framework: "FastAPI", status: "Ready", branch: "main", commit: "add pricing routes", time: "3h ago", domain: "api.yanfd.cn" },
  { name: "globe-v2", framework: "Three.js", status: "Building", branch: "dev", commit: "wip: new shaders", time: "5h ago", domain: "globe.yanfd.cn" },
];

const QUICK_STATS = [
  { label: "Projects", value: "7" },
  { label: "Deployments", value: "248" },
  { label: "Domains", value: "4" },
  { label: "Bandwidth", value: "12.3 GB" },
];

/* ─── components ─── */

function StatusDot({ status }: { status: string }) {
  const color = status === "Ready" ? "bg-emerald-400" : status === "Building" ? "bg-amber-400" : "bg-red-400";
  return (
    <span className="relative flex h-2 w-2">
      {status === "Building" && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
}

/* ─── page ─── */

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VercelNav />

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-medium">Overview</h1>
            <p className="text-sm text-white/30 mt-1">yanfd&apos;s personal infrastructure</p>
          </div>
          <button className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-white/90 transition-colors font-medium">
            + New Project
          </button>
        </div>

        {/* quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {QUICK_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border border-white/[0.08] rounded-lg p-4"
            >
              <p className="text-xs text-white/30 mb-1">{s.label}</p>
              <p className="text-2xl font-medium tabular-nums">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* projects table */}
        <div className="border border-white/[0.08] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-medium">Projects</h2>
            <span className="text-xs text-white/30">{PROJECTS.length} projects</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="px-4 py-3 flex items-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                {/* project icon */}
                <div className="w-8 h-8 rounded-md border border-white/[0.08] flex items-center justify-center flex-shrink-0 bg-white/[0.02]">
                  <span className="text-xs text-white/40">{p.name.charAt(0).toUpperCase()}</span>
                </div>

                {/* project info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{p.name}</span>
                    <span className="text-[10px] text-white/20 px-1.5 py-0.5 border border-white/[0.06] rounded">
                      {p.framework}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mt-0.5 truncate">
                    {p.commit}
                  </p>
                </div>

                {/* domain */}
                <div className="hidden md:block text-right">
                  <span className="text-xs text-white/40">{p.domain}</span>
                </div>

                {/* status */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusDot status={p.status} />
                  <span className="text-xs text-white/40">{p.status}</span>
                </div>

                {/* time */}
                <span className="text-[11px] text-white/20 w-16 text-right flex-shrink-0"
                  style={{ fontFamily: "'PP Supply Mono', 'SF Mono', monospace" }}>
                  {p.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* recent deployments */}
          <div className="border border-white/[0.08] rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">Recent Deployments</h3>
            <div className="space-y-2">
              {[
                { id: "dpl_8f2a", branch: "main", status: "Ready", time: "2m" },
                { id: "dpl_7e1b", branch: "dev", status: "Error", time: "1h" },
                { id: "dpl_6d0c", branch: "main", status: "Ready", time: "3h" },
                { id: "dpl_5c9d", branch: "feat/shaders", status: "Ready", time: "6h" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  <StatusDot status={d.status} />
                  <span className="text-xs text-white/50 font-mono">{d.id}</span>
                  <span className="text-xs text-white/30 px-1.5 py-0.5 bg-white/[0.03] rounded">
                    {d.branch}
                  </span>
                  <span className="flex-1" />
                  <span className="text-[11px] text-white/20 font-mono">{d.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* usage */}
          <div className="border border-white/[0.08] rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">Usage This Month</h3>
            <div className="space-y-3">
              {[
                { label: "Bandwidth", used: "12.3 GB", total: "100 GB", pct: 12 },
                { label: "Build Minutes", used: "142 min", total: "6000 min", pct: 2 },
                { label: "Serverless Invocations", used: "45.2K", total: "1M", pct: 5 },
                { label: "Edge Invocations", used: "8.7K", total: "500K", pct: 2 },
              ].map((u, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/40">{u.label}</span>
                    <span className="text-[11px] text-white/30 font-mono">{u.used} / {u.total}</span>
                  </div>
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white/20 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${u.pct}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
