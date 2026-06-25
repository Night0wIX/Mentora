import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.{ts,tsx}"],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@github-ui/storybook-addon-performance-panel",
    "@storybook/addon-mcp",
  ],

  framework: "@storybook/nextjs-vite",

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      propFilter: ({ parent }) =>
        parent ? !parent.fileName.includes("node_modules") : true,
    },
  },

  docs: {
    defaultName: "Documentation",
  },
};

export default config;
