import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_KEYS = ["skel-1", "skel-2", "skel-3", "skel-4"];

export default function Loading() {
	return (
		<div className="space-y-6 p-6">
			<div className="space-y-2">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-72" />
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{SKELETON_KEYS.map((key) => (
					<Skeleton key={key} className="h-32 rounded-card" />
				))}
			</div>
			<Skeleton className="h-64 rounded-card" />
		</div>
	);
}
