# Log Hero Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a temporary `/log-preview` page that shows three candidate log hero styles in the existing STATS v3 visual language so the user can choose before changing the real `/log` page.

**Architecture:** Add one isolated Next.js route under `src/app/log-preview/page.tsx`. The page will reuse `SiteBar`, v3 layout styling from `src/app/log/layout.tsx`, and local sample data/functions so it does not alter `/log` behavior or APIs.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind utility classes, project v3 CSS variables/fonts via `@/app/v3/v3.css`, lucide-react icons already installed.

## Global Constraints

- Do not modify the production `/log` page in this preview task.
- Keep the preview route temporary and self-contained.
- Preserve STATS v3 visual language: `v3-root`, Neue Haas Display, PP Supply Mono, neutral palette, minimal borders, small uppercase metadata.
- Show three hero directions: Sparse Stats Hero, Command Hero, Featured Hero.
- Use static sample entries inside the preview page; do not fetch or mutate comments/log APIs.
- The preview must be readable on desktop and mobile.
- No new dependencies.

---

## File Structure

- Create: `project2/nextjs_testing/src/app/log-preview/layout.tsx`
  - Provides metadata and wraps the preview page in `v3-root`, matching `/log/layout.tsx`.
- Create: `project2/nextjs_testing/src/app/log-preview/page.tsx`
  - Renders the comparison page, three hero variants, and shared sample rows.

---

### Task 1: Add Log Preview Route

**Files:**
- Create: `project2/nextjs_testing/src/app/log-preview/layout.tsx`
- Create: `project2/nextjs_testing/src/app/log-preview/page.tsx`

**Interfaces:**
- Consumes: `SiteBar` from `@/components/v3/SiteBar`, v3 CSS from `@/app/v3/v3.css`, icons from `lucide-react`.
- Produces: A navigable Next.js route at `/log-preview` with three visible hero concepts.

- [ ] **Step 1: Create the route layout**

Create `project2/nextjs_testing/src/app/log-preview/layout.tsx` with this content:

```tsx
import type { Metadata } from "next";
import "@/app/v3/v3.css";

export const metadata: Metadata = {
  title: "YANFD — Log Preview",
  description: "Preview candidate hero styles for the YANFD log archive",
};

export default function LogPreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="v3-root">{children}</div>;
}
```

- [ ] **Step 2: Create the preview page with three hero variants**

Create `project2/nextjs_testing/src/app/log-preview/page.tsx` with this content:

