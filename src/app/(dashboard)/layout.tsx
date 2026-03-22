import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Providers } from "@/components/providers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<div className="flex h-full">
				<Sidebar />
				<div className="flex flex-1 flex-col lg:pl-sidebar">
					<Header />
					<main className="flex-1 p-6">{children}</main>
				</div>
			</div>
		</Providers>
	);
}
