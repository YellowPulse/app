import { expect, test } from "@playwright/test";

test.describe("Dashboard", () => {
	test("should load the dashboard page", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/YellowPulse/);
		await expect(page.locator("h1")).toContainText("Dashboard");
	});

	test("should display stat cards", async ({ page }) => {
		await page.goto("/");
		const statCards = page.locator('[class*="rounded-card"]');
		await expect(statCards.first()).toBeVisible();
	});

	test("should have sidebar navigation", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("aside")).toBeVisible();
		await expect(page.getByText("YellowPulse")).toBeVisible();
	});
});
