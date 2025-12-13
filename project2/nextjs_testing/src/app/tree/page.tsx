"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import TimelineScene from '@/components/tree/TimelineScene';
import WeatherOverlay from '@/components/tree/WeatherOverlay';
import Controls from '@/components/tree/Controls';
import LofiPlayer from '@/components/tree/LofiPlayer';
import { MessageGroup, Message } from '@/types/hughes';

export default function TreePage() {
    const [season, setSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
    const [weather, setWeather] = useState<'sunny' | 'rain' | 'snow'>('sunny');

    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const [groupedMessages, setGroupedMessages] = useState<Record<string, any>>({}); // Using any for now until we import the type, or better yet, let's just use the type if we can import it. Actually, I'll use the type in the import.

    // Fetch data
    useEffect(() => {
        const fetchMessages = async () => {
            try {
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
            }
        };
        fetchMessages();
    }, []);

    // Background colors based on season/weather (Darker/Gloomier palette)
    // Actually, Canvas has its own background color, so this outer div background is less important 
    // but useful for transitions or loading states.
    const getBackground = () => {
        return 'bg-black'; // Let 3D handle the color
    };

    return (
        <div className={`relative w-full h-screen overflow-hidden ${getBackground()}`}>

            {/* Weather Overlay - Optional, but we have 3D weather now. 
                Let's keep the CSS overlay if it adds to the effect, or remove it to rely on 3D.
                User said "Retain weather system". CSS weather might be cheaper/cleaner overlay.
                Let's KEEP it for now as "Screen Space" weather. */}
            <WeatherOverlay weather={weather} />

            {/* Main Scene - Flat Timeline */}
            <div className="absolute inset-0 z-10 overflow-y-auto">
                <TimelineScene
                    season={season}
                    weather={weather}
                    data={groupedMessages}
                    onSelectMessage={setSelectedMessage}
                />
            </div>

            {/* UI Controls */}
            <Controls
                season={season}
                weather={weather}
                setSeason={setSeason}
                setWeather={setWeather}
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
                            <div className="prose prose-invert max-w-none">
                                <p className="whitespace-pre-line leading-relaxed text-gray-300">
                                    {selectedMessage.content}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Title / Watermark */}
            <div className="absolute top-8 right-8 z-0 opacity-20 pointer-events-none">
                <h1 className="text-6xl font-black text-slate-100 tracking-tighter">ZEN</h1>
            </div>
        </div>
    );
}
