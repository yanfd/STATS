"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

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
  useEffect(() => {
    const bar = siteBarRef.current;
    const bookCall = bookCallRef.current;
    const heroLogo = heroLogoRef.current;
    const heroText = heroTextRef.current;
    const heroVideo = heroVideoRef.current;
    if (!bar || !bookCall || !heroLogo || !heroText || !heroVideo) return;

    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(bookCall, { x: 48, opacity: 0 });
      gsap.set([heroLogo, heroText, heroVideo], { opacity: 0, y: 18 });

      gsap
        .timeline({ delay: 0.12 })
        .to(bar, {
          scaleX: 1,
          duration: 0.75,
          ease: "power3.inOut",
        })
        .to(
          bookCall,
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "+=0.05",
        )
        .to(
          heroLogo,
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          heroText,
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power2.out",
          },
          "-=0.65",
        )
        .to(
          heroVideo,
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power2.out",
          },
          "-=0.55",
        );
    });

    return () => ctx.revert();
  }, [siteBarRef, bookCallRef, heroLogoRef, heroTextRef, heroVideoRef]);
}
