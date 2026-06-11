"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import Link from 'next/link';

export default function WorkPage() {
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

            gsap.from('.project-item', {
                y: 80,
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

    const projects = [
        { title: "WONDERBREAD", category: "3D / CGI / Animation / Direction / Post Production", image: "/source/profilepic.jpg" },
        { title: "FILM4 SUMMER SCREEN", category: "Digital / Experiential / Social & Content / AI", image: "/source/profilepic.jpg" },
        { title: "CIRCUS 100", category: "Digital / Social & Content / AI", image: "/source/profilepic.jpg" },
        { title: "THE BREADWINNERS", category: "3D / CGI / Animation / Direction / Post Production", image: "/source/profilepic.jpg" },
        { title: "LEGO HOGWARTS", category: "3D / CGI / Animation / Direction / Post Production", image: "/source/profilepic.jpg" },
        { title: "THE BFG DREAM JAR", category: "3D / CGI / Animation / Direction / Post Production", image: "/source/profilepic.jpg" },
        { title: "CARA THE STARFAIRY", category: "3D / CGI / Animation / Direction / Post Production", image: "/source/profilepic.jpg" },
        { title: "PADDINGTON 2", category: "3D / CGI / Animation / Direction / Post Production", image: "/source/profilepic.jpg" },
        { title: "RUBIK'S XMAS", category: "3D / CGI / Animation / Direction / Post Production", image: "/source/profilepic.jpg" },
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
                        <Link href="/v2/services" className="text-sm font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors">
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
                <div className="max-w-7xl mx-auto">
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none">
                            WE CREATE
                        </h1>
                    </div>
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none text-white/40">
                            CULTURE,
                        </h1>
                    </div>
                    <div className="page-title overflow-hidden">
                        <h1 className="text-[6vw] md:text-[4vw] font-bold uppercase tracking-tight leading-none">
                            NOT CONTENT.
                        </h1>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <div key={project.title} className="project-item group relative aspect-video bg-zinc-900 rounded-md overflow-hidden cursor-pointer">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                    <div>
                                        <p className="text-white/60 text-xs uppercase tracking-wider mb-3">{project.category}</p>
                                        <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
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
