"use client";

export default function GlobalError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body>
				<div
					style={{
						display: "flex",
						minHeight: "100vh",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<div style={{ textAlign: "center" }}>
						<h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Service Unavailable</h2>
						<p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
							An unexpected error occurred. Please try again later.
						</p>
						<button
							type="button"
							onClick={reset}
							style={{
								marginTop: "1rem",
								padding: "0.5rem 1rem",
								borderRadius: "0.5rem",
								backgroundColor: "#eab308",
								color: "#1e1b4b",
								fontWeight: 600,
								border: "none",
								cursor: "pointer",
							}}
						>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	);
}
