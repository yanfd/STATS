"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from '@/components/tsx_testing/ThreeBackground';
import Navbar from '@/components/Navbar';
import MainCard from "@/components/MainCard";
import BlogCard from "@/components/BlogCard";
import AudioDanceCard from "@/components/AudioDanceCard";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import ReligiousCrossIcon from "@/components/ReligionCross";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

// Helper for section layout
function Section({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <section className={`relative min-h-screen flex flex-col items-center justify-center p-6 snap-start ${className}`}>
            {children}
        </section>
    );
}

export default function TsxTestingPage() {
    const now: Date = new Date();
    const targetDate: Date = new Date(2024, 11, 30); // 2024年12月30日

    // 计算毫秒差
    const differenceInMilliseconds: number = now.getTime() - targetDate.getTime();
    //day
    const null_time: number = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return (
        <div id="scroll-container" className="relative bg-black text-white h-screen overflow-y-scroll snap-y snap-mandatory overflow-x-hidden">
            <ThreeBackground />

            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md">
                <Navbar />
            </header>

            <div className="scroll-content relative z-10">

                {/* SECTION 1: SPHERE FORM - HERO */}
                <Section>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-4">
                            YANFD
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase mb-8">
                            Digital Experience
                        </p>
                        <div className="flex justify-center gap-4">
                            <MainCard />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-10 text-white/50 text-sm"
                    >
                        下滑探索
                    </motion.div>
                </Section>

                {/* SECTION 2: CHAOS FORM - ABOUT/STATUS */}
                <Section>
                    <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-5xl font-bold mb-6 font-mono">WHERE WE GO</h2>
                            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                                Navigating through the digital noise to find clarity.
                            </p>
                            <div className="flex gap-4">
                                <Card className="bg-white/5 border-white/10 backdrop-blur-md p-4 flex-1">
                                    <h3 className="text-lg font-bold text-white">React + Next.js</h3>
                                    <p className="text-sm text-gray-400">Building the future web</p>
                                </Card>
                                <Card className="bg-white/5 border-white/10 backdrop-blur-md p-4 flex-1">
                                    <h3 className="text-lg font-bold text-white">Game Dev</h3>
                                    <p className="text-sm text-gray-400">Interactive experiences</p>
                                </Card>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col gap-6"
                        >
                            <BlogCard />
                            <div className="flex gap-4">
                                {/* quick navigation */}
                                <div className='flex justify-around w-full'>
                                    <a href='https://x.com/home' className="flex-1 mx-2 ">
                                        <Card className="h-20 bg-gradient-to-br from-blue-400 to-grey-800 rounded-md border-0 shadow-none">
                                            <CardContent className="w-full h-full flex items-center justify-center p-0">
                                                <img src="source/twitter.png" alt="X" className="h-full w-auto object-contain" />
                                            </CardContent>
                                        </Card>
                                    </a>
                                    <a href='https://www.youtube.com' className="flex-1 mx-2">
                                        <Card className="h-20 bg-gradient-to-br from-red-800 to-grey-800 rounded-md border-0 shadow-none">
                                            <CardContent className="w-full h-full flex items-center justify-center p-0">
                                                <img src="source/ytb.png" alt="YTB" className="h-full w-auto object-contain" />
                                            </CardContent>
                                        </Card>
                                    </a>
                                    <a href='https://github.com/yanfd' className="flex-1 mx-2">
                                        <Card className="h-20 bg-gradient-to-br from-white to-black rounded-md border-0 shadow-none">
                                            <CardContent className="w-full h-full flex items-center justify-center p-0">
                                                <img src="source/github.png" alt="github" className="h-full w-auto object-contain" />
                                            </CardContent>
                                        </Card>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Section>

                {/* SECTION 3: WAVE FORM - AUDIO/VISUAL */}
                <Section>
                    <div className="container mx-auto max-w-4xl text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl font-bold mb-12 font-mono"
                        >
                            FREQUENCIES
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex justify-center"
                            >
                                <AudioDanceCard className="text-white" />
                            </motion.div>

                            <div className="flex flex-col gap-6 justify-center">
                                <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <Clock className="w-8 h-8 text-blue-400" />
                                        <div className="text-left">
                                            <p className="text-3xl font-bold text-white">78</p>
                                            <p className="text-xs text-gray-500 uppercase">TIMES LISTENED</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <ReligiousCrossIcon className="text-white" />
                                        <div className="text-left">
                                            <p className="text-xl font-bold text-white">SOMEBODY THAT I USED TO KNOW.</p>
                                            <p className="text-xs text-gray-500 uppercase">{null_time} DAYS.</p>
                                            <p className="text-xs text-gray-500 uppercase"></p>

                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* SECTION 4: RING FORM - GALLERY/CONCLUSION */}
                <Section>
                    <div className="container mx-auto max-w-5xl text-center">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-br from-blue-200 to-grey-600"
                        >
                            ALMOST HUMAN
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
                        >
                            "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate."
                        </motion.p>

                        <Link href="https://gallery.yanfd.cn/" target="_blank">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full">
                                ENTER GALLERY
                            </Button>
                        </Link>
                    </div>
                </Section>

                <footer className="py-10 text-center text-gray-600 bg-black/80 backdrop-blur-xl border-t border-white/5">
                    <p className="font-mono text-sm">© 2025 YANFD. All rights reserved.</p>
                </footer>

            </div>
        </div>
    );
}
