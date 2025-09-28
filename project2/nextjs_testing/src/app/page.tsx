"use client";

import React, { useState, useEffect } from 'react';
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
import { AnimatePresence, motion } from 'framer-motion';




// Using a slightly darker shade for the absolute page background
// if needed, otherwise bg-background might be sufficient.
// const PAGE_BG_COLOR = "bg-neutral-950"; // Example: Very dark gray/black

export default function TwTestingPageStrict() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    }, 500); // 1.5秒后开始掀开动画

    return () => clearTimeout(timer);
  }, []);

  
  return (
    // Force dark mode here and set the overall page background
    <div className={`dark min-h-screen text-foreground bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]`}>
      {/* --- Top Navigation Bar --- */}
      {/* Use Card colors for header bg in dark mode */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>

      {/* --- Main Content Area --- */}
      {/* Constrain width and center */}
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
                <Link href={'https://gallery.yanfd.tech/'} target="_blank" rel="noopener noreferrer" className="w-full"> {/* 让 Link 占据 CardFooter 的宽度 */}
                  <Button className="w-full" size="sm">
                    HAVE A LOOK.
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* quick navigation */}
            <div className='flex justify-around w-full'> {/* 建议使用 w-full 确保占据全部可用宽度 */}
            <a href='https://x.com/home' className="flex-1 mx-2 ">
                <Card className="h-20 bg-gradient-to-br from-blue-400 to-grey-800 rounded-md border-0 shadow-none">
                    <CardContent className="w-full h-full flex items-center justify-center p-0"> {/* 确保内容居中 */}
                      <img src="source/twitter.png" alt="X" className="h-full w-auto object-contain" />
                    </CardContent>
                </Card>
            </a>
            <a href='https://www.youtube.com' className="flex-1 mx-2">
                <Card className="h-20 bg-gradient-to-br from-red-800 to-grey-800 rounded-md border-0 shadow-none">
                    <CardContent className="w-full h-full flex items-center justify-center p-0">
                        {/* <span className="text-2xl font-mono align-middle"></span> */}
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
            {/* <div className='flex justify-around w-full'> 
              <Link href={'https://x.com/home'} target="_blank" rel="noopener noreferrer" className="flex-1"> 
              <Button className="">button1</Button>
              </Link>
              
              <Link href={'https://x.com/home'} target="_blank" rel="noopener noreferrer" className="flex-1"> 
              <Button className="">button1</Button>
              </Link>
              <Link href={'https://x.com/home'} target="_blank" rel="noopener noreferrer" className="flex-1"> 
              <Button className="">button1</Button>
              </Link>
            </div> */}

            {/* Accordion - Uses bg-card for items */}
            <Accordion type="single" collapsible className="w-full">
              {/* Accordion items implicitly use Card styling via shadcn setup */}
              <AccordionItem value="item-1">
                <AccordionTrigger>WORKING ON</AccordionTrigger>
                <AccordionContent>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1"> {/* Smaller list text */}
                  <li>react+next.js</li>
                  <li>decipher(my new game)</li>
                  <li>pentesting</li>
                  <li>cyber security</li>
                </ul>
                </AccordionContent>
              </AccordionItem>
              {/* Add other AccordionItems similarly */}
               <AccordionItem value="item-2">
                <AccordionTrigger>WHAT U ARE?</AccordionTrigger>
                <AccordionContent>IDK :)</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>WHAT U WANT?</AccordionTrigger>
                <AccordionContent>escape.</AccordionContent>
              </AccordionItem>
               
            </Accordion>
            {/* <TwitterPostCard  /> */}

            
          </div>

          {/* --- Center Column - Apply flex to control vertical space --- */}
          <div className="flex flex-col gap-6 h-full"> {/* Make column flex and take full height */}
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
                <CardHeader> {/* Reduced padding */}
                  <CardTitle className="font-mono text-4xl text-center">Happy 23 Birthday.</CardTitle> {/* Slightly smaller title */}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-center"> {/* Standard description size */}
                  {/* If my world were tearing apart <br /> at least I'm the one in charge. */}
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

            {/* <Card className="bg-gradient-to-tr from-cyan-400 to-gray-800">
              <CardHeader>
                <CardTitle className="font-mono text-2xl text-center">ANOTHER CARD</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-2xl font-mono text-center text-white ">
                  SOME GOOD WORDS
                </CardDescription>
              </CardContent>

            </Card> */}

            {/* <AudioCard audioSrc="rain.mp3" title="make some noise." /> */}
            <AudioDanceCard/>
            

            {/* New Tweet Card - Uses bg-card */}
            {/* <TwitterLatestTweetCard />  卡片功能出现问题，暂时隐藏*/} 
                
            {/* Stat Card - Uses bg-card */}
            <div className="flex flex-row justify-around items-center"> {/* Flex row for horizontal alignment */}
            <Card className="w-32">
              <CardContent className="p-3 flex items-center justify-center gap-3"> {/* Reduced padding, align left */}
                 <div className="p-2 bg-muted rounded-md">
                      <Clock className="h-5 w-5 text-muted-foreground" /> {/* Slightly smaller icon */}
                 </div>
                 <div>
                     <p className="text-xl font-bold">78</p> {/* Adjusted size */}
                     <p className="text-xs text-muted-foreground">TIMES</p>
                 </div>
              </CardContent>
            </Card>

         {/* Label Cards/Sections - Make them more compact */}
            <Card className="w-48">
                <CardContent className="p-3 flex items-center justify-start gap-3"> {/* 添加 justify-center */}
                    <ReligiousCrossIcon />
                    <span className="text-xs font-mono">SOMEBODY THAT I USED TO KNOW</span> {/* Smaller text */}
                </CardContent>
            </Card>
            </div>
            

          </div>
        </div>
      </main>
      </motion.div>
      
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