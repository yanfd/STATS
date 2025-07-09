import React, { useRef, useEffect } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function AudioDanceCard() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let vudio: any = null;
    let timer: any = null;
    function tryInit() {
      // @ts-ignore
      const Vudio = (window as any).Vudio;
      console.log('Vudio:', Vudio, 'audio:', audioRef.current, 'canvas:', canvasRef.current);
      if (Vudio && audioRef.current && canvasRef.current) {
        vudio = new Vudio(audioRef.current, canvasRef.current, { effect: 'waveform' });
        vudio.dance();
      } else {
        timer = setTimeout(tryInit, 100);
      }
    }
    tryInit();
    return () => {
      if (vudio) vudio.pause();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <Card>
      <Script src="/libs/vudio.js" strategy="beforeInteractive" />
      <CardContent className="p-4 flex flex-col items-center bg-gradient-to-b from-black-800 via-white/50 to-black-800/30">
        <div className="mb-2 text-lg font-bold">雨声可视化</div>
        <canvas
          ref={canvasRef}
          width={256}
          height={100}
          className="rounded-md border border-gray-300 bg-black w-full max-w-xs mx-auto mb-2"
          style={{ display: 'block' }}
        />
        <audio ref={audioRef} src="/rain.mp3" preload='auto' controls className="w-full max-w-xs" />
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <p className="text-xs text-muted-foreground">make it rain.</p>
      </CardFooter>
    </Card>
  );
}