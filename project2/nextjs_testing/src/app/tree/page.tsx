"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import TimelineScene from '@/components/tree/TimelineScene';
import AtmosphereBackground from '@/components/tree/AtmosphereBackground';
import WeatherOverlay from '@/components/tree/WeatherOverlay';
import Controls from '@/components/tree/Controls';
import LofiPlayer from '@/components/tree/LofiPlayer';
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
