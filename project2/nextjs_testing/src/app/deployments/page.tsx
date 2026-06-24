"use client";

import { motion } from "framer-motion";
import { VercelNav } from "@/components/vercel/VercelNav";

function StatusDot({ status }: { status: string }) {
  const color = status === "Ready" ? "bg-emerald-400" : status === "Building" ? "bg-amber-400" : status === "Queued" ? "bg-blue-400" : "bg-red-400";
  return (
    <span className="relative flex h-2 w-2">
      {status === "Building" && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
}

const DEPLOYMENTS = [
  { id: "dpl_8f2a3b", project: "stats-playground", branch: "main", commit: "feat:update log page", author: "yanfd", status: "Ready", time: "2 min ago", duration: "42s" },
  { id: "dpl_7e1b4c", project: "stats-playground", branch: "main", commit: "fix:time", author: "yanfd", status: "Ready", time: "1 hour ago", duration: "38s" },
  { id: "dpl_6d0c5d", project: "api-server", branch: "main", commit: "add pricing routes", author: "yanfd", status: "Ready", time: "3 hours ago", duration: "1m 12s" },
  { id: "dpl_5c9d6e", project: "gallery", branch: "main", commit: "fix:image loading", author: "yanfd", status: "Ready", time: "5 hours ago", duration: "51s" },
  { id: "dpl_4b8e7f", project: "globe-v2", branch: "dev", commit: "wip: new shaders", author: "yanfd", status: "Building", time: "6 hours ago", duration: "—" },
  { id: "dpl_3a7f8g", project: "stats-playground", branch: "main", commit: "refactor: one last kiss", author: "yanfd", status: "Ready", time: "8 hours ago", duration: "44s" },
  { id: "dpl_2z6g9h", project: "stats-playground", branch: "feat/log", commit: "doc:update", author: "yanfd", status: "Error", time: "12 hours ago", duration: "22s" },
  { id: "dpl_1y5h0i", project: "api-server", branch: "main", commit: "feat:comments api", author: "yanfd", status: "Ready", time: "1 day ago", duration: "1m 5s" },
  { id: "dpl_0x4i1j", project: "stats-playground", branch: "main", commit: "fix:loading", author: "yanfd", status: "Ready", time: "1 day ago", duration: "39s" },
  { id: "dpl_w3j2k", project: "gallery", branch: "main", commit: "feat:masonry layout", author: "yanfd", status: "Ready", time: "2 days ago", duration: "58s" },
];

export default function DeploymentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VercelNav />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium">Deployments</h1>
            <p className="text-sm text-white/30 mt-1">Latest deployment activity</p>
          </div>
          <div className="flex items-center gap-2">
            {["All", "Ready", "Building", "Error"].map((f) => (
              <button
                key={f}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  f === "All"
                    ? "border-white/20 bg-white/[0.06] text-white"
                    : "border-white/[0.06] text-white/30 hover:text-white/50 hover:bg-white/[0.02]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* deployment list */}
        <div className="border border-white/[0.08] rounded-lg overflow-hidden">
          <div className="divide-y divide-white/[0.04]">
            {DEPLOYMENTS.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <StatusDot status={d.status} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{d.commit}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-white/40 font-mono">{d.id}</span>
                      <span className="text-[11px] text-white/20">{d.project}</span>
                      <span className="text-[11px] text-white/20 bg-white/[0.03] px-1.5 py-0.5 rounded">
                        {d.branch}
                      </span>
                      <span className="text-[11px] text-white/15">{d.author}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[11px] text-white/30 font-mono block">{d.duration}</span>
                    <span className="text-[10px] text-white/15">{d.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* summary bar */}
        <div className="mt-6 flex items-center gap-6">
          {[
            { label: "Total", count: 248, color: "text-white/40" },
            { label: "Ready", count: 239, color: "text-emerald-400" },
            { label: "Error", count: 7, color: "text-red-400" },
            { label: "Building", count: 2, color: "text-amber-400" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex items-center gap-2"
            >
              <span className={`text-lg font-medium ${s.color}`}>{s.count}</span>
              <span className="text-[11px] text-white/20">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
