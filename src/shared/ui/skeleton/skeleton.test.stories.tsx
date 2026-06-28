import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Skeleton } from "./skeleton";
import { SkeletonGroup } from "./skeleton-group";

const meta = {
  title: "Shared/UI/Skeleton/Interactions",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const A11yIsHiddenFromScreenReaders: Story = {
  name: "A11y — skeleton is always decorative",
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');

    await expect(skeleton).toHaveAttribute("aria-hidden", "true");
  },
};

export const AppliesShapeClasses: Story = {
  name: "Behavior — applies shape-specific classes",
  args: { shape: "circular", className: "size-12" },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');

    await expect(skeleton).toHaveClass("rounded-full");
  },
};

export const AnimatedTrueAppliesPulse: Story = {
  name: "Behavior — animated=true applies the pulse animation",
  args: { animated: true },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');

    await expect(skeleton).toHaveClass("animate-pulse");
  },
};

export const AnimatedFalseOmitsPulse: Story = {
  name: "Behavior — animated=false omits the pulse animation",
  args: { animated: false },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');

    await expect(skeleton).not.toHaveClass("animate-pulse");
  },
};

export const MergesCustomClassName: Story = {
  name: "Behavior — merges custom className with variant classes",
  args: { shape: "rectangular", className: "h-24 w-40" },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]');

    await expect(skeleton).toHaveClass("h-24");
    await expect(skeleton).toHaveClass("w-40");
    await expect(skeleton).toHaveClass("rounded-md");
  },
};

export const ForwardsArbitraryProps: Story = {
  name: "Behavior — forwards rest props to the root element",
  args: { "data-testid": "skeleton" } as never,
  play: async ({ canvas }) => {
    const skeleton = canvas.getByTestId("skeleton");

    await expect(skeleton).toBeInTheDocument();
  },
};

export const GroupAnnouncesLoadingStatus: Story = {
  name: "A11y — group exposes status role with aria-busy",
  render: () => (
    <SkeletonGroup label="Loading dashboard">
      <Skeleton className="h-4 w-48" />
    </SkeletonGroup>
  ),
  play: async ({ canvas }) => {
    const status = canvas.getByRole("status", { name: "Loading dashboard" });

    await expect(status).toHaveAttribute("aria-busy", "true");
  },
};

export const GroupUsesDefaultLabelWhenOmitted: Story = {
  name: "Behavior — group falls back to a default label",
  render: () => (
    <SkeletonGroup>
      <Skeleton className="h-4 w-48" />
    </SkeletonGroup>
  ),
  play: async ({ canvas }) => {
    const status = canvas.getByRole("status", { name: "Loading content" });

    await expect(status).toBeInTheDocument();
  },
};

export const GroupRendersChildren: Story = {
  name: "Behavior — group renders its children",
  render: () => (
    <SkeletonGroup label="Loading list">
      <Skeleton data-testid="item-1" className="h-4 w-48" />
      <Skeleton data-testid="item-2" className="h-4 w-32" />
    </SkeletonGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("item-1")).toBeInTheDocument();
    await expect(canvas.getByTestId("item-2")).toBeInTheDocument();
  },
};

export const GroupMergesCustomClassName: Story = {
  name: "Behavior — group merges custom className with the base block class",
  render: () => (
    <SkeletonGroup label="Loading dashboard" className="w-72 space-y-3">
      <Skeleton className="h-4 w-48" />
    </SkeletonGroup>
  ),
  play: async ({ canvas }) => {
    const status = canvas.getByRole("status", { name: "Loading dashboard" });

    await expect(status).toHaveClass("block");
    await expect(status).toHaveClass("w-72");
  },
};
