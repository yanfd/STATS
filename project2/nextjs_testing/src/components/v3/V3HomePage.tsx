"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SiteBar } from "@/components/v3/SiteBar";
import { BookCallButton } from "@/components/v3/BookCallButton";
import { useV3PageEntrance, V3_ENTRANCE_INITIAL } from "@/components/v3/useV3PageEntrance";
import { BottomNav } from "@/components/v3/BottomNav";
import { MenuOverlay } from "@/components/v3/MenuOverlay";
import { LineReveal } from "@/components/v3/LineReveal";
import { SplitLines } from "@/components/v3/SplitLines";
import { NDButton } from "@/components/v3/NDButton";
import { FriendLinksSection } from "@/components/v3/FriendLinksSection";
import { V3VideoBlock } from "@/components/v3/V3Video";
import { V3DashboardPanel } from "@/components/v3/V3DashboardPanel";
import { V3EntryLoader, V3_HERO_VIDEO_SRC } from "@/components/v3/V3EntryLoader";
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
  "Her Green plastic watering can",
  "For her fake chinese rubber plant",
  "In the fake plastic earth.",
  "That she bought from a rubber man",
  "In a town full of rubber plants",
  "To get rid of itself.",
  "__BR__",
  "And It Wears Her Out' it wears her out",
  "It wears her out' it wears her out.",
  "__BR__",
  "She lives with a broken man",
  "A cracked polystyrene man",
  "Who just crumbles and burns.",
  "__BR__",
  "He used to do surgery",
  "For girls in the eighties",
  "But gravity always wins.",
  "__BR__",
  "And It Wears Him Out' it wears him out",
  "It wears him out' it wears.",
  "__BR__",
  "She looks like the real thing",
];

const projectMeta = [
  { label: "working on", value: "hiring pentesting/QA, contact me with resume." },
  { label: "location", value: "Shanghai, China" },
  { label: "status", value: "Dissociation" },
];

export default function V3HomePage() {
  return (
    <div className="v3-root">
      <V3EntryLoader>
        <V3PageContent />
      </V3EntryLoader>
      <V3DashboardPanel />
    </div>
  );
}

function V3PageContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const siteBarRef = useRef<HTMLDivElement>(null);
  const bookCallRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useV3PageEntrance({ siteBarRef, bookCallRef, heroLogoRef, heroTextRef, heroVideoRef });

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
      <SiteBar ref={siteBarRef} className={V3_ENTRANCE_INITIAL.siteBar} />
      <BottomNav onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <BookCallButton ref={bookCallRef} motionClassName={V3_ENTRANCE_INITIAL.bookCall} />

      <div ref={scrollRef} className="h-svh overflow-y-auto bg-nd-200">
        <div ref={mainRef}>
          <section className="h-[80svh] md:h-[60svh] grid grid-cols-1 md:grid-cols-[1fr_3fr] lg:grid-cols-2 items-end pb-8 gap-4 md:gap-16">
            <div ref={heroLogoRef} className={`-ml-20 mb-16 md:mb-20 ${V3_ENTRANCE_INITIAL.hero}`}>
              <img
                alt="glitchGL"
                className="block h-24 sm:h-28 md:h-36 lg:h-40 w-auto object-contain object-left origin-left scale-125 md:scale-150"
                src="/v3/glitchgl-logo.png"
              />
            </div>

            <div ref={heroTextRef} className={V3_ENTRANCE_INITIAL.hero}>
              <LineReveal
                as="p"
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
            </div>
          </section>

          <section ref={heroVideoRef} className={`w-full cursor-pointer px-4 pt-0 ${V3_ENTRANCE_INITIAL.hero}`}>
            <V3VideoBlock src={V3_HERO_VIDEO_SRC} aspect="video" />
          </section>

          <section className="w-full p-4 pt-8 pb-12 md:pb-32">
            <LineReveal
              as="h2"
              scrollerRef={scrollRef}
              className="w-full lg:w-1/2 font-neue text-2xl md:text-5xl font-medium text-nd-900 leading-none tracking-tight text-left"
            >
              <SplitLines lines={headlineLines} />
            </LineReveal>
          </section>

          <section className="w-full md:h-[80svh] p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full aspect-square md:aspect-auto md:h-full bg-nd-400 flex items-center justify-center rounded-[4px] overflow-hidden">
              <MainCard variant="v3" />
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

          <section className="w-full p-4 pb-4 pt-0">
            <V3VideoBlock src="/v3/opt1.mp4" aspect="video" />
          </section>

          <section className="w-full p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
            <V3VideoBlock src="/v3/opt2.mp4" aspect="5/4" />
            <V3VideoBlock src="/v3/opt3.mp4" aspect="5/4" />
          </section>

          <FriendLinksSection />

          <section className="w-full h-[100svh] overflow-hidden relative cursor-pointer group">
            <div className="relative overflow-hidden w-full h-full">
              <img
                src="/lucid.png"
                alt="next project"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-mono text-xs uppercase text-nd-100 mb-2">NEXT PROJECT</p>
                <h3 className="font-neue text-3xl md:text-5xl font-medium text-nd-100">Lucid Dreams</h3>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
