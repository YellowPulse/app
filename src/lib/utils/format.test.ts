import { describe, expect, it } from "vitest";
import {
	formatAddress,
	formatCompactNumber,
	formatCurrency,
	formatPercent,
	formatTokenPrice,
} from "./format";

describe("formatCurrency", () => {
	it("formats USD values with 2 decimal places", () => {
		expect(formatCurrency(1234.56)).toBe("$1,234.56");
	});

	it("handles zero", () => {
		expect(formatCurrency(0)).toBe("$0.00");
	});
});

describe("formatCompactNumber", () => {
	it("formats thousands", () => {
		expect(formatCompactNumber(1500)).toBe("1.5K");
	});

	it("formats millions", () => {
		expect(formatCompactNumber(2500000)).toBe("2.5M");
	});

	it("formats billions", () => {
		expect(formatCompactNumber(1000000000)).toBe("1B");
	});
});

describe("formatPercent", () => {
	it("formats positive percentages", () => {
		expect(formatPercent(5.25)).toBe("5.25%");
	});

	it("formats negative percentages", () => {
		expect(formatPercent(-3.5)).toBe("-3.50%");
	});
});

describe("formatTokenPrice", () => {
	it("formats very small prices with 6 decimals", () => {
		expect(formatTokenPrice(0.003456)).toBe("$0.003456");
	});

	it("formats sub-dollar prices with 4 decimals", () => {
		expect(formatTokenPrice(0.0334)).toBe("$0.0334");
	});

	it("formats dollar+ prices as currency", () => {
		expect(formatTokenPrice(12.34)).toBe("$12.34");
	});
});

describe("formatAddress", () => {
	it("truncates long addresses", () => {
		const addr = "0x8633e144f2d9b9b8bDD12ddB58e4bEF1E163a0cE";
		expect(formatAddress(addr)).toBe("0x8633e1...63a0cE");
	});

	it("keeps short addresses intact", () => {
		expect(formatAddress("0x1234")).toBe("0x1234");
	});
});
