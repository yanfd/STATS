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
  const heroVideoRef = useRef<HTMLDivElement>(null);
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

      <div ref={scrollRef} className="v3-scroll h-svh overflow-y-auto bg-nd-1100">
        <div ref={mainRef} className="v3-shell">
          <main>
            <section className="v3-hero-grid">
              <div ref={heroLogoRef} className={`v3-hero-copy ${V3_ENTRANCE_INITIAL.hero}`}>
                <p className="v3-kicker">YANFD / DIGITAL JOYCLUB / 2026</p>
                <h1 className="v3-display-title">SourNET<br /><span>Gallery.</span></h1>
                <p className="v3-hero-description">A visual archive for things that disappear, mutate and refuse to stay still.</p>
                <div className="v3-hero-meta"><span>SCROLL TO ENTER</span><span>↓</span></div>
              </div>
              <div ref={heroTextRef} className={`v3-hero-art ${V3_ENTRANCE_INITIAL.hero}`}>
                <div className="v3-hero-art-label"><span>01 / 04</span><span>GLITCHGL — MAINFRAME</span></div>
                <div ref={heroVideoRef} className="v3-hero-video"><V3VideoBlock src={V3_HERO_VIDEO_SRC} aspect="video" /></div>
              </div>
            </section>

            <section className="v3-intro-block"><p className="v3-kicker">PROFILE / SELECTED PRACTICE</p><h2 className="v3-statement">unFamous Digital Alcoholic.<br />Frontend Developer.<br />Disco Jockey.<br />Photographer.</h2><a className="v3-text-link" href="https://www.yanfd.cn/" target="_blank" rel="noreferrer">READ THE NOTEBOOK ↗</a></section>

            <section className="v3-project-grid">
              <div className="v3-project-image"><MainCard variant="v3" /></div>
              <div className="v3-project-info"><div><p className="v3-kicker">FEATURED / 001</p><h2 className="v3-project-title">Almost Human<br />Interface</h2><p className="v3-project-copy">An unstable identity system made from fragments, faces and synthetic memory.</p></div><div className="v3-facts">{projectMeta.map((row) => <div key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div><div className="v3-action-row"><NDButton variant="dark" withArrow href="https://gallery.yanfd.cn/">VIEW ARCHIVE</NDButton><NDButton variant="dark" withArrow href="https://github.com/yanfd">GITHUB</NDButton></div></div>
            </section>

            <section className="v3-media-section"><div className="v3-section-heading"><p className="v3-kicker">RECENT SIGNALS</p><span>03 WORKS / 2026</span></div><V3VideoBlock src="/v3/opt1.mp4" aspect="video" /><div className="v3-media-grid"><V3VideoBlock src="/v3/opt2.mp4" aspect="5/4" /><V3VideoBlock src="/v3/opt3.mp4" aspect="5/4" /></div></section>
            <FriendLinksSection />
            <section className="v3-next-project"><img src="/lucid.png" alt="Lucid Dreams" /><div><p className="v3-kicker">NEXT PROJECT</p><h2>Lucid Dreams ↗</h2></div></section>
            <footer className="v3-footer"><span>YANFD© 2026</span><span>MADE IN SHANGHAI / ONLINE EVERYWHERE</span><span>BACK TO TOP ↑</span></footer>
          </main>
        </div>
      </div>
    </>
  );
}
