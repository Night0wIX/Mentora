import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

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

export const SelectsThemeOnClick: Story = {
  name: "Behavior — selects theme on click",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const darkOption = canvas.getByRole("radio", { name: "Dark" });

    await userEvent.click(darkOption);

    await expect(darkOption).toBeChecked();
  },
};

export const NavigatesWithKeyboard: Story = {
  name: "A11y — arrow keys move focus between options",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lightOption = canvas.getByRole("radio", { name: "Light" });
    const darkOption = canvas.getByRole("radio", { name: "Dark" });

    lightOption.focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(darkOption).toHaveFocus();
  },
};

export const ExposesRadiogroupRole: Story = {
  name: "A11y — exposes radiogroup semantics",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("radiogroup", { name: "Theme selection" });
    const options = within(group).getAllByRole("radio");

    await expect(options).toHaveLength(3);
  },
};
