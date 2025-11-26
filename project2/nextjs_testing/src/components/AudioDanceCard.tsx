"use client";

import React, { useRef, useEffect, useState } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export default function AudioDanceCard({ className }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vudioRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (val: number[]) => {
    setVolume(val[0]);
    if (audioRef.current) {
      audioRef.current.volume = val[0] / 100;
    }
  };

  useEffect(() => {
    // 监听 audio 播放事件
    const handlePlay = () => {
      setPlaying(true);
      // @ts-ignore
      const Vudio = (window as any).Vudio;
      if (Vudio && audioRef.current && canvasRef.current && !vudioRef.current) {
        vudioRef.current = new Vudio(audioRef.current, canvasRef.current, { effect: 'waveform' });
        vudioRef.current.dance();
      }
    };

    const handlePause = () => {
      setPlaying(false);
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
      if (vudioRef.current) vudioRef.current.pause();
    };
  }, []);

  return (
    <Card className={cn('bg-grey-200 text-slate-900', className)}>
      <Script src="/libs/vudio.js" strategy="beforeInteractive" />
      <CardContent className="p-4 flex flex-col items-center bg-gradient-to-b from-black-800 via-white/50 to-black-800/30">
        <div className="mb-2 text-lg font-bold">make it rain.</div>
        <canvas
          ref={canvasRef}
          width={256}
          height={100}
          className="rounded-md border border-gray-300 bg-black w-full max-w-xs mx-auto mb-2"
          style={{ display: 'block' }}
        />
        <audio ref={audioRef} src="/rain.mp3" preload="auto" />
        <Button onClick={handlePlayPause} className="w-full max-w-xs" size="sm">
          {playing ? 'STOP' : 'MAKE IT'}
        </Button>
        <div className="w-full max-w-xs flex items-center gap-2 mt-2">
          <span className="text-sm opacity-60">VOLUME</span>
          <Slider
            defaultValue={[volume]}
            max={100}
            step={1}
            value={[volume]}
            onValueChange={handleVolumeChange}
            className="flex-1 mx-2"
          />
          <span className="text-sm opacity-60 w-8 text-right">{volume}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <p className="text-xs text-muted-foreground"></p>
      </CardFooter>
    </Card>
  );
}