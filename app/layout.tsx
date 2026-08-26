import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patrol",
  description: "Voice-first incident reporting for physical security teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
