"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

/* ============================================================
   mood lines — cycle through these
   ============================================================ */

const MOOD_LINES: Array<{ en: string; cn?: string }> = [
  { en: "Everything is quiet now.", cn: "一切都安静了" },
  { en: "I am somewhere between here and gone.", cn: "我在消失与存在之间" },
  { en: "The room is darker than it should be.", cn: "房间比应有的更暗" },
  { en: "Nothing hurts. That's the problem.", cn: "什么都不痛。这才是问题" },
  { en: "I keep forgetting to breathe.", cn: "我总忘记呼吸" },
  { en: "It smells like the end of something.", cn: "闻起来像某种终结" },
  { en: "I want to sleep but my brain won't let me.", cn: "想睡但大脑不允许" },
  { en: "The city is louder than I remember.", cn: "城市比我记忆中更吵" },
  { en: "I'm fine. I'm fine. I'm fine.", cn: "我没事。我没事。我没事。" },
  { en: "It's always 4am somewhere.", cn: "某个地方总是凌晨四点" },
];

/* ============================================================
   shader — cold dissociative aurora
   ============================================================ */

const SHADER_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
#define FC gl_FragCoord.xy
#define T time
#define R resolution

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1, 0)), u.x),
    mix(hash(i + vec2(0, 1)), hash(i + 1.0), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (FC - 0.5 * R) / min(R.x, R.y);
  float t = T * 0.15;

  // mouse influence (subtle)
  vec2 m = (mouse - 0.5) * 0.3;
  uv += m * 0.2;

  // layer 1: slow drifting noise field
  float n1 = fbm(uv * 2.0 + vec2(t * 0.3, t * 0.1));

  // layer 2: vertical streaks
  float n2 = fbm(vec2(uv.x * 4.0 + t * 0.1, uv.y * 0.8 - t * 0.2));

  // layer 3: central glow
  float glow = exp(-3.0 * dot(uv, uv));

  // combine — cold blue-purple palette
  vec3 col = vec3(0.0);
  col += vec3(0.02, 0.04, 0.08) * n1;           // deep dark base
  col += vec3(0.01, 0.03, 0.06) * n2;           // subtle streaks
  col += vec3(0.04, 0.02, 0.10) * glow * n1;    // purple center glow
  col += vec3(0.02, 0.06, 0.12) * pow(n1, 3.0); // occasional bright flicker

  // vignette
  float vig = 1.0 - 0.6 * dot(uv * 0.8, uv * 0.8);
  col *= vig;

  // ensure it stays dark
  col = clamp(col, 0.0, 0.15);

  O = vec4(col, 1.0);
}`;

/* ============================================================
   Shader background component
   ============================================================ */

function MoodShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", { antialias: false });
    if (!canvas || !gl) return;

    // shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    const prog = gl.createProgram()!;

    gl.shaderSource(vs, `#version 300 es
      precision highp float;
      in vec4 position;
      void main(){ gl_Position = position; }`);
    gl.compileShader(vs);

    gl.shaderSource(fs, SHADER_SRC);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error("frag:", gl.getShaderInfoLog(fs));
    }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // uniforms
    const uRes = gl.getUniformLocation(prog, "resolution");
    const uTime = gl.getUniformLocation(prog, "time");
    const uMouse = gl.getUniformLocation(prog, "mouse");

    // resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // mouse
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);

    // animate
    const start = performance.now();
    let raf: number;
    const draw = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

/* ============================================================
   floating particles
   ============================================================ */

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

function generateParticles(): Particle[] {
  // deterministic seed so SSR and client match would be ideal,
  // but since we need true randomness we just defer to client-only render.
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 10,
    opacity: 0.1 + Math.random() * 0.2,
  }));
}

function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   clock
   ============================================================ */

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const iv = setInterval(update, 10000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-sm tracking-[0.3em]"
      style={{
        fontFamily: "'PP Supply Mono', 'SF Mono', monospace",
        zIndex: 2,
      }}
    >
      {time}
    </div>
  );
}

/* ============================================================
   main page
   ============================================================ */

export default function MoodPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // pick random starting line
    setIndex(Math.floor(Math.random() * MOOD_LINES.length));

    const iv = setInterval(() => {
      setIndex((prev) => (prev + 1) % MOOD_LINES.length);
    }, 8000);
    return () => clearInterval(iv);
  }, []);

  const current = MOOD_LINES[index];

  return (
    <div className="relative w-full h-svh overflow-hidden bg-black">
      <MoodShader />
      <Particles />

      {/* center mood line */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="text-center max-w-2xl"
          >
            <p
              className="text-white/60 text-xl md:text-3xl font-light tracking-wide leading-relaxed"
              style={{ fontFamily: "'Neue Haas Display', 'Helvetica Neue', sans-serif" }}
            >
              {current.en}
            </p>
            {current.cn && (
              <p
                className="mt-4 text-white/25 text-sm md:text-base tracking-[0.15em]"
                style={{ fontFamily: "'PP Supply Mono', monospace" }}
              >
                {current.cn}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Clock />

      {/* very subtle corner text */}
      <div
        className="fixed top-6 right-6 text-white/10 text-xs tracking-[0.2em] uppercase"
        style={{ fontFamily: "'PP Supply Mono', monospace", zIndex: 2 }}
      >
        mood
      </div>
    </div>
  );
}
