"use client";

import React, { useEffect, useRef } from 'react';

interface RainDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  color: string;
  thickness: number;
}

interface Splash {
  x: number;
  y: number;
  particles: SplashParticle[];
  life: number;
}

interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  opacity: number;
}

const MonochromeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const rainDropsRef = useRef<RainDrop[]>([]);
  const splashesRef = useRef<Splash[]>([]);

  const grayColors = [
    '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', 
    '#ced4da', '#adb5bd', '#6c757d', '#495057',
    '#343a40', '#212529'
  ];

  const createRainDrop = (canvas: HTMLCanvasElement) => {
    return {
      x: Math.random() * canvas.width,
      y: -50,
      vx: (Math.random() - 0.5) * 1, // Slight horizontal drift
      vy: Math.random() * 3 + 8, // Falling speed
      length: Math.random() * 20 + 15,
      opacity: Math.random() * 0.6 + 0.2,
      color: grayColors[Math.floor(Math.random() * grayColors.length)],
      thickness: Math.random() * 1 + 0.5
    };
  };

  const createSplash = (x: number, y: number) => {
    const particles: SplashParticle[] = [];
    const particleCount = Math.random() * 8 + 4;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 4 - 1,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    return {
      x,
      y,
      particles,
      life: 1
    };
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark rain atmosphere with subtle fade
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add new raindrops
    if (Math.random() < 0.3) {
      rainDropsRef.current.push(createRainDrop(canvas));
    }

    // Update and draw raindrops
    rainDropsRef.current.forEach((drop, index) => {
      drop.x += drop.vx;
      drop.y += drop.vy;

      // Check if raindrop hits ground
      if (drop.y >= canvas.height - 20) {
        // Create splash effect
        if (Math.random() < 0.4) { // Not every drop creates a splash
          splashesRef.current.push(createSplash(drop.x, canvas.height - 20));
        }
        rainDropsRef.current.splice(index, 1);
        return;
      }

      // Remove raindrops that go off screen horizontally
      if (drop.x < -50 || drop.x > canvas.width + 50) {
        rainDropsRef.current.splice(index, 1);
        return;
      }

      // Draw raindrop
      ctx.save();
      ctx.globalAlpha = drop.opacity;
      ctx.strokeStyle = drop.color;
      ctx.lineWidth = drop.thickness;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - drop.vx * 2, drop.y - drop.length);
      ctx.stroke();
      
      ctx.restore();
    });

    // Update and draw splashes
    splashesRef.current.forEach((splash, splashIndex) => {
      splash.life -= 0.02;

      splash.particles.forEach((particle, particleIndex) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.2; // Gravity on splash particles
        particle.life -= particle.decay;

        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life * particle.opacity;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          splash.particles.splice(particleIndex, 1);
        }
      });

      // Remove splash when all particles are gone
      if (splash.particles.length === 0 || splash.life <= 0) {
        splashesRef.current.splice(splashIndex, 1);
      }
    });

    // Keep raindrop array from getting too large
    if (rainDropsRef.current.length > 200) {
      rainDropsRef.current.splice(0, 50);
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize with dark background
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Start animation
    setTimeout(() => {
      animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default MonochromeRain;