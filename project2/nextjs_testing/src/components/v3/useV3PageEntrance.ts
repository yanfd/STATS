"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

export const V3_ENTRANCE_INITIAL = {
  siteBar: "origin-left scale-x-0",
  bookCall: "opacity-0 translate-x-12",
  hero: "opacity-0 translate-y-[18px]",
} as const;

type V3PageEntranceRefs = {
  siteBarRef: RefObject<HTMLDivElement | null>;
  bookCallRef: RefObject<HTMLDivElement | null>;
  heroLogoRef: RefObject<HTMLElement | null>;
  heroTextRef: RefObject<HTMLElement | null>;
  heroVideoRef: RefObject<HTMLElement | null>;
};

export function useV3PageEntrance({
  siteBarRef,
  bookCallRef,
  heroLogoRef,
  heroTextRef,
  heroVideoRef,
}: V3PageEntranceRefs) {
  useLayoutEffect(() => {
    const bar = siteBarRef.current;
    const bookCall = bookCallRef.current;
    const heroLogo = heroLogoRef.current;
    const heroText = heroTextRef.current;
    const heroVideo = heroVideoRef.current;
    if (!bar || !bookCall || !heroLogo || !heroText || !heroVideo) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(bookCall, { x: 48, opacity: 0 });
    gsap.set([heroLogo, heroText, heroVideo], { opacity: 0, y: 18 });

    const tl = gsap
      .timeline({ delay: 0.12 })
      .to(bar, {
        scaleX: 1,
        duration: 0.75,
        ease: "power3.inOut",
      })
      .to(
        [heroLogo, heroText, heroVideo],
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        bookCall,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "+=0.05",
      );

    return () => {
      tl.kill();
    };
  }, [siteBarRef, bookCallRef, heroLogoRef, heroTextRef, heroVideoRef]);
}
