"use client";

import { YanfdLogoAnimated } from "./YanfdLogoAnimated";
import type { YanfdLogoVariant } from "./paths";
import { DEFAULT_YANFD_LOGO_VARIANT } from "./paths";

type YanfdLogoLoadingProps = {
  variant?: YanfdLogoVariant;
  background?: string;
  duration?: number;
  loop?: boolean;
  inverted?: boolean;
  showPresents?: boolean;
  showText?: boolean;
  onComplete?: () => void;
  className?: string;
};

/** Entry / splash loading — one-shot rotate animation, then onComplete */
export function YanfdLogoLoading({
  variant = DEFAULT_YANFD_LOGO_VARIANT,
  background = "#f2f2f4",
  duration = 1.6,
  loop = false,
  inverted = false,
  showPresents = true,
  className = "",
  onComplete,
}: YanfdLogoLoadingProps) {
  return (
    <div
      className={`flex min-h-svh w-full flex-col items-center justify-center ${className}`}
      style={{ background }}
    >
      <YanfdLogoAnimated
        variant={variant}
        inverted={inverted}
        showPresents={showPresents}
        markClassName="h-24 w-24 md:h-28 md:w-28"
        presentsClassName="text-[13px] md:text-[15px] tracking-[0.28em]"
        loop={loop}
        duration={duration}
        onComplete={onComplete}
      />
    </div>
  );
}
