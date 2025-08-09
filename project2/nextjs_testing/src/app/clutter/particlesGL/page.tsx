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
  const loadingRef = useRef(false);
  const [status, setStatus] = useState('Initializing...');
  const [error, setError] = useState<string | null>(null);

  // 手动加载脚本的函数
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 检查脚本是否已经存在
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = false; // 确保按顺序加载
      
      script.onload = () => {
        console.log(`✅ Script loaded: ${src}`);
        resolve();
      };
      
      script.onerror = (error) => {
        console.error(`❌ Failed to load script: ${src}`, error);
        reject(new Error(`Failed to load ${src}`));
      };
      
      document.head.appendChild(script);
    });
  };

  // 检查全局对象是否可用
  const waitForGlobals = async (maxAttempts = 10) => {
    for (let i = 0; i < maxAttempts; i++) {
      if (window.THREE && window.particlesGL) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    return false;
  };

  const initializeParticles = async () => {
    if (initialized.current || loadingRef.current) return;
    loadingRef.current = true;

    try {
      setStatus('Loading Three.js...');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      
      setStatus('Loading ParticlesGL...');
      await loadScript('/scripts/particlesGL.min.js');
      
      setStatus('Waiting for libraries to initialize...');
      const globalsReady = await waitForGlobals();
      
      if (!globalsReady) {
        throw new Error('Libraries failed to initialize after loading');
      }

      // 确保DOM元素已准备好
      await new Promise(resolve => setTimeout(resolve, 100));

      setStatus('Initializing particle system...');
      
      // 检查目标元素
      const targets = document.querySelectorAll('.particlesGL');
      if (targets.length === 0) {
        throw new Error('No target elements found');
      }

      console.log(`Found ${targets.length} target elements`);

      // 初始化particlesGL
      const particleEffect = window.particlesGL({
        target: ".particlesGL",
        character: "T",
        particleSize: 0.03,
        particleSpacing: 0.004,
        particleColor: "white", //simple
        sampling: 3,
        tilt: true,
        tiltFactor: 0.4,
        tiltSpeed: 0.1,
        displaceStrength: 1.0,
        displaceRadius: 0.2,
        velocityInfluence: 0.5,
        returnSpeed: 0.08,
        fontSize: 56,
        fontFamily: "system-ui, -apple-system, sans-serif",
        on: {
          init(instance: any) {
            console.log("🎉 ParticlesGL initialized successfully!", instance);
            setStatus('Ready! Move your mouse to see the effect');
            setError(null);
            initialized.current = true;
            loadingRef.current = false;
          },
        },
      });

      console.log('ParticlesGL instance created:', particleEffect);

    } catch (err: any) {
      console.error('❌ Initialization failed:', err);
      setError(err.message);
      setStatus('Failed to initialize');
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    // 延迟初始化确保DOM完全加载
    const timer = setTimeout(() => {
      initializeParticles();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="dark min-h-screen text-foreground relative overflow-hidden bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]">
      
      {/* 状态显示 */}
      <div className="fixed top-4 left-4 bg-black/80 text-white px-4 py-3 rounded-lg backdrop-blur-sm z-50 max-w-sm">
        <div className="flex items-center space-x-2">
          {!initialized.current && !error && (
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          )}
          {initialized.current && (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          )}
          {error && (
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          )}
          <span className="text-sm font-medium">{status}</span>
        </div>
        
        {error && (
          <div className="mt-2 text-xs text-red-400 bg-red-500/10 p-2 rounded">
            {error}
          </div>
        )}

        {/* 调试信息 */}
        <div className="mt-2 text-xs text-gray-400 space-y-1">
          <div>THREE: {typeof window !== 'undefined' && window.THREE ? '✅' : '❌'}</div>
          <div>particlesGL: {typeof window !== 'undefined' && window.particlesGL ? '✅' : '❌'}</div>
          <div>Initialized: {initialized.current ? '✅' : '❌'}</div>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-16 shadow-2xl">
            
            {/* 粒子效果目标元素 */}
            <div className="space-y-12">
              <h1 className="particlesGL text-6xl font-black  bg-clip-text text-transparent leading-tight">
                PARTICLE
              </h1>
              
              <h2 className="particlesGL text-8xl font-black  bg-clip-text text-transparent leading-tight">
                YANFD
              </h2>
              
              <div className="particlesGL text-4xl font-black">
                PRODUCTS
              </div>
            </div>
            
            <div className="mt-16 space-y-6">
            
              
              {/* 使用提示 */}
              {initialized.current && (
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-300 text-sm">
                  🎉 Particle system is active! Try moving your mouse around the text above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}