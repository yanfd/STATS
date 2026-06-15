"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type LineRevealOptions = {
  start?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  playOnMount?: boolean;
  delay?: number;
  scrollerRef?: RefObject<HTMLElement | null>;
};

export function useLineReveal(
  ref: RefObject<HTMLElement | null>,
  {
    start = "top 80%",
    duration = 0.8,
    stagger = 0.05,
    ease = "power3.out",
    playOnMount = false,
    delay = 0,
    scrollerRef,
  }: LineRevealOptions = {},
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const lines = Array.from(root.querySelectorAll<HTMLElement>(".split-line"));
      if (!lines.length) return;

      gsap.set(lines, { yPercent: 120 });
      const tween = gsap.to(lines, {
        yPercent: 0,
        duration,
        stagger,
        ease,
        paused: true,
        delay,
      });

      if (playOnMount) {
        const timer = window.setTimeout(() => tween.play(), 120);
        return () => window.clearTimeout(timer);
      }

      const scroller = scrollerRef?.current ?? undefined;

      ScrollTrigger.create({
        trigger: root,
        scroller,
        start,
        once: true,
        onEnter: () => tween.play(),
      });
    }, root);

    return () => ctx.revert();
  }, [ref, scrollerRef, start, duration, stagger, ease, playOnMount, delay]);
}
