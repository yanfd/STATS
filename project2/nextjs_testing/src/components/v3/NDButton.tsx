"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";

type NDButtonProps = {
  children: string;
  variant?: "primary" | "outline" | "dark";
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variantClass = {
  primary: "bg-nd-400 cursor-pointer text-nd-1000",
  outline: "border border-nd-900 cursor-pointer text-nd-900",
  dark: "bg-nd-1000 cursor-pointer text-nd-300",
};

export function NDButton({
  children,
  variant = "primary",
  icon,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: NDButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hoverLabelRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleEnter = () => {
    if (disabled) return;
    timelineRef.current?.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    if (icon && iconRef.current) {
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      const iconRect = iconRef.current.getBoundingClientRect();
      const shift = buttonRect ? buttonRect.right - 8 - iconRect.right : 0;
      tl.to(labelRef.current, { y: "-105%", duration: 0.3, ease: "power3.in" })
        .to(iconRef.current, { x: shift, duration: 0.4, ease: "power3.inOut" }, "-=0.18")
        .to(hoverLabelRef.current, { y: "0%", duration: 0.3, ease: "power3.out" }, "-=0.18");
      return;
    }

    tl.to(labelRef.current, { y: "-105%", duration: 0.3, ease: "power3.in" }).to(
      hoverLabelRef.current,
      { y: "0%", duration: 0.3, ease: "power3.out" },
      "-=0.18",
    );
  };

  const handleLeave = () => {
    if (disabled) return;
    timelineRef.current?.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    if (icon && iconRef.current) {
      tl.to(hoverLabelRef.current, { y: "105%", duration: 0.3, ease: "power3.in" })
        .to(iconRef.current, { x: 0, duration: 0.4, ease: "power3.inOut" }, "-=0.18")
        .to(labelRef.current, { y: "0%", duration: 0.3, ease: "power3.out" }, "-=0.18");
      return;
    }

    tl.to(hoverLabelRef.current, { y: "105%", duration: 0.3, ease: "power3.in" }).to(
      labelRef.current,
      { y: "0%", duration: 0.3, ease: "power3.out" },
      "-=0.18",
    );
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`w-full flex items-center justify-between px-[0.5rem] py-[0.15rem] overflow-hidden relative ${variantClass[variant]} ${className}`}
    >
      <span className="font-mono text-[12px] uppercase invisible select-none" aria-hidden="true">
        {children}
      </span>

      {icon && (
        <span
          ref={iconRef}
          className="flex items-center justify-center absolute left-[0.5rem] top-1/2 -translate-y-1/2"
        >
          {icon}
        </span>
      )}

      <div className="overflow-hidden absolute right-[0.5rem] top-0 bottom-0 flex items-center">
        <span ref={labelRef} className="font-mono text-[12px] uppercase block">
          {children}
        </span>
      </div>

      <div className="overflow-hidden absolute left-[0.5rem] top-0 bottom-0 flex items-center pointer-events-none">
        <span
          ref={hoverLabelRef}
          className="font-mono text-[12px] uppercase block"
          style={{ transform: "translateY(105%)" }}
          aria-hidden="true"
        >
          {children}
        </span>
      </div>
    </button>
  );
}

export function ArrowIcon() {
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-nd-300">
      <path d="M8 5L0 10V0L8 5Z" fill="currentColor" />
    </svg>
  );
}
