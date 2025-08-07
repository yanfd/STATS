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

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const fireworksRef = useRef<Firework[]>([]);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
    '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9'
  ];

  const createFirework = (canvas: HTMLCanvasElement) => {
    const firework: Firework = {
      x: Math.random() * canvas.width,
      y: canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 15 - 10,
      exploded: false,
      color: colors[Math.floor(Math.random() * colors.length)],
      particles: []
    };
    return firework;
  };

  const explode = (firework: Firework) => {
    const particleCount = 30 + Math.random() * 20;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const velocity = Math.random() * 8 + 2;
      const particle: Particle = {
        x: firework.x,
        y: firework.y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        decay: Math.random() * 0.03 + 0.01,
        color: firework.color,
        size: Math.random() * 3 + 1
      };
      firework.particles.push(particle);
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.03) {
      fireworksRef.current.push(createFirework(canvas));
    }

    fireworksRef.current.forEach((firework, fireworkIndex) => {
      if (!firework.exploded) {
        firework.x += firework.vx;
        firework.y += firework.vy;
        firework.vy += 0.3;

        ctx.beginPath();
        ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();

        if (firework.vy >= 0 || firework.y <= canvas.height * 0.3) {
          firework.exploded = true;
          explode(firework);
        }
      }

      firework.particles.forEach((particle, particleIndex) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1;
        particle.life -= particle.decay;

        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
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

    animate();

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

export default Fireworks;