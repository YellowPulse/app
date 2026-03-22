import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "./fonts";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "YellowPulse - Real-time Analytics for Yellow Network",
    template: "%s | YellowPulse",
  },
  description:
    "Real-time analytics dashboard for Yellow Network. Track token metrics, network health, state channels, and ecosystem growth.",
  metadataBase: new URL("https://app.yellowpulse.cc"),
  openGraph: {
    title: "YellowPulse - Real-time Analytics for Yellow Network",
    description:
      "Track token metrics, network health, state channels, and ecosystem growth.",
    url: "https://app.yellowpulse.cc",
    siteName: "YellowPulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YellowPulse",
    description:
      "Real-time analytics dashboard for Yellow Network.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", spaceGrotesk.variable, inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
