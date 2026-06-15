"use client";

import type { CSSProperties } from "react";
import { friendLinks, friendsAnnouncement, type FriendLink } from "@/data/v3/friendLinks";
import { NDButton } from "@/components/v3/NDButton";

const floatSlots = [
  { top: "8%", left: "4%", delay: "0s", duration: "7s" },
  { top: "14%", right: "5%", delay: "1.1s", duration: "6.2s" },
  { bottom: "18%", left: "6%", delay: "2.3s", duration: "7.4s" },
  { bottom: "10%", right: "4%", delay: "0.6s", duration: "6.8s" },
  { top: "42%", left: "2%", delay: "1.8s", duration: "8s" },
  { top: "48%", right: "3%", delay: "2.8s", duration: "6.5s" },
];

type FriendLinkCardProps = {
  friend: FriendLink;
  className?: string;
  style?: CSSProperties;
};

function FriendLinkCard({ friend, className = "", style }: FriendLinkCardProps) {
  return (
    <article
      className={`rounded-[4px] border border-nd-800/80 bg-nd-1000/75 p-3 backdrop-blur-sm ${className}`}
      style={style}
    >
      <div className="flex items-start gap-3">
        <img
          src={friend.avatar}
          alt={friend.name}
          className="h-11 w-11 shrink-0 rounded-[4px] object-cover bg-nd-900"
        />
        <div className="min-w-0 flex-1">
          <p className="font-neue text-sm uppercase tracking-tight text-nd-300">{friend.name}</p>
          <p className="mt-1 font-mono text-[10px] uppercase leading-relaxed text-nd-600">{friend.description}</p>
        </div>
      </div>
      <NDButton variant="dark" withArrow href={friend.href} className="mt-3 w-full">
        VISIT
      </NDButton>
    </article>
  );
}

export function FriendLinksSection() {
  const { logo, logoAlt, badge, title, subtitle } = friendsAnnouncement;

  return (
    <section
      id="friends"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-nd-1000 p-4"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {friendLinks.map((friend, index) => {
          const slot = floatSlots[index % floatSlots.length];
          return (
            <FriendLinkCard
              key={friend.name}
              friend={friend}
              className="friend-link-float pointer-events-auto absolute w-[14.5rem]"
              style={{
                top: slot.top,
                left: slot.left,
                right: slot.right,
                bottom: slot.bottom,
                animationDelay: slot.delay,
                animationDuration: slot.duration,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex w-full max-w-[23.1rem] flex-col gap-6">
        <div className="rounded-[4px] border border-nd-800 bg-nd-900 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <img
                alt={logoAlt}
                className="h-14 w-auto max-w-[7rem] object-contain opacity-70"
                src={logo}
              />
              <span className="font-neue text-xs uppercase tracking-widest text-nd-300 opacity-70">{badge}</span>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-nd-600">Friends</p>
              <h2
                className="mt-2 uppercase font-neue text-3xl font-medium text-nd-300 !leading-[0.9em] tracking-tight md:text-4xl"
                style={{ textAlign: "justify", textAlignLast: "justify" }}
              >
                {title}
              </h2>
            </div>

            <p className="font-mono text-[11px] uppercase leading-relaxed text-nd-600">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:hidden">
          {friendLinks.map((friend) => (
            <FriendLinkCard key={friend.name} friend={friend} />
          ))}
        </div>
      </div>
    </section>
  );
}
