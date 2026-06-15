"use client";

import type { ReactNode } from "react";

type SplitLinesProps = {
  lines: Array<string | "__BR__">;
  renderLine?: (line: string, index: number) => ReactNode;
};

export function SplitLines({ lines, renderLine }: SplitLinesProps) {
  return (
    <>
      {lines.map((line, index) => {
        if (line === "__BR__") {
          return <br key={`br-${index}`} />;
        }

        return (
          <span key={`${line}-${index}`} className="line-mask">
            <span className="split-line" aria-hidden="true">
              {renderLine ? renderLine(line, index) : line}
            </span>
          </span>
        );
      })}
    </>
  );
}
