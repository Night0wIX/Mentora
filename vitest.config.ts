import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
            storybookScript: "pnpm storybook --ci",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/shared/ui/**"],
      exclude: [
        "src/shared/ui/**/*.stories.{ts,tsx}",
        "src/shared/ui/**/*.types.ts",
        "src/shared/ui/**/index.ts",
      ],
    },
  },
});
