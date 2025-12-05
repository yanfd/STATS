"use client";

import React, { useEffect, useRef } from 'react';

interface WeatherOverlayProps {
    weather: 'sunny' | 'rain' | 'snow';
}

export default function WeatherOverlay({ weather }: WeatherOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (weather === 'sunny') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Array<{ x: number; y: number; speed: number; size: number }> = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const count = weather === 'rain' ? 100 : 50;
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: weather === 'rain' ? Math.random() * 5 + 10 : Math.random() * 1 + 1,
                    size: weather === 'rain' ? Math.random() * 2 + 10 : Math.random() * 3 + 2,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = weather === 'rain' ? '#A0C4FF' : '#FFFFFF';
            ctx.strokeStyle = '#A0C4FF';
            ctx.lineWidth = 1;

            particles.forEach((p) => {
                if (weather === 'rain') {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x, p.y + p.size);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                p.y += p.speed;
                if (p.y > canvas.height) {
                    p.y = -p.size;
                    p.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        createParticles();
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [weather]);

    if (weather === 'sunny') return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-20 opacity-60"
        />
    );
}
