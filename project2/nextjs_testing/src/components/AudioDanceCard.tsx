import React, { useRef, useEffect } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function AudioDanceCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vudioRef = useRef<any>(null);

  useEffect(() => {
    // 监听 audio 播放事件
    const handlePlay = () => {
      // @ts-ignore
      const Vudio = (window as any).Vudio;
      if (Vudio && audioRef.current && canvasRef.current && !vudioRef.current) {
        vudioRef.current = new Vudio(audioRef.current, canvasRef.current, { effect: 'waveform' });
        vudioRef.current.dance();
      }
    };
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', handlePlay);
    }
    return () => {
      if (audio) audio.removeEventListener('play', handlePlay);
      if (vudioRef.current) vudioRef.current.pause();
    };
  }, []);

  return (
    <Card className='bg-grey-200'>
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
        <audio ref={audioRef} src="/rain.mp3" controls className="w-full max-w-xs" preload="auto" />
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <p className="text-xs text-muted-foreground"></p>
      </CardFooter>
    </Card>
  );
}