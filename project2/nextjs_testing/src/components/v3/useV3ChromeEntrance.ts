"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

export function useV3ChromeEntrance(
  siteBarRef: RefObject<HTMLDivElement | null>,
  bookCallRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const bar = siteBarRef.current;
    const bookCall = bookCallRef.current;
    if (!bar || !bookCall) return;

    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(bookCall, { x: 48, opacity: 0 });

      gsap
        .timeline({ delay: 0.15 })
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
        );
    });

    return () => ctx.revert();
  }, [siteBarRef, bookCallRef]);
}
