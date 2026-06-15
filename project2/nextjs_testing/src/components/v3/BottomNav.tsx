"use client";

import Link from "next/link";

const navItems = [
  { label: "INDEX", href: "/v3", active: false },
  { label: "PROJECTS", href: "/v3", active: true },
  { label: "SERVICES", href: "/v3#services", active: false },
  { label: "STORE", href: "/v3#store", active: false },
];

export function BottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <div className="fixed bottom-[0.8rem] left-4 right-4 z-50 flex items-end justify-between mix-blend-difference pointer-events-none">
      <nav className="hidden md:block">
        <ul className="flex items-center gap-4 pointer-events-auto">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center font-neue font-bold text-[12px] uppercase ${
                  item.active ? "text-nd-300" : "text-nd-700"
                }`}
              >
                <span className="nav-item-text">{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onMenuOpen}
              className="flex items-center font-neue font-bold text-[12px] uppercase text-nd-700"
            >
              <span className="nav-item-text">ENQUIRE</span>
            </button>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        onClick={onMenuOpen}
        className="md:hidden pointer-events-auto overflow-hidden mix-blend-difference"
        aria-label="Open menu"
      >
        <span className="font-neue font-medium text-2xl h-[1.75rem] -tracking-[0.02em] uppercase text-nd-300 block">
          MENU
        </span>
      </button>
    </div>
  );
}
