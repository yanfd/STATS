"use client";

import { motion } from "framer-motion";

/* ─── film grain + vignette ─── */
function FilmGrain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ─── journal entries ─── */

const ENTRIES = [
  {
    date: "June 24, 2025",
    location: "Shanghai, 04:17 AM",
    title: "Entry #247",
    content: `Can't sleep again. The city sounds different at this hour — like it's breathing. Finished the mood page for STATS tonight. It's just a shader and some words, but it felt right. Sometimes the simplest things carry the most weight.

Been thinking about what it means to build things nobody asked for. Maybe that's the point. You build for the version of yourself that needed it six months ago.`,
    mood: "Restless",
  },
  {
    date: "June 22, 2025",
    location: "Shanghai, 02:33 AM",
    title: "Entry #246",
    content: `Wrote a new shader tonight. Cold aurora, blue-purple, very quiet. It reminded me of something I can't name. Which is probably why I made it.

The Radiohead playlist is on repeat. "Fake Plastic Trees" for the fourth time. The way Thom Yorke sings "it wears her out" — that's exactly the feeling.`,
    mood: "Contemplative",
  },
  {
    date: "June 19, 2025",
    location: "Shanghai, 11:45 PM",
    title: "Entry #245 — On Building",
    content: `Someone asked me why I keep building STATS. I didn't have a good answer. It's not a product. It's not a portfolio. It's more like a room I keep rearranging.

Every page is a different mood. The log is for remembering. The graveyard is for letting go. The moodboard is for feeling. Maybe that's enough.`,
    mood: "Clear",
  },
  {
    date: "June 15, 2025",
    location: "Shanghai, 03:12 AM",
    title: "Entry #244 — The Dead Projects",
    content: `Made a page for all the projects I abandoned tonight. Eight of them. Each one has a little epitaph. It felt like writing obituaries.

The chatbot that could only say hello. The crypto tracker that showed wrong prices. The habit tracker I forgot to use. They're all teaching me something — I just didn't learn it in time.`,
    mood: "Nostalgic",
  },
  {
    date: "June 10, 2025",
    location: "Shanghai, 01:08 AM",
    title: "Entry #243 — GLSL",
    content: `There's something about writing shaders that feels different from other code. It's not logic — it's painting with math. You write a few lines and a universe appears on screen.

I don't fully understand what I'm doing. That's the best part. Understanding would ruin it.`,
    mood: "Euphoric",
  },
  {
    date: "June 5, 2025",
    location: "Shanghai, 04:56 AM",
    title: "Entry #242",
    content: `Long day. Long night. The kind where you lose track of where the day ended and the night began. Wrote code, listened to music, stared at the ceiling.

I want to create something that doesn't die. A lover without an end. I want to complete the last portrait of him, but without painting his face. Everything makes me feel afraid.`,
    mood: "Dissociated",
  },
];

const MOOD_COLORS: Record<string, string> = {
  Restless: "bg-amber-500/20 text-amber-400/70",
  Contemplative: "bg-blue-500/20 text-blue-400/70",
  Clear: "bg-emerald-500/20 text-emerald-400/70",
  Nostalgic: "bg-purple-500/20 text-purple-400/70",
  Euphoric: "bg-yellow-500/20 text-yellow-400/70",
  Dissociated: "bg-red-500/20 text-red-400/70",
};

/* ─── page ─── */

export default function JournalPage() {
  return (
    <div className="min-h-screen overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, #0a0f0a 0%, #0d140d 40%, #080c08 100%)",
      }}
    >
      <FilmGrain />

      {/* vignette */}
      <div className="fixed inset-0 pointer-events-none z-40"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mb-16 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-amber-100/80 mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>
            Field Journal
          </h1>
          <p className="text-xs text-amber-200/20 font-mono tracking-[0.3em] uppercase">
            Personal log — not for distribution
          </p>
          <div className="w-16 h-px bg-amber-200/10 mx-auto mt-4" />
        </motion.div>

        {/* entries */}
        <div className="space-y-12">
          {ENTRIES.map((entry, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            >
              {/* entry header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-amber-200/25 font-mono">{entry.date}</span>
                <span className="text-[10px] text-amber-200/15">·</span>
                <span className="text-xs text-amber-200/20 font-mono">{entry.location}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-sm font-mono ml-auto ${MOOD_COLORS[entry.mood] || ""}`}>
                  {entry.mood}
                </span>
              </div>

              {/* entry content */}
              <h2 className="text-lg text-amber-100/70 mb-3"
                style={{ fontFamily: "Georgia, serif" }}>
                {entry.title}
              </h2>

              <div className="text-sm text-amber-200/45 leading-[1.8] whitespace-pre-line"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                {entry.content}
              </div>

              {/* divider */}
              {i < ENTRIES.length - 1 && (
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex-1 h-px bg-amber-200/5" />
                  <span className="text-amber-200/10 text-xs">✦</span>
                  <div className="flex-1 h-px bg-amber-200/5" />
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-amber-200/10 text-xs italic"
            style={{ fontFamily: "Georgia, serif" }}>
            &quot;Gravity always wins.&quot;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
