import type { Metadata } from "next";
import "@/app/v3/v3.css";

export const metadata: Metadata = {
  title: "YANFD — Logseq",
  description: "YANFD private Logseq archive",
};

export default function LogLayout({ children }: { children: React.ReactNode }) {
  return <div className="v3-root" style={{ background: "transparent" }}>{children}</div>;
}
