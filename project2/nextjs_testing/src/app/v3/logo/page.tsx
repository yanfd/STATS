"use client";

import { useState } from "react";
import { YanfdLogo } from "@/components/yanfd-logo/YanfdLogo";
import { YanfdLogoAnimated } from "@/components/yanfd-logo/YanfdLogoAnimated";
import { YanfdLogoLoading } from "@/components/yanfd-logo/YanfdLogoLoading";
import { YANFD_MARK_FULL, yanfdLogoVariants, DEFAULT_YANFD_LOGO_VARIANT, type YanfdLogoVariant } from "@/components/yanfd-logo/paths";

export default function YanfdLogoPreviewPage() {
  const [activeVariant, setActiveVariant] = useState<YanfdLogoVariant>(DEFAULT_YANFD_LOGO_VARIANT);
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="min-h-svh bg-nd-200 text-nd-900 p-6 md:p-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="space-y-3 border-b border-nd-500 pb-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-nd-700">YANFD Logo Lab</p>
          <h1 className="font-neue text-3xl font-medium tracking-tight md:text-4xl">原图裁剪 + 动画</h1>
          <p className="max-w-2xl font-neue text-sm text-nd-800 md:text-base">
            图形直接来自原 PNG 裁剪，F/D 分层用于 Rotate 动画。默认 Rotate，含上膛弹回。
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {yanfdLogoVariants.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveVariant(item.id);
                setReplayKey((k) => k + 1);
              }}
              className={`rounded-[4px] border p-4 text-left transition-colors ${
                activeVariant === item.id
                  ? "border-nd-900 bg-nd-400"
                  : "border-nd-500 bg-nd-200 hover:bg-nd-400/60"
              }`}
            >
              <p className="font-neue text-sm font-medium uppercase">{item.label}</p>
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-nd-700">{item.description}</p>
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[4px] border border-nd-500 bg-nd-100 p-8 flex flex-col items-center justify-center gap-6 min-h-[20rem]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-nd-700">Active: {activeVariant}</p>
            <YanfdLogoAnimated
              key={`${activeVariant}-${replayKey}`}
              variant={activeVariant}
              markClassName="h-28 w-28"
              loop={false}
              duration={2.8}
            />
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              className="font-mono text-[11px] uppercase tracking-widest text-nd-800 underline underline-offset-4"
            >
              Replay
            </button>
          </div>

          <div className="rounded-[4px] border border-nd-500 bg-nd-100 p-8 flex flex-col items-center justify-center gap-6 min-h-[20rem]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-nd-700">原图（裁剪 mark）</p>
            <img src={YANFD_MARK_FULL} alt="YANFD mark" className="h-28 w-28 object-contain" />
            <YanfdLogo markClassName="h-20 w-auto" />
          </div>
        </section>

        <section className="overflow-hidden rounded-[4px] border border-nd-500">
          <p className="border-b border-nd-500 bg-nd-400 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-nd-800">
            Loading preview (loop)
          </p>
          <div className="h-[24rem]">
            <YanfdLogoLoading variant={activeVariant} loop inverted={false} showPresents background="#f2f2f4" />
          </div>
        </section>
      </div>
    </div>
  );
}
