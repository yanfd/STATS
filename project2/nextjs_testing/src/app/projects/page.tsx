"use client";

import { motion } from "framer-motion";
import { VercelNav } from "@/components/vercel/VercelNav";

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

const PROJECTS = [
  { name: "stats-playground", desc: "Next.js + FastAPI experiment playground", framework: "Next.js", status: "Ready", domain: "stats.yanfd.cn", updated: "2 min ago", deploys: 142 },
  { name: "gallery", desc: "Photography portfolio & showcase", framework: "Next.js", status: "Ready", domain: "gallery.yanfd.cn", updated: "1 hour ago", deploys: 67 },
  { name: "api-server", desc: "FastAPI backend for all services", framework: "FastAPI", status: "Ready", domain: "api.yanfd.cn", updated: "3 hours ago", deploys: 28 },
  { name: "globe-v2", desc: "3D globe visualization experiments", framework: "Three.js", status: "Building", domain: "globe.yanfd.cn", updated: "6 hours ago", deploys: 11 },
];

const DOMAINS = [
  { domain: "stats.yanfd.cn", type: "CNAME", status: "Valid", project: "stats-playground" },
  { domain: "gallery.yanfd.cn", type: "CNAME", status: "Valid", project: "gallery" },
  { domain: "api.yanfd.cn", type: "CNAME", status: "Valid", project: "api-server" },
  { domain: "globe.yanfd.cn", type: "CNAME", status: "Valid", project: "globe-v2" },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VercelNav />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium">Projects</h1>
            <p className="text-sm text-white/30 mt-1">Manage your projects and domains</p>
          </div>
          <button className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-white/90 transition-colors font-medium">
            + New Project
          </button>
        </div>

        {/* project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="border border-white/[0.08] rounded-lg p-5 hover:border-white/[0.15] transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center bg-white/[0.02]">
                    <span className="text-sm text-white/40 font-medium">{p.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-white transition-colors">{p.name}</p>
                    <p className="text-xs text-white/25 mt-0.5">{p.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusDot status={p.status} />
                  <span className="text-[11px] text-white/40">{p.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] text-white/20 px-1.5 py-0.5 border border-white/[0.06] rounded">{p.framework}</span>
                <span className="text-[11px] text-white/40">{p.domain}</span>
              </div>

              {/* mini sparkline */}
              <div className="flex items-end gap-[2px] h-6 mb-3">
                {Array.from({ length: 24 }, (_, j) => {
                  const h = 4 + Math.sin(j * 0.8 + i * 2) * 8 + Math.random() * 4;
                  return (
                    <div
                      key={j}
                      className="flex-1 bg-white/[0.08] rounded-[1px]"
                      style={{ height: Math.max(2, h) }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/15 font-mono">{p.deploys} deployments</span>
                <span className="text-[11px] text-white/15">{p.updated}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* domains table */}
        <div className="border border-white/[0.08] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-medium">Domains</h2>
            <button className="text-xs text-white/30 hover:text-white/50 transition-colors">+ Add</button>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {DOMAINS.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="px-4 py-3 flex items-center gap-4 hover:bg-white/[0.02]"
              >
                <div className="flex-1">
                  <span className="text-sm text-white/70 font-mono">{d.domain}</span>
                </div>
                <span className="text-[10px] text-white/20 px-1.5 py-0.5 border border-white/[0.06] rounded">{d.type}</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {d.status}
                </span>
                <span className="text-xs text-white/30 w-32 text-right truncate">{d.project}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
