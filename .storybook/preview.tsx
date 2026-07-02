import type { Decorator, Preview } from "@storybook/nextjs-vite";

import "../src/styles/index.css";
import { INTER } from "../src/shared/config";
import { MotionProvider } from "../src/shared/libs/motion";
import { ThemeProvider } from "../src/shared/libs/theme";

// Applies dark/light class to <html> — Storybook iframe skips Next.js layout.
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as "light" | "dark";

  return (
    <ThemeProvider forcedTheme={theme}>
      <div className={`${INTER.variable} font-sans antialiased`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const withMotion: Decorator = (Story, context) => {
  const value = context.globals.reduceMotion;

  let reduceMotionOverride: boolean | undefined;

  if (value === "reduce") {
    reduceMotionOverride = true;
  } else if (value === "no-reduce") {
    reduceMotionOverride = false;
  }

  return (
    <MotionProvider overrideReduceMotion={reduceMotionOverride}>
      <Story />
    </MotionProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    reduceMotion: {
      description: "Override reduced motion preference",
      toolbar: {
        title: "Reduce Motion",
        icon: "transfer",
        items: [
          { value: "system", title: "System" },
          { value: "reduce", title: "Reduce" },
          { value: "no-reduce", title: "No Reduce" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "light",
    reduceMotion: "system",
  },

  decorators: [withTheme, withMotion],

  parameters: {
    layout: "centered",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // WCAG 2.1 AA baseline; stories can override via `a11y` parameter.
    a11y: {
      test: "error",
    },

    backgrounds: {
      default: "app-background",
      values: [
        { name: "app-background", value: "var(--background)" },
        { name: "card", value: "var(--card)" },
      ],
    },

    options: {
      storySort: {
        order: ["Shared", ["UI", "*"], "*"],
      },
    },
  },
};

export default preview;
