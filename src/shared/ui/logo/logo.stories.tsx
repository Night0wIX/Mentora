import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SITE_CONFIG } from "@/shared/config";

import { Logo } from "./logo";
import type { LogoSize } from "./logo.types";

const meta = {
  title: "Shared/UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"] satisfies LogoSize[],
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
        "CSS classes applied to the SVG element. Commonly used to control color via text utilities.",
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: "Playground",
  args: {
    size: "md",
    ariaLabel: "Company logo",
  },
  parameters: {
    docs: {
      description: {
        story: "Configure all props via the Controls panel.",
      },
    },
  },
};

export const AllSizes: Story = {
  name: "Sizes — all",
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <div className="flex items-center gap-8">
      <Logo size="sm" ariaLabel="Logo small" />
      <Logo size="md" ariaLabel="Logo medium" />
      <Logo size="lg" ariaLabel="Logo large" />
      <Logo size="xl" ariaLabel="Logo extra large" />
    </div>
  ),
};

export const Small: Story = {
  name: "Size — sm",
  args: { size: "sm", ariaLabel: "Company logo" },
};

export const Medium: Story = {
  name: "Size — md",
  args: { size: "md", ariaLabel: "Company logo" },
};

export const Large: Story = {
  name: "Size — lg",
  args: { size: "lg", ariaLabel: "Company logo" },
};

export const ExtraLarge: Story = {
  name: "Size — xl",
  args: { size: "xl", ariaLabel: "Company logo" },
};

export const Decorative: Story = {
  name: "Usage — decorative (icon)",
  args: {
    size: "md",
    className: "text-muted-foreground",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When used decoratively without ariaLabel, the logo is hidden from screen readers (aria-hidden). Commonly used as a bullet point, separator, or visual accent.",
      },
    },
  },
};

export const AsLogotype: Story = {
  name: "Usage — logotype",
  args: {
    size: "lg",
    ariaLabel: "Acme Corporation",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When ariaLabel is provided, the logo is treated as an image and announced to screen readers.",
      },
    },
  },
};

export const WithCustomColor: Story = {
  name: "Styling — custom color",
  args: {
    size: "lg",
    ariaLabel: "Company logo",
    className: "text-blue-500",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Color is controlled via text utilities (e.g., text-blue-500) or custom CSS. The SVG uses currentColor, so any text color applies.",
      },
    },
  },
};

export const DarkMode: Story = {
  name: "Styling — dark mode",
  args: {
    size: "lg",
    ariaLabel: "Company logo",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Logo adapts to dark mode automatically via currentColor. The design system's text color tokens handle the contrast.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-slate-950 p-8">
        <Story />
      </div>
    ),
  ],
};

export const InNavigation: Story = {
  name: "Usage — in navigation",
  render: () => (
    <nav className="flex items-center gap-4 border-b border-input bg-background px-6 py-3">
      <Logo size="sm" ariaLabel="Acme Corp" />
      <span className="flex-1" />
      <a href="/" className="flex items-center gap-2 no-underline">
        <Logo size="sm" ariaLabel="Acme Corp" />
      </a>
      <span className="flex-1" />
      <a href="/docs" className="text-sm font-medium text-foreground">
        Docs
      </a>
      <a href="/api" className="text-sm font-medium text-foreground">
        API
      </a>
      <a href="/support" className="text-sm font-medium text-foreground">
        Support
      </a>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Logo as a clickable navigation element with semantic HTML. The ariaLabel identifies the brand.",
      },
    },
    a11y: { test: "todo" },
  },
};

export const WithTextBrand: Story = {
  name: "Usage — logo with text",
  render: () => (
    <div className="flex items-center gap-2">
      <Logo size="md" className="text-foreground" aria-hidden="true" />
      <span className="font-semibold tracking-tight">{SITE_CONFIG.name}</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Logo paired with text branding. Logo is decorative (aria-hidden) because the text carries the semantic meaning.",
      },
    },
    a11y: { test: "todo" },
  },
};
