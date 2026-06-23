"use client";

import { useCallback, useEffect, useState } from "react";
import { dashboardLinks } from "@/data/v3/dashboardLinks";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function V3DashboardPanel() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "d" && event.key !== "D") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      event.preventDefault();
      toggle();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dashboard"
        className="absolute inset-0 bg-nd-1000/40 backdrop-blur-[2px]"
        onClick={close}
      />

      <div className="relative w-full max-w-xl rounded-[4px] border border-nd-500 bg-nd-200 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-nd-700">Dashboard</p>
            <h2 className="font-neue text-lg font-medium text-nd-900">Quick jump</h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="font-mono text-[10px] uppercase tracking-widest text-nd-700 hover:text-nd-900"
          >
            Esc
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {dashboardLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                close();
                window.open(item.href, "_blank", "noopener,noreferrer");
              }}
              className="group flex min-h-24 flex-col justify-between rounded-[4px] border border-nd-500 bg-nd-100 p-3 transition-colors hover:border-nd-800 hover:bg-nd-300 text-left cursor-pointer"
            >
              <div className="flex h-10 items-center">
                {item.icon ? (
                  <img src={item.icon} alt="" className="h-8 w-auto max-w-[2.5rem] object-contain" />
                ) : (
                  <span
                    className="font-neue text-sm font-medium uppercase"
                    style={{ color: item.accent ?? "#2d2f2f" }}
                  >
                    {item.label}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-nd-800 group-hover:text-nd-900">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-nd-700">
          Press <span className="text-nd-900">D</span> to toggle
        </p>
      </div>
    </div>
  );
}
