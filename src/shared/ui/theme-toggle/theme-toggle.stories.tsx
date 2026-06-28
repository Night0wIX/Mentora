import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ThemeToggle } from "./theme-toggle";
import { ThemeToggleSkeleton } from "./theme-toggle.skeleton";

const meta = {
  title: "Shared/UI/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
};

export const Skeleton: Story = {
  name: "Loading skeleton (pre-hydration placeholder)",
  render: () => <ThemeToggleSkeleton />,
  parameters: {
    docs: {
      description: {
        story:
          "Rendered briefly before client hydration completes, to avoid a theme mismatch flash. Hidden from assistive tech via `aria-hidden`, since it disappears within milliseconds.",
      },
    },
    a11y: { test: "todo" },
  },
};
