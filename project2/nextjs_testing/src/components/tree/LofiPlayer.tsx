"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample Lofi stream (using a placeholder or a reliable public stream if available)
// For now, we'll use a placeholder URL. In a real app, this would be a real stream.
const LOFI_STREAM_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3";

export default function LofiPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <motion.div
            className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-lg z-30 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <audio ref={audioRef} src={LOFI_STREAM_URL} loop />

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800/10 flex items-center justify-center">
                    <Music size={18} className="text-slate-700" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Now Playing</span>
                    <span className="text-sm font-bold text-slate-800">Lofi Beats</span>
                </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-400/30 mx-2" />

            <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
            >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
            </button>

            <button
                onClick={toggleMute}
                className="p-2 text-slate-700 hover:bg-slate-800/10 rounded-full transition-colors"
            >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
        </motion.div>
    );
}
