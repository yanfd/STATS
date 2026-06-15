import type { Metadata } from "next";
import "./v3.css";

export const metadata: Metadata = {
  title: "glitchGL — v3",
  description:
    "The internet's most powerful library for creating live glitch effects in the browser using highly optimised WebGL.",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <div className="v3-root">{children}</div>;
}
