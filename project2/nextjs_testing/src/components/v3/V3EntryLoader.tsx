"use client";

import { useState, type ReactNode } from "react";
import { YanfdLogoLoading } from "@/components/yanfd-logo/YanfdLogoLoading";

const LOADING_DURATION = 1.6;

type V3EntryLoaderProps = {
  children: ReactNode;
};

export function V3EntryLoader({ children }: V3EntryLoaderProps) {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <YanfdLogoLoading
        duration={LOADING_DURATION}
        onComplete={() => setReady(true)}
      />
    );
  }

  return children;
}
