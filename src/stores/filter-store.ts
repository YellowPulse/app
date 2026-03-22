import { create } from "zustand";

export type TimeRange = "24h" | "7d" | "30d" | "90d" | "1y" | "all";

interface FilterState {
	timeRange: TimeRange;
	setTimeRange: (range: TimeRange) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	timeRange: "7d",
	setTimeRange: (range) => set({ timeRange: range }),
}));
