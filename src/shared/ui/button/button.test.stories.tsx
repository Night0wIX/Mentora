import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Trash2 } from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";

import { Button } from "./button";
import { BUTTON_DEFAULT_LOADING_TEXT } from "./button.constants";

const meta = {
  title: "Shared/UI/Button/Interactions",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  args: {
    children: "Button",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KeyboardActivation: Story = {
  name: "Interaction — keyboard activation",
  args: { children: "Submit" },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "Submit" });

    await userEvent.tab();
    await expect(button).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const LoadingBlocksClick: Story = {
  name: "Interaction — loading blocks click",
  args: { loading: true, children: "Submit" },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", {
      name: BUTTON_DEFAULT_LOADING_TEXT,
    });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("data-loading", "true");

    const hiddenContent = button.querySelector("[aria-hidden='true']");
    await expect(hiddenContent).toBeInTheDocument();

    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const DisabledBlocksClick: Story = {
  name: "Interaction — disabled blocks click",
  args: { disabled: true, children: "Submit" },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "Submit" });

    await expect(button).toBeDisabled();

    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const A11yButtonRole: Story = {
  name: "A11y — button role and type",
  args: { children: "Submit" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Submit" });

    await expect(button).toHaveAttribute("type", "button");
  },
};

export const A11yKeyboardFocus: Story = {
  name: "A11y — keyboard focusable",
  args: { children: "Submit" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Submit" });

    await userEvent.tab();
    await expect(button).toHaveFocus();

    await userEvent.tab();
    await expect(button).not.toHaveFocus();
  },
};

export const A11yLoadingAnnouncement: Story = {
  name: "A11y — custom loading text announced to screen readers",
  args: { loading: true, loadingText: "Saving changes" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Saving changes" });

    await expect(button).toBeInTheDocument();
  },
};

export const A11yIconOnlyLabel: Story = {
  name: "A11y — icon-only requires aria-label",
  args: {
    iconOnly: true,
    "aria-label": "Delete item",
    children: <Trash2 />,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Delete item" });

    await expect(button).toHaveAttribute("aria-label", "Delete item");
  },
};

export const A11yDisabledNotFocusable: Story = {
  name: "A11y — disabled button not focusable via Tab",
  args: { disabled: true, children: "Submit" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Submit" });

    await expect(button).toBeDisabled();

    await userEvent.tab();
    await expect(button).not.toHaveFocus();
  },
};

export const AsChildDisabledBlocksNavigation: Story = {
  name: "A11y — asChild disabled link is marked as aria-disabled",
  parameters: {
    docs: {
      description: {
        story:
          "`aria-disabled` is set when `asChild` renders a disabled `<a>`. The link remains focusable per WAI-ARIA guidance; `pointer-events-none` is applied via the `aria-disabled:` Tailwind variant, not as a literal class.",
      },
    },
  },
  render: (args) => (
    <Button {...args} asChild disabled>
      <a href="#disabled-demo">Unavailable action</a>
    </Button>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Unavailable action" });

    await expect(link).toHaveAttribute("aria-disabled", "true");
  },
};
