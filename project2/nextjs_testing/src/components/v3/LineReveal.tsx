"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useLineReveal, type LineRevealOptions } from "./useLineReveal";

type LineRevealProps = LineRevealOptions & {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "p" | "h2" | "h3";
};

export function LineReveal({
  children,
  className = "",
  style,
  as: Tag = "div",
  ...options
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement & HTMLParagraphElement & HTMLHeadingElement>(null);
  useLineReveal(ref, options);

  if (Tag === "p") {
    return (
      <p ref={ref} className={className} style={style}>
        {children}
      </p>
    );
  }

  if (Tag === "h2") {
    return (
      <h2 ref={ref} className={className} style={style}>
        {children}
      </h2>
    );
  }

  if (Tag === "h3") {
    return (
      <h3 ref={ref} className={className} style={style}>
        {children}
      </h3>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
