import type { Metadata } from "next";
import "./v3.css";

export const metadata: Metadata = {
  title: "YANFD — v3",
  description: "YANFD digital studio — v3",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <div className="v3-root">{children}</div>;
}
