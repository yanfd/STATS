"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ChevronRight } from 'lucide-react';

interface RecentComment {
    id: string;
    message_id: string;
    author_name: string;
    content: string;
    created_at: string;
}

interface CommentNotificationsProps {
    onNavigate: (monthKey: string, messageId: string) => void;
    groupedMessages: Record<string, any>;
}

const SEEN_KEY = 'hughes_seen_comment_ids';

function getSeenIds(): Set<string> {
    try {
        const raw = localStorage.getItem(SEEN_KEY);
        return new Set(raw ? JSON.parse(raw) : []);
    } catch {
        return new Set();
    }
}

function markAllSeen(ids: string[]) {
    try {
        const seen = getSeenIds();
        ids.forEach(id => seen.add(id));
        // Keep only last 500 to avoid bloat
        const arr = Array.from(seen).slice(-500);
        localStorage.setItem(SEEN_KEY, JSON.stringify(arr));
    } catch { /* ignore */ }
}

export default function CommentNotifications({ onNavigate, groupedMessages }: CommentNotificationsProps) {
    const [unseen, setUnseen] = useState<RecentComment[]>([]);
    const [open, setOpen] = useState(false);

    const fetchRecent = useCallback(async () => {
        try {
            const res = await fetch('/api/comments?recent=1', { cache: 'no-store' });
            if (!res.ok) return;
            const data = await res.json();
            const comments: RecentComment[] = data.comments || [];
            const seen = getSeenIds();
            setUnseen(comments.filter(c => !seen.has(c.id)));
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        fetchRecent();
        const interval = setInterval(fetchRecent, 60000);
        return () => clearInterval(interval);
    }, [fetchRecent]);

    // Find which monthKey a message_id belongs to
    const findMonthKey = (messageId: string): string | null => {
        for (const [key, group] of Object.entries(groupedMessages)) {
            if (group.messages?.some((m: any) => String(m.id) === messageId)) {
                return key;
            }
        }
        return null;
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Mark all as seen when closing
        markAllSeen(unseen.map(c => c.id));
        setUnseen([]);
    };

    const handleNavigate = (comment: RecentComment) => {
        const monthKey = findMonthKey(comment.message_id);
        if (monthKey) {
            onNavigate(monthKey, comment.message_id);
        }
        handleClose();
    };

    if (unseen.length === 0) return null;

    return (
        <>
            {/* Bell Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleOpen}
                className="fixed top-4 right-16 z-40 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full px-3 py-2 text-sm transition-colors"
            >
                <MessageSquare size={14} />
                <span className="font-mono">{unseen.length}</span>
                <span className="text-white/50 text-xs">新评论</span>
            </motion.button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="fixed top-14 right-4 z-50 w-80 bg-[#1A1A1A]/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">新评论</span>
                            <button onClick={handleClose} className="text-white/30 hover:text-white transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {unseen.map((comment) => {
                                const monthKey = findMonthKey(comment.message_id);
                                return (
                                    <button
                                        key={comment.id}
                                        onClick={() => handleNavigate(comment)}
                                        className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 flex items-start gap-3 group transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-medium text-white/80">{comment.author_name}</span>
                                                {monthKey && (
                                                    <span className="text-xs text-white/30">{monthKey}</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">{comment.content}</p>
                                            <p className="text-xs text-white/20 mt-1">
                                                {new Date(comment.created_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        <ChevronRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors mt-1 flex-shrink-0" />
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
