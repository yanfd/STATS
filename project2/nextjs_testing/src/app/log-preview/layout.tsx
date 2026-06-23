import type { Metadata } from "next";
import "@/app/v3/v3.css";

export const metadata: Metadata = {
  title: "YANFD — Log Preview",
  description: "Preview candidate hero styles for the YANFD log archive",
};

export default function LogPreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="v3-root">{children}</div>;
}
