import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Spinner } from "./spinner";

const getSpinnerElement = (canvasElement: HTMLElement) =>
  canvasElement.querySelector("svg");

const meta = {
  title: "Shared/UI/Spinner/Interactions",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const A11yDecorativeIsHiddenFromScreenReaders: Story = {
  name: "A11y — without label, is hidden from screen readers",
  play: async ({ canvasElement }) => {
    const spinner = getSpinnerElement(canvasElement);

    await expect(spinner).toHaveAttribute("aria-hidden", "true");
    await expect(spinner).not.toHaveAttribute("role");
    await expect(spinner).not.toHaveAttribute("aria-label");
  },
};

export const A11yLabeledExposesStatusRole: Story = {
  name: "A11y — with label, exposes role=status and the label",
  args: { label: "Loading results" },
  play: async ({ canvas }) => {
    const status = canvas.getByRole("status", { name: "Loading results" });

    await expect(status).toHaveAttribute("aria-label", "Loading results");
    await expect(status).not.toHaveAttribute("aria-hidden");
  },
};

export const RendersDefaultSizeWhenSizeIsOmitted: Story = {
  name: "Interaction — defaults to size=default when `size` is omitted",
  play: async ({ canvasElement }) => {
    const spinner = getSpinnerElement(canvasElement);

    await expect(spinner).toHaveClass("size-4");
  },
};

export const AppliesCustomClassName: Story = {
  name: "Interaction — merges custom className with base classes",
  args: { className: "text-blue-500" },
  play: async ({ canvasElement }) => {
    const spinner = getSpinnerElement(canvasElement);

    await expect(spinner).toHaveClass("text-blue-500");
    await expect(spinner).toHaveClass("animate-spin");
  },
};

export const ForwardsArbitrarySvgProps: Story = {
  name: "Interaction — forwards rest props to the svg element",
  args: {
    "data-testid": "spinner",
  } as Story["args"] & { "data-testid": string },
  play: async ({ canvas }) => {
    const spinner = canvas.getByTestId("spinner");

    await expect(spinner).toBeInTheDocument();
  },
};
