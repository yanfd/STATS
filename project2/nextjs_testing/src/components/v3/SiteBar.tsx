"use client";

import { forwardRef } from "react";
import { LiveClock } from "./LiveClock";
import { NextAvailability } from "./NextAvailability";

export const SiteBar = forwardRef<HTMLDivElement>(function SiteBar(_props, ref) {
  return (
    <div
      ref={ref}
      className="fixed top-4 left-4 right-4 z-50 overflow-hidden rounded bg-nd-1000 pointer-events-none will-change-transform"
    >
      <div className="grid w-full grid-cols-3 items-center gap-2 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2 justify-start overflow-hidden">
          <span className="sitebar-text hidden md:inline shrink-0 text-nd-700">YANFD©</span>
          <span className="sitebar-text hidden md:inline truncate text-nd-300">DIGITAL JOYCLUB</span>
        </div>

        <div className="flex items-center justify-center gap-3 whitespace-nowrap">
          <LiveClock />
        </div>

        <div className="flex min-w-0 items-center justify-end gap-2 whitespace-nowrap">
          <span className="sitebar-text shrink-0 text-nd-700">DATE:</span>
          <NextAvailability className="sitebar-text shrink-0 text-nd-300" />
        </div>
      </div>
    </div>
  );
});
