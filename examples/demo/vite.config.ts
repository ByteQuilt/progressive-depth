import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig(({ command, isPreview }) => ({
  // GitHub Pages serves this project at /<repository>/. Preview serves the build, so it uses the same base. Dev and tests use the root.
  base: command === "build" || isPreview ? "/progressive-depth/" : "/",
  plugins: [react()],
  resolve: {
    // The linked package resolves React from the repository root. Pin one copy so hooks share a single React.
    dedupe: ["react", "react-dom"],
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
}));
