"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, SkipBack, SkipForward, ChevronDown, ChevronUp, ListMusic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Playlist Data
const PLAYLIST = [
    { title: "Lofi Study", url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3" },
    { title: "Chill Vibes", url: "https://cdn.pixabay.com/download/audio/2022/02/10/audio_d38cc01e8d.mp3?filename=lofi-chill-112763.mp3" }, // Placeholder different URL
    { title: "Night Rain", url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=lofi-rain-112764.mp3" }, // Placeholder different URL
];

export default function LofiPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Autoplay prevented", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
            if (audioRef.current) audioRef.current.muted = false;
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    };

    return (
        <motion.div
            className="absolute bottom-8 right-8 z-30 flex flex-col items-end gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={PLAYLIST[currentTrack].url}
                loop={false}
                onEnded={nextTrack}
            />

            {/* Toggle Button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 hover:bg-black/60 hover:text-white transition-all border border-white/10"
                title={isVisible ? "Hide Player" : "Show Player"}
            >
                {isVisible ? <ChevronDown size={20} /> : <Music size={20} />}
            </button>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl w-72"
                    >
                        {/* Track Info */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center border border-white/10">
                                <ListMusic size={20} className="text-white/80" />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-medium text-white/50 uppercase tracking-wider">Now Playing</span>
                                <span className="text-sm font-bold text-white truncate">{PLAYLIST[currentTrack].title}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-3">
                            {/* Progress/Volume Bar (Simplified as Volume for now) */}
                            <div className="flex items-center gap-2">
                                <button onClick={toggleMute} className="text-white/60 hover:text-white">
                                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                                />
                            </div>

                            {/* Playback Buttons */}
                            <div className="flex items-center justify-between px-2">
                                <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors">
                                    <SkipBack size={20} />
                                </button>

                                <button
                                    onClick={togglePlay}
                                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-transform hover:scale-105 active:scale-95"
                                >
                                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                                </button>

                                <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors">
                                    <SkipForward size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
