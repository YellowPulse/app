"use client";

import { BarChart3, Coins, Globe, LayoutDashboard, Network, Waves, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

const navigation = [
	{ name: "Overview", href: "/", icon: LayoutDashboard },
	{ name: "Token", href: "/token", icon: Coins },
	{ name: "Network", href: "/network", icon: Network },
	{ name: "Channels", href: "/channels", icon: Waves },
	{ name: "Ecosystem", href: "/ecosystem", icon: Globe },
	{ name: "Whales", href: "/whales", icon: BarChart3 },
];

export function Sidebar() {
	const pathname = usePathname();
	const { sidebarCollapsed, sidebarOpen, setSidebarOpen } = useUIStore();

	return (
		<>
			{/* Mobile backdrop */}
			{sidebarOpen && (
				<button
					type="button"
					aria-label="Close sidebar"
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar transition-all duration-300",
					// Desktop: always visible, respects collapsed state
					"max-lg:hidden",
					sidebarCollapsed ? "w-sidebar-collapsed" : "w-sidebar",
				)}
			>
				<SidebarContent pathname={pathname} collapsed={sidebarCollapsed} />
			</aside>

			{/* Mobile sidebar */}
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-50 flex w-sidebar flex-col bg-sidebar transition-transform duration-300 lg:hidden",
					sidebarOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="flex h-16 items-center justify-between px-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
							<span className="text-sm font-bold text-sidebar">Y</span>
						</div>
						<span className="text-lg font-heading font-bold text-text-inverted">YellowPulse</span>
					</div>
					<button
						type="button"
						onClick={() => setSidebarOpen(false)}
						className="text-text-inverted/70 hover:text-text-inverted"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				<SidebarContent
					pathname={pathname}
					collapsed={false}
					onNavigate={() => setSidebarOpen(false)}
				/>
			</aside>
		</>
	);
}

function SidebarContent({
	pathname,
	collapsed,
	onNavigate,
}: {
	pathname: string;
	collapsed: boolean;
	onNavigate?: () => void;
}) {
	return (
		<>
			{!onNavigate && (
				<div className="flex h-16 items-center gap-2 px-4">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
						<span className="text-sm font-bold text-sidebar">Y</span>
					</div>
					{!collapsed && (
						<span className="text-lg font-heading font-bold text-text-inverted">YellowPulse</span>
					)}
				</div>
			)}

			<nav className="flex-1 space-y-1 px-2 py-4">
				{navigation.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.name}
							href={item.href}
							onClick={onNavigate}
							className={cn(
								"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
								isActive
									? "bg-sidebar-accent text-amber-500"
									: "text-text-inverted/70 hover:bg-sidebar-accent hover:text-text-inverted",
							)}
						>
							<item.icon className="h-5 w-5 shrink-0" />
							{!collapsed && <span>{item.name}</span>}
						</Link>
					);
				})}
			</nav>

			<div className="border-t border-sidebar-accent p-4">
				{!collapsed && <p className="text-xs text-text-inverted/50">YellowPulse v0.1.0</p>}
			</div>
		</>
	);
}
