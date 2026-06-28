import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogOut } from "lucide-react";
import { expect } from "storybook/test";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";

import { Header } from "./header";

const meta = {
  title: "Shared/UI/Header/Interactions",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
  args: {
    actions: null,
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExposesBannerLandmark: Story = {
  name: "A11y — exposes banner landmark",
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("banner")).toBeInTheDocument();
  },
};

export const ExposesNavigationLandmark: Story = {
  name: "A11y — exposes header navigation landmark",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("navigation", { name: "Header navigation" }),
    ).toBeInTheDocument();
  },
};

export const RendersThemeToggle: Story = {
  name: "Interaction — renders theme toggle inside navigation",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("radiogroup", { name: "Theme selection" }),
    ).toBeInTheDocument();
  },
};

export const LogoLinksToHome: Story = {
  name: "Interaction — logo links to home",
  play: async ({ canvas }) => {
    const homeLink = canvas.getByRole("link");

    await expect(homeLink).toHaveAttribute("href", ROUTES.home);
  },
};

export const RendersProvidedActions: Story = {
  name: "Interaction — renders provided actions content",
  args: {
    actions: (
      <Button variant="ghost" size="sm" aria-label="Log out">
        <LogOut aria-hidden="true" />
      </Button>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Log out" }),
    ).toBeInTheDocument();
  },
};
