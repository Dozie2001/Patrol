import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://patrol-ai-sage.vercel.app"),
  title: "Patrol",
  description: "Voice-first incident reporting for physical security teams.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Patrol",
    description: "Voice-first incident command for physical security teams.",
    images: [
      {
        url: "/patrol-logo-share.png",
        width: 1254,
        height: 1254,
        alt: "Patrol logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrol",
    description: "Voice-first incident command for physical security teams.",
    images: ["/patrol-logo-share.png"],
  },
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
