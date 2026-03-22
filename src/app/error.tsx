"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
			<div className="text-center">
				<h2 className="text-2xl font-bold">Something went wrong</h2>
				<p className="mt-2 text-text-secondary">
					{process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred"}
				</p>
			</div>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
