"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Link from 'next/link';

export default function V2HomePage() {
    const mainRef = useRef<HTMLElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP animations
        const ctx = gsap.context(() => {
            // Hero text animation
            gsap.from('.hero-line', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
            });

            // Marquee animation
            gsap.to('.marquee-inner', {
                x: '-50%',
                repeat: -1,
                duration: 20,
                ease: 'none',
            });

            // Nav items animation
            gsap.from('.nav-item', {
                y: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.5,
            });

            // Grid items animation
            gsap.from('.grid-item', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.grid-section',
                    start: 'top 80%',
                },
            });

            // Footer animation
            gsap.from('.footer-content', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: 'footer',
                    start: 'top 90%',
                },
            });
        }, mainRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    const projects = [
        { title: "WONDERBREAD", category: "3D / CGI / Animation", image: "/source/profilepic.jpg" },
        { title: "FILM4 SUMMER SCREEN", category: "Digital / Experiential", image: "/source/profilepic.jpg" },
        { title: "CIRCUS 100", category: "Digital / Social & Content", image: "/source/profilepic.jpg" },
        { title: "THE BREADWINNERS", category: "3D / CGI / Animation", image: "/source/profilepic.jpg" },
        { title: "LEGO HOGWARTS", category: "3D / CGI / Animation", image: "/source/profilepic.jpg" },
        { title: "THE BFG DREAM JAR", category: "3D / CGI / Animation", image: "/source/profilepic.jpg" },
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
                        <Link href="/v2" className="nav-item text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                            Work
                        </Link>
                        <Link href="/v2/services" className="nav-item text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                            Services
                        </Link>
                        <Link href="/v2/about" className="nav-item text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="#contact" className="nav-item text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>
                    <button className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-8 pt-20">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="overflow-hidden">
                        <h1 className="hero-line text-[8vw] md:text-[6vw] font-bold uppercase tracking-tight leading-none">
                            WE MAKE
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="hero-line text-[8vw] md:text-[6vw] font-bold uppercase tracking-tight leading-none text-white/40">
                            ENTERTAINMENT
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="hero-line text-[8vw] md:text-[6vw] font-bold uppercase tracking-tight leading-none">
                            DIGITAL.
                        </h1>
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                        <div className="px-6 py-3 border border-white/20 rounded-lg text-sm uppercase tracking-wider">
                            The creative powerhouse behind the world&apos;s biggest entertainment brands
                        </div>
                        <button className="px-8 py-3 bg-white text-black font-semibold uppercase tracking-wider rounded-lg hover:bg-white/90 transition-colors">
                            BOOK A CALL
                        </button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-lg flex items-start justify-center p-2">
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-lg animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section className="py-8 border-y border-white/10 overflow-hidden">
                <div className="marquee-container">
                    <div className="marquee-inner flex items-center gap-8 whitespace-nowrap">
                        {[...Array(3)].map((_, i) => (
                            <React.Fragment key={i}>
                                <span className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-white/10">
                                    WONDERBREAD
                                </span>
                                <span className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-white/10">
                                    •
                                </span>
                                <span className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-white/10">
                                    FILM4
                                </span>
                                <span className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-white/10">
                                    •
                                </span>
                                <span className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-white/10">
                                    CIRCUS 100
                                </span>
                                <span className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-white/10">
                                    •
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="grid-section py-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div key={project.title} className="grid-item group relative aspect-video bg-zinc-900 rounded-md overflow-hidden cursor-pointer">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div>
                                        <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{project.category}</p>
                                        <h3 className="text-white text-xl font-bold">{project.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-20 px-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8">
                                WE CREATE
                                <br />
                                <span className="text-white/40">CULTURE,</span>
                                <br />
                                NOT CONTENT.
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-8">
                                We are a digital-first entertainment company, led by creative technologists who understand how to make entertainment go viral.
                            </p>
                            <Link
                                href="/v2/services"
                                className="inline-block px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors rounded-lg"
                            >
                                OUR SERVICES
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-zinc-900 rounded-md overflow-hidden">
                                <img src="/source/profilepic.jpg" alt="Service 1" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square bg-zinc-900 rounded-md overflow-hidden mt-8">
                                <img src="/source/profilepic.jpg" alt="Service 2" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8">
                        LET&apos;S WORK
                        <br />
                        <span className="text-white/40">TOGETHER</span>
                    </h2>
                    <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
                        Have a project in mind? Let&apos;s create something extraordinary together.
                    </p>
                    <a
                        href="mailto:your@email.com"
                        className="inline-block px-12 py-5 bg-white text-black font-semibold text-lg uppercase tracking-wider hover:bg-white/90 transition-colors rounded-lg"
                    >
                        GET IN TOUCH
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-white/10">
                <div className="footer-content max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-white/30 text-sm">© 2025 YANFD. All rights reserved.</p>
                        <p className="text-white/20 text-xs mt-1">Manchester, UK</p>
                    </div>
                    <div className="flex gap-8">
                        <a href="https://github.com/yanfd" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                            GitHub
                        </a>
                        <a href="https://x.com/home" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                            Twitter
                        </a>
                        <a href="https://yanfd.cn" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                            Blog
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
