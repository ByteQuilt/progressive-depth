// The components use React context and hooks, so React Server Component frameworks (Next.js App Router) must treat
// the package as client code. This fails the package check when a built entry does not start with "use client".
import { readFileSync } from "node:fs";

const entries = ["dist/index.js", "dist/index.cjs"];
const missing = entries.filter((file) => !/^["']use client["'];/.test(readFileSync(file, "utf8").trimStart()));

if (missing.length > 0) {
  console.error(`Missing a leading "use client" directive: ${missing.join(", ")}`);
  process.exit(1);
}
console.log(`"use client" directive present in ${entries.join(" and ")}`);
