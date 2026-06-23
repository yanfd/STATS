import type { Metadata } from "next";
import "@/app/v3/v3.css";

export const metadata: Metadata = {
  title: "YANFD — Log",
  description: "YANFD log archive",
};

export default function LogLayout({ children }: { children: React.ReactNode }) {
  return <div className="v3-root" style={{ background: "transparent" }}>{children}</div>;
}
