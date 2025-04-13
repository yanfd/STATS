"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

export default function EarthGlobeClient() {
  return (
    <Suspense fallback={<div>加载地球模型...</div>}>
      <Globe />
    </Suspense>
  );
}