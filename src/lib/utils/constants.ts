export const YELLOW_TOKEN_ADDRESS = "0x8633e144f2d9b9b8bDD12ddB58e4bEF1E163a0cE";
export const YUSDT_TOKEN_ADDRESS = "0x0622769D566B3c4C1C58cA4FAbee8E60bb3163e5";

export const API_URLS = {
	coingecko: "https://api.coingecko.com/api/v3",
	dexscreener: "https://api.dexscreener.com/latest",
	defillama: "https://api.llama.fi",
	etherscan: "https://api.etherscan.io/api",
	yellowWs: "wss://clearnet.yellow.com/ws",
} as const;

export const CACHE_TTL = {
	price: 30,
	marketCap: 60,
	volume: 60,
	holders: 300,
	topHolders: 900,
	channels: 30,
	networkStats: 60,
	ecosystem: 3600,
	priceHistory7d: 300,
	priceHistory30d: 900,
} as const;

export const SITE_CONFIG = {
	name: "YellowPulse",
	description: "Real-time analytics for Yellow Network",
	url: "https://app.yellowpulse.cc",
	github: "https://github.com/YellowPulse/app",
} as const;
