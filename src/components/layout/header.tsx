"use client";

import { Menu, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

export function Header() {
	const { toggleSidebar, toggleSidebarCollapse } = useUIStore();

	return (
		<header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-surface-card px-6">
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleSidebarCollapse}
				className="hidden lg:flex"
			>
				<Menu className="h-5 w-5" />
			</Button>
			<Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
				<Menu className="h-5 w-5" />
			</Button>

			<div className="flex-1" />

			<div className="flex items-center gap-2">
				<div className="flex items-center gap-2 text-sm text-text-secondary">
					<div className="h-2 w-2 rounded-full bg-positive" />
					<span className="hidden sm:inline">Network Online</span>
				</div>
				<Button variant="ghost" size="icon">
					<RefreshCw className="h-4 w-4" />
				</Button>
			</div>
		</header>
	);
}
