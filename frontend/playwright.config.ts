import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.ts",
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:5173",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
});
