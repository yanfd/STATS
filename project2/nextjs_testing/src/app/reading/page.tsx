"use client";

import { motion } from "framer-motion";

const BOOKS = [
  {
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    progress: 100,
    rating: 5,
    quote: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
    color: "#2d4a2d",
  },
  {
    title: "The Bell Jar",
    author: "Sylvia Plath",
    progress: 100,
    rating: 5,
    quote: "I took a deep breath and listened to the old brag of my heart. I am, I am, I am.",
    color: "#4a1a2e",
  },
  {
    title: "Norwegian Wood",
    author: "Murakami",
    progress: 78,
    rating: 4,
    quote: "Everybody's looking for something.",
    color: "#1a2f3e",
  },
  {
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    progress: 100,
    rating: 4,
    quote: "I am a dreamer. I know so little of real life that I just can't help reliving such moments.",
    color: "#1a1a3e",
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    progress: 100,
    rating: 5,
    quote: "I opened myself to the gentle indifference of the world.",
    color: "#2e1a0a",
  },
  {
    title: "No Longer Human",
    author: "Osamu Dazai",
    progress: 65,
    rating: 0,
    quote: "I have always found it hard to understand human beings.",
    color: "#0a0a2e",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: i < count ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)" }}
        />
      ))}
    </div>
  );
}

export default function ReadingPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mb-16 text-center">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3"
          style={{ fontFamily: "'PP Supply Mono', monospace" }}>
          bookshelf
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight"
          style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
          what I&apos;ve been reading
        </h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {BOOKS.map((book, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="border border-white/5 rounded-sm p-5 flex gap-5 items-start"
            style={{
              background: `linear-gradient(135deg, ${book.color}15, transparent)`,
            }}
          >
            {/* book "cover" */}
            <div
              className="w-14 h-20 rounded-sm flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: book.color }}
            >
              <span className="text-[10px] text-white/40 text-center leading-tight px-1">
                {book.title.charAt(0)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-light"
                    style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-white/25 mt-0.5">{book.author}</p>
                </div>
                <Stars count={book.rating} />
              </div>

              {/* progress bar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/20 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${book.progress}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  />
                </div>
                <span className="text-[10px] text-white/15"
                  style={{ fontFamily: "'PP Supply Mono', monospace" }}>
                  {book.progress}%
                </span>
              </div>

              {/* quote */}
              <p className="mt-3 text-xs text-white/20 italic leading-relaxed">
                &quot;{book.quote}&quot;
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* stats */}
      <div className="max-w-3xl mx-auto mt-12 grid grid-cols-3 gap-6">
        {[
          { label: "books this year", value: "14" },
          { label: "pages read", value: "3,847" },
          { label: "avg rating", value: "4.2" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.1 }}
            className="text-center"
          >
            <p className="text-2xl font-light"
              style={{ fontFamily: "'Neue Haas Display', sans-serif" }}>{s.value}</p>
            <p className="text-[10px] text-white/15 tracking-[0.1em] uppercase mt-1"
              style={{ fontFamily: "'PP Supply Mono', monospace" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace" }}>
        reading
      </div>
    </div>
  );
}
