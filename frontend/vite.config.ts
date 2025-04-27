/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@atoms": "/src/components/atoms",
      "@molecules": "/src/components/molecules",
      "@organisms": "/src/components/organisms",
      "@icons": "/src/components/atoms/Icons",
      "@illustrations": "/src/components/atoms/illustrations",
      "@pages": "/src/pages",
      "@context": "/src/context",
      "@queries": "/src/graphql-queries",
      "@mutations": "/src/graphql-mutations",
      "@interfaces": "/src/interfaces",
      "@layout": "/src/layout",
      "@generated": "/src/__generated__",
      "@utils": "/src/utils",
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
