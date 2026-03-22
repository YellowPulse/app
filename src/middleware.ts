import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
	"https://app.yellowpulse.cc",
	"https://yellowpulse.cc",
	"http://localhost:3000",
];

let ratelimit: Ratelimit | null = null;

function getRatelimit() {
	if (ratelimit) return ratelimit;

	if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
		ratelimit = new Ratelimit({
			redis: Redis.fromEnv(),
			limiter: Ratelimit.slidingWindow(30, "60 s"),
			analytics: true,
		});
		return ratelimit;
	}

	return null;
}

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const origin = request.headers.get("origin") ?? "";

	// CORS headers for API routes
	if (ALLOWED_ORIGINS.includes(origin)) {
		response.headers.set("Access-Control-Allow-Origin", origin);
	}
	response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
	response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (request.method === "OPTIONS") {
		return new NextResponse(null, { status: 204, headers: response.headers });
	}

	// Rate limiting
	const limiter = getRatelimit();
	if (limiter) {
		const ip =
			request.headers.get("x-real-ip") ??
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
			"127.0.0.1";
		const { success, limit, remaining, reset } = await limiter.limit(ip);

		response.headers.set("X-RateLimit-Limit", limit.toString());
		response.headers.set("X-RateLimit-Remaining", remaining.toString());
		response.headers.set("X-RateLimit-Reset", reset.toString());

		if (!success) {
			return NextResponse.json({ error: "Too many requests" }, { status: 429 });
		}
	}

	return response;
}

export const config = {
	matcher: "/api/:path*",
};
