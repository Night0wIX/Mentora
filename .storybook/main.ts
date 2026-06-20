import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
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
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  features: {
    experimentalRSC: false,
  },

  docs: {
    defaultName: "Documentation",
  },
};
export default config;
