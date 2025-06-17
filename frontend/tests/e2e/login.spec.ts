import { test, expect } from "@playwright/test";

test.describe("Login flow", () => {
  test("should allow user to log in with valid credentials", async ({
    page,
  }) => {
    await page.goto("/login");

    await expect(page.getByLabel("Email")).toBeVisible();

    await page.getByLabel("Email").fill("admin@flowee.io");
    await page.getByLabel("Password").fill("admin123");

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL(/\/dashboard/);

    await expect(
      page.getByRole("heading", { name: /Projects/i }),
    ).toBeVisible();
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("wrong@test.com");
    await page.getByLabel("Password").fill("wrongpass");

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByText("Wrong credentials, please try again."),
    ).toBeVisible();
  });
});
