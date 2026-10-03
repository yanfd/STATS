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
  const [exiting, setExiting] = useState(false);

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
    if (!animationDone || !videoReady) return;

    setExiting(true);
    const timer = window.setTimeout(() => setReady(true), 650);
    return () => window.clearTimeout(timer);
  }, [animationDone, videoReady]);

  if (!ready) {
    return (
      <div className={`v3-entry-loader ${exiting ? "is-exiting" : ""}`} aria-live="polite">
        <div className="v3-entry-loader__grain" aria-hidden="true" />
        <div className="v3-entry-loader__topline">
          <span>YANFD / STATS</span>
          <span>SHANGHAI · CN</span>
        </div>

        <YanfdLogoLoading
          duration={LOADING_DURATION}
          background="transparent"
          inverted
          onComplete={() => setAnimationDone(true)}
          className="v3-entry-loader__logo"
        />

        <div className="v3-entry-loader__status">
          <div className="v3-entry-loader__status-row">
            <span>{videoReady ? "MEDIA READY" : "LOADING MEDIA"}</span>
            <span>{animationDone ? "02" : "01"} / 02</span>
          </div>
          <div className="v3-entry-loader__track" aria-hidden="true">
            <span className={videoReady ? "is-ready" : ""} />
          </div>
        </div>
      </div>
    );
  }

  return children;
}
