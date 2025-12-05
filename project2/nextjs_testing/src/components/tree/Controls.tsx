"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSnow, Sun, Leaf, Snowflake, Flame, Flower } from 'lucide-react';

interface ControlsProps {
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    weather: 'sunny' | 'rain' | 'snow';
    setSeason: (s: 'spring' | 'summer' | 'autumn' | 'winter') => void;
    setWeather: (w: 'sunny' | 'rain' | 'snow') => void;
}

export default function Controls({ season, weather, setSeason, setWeather }: ControlsProps) {
    const seasons = [
        { id: 'spring', icon: Flower, label: 'Spring', color: 'bg-green-200 text-green-800' },
        { id: 'summer', icon: Sun, label: 'Summer', color: 'bg-yellow-200 text-yellow-800' },
        { id: 'autumn', icon: Leaf, label: 'Autumn', color: 'bg-orange-200 text-orange-800' },
        { id: 'winter', icon: Snowflake, label: 'Winter', color: 'bg-blue-100 text-blue-800' },
    ] as const;

    const weathers = [
        { id: 'sunny', icon: Sun, label: 'Sunny' },
        { id: 'rain', icon: CloudRain, label: 'Rain' },
        { id: 'snow', icon: CloudSnow, label: 'Snow' },
    ] as const;

    return (
        <motion.div
            className="absolute top-8 left-8 flex flex-col gap-6 z-30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {/* Season Controls */}
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Season</h3>
                <div className="flex gap-2">
                    {seasons.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setSeason(s.id)}
                            className={`p-3 rounded-xl transition-all duration-300 ${season === s.id
                                    ? `${s.color} shadow-md scale-105`
                                    : 'bg-white/40 text-slate-600 hover:bg-white/60'
                                }`}
                            title={s.label}
                        >
                            <s.icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Weather Controls */}
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Weather</h3>
                <div className="flex gap-2">
                    {weathers.map((w) => (
                        <button
                            key={w.id}
                            onClick={() => setWeather(w.id)}
                            className={`p-3 rounded-xl transition-all duration-300 ${weather === w.id
                                    ? 'bg-slate-800 text-white shadow-md scale-105'
                                    : 'bg-white/40 text-slate-600 hover:bg-white/60'
                                }`}
                            title={w.label}
                        >
                            <w.icon size={20} />
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
