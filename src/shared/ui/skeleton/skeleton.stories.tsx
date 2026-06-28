import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { createPlaceholderKeys } from "@/shared/utils";

import { Skeleton } from "./skeleton";
import type { SkeletonShape } from "./skeleton.types";
import { SkeletonGroup } from "./skeleton-group";

const SKELETON_SHAPES = [
  "text",
  "circular",
  "rectangular",
] as const satisfies SkeletonShape[];

const meta = {
  title: "Shared/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  args: {
    className: "h-4 w-48",
  },
  argTypes: {
    shape: {
      control: "select",
      options: SKELETON_SHAPES,
      description:
        "Border-radius treatment matching the placeholder's content.",
      table: { defaultValue: { summary: "rectangular" } },
    },
    animated: {
      control: "boolean",
      description:
        "Forces the pulse animation on/off regardless of the user's reduced-motion preference. Leave unset to defer to `useMotion`.",
      table: { defaultValue: { summary: "undefined (follows useMotion)" } },
    },
    className: {
      control: "text",
      description:
        "Required for sizing — width/height are intentionally not part of the variant API since they're always context-specific.",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllShapes: Story = {
  name: "Shapes — all",
  parameters: { a11y: { test: "todo" } },
  render: (args) => (
    <div className="flex items-center gap-6">
      {SKELETON_SHAPES.map((shape) => (
        <div key={shape} className="flex flex-col items-center gap-2">
          <Skeleton
            {...args}
            shape={shape}
            className={shape === "circular" ? "size-12" : "h-12 w-24"}
          />
          <span className="text-muted-foreground text-xs">{shape}</span>
        </div>
      ))}
    </div>
  ),
};

export const Circular: Story = {
  name: "Shape — circular",
  args: { shape: "circular", className: "size-12" },
  parameters: {
    docs: {
      description: {
        story: "Use for avatars and other round media placeholders.",
      },
    },
  },
};

export const AnimationForcedOff: Story = {
  name: "Animated — forced off",
  args: { animated: false },
  parameters: {
    docs: {
      description: {
        story:
          "Use only for static contexts such as visual regression snapshots, where the pulse animation would otherwise produce flaky screenshots.",
      },
    },
  },
};

export const AnimationForcedOn: Story = {
  name: "Animated — forced on",
  args: { animated: true },
  parameters: {
    docs: {
      description: {
        story:
          "Overrides a reduced-motion preference. Reserved for cases where the calling component has its own justification for forcing motion; prefer leaving `animated` unset in product code.",
      },
    },
  },
};

export const CardPlaceholder: Story = {
  name: "Composition — card placeholder",
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <SkeletonGroup label="Loading article preview" className="w-72 space-y-3">
      <Skeleton shape="rectangular" className="h-40 w-full" />
      <Skeleton shape="text" className="w-full" />
      <Skeleton shape="text" className="w-3/4" />
    </SkeletonGroup>
  ),
};

export const ProfilePlaceholder: Story = {
  name: "Composition — profile placeholder",
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <SkeletonGroup
      label="Loading user profile"
      className="flex items-center gap-3"
    >
      <Skeleton shape="circular" className="size-10" />
      <div className="space-y-2">
        <Skeleton shape="text" className="w-32" />
        <Skeleton shape="text" className="w-20" />
      </div>
    </SkeletonGroup>
  ),
};

export const ListPlaceholder: Story = {
  name: "Composition — list placeholder",
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <SkeletonGroup label="Loading list items" className="w-64 space-y-2">
      {createPlaceholderKeys(4).map((key) => (
        <Skeleton key={key} shape="text" className="w-full" />
      ))}
    </SkeletonGroup>
  ),
};
