import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Code session worktrees — copies of the repo, never lint them.
    ".claude/**",
    // One-off scraping/parsing scripts for the study-guide PDF (not app code).
    "extract.js",
    "parse_lines.js",
    "readpdf.js",
    "update_courses.js",
    "scratch/**",
  ]),
]);

export default eslintConfig;
