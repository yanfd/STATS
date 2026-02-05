"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tighter">YANFD</div>
                    <nav className="hidden md:flex gap-8 text-sm text-gray-400">
                        <Link href="#" className="hover:text-white transition-colors">Features</Link>
                        <Link href="#" className="hover:text-white transition-colors">Values</Link>
                        <Link href="#" className="hover:text-white transition-colors">About</Link>
                    </nav>
                    <Link href="/">
                        <button className="bg-white text-black px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
                            Main App
                        </button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            Simple. Clear. <br /> Essential.
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            A minimalist landing page focused on clarity and typography.
                            Designed to communicate your message without distractions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
                                Get Started
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-zinc-950/50 border-y border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Minimalist Design",
                                description: "Stripped back to the essentials. Nothing more, nothing less."
                            },
                            {
                                title: "Fast Performance",
                                description: "Optimized for speed. Every byte counts in the digital age."
                            },
                            {
                                title: "Dark Mode Native",
                                description: "Built for comfort. Easy on the eyes, day or night."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-6 h-6 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote/About Section */}
            <section className="py-32 px-6">
                <div className="container mx-auto max-w-3xl text-center">
                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-light italic text-gray-300 leading-relaxed"
                    >
                        "Simplicity is the ultimate sophistication."
                    </motion.blockquote>
                    <div className="mt-8 text-gray-500">— Leonardo da Vinci</div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-white/5 bg-zinc-950">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <div>© 2025 YANFD Project.</div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gray-400 transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-gray-400 transition-colors">Twitter</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
