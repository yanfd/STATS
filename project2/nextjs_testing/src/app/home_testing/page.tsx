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
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search, Clock, Check, Image as ImageIcon } from "lucide-react";
import MainCard from "@/components/MainCard";
import Navbar from "@/components/Navbar";

// Using a slightly darker shade for the absolute page background
// if needed, otherwise bg-background might be sufficient.
const PAGE_BG_COLOR = "bg-neutral-950"; // Example: Very dark gray/black

export default function TwTestingPageStrict() {
  return (
    // Force dark mode here and set the overall page background
    <div className={`dark min-h-screen ${PAGE_BG_COLOR} text-foreground`}>
      {/* --- Top Navigation Bar --- */}
      {/* Use Card colors for header bg in dark mode */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>

      {/* --- Main Content Area --- */}
      {/* Constrain width and center */}
      <main className="container mx-auto max-w-screen-xl p-4 md:p-6 lg:p-8 bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(100,116,139,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]">
        {/* Grid layout - Use Card background for grid items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* --- Left Column --- */}
          <div className="flex flex-col gap-6">
            {/* Image Card - Uses bg-card */}
            <Card>
              <CardContent className="p-4">
                <AspectRatio ratio={1 / 0.5} className="bg-muted rounded-md">
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                </AspectRatio>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4 pt-0">
                <p className="text-sm font-semibold">Text</p>
                <p className="text-lg font-bold">BLABLA</p>
                <p className="text-xs text-muted-foreground">putting stuff here.</p>
              </CardFooter>
            </Card>

            {/* Accordion - Uses bg-card for items */}
            <Accordion type="single" collapsible className="w-full">
              {/* Accordion items implicitly use Card styling via shadcn setup */}
              <AccordionItem value="item-1">
                <AccordionTrigger>Title</AccordionTrigger>
                <AccordionContent>
                  Answer the frequently asked question in a simple sentence, a
                  longish paragraph, or even in a list.
                </AccordionContent>
              </AccordionItem>
              {/* Add other AccordionItems similarly */}
               <AccordionItem value="item-2">
                <AccordionTrigger>Title</AccordionTrigger>
                <AccordionContent>Content for the second item.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Title</AccordionTrigger>
                <AccordionContent>Content for the third item.</AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>Title</AccordionTrigger>
                <AccordionContent>Content for the fourth item.</AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-5">
                <AccordionTrigger>Title</AccordionTrigger>
                <AccordionContent>Content for the fifth item.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* --- Center Column - Apply flex to control vertical space --- */}
          <div className="flex flex-col gap-6 h-full"> {/* Make column flex and take full height */}
            {/* Search Input Area - Give it a card-like background */}
            <div className="flex w-full items-center space-x-2 bg-card p-2 rounded-lg border"> {/* Use Card BG, add border */}
              <Input
                type="search"
                placeholder="STUFF"
                // Remove default input border/ring when inside the styled div
                className="flex-grow bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-muted-foreground"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Blabla Card - Uses bg-card */}
            <Card>
              <CardHeader className="pb-2"> {/* Reduced padding */}
                <CardTitle className="text-base">BLABLA</CardTitle> {/* Slightly smaller title */}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm"> {/* Standard description size */}
                  BLABLABLAsomeone do not readBLABLABLAsomeone do not read
                </CardDescription>
              </CardContent>
            </Card>

            {/* Main Feature Card - Crucial: flex-grow to take remaining space */}
            {/* Add flex-grow */}
              {/*<CardContent className="p-4 md:p-6 flex-grow flex items-center justify-center w-full">
                {/* Placeholder element styling 
                <div className="w-[85%] h-[85%] bg-muted rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-24 w-24 text-muted-foreground" />
                </div>
              </CardContent>*/}
              {/* <CardFooter className="flex justify-center pb-4 md:pb-6"> 
                <p className="text-base font-semibold">YANFD PRODUCTS</p> 
              </CardFooter> 
              */}
              
              <div className="flex justify-center">
              <MainCard />

                </div>

            
          </div>

          {/* --- Right Column --- */}
          <div className="flex flex-col gap-6">
            {/* Pricing/List Card - Uses bg-card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Title</CardTitle> {/* Adjusted size */}
                <span className="text-lg font-bold">BEHIND U<span className="text-sm font-normal text-muted-foreground">where</span></span> {/* Adjusted size */}
              </CardHeader>
              <CardContent className="pt-2"> {/* Adjusted padding */}
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1"> {/* Smaller list text */}
                  <li>List Item</li>
                  <li>List Item</li>
                  <li>List Item</li>
                  <li>List Item</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="sm">Button</Button> {/* Smaller button */}
              </CardFooter>
            </Card>
                
            {/* Stat Card - Uses bg-card */}
            <div className="flex flex-row justify-around">
            <Card className="w-32">
              <CardContent className="p-3 flex items-center justify-start gap-3"> {/* Reduced padding, align left */}
                 <div className="p-2 bg-muted rounded-md">
                      <Clock className="h-5 w-5 text-muted-foreground" /> {/* Slightly smaller icon */}
                 </div>
                 <div>
                     <p className="text-xl font-bold">100</p> {/* Adjusted size */}
                     <p className="text-xs text-muted-foreground">Another Card</p>
                 </div>
              </CardContent>
            </Card>

         {/* Label Cards/Sections - Make them more compact */}
            <Card className="w-48">
                <CardContent className="p-3 flex pt-6 items-center justify-start gap-3"> {/* 添加 justify-center */}
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-xs font-mono">SOMEBODY THAT I USED TO KNOW</span> {/* Smaller text */}
                </CardContent>
            </Card>
            </div>

             <Card>
                 <CardContent className="p-2 flex items-center gap-2"> {/* Reduced padding */}
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">Label</span> {/* Smaller text */}
                 </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}