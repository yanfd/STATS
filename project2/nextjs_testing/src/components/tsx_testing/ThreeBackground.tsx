"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        // Use a dark background or transparent if overlaying on CSS
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.FogExp2(0x000000, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // 2. Particles Setup
        const particleCount = 8000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        // Store initial positions and indices for calculations
        const initialPositions: { x: number; y: number; z: number; idx: number }[] = [];

        const color1 = new THREE.Color(0x00ffff); // Cyan
        const color2 = new THREE.Color(0xff00ff); // Magenta

        // Initial Form: Sphere
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Fibonacci sphere distribution for even spread
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            const radius = 1;

            // const x = radius * Math.cos(theta) * Math.sin(phi);
            // const y = radius * Math.sin(theta) * Math.sin(phi);
            // const z = radius * Math.cos(phi);

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            initialPositions.push({ x, y, z, idx: i });

            // Initial Color
            colors[i3] = color1.r;
            colors[i3 + 1] = color1.g;
            colors[i3 + 2] = color1.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // 3. Interaction State
        const animState = {
            form: 0, // 0: Sphere, 1: Chaos, 2: Wave, 3: Ring
            colorMix: 0,
        };

        // 4. ScrollTrigger Animation
        // We need to wait for the DOM to be ready for ScrollTrigger
        // The trigger will be the main scroll container or the body if using native scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-content",
                scroller: "#scroll-container",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Phase 1 -> 2: Sphere to Chaos
        tl.to(animState, { form: 1, colorMix: 0.5 }, 0.1);

        // Phase 2 -> 3: Chaos to Wave
        tl.to(animState, { form: 2, colorMix: 1 }, 0.4);

        // Phase 3 -> 4: Wave to Ring
        tl.to(animState, { form: 3, colorMix: 0.2 }, 0.7);

        // 5. Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
            mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // 6. Animation Loop
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();
            const positionsAttr = particles.geometry.attributes.position;
            const colorsAttr = particles.geometry.attributes.color;
            const posArray = positionsAttr.array as Float32Array;
            const colArray = colorsAttr.array as Float32Array;

            // Mouse rotation
            const targetX = mouseX * 0.5;
            const targetY = mouseY * 0.5;
            particles.rotation.y += 0.002; // Auto rotation
            particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
            particles.rotation.y += (targetX - particles.rotation.y) * 0.05;

            // Morphing Logic
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const p = initialPositions[i];

                // Form 0: Sphere
                const sphereX = p.x;
                const sphereY = p.y;
                const sphereZ = p.z;

                // Form 1: Chaos
                const noise = Math.sin(p.idx * 0.1 + time) * 5;
                const chaosX = p.x * 30 + Math.cos(time + p.idx) * 5;
                const chaosY = p.y * 30 + Math.sin(time + p.idx) * 5;
                const chaosZ = p.z * 30 + noise;

                // Form 2: Wave
                const waveX = (p.idx % 100 - 50) * 0.5;
                const waveZ = (Math.floor(p.idx / 100) - 40) * 0.5;
                const waveY = Math.sin(waveX * 0.5 + time * 2) * 2 + Math.cos(waveZ * 0.3 + time) * 2;

                // Form 3: Ring
                const angle = p.idx * 0.01 + time * 0.5;
                const radius = 8 + Math.sin(p.idx * 0.1) * 2;
                const ringX = Math.cos(angle) * radius;
                const ringZ = Math.sin(angle) * radius;
                const ringY = (p.idx % 100 - 50) * 0.4;

                // Lerp based on animState.form
                let currentX, currentY, currentZ;

                if (animState.form < 1) {
                    // Sphere -> Chaos
                    const t = animState.form;
                    currentX = sphereX + (chaosX - sphereX) * t;
                    currentY = sphereY + (chaosY - sphereY) * t;
                    currentZ = sphereZ + (chaosZ - sphereZ) * t;
                } else if (animState.form < 2) {
                    // Chaos -> Wave
                    const t = animState.form - 1;
                    currentX = chaosX + (waveX - chaosX) * t;
                    currentY = chaosY + (waveY - chaosY) * t;
                    currentZ = chaosZ + (waveZ - chaosZ) * t;
                } else {
                    // Wave -> Ring
                    const t = animState.form - 2;
                    currentX = waveX + (ringX - waveX) * t;
                    currentY = waveY + (ringY - waveY) * t;
                    currentZ = waveZ + (ringZ - waveZ) * t;
                }

                posArray[i3] = currentX;
                posArray[i3 + 1] = currentY;
                posArray[i3 + 2] = currentZ;

                // Color mixing
                const mixedColor = color1.clone().lerp(color2, animState.colorMix + Math.sin(p.idx * 0.01 + time) * 0.2);
                colArray[i3] = mixedColor.r;
                colArray[i3 + 1] = mixedColor.g;
                colArray[i3 + 2] = mixedColor.b;
            }

            positionsAttr.needsUpdate = true;
            colorsAttr.needsUpdate = true;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        // 7. Resize Handling
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
