"use client";

import { motion } from "framer-motion";

const DEAD_PROJECTS = [
  {
    name: "ChatBot-v1",
    born: "2021.03",
    died: "2021.05",
    cause: "lost interest after seeing GPT-3",
    epitaph: "it could only say hello",
    lang: "Python",
  },
  {
    name: "PixelArt Editor",
    born: "2020.08",
    died: "2020.09",
    cause: "canvas API was harder than expected",
    epitaph: "47 commits, 0 pixels placed by users",
    lang: "JavaScript",
  },
  {
    name: "CryptoTracker",
    born: "2021.11",
    died: "2022.01",
    cause: "market crashed, so did motivation",
    epitaph: "showed the wrong prices anyway",
    lang: "React",
  },
  {
    name: "CLI Note App",
    born: "2020.06",
    died: "2020.06",
    cause: "realized Notion exists",
    epitaph: "3 hours of work, 1 note written",
    lang: "Go",
  },
  {
    name: "Portfolio v1",
    born: "2019.12",
    died: "2020.03",
    cause: "never felt good enough to deploy",
    epitaph: 'the "under construction" page was the whole site',
    lang: "HTML/CSS",
  },
  {
    name: "Music Visualizer",
    born: "2022.04",
    died: "2022.06",
    cause: "WebGL kept crashing on mobile",
    epitaph: "looked amazing on my laptop only",
    lang: "Three.js",
  },
  {
    name: "Blog Engine",
    born: "2021.07",
    died: "2021.08",
    cause: "wrote the engine, never wrote a blog post",
    epitaph: "12,000 lines of framework, 0 lines of content",
    lang: "Next.js",
  },
  {
    name: "Habit Tracker",
    born: "2023.01",
    died: "2023.01",
    cause: "forgot to use it. ironic.",
    epitaph: "the only habit it tracked was abandonment",
    lang: "Flutter",
  },
];

function Cross() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="text-white/15">
      <rect x="8" y="0" width="4" height="24" fill="currentColor" />
      <rect x="2" y="6" width="16" height="4" fill="currentColor" />
    </svg>
  );
}

export default function GraveyardPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      {/* header */}
      <div className="mb-6 text-center">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          project graveyard
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight"
          style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
          here lie the dead
        </h1>
        <p className="text-white/20 text-sm mt-3 max-w-lg mx-auto">
          {DEAD_PROJECTS.length} projects that didn&apos;t make it.
          May they rest in /dev/null.
        </p>
      </div>

      {/* crosses row */}
      <div className="flex justify-center gap-4 my-8">
        {DEAD_PROJECTS.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Cross />
          </motion.div>
        ))}
      </div>

      {/* tombstones */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEAD_PROJECTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="border border-white/5 rounded-sm p-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
            }}
          >
            {/* language tag */}
            <span className="absolute top-4 right-4 text-[10px] text-white/10 px-2 py-0.5 border border-white/5 rounded-full"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              {p.lang}
            </span>

            <div className="flex items-center gap-2 mb-2">
              <Cross />
              <h3 className="text-base font-light"
                style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
                {p.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/15 mb-3"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              <span>{p.born}</span>
              <span>—</span>
              <span>{p.died}</span>
            </div>

            <p className="text-xs text-white/30 mb-2">
              <span className="text-white/15">cause of death: </span>{p.cause}
            </p>

            <p className="text-xs text-white/20 italic">
              &quot;{p.epitaph}&quot;
            </p>
          </motion.div>
        ))}
      </div>

      {/* footer epitaph */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 text-center"
      >
        <div className="w-8 h-px bg-white/10 mx-auto mb-4" />
        <p className="text-white/10 text-xs"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          &quot;Every dead project taught me something the live ones couldn&apos;t.&quot;
        </p>
      </motion.div>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace" }}>
        graveyard
      </div>
    </div>
  );
}
