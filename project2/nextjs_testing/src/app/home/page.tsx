"use client";

import React, { useRef, useEffect } from 'react';
import Script from 'next/script';

export default function AudioDance() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 检查 Vudio 是否挂载
    // @ts-ignore
    const Vudio = (window as any).Vudio;
    console.log('Vudio:', Vudio, 'audio:', audioRef.current, 'canvas:', canvasRef.current);
    if (Vudio && audioRef.current && canvasRef.current) {
      const vudio = new Vudio(audioRef.current, canvasRef.current, { effect: 'waveform' });
      vudio.dance();
      return () => vudio.pause();
    }
  }, []);

  return (
    <>
      {/* 引入 vudio.js 脚本 */}
      <Script src="/libs/vudio.js" strategy="beforeInteractive" />
      <div>
        <canvas ref={canvasRef} width={256} height={100} style={{ border: '1px solid #ccc' }} />
        <audio ref={audioRef} src="/rain.mp3" controls />
      </div>
    </>
  );
}