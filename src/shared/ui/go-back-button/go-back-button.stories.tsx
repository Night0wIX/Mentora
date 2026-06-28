import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { GoBackButton } from "./go-back-button";

const GO_BACK_BUTTON_VARIANTS = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const;

const GO_BACK_BUTTON_SIZES = ["default", "sm", "lg"] as const;

const meta = {
  title: "Shared/UI/GoBackButton",
  component: GoBackButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  argTypes: {
    fallbackHref: {
      control: "text",
      description:
        "Path to navigate to when there is no browser history to go back to (`history.length <= 1`).",
    },
    variant: {
      control: "select",
      options: GO_BACK_BUTTON_VARIANTS,
      table: { defaultValue: { summary: "outline" } },
    },
    size: {
      control: "select",
      options: GO_BACK_BUTTON_SIZES,
      table: { defaultValue: { summary: "sm" } },
    },
    children: {
      control: "text",
      description: "Button label. Defaults to a localized 'Go back' string.",
    },
  },
} satisfies Meta<typeof GoBackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CustomLabel: Story = {
  name: "Custom label",
  args: { children: "Back to dashboard" },
};

export const VariantOverridden: Story = {
  name: "Variant — overridden",
  args: { variant: "ghost", size: "default" },
  parameters: {
    docs: {
      description: {
        story:
          "All `Button` style props (variant, size, fullWidth, className, etc.) pass through, since `GoBackButton` only adds navigation behavior on top of `Button`.",
      },
    },
  },
};

export const WithFallbackHref: Story = {
  name: "With fallback href",
  args: { fallbackHref: "/dashboard" },
  parameters: {
    docs: {
      description: {
        story:
          "When there is no browser history to go back to (e.g. opened from a direct link), navigates to `fallbackHref` instead of a no-op `history.back()`.",
      },
    },
  },
};

export const Disabled: Story = {
  name: "State — disabled",
  args: { disabled: true },
};
