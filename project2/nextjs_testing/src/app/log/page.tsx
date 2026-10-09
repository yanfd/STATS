"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteBar } from "@/components/v3/SiteBar";
import { YanfdLogoLoading } from "@/components/yanfd-logo/YanfdLogoLoading";
import { MessageSquare, X, ArrowUpRight } from "lucide-react";

const MONTH_ABBREV: Record<number, string> = {
  1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
  7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
};

/* ============================================================
   types
   ============================================================ */

type Msg = {
  id: string | number;
  title: string;
  date: string;
  timestamp?: string;
  content: string;
};

type MonthGroup = { year: number; month: number; messages: Msg[] };

/* ============================================================
   helpers
   ============================================================ */

function extractFirstImage(md: string): string | null {
  const m = md.match(/!\[.*?\]\((https?:\/\/\S+?)\)/);
  return m ? m[1] : null;
}

function plainText(md: string, len = 180): string {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/[#*`>|~_-]/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, len);
}

function parseDate(iso: string) {
  const d = new Date(iso);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    monthYear: d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
    time: "",
  };
}

function parseTime(ts?: string) {
  if (!ts) return "";
  const p = ts.split(" ");
  return p[1] || "";
}

/* ============================================================
   page
   ============================================================ */

export default function LogPage() {
  const [groups, setGroups] = useState<Record<string, MonthGroup>>({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Msg | null>(null);
  const [commentPanel, setCommentPanel] = useState(false);

  /* fetch */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const t = Date.now();
        const res = await fetch(`/api/hughes/messages/grouped?t=${t}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          setGroups(data.groups || {});
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sorted = useMemo(
    () => Object.keys(groups).sort((a, b) => b.localeCompare(a)),
    [groups],
  );

  const total = useMemo(
    () => Object.values(groups).reduce((s, g) => s + g.messages.length, 0),
    [groups],
  );

  const flatMessages = useMemo(
    () =>
      sorted.flatMap((k) =>
        groups[k].messages.map((m) => ({ ...m, _monthKey: k })),
      ),
    [groups, sorted],
  );

  const [activeKey, setActiveKey] = useState<string>("");

  useEffect(() => {
    if (sorted.length > 0 && !activeKey) setActiveKey(sorted[0]);
  }, [sorted, activeKey]);

  const activeGroup = activeKey ? groups[activeKey] : null;

  return (
    <div className="v3-root h-svh overflow-hidden flex flex-col relative bg-nd-200 text-nd-900">
      <SiteBar />

      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {loading ? (
          <YanfdLogoLoading />
        ) : (
          <>
            {/* hero — brutalist masthead */}
            <div className="shrink-0 px-4 md:px-8 pt-24 pb-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nd-600 mb-4">
                    Archive / notes / updates
                  </p>
                  <h1 className="font-neue font-medium text-[clamp(5rem,16vw,12rem)] leading-[0.78] tracking-tighter text-nd-900">
                    LOG
                  </h1>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-nd-600">{total} ENTRIES</span>
                    <span className="w-px h-4 bg-nd-500" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-nd-600">{sorted.length} MONTHS</span>
                    <span className="w-px h-4 bg-nd-500" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-nd-600">LATEST {flatMessages[0]?.date?.slice(5) || "—"}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCommentPanel(true)}
                  className="flex items-center gap-3 border border-nd-500 bg-nd-100 px-4 py-2 transition-colors hover:border-nd-900 hover:bg-nd-300 shrink-0"
                >
                  <MessageSquare size={14} className="text-nd-600" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-nd-800">Comments</span>
                </button>
              </div>
              <p className="mt-8 max-w-xl border-t border-nd-500 pt-4 font-neue text-sm leading-relaxed text-nd-700">
                A running record of shipped changes, loose fragments, and the things worth keeping outside chat history.
              </p>
            </div>

            {/* month selector */}
            <div className="shrink-0 px-4 md:px-8 pb-6">
              <div className="overflow-x-auto scrollbar-none border-y border-nd-500 py-3">
                <div className="flex items-center gap-1 min-w-max">
                  {sorted.length === 0 ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-nd-600">No data</span>
                  ) : (
                    (() => {
                      const yearMap = new Map<string, string[]>();
                      for (const key of sorted) {
                        const g = groups[key];
                        const y = String(g.year);
                        if (!yearMap.has(y)) yearMap.set(y, []);
                        yearMap.get(y)!.push(key);
                      }
                      const years = Array.from(yearMap.keys()).sort((a, b) => b.localeCompare(a));
                      const chips: React.ReactNode[] = [];
                      let first = true;
                      for (const year of years) {
                        const keys = yearMap.get(year)!;
                        if (!first) chips.push(<span key={`d-${year}`} className="w-px h-5 bg-nd-500 mx-2 shrink-0" />);
                        first = false;
                        chips.push(<span key={`y-${year}`} className="font-mono text-xs uppercase tracking-[0.2em] text-nd-600 select-none shrink-0">{year}</span>);
                        for (const key of keys) {
                          const g = groups[key];
                          const isActive = key === activeKey;
                          chips.push(
                            <button
                              key={key} type="button" onClick={() => setActiveKey(key)}
                                 className={`shrink-0 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] transition-all ${
                                 isActive ? "bg-nd-900 text-nd-100" : "text-nd-600 hover:text-nd-900 hover:bg-nd-300"
                              }`}
                            >
                              {MONTH_ABBREV[g.month] || g.month}
                            </button>,
                          );
                        }
                      }
                      return chips;
                    })()
                  )}
                </div>
              </div>
            </div>

            {/* entries */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-24">
              <div className="max-w-5xl">
                {activeGroup ? (
                  <div className="flex flex-col gap-12">
                    <div className="flex items-center gap-4">
                       <span className="font-mono text-xs uppercase tracking-[0.25em] text-nd-600">
                        {MONTH_ABBREV[activeGroup.month]} {activeGroup.year}
                      </span>
                       <span className="flex-1 h-px bg-nd-500" />
                       <span className="font-mono text-[10px] text-nd-600">{activeGroup.messages.length} entries</span>
                    </div>
                    {activeGroup.messages.map((msg, i) => (
                      <EntryRow key={msg.id} msg={msg} delay={i * 0.04} onClick={() => setSelected(msg)} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-nd-600">Select a month</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <a
        href="/"
        className="fixed font-mono text-[10px] uppercase tracking-[0.2em] transition-colors px-2 py-1 z-50 text-nd-600 hover:text-nd-900"
        style={{ bottom: "0.8rem", left: "1rem" }}
      >
        &larr; Home
      </a>

      <MessageModal message={selected} onClose={() => setSelected(null)} />
      <CommentCenter
        open={commentPanel}
        onClose={() => setCommentPanel(false)}
        messages={flatMessages}
        onNavigate={(msg) => { setSelected(msg); setCommentPanel(false); }}
      />
    </div>
  );
}

/* ============================================================
   entry row
   ============================================================ */

function EntryRow({
  msg,
  delay,
  onClick,
}: {
  msg: Msg;
  delay: number;
  onClick: () => void;
}) {
  const img = extractFirstImage(msg.content);
  const { day, weekday } = parseDate(msg.date);
  const time = parseTime(msg.timestamp);
  const excerpt = plainText(msg.content);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0, 0.25, 1] }}
      className="w-full text-left group border border-nd-500 bg-nd-100 p-5 md:p-6 hover:border-nd-900 transition-colors"
    >
      <div className="flex items-start gap-5 md:gap-8">
        {/* date block */}
        <div className="shrink-0 text-right w-16">
          <p className="font-neue font-medium text-5xl md:text-6xl leading-none tabular-nums text-nd-900">
            {day}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-nd-600 mt-2">
            {weekday}
          </p>
          {time && (
            <p className="font-mono text-[9px] text-nd-600 mt-0.5">{time}</p>
          )}
        </div>

        {/* content */}
        <div className="min-w-0 flex-1">
          {img && (
            <div
              className="w-full max-w-lg overflow-hidden mb-4"
              style={{ aspectRatio: "16/10", background: "#1a1a1a" }}
            >
              <img
                src={img}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          )}

          <h3 className="font-neue font-medium text-xl md:text-2xl leading-tight text-nd-900">
            {msg.title}
          </h3>

          {excerpt && (
            <p className="font-neue text-sm leading-relaxed text-nd-700 mt-3 max-w-2xl line-clamp-2">
              {excerpt}
            </p>
          )}

          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-nd-600 mt-5 group-hover:text-nd-900 transition-colors">
            Read <ArrowUpRight size={10} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ============================================================
   message modal
   ============================================================ */

function MessageModal({
  message,
  onClose,
}: {
  message: Msg | null;
  onClose: () => void;
}) {
  const [comments, setComments] = useState<any[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loadingC, setLoadingC] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const msgKey = message?.id != null ? String(message.id) : null;

  const fetchComments = useCallback(async (key: string) => {
    setLoadingC(true);
    try {
      const res = await fetch(`/api/comments?message_id=${encodeURIComponent(key)}`);
      if (res.ok) { const d = await res.json(); setComments(d.comments || []); }
    } catch { /* */ }
    finally { setLoadingC(false); }
  }, []);

  useEffect(() => {
    if (msgKey) { fetchComments(msgKey); setAuthor(""); setContent(""); }
    else { setComments([]); }
  }, [msgKey, fetchComments]);

  const submit = async () => {
    if (!author.trim() || !content.trim() || !msgKey) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message_id: msgKey, author_name: author.trim(), content: content.trim() }) });
      if (res.ok) { setContent(""); await fetchComments(msgKey); }
    } catch { /* */ }
    finally { setSubmitting(false); }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && message) onClose(); };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [message, onClose]);

  const cover = message ? extractFirstImage(message.content) : null;

  return (
    <AnimatePresence>
      {message && (
           <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9980] flex items-start justify-center overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "6vh 1rem 1rem" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.35, ease: [0.25, 0, 0.25, 1] }}
            className="relative w-full max-w-3xl mb-16 border border-nd-500"
            style={{ background: "#f2f2f4" }}
            onClick={(e) => e.stopPropagation()}
          >
            {cover && (
              <div className="w-full overflow-hidden" style={{ aspectRatio: "21/9", background: "#1a1a1a" }}>
                <img src={cover} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 font-mono text-[10px] uppercase tracking-[0.15em] text-nd-600 hover:text-nd-900 border border-nd-500 px-2 py-1 transition-colors"
            >
              Esc
            </button>

            <div className="p-6 md:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-nd-600 mb-6">
                {message.date}{message.timestamp ? ` · ${message.timestamp.split(" ")[1]}` : ""}
              </p>
                <h2 className="font-neue font-medium text-3xl md:text-4xl leading-tight text-nd-900 mb-8">
                {message.title}
              </h2>

              <div className="font-neue text-base leading-relaxed text-nd-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              </div>

              {/* comments */}
              <div className="mt-12 pt-10 border-t border-nd-500">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-nd-600 mb-6">
                  留言 ({comments.length})
                </h3>

                {loadingC ? (
                  <span className="font-mono text-[10px] text-nd-600 animate-pulse">Loading...</span>
                ) : (
                  <>
                    {comments.length > 0 && (
                      <div className="flex flex-col gap-3 mb-8">
                        {comments.map((c: any) => (
                          <div key={c.id} className="border border-nd-500 p-4">
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-nd-700">{c.author_name}</span>
                              <span className="font-mono text-[10px] text-nd-600">
                                {new Date(c.created_at).toLocaleDateString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <p className="font-neue text-sm leading-relaxed text-nd-800">{c.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <input
                        placeholder="名字"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        maxLength={50}
                        className="w-20 shrink-0 bg-transparent border border-nd-500 px-3 py-2 font-neue text-sm text-nd-900 placeholder:text-nd-600 outline-none focus:border-nd-900"
                      />
                      <input
                        placeholder="写点什么..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
                        maxLength={500}
                        className="flex-1 bg-transparent border border-nd-500 px-3 py-2 font-neue text-sm text-nd-900 placeholder:text-nd-600 outline-none focus:border-nd-900"
                      />
                      <button
                        onClick={submit}
                        disabled={submitting || !author.trim() || !content.trim()}
                        className="shrink-0 border border-nd-500 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-nd-700 hover:text-nd-900 hover:border-nd-900 transition-colors disabled:opacity-20 disabled:cursor-default"
                      >
                        {submitting ? "..." : "发送"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   comment center
   ============================================================ */

function CommentCenter({
  open,
  onClose,
  messages,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  messages: Array<Msg & { _monthKey: string }>;
  onNavigate: (msg: Msg) => void;
}) {
  const [allComments, setAllComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true);
      try {
        const ids = messages.map((m) => String(m.id)).join(",");
        const res = await fetch(`/api/comments/all?message_ids=${encodeURIComponent(ids)}`, { cache: "no-store" });
        if (res.ok) {
          const d = await res.json();
          setAllComments(d.comments || []);
        }
      } catch {
        /* */
      } finally {
        setLoading(false);
      }
    })();
  }, [open, messages]);

  const grouped = useMemo(() => {
    const map = new Map<string, { msg?: Msg; comments: any[] }>();
    for (const c of allComments) {
      if (!map.has(c.message_id)) {
        const msg = messages.find((m) => String(m.id) === c.message_id);
        map.set(c.message_id, { msg, comments: [] });
      }
      map.get(c.message_id)!.comments.push(c);
    }
    return Array.from(map.entries()).sort(([, a], [, b]) => {
      const ta = a.comments[0]?.created_at || "";
      const tb = b.comments[0]?.created_at || "";
      return tb.localeCompare(ta);
    });
  }, [allComments, messages]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
             style={{
            position: "fixed",
            inset: 0,
            zIndex: 9980,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            background: "rgba(30,30,30,0.15)",
            backdropFilter: "blur(1px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0, 0.25, 1] }}
            style={{
              height: "100%",
              width: "100%",
              maxWidth: "28rem",
               background: "#f2f2f4",
               borderLeft: "1px solid #e2e2e7",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                 padding: "1.25rem 1.5rem", borderBottom: "1px solid #e2e2e7",
                 position: "sticky", top: 0, background: "#f2f2f4", zIndex: 10,
              }}
            >
              <div>
                <h2 className="font-neue text-lg font-medium text-nd-900">Comments</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-nd-600 mt-0.5">{allComments.length} total</p>
              </div>
              <button onClick={onClose} className="text-nd-600 hover:text-nd-900 transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* body */}
            <div style={{ padding: "1rem 1.5rem" }}>
              {loading ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] animate-pulse py-8 text-center text-nd-600">Loading...</p>
              ) : grouped.length === 0 ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] py-8 text-center text-nd-600">No comments yet</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {grouped.map(([msgId, { msg, comments }]) => (
                    <div key={msgId}>
                      <button
                        type="button"
                        onClick={() => {
                          if (msg) onNavigate(msg);
                        }}
                        className="w-full text-left"
                        style={{
                          border: "none",
                          background: "none",
                          padding: 0,
                          marginBottom: "0.5rem",
                          cursor: "pointer",
                        }}
                      >
                        <p className="font-neue text-sm font-medium leading-snug line-clamp-1 text-nd-700">
                          {msg?.title || `Message #${msgId}`}
                        </p>
                        {msg && <p className="font-mono text-[10px] text-nd-600 mt-0.5">{msg.date}</p>}
                      </button>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                          paddingLeft: "0.75rem",
                           borderLeft: "2px solid #e2e2e7",
                        }}
                      >
                        {comments
                          .sort(
                            (a: any, b: any) =>
                              new Date(a.created_at).getTime() -
                              new Date(b.created_at).getTime(),
                          )
                          .map((c: any) => (
                            <div key={c.id}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                }}
                              >
                                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-nd-700">{c.author_name}</span>
                                <span className="font-mono text-[9px] text-nd-600">
                                  {new Date(c.created_at).toLocaleDateString(
                                    "zh-CN",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </span>
                              </div>
                              <p className="font-neue text-sm leading-relaxed text-nd-700 mt-0.5">{c.content}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
