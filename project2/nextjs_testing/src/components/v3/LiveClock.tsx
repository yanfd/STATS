"use client";

import { useEffect, useState } from "react";

function formatGmtClock(date: Date) {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = String(date.getUTCFullYear()).slice(-2);
  const time = date.toUTCString().slice(17, 25);
  return { label: `GMT ${day} ${month} ${year}`, time };
}

export function LiveClock() {
  const [clock, setClock] = useState<{ label: string; time: string } | null>(null);

  useEffect(() => {
    const tick = () => setClock(formatGmtClock(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <span className="sitebar-text text-nd-300" suppressHydrationWarning>
        {clock?.label ?? "GMT"}
      </span>
      <span className="sitebar-text text-nd-300" suppressHydrationWarning>
        {clock?.time ?? "--:--:--"}
      </span>
    </>
  );
}
