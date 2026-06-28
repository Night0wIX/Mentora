import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor } from "storybook/test";

import { ThemeToggle } from "./theme-toggle";

const meta = {
  title: "Shared/UI/ThemeToggle/Interactions",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectsThemeOnClick: Story = {
  name: "Interaction — selects theme on click",
  play: async ({ canvas }) => {
    const lightOption = canvas.getByRole("radio", { name: "Light" });
    const darkOption = canvas.getByRole("radio", { name: "Dark" });

    await userEvent.click(lightOption);
    await waitFor(() => expect(lightOption).toBeChecked());

    await userEvent.click(darkOption);
    await waitFor(() => expect(darkOption).toBeChecked());
    await expect(lightOption).not.toBeChecked();
  },
};

export const NavigatesWithKeyboard: Story = {
  name: "A11y — arrow keys move focus between options",
  play: async ({ canvas }) => {
    const lightOption = canvas.getByRole("radio", { name: "Light" });
    const darkOption = canvas.getByRole("radio", { name: "Dark" });

    lightOption.focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(darkOption).toHaveFocus();
  },
};

export const TabFocusesCheckedOptionOnly: Story = {
  name: "A11y — tab moves focus directly to the checked option",
  play: async ({ canvas }) => {
    const lightOption = canvas.getByRole("radio", { name: "Light" });
    const darkOption = canvas.getByRole("radio", { name: "Dark" });

    await userEvent.click(darkOption);
    await waitFor(() => expect(darkOption).toBeChecked());

    await userEvent.click(canvas.getByRole("radiogroup"));
    await userEvent.tab();

    await expect(darkOption).toHaveFocus();
    await expect(lightOption).not.toHaveFocus();
  },
};

export const ExposesRadiogroupRole: Story = {
  name: "A11y — exposes radiogroup role with three named options",
  play: async ({ canvas }) => {
    canvas.getByRole("radiogroup", { name: "Theme selection" });

    await expect(
      canvas.getByRole("radio", { name: "Light" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("radio", { name: "Dark" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("radio", { name: "System" }),
    ).toBeInTheDocument();
  },
};
