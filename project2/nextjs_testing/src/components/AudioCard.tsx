"use client";

import React, { useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AudioCardProps {
  audioSrc: string;
  title?: string;
}

const AudioCard: React.FC<AudioCardProps> = ({ audioSrc, title = '音频播放器' }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
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
//   bg-white/80 dark:bg-black/30
  return (
    <Card className="bg-gradient-to-tr from-cyan-200 to-grey-800">
      <CardHeader className="w-full flex flex-col items-center pb-2">
        <CardTitle className="font-mono text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center gap-2">
        <audio ref={audioRef} src={audioSrc} loop preload="auto" />
        <Button onClick={handlePlayPause} className="w-full" size="sm">
          {playing ? 'STOP' : 'MAKE IT'}
        </Button>
        <div className="w-full flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-500">VOLUME</span>
          <Slider
            defaultValue={[volume]}
            max={100}
            step={1}
            value={[volume]}
            onValueChange={handleVolumeChange}
            className="flex-1 mx-2"
          />
          <span className="text-sm text-gray-500 w-8 text-right">{volume}</span>
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default AudioCard; 