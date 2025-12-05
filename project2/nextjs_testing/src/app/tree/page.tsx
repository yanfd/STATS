"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TreeScene from '@/components/tree/TreeScene';
import WeatherOverlay from '@/components/tree/WeatherOverlay';
import Controls from '@/components/tree/Controls';
import LofiPlayer from '@/components/tree/LofiPlayer';

export default function TreePage() {
    const [season, setSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');
    const [weather, setWeather] = useState<'sunny' | 'rain' | 'snow'>('sunny');

    // Background colors based on season/weather (Darker/Gloomier palette)
    const getBackground = () => {
        if (weather === 'rain') return 'bg-[#2C3338]'; // Dark grey
        if (weather === 'snow') return 'bg-[#37474F]'; // Dark blue-grey

        switch (season) {
            case 'spring': return 'bg-[#3E423A]'; // Dark mossy green
            case 'summer': return 'bg-[#1A2621]'; // Very dark forest
            case 'autumn': return 'bg-[#3E2723]'; // Dark brown
            case 'winter': return 'bg-[#263238]'; // Dark slate
        }
    };

    return (
        <div className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 ${getBackground()}`}>

            {/* Weather Overlay (Rain/Snow) */}
            <WeatherOverlay weather={weather} />

            {/* Main Scene */}
            <div className="absolute inset-0 z-10">
                <TreeScene season={season} weather={weather} />
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

            {/* Title / Watermark */}
            <div className="absolute top-8 right-8 z-0 opacity-20 pointer-events-none">
                <h1 className="text-6xl font-black text-slate-900 tracking-tighter">TREE</h1>
            </div>
        </div>
    );
}
