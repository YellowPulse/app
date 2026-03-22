import { format, formatDistanceToNow } from "date-fns";

export function formatCurrency(value: number, currency = "USD"): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

export function formatCompactNumber(value: number): string {
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		maximumFractionDigits: 2,
	}).format(value);
}

export function formatPercent(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "percent",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value / 100);
}

export function formatTokenPrice(value: number): string {
	if (value < 0.01) {
		return `$${value.toFixed(6)}`;
	}
	if (value < 1) {
		return `$${value.toFixed(4)}`;
	}
	return formatCurrency(value);
}

export function formatDate(date: Date | string | number): string {
	return format(new Date(date), "MMM d, yyyy");
}

export function formatDateTime(date: Date | string | number): string {
	return format(new Date(date), "MMM d, yyyy HH:mm");
}

export function formatRelativeTime(date: Date | string | number): string {
	return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatAddress(address: string, chars = 6): string {
	if (address.length <= chars * 2 + 2) return address;
	return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
