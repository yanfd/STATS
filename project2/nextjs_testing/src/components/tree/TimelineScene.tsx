"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageGroup } from '@/types/hughes';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface TimelineSceneProps {
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    weather: 'sunny' | 'rain' | 'snow';
    data?: Record<string, MessageGroup>;
    onSelectMessage?: (message: any) => void;
}

export default function TimelineScene({ season, weather, data = {}, onSelectMessage }: TimelineSceneProps) {
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

    // Aesthetic Config (Flat, Minimalist, Dark)
    const config = useMemo(() => {
        // Monochromatic / Duotone based on season
        switch (season) {
            case 'spring': return { main: '#4A5D43', dim: '#2d332d', text: '#E0E7DF' };
            case 'summer': return { main: '#1B3A28', dim: '#1a1f1b', text: '#D1E7DD' };
            case 'autumn': return { main: '#5D2E2E', dim: '#2b1d1d', text: '#EFEBE9' };
            case 'winter': return { main: '#37474F', dim: '#1c2226', text: '#ECEFF1' };
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

    return (
        <div className="relative w-full min-h-full flex flex-col items-center justify-start md:justify-center pt-24 pb-24 md:p-8">

            {/* Timeline Column */}
            <div className={`w-full max-w-2xl flex flex-col gap-2 transition-all duration-500 ease-out ${expandedMonth ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100'}`}>

                {sortedMonths.length === 0 ? (
                    <div className="text-white/50 text-center">No data available</div>
                ) : (
                    sortedMonths.slice(0, 12).map((key, index) => {
                        const messageCount = data[key].messages.length;

                        return (
                            <motion.div
                                key={key}
                                layoutId={`month-strip-${key}`}
                                onClick={() => handleMonthClick(key)}
                                className="relative w-full h-16 bg-black/40 hover:bg-black/60 backdrop-blur-sm border-l-4 cursor-pointer group flex items-center px-6 transition-colors"
                                style={{
                                    borderColor: config.main,
                                    borderLeftWidth: '4px'
                                }}
                                whileHover={{ scale: 1.02, x: 10 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.1, ease: 'linear' }}
                            >
                                {/* Left: Label */}
                                <div className="flex flex-col w-24 flex-shrink-0">
                                    <span className="text-2xl font-black tracking-tight text-white/90 leading-none">
                                        {data[key].month}
                                    </span>
                                    <span className="text-xs font-bold text-white/30 tracking-widest">
                                        {data[key].year}
                                    </span>
                                </div>

                                {/* Right: Barcode Visualization */}
                                <div className="flex-1 h-full flex items-center gap-1 overflow-hidden mask-linear-fade">
                                    {data[key].messages.map((msg: any, i: number) => {
                                        // Randomize line height/opacity for "Barcode" effect
                                        // Use deterministic random based on date
                                        const dateVal = new Date(msg.date).getDate();
                                        const height = 20 + (dateVal % 10) * 3 + 'px';
                                        const opacity = 0.3 + ((dateVal % 5) / 5) * 0.7;

                                        return (
                                            <div
                                                key={msg.id}
                                                className="w-1 bg-white group-hover:bg-white transition-colors"
                                                style={{
                                                    height: height,
                                                    opacity: opacity,
                                                    backgroundColor: config.text
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Count */}
                                <div className="text-xs font-mono text-white/20 ml-4">
                                    {messageCount.toString().padStart(2, '0')}
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Expanded View */}
            <AnimatePresence>
                {expandedMonth && data[expandedMonth] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-0 md:p-12"
                        onClick={handleCloseMonth}
                    >
                        <motion.div
                            layoutId={`month-strip-${expandedMonth}`}
                            className="w-full max-w-4xl h-full bg-transparent flex flex-col relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
                                <div>
                                    <h1 className="text-5xl md:text-8xl font-black text-white/90 tracking-tighter leading-none">
                                        {data[expandedMonth].month}
                                    </h1>
                                    <p className="text-lg md:text-2xl text-white/40 font-light mt-2 tracking-widest">
                                        {data[expandedMonth].year} _ ARCHIVE
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseMonth}
                                    className="p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors"
                                >
                                    <X size={32} />
                                </button>
                            </div>

                            {/* List of Messages */}
                            <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-2 pb-6">
                                    {data[expandedMonth].messages.map((msg: any, i: number) => (
                                        <React.Fragment key={msg.id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.05 }}
                                                className="group w-full p-6 border-l-2 border-white/10 hover:border-white/80 hover:bg-white/5 transition-all cursor-pointer flex gap-6"
                                                onClick={() => onSelectMessage?.(msg)}
                                            >
                                                <div className="flex flex-col w-12 text-right flex-shrink-0">
                                                    <span className="text-xl font-bold text-white/50 group-hover:text-white transition-colors">
                                                        {new Date(msg.date).getDate()}
                                                    </span>
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-xl font-medium text-white/80 group-hover:text-white mb-2 transition-colors">
                                                        {msg.title}
                                                    </h3>
                                                    <div className="text-sm text-white/40 line-clamp-3 leading-relaxed font-light prose prose-invert prose-sm max-w-none [&>p]:m-0 [&>img]:rounded-md [&>img]:mt-2">
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                            {msg.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            {i < data[expandedMonth].messages.length - 1 && (
                                                <Separator className="bg-white/5" />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </ScrollArea>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
