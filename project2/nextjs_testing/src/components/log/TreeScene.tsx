"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageGroup } from '@/types/hughes';
import { X, Calendar } from 'lucide-react';

interface TreeSceneProps {
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    weather: 'sunny' | 'rain' | 'snow';
    data?: Record<string, MessageGroup>;
    onSelectMessage?: (message: any) => void;
}

export default function TreeScene({ season, weather, data = {}, onSelectMessage }: TreeSceneProps) {
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

    // Aesthetic Config
    const config = useMemo(() => {
        switch (season) {
            case 'spring':
                return {
                    primary: '#4A5D43', // Green
                    secondary: '#6B7F62',
                    accent: '#F48FB1',
                };
            case 'summer':
                return {
                    primary: '#1B3A28', // Deep Green
                    secondary: '#2C4C3B',
                    accent: '#81C784',
                };
            case 'autumn':
                return {
                    primary: '#5D2E2E', // Red/Brown
                    secondary: '#7A4444',
                    accent: '#FFB74D',
                };
            case 'winter':
                return {
                    primary: '#2C3E50', // Slate
                    secondary: '#34495E',
                    accent: '#90CAF9',
                };
        }
    }, [season]);

    const sortedMonths = useMemo(() => {
        return Object.keys(data).sort((a, b) => b.localeCompare(a));
    }, [data]);

    const handleMonthClick = (monthKey: string) => {
        setExpandedMonth(monthKey);
    };

    const handleCloseMonth = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedMonth(null);
    };

    // Scalloped Triangle Path Generator
    const generatePinePath = (w: number, h: number) => {
        // Top point: w/2, 0
        // Bottom Right: w, h
        // Bottom Left: 0, h
        // Scallops along bottom: 3 curves

        const scallopDepth = h * 0.15;
        const segmentW = w / 3;

        return `
            M ${w / 2} 0 
            L ${w} ${h * 0.8}
            Q ${w - segmentW * 0.5} ${h + scallopDepth} ${w - segmentW} ${h * 0.85}
            Q ${w - segmentW * 1.5} ${h + scallopDepth} ${w - segmentW * 2} ${h * 0.85}
            Q ${segmentW * 0.5} ${h + scallopDepth} 0 ${h * 0.8}
            Z
        `;
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">

            {/* Tree Container */}
            <div className={`relative flex flex-col items-center justify-end h-3/4 transition-all duration-700 ease-in-out transform ${expandedMonth ? 'opacity-0 scale-95 translate-y-10 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'}`}>

                {sortedMonths.length === 0 ? (
                    <div className="text-white/50">No data available</div>
                ) : (
                    sortedMonths.slice(0, 12).map((key, index) => {
                        const messageCount = data[key].messages.length;
                        const totalLayers = Math.min(sortedMonths.length, 12);

                        // Tapering
                        const scale = 1 + (index * 0.45);
                        const width = 160 * scale;
                        const height = 100 + (index * 5); // Layers get taller at bottom? Or consistent? Let's keep consistent relative to scale.

                        // Density / Overlap
                        const overlap = -3 - (index * 0.25); // Very tight overlap

                        return (
                            <motion.div
                                key={key}
                                layoutId={`month-layer-${key}`}
                                onClick={() => handleMonthClick(key)}
                                className="relative cursor-pointer group flex justify-center"
                                style={{
                                    zIndex: 20 - index,
                                    marginBottom: index === totalLayers - 1 ? 0 : `${overlap}rem`,
                                    width: `${width}px`,
                                    height: `${height}px`
                                }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: 'spring', stiffness: 300, damping: 20,
                                    delay: index * 0.05
                                }}
                            >
                                {/* Vector Shape */}
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox={`0 0 ${width} ${height}`}
                                    className="drop-shadow-2xl overflow-visible"
                                >
                                    <defs>
                                        <linearGradient id={`grad-${key}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor={config.secondary} />
                                            <stop offset="100%" stopColor={config.primary} />
                                        </linearGradient>
                                        <filter id="shadow">
                                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="black" floodOpacity="0.3" />
                                        </filter>
                                    </defs>
                                    <path
                                        d={generatePinePath(width, height)}
                                        fill={`url(#grad-${key})`}
                                        className="transition-all duration-300 group-hover:brightness-110"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="1"
                                    />
                                </svg>

                                {/* Month Label (Centered on the layer) */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 flex flex-col items-center pointer-events-none">
                                    <span className="text-white/90 text-sm font-bold tracking-[0.2em] shadow-black drop-shadow-md">
                                        {data[key].year}.{data[key].month}
                                    </span>
                                    {/* Decoration */}
                                    <div className="flex gap-1 mt-1 opacity-60">
                                        {Array.from({ length: Math.min(messageCount, 3) }).map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}

                {/* Trunk */}
                <div
                    className="w-32 h-40 z-0 rounded-t-lg relative -mt-10 shadow-2xl"
                    style={{
                        background: 'linear-gradient(90deg, #1e1612 0%, #2d241e 50%, #1e1612 100%)',
                        boxShadow: '0 -20px 40px rgba(0,0,0,0.5) inset'
                    }}
                />
            </div>

            {/* Expanded View */}
            <AnimatePresence>
                {expandedMonth && data[expandedMonth] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 md:p-12"
                        onClick={handleCloseMonth}
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.9 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 50, scale: 0.9 }}
                            className="w-full max-w-5xl h-full max-h-[85vh] bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/5 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-32 opacity-20" style={{ background: `linear-gradient(to bottom, ${config.primary}, transparent)` }} />

                            {/* Header */}
                            <div className="p-8 flex justify-between items-start relative z-10">
                                <div className="flex items-end gap-4">
                                    <h2 className="text-6xl font-black text-white/90 tracking-tighter">
                                        {data[expandedMonth].month}
                                    </h2>
                                    <span className="text-2xl text-white/40 font-light mb-2">
                                        {data[expandedMonth].year}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCloseMonth}
                                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Grid */}
                            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data[expandedMonth].messages.map((msg: any, i: number) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-6 cursor-pointer group transition-all hover:scale-[1.02] hover:shadow-xl"
                                        onClick={() => onSelectMessage?.(msg)}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-3xl font-bold text-white/30 group-hover:text-white/90 transition-colors">
                                                    {new Date(msg.date).getDate()}
                                                </span>
                                                <span className="text-xs text-white/20 uppercase">
                                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(msg.date).getDay()]}
                                                </span>
                                            </div>
                                            {/* Dot indicator */}
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.accent }} />
                                        </div>
                                        <h3 className="text-lg font-medium text-white/90 mb-3 line-clamp-2 group-hover:text-white transition-colors">
                                            {msg.title}
                                        </h3>
                                        <p className="text-sm text-white/50 line-clamp-3 leading-relaxed">
                                            {msg.content}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
