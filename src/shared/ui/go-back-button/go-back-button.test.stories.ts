import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";

import { GoBackButton } from "./go-back-button";

const meta = {
  title: "Shared/UI/GoBackButton/Interactions",
  component: GoBackButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof GoBackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const withHistoryLength = (length: number) => {
  const original = Object.getOwnPropertyDescriptor(window.history, "length");

  Object.defineProperty(window.history, "length", {
    configurable: true,
    get: () => length,
  });

  return () => {
    if (original) {
      Object.defineProperty(window.history, "length", original);
    }
  };
};

export const NavigatesBackWhenHistoryExists: Story = {
  name: "Behavior — calls history.back when history exists",
  play: async ({ canvas }) => {
    const restoreHistoryLength = withHistoryLength(2);
    const historyBackSpy = fn();
    const originalBack = window.history.back;
    window.history.back = historyBackSpy;

    await userEvent.click(canvas.getByRole("button", { name: "Go back" }));

    await expect(historyBackSpy).toHaveBeenCalledOnce();

    window.history.back = originalBack;
    restoreHistoryLength();
  },
};

export const NavigatesToFallbackWhenNoHistory: Story = {
  name: "Behavior — navigates to fallback when no history",
  args: {
    fallbackHref: "/dashboard",
    navigate: fn(),
  },
  play: async ({ canvas, args }) => {
    const restoreHistoryLength = withHistoryLength(1);

    await userEvent.click(canvas.getByRole("button", { name: "Go back" }));

    await expect(args.navigate).toHaveBeenCalledWith("/dashboard");

    restoreHistoryLength();
  },
};

export const DoesNothingWhenNoHistoryAndNoFallback: Story = {
  name: "Behavior — no-op when there is no history and no fallback",
  args: {
    navigate: fn(),
  },
  play: async ({ canvas, args }) => {
    const restoreHistoryLength = withHistoryLength(1);
    const historyBackSpy = fn();
    const originalBack = window.history.back;
    window.history.back = historyBackSpy;

    await userEvent.click(canvas.getByRole("button", { name: "Go back" }));

    await expect(historyBackSpy).not.toHaveBeenCalled();
    await expect(args.navigate).not.toHaveBeenCalled();

    window.history.back = originalBack;
    restoreHistoryLength();
  },
};

export const PrefersHistoryOverFallbackWhenBothAvailable: Story = {
  name: "Behavior — prefers history.back over fallback when history exists",
  args: {
    fallbackHref: "/dashboard",
    navigate: fn(),
  },
  play: async ({ canvas, args }) => {
    const restoreHistoryLength = withHistoryLength(2);
    const historyBackSpy = fn();
    const originalBack = window.history.back;
    window.history.back = historyBackSpy;

    await userEvent.click(canvas.getByRole("button", { name: "Go back" }));

    await expect(historyBackSpy).toHaveBeenCalledOnce();
    await expect(args.navigate).not.toHaveBeenCalled();

    window.history.back = originalBack;
    restoreHistoryLength();
  },
};

export const DisabledBlocksClick: Story = {
  name: "Interaction — disabled blocks click",
  args: { disabled: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Go back" });

    await expect(button).toBeDisabled();

    const historyBackSpy = fn();
    const originalBack = window.history.back;
    window.history.back = historyBackSpy;

    await userEvent.click(button, { pointerEventsCheck: 0 });

    await expect(historyBackSpy).not.toHaveBeenCalled();

    window.history.back = originalBack;
  },
};

export const A11yIconIsHiddenFromScreenReaders: Story = {
  name: "A11y — leading icon is hidden from assistive tech",
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector("svg");

    await expect(icon).toHaveAttribute("aria-hidden", "true");
  },
};

export const A11yButtonHasAccessibleName: Story = {
  name: "A11y — button has an accessible name",
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Go back" });

    await expect(button).toBeInTheDocument();
  },
};
