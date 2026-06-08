import type { Metadata } from "next";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "YANFD STATS",
  description: "nothin to describe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
