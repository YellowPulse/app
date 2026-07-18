export class ApiError extends Error {
	readonly status: number;
	readonly endpoint: string;

	constructor(message: string, status: number, endpoint: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.endpoint = endpoint;
	}
}

interface ApiClientConfig {
	baseUrl: string;
	apiKey?: string;
	timeout?: number;
	headers?: Record<string, string>;
}

interface RequestOptions {
	params?: Record<string, string | number | boolean | undefined>;
	headers?: Record<string, string>;
	timeout?: number;
	signal?: AbortSignal;
}

const DEFAULT_TIMEOUT = 10_000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY = 1_000;

export abstract class ApiClient {
	protected readonly baseUrl: string;
	protected readonly apiKey: string | undefined;
	protected readonly timeout: number;
	protected readonly defaultHeaders: Record<string, string>;

	constructor(config: ApiClientConfig) {
		this.baseUrl = config.baseUrl.replace(/\/$/, "");
		this.apiKey = config.apiKey;
		this.timeout = config.timeout ?? DEFAULT_TIMEOUT;
		this.defaultHeaders = {
			Accept: "application/json",
			...config.headers,
		};
	}

	protected async get<T>(path: string, options?: RequestOptions): Promise<T> {
		const url = this.buildUrl(path, options?.params);
		const headers = { ...this.defaultHeaders, ...options?.headers };
		const timeout = options?.timeout ?? this.timeout;

		let lastError: Error | undefined;

		for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);

			try {
				if (attempt > 0) {
					const delay = RETRY_BASE_DELAY * 2 ** (attempt - 1);
					await sleep(delay);
				}

				this.logRequest("GET", url, attempt);

				const response = await fetch(url, {
					method: "GET",
					headers,
					signal: options?.signal ?? controller.signal,
				});

				if (response.status === 429 && attempt < MAX_RETRIES) {
					const retryAfter = response.headers.get("Retry-After");
					if (retryAfter) {
						const delay = Number.parseInt(retryAfter, 10) * 1000;
						if (!Number.isNaN(delay) && delay > 0) {
							await sleep(Math.min(delay, 30_000));
						}
					}
					lastError = new ApiError("Rate limited", 429, url);
					continue;
				}

				if (!response.ok) {
					throw new ApiError(
						`HTTP ${response.status}: ${response.statusText}`,
						response.status,
						url,
					);
				}

				const data = (await response.json()) as T;
				this.logResponse("GET", url, response.status);
				return this.validateResponse(data);
			} catch (error) {
				if (error instanceof ApiError) {
					lastError = error;
					if (error.status !== 429) throw error;
				} else if (error instanceof DOMException && error.name === "AbortError") {
					throw new ApiError("Request timeout", 408, url);
				} else {
					throw error;
				}
			} finally {
				clearTimeout(timeoutId);
			}
		}

		throw lastError ?? new ApiError("Max retries exceeded", 429, url);
	}

	protected validateResponse<T>(data: T): T {
		return data;
	}

	private buildUrl(
		path: string,
		params?: Record<string, string | number | boolean | undefined>,
	): string {
		const url = new URL(`${this.baseUrl}${path}`);

		if (params) {
			for (const [key, value] of Object.entries(params)) {
				if (value !== undefined) {
					url.searchParams.set(key, String(value));
				}
			}
		}

		return url.toString();
	}

	private logRequest(method: string, url: string, attempt: number): void {
		if (process.env.NODE_ENV === "development") {
			const suffix = attempt > 0 ? ` (retry ${attempt})` : "";
			// biome-ignore lint/suspicious/noConsole: intentional dev-only API logging
			console.debug(`[API] ${method} ${url}${suffix}`);
		}
	}

	private logResponse(method: string, url: string, status: number): void {
		if (process.env.NODE_ENV === "development") {
			// biome-ignore lint/suspicious/noConsole: intentional dev-only API logging
			console.debug(`[API] ${method} ${url} → ${status}`);
		}
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
