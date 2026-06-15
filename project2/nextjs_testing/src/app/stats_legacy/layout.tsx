import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YANFD — STATS Legacy",
  description: "Previous STATS homepage backup",
};

export default function StatsLegacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
