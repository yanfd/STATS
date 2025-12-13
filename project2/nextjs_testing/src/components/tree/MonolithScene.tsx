"use client";

import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
    OrbitControls,
    Stars,
    Text,
    Float,
    MeshDistortMaterial,
    Instance,
    Instances,
    Environment,
    Sparkles,
    Cloud
} from '@react-three/drei';
import * as THREE from 'three';
import { MessageGroup } from '@/types/hughes';
import { motion } from 'framer-motion-3d'; // Optional, but R3F has its own spring. Let's stick to standard R3F hooks for now.

interface MonolithSceneProps {
    season: 'spring' | 'summer' | 'autumn' | 'winter';
    weather: 'sunny' | 'rain' | 'snow';
    data?: Record<string, MessageGroup>;
    onSelectMessage?: (message: any) => void;
}

// Config for Seasons
const SEASON_CONFIG = {
    spring: { color: '#4A5D43', light: '#F48FB1', ambient: 0.5 },
    summer: { color: '#1B3A28', light: '#81C784', ambient: 0.8 },
    autumn: { color: '#5D2E2E', light: '#FFB74D', ambient: 0.4 },
    winter: { color: '#2C3E50', light: '#90CAF9', ambient: 0.3 }
};

function MonthStone({ position, data, config, onClick, index }: { position: [number, number, number], data: MessageGroup, config: any, onClick: (msg: any) => void, index: number }) {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Rotate the stone slowly
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.002;
            mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
            <group>
                {/* The Stone */}
                <mesh
                    ref={mesh}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    scale={hovered ? 1.1 : 1}
                >
                    <dodecahedronGeometry args={[1.5, 0]} />
                    <MeshDistortMaterial
                        color={config.color}
                        roughness={0.6}
                        metalness={0.2}
                        distort={0.3}
                        speed={1}
                    />
                </mesh>

                {/* Label */}
                <Text
                    position={[0, 2.2, 0]}
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {data.year}.{data.month}
                </Text>

                {/* Orbiting Logs (Particles) */}
                {data.messages.slice(0, 15).map((msg, i) => {
                    const angle = (i / Math.min(data.messages.length, 15)) * Math.PI * 2;
                    const radius = 2.5 + Math.random() * 0.5;
                    const y = (Math.random() - 0.5) * 2;

                    return (
                        <LogEmber
                            key={msg.id}
                            position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}
                            color={config.light}
                            message={msg}
                            onClick={onClick}
                        />
                    );
                })}
            </group>
        </Float>
    );
}

function LogEmber({ position, color, message, onClick }: { position: [number, number, number], color: string, message: any, onClick: (msg: any) => void }) {
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (ref.current) {
            // Orbit logic??? 
            // For now just float in place relative to parent group
            // ref.current.rotation.y += 0.01; 
        }
    });

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={(e) => { e.stopPropagation(); onClick(message); }}
            onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
            scale={hovered ? 1.5 : 1}
        >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
                color={hovered ? '#ffffff' : color}
                emissive={color}
                emissiveIntensity={hovered ? 4 : 2}
                toneMapped={false}
            />
        </mesh>
    );
}

function WeatherEffects({ weather }: { weather: 'sunny' | 'rain' | 'snow' }) {
    return (
        <group>
            {weather === 'rain' && (
                <Sparkles count={500} scale={20} size={4} speed={0.4} opacity={0.5} color="#aaaaaa" />
                // Note: Generic Sparkles can simulate light rain if configured right, or use a custom system.
                // For MVP, Sparkles is 'abstractly' acceptable.
            )}
            {weather === 'snow' && (
                <Sparkles count={500} scale={20} size={10} speed={0.1} opacity={0.8} color="#ffffff" />
            )}
            <Cloud opacity={0.3} speed={0.4} width={20} depth={5} segments={10} position={[0, 5, -10]} />
        </group>
    );
}

export default function MonolithScene({ season, weather, data = {}, onSelectMessage }: MonolithSceneProps) {
    const config = SEASON_CONFIG[season];
    const sortedMonths = Object.keys(data).sort((a, b) => b.localeCompare(a)).slice(0, 12);

    return (
        <>
            <ambientLight intensity={config.ambient * 0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={config.light} />
            <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={1} color="blue" />

            <Environment preset="night" />

            {/* Background Atmosphere */}
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 10, 50]} />
            {/* Note: fogOne is likely a typo for fog. Correct is fog. But in R3F: <fog attach="fog" .../> */}
            <fog attach="fog" args={['#050505', 8, 40]} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Weather */}
            <WeatherEffects weather={weather} />

            {/* Circle of Stones */}
            <group position={[0, -2, 0]}>
                {sortedMonths.map((key, i) => {
                    const total = sortedMonths.length;
                    const radius = 8;
                    const angle = (i / total) * Math.PI * 2;
                    const x = Math.cos(angle) * radius;
                    const z = Math.sin(angle) * radius;

                    return (
                        <MonthStone
                            key={key}
                            index={i}
                            position={[x, 0, z]}
                            data={data[key]}
                            config={config}
                            onClick={onSelectMessage || (() => { })}
                        />
                    );
                })}
            </group>

            {/* Controls */}
            <OrbitControls
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
}
