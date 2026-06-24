"use client";

import { motion } from "framer-motion";
import { VercelNav } from "@/components/vercel/VercelNav";

const ACTIVITIES = [
  { type: "deploy", msg: "Deployed stats-playground to production", time: "2 minutes ago", icon: "▲" },
  { type: "commit", msg: "yanfd pushed feat:update log page to main", time: "2 minutes ago", icon: "●" },
  { type: "domain", msg: "stats.yanfd.cn assigned to stats-playground", time: "30 minutes ago", icon: "◉" },
  { type: "deploy", msg: "Deployed api-server to production", time: "3 hours ago", icon: "▲" },
  { type: "commit", msg: "yanfd pushed add pricing routes to main", time: "3 hours ago", icon: "●" },
  { type: "env", msg: "Environment variable GITHUB_TOKEN updated", time: "4 hours ago", icon: "◈" },
  { type: "deploy", msg: "Build failed for globe-v2 (exit code 1)", time: "6 hours ago", icon: "▲" },
  { type: "commit", msg: "yanfd pushed wip: new shaders to dev", time: "6 hours ago", icon: "●" },
  { type: "domain", msg: "SSL certificate renewed for gallery.yanfd.cn", time: "8 hours ago", icon: "◉" },
  { type: "deploy", msg: "Deployed stats-playground to preview", time: "8 hours ago", icon: "▲" },
  { type: "integration", msg: "GitHub webhook configured for api-server", time: "12 hours ago", icon: "◆" },
  { type: "deploy", msg: "Build error on stats-playground (TS2345)", time: "12 hours ago", icon: "▲" },
  { type: "member", msg: "yanfd updated project settings for gallery", time: "1 day ago", icon: "○" },
  { type: "deploy", msg: "Deployed gallery to production", time: "1 day ago", icon: "▲" },
  { type: "domain", msg: "gallery.yanfd.cn configured with CNAME", time: "2 days ago", icon: "◉" },
];

const TYPE_COLORS: Record<string, string> = {
  deploy: "text-blue-400",
  commit: "text-emerald-400",
  domain: "text-purple-400",
  env: "text-amber-400",
  integration: "text-cyan-400",
  member: "text-white/40",
};

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <VercelNav />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-medium">Activity</h1>
          <p className="text-sm text-white/30 mt-1">Recent activity across all projects</p>
        </div>

        <div className="border border-white/[0.08] rounded-lg overflow-hidden">
          <div className="divide-y divide-white/[0.04]">
            {ACTIVITIES.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="px-4 py-3 flex items-start gap-3 hover:bg-white/[0.02] transition-colors"
              >
                <span className={`text-xs mt-0.5 ${TYPE_COLORS[a.type] || "text-white/20"}`}>
                  {a.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70">{a.msg}</p>
                </div>
                <span className="text-[11px] text-white/15 flex-shrink-0 font-mono">
                  {a.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
