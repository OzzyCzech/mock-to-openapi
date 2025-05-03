import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    nodePolyfills({
      exclude: ["fs"],
      globals: {
        Buffer: true,
        process: true,
      },
    }),
  ],
  base: "/mock-to-openapi/",
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {},
  },
});
