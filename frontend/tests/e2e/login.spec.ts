import { test, expect } from "@playwright/test";

test("login form is visible", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByLabel("Email")).toBeVisible();
});
