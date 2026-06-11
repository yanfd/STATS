"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Link from 'next/link';

export default function ServicesPage() {
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

            gsap.from('.service-item', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.3,
            });
        }, mainRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    const services = [
        {
            title: "BRAND STRATEGY",
            description: "We define and deliver full-scale brand systems built for high-performance digital environments. From foundational strategy to dynamic visual execution, we create identities that carry weight across platforms, audiences, and international campaigns."
        },
        {
            title: "WEB DEVELOPMENT",
            description: "We architect and build complex, high-traffic websites for leading entertainment brands. Our work balances performance, usability, and technical resilience, engineered to support global audiences, real-time content, and seamless editorial control."
        },
        {
            title: "3D & CGI",
            description: "We create stunning 3D visuals and animations that bring your ideas to life with photorealistic quality. From product visualization to character animation, we deliver immersive experiences that captivate audiences."
        },
        {
            title: "MOTION & VIDEO",
            description: "We produce captivating motion graphics and videos that tell your story and capture attention. From social media content to full-scale productions, we bring narratives to life through movement."
        },
        {
            title: "SOCIAL & CONTENT",
            description: "We create shareable content that amplifies your brand's reach and engagement across social platforms. Our strategies are data-driven and designed to maximize impact in the digital landscape."
        },
        {
            title: "AI & INNOVATION",
            description: "We leverage cutting-edge AI technology to create unique and innovative digital experiences. From generative art to intelligent automation, we push the boundaries of what's possible."
        },
    ];

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
                        <Link href="/v2/services" className="text-sm font-medium uppercase tracking-wider text-white transition-colors">
                            Services
                        </Link>
                        <Link href="/v2/about" className="text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
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
                <div className="max-w-7xl mx-auto text-center">
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none">
                            WE&apos;LL MAKE
                        </h1>
                    </div>
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none text-white/40">
                            YOU
                        </h1>
                    </div>
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none">
                            FAMOUS.
                        </h1>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={service.title} className="service-item p-8 bg-[#141414] border border-white/10 rounded-md hover:bg-[#1a1a1a] transition-colors duration-300">
                                <h3 className="text-2xl font-bold uppercase mb-4">{service.title}</h3>
                                <p className="text-white/60 leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-8 border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8">
                        READY TO START?
                    </h2>
                    <p className="text-white/50 text-lg mb-12">
                        Let&apos;s discuss how we can help bring your vision to life.
                    </p>
                    <Link
                        href="/v2#contact"
                        className="inline-block px-12 py-5 bg-white text-black font-semibold text-lg uppercase tracking-wider hover:bg-white/90 transition-colors rounded-lg"
                    >
                        GET IN TOUCH
                    </Link>
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
