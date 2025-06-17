// frontend/vitest.config.ts

import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    environment: "jsdom",
    ...viteConfig.test,
    setupFiles: ["./vitest.setup.ts"],
    include: ["./src/__tests__/integration/**/*.test.ts?(x)"],
    exclude: ["tests/e2e/**", "**/*.e2e.ts", "**/*.e2e.tsx"],
  },
});
