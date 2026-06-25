import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { Spinner } from "./spinner";
import type { SpinnerSize } from "./spinner.types";

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
      options: ["sm", "default", "lg"] satisfies SpinnerSize[],
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

export const Playground: Story = {
  name: "Playground",
};

export const AllSizes: Story = {
  name: "Sizes — all",
  parameters: { a11y: { test: "todo" } },
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};

export const Decorative: Story = {
  name: "Decorative (default — no label)",
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
  name: "Standalone — with label",
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

export const DecorativeHidesFromScreenReaders: Story = {
  name: "A11y — decorative spinner is hidden",
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector("svg");

    await expect(spinner).toHaveAttribute("aria-hidden", "true");
  },
};

export const LabeledExposesStatusRole: Story = {
  name: "A11y — labeled spinner exposes status role",
  args: { label: "Loading results" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole("status", { name: "Loading results" });

    await expect(status).toBeVisible();
  },
};
