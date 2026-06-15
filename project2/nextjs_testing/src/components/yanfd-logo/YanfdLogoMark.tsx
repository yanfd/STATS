import type { Ref } from "react";
import { YANFD_PIECE_D, YANFD_PIECE_F } from "./paths";

type YanfdLogoMarkProps = {
  className?: string;
  inverted?: boolean;
  markRef?: Ref<HTMLDivElement>;
  partFRef?: Ref<HTMLImageElement>;
  partDRef?: Ref<HTMLImageElement>;
  squircleRef?: Ref<HTMLDivElement>;
};

export function YanfdLogoMark({
  className = "h-20 w-20",
  inverted = false,
  markRef,
  partFRef,
  partDRef,
  squircleRef,
}: YanfdLogoMarkProps) {
  const pieceClassName = inverted ? "invert" : "";

  return (
    <div ref={markRef} className={`relative aspect-square ${className}`} aria-hidden>
      <div
        ref={squircleRef}
        className={`pointer-events-none absolute inset-0 rounded-[8.5%] opacity-0 ${
          inverted ? "bg-white" : "bg-[#1e1e1e]"
        }`}
      />

      <img
        ref={partFRef}
        src={YANFD_PIECE_F}
        alt=""
        draggable={false}
        className={`absolute inset-0 h-full w-full object-contain ${pieceClassName}`}
      />

      <img
        ref={partDRef}
        src={YANFD_PIECE_D}
        alt=""
        draggable={false}
        className={`absolute inset-0 h-full w-full object-contain ${pieceClassName}`}
      />
    </div>
  );
}
