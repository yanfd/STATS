"use client";

import Link from "next/link";
import { useNextAvailabilityLabel } from "./NextAvailability";

const menuLinks = [
  { num: "01", label: "INDEX", href: "/v3" },
  { num: "02", label: "PROJECTS", href: "/v3" },
  { num: "03", label: "SERVICES", href: "/v3#services" },
  { num: "04", label: "STORE", href: "/v3#store" },
  { num: "05", label: "ENQUIRE", href: "#enquire" },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const availability = useNextAvailabilityLabel();

  const metaRows = [
    { label: "Studio", value: "YANFD©" },
    { label: "Discipline", value: "Digital Innovation" },
    { label: "Industry", value: "Entertainment" },
    { label: "Next Availability", value: availability ?? "-- --- ----" },
    { label: "Location", value: "Manchester, UK" },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9980] flex flex-col justify-between bg-nd-1100 px-4 py-4">
      <div className="flex flex-col gap-6 pt-16">
        {menuLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex items-baseline gap-4 font-neue font-medium text-2xl uppercase text-nd-300"
          >
            <span className="font-mono text-[11px] text-nd-700 w-6 shrink-0">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6">
          {metaRows.map((row) => (
            <div key={row.label} className="contents">
              <span className="font-mono text-[8px] uppercase text-nd-700">{row.label}</span>
              <span className="font-mono text-[8px] uppercase text-nd-300" suppressHydrationWarning>
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[8px] text-nd-700">REG 14657518 ©{new Date().getFullYear()}</span>
          <span className="font-mono text-[8px] text-nd-700">YANFD LTD</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="fixed bottom-[0.8rem] right-4 p-2 pb-1 text-nd-300"
        aria-label="Close menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
