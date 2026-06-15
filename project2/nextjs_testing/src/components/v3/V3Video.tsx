"use client";

import { useEffect, useRef } from "react";

type V3VideoProps = {
  src: string;
  className?: string;
};

export function V3Video({ src, className = "absolute inset-0 h-full w-full object-cover" }: V3VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);

    return () => video.removeEventListener("loadeddata", tryPlay);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}

type V3VideoBlockProps = {
  src: string;
  aspect?: "video" | "5/4";
  className?: string;
};

export function V3VideoBlock({ src, aspect = "video", className = "" }: V3VideoBlockProps) {
  const aspectClass = aspect === "5/4" ? "aspect-[5/4]" : "aspect-video";

  return (
    <div className={`relative w-full overflow-hidden rounded-[4px] ${aspectClass} ${className}`}>
      <V3Video src={src} />
    </div>
  );
}
