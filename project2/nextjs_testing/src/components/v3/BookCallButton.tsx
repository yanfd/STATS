"use client";

import { forwardRef } from "react";

export const BookCallButton = forwardRef<HTMLDivElement>(function BookCallButton(_props, ref) {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:bottom-auto md:left-auto md:right-4 md:top-14 md:translate-x-0">
      <div ref={ref} className="will-change-transform">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-4 rounded-[4px] bg-nd-1000 p-1 pl-2.5 pr-1 pointer-events-auto"
        >
          <span className="font-mono text-[10px] -ml-1 whitespace-nowrap tracking-wide text-nd-300">WHERE AM I</span>
          <div className="shrink-0 overflow-hidden rounded-[2px]">
            <img src="/source/profilepic.jpg" alt="" className="h-8 w-8 object-cover" />
          </div>
        </button>
      </div>
    </div>
  );
});
