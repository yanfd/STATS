"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Link from 'next/link';

export default function AboutPage() {
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            gsap.from('.page-title', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
            });

            gsap.from('.about-image', {
                x: -60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.3,
            });

            gsap.from('.about-content', {
                x: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.4,
            });

            gsap.from('.about-text', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.6,
            });
        }, mainRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <main ref={mainRef} className="bg-[#0a0a0a] text-white min-h-screen">
            {/* Fixed Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-4">
                <div className="flex items-center justify-between px-6 py-3 bg-[#141414] rounded-md">
                    <Link href="/v2" className="text-xl font-bold tracking-tight font-neue">
                        YANFD
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/v2" className="text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                            Work
                        </Link>
                        <Link href="/v2/services" className="text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                            Services
                        </Link>
                        <Link href="/v2/about" className="text-sm font-medium uppercase tracking-wider text-white transition-colors">
                            About
                        </Link>
                        <Link href="/v2#contact" className="text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none">
                            ABOUT
                        </h1>
                    </div>
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none text-white/40">
                            NAUGHTYDUK
                        </h1>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="pb-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Left Column - Image */}
                        <div className="about-image">
                            <div className="aspect-[4/5] bg-zinc-900 rounded-md overflow-hidden">
                                <img
                                    src="/source/profilepic.jpg"
                                    alt="Team"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="about-content pt-8">
                            <div className="space-y-8">
                                <p className="about-text text-white/60 text-lg leading-relaxed">
                                    We are a digital-first entertainment company, led by creative technologists who understand how to make entertainment go viral.
                                </p>
                                <p className="about-text text-white/60 text-lg leading-relaxed">
                                    We partner with the world&apos;s leading entertainment brands to deliver culturally relevant digital campaigns that turn passive viewers into active fans.
                                </p>
                                <p className="about-text text-white/60 text-lg leading-relaxed">
                                    Our team of experts combines strategy, creativity, technology, and platform expertise to amplify storytelling, deepen audience engagement, and drive measurable brand growth.
                                </p>
                                <p className="about-text text-white/60 text-lg leading-relaxed">
                                    From digital content strategy and creative development to social media management, paid media, and influencer partnerships, we offer a full suite of digital marketing solutions tailored for the entertainment industry.
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-white/40 text-sm uppercase tracking-wider mb-2">Location</h3>
                                        <p className="text-white">Shanghai, China</p>
                                    </div>
                                    <div>
                                        <h3 className="text-white/40 text-sm uppercase tracking-wider mb-2">Industry</h3>
                                        <p className="text-white">Entertainment</p>
                                    </div>
                                    <div>
                                        <h3 className="text-white/40 text-sm uppercase tracking-wider mb-2">Discipline</h3>
                                        <p className="text-white">Digital Innovation</p>
                                    </div>
                                    <div>
                                        <h3 className="text-white/40 text-sm uppercase tracking-wider mb-2">Next Availability</h3>
                                        <p className="text-white">21 Jun 2026</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <Link
                                    href="/v2#contact"
                                    className="inline-block px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors rounded-lg"
                                >
                                    GET IN TOUCH
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-white/30 text-sm">© 2025 YANFD. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="https://github.com/yanfd" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                            GitHub
                        </a>
                        <a href="https://x.com/home" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                            Twitter
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
