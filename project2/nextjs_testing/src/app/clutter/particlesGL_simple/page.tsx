"use client";

declare global {
  interface Window {
    particlesGL?: any;
    THREE?: any;
  }
}

import React, { useEffect, useRef, useState } from 'react';

export default function ParticleGL() {
  const initialized = useRef(false);
  const [status, setStatus] = useState('Loading...');

  // 加载脚本
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  };

  // 初始化粒子效果
  const initParticles = async () => {
    if (initialized.current) return;

    try {
      setStatus('Loading scripts...');
      
      // 加载Three.js
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      
      // 加载particlesGL
      await loadScript('/scripts/particlesGL.min.js');
      
      // 等待脚本准备好
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setStatus('Initializing...');

      // 初始化粒子效果
      window.particlesGL({
        target: ".particlesGL",
        character: "T",
        particleColor: "white",
        particleSize: 0.05,
        
        on: {
          init() {
            setStatus('Ready!');
            initialized.current = true;
          }
        }
      });

    } catch (error) {
      setStatus('Failed to load');
      console.error(error);
    }
  };

  useEffect(() => {
    initParticles();
  }, []);

  return (
    <div className=''> 
    {/* className="dark min-h-screen text-foreground relative overflow-hidden bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]" */}
      
      {/* 简单状态显示 */}
      <div className="fixed top-4 left-4 bg-black text-white px-3 py-2 rounded text-sm">
        Status: {status}
      </div>
      
      {/* 内容区域 */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          
          {/* 这些文字会被转换成粒子 */}
          <h1 className="particlesGL text-10xl font-bold text-white mb-8">
            TEST.
          </h1>
          
          <p className="particlesGL text-2xl text-white">
            Move your mouse
          </p>
          
          {/* 这个文字不会变成粒子 */}
          <p className="text-white mt-8">
            This text stays normal
          </p>
          
        </div>
      </div>
    </div>
  );
}