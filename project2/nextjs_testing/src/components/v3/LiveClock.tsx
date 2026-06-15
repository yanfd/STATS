"use client";

import { useEffect, useState } from "react";
import { formatSiteClock } from "./dateUtils";

export function LiveClock() {
  const [clock, setClock] = useState<{ label: string; time: string } | null>(null);

  useEffect(() => {
    const tick = () => setClock(formatSiteClock(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <span className="sitebar-text text-nd-300" suppressHydrationWarning>
        {clock?.label ?? "GMT+8"}
      </span>
      <span className="sitebar-text text-nd-300" suppressHydrationWarning>
        {clock?.time ?? "--:--:--"}
      </span>
    </>
  );
}
