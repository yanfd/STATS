"use client";

import React, { useMemo } from 'react';

interface AtmosphereBackgroundProps {
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    weather: 'sunny' | 'rain' | 'snow';
}

export default function AtmosphereBackground({ season, weather }: AtmosphereBackgroundProps) {

    // Gradients Config (Deep, moody, premium)
    const gradients = useMemo(() => {
        switch (season) {
            case 'spring':
                return 'radial-gradient(circle at 50% 10%, #2D3A2F 0%, #1A221C 40%, #0D110E 100%)'; // Deep Moss
            case 'summer':
                return 'radial-gradient(circle at 50% 10%, #1B352C 0%, #0F1F1A 40%, #050A08 100%)'; // Deep Forest
            case 'autumn':
                return 'radial-gradient(circle at 50% 10%, #3E2723 0%, #281815 40%, #120B09 100%)'; // Deep Earth
            case 'winter':
                return 'radial-gradient(circle at 50% 10%, #263238 0%, #161D21 40%, #0B0E10 100%)'; // Deep Slate
        }
    }, [season]);

    // Weather Overlay Opacity (Darken for storms)
    const overlayOpacity = weather === 'rain' || weather === 'snow' ? 0.3 : 0;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out">
            {/* Base Gradient Layer */}
            <div
                className="absolute inset-0 transition-colors duration-1000"
                style={{ background: gradients }}
            />

            {/* Weather Dimmer */}
            <div
                className="absolute inset-0 bg-black transition-opacity duration-1000"
                style={{ opacity: overlayOpacity }}
            />

            {/* Noise Texture (SVG Data URI) */}
            <div
                className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
    );
}
