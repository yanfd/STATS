"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  vx: number;
  vy: number;
  exploded: boolean;
  color: string;
  particles: Particle[];
}

const MonochromeFireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const initialFireworkTriggeredRef = useRef(false);

  const colors = [
    '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', 
    '#ced4da', '#adb5bd', '#6c757d', '#495057'
  ];

  const createFirework = (canvas: HTMLCanvasElement, x?: number, y?: number, isInitial: boolean = false) => {
    const firework: Firework = {
      x: x ?? Math.random() * canvas.width,
      y: y ?? canvas.height,
      vx: isInitial ? 0 : (Math.random() - 0.5) * 2, // Slower horizontal velocity
      vy: isInitial ? 0 : -Math.random() * 8 - 6, // Slower vertical velocity
      exploded: isInitial,
      color: colors[Math.floor(Math.random() * colors.length)],
      particles: []
    };
    
    if (isInitial) {
      explode(firework, true);
    }
    
    return firework;
  };

  const explode = (firework: Firework, isBig?: boolean) => {
    const particleCount = isBig ? 80 : 20 + Math.random() * 15; // More particles for big firework
    const maxVelocity = isBig ? 12 : 6; // Higher velocity for big firework
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
      const velocity = Math.random() * maxVelocity + (isBig ? 3 : 1);
      const particle: Particle = {
        x: firework.x,
        y: firework.y,
        vx: Math.cos(angle) * velocity * 0.7, // Slower particles
        vy: Math.sin(angle) * velocity * 0.7, // Slower particles
        life: isBig ? 1.5 : 1, // Longer life for big firework
        decay: Math.random() * 0.015 + 0.005, // Slower decay
        color: firework.color,
        size: isBig ? Math.random() * 4 + 2 : Math.random() * 2 + 1 // Bigger particles for big firework
      };
      firework.particles.push(particle);
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Slower fade effect for trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Trigger initial big firework in the center
    if (!initialFireworkTriggeredRef.current) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      fireworksRef.current.push(createFirework(canvas, centerX, centerY, true));
      initialFireworkTriggeredRef.current = true;
    }

    // Add new regular fireworks less frequently
    if (Math.random() < 0.015) { // Reduced frequency
      fireworksRef.current.push(createFirework(canvas));
    }

    fireworksRef.current.forEach((firework, fireworkIndex) => {
      if (!firework.exploded) {
        firework.x += firework.vx * 0.8; // Slower movement
        firework.y += firework.vy * 0.8; // Slower movement
        firework.vy += 0.2; // Slower gravity

        ctx.beginPath();
        ctx.arc(firework.x, firework.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();

        if (firework.vy >= 0 || firework.y <= canvas.height * 0.4) {
          firework.exploded = true;
          explode(firework);
        }
      }

      firework.particles.forEach((particle, particleIndex) => {
        particle.x += particle.vx * 0.8; // Slower particle movement
        particle.y += particle.vy * 0.8; // Slower particle movement
        particle.vy += 0.05; // Slower particle gravity
        particle.life -= particle.decay;

        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life * 0.8; // Slightly more transparent
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.restore();
        } else {
          firework.particles.splice(particleIndex, 1);
        }
      });

      if (firework.exploded && firework.particles.length === 0) {
        fireworksRef.current.splice(fireworkIndex, 1);
      }
    });

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

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Start animation with a small delay to ensure canvas is ready
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

export default MonochromeFireworks;