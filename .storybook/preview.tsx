import type { Decorator, Preview } from "@storybook/nextjs-vite";
import { Inter } from "next/font/google";
import { useEffect } from "react";

import "../src/styles/index.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Mirrors what `RootLayout` + `ThemeProvider` do in the real app: applies the
 * `dark`/`light` class to the document root so our CSS-variable tokens
 * (src/styles/light.css, dark.css) resolve correctly. Storybook's preview
 * iframe doesn't run our Next.js layout, so stories would otherwise always
 * render in an unstyled/light-only context.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as "light" | "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <div className={`${inter.variable} font-sans antialiased`}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "light",
  },

  decorators: [withTheme],

  parameters: {
    layout: "centered",

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // WCAG 2.1 AA is our baseline bar; individual stories can override via
    // the `a11y` parameter (see button.stories.tsx for a documented example).
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
