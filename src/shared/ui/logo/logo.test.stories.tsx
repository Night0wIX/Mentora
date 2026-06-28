import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { createRef } from "react";
import { expect } from "storybook/test";

import { Logo } from "./logo";
import { LOGO_SIZES } from "./logo.constants";
import type { LogoSize } from "./logo.types";

const meta = {
  title: "Shared/UI/Logo/Interactions",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const A11yWithAriaLabelIsAnnouncedAsImage: Story = {
  name: "A11y — with ariaLabel, exposes role=img and the label",
  args: { ariaLabel: "Company logo" },
  play: async ({ canvas }) => {
    const logo = canvas.getByRole("img", { name: "Company logo" });

    await expect(logo).toHaveAttribute("aria-label", "Company logo");
    await expect(logo).not.toHaveAttribute("aria-hidden");
  },
};

export const A11yWithoutAriaLabelIsHiddenFromScreenReaders: Story = {
  name: "A11y — without ariaLabel, is hidden from screen readers",
  play: async ({ canvasElement }) => {
    const logo = canvasElement.querySelector("svg");

    await expect(logo).toHaveAttribute("aria-hidden", "true");
    await expect(logo).not.toHaveAttribute("role");
    await expect(logo).not.toHaveAttribute("aria-label");
  },
};

export const RendersDefaultSizeWhenSizeIsOmitted: Story = {
  name: "Interaction — defaults to size=md when `size` is omitted",
  args: { ariaLabel: "Company logo" },
  play: async ({ canvas }) => {
    const logo = canvas.getByRole("img", { name: "Company logo" });

    await expect(logo).toHaveAttribute("width", LOGO_SIZES.md);
    await expect(logo).toHaveAttribute("height", LOGO_SIZES.md);
  },
};

export const MapsSizePropToDimensions: Story = {
  name: "Interaction — maps each size to its exact width and height",
  render: () => (
    <div className="flex items-center gap-4">
      {(Object.keys(LOGO_SIZES) as LogoSize[]).map((size) => (
        <Logo key={size} size={size} ariaLabel={`Logo ${size}`} />
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const [size, pixelValue] of Object.entries(LOGO_SIZES)) {
      const logo = canvas.getByRole("img", { name: `Logo ${size}` });

      await expect(logo).toHaveAttribute("width", pixelValue);
      await expect(logo).toHaveAttribute("height", pixelValue);
    }
  },
};

export const AppliesCustomClassName: Story = {
  name: "Interaction — applies custom className to the svg",
  args: { ariaLabel: "Company logo", className: "text-blue-500" },
  play: async ({ canvas }) => {
    const logo = canvas.getByRole("img", { name: "Company logo" });

    await expect(logo).toHaveClass("text-blue-500");
  },
};

const logoRef = createRef<SVGSVGElement>();

export const ForwardsRefToSvgElement: Story = {
  name: "Interaction — forwards ref to the underlying svg element",
  render: () => <Logo ref={logoRef} ariaLabel="Company logo" />,
  play: async ({ canvas }) => {
    const logo = canvas.getByRole("img", { name: "Company logo" });

    await expect(logoRef.current).toBe(logo);
  },
};

export const ForwardsArbitrarySvgProps: Story = {
  name: "Interaction — forwards rest props (e.g. `id`) to the svg element",
  args: { ariaLabel: "Company logo", id: "primary-logo" },
  play: async ({ canvasElement }) => {
    const logo = canvasElement.querySelector("#primary-logo");

    await expect(logo).toBeInTheDocument();
  },
};
