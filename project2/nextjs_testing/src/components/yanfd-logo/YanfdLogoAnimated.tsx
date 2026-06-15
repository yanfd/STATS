"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { YanfdLogoMark } from "./YanfdLogoMark";
import type { YanfdLogoVariant } from "./paths";
import { DEFAULT_YANFD_LOGO_VARIANT } from "./paths";

type MarkScope = {
  root: HTMLDivElement;
  mark: HTMLDivElement;
  partF: HTMLImageElement;
  partD: HTMLImageElement;
  squircle: HTMLDivElement;
  presents?: HTMLElement | null;
};

type YanfdLogoAnimatedProps = {
  variant?: YanfdLogoVariant;
  className?: string;
  markClassName?: string;
  presentsClassName?: string;
  inverted?: boolean;
  showPresents?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  duration?: number;
  onComplete?: () => void;
};

function setMarkBase(scope: MarkScope) {
  gsap.set(scope.root, { transformOrigin: "50% 50%" });
  gsap.set(scope.mark, { transformOrigin: "50% 50%", rotate: 0 });
  gsap.set(scope.partF, { transformOrigin: "50% 50%", x: 0, y: 0 });
  gsap.set(scope.partD, { transformOrigin: "50% 50%", x: 0, y: 0 });
  gsap.set(scope.squircle, { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" });
  gsap.set([scope.partF, scope.partD], { opacity: 1 });
  if (scope.presents) {
    gsap.set(scope.presents, { opacity: 0, y: 18 });
  }
}

function addCockBeat(tl: gsap.core.Timeline, scope: MarkScope, cockOut: number, cockBack: number, partOffset = -10) {
  const { partF, presents } = scope;

  tl.to(partF, { x: partOffset, y: -partOffset, duration: cockOut, ease: "power2.out" });

  if (presents) {
    tl.to(presents, { opacity: 1, y: 0, duration: cockOut * 1.05, ease: "power3.out" }, "<");
  }

  tl.to(partF, { x: 0, y: 0, duration: cockBack, ease: "elastic.out(1.15, 0.42)" });
}

function buildChamberTimeline(scope: MarkScope, duration: number, loop: boolean, onComplete?: () => void) {
  const { root, mark, partF, partD, squircle } = scope;
  const pulseIn = duration * 0.14;
  const pulseOut = duration * 0.16;
  const cockOut = duration * 0.08;
  const cockBack = duration * 0.22;

  setMarkBase(scope);

  const tl = gsap.timeline({ repeat: loop ? -1 : 0, onComplete });

  const pulse = (rotateDelta: number) => {
    tl.to(root, { scale: 0.24, duration: pulseIn, ease: "power3.in" })
      .to([partF, partD], { opacity: 0, duration: pulseIn * 0.35, ease: "power1.out" }, "<")
      .to(squircle, { opacity: 1, scale: 1, duration: pulseIn * 0.55, ease: "power2.out" }, "<35%")
      .to(mark, { rotate: `+=${rotateDelta}`, duration: 0.01 }, `-=${pulseIn * 0.15}`)
      .to(root, { scale: 1, duration: pulseOut, ease: "power3.out" })
      .to(squircle, { opacity: 0, scale: 0.9, duration: pulseOut * 0.35, ease: "power2.in" }, "<20%")
      .to([partF, partD], { opacity: 1, duration: pulseOut * 0.45, ease: "power2.out" }, "<25%");
  };

  pulse(180);
  pulse(180);
  addCockBeat(tl, scope, cockOut, cockBack, -9);

  return tl;
}

function buildRotateTimeline(scope: MarkScope, duration: number, loop: boolean, onComplete?: () => void) {
  const { root, mark, partF, partD, squircle } = scope;
  const pulseIn = duration * 0.18;
  const pulseOut = duration * 0.2;
  const cockOut = duration * 0.07;
  const cockBack = duration * 0.2;

  setMarkBase(scope);

  const tl = gsap.timeline({ repeat: loop ? -1 : 0, onComplete });

  for (let i = 0; i < 2; i += 1) {
    tl.to(root, { scale: 0.28, duration: pulseIn, ease: "power2.inOut" })
      .to([partF, partD], { opacity: 0, duration: pulseIn * 0.4 }, "<")
      .to(squircle, { opacity: 1, scale: 1, duration: pulseIn * 0.5 }, "<30%")
      .to(mark, { rotate: "+=180", duration: pulseIn * 0.9, ease: "power2.inOut" }, "<")
      .to(root, { scale: 1, duration: pulseOut, ease: "back.out(1.6)" })
      .to(squircle, { opacity: 0, duration: pulseOut * 0.35 }, "<20%")
      .to([partF, partD], { opacity: 1, duration: pulseOut * 0.45 }, "<30%");
  }

  addCockBeat(tl, scope, cockOut, cockBack);

  return tl;
}

function buildDiagonalTimeline(scope: MarkScope, duration: number, loop: boolean, onComplete?: () => void) {
  const { root, partF, partD } = scope;
  const shift = duration * 0.22;

  setMarkBase(scope);

  const tl = gsap.timeline({ repeat: loop ? -1 : 0, onComplete });

  tl.to(root, { scale: 0.82, duration: shift * 0.45, ease: "power2.inOut" })
    .to(partF, { x: 18, y: 18, duration: shift, ease: "power3.inOut" }, "<15%")
    .to(partD, { x: -18, y: -18, duration: shift, ease: "power3.inOut" }, "<")
    .to(root, { scale: 1, duration: shift * 0.55, ease: "power2.out" })
    .to(root, { scale: 0.82, duration: shift * 0.45, ease: "power2.inOut" })
    .to(partF, { x: 0, y: 0, duration: shift, ease: "power3.inOut" }, "<15%")
    .to(partD, { x: 0, y: 0, duration: shift, ease: "power3.inOut" }, "<")
    .to(root, { scale: 1, duration: shift * 0.55, ease: "back.out(1.4)" });

  addCockBeat(tl, scope, duration * 0.07, duration * 0.2);

  return tl;
}

export function YanfdLogoAnimated({
  variant = DEFAULT_YANFD_LOGO_VARIANT,
  className = "",
  markClassName = "h-20 w-20",
  presentsClassName = "",
  inverted = false,
  showPresents = false,
  loop = true,
  autoplay = true,
  duration = 2.8,
  onComplete,
}: YanfdLogoAnimatedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const partFRef = useRef<HTMLImageElement>(null);
  const partDRef = useRef<HTMLImageElement>(null);
  const squircleRef = useRef<HTMLDivElement>(null);
  const presentsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!autoplay) return;
    const root = rootRef.current;
    const mark = markRef.current;
    const partF = partFRef.current;
    const partD = partDRef.current;
    const squircle = squircleRef.current;
    const presents = showPresents ? presentsRef.current : null;
    if (!root || !mark || !partF || !partD || !squircle) return;

    const scope = { root, mark, partF, partD, squircle, presents };
    const tl =
      variant === "rotate"
        ? buildRotateTimeline(scope, duration, loop, onComplete)
        : variant === "diagonal"
          ? buildDiagonalTimeline(scope, duration, loop, onComplete)
          : buildChamberTimeline(scope, duration, loop, onComplete);

    return () => {
      tl.kill();
      gsap.set([root, mark, partF, partD, squircle], { clearProps: "all" });
      if (presents) gsap.set(presents, { clearProps: "all" });
    };
  }, [autoplay, duration, loop, onComplete, showPresents, variant]);

  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div ref={rootRef} className="inline-flex">
        <YanfdLogoMark
          inverted={inverted}
          className={markClassName}
          markRef={markRef}
          partFRef={partFRef}
          partDRef={partDRef}
          squircleRef={squircleRef}
        />
      </div>
      {showPresents ? (
        <p
          ref={presentsRef}
          className={`font-mono text-[10px] uppercase tracking-[0.34em] opacity-0 will-change-transform ${
            inverted ? "text-white" : "text-nd-900"
          } ${presentsClassName}`}
        >
          YANFD PRESENTS
        </p>
      ) : null}
    </div>
  );
}
