"use client";

import React, { useEffect, useRef } from 'react';
import { GenreType, genreThemes } from './GenreConfig';
import type { AudioData } from './useAudioAnalyzer';

interface Props {
  genre: GenreType;
  getAudioData: () => AudioData;
  isListening: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  shape: 'circle' | 'rect' | 'triangle';
}

interface GlitchBlock {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  life: number;
}

const MAX_PARTICLES = 250;

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getIdleAudio(t: number): AudioData {
  const bass = 0.15 + Math.sin(t * 0.8) * 0.08 + Math.sin(t * 1.3) * 0.05;
  const mid = 0.1 + Math.sin(t * 1.2 + 1) * 0.06;
  const treble = 0.08 + Math.sin(t * 2.1 + 2) * 0.04;
  return {
    frequencyData: new Uint8Array(0),
    timeDomainData: new Uint8Array(0),
    bass,
    mid,
    treble,
    beat: false,
    energy: bass * 0.5 + mid * 0.3 + treble * 0.2,
  };
}

export default function DJCanvas({ genre, getAudioData, isListening }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const glitchRef = useRef<GlitchBlock[]>([]);
  const timeRef = useRef(0);
  const beatFlashRef = useRef(0);
  const genreRef = useRef(genre);
  const getAudioRef = useRef(getAudioData);
  const isListeningRef = useRef(isListening);

  useEffect(() => {
    genreRef.current = genre;
    particlesRef.current = [];
    glitchRef.current = [];
  }, [genre]);

  useEffect(() => {
    getAudioRef.current = getAudioData;
  }, [getAudioData]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;
      timeRef.current += 0.016;
      const t = timeRef.current;

      const currentGenre = genreRef.current;
      const theme = genreThemes[currentGenre];

      const audio = isListeningRef.current
        ? getAudioRef.current()
        : getIdleAudio(t);
      const { bass, mid, treble, beat, energy } = audio;

      if (beat) beatFlashRef.current = 1;
      beatFlashRef.current *= 0.9;

      ctx.globalCompositeOperation = 'source-over';
      const fadeAlpha = currentGenre === 'techno' ? 0.12 : 0.08;
      ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);

      if (currentGenre === 'jazz_hiphop') {
        renderJazzHiphop(ctx, w, h, t, audio, theme, dpr);
      } else {
        renderTechno(ctx, w, h, t, audio, theme, dpr);
      }

      renderParticles(ctx, dpr);

      if (beat) spawnBeatParticles(w, h, theme, currentGenre);

      if (beatFlashRef.current > 0.01) {
        renderBeatFlash(ctx, w, h, theme, beatFlashRef.current);
        renderEdgeGlow(ctx, w, h, theme, beatFlashRef.current, dpr);
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  function renderJazzHiphop(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    t: number,
    audio: AudioData,
    theme: (typeof genreThemes)['jazz_hiphop'],
    dpr: number
  ) {
    const { bass, mid, energy, treble } = audio;

    const bgGrad = ctx.createRadialGradient(
      w * (0.3 + Math.sin(t * 0.1) * 0.1),
      h * (0.4 + Math.cos(t * 0.08) * 0.1),
      0,
      w * 0.5,
      h * 0.5,
      w * 0.9
    );
    bgGrad.addColorStop(0, `rgba(35, 18, 10, ${0.04 + bass * 0.06})`);
    bgGrad.addColorStop(0.5, `rgba(20, 10, 25, ${0.02 + mid * 0.03})`);
    bgGrad.addColorStop(1, 'rgba(0,0,0,0.01)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'screen';

    for (let i = 0; i < 6; i++) {
      const cx =
        w * (0.15 + 0.14 * i) + Math.sin(t * 0.25 + i * 1.8) * w * 0.07;
      const cy =
        h * (0.25 + 0.08 * i) + Math.cos(t * 0.18 + i * 2.3) * h * 0.06;
      const r = (60 + bass * 140 + mid * 50) * dpr;
      const smokeGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const a = 0.015 + energy * 0.035;
      smokeGrad.addColorStop(0, `rgba(212, 165, 116, ${a})`);
      smokeGrad.addColorStop(0.4, `rgba(160, 82, 45, ${a * 0.6})`);
      smokeGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = smokeGrad;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    }

    for (let i = 0; i < 3; i++) {
      const ox = w * (0.3 + 0.2 * i) + Math.sin(t * 0.15 + i * 3) * w * 0.1;
      const oy =
        h * (0.5 + 0.1 * i) + Math.cos(t * 0.12 + i * 1.5) * h * 0.08;
      const or = (100 + bass * 200) * dpr;
      const orbGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
      const oa = 0.01 + bass * 0.03;
      orbGrad.addColorStop(0, `rgba(232, 192, 122, ${oa})`);
      orbGrad.addColorStop(0.6, `rgba(139, 105, 20, ${oa * 0.3})`);
      orbGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = orbGrad;
      ctx.fillRect(ox - or, oy - or, or * 2, or * 2);
    }

    ctx.globalCompositeOperation = 'source-over';

    if (audio.timeDomainData.length > 0) {
      const sliceWidth = w / audio.timeDomainData.length;
      const waveY = h * 0.72;
      const amplitude = (25 + energy * 90) * dpr;

      ctx.beginPath();
      for (let i = 0; i < audio.timeDomainData.length; i++) {
        const v = audio.timeDomainData[i] / 128.0 - 1;
        const x = i * sliceWidth;
        const y = waveY + v * amplitude;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = hexToRgba(
        theme.colors.primary,
        0.25 + energy * 0.45
      );
      ctx.lineWidth = 2 * dpr;
      ctx.shadowColor = theme.colors.primary;
      ctx.shadowBlur = 20 * dpr;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      for (let i = 0; i < audio.timeDomainData.length; i++) {
        const v = audio.timeDomainData[i] / 128.0 - 1;
        const x = i * sliceWidth;
        const y = waveY + v * amplitude * 0.5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = hexToRgba(theme.colors.accent, 0.15 + energy * 0.2);
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();
    } else {
      const waveY = h * 0.72;
      const amplitude = (15 + energy * 40) * dpr;
      ctx.beginPath();
      for (let i = 0; i < w; i += 2) {
        const v =
          Math.sin(i * 0.01 + t * 2) * 0.3 +
          Math.sin(i * 0.005 + t * 1.3) * 0.2 +
          Math.sin(i * 0.02 + t * 3.1) * 0.1;
        const y = waveY + v * amplitude;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.strokeStyle = hexToRgba(
        theme.colors.primary,
        0.2 + energy * 0.3
      );
      ctx.lineWidth = 2 * dpr;
      ctx.shadowColor = theme.colors.primary;
      ctx.shadowBlur = 15 * dpr;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    if (audio.frequencyData.length > 0) {
      const barCount = 80;
      const barWidth = w / barCount;
      const step = Math.max(
        1,
        Math.floor(audio.frequencyData.length / barCount)
      );

      for (let i = 0; i < barCount; i++) {
        const val = audio.frequencyData[i * step] / 255;
        const barH = val * h * 0.12;
        const a = 0.06 + val * 0.35;
        ctx.fillStyle = hexToRgba(theme.colors.primary, a);
        ctx.fillRect(i * barWidth, h - barH, barWidth - dpr, barH);
      }
    }

    if (bass > 0.3) {
      const count = Math.floor(bass * 3);
      for (let i = 0; i < count; i++) {
        if (particlesRef.current.length < MAX_PARTICLES) {
          particlesRef.current.push({
            x: Math.random() * w,
            y: h + 10,
            vx: (Math.random() - 0.5) * 1.5 * dpr,
            vy: (-0.5 - Math.random() * 2) * dpr,
            size: (3 + Math.random() * 6) * dpr,
            life: 1,
            maxLife: 1,
            color:
              theme.colors.particles[
                Math.floor(Math.random() * theme.colors.particles.length)
              ],
            rotation: 0,
            rotSpeed: 0,
            shape: 'circle',
          });
        }
      }
    }
  }

  function renderTechno(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    t: number,
    audio: AudioData,
    theme: (typeof genreThemes)['techno'],
    dpr: number
  ) {
    const { bass, mid, treble, energy, beat } = audio;

    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    bgGrad.addColorStop(0, `rgba(10, 10, 10, ${0.03 + bass * 0.07})`);
    bgGrad.addColorStop(1, 'rgba(0,0,0,0.01)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const gridIntensity = 0.04 + bass * 0.25;
    const gridLineWidth = (1 + bass * 1.5) * dpr;
    ctx.lineWidth = gridLineWidth;

    const vanishY = h * 0.25;
    const horizLines = 28;
    const gridSpeed = 50 + energy * 80;
    const gridOffset = (t * gridSpeed * dpr) % (h * 0.08);

    for (let i = 0; i <= horizLines; i++) {
      const progress = i / horizLines;
      const y = vanishY + (h - vanishY) * Math.pow(progress, 1.5) + gridOffset * progress;
      if (y > h) continue;
      const spread = progress * w * 0.9;
      const lineAlpha = gridIntensity * progress;

      ctx.beginPath();
      ctx.moveTo(w / 2 - spread, y);
      ctx.lineTo(w / 2 + spread, y);
      ctx.strokeStyle = `rgba(180, 180, 180, ${lineAlpha})`;
      if (progress > 0.7) {
        ctx.shadowColor = 'rgba(255,255,255,0.15)';
        ctx.shadowBlur = 4 * dpr;
      }
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    const vertLines = 20;
    for (let i = -vertLines / 2; i <= vertLines / 2; i++) {
      const xEnd = w / 2 + i * (w / vertLines);
      const lineAlpha = gridIntensity * 0.6;
      ctx.beginPath();
      ctx.moveTo(w / 2, vanishY);
      ctx.lineTo(xEnd, h);
      ctx.strokeStyle = `rgba(160, 160, 160, ${lineAlpha})`;
      ctx.stroke();
    }
    ctx.restore();

    ctx.globalCompositeOperation = 'screen';
    const ringCount = 3 + Math.floor(energy * 4);
    for (let i = 0; i < ringCount; i++) {
      const phase = (t * 0.4 + i * 0.35) % 2;
      const ringRadius = phase * Math.max(w, h) * 0.5;
      const ringAlpha = Math.max(0, (1 - phase / 2)) * (0.02 + bass * 0.08);
      const ringWidth = (1 + bass * 3) * dpr;

      ctx.beginPath();
      ctx.arc(w / 2, h * 0.48, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200, 200, 200, ${ringAlpha})`;
      ctx.lineWidth = ringWidth;
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';

    if (audio.frequencyData.length > 0) {
      const barCount = 72;
      const barWidth = (w * 0.55) / barCount;
      const step = Math.max(
        1,
        Math.floor(audio.frequencyData.length / barCount)
      );
      const centerY = h * 0.48;

      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < barCount; i++) {
        const val = audio.frequencyData[i * step] / 255;
        const barH = val * h * 0.5;
        const brightness = Math.floor(100 + (1 - i / barCount) * 155);
        const barAlpha = 0.1 + val * 0.7;

        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${barAlpha})`;

        const xR = w / 2 + i * barWidth + 2 * dpr;
        ctx.fillRect(xR, centerY - barH / 2, barWidth - dpr, barH);

        const xL = w / 2 - (i + 1) * barWidth - 2 * dpr;
        ctx.fillRect(xL, centerY - barH / 2, barWidth - dpr, barH);

        if (val > 0.5) {
          ctx.shadowColor = `rgba(255, 255, 255, ${0.2 + val * 0.3})`;
          ctx.shadowBlur = (4 + val * 10) * dpr;
          ctx.fillRect(xR, centerY - barH / 2, barWidth - dpr, barH);
          ctx.fillRect(xL, centerY - barH / 2, barWidth - dpr, barH);
          ctx.shadowBlur = 0;
        }
      }

      const radialBars = 36;
      const radialStep = Math.max(1, Math.floor(audio.frequencyData.length / radialBars));
      for (let i = 0; i < radialBars; i++) {
        const val = audio.frequencyData[i * radialStep] / 255;
        const angle = (Math.PI * 2 * i) / radialBars;
        const innerR = (60 + mid * 40) * dpr;
        const outerR = innerR + val * 120 * dpr;
        const x1 = w / 2 + Math.cos(angle) * innerR;
        const y1 = h * 0.48 + Math.sin(angle) * innerR;
        const x2 = w / 2 + Math.cos(angle) * outerR;
        const y2 = h * 0.48 + Math.sin(angle) * outerR;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(200, 200, 200, ${0.05 + val * 0.25})`;
        ctx.lineWidth = (2 + val * 2) * dpr;
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'source-over';
    } else {
      const barCount = 72;
      const barWidth = (w * 0.55) / barCount;
      const centerY = h * 0.48;

      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < barCount; i++) {
        const val =
          0.08 +
          Math.sin(t * 1.5 + i * 0.3) * 0.12 +
          Math.sin(t * 2.3 + i * 0.5) * 0.06;
        const barH = val * h * 0.35;
        const brightness = Math.floor(100 + (1 - i / barCount) * 120);

        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${0.04 + val * 0.2})`;
        const xR = w / 2 + i * barWidth + 2 * dpr;
        ctx.fillRect(xR, centerY - barH / 2, barWidth - dpr, barH);
        const xL = w / 2 - (i + 1) * barWidth - 2 * dpr;
        ctx.fillRect(xL, centerY - barH / 2, barWidth - dpr, barH);
      }

      const radialBars = 36;
      for (let i = 0; i < radialBars; i++) {
        const val = 0.1 + Math.sin(t * 1.2 + i * 0.5) * 0.08;
        const angle = (Math.PI * 2 * i) / radialBars;
        const innerR = 50 * dpr;
        const outerR = innerR + val * 60 * dpr;
        const x1 = w / 2 + Math.cos(angle) * innerR;
        const y1 = h * 0.48 + Math.sin(angle) * innerR;
        const x2 = w / 2 + Math.cos(angle) * outerR;
        const y2 = h * 0.48 + Math.sin(angle) * outerR;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(180, 180, 180, ${0.03 + val * 0.1})`;
        ctx.lineWidth = 2 * dpr;
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    if (beat) {
      const glitchCount = 4 + Math.floor(Math.random() * 6);
      for (let i = 0; i < glitchCount; i++) {
        glitchRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          w: (20 + Math.random() * 150) * dpr,
          h: (3 + Math.random() * 12) * dpr,
          color:
            theme.colors.particles[
              Math.floor(Math.random() * theme.colors.particles.length)
            ],
          life: 1,
        });
      }
    }

    glitchRef.current = glitchRef.current.filter((block) => {
      block.life -= 0.05;
      if (block.life <= 0) return false;
      ctx.globalAlpha = block.life * 0.6;
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.w, block.h);
      ctx.globalAlpha = 1;
      return true;
    });

    ctx.globalCompositeOperation = 'screen';
    const orbCount = 5;
    for (let i = 0; i < orbCount; i++) {
      const angle = (Math.PI * 2 * i) / orbCount + t * (0.2 + i * 0.05);
      const dist = (100 + energy * 250 + Math.sin(t * 0.5 + i) * 50) * dpr;
      const lx = w / 2 + Math.cos(angle) * dist;
      const ly = h * 0.48 + Math.sin(angle) * dist * 0.6;
      const lr = (15 + bass * 80) * dpr;
      const laserGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr);
      const orbAlpha = 0.02 + energy * 0.06 + bass * 0.04;
      laserGrad.addColorStop(0, `rgba(220, 220, 220, ${orbAlpha})`);
      laserGrad.addColorStop(0.5, `rgba(150, 150, 150, ${orbAlpha * 0.3})`);
      laserGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = laserGrad;
      ctx.fillRect(lx - lr, ly - lr, lr * 2, lr * 2);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function renderParticles(ctx: CanvasRenderingContext2D, dpr: number) {
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1 / (p.maxLife * 60);
      p.rotation += p.rotSpeed;

      if (p.life <= 0) return false;

      const alpha = Math.min(1, p.life * 2) * (p.life > 0.8 ? (1 - p.life) * 5 : 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
      } else if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else if (p.shape === 'triangle') {
        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(-s * 0.866, s * 0.5);
        ctx.lineTo(s * 0.866, s * 0.5);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
      return true;
    });
  }

  function spawnBeatParticles(
    w: number,
    h: number,
    theme: (typeof genreThemes)[GenreType],
    genre: GenreType
  ) {
    const count = genre === 'techno' ? 18 : 8;

    for (let i = 0; i < count; i++) {
      if (particlesRef.current.length >= MAX_PARTICLES) break;

      const dpr = window.devicePixelRatio || 1;
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const speed = (2 + Math.random() * 5) * dpr;

      const cx = w / 2 + (Math.random() - 0.5) * w * 0.2;
      const cy = h / 2 + (Math.random() - 0.5) * h * 0.2;

      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size:
          genre === 'techno'
            ? (2 + Math.random() * 5) * dpr
            : (3 + Math.random() * 8) * dpr,
        life: 1,
        maxLife: genre === 'techno' ? 0.8 : 1.5,
        color:
          theme.colors.particles[
            Math.floor(Math.random() * theme.colors.particles.length)
          ],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed:
          genre === 'techno' ? (Math.random() - 0.5) * 0.15 : 0,
        shape:
          genre === 'techno'
            ? (['rect', 'triangle'] as const)[Math.floor(Math.random() * 2)]
            : 'circle',
      });
    }
  }

  function renderBeatFlash(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    theme: (typeof genreThemes)[GenreType],
    intensity: number
  ) {
    ctx.globalCompositeOperation = 'screen';
    const flashGrad = ctx.createRadialGradient(
      w / 2,
      h / 2,
      0,
      w / 2,
      h / 2,
      w * 0.6
    );
    flashGrad.addColorStop(
      0,
      hexToRgba(theme.colors.primary, intensity * 0.12)
    );
    flashGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flashGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';
  }

  function renderEdgeGlow(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    theme: (typeof genreThemes)[GenreType],
    intensity: number,
    dpr: number
  ) {
    const glowSize = 60 * dpr;
    const alpha = intensity * 0.25;

    ctx.globalCompositeOperation = 'screen';

    const topGrad = ctx.createLinearGradient(0, 0, 0, glowSize);
    topGrad.addColorStop(0, hexToRgba(theme.colors.primary, alpha));
    topGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, w, glowSize);

    const botGrad = ctx.createLinearGradient(0, h, 0, h - glowSize);
    botGrad.addColorStop(0, hexToRgba(theme.colors.secondary, alpha));
    botGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, h - glowSize, w, glowSize);

    const leftGrad = ctx.createLinearGradient(0, 0, glowSize, 0);
    leftGrad.addColorStop(0, hexToRgba(theme.colors.primary, alpha * 0.5));
    leftGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = leftGrad;
    ctx.fillRect(0, 0, glowSize, h);

    const rightGrad = ctx.createLinearGradient(w, 0, w - glowSize, 0);
    rightGrad.addColorStop(0, hexToRgba(theme.colors.secondary, alpha * 0.5));
    rightGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = rightGrad;
    ctx.fillRect(w - glowSize, 0, glowSize, h);

    ctx.globalCompositeOperation = 'source-over';
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ background: '#000' }}
    />
  );
}