```tsx
import { ArrowUpRight, CalendarDays, Command, MessageSquare, Search } from "lucide-react";
import { SiteBar } from "@/components/v3/SiteBar";

type PreviewEntry = {
  id: string;
  day: string;
  weekday: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  comments: number;
};

const sampleEntries: PreviewEntry[] = [
  {
    id: "1",
    day: "23",
    weekday: "Tue",
    date: "Jun 2026",
    title: "Rebuilding the log archive",
    excerpt: "A quieter index for small records, links, screenshots, and late-night notes.",
    tag: "Design",
    comments: 4,
  },
  {
    id: "2",
    day: "18",
    weekday: "Thu",
    date: "Jun 2026",
    title: "Stats page loading pass",
    excerpt: "Reduced the waiting state and made the archive feel less like a blank wall.",
    tag: "Build",
    comments: 2,
  },
  {
    id: "3",
    day: "07",
    weekday: "Sun",
    date: "Jun 2026",
    title: "Small interface notes",
    excerpt: "Tiny visual decisions that make the page easier to scan without becoming loud.",
    tag: "Note",
    comments: 0,
  },
];

const stats = [
  { label: "Entries", value: "128" },
  { label: "Months", value: "14" },
  { label: "Latest", value: "Jun 23" },
];

export default function LogPreviewPage() {
  return (
    <div className="h-svh overflow-hidden bg-nd-200 text-nd-900">
      <SiteBar />
      <main className="h-full overflow-y-auto px-4 pb-24 pt-24 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
          <header className="border-b border-nd-500 pb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-nd-600">Log hero preview</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h1 className="font-neue text-5xl font-medium leading-[0.9] tracking-tight text-nd-900 md:text-7xl">
                Choose the opening.
              </h1>
              <p className="max-w-sm font-neue text-sm leading-relaxed text-nd-700">
                Three temporary hero directions for the log page. Same archive, different first impression.
              </p>
            </div>
          </header>

          <PreviewSection label="A / Sparse Stats Hero" note="Closest to current STATS: cold, minimal, clearer hierarchy.">
            <SparseStatsHero />
            <PreviewRows />
          </PreviewSection>

          <PreviewSection label="B / Command Hero" note="A more 21st-style entry point: search-forward, explicit, easy to scan.">
            <CommandHero />
            <PreviewRows />
          </PreviewSection>

          <PreviewSection label="C / Featured Hero" note="More editorial: latest entry becomes the visual anchor.">
            <FeaturedHero />
            <PreviewRows />
          </PreviewSection>
        </div>
      </main>
    </div>
  );
}

function PreviewSection({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[6px] border border-nd-500 bg-nd-100 p-3 shadow-[0_18px_60px_rgba(18,18,18,0.04)] md:p-5">
      <div className="mb-4 flex flex-col gap-2 border-b border-nd-500 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-nd-600">Option</p>
          <h2 className="mt-1 font-neue text-2xl font-medium text-nd-900">{label}</h2>
        </div>
        <p className="max-w-md font-neue text-sm leading-relaxed text-nd-700">{note}</p>
      </div>
      <div className="overflow-hidden rounded-[4px] border border-nd-500 bg-nd-200">{children}</div>
    </section>
  );
}

function SparseStatsHero() {
  return (
    <div className="px-5 py-10 md:px-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nd-600">Archive / notes / updates</p>
          <h3 className="mt-4 font-neue text-[clamp(4rem,12vw,9rem)] font-medium leading-[0.82] tracking-tight text-nd-900">
            Log
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[4px] border border-nd-500 bg-nd-100 p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-nd-600">{item.label}</p>
              <p className="mt-3 font-neue text-2xl font-medium text-nd-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 max-w-xl border-t border-nd-500 pt-4 font-neue text-sm leading-relaxed text-nd-700">
        Personal archive of shipped changes, loose fragments, and the parts that should not disappear into chat history.
      </p>
    </div>
  );
}

function CommandHero() {
  return (
    <div className="px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nd-600">Searchable archive</p>
        <h3 className="mt-4 font-neue text-[clamp(3.5rem,10vw,7.5rem)] font-medium leading-[0.86] tracking-tight text-nd-900">
          Find a log.
        </h3>
        <div className="mt-8 flex items-center gap-3 rounded-[5px] border border-nd-500 bg-nd-100 px-4 py-3 text-left shadow-[0_14px_40px_rgba(18,18,18,0.04)]">
          <Search size={16} className="text-nd-600" />
          <span className="flex-1 font-neue text-sm text-nd-700">Search by title, note, month, or comment...</span>
          <span className="inline-flex items-center gap-1 rounded-[3px] border border-nd-500 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-nd-600">
            <Command size={10} /> K
          </span>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {stats.map((item) => (
            <span key={item.label} className="rounded-full border border-nd-500 bg-nd-100 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-nd-700">
              {item.value} {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedHero() {
  const latest = sampleEntries[0];

  return (
    <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
      <div className="flex min-h-72 flex-col justify-between border-b border-nd-500 px-5 py-10 md:border-b-0 md:border-r md:px-10 md:py-14">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-nd-600">Latest first</p>
          <h3 className="mt-4 font-neue text-[clamp(3.5rem,9vw,7rem)] font-medium leading-[0.86] tracking-tight text-nd-900">
            Log
          </h3>
        </div>
        <p className="mt-8 max-w-sm font-neue text-sm leading-relaxed text-nd-700">
          A running record with the newest note pulled forward, so the page immediately says what changed.
        </p>
      </div>
      <article className="bg-nd-100 p-5 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-nd-600">Featured entry</p>
        <div className="mt-8 flex items-start gap-5">
          <div className="shrink-0 text-right">
            <p className="font-neue text-5xl font-medium leading-none text-nd-900">{latest.day}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-nd-600">{latest.weekday}</p>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-nd-600">{latest.date} · {latest.tag}</p>
            <h4 className="mt-3 font-neue text-3xl font-medium leading-tight text-nd-900">{latest.title}</h4>
            <p className="mt-4 max-w-xl font-neue text-sm leading-relaxed text-nd-700">{latest.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-[4px] bg-nd-900 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-nd-100">
              Read latest <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

function PreviewRows() {
  return (
    <div className="border-t border-nd-500 bg-nd-100 p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-nd-600">Recent entries</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-nd-600">Jun 2026</p>
      </div>
      <div className="divide-y divide-nd-500 border-y border-nd-500">
        {sampleEntries.map((entry) => (
          <article key={entry.id} className="grid gap-4 py-4 md:grid-cols-[5rem_1fr_auto] md:items-center">
            <div className="flex items-baseline gap-2 md:block md:text-right">
              <p className="font-neue text-3xl font-medium leading-none text-nd-900">{entry.day}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-nd-600 md:mt-1">{entry.weekday}</p>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-nd-600">{entry.date}</span>
                <span className="h-1 w-1 rounded-full bg-nd-600" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-nd-700">{entry.tag}</span>
              </div>
              <h4 className="mt-2 font-neue text-xl font-medium leading-snug text-nd-900">{entry.title}</h4>
              <p className="mt-1 max-w-2xl font-neue text-sm leading-relaxed text-nd-700">{entry.excerpt}</p>
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-nd-600 md:justify-end">
              <span className="inline-flex items-center gap-1"><MessageSquare size={11} /> {entry.comments}</span>
              <span className="inline-flex items-center gap-1"><CalendarDays size={11} /> Open</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Run TypeScript/build validation**

Run from repository root:

```bash
cd project2/nextjs_testing && npm run build
```

Expected: build completes without TypeScript or Next.js errors. If the build fails because unrelated existing files already fail, record the exact failure and still verify this route's files have no syntax/type errors.

- [ ] **Step 4: Manually inspect the preview page**

Run:

```bash
cd project2/nextjs_testing && npm run dev
```

Open `http://localhost:3000/log-preview` and verify:

- The page loads with the STATS site bar.
- The top heading says `Choose the opening.`
- Three sections are visible: `A / Sparse Stats Hero`, `B / Command Hero`, and `C / Featured Hero`.
- The page is scrollable.
- Each section has the same recent-entry rows underneath so the hero options can be compared fairly.
- The layout remains readable at mobile width.

- [ ] **Step 5: Commit the preview route**

```bash
git add docs/superpowers/plans/2026-06-23-log-hero-preview.md project2/nextjs_testing/src/app/log-preview/layout.tsx project2/nextjs_testing/src/app/log-preview/page.tsx
git commit -m "feat: add log hero preview"
```

---

## Self-Review

- Spec coverage: The plan creates a temporary preview page, keeps `/log` untouched, shows three hero styles, uses STATS v3 styling, and avoids API changes.
- Placeholder scan: No TBD/TODO/implement-later placeholders remain.
- Type consistency: `PreviewEntry`, `sampleEntries`, and component props are defined in the same file and referenced consistently.
