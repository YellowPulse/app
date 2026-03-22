import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-amber-500">404</h1>
				<h2 className="mt-2 text-2xl font-bold">Page not found</h2>
				<p className="mt-2 text-text-secondary">
					The page you&apos;re looking for doesn&apos;t exist.
				</p>
			</div>
			<Button render={<Link href="/" />}>Go to Dashboard</Button>
		</div>
	);
}
