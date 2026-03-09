"use client";

import { useState, useEffect, useRef } from 'react';
import DJCanvas from '@/components/dj_backdrop/DJCanvas';
import { useAudioAnalyzer } from '@/components/dj_backdrop/useAudioAnalyzer';
import {
  GenreType,
  genreThemes,
  genreList,
} from '@/components/dj_backdrop/GenreConfig';

const GLASS_BG = 'rgba(255,255,255,0.04)';
const GLASS_BORDER = 'rgba(255,255,255,0.08)';
const GLASS_BLUR = 'blur(24px)';

export default function DJBackdropPage() {
  const [genre, setGenre] = useState<GenreType>('jazz_hiphop');
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isListening, getAudioData, startListening, stopListening } =
    useAudioAnalyzer();

  const theme = genreThemes[genre];

  const scheduleHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 6000);
  };

  const handleStartMic = async () => {
    await startListening();
    scheduleHide();
  };

  const handleScreenTap = () => {
    setShowControls(true);
    scheduleHide();
  };

  useEffect(() => {
    scheduleHide();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (isListening) stopListening();
        else startListening();
      }
      if (e.key === '1') setGenre('jazz_hiphop');
      if (e.key === '2') setGenre('techno');
      if (e.key === 'Escape') {
        setShowControls((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isListening, startListening, stopListening]);

  return (
    <div
      className="fixed inset-0 bg-black overflow-hidden select-none"
      onClick={handleScreenTap}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      <DJCanvas
        genre={genre}
        getAudioData={getAudioData}
        isListening={isListening}
      />

      <div
        className={`fixed top-0 left-0 z-10 transition-all duration-700 ${
          showControls
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          background: GLASS_BG,
          borderRight: `1px solid ${GLASS_BORDER}`,
          borderBottom: `1px solid ${GLASS_BORDER}`,
          padding: '16px 28px',
        }}
      >
        <div
          className="text-[10px] tracking-[0.35em] uppercase mb-1"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          NOW PLAYING
        </div>
        <div
          className="text-lg font-bold tracking-[0.15em]"
          style={{ color: theme.colors.primary }}
        >
          {theme.label}
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 z-10 transition-all duration-700 ${
          showControls
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          background: GLASS_BG,
          borderLeft: `1px solid ${GLASS_BORDER}`,
          borderBottom: `1px solid ${GLASS_BORDER}`,
          padding: '16px 24px',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 ${
              isListening ? 'bg-green-400 animate-pulse' : 'bg-red-500/60'
            }`}
          />
          <span
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {isListening ? 'MIC LIVE' : 'MIC OFF'}
          </span>
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between transition-all duration-700 ${
          showControls
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          background: GLASS_BG,
          borderTop: `1px solid ${GLASS_BORDER}`,
          padding: '14px 20px',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            isListening ? stopListening() : handleStartMic();
          }}
          className="transition-colors"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: isListening
              ? 'rgba(74,222,128,0.08)'
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${
              isListening ? 'rgba(74,222,128,0.25)' : GLASS_BORDER
            }`,
            padding: '10px 24px',
            color: isListening ? '#4ade80' : 'rgba(255,255,255,0.5)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
          }}
        >
          {isListening ? '■ STOP' : '● START MIC'}
        </button>

        <div className="flex items-center gap-0">
          {genreList.map((g, idx) => (
            <button
              key={g}
              onClick={(e) => {
                e.stopPropagation();
                setGenre(g);
              }}
              className="transition-all"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                background:
                  genre === g
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(255,255,255,0.02)',
                border: `1px solid ${
                  genre === g
                    ? genreThemes[g].colors.primary + '40'
                    : GLASS_BORDER
                }`,
                padding: '10px 28px',
                color:
                  genre === g
                    ? genreThemes[g].colors.primary
                    : 'rgba(255,255,255,0.35)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase' as const,
                marginLeft: idx > 0 ? '-1px' : '0',
              }}
            >
              {genreThemes[g].label}
            </button>
          ))}
        </div>

        <div
          className="hidden md:flex items-center gap-4"
          style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', letterSpacing: '0.15em' }}
        >
          <span>SPACE: MIC</span>
          <span>1/2: GENRE</span>
          <span>ESC: UI</span>
        </div>
      </div>
    </div>
  );
}
