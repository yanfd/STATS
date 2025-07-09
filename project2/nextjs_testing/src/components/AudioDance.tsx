import React, { useRef, useEffect } from 'react';
import Script from 'next/script';

export default function AudioDanceTest() {
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
    <>
      <Script src="/libs/vudio.js" strategy="beforeInteractive" />
      <canvas ref={canvasRef} width={256} height={100} style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto 16px' }} />
      <audio ref={audioRef} src="/rain.mp3" controls style={{ width: '100%' }} />
    </>
  );
}