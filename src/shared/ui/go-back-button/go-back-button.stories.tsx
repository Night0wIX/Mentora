import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { GoBackButton } from "./go-back-button";

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
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      table: { defaultValue: { summary: "outline" } },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
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

export const Default: Story = {
  name: "Default",
};

export const CustomLabel: Story = {
  name: "Custom label",
  args: { children: "Back to dashboard" },
};

export const PrimaryVariant: Story = {
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

export const NavigatesBackWhenHistoryExists: Story = {
  name: "Behavior — calls history.back when history exists",
  play: async ({ canvasElement }) => {
    const historyBackSpy = fn();
    const originalBack = window.history.back;
    const originalLength = Object.getOwnPropertyDescriptor(
      window.history,
      "length",
    );

    window.history.back = historyBackSpy;
    Object.defineProperty(window.history, "length", {
      configurable: true,
      get: () => 2,
    });

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Go back" }));

    await expect(historyBackSpy).toHaveBeenCalledOnce();

    window.history.back = originalBack;
    if (originalLength) {
      Object.defineProperty(window.history, "length", originalLength);
    }
  },
};

export const NavigatesToFallbackWhenNoHistory: Story = {
  name: "Behavior — navigates to fallback when no history",
  args: { fallbackHref: "/dashboard" },
  play: async ({ canvasElement }) => {
    const locationAssignSpy = fn();
    const originalAssign = window.location.assign;
    const originalLength = Object.getOwnPropertyDescriptor(
      window.history,
      "length",
    );

    window.location.assign = locationAssignSpy;
    Object.defineProperty(window.history, "length", {
      configurable: true,
      get: () => 1,
    });

    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Go back" }));

    await expect(locationAssignSpy).toHaveBeenCalledWith("/dashboard");

    window.location.assign = originalAssign;
    if (originalLength) {
      Object.defineProperty(window.history, "length", originalLength);
    }
  },
};
