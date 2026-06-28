import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogOut, ShieldCheck, Store } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { Header } from "./header";

const meta = {
  title: "Shared/UI/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
  argTypes: {
    actions: {
      control: false,
      description:
        "Right-aligned content rendered after the theme toggle — auth/admin links, logout, etc.",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  name: "Actions — empty",
  args: {
    actions: null,
  },
  parameters: {
    docs: {
      description: {
        story: "No actions slot content — logo, title, and theme toggle only.",
      },
    },
  },
};

export const SingleAction: Story = {
  name: "Actions — single link",
  args: {
    actions: (
      <Button variant="ghost" size="sm" asChild>
        <a href="/" aria-label="Admin login">
          <ShieldCheck aria-hidden="true" />
          <span className="hidden sm:inline">Admin login</span>
        </a>
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mirrors the public site header shown to unauthenticated visitors.",
      },
    },
  },
};

export const MultipleActions: Story = {
  name: "Actions — button group",
  parameters: {
    a11y: { test: "todo" },
    docs: {
      description: {
        story:
          "Mirrors the admin header, which renders a group of related actions.",
      },
    },
  },
  args: {
    actions: (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" asChild>
          <a href="/" aria-label="View site">
            <Store aria-hidden="true" />
            <span className="hidden sm:inline">View site</span>
          </a>
        </Button>
        <Button variant="ghost" size="sm" aria-label="Log out">
          <LogOut aria-hidden="true" />
          <span className="hidden sm:inline">Log out</span>
        </Button>
      </div>
    ),
  },
};
