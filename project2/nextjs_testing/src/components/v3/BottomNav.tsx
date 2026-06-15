"use client";

const navItems = [
  { label: "BLOG", href: "https://www.yanfd.cn/" },
  { label: "ALMOSTHUMAN GALLERY", href: "https://gallery.yanfd.cn/" },
  { label: "GITHUB", href: "https://github.com/yanfd" },
];

export function BottomNav({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <div className="fixed bottom-[0.8rem] left-4 right-4 z-50 flex items-end justify-between mix-blend-difference pointer-events-none">
      <nav className="hidden md:block">
        <ul className="flex items-center gap-4 pointer-events-auto">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-neue font-bold text-[12px] uppercase text-nd-700 hover:text-nd-300 transition-colors"
              >
                <span className="nav-item-text">{item.label}</span>
              </a>
            </li>
          ))}
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
