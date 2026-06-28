import type { StorybookConfig } from "@storybook/nextjs-vite";
import type { PropItem } from "react-docgen-typescript";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.{ts,tsx}"],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@github-ui/storybook-addon-performance-panel",
    "@storybook/addon-mcp",
    "@storybook/addon-vitest",
  ],

  framework: "@storybook/nextjs-vite",

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      include: ["**/*.tsx", ".storybook/**/*.tsx"],
      propFilter: ({ parent }: PropItem) =>
        parent ? !parent.fileName.includes("node_modules") : true,
    },
  },

  docs: {
    defaultName: "Documentation",
  },

  build: {
    test: {
      disabledAddons: [
        "@storybook/addon-docs",
        "@github-ui/storybook-addon-performance-panel",
        "@storybook/addon-mcp",
      ],
    },
  },
};

export default config;
