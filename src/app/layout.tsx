import type { Metadata } from "next";
import { inter, jetbrainsMono, spaceGrotesk } from "./fonts";
import "./globals.css";

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
		description: "Track token metrics, network health, state channels, and ecosystem growth.",
		url: "https://app.yellowpulse.cc",
		siteName: "YellowPulse",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "YellowPulse",
		description: "Real-time analytics dashboard for Yellow Network.",
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
			className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
