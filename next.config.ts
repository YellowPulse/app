import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	experimental: {
		sri: {
			algorithm: "sha256",
		},
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
							"style-src 'self' 'unsafe-inline'",
							"img-src 'self' data: https:",
							"font-src 'self' data:",
							"connect-src 'self' https://api.coingecko.com https://api.dexscreener.com https://api.llama.fi https://api.etherscan.io wss://clearnet.yellow.com",
							"frame-ancestors 'none'",
						].join("; "),
					},
				],
			},
		];
	},
};

export default nextConfig;
