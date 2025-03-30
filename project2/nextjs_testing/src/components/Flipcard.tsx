"use client"; // 明确标记这是一个 Client Component
import { useState } from "react";
import { twMerge as tw } from "tailwind-merge";

const FlipCard = () =>  {
  const [hasFlipped, setHasFilpped] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div
        className={tw(
          "relative w-[240px] h-[360px] cursor-pointer",
          "transition-transform duration-700 perspective-1000",
          "transform-style-3d perspective-origin-center",
          hasFlipped && "rotate-y-180"
        )}
        onClick={() => setHasFilpped(!hasFlipped)}
      >
        <div
          className={tw(
            "absolute inset-0 top-0 left-0",
            "flex flex-col items-center justify-center w-full h-full p-2",
            "rounded-lg shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)]",
            "bg-gradient-to-b from-sky-200/50 via-purple-100 to-slate-50 ",
            "backdrop-blur-lg backface-hidden"
          )}
        >
          <div className="font-mono text-lg">QUESTION</div>
        </div>
        <div
          className={tw(
            "absolute inset-0 top-0 left-0",
            "flex flex-col items-center justify-center w-full h-full p-2",
            "rounded-lg shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)]",
            "bg-gradient-to-b from-sky-200/50 via-purple-100 to-slate-50 ",
            "backdrop-blur-lg backface-hidden rotate-y-180"
          )}
        >
          <div className="font-mono text-lg">ANWSER</div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;