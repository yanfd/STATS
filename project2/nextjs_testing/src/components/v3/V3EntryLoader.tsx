"use client";

import { useEffect, useState, type ReactNode } from "react";
import { YanfdLogoLoading } from "@/components/yanfd-logo/YanfdLogoLoading";
import { preloadVideo } from "@/components/v3/preloadVideo";

const LOADING_DURATION = 1.6;
const PRELOAD_TIMEOUT_MS = 12000;

export const V3_HERO_VIDEO_SRC = "/v3/first-video.mp4";

type V3EntryLoaderProps = {
  children: ReactNode;
  preloadVideoSrc?: string;
};

export function V3EntryLoader({ children, preloadVideoSrc = V3_HERO_VIDEO_SRC }: V3EntryLoaderProps) {
  const [ready, setReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    preloadVideo(preloadVideoSrc, PRELOAD_TIMEOUT_MS).then(() => {
      if (!cancelled) setVideoReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [preloadVideoSrc]);

  useEffect(() => {
    if (animationDone && videoReady) setReady(true);
  }, [animationDone, videoReady]);

  if (!ready) {
    return (
      <YanfdLogoLoading
        duration={LOADING_DURATION}
        onComplete={() => setAnimationDone(true)}
      />
    );
  }

  return children;
}
