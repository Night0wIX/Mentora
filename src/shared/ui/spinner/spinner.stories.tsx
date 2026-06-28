import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spinner } from "./spinner";
import type { SpinnerSize } from "./spinner.types";

const SPINNER_SIZES = ["sm", "default", "lg"] as const satisfies SpinnerSize[];

const meta = {
  title: "Shared/UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  argTypes: {
    size: {
      control: "select",
      options: SPINNER_SIZES,
      description: "Visual scale of the spinner.",
      table: { defaultValue: { summary: "default" } },
    },
    label: {
      control: "text",
      description:
        "Announces loading status to screen readers when used standalone. Omit when nested inside a control that already exposes `aria-busy` (e.g. `Button`).",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  name: "Sizes — all",
  parameters: { a11y: { test: "todo" } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {SPINNER_SIZES.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Decorative: Story = {
  name: "Usage — decorative (no label)",
  parameters: {
    docs: {
      description: {
        story:
          "Default usage inside a control like `Button`, where the parent already exposes loading state via `aria-busy`.",
      },
    },
  },
};

export const Standalone: Story = {
  name: "Usage — standalone (with label)",
  args: { label: "Loading results" },
  parameters: {
    docs: {
      description: {
        story:
          'Exposes `role="status"` for use outside a control with its own `aria-busy`.',
      },
    },
  },
};
