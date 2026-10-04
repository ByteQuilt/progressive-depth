import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles.css"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  sourcemap: true,
  // Components use React context and hooks, so React Server Component frameworks must load the package as client code.
  banner: { js: '"use client";' },
});
