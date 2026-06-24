"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TRACKS = [
  { title: "Fake Plastic Trees", artist: "Radiohead", album: "The Bends", duration: "4:52" },
  { title: "How to Disappear Completely", artist: "Radiohead", album: "Kid A", duration: "5:56" },
  { title: "Motion Picture Soundtrack", artist: "Radiohead", album: "Kid A", duration: "3:20" },
  { title: "Exit Music (For a Film)", artist: "Radiohead", album: "OK Computer", duration: "4:24" },
  { title: "Street Spirit (Fade Out)", artist: "Radiohead", album: "The Bends", duration: "4:12" },
  { title: "True Love Waits", artist: "Radiohead", album: "A Moon Shaped Pool", duration: "4:43" },
  { title: "Reckoner", artist: "Radiohead", album: "In Rainbows", duration: "4:50" },
  { title: "Videotape", artist: "Radiohead", album: "In Rainbows", duration: "4:40" },
];

function WaveformBars() {
  const bars = 48;
  return (
    <div className="flex items-end gap-[2px] h-16">
      {Array.from({ length: bars }, (_, i) => {
        const h = 10 + Math.sin(i * 0.5) * 30 + Math.cos(i * 0.3) * 20;
        const delay = i * 0.05;
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-white/30"
            initial={{ height: h }}
            animate={{ height: [h, h * 0.4, h * 0.8, h] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

function VinylDisc() {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72">
      <motion.div
        className="w-full h-full rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background: `
            radial-gradient(circle at 50% 50%,
              #111 0%, #111 18%,
              #1a1a1a 18%, #222 20%,
              #1a1a1a 20%, #1a1a1a 22%,
              #222 22%, #1a1a1a 24%,
              #1a1a1a 28%, #222 28%, #1a1a1a 30%,
              #1a1a1a 34%, #222 34%, #1a1a1a 36%,
              #1a1a1a 40%, #222 40%, #1a1a1a 42%,
              #1a1a1a 48%, #222 48%, #1a1a1a 50%,
              #1a1a1a 56%, #222 56%, #1a1a1a 58%,
              #1a1a1a 64%, #222 64%, #1a1a1a 66%,
              #1a1a1a 72%, #222 72%, #1a1a1a 74%,
              #1a1a1a 80%, #222 80%, #1a1a1a 82%,
              #1a1a1a 90%, #222 90%, #1a1a1a 92%,
              #1a1a1a 100%
            )
          `,
          boxShadow: "0 0 60px rgba(255,255,255,0.05), inset 0 0 30px rgba(0,0,0,0.5)",
        }}
      />
      {/* center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

export default function ListeningPage() {
  const [now] = useState(TRACKS[0]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* gradient bg */}
      <div
        className="fixed inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(60,20,80,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(20,40,80,0.2) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12 lg:gap-20 px-8 py-16">
        {/* left: vinyl */}
        <div className="flex flex-col items-center gap-8">
          <VinylDisc />
          <div className="text-center">
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>
              now playing
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight"
              style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
              {now.title}
            </h1>
            <p className="text-white/40 text-sm mt-1">{now.artist} — {now.album}</p>
          </div>
          <WaveformBars />
        </div>

        {/* right: tracklist */}
        <div className="w-full max-w-md">
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "'PP Supply Mono', monospace" }}>
            recent
          </p>
          <div className="space-y-0">
            {TRACKS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`flex items-center gap-4 py-3 border-b border-white/5 ${i === 0 ? "text-white" : "text-white/40"}`}
              >
                <span className="text-white/15 text-xs w-4 text-right"
                  style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{t.title}</p>
                  <p className="text-xs text-white/20 truncate">{t.artist}</p>
                </div>
                <span className="text-xs text-white/15"
                  style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                  {t.duration}
                </span>
                {i === 0 && (
                  <div className="flex gap-[2px] items-end h-3">
                    {[6, 10, 4, 8].map((h, j) => (
                      <motion.div
                        key={j}
                        className="w-[2px] bg-white/50 rounded-full"
                        animate={{ height: [h, h * 0.3, h] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.15 }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: "scrobbles", value: "12,847" },
              { label: "artists", value: "342" },
              { label: "hours", value: "2,156" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-xl md:text-2xl font-light"
                  style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase mt-1"
                  style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* corner label */}
      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace", zIndex: 2 }}>
        listening
      </div>
    </div>
  );
}
