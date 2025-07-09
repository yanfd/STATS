"use client";

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
import TwitrerNew from "@/components/TwitterNew";
import AudioDance from "@/components/AudioDance";




// Using a slightly darker shade for the absolute page background
// if needed, otherwise bg-background might be sufficient.
// const PAGE_BG_COLOR = "bg-neutral-950"; // Example: Very dark gray/black

export default function TwTestingPageStrict() {

  
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


            <AudioDance src="/rain.mp3" title="make it rain" description="" />
          </div>

          {/* --- Center Column - Apply flex to control vertical space --- */}
          <div className="flex flex-col gap-6 h-full"> {/* Make column flex and take full height */}
            {/* Search Input Area - Give it a card-like background */}
            <SearchBar />

            {/* Blabla Card - Uses bg-card */}
            <Card className="bg-gradient-to-tr from-black-600 to-gray-800">
              <CardHeader> {/* Reduced padding */}
                <CardTitle className="font-mono text-4xl text-center">STATS</CardTitle> {/* Slightly smaller title */}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-center"> {/* Standard description size */}
                If my world were tearing apart <br /> at least I'm the one in charge.
                </CardDescription>
              </CardContent>
            </Card>

              
              <div className="flex justify-center">
              <MainCard />

                </div>

            
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

            <AudioCard audioSrc="rain.mp3" title="make some noise." />
            

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
    </div>
  );
}