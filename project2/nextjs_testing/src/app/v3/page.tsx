"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";
import { SiteBar } from "@/components/v3/SiteBar";
import { BookCallButton } from "@/components/v3/BookCallButton";
import { useV3ChromeEntrance } from "@/components/v3/useV3ChromeEntrance";
import { BottomNav } from "@/components/v3/BottomNav";
import { MenuOverlay } from "@/components/v3/MenuOverlay";
import { LineReveal } from "@/components/v3/LineReveal";
import { SplitLines } from "@/components/v3/SplitLines";
import { ArrowIcon, NDButton } from "@/components/v3/NDButton";
import { V3VideoBlock } from "@/components/v3/V3Video";
import FlipCard from "@/components/Flipcard";
import MainCard from "@/components/MainCard";

gsap.registerPlugin(ScrollTrigger);

const heroLines: Array<string | "__BR__"> = [
  "SourNET Gallery.",
  "I want to create a body that doesn't die,",
  "A lover without an end.",
  "I want to complete the last portrait of him,",
  "but without painting his face,",
  "Everything makes me feel afraid.",
];

const headlineLines = [
  "unFamous Digital Alcoholic",
  "Frontend Developer ",
  "Disco Jockey",
  "Photographer  ",
  "seeking for LostMedia ...",
];

const storyLines: Array<string | "__BR__"> = [
  "So where's the stars? up in the sky ",
  "and what's the moon? a big balloon ",
  "we'll never know unless we grow ",
  "there's so much world outside the door",
  "i want to sing ",
  "to sing my song",
  "__BR__",
  "Her Green plastic watering can ",
  "For her fake chinese rubber plant ",
  "In the fake plastic earth ",
  "That she bought from a rubber man ",
  "In a town full of rubber plants ",
  "To get rid of itself",
  "__BR__",
  "Ambition makes you look pretty ugly ",
  "Kicking squealing  gucci little piggy ",
  "You don't remember ",
  "You don't remember ",
  "Why don't you remember my name anymore",
  "Off with his head man",
  "Why won't he remember my name?",
];

const projectMeta = [
  { label: "working on", value: "hiring pentesting/QA, contact me with resume." },
  { label: "location", value: "Shanghai, China" },
  { label: "status", value: "Dissociation" },
];

