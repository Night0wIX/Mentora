import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SITE_CONFIG } from "@/shared/config";

import { Logo } from "./logo";
import { LOGO_SIZES } from "./logo.constants";
import type { LogoSize } from "./logo.types";

const LOGO_SIZE_OPTIONS = Object.keys(LOGO_SIZES) as LogoSize[];

const meta = {
  title: "Shared/UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  args: {
    ariaLabel: "Company logo",
  },
  argTypes: {
    size: {
      control: "select",
      options: LOGO_SIZE_OPTIONS,
      description: "Size variant controlling rendered dimensions.",
      table: { defaultValue: { summary: "md" } },
    },
    ariaLabel: {
      control: "text",
      description:
        "Accessible label for screen readers. Omit for decorative usage (aria-hidden).",
    },
    className: {
      control: "text",
      description:
        "CSS classes applied to the SVG element. Commonly used to control color via text utilities, since the SVG uses currentColor.",
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  name: "Sizes — all",
  parameters: { a11y: { test: "todo" } },
  render: (args) => (
    <div className="flex items-center gap-8">
      {LOGO_SIZE_OPTIONS.map((size) => (
        <Logo key={size} {...args} size={size} ariaLabel={`Logo ${size}`} />
      ))}
    </div>
  ),
};

export const Decorative: Story = {
  name: "Usage — decorative (no ariaLabel)",
  args: {
    ariaLabel: undefined,
    className: "text-muted-foreground",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Without `ariaLabel`, the logo is hidden from screen readers via `aria-hidden`. Used as a bullet point, separator, or visual accent.",
      },
    },
  },
};

export const AsLogotype: Story = {
  name: "Usage — logotype",
  args: { size: "lg" },
  parameters: {
    docs: {
      description: {
        story:
          'With `ariaLabel` set, the logo is treated as an image (`role="img"`) and announced to screen readers.',
      },
    },
  },
};

export const WithTextBrand: Story = {
  name: "Usage — paired with text branding",
  render: () => (
    <div className="flex items-center gap-2">
      <Logo size="md" className="text-foreground" />
      <span className="font-semibold tracking-tight">{SITE_CONFIG.name}</span>
    </div>
  ),
  parameters: {
    a11y: { test: "todo" },
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Logo without `ariaLabel` is decorative — the adjacent text carries the semantic meaning, so the pairing isn't announced twice.",
      },
    },
  },
};

export const WithCustomColor: Story = {
  name: "Styling — custom color",
  args: { size: "lg", className: "text-blue-500" },
  parameters: {
    docs: {
      description: {
        story:
          "Color is controlled via text utilities (e.g. `text-blue-500`) or custom CSS, since the SVG uses `currentColor`.",
      },
    },
  },
};

export const DarkMode: Story = {
  name: "Styling — dark mode",
  args: { size: "lg" },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Adapts to dark mode automatically via `currentColor` — the design system's text color tokens handle the contrast.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background p-8">
        <Story />
      </div>
    ),
  ],
};
