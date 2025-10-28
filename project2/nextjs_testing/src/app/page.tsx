"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AudioCard from '@/components/AudioCard';
import TwitterPostCard from "@/components/TwitterPostCard";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search, Clock, Check, Image as ImageIcon } from "lucide-react";
import MainCard from "@/components/MainCard";
import Navbar from "@/components/Navbar";
import Parser from 'rss-parser';
import BlogCard from "@/components/BlogCard";
import Link from 'next/link';
import ReligiousCrossIcon from "@/components/ReligionCross";
import TwitterLatestTweetCard from "@/components/TwitterLatestTweetCard";
import SearchBar from "@/components/SearchBar";
import QuizComponent from "@/components/QuizComponent";
import TwitrerNew from "@/components/TwitterNew";
import AudioDanceCard from "@/components/AudioDanceCard";
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import TerminalContent from '@/components/overflow/TerminalContent'

// Section wrapper component
function ScrollSection({
  children,
  bgColor
}: {
  children: React.ReactNode
  bgColor: string
}) {
  return (
    <section className={`relative h-screen snap-start ${bgColor} overflow-hidden`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </section>
  )
}

export default function TwTestingPageStrict() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  const imageUrl = 'https://cdn-icons-png.flaticon.com/512/124/124021.png';

  const handleShowQuiz = () => {
    setShowQuiz(true);
  };

  const handleHideQuiz = () => {
    setShowQuiz(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Set window height on client side only
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  // Track scroll progress
  const { scrollY } = useScroll({ container: containerRef });

  // Current page index (0-based). Used to show side texts only on page 2.
  const currentPage = useTransform(scrollY, (y) => {
    return windowHeight > 0 ? Math.round(y / windowHeight) : 0;
  });

  // Side text opacity/position only around page 2 range
  const textOpacity = useTransform(scrollY, [windowHeight * 0.8, windowHeight, windowHeight * 1.2], [0, 1, 0]);
  const leftY = useTransform(scrollY, [windowHeight * 0.8, windowHeight, windowHeight * 1.2], [150, 0, -150]);
  const rightY = useTransform(scrollY, [windowHeight * 0.8, windowHeight, windowHeight * 1.2], [-150, 0, 150]);

  // Page 1 Content - Original MainCard page
  const Page1Content = () => (
    <div className="h-full overflow-y-auto">
      {/* --- Top Navigation Bar --- */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: showQuiz ? 40 : 0,
          transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
        }}
      >
        <main className="container mx-auto max-w-screen-xl p-4 md:p-6 lg:p-8">
          {/* Grid layout - Use Card background for grid items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* --- Left Column --- */}
            <div className="flex flex-col gap-6">
              {/* Image Card - Uses bg-card */}
              <Card>
                <CardContent className="p-4 bg-gradient-to-b from-black-800 via-white/[50%] to-black-800/[30%]">
                  <AspectRatio ratio={1 / 0.5} className="bg-muted rounded-md bg-[url('/almosthuman.PNG')] bg-cover bg-center">
                    <div className="flex h-full w-full items-center justify-center">
                      {/* <ImageIcon className="h-16 w-16 text-muted-foreground" /> */}
                    </div>
                  </AspectRatio>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-0">
                  <p className="text-lg font-bold">ALMOSTHUMAN GALLERY</p>
                  <p className="text-xs text-muted-foreground pb-4">my deep dark twisted fantasy.</p>
                  <Link href={'https://gallery.yanfd.tech/'} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full" size="sm">
                      HAVE A LOOK.
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

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

              {/* Accordion - Uses bg-card for items */}
              {/* <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>WORKING ON</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>react+next.js</li>
                      <li>decipher(my new game)</li>
                      <li>pentesting</li>
                      <li>cyber security</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>WHAT U ARE?</AccordionTrigger>
                  <AccordionContent>IDK :)</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>WHAT U WANT?</AccordionTrigger>
                  <AccordionContent>escape.</AccordionContent>
                </AccordionItem>
              </Accordion> */}
            </div>

            {/* --- Center Column - Apply flex to control vertical space --- */}
            <div className="flex flex-col gap-6 h-full">
              {/* Search Input Area - Give it a card-like background */}
              <SearchBar onShowQuiz={handleShowQuiz} />

              <AnimatePresence>
                {showQuiz && (
                  <div className="mt-4">
                    <QuizComponent onHide={handleHideQuiz} />
                  </div>
                )}
              </AnimatePresence>

              {/* Blabla Card - Uses bg-card */}
              <motion.div
                layout
                transition={{
                  layout: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
                }}
              >
                <Card className="bg-gradient-to-tr from-black-600 to-gray-800">
                  <CardHeader>
                    <CardTitle className="font-mono text-4xl text-center">Happy 23 Birthday.</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-center">
                      At least im doin it.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="flex justify-center"
                layout
                transition={{
                  layout: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
                }}
              >
                <MainCard />
              </motion.div>
            </div>

            {/* --- Right Column --- */}
            <div className="flex flex-col gap-6">
              {/* Pricing/List Card - Uses bg-card */}
              <BlogCard />
              <AudioDanceCard />

              {/* Stat Card - Uses bg-card */}
              <div className="flex flex-row justify-around items-center">
                <Card className="w-32">
                  <CardContent className="p-3 flex items-center justify-center gap-3">
                    <div className="p-2 bg-muted rounded-md">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">78</p>
                      <p className="text-xs text-muted-foreground">TIMES(XD)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-48">
                  <CardContent className="p-3 flex items-center justify-start gap-3">
                    <ReligiousCrossIcon />
                    <span className="text-xs font-mono">SOMEBODY THAT I USED TO KNOW</span>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );

  // Page 2 Content - With extending motion text
  const Page2Content = () => (
    <div className="h-full flex items-center justify-center px-20">
      <div className="text-center">
        <motion.h1
          className="text-7xl font-bold text-white mb-6 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          YANFD CREATIONS
        </motion.h1>
        <motion.p
          className="text-xl text-gray-400 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Explore the collection of projects and experiments
        </motion.p>
        <motion.div
          className="mt-8 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Scroll down to continue ↓
        </motion.div>
      </div>
    </div>
  );

  // Page 3 Content - Info/Features page
  const Page3Content = () => (
    <div className="h-full flex items-center justify-center px-20">
      <div className="max-w-4xl">
        <motion.h2
          className="text-5xl font-bold text-white mb-8 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          What I'm About
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 gap-6 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Web Development</h3>
            <p className="text-sm">Building modern web applications with React and Next.js</p>
          </div>
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Game Development</h3>
            <p className="text-sm">Creating interactive experiences and game mechanics</p>
          </div>
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Pentesting</h3>
            <p className="text-sm">Security research and penetration testing</p>
          </div>
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Cyber Security</h3>
            <p className="text-sm">Exploring security concepts and defensive strategies</p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Pages 2-4: reuse sections from /clutter/overflow
  // Simple inline replicas to avoid cross-route imports
  const OverflowIntro = () => (
    <div className="h-full flex items-center justify-center px-20">
      <div className="text-center">
        <motion.h1
          className="text-7xl font-bold text-white mb-6 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          YANFD PRODUCTS
        </motion.h1>
        <motion.p
          className="text-xl text-gray-400 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Terminal-style file browser built with React
        </motion.p>
        <motion.div
          className="mt-8 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Scroll down to explore ↓
        </motion.div>
      </div>
    </div>
  );

  const OverflowTerminal = () => (
    <TerminalContent />
  );

  const OverflowFeatures = () => (
    <div className="h-full flex items-center justify-center px-20">
      <div className="max-w-4xl">
        <motion.h2
          className="text-5xl font-bold text-white mb-8 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Key Features
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 gap-6 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">File Tree</h3>
            <p className="text-sm">Navigate through folders and files with an intuitive tree structure</p>
          </div>
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Recent Files</h3>
            <p className="text-sm">Quick access to your recently opened files</p>
          </div>
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Code Preview</h3>
            <p className="text-sm">View file contents with syntax highlighting</p>
          </div>
          <div className="border border-gray-700 p-6 rounded-lg bg-gray-800/50">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Terminal Style</h3>
            <p className="text-sm">Classic terminal aesthetic with modern functionality</p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="dark">
      <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
        {/* Side vertical texts: only show on page 2 and fill full height */}
        <motion.div
          className="fixed inset-y-0 left-0 w-[18vw] flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: textOpacity, y: leftY }}
        >
          <motion.p
            className="font-bold tracking-wider text-transparent"
            style={{
              writingMode: 'vertical-rl',
              WebkitTextStroke: '3px rgba(156, 163, 175, 0.5)',
              fontSize: '12rem',
              display: 'block',
            }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            {/** Render only when on page 2 */}
            {/** Using a derived boolean from currentPage via inline check in style not possible; instead rely on opacity window. */}
            YANFD
          </motion.p>
        </motion.div>

        <motion.div
          className="fixed inset-y-0 right-0 w-[18vw] flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: textOpacity, y: rightY }}
        >
          <motion.p
            className="font-bold tracking-wider text-gray-400"
            style={{ writingMode: 'vertical-rl', fontSize: '12rem', display: 'block' }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            TECH
          </motion.p>
        </motion.div>

        {/* Section 1 - MainCard page (original content) */}
        <ScrollSection bgColor="bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]">
          <Page1Content />
        </ScrollSection>

        {/* Section 2 - Overflow Intro (from /clutter/overflow page 1) */}
        <ScrollSection bgColor="bg-gradient-to-br from-black via-gray-900 to-black">
          <OverflowIntro />
        </ScrollSection>

        {/* Section 3 - Overflow Terminal preview (from /clutter/overflow page 2) */}
        <ScrollSection bgColor="bg-gray-900">
          <OverflowTerminal />
        </ScrollSection>

        {/* Section 4 - Overflow Features (from /clutter/overflow page 3) */}
        <ScrollSection bgColor="bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <OverflowFeatures />
        </ScrollSection>
      </div>

      {/* 黑色遮盖层开屏效果 */}
      <div
        className={`fixed inset-0 bg-black z-[9999] transition-transform duration-[400ms] ease-[cubic-bezier(0.8,0.06,0.8,0.19)] ${
          isLoading ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
        style={{
          transformOrigin: 'bottom'
        }}
      />
    </div>
  );
}
