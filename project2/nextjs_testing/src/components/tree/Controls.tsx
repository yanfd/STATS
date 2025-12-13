"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, CloudSnow, Sun, Leaf, Snowflake, Flower, Settings, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

interface ControlsProps {
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    weather: 'sunny' | 'rain' | 'snow';
    setSeason: (s: 'spring' | 'summer' | 'autumn' | 'winter') => void;
    setWeather: (w: 'sunny' | 'rain' | 'snow') => void;
    onShuffleBackground?: () => void;
}

export default function Controls({ season, weather, setSeason, setWeather, onShuffleBackground }: ControlsProps) {
    const [isVisible, setIsVisible] = useState(true);

    const seasons = [
        { id: 'spring', icon: Flower, label: 'Spring', color: 'bg-green-800/80 text-green-100' },
        { id: 'summer', icon: Sun, label: 'Summer', color: 'bg-yellow-700/80 text-yellow-100' },
        { id: 'autumn', icon: Leaf, label: 'Autumn', color: 'bg-orange-800/80 text-orange-100' },
        { id: 'winter', icon: Snowflake, label: 'Winter', color: 'bg-blue-900/80 text-blue-100' },
    ] as const;

    const weathers = [
        { id: 'sunny', icon: Sun, label: 'Sunny' },
        { id: 'rain', icon: CloudRain, label: 'Rain' },
        { id: 'snow', icon: CloudSnow, label: 'Snow' },
    ] as const;

    return (
        <motion.div
            className="absolute top-8 left-8 z-30 flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="mt-2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 hover:bg-black/60 hover:text-white transition-all border border-white/10"
                title={isVisible ? "Hide Controls" : "Show Controls"}
            >
                {isVisible ? <ChevronLeft size={20} /> : <Settings size={20} />}
            </button>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, width: 0, x: -20 }}
                        animate={{ opacity: 1, width: 'auto', x: 0 }}
                        exit={{ opacity: 0, width: 0, x: -20 }}
                        className="flex flex-col gap-4 overflow-hidden"
                    >
                        {/* Season Controls */}
                        <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
                            <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">Season</h3>
                            <div className="flex gap-2">
                                {seasons.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setSeason(s.id)}
                                        className={`p-3 rounded-xl transition-all duration-300 ${season === s.id
                                            ? `${s.color} shadow-lg scale-105 ring-1 ring-white/20`
                                            : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                                            }`}
                                        title={s.label}
                                    >
                                        <s.icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Shuffle Background */}
                        {onShuffleBackground && (
                            <button
                                onClick={onShuffleBackground}
                                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-white/50 hover:bg-white/20 hover:text-white transition-all"
                                title="Shuffle Scenery"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m16 3 5 5-5 5" /><path d="M4 20h4l10.9-10.9a5 5 0 0 0 0-7.07" /><path d="m21 21-9-9" /><path d="m3 3 5 5" />
                                </svg>
                            </button>
                        )}

                        {/* Weather Controls */}
                        <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
                            <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">Weather</h3>
                            <div className="flex gap-2">
                                {weathers.map((w) => (
                                    <button
                                        key={w.id}
                                        onClick={() => setWeather(w.id)}
                                        className={`p-3 rounded-xl transition-all duration-300 ${weather === w.id
                                            ? 'bg-slate-700 text-white shadow-lg scale-105 ring-1 ring-white/20'
                                            : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                                            }`}
                                        title={w.label}
                                    >
                                        <w.icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}