"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import TimelineScene from '@/components/tree/TimelineScene';
import AtmosphereBackground from '@/components/tree/AtmosphereBackground';
import WeatherOverlay from '@/components/tree/WeatherOverlay';
import Controls from '@/components/tree/Controls';
import LofiPlayer from '@/components/tree/LofiPlayer';
import CommentNotifications from '@/components/tree/CommentNotifications';
import { MessageGroup, Message } from '@/types/hughes';

export default function TreePage() {
    const getInitialSeason = () => {
        if (typeof window === 'undefined') return 'spring'; // Default for SSR
        const month = new Date().getMonth() + 1; // 1-12
        if (month >= 3 && month <= 5) return 'spring';
        if (month >= 6 && month <= 8) return 'summer';
        if (month >= 9 && month <= 11) return 'autumn';
        return 'winter'; // 12, 1, 2
    };

    const [season, setSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');

    useEffect(() => {
        setSeason(getInitialSeason());
    }, []);
    const [weather, setWeather] = useState<'sunny' | 'rain' | 'snow'>('snow');

    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const [groupedMessages, setGroupedMessages] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [navigateTo, setNavigateTo] = useState<{ monthKey: string; messageId: string } | null>(null);

    const handleNotificationNavigate = useCallback((monthKey: string, messageId: string) => {
        setNavigateTo({ monthKey, messageId });
        setTimeout(() => setNavigateTo(null), 500);
    }, []);

    // Curated Unsplash Nature Images (High- res, moody, varied)
    const UNSPLASH_IMAGES = useMemo(() => [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80", // Forest light
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2000&q=80", // Mountains
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2000&q=80", // Deep Forest
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80", // Foggy Hills
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=80", // Dark Woods
        "https://images.unsplash.com/photo-1501854140884-074bf86ee911?auto=format&fit=crop&w=2000&q=80", // Misty Lake
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80", // High Peaks
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=2000&q=80", // Forest Mist
        "https://images.unsplash.com/photo-1504608524841-4203958c2331?auto=format&fit=crop&w=2000&q=80", // Rain/Dark
        "https://images.unsplash.com/photo-1519681393798-38e43269d877?auto=format&fit=crop&w=2000&q=80", // Starry/Night
    ], []);

    const handleShuffleBackground = () => {
        // Pick random image from array
        const randomImage = UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
        setBgImage(randomImage);
    };

    // Fetch data
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Hard reset loading to verify state
                setLoading(true);
                const timestamp = new Date().getTime();
                const response = await fetch(`/api/hughes/messages/grouped?t=${timestamp}`, {
                    cache: 'no-store',
                    headers: { 'Cache-Control': 'no-cache' },
                });
                if (response.ok) {
                    const data = await response.json();
                    setGroupedMessages(data.groups || {});
                }
            } catch (error) {
                console.error("Failed to fetch tree data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    // ESC to close message detail modal (capture phase so it fires before TimelineScene's handler)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedMessage) {
                e.stopImmediatePropagation();
                setSelectedMessage(null);
            }
        };
        document.addEventListener('keydown', handleKeyDown, true);
        return () => document.removeEventListener('keydown', handleKeyDown, true);
    }, [selectedMessage]);

    // Comment state
    const [comments, setComments] = useState<any[]>([]);
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentSubmitting, setCommentSubmitting] = useState(false);

    // Use stable message id as comment key to avoid collisions.
    const messageCommentKey = selectedMessage?.id != null ? String(selectedMessage.id) : null;

    const fetchComments = useCallback(async (key: string) => {
        setCommentLoading(true);
        try {
            const res = await fetch(`/api/comments?message_id=${encodeURIComponent(key)}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data.comments || []);
            }
        } catch { /* ignore */ } finally {
            setCommentLoading(false);
        }
    }, []);

    useEffect(() => {
        if (messageCommentKey) {
            fetchComments(messageCommentKey);
        } else {
            setComments([]);
        }
    }, [messageCommentKey, fetchComments]);

    const handleSubmitComment = async () => {
        if (!commentAuthor.trim() || !commentContent.trim() || !messageCommentKey) return;
        setCommentSubmitting(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message_id: messageCommentKey,
                    author_name: commentAuthor.trim(),
                    content: commentContent.trim(),
                }),
            });
            if (res.ok) {
                setCommentContent('');
                fetchComments(messageCommentKey);
            }
        } catch { /* ignore */ } finally {
            setCommentSubmitting(false);
        }
    };

    // Background colors based on season/weather (Darker/Gloomier palette)
    // Actually, Canvas has its own background color, so this outer div background is less important 
    // but useful for transitions or loading states.
    // The getBackground function is no longer needed as the background is handled by AtmosphereBackground and hardcoded class.
    // const getBackground = () => {
    //     return 'bg-black'; // Let 3D handle the color
    // };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black text-white">

            {/* Background Layer */}
            <AtmosphereBackground season={season} weather={weather} backgroundImage={bgImage} />

            {/* Weather Overlay - Optional, but we have 3D weather now. 
                Let's keep the CSS overlay if it adds to the effect, or remove it to rely on 3D.
                User said "Retain weather system". CSS weather might be cheaper/cleaner overlay.
                Let's KEEP it for now as "Screen Space" weather. */}
            <WeatherOverlay weather={weather} />

            {/* Main Scene - Flat Timeline */}
            <div className="absolute inset-0 z-10 overflow-y-auto">
                {loading ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-white/30 animate-pulse text-sm tracking-widest uppercase">
                            Loading Timeline...
                        </div>
                    </div>
                ) : (
                    <TimelineScene
                        season={season}
                        weather={weather}
                        data={groupedMessages}
                        onSelectMessage={setSelectedMessage}
                        navigateTo={navigateTo}
                    />
                )}
            </div>

            {/* UI Controls */}
            <Controls
                season={season}
                weather={weather}
                setSeason={setSeason}
                setWeather={setWeather}
                onShuffleBackground={handleShuffleBackground}
            />

            {/* Music Player */}
            <LofiPlayer />

            {/* Comment Notifications */}
            <CommentNotifications
                onNavigate={handleNotificationNavigate}
                groupedMessages={groupedMessages}
            />

            {/* Message Detail Modal - Reusing style from Hughes page but adapting to Tree aesthetic */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setSelectedMessage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl bg-[#1A1A1A]/90 border border-white/10 text-white rounded-lg p-6 shadow-2xl overflow-y-auto max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedMessage.title}</h2>
                                    <p className="text-white/50 text-sm">{selectedMessage.date} {selectedMessage.timestamp?.split(' ')[1]}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="text-white/50 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="prose prose-invert max-w-none [&>img]:rounded-xl [&>img]:shadow-lg">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {selectedMessage.content}
                                </ReactMarkdown>
                            </div>

                            {/* Comments Section */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <h3 className="text-sm font-medium text-white/40 tracking-widest uppercase mb-4">
                                    留言 ({comments.length})
                                </h3>

                                {commentLoading ? (
                                    <div className="text-white/20 text-sm animate-pulse">加载中...</div>
                                ) : (
                                    <>
                                        {comments.length > 0 && (
                                            <div className="space-y-3 mb-6">
                                                {comments.map((c: any) => (
                                                    <div key={c.id} className="bg-white/5 rounded-lg p-3">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-sm font-medium text-white/70">{c.author_name}</span>
                                                            <span className="text-xs text-white/20">
                                                                {new Date(c.created_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-white/50 leading-relaxed">{c.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="你的名字"
                                                value={commentAuthor}
                                                onChange={(e) => setCommentAuthor(e.target.value)}
                                                className="w-24 shrink-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                                                maxLength={50}
                                            />
                                            <input
                                                type="text"
                                                placeholder="写点什么..."
                                                value={commentContent}
                                                onChange={(e) => setCommentContent(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmitComment(); } }}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                                                maxLength={500}
                                            />
                                            <button
                                                onClick={handleSubmitComment}
                                                disabled={commentSubmitting || !commentAuthor.trim() || !commentContent.trim()}
                                                className="shrink-0 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
                                            >
                                                {commentSubmitting ? '...' : '发送'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Title / Watermark */}
            <div className="absolute top-8 right-8 z-0 opacity-20 pointer-events-none">
                <h1 className="text-6xl font-black text-slate-100 tracking-tighter">YANFD PRESENTS.</h1>
            </div>
        </div>
    );
}
