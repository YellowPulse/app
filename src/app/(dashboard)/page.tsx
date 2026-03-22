const STAT_LABELS = ["Price", "Market Cap", "Volume 24h", "Holders"];

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<p className="text-text-secondary">Real-time analytics for Yellow Network</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{STAT_LABELS.map((label) => (
					<div
						key={label}
						className="rounded-card border border-border bg-surface-card p-6 shadow-card"
					>
						<p className="text-sm text-text-secondary">{label}</p>
						<p className="mt-2 text-2xl font-bold font-mono">--</p>
					</div>
				))}
			</div>

			<div className="rounded-card border border-border bg-surface-card p-6 shadow-card">
				<h2 className="text-xl font-semibold">Price Chart</h2>
				<div className="mt-4 flex h-64 items-center justify-center text-text-tertiary">
					Chart placeholder - Phase 1
				</div>
			</div>
		</div>
	);
}