export default function GlitchGLPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const siteBarRef = useRef<HTMLDivElement>(null);
  const bookCallRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useV3ChromeEntrance(siteBarRef, bookCallRef);

  useEffect(() => {
    const wrapper = scrollRef.current;
    const content = mainRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.scrollerProxy(wrapper, {});
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <SiteBar ref={siteBarRef} />
      <BottomNav onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <BookCallButton ref={bookCallRef} />

      <div ref={scrollRef} className="h-svh overflow-y-auto bg-nd-200">
        <div ref={mainRef}>
          {/* Hero */}
          <section className="h-[80svh] md:h-[60svh] grid grid-cols-1 md:grid-cols-[1fr_3fr] lg:grid-cols-2 items-end pb-8 gap-4 md:gap-16">
            {/* 改 logo 位置：主要动这一行 className */}
            <div className="-ml-20 mb-16 md:mb-20">
              <img
                alt="glitchGL"
                className="block h-24 sm:h-28 md:h-36 lg:h-40 w-auto object-contain object-left origin-left scale-125 md:scale-150"
                src="/v3/glitchgl-logo.png"
              />
            </div>

            <LineReveal
              as="p"
              playOnMount
              className="font-neue text-xl md:text-3xl lg:text-4xl font-medium text-nd-900 text-left tracking-tight leading-[0.85] lg:leading-[1.15] flex flex-col gap-0 md:block"
            >
              <SplitLines
                lines={heroLines}
                renderLine={(line, index) =>
                  index === 0 ? (
                    <span className="bg-nd-900 text-nd-300 max-w-fit">{line}</span>
                  ) : (
                    <span className="hidden md:block text-nd-800">{line}</span>
                  )
                }
              />
            </LineReveal>
          </section>

          {/* Media hero */}
          <section className="w-full cursor-pointer px-4 pt-0">
            <V3VideoBlock src="/v3/first-video.mp4" aspect="video" />
          </section>

          {/* Headline — 深色字 text-nd-900；滚到这儿才播放 LineReveal 动画 */}
          <section className="w-full p-4 pt-8 pb-12 md:pb-32">
            <LineReveal
              as="h2"
              scrollerRef={scrollRef}
              className="w-full lg:w-1/2 font-neue text-2xl md:text-5xl font-medium text-nd-900 leading-none tracking-tight text-left"
            >
              <SplitLines lines={headlineLines} />
            </LineReveal>
          </section>

          {/* Story + meta */}
          <section className="w-full md:h-[80svh] p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full aspect-square md:aspect-auto md:h-full bg-nd-400 flex items-center justify-center rounded-[4px] overflow-hidden">
              {/* <img src="/source/profilepic.jpg" alt="glitchGL detail" className="w-full h-full object-cover" /> */}
              <MainCard />
            </div>

            <div className="flex flex-col justify-between md:border-t border-nd-500 md:pt-8 w-full lg:w-[50%] lg:min-w-[22rem] h-full">
              <div className="flex flex-col gap-6">
                <LineReveal
                  as="p"
                  scrollerRef={scrollRef}
                  className="font-neue font-medium text-base md:text-lg text-nd-800 whitespace-pre-line"
                  style={{ lineHeight: 1.15 }}
                >
                  <SplitLines lines={storyLines} />
                </LineReveal>
              </div>

              <div className="mt-10 md:mt-0 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <NDButton variant="dark" withArrow href="https://gallery.yanfd.cn/">
                    MY PHOTOGRAPHY
                  </NDButton>
                  <NDButton variant="dark" withArrow href="https://www.yanfd.cn/">
                    MY BLOG
                  </NDButton>
                </div>

                <div className="border-t border-nd-500 pt-6 space-y-4">
                  {projectMeta.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-xs uppercase text-nd-900/60 w-32">{row.label}</span>
                      <span className="font-mono text-xs uppercase text-right md:text-left w-full font-medium text-nd-900">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Gallery videos: opt1–opt4 */}
          <section className="w-full p-4 pb-4 pt-0">
            <V3VideoBlock src="/v3/opt1.mp4" aspect="video" />
          </section>

          <section className="w-full p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
            <V3VideoBlock src="/v3/opt2.mp4" aspect="5/4" />
            <V3VideoBlock src="/v3/opt3.mp4" aspect="5/4" />
            {/* <div className="md:col-span-2">
              <V3VideoBlock src="/v3/opt4.mp4" aspect="video" />
            </div> */}
          </section>

          {/* CTA */}
          <section
            id="enquire"
            className="w-full h-[100svh] flex justify-center items-center p-4 relative overflow-hidden bg-nd-1000"
          >
            <div className="relative z-10 h-fit bg-nd-1000/80 rounded-[4px] overflow-hidden p-4 flex flex-col w-full max-w-[23.1rem]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <img
                    alt="almost human gallery"
                    className="h-14 w-auto max-w-[7rem] object-contain opacity-70"
                    src="/v3/glitchgl-logo.png"
                  />
                  <span className="font-neue text-xs uppercase text-nd-300 opacity-70 tracking-widest">YANFD©</span>
                </div>

                <h2
                  className="uppercase font-neue font-medium text-3xl md:text-4xl text-nd-300 !leading-[0.9em] tracking-tight"
                  style={{ textAlign: "justify", textAlignLast: "justify" }}
                >
                  The industry&apos;s biggest entertainment brands trust us.
                </h2>

                <p className="font-mono uppercase text-[11px] text-nd-600 leading-relaxed">
                  Our work for glitchGL represents the standard we bring to every project. If you have a brief, we want to
                  hear it.
                </p>

                <NDButton variant="dark" icon={<ArrowIcon />} onClick={() => setMenuOpen(true)}>
                  START AN ENQUIRY
                </NDButton>
              </div>
            </div>
          </section>

          {/* Next project */}
          <section className="w-full h-[100svh] overflow-hidden relative cursor-pointer group">
            <div className="relative overflow-hidden w-full h-full">
              <img
                src="/source/profilepic.jpg"
                alt="liquidGL next project"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-mono text-xs uppercase text-nd-100 mb-2">NEXT PROJECT</p>
                <h3 className="font-neue text-3xl md:text-5xl font-medium text-nd-100">liquidGL</h3>
              </div>
            </div>
            <Link href="/v3" className="absolute inset-0" aria-label="View next project liquidGL" />
          </section>
        </div>
      </div>
    </>
  );
}
