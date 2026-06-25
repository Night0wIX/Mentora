import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { Button } from "@/shared/ui/button";

import { ErrorState } from "./error-state";

const meta = {
  title: "Shared/UI/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  args: {
    badge: "403 error",
    title: "Access denied",
    description: "You don't have permission to access this resource.",
    actions: <Button size="sm">Go home</Button>,
  },
  argTypes: {
    badge: {
      control: "text",
      description: "Short uppercase label above the title.",
    },
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    actions: {
      control: false,
      description:
        "One or more `Button` elements. Wrap in `Button asChild` to render as a `Link`.",
    },
    children: {
      control: false,
      description:
        "Optional content below the description, before actions — e.g. an error code or support link.",
    },
  },
} satisfies Meta<typeof ErrorState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: "Playground",
  parameters: {
    docs: {
      description: { story: "Configure all props via the Controls panel." },
    },
  },
};

export const NotFound: Story = {
  name: "404 — not found",
  args: {
    badge: "404 error",
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    actions: <Button size="sm">Go home</Button>,
  },
};

export const Forbidden: Story = {
  name: "403 — access denied",
  args: {
    badge: "403 error",
    title: "Access denied",
    description: "You don't have permission to access this resource.",
    actions: <Button size="sm">Go home</Button>,
  },
};

export const ServerError: Story = {
  name: "500 — server error",
  args: {
    badge: "500 error",
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again later.",
    actions: <Button size="sm">Go home</Button>,
  },
};

export const MultipleActions: Story = {
  name: "Multiple actions",
  args: {
    actions: [
      <Button key="retry" variant="outline" size="sm">
        Try again
      </Button>,
      <Button key="home" size="sm">
        Go home
      </Button>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "`actions` accepts an array of `Button` elements when more than one action is needed.",
      },
    },
  },
};

export const WithSupplementaryContent: Story = {
  name: "With supplementary content",
  args: {
    children: (
      <p className="text-xs text-muted-foreground">
        Error code: ERR_500_TIMEOUT
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "`children` renders below the description for supplementary content like an error code or support link — distinct from the primary `description`.",
      },
    },
  },
};

export const AnnouncesAsAlert: Story = {
  name: "A11y — announces as alert",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");

    await expect(alert).toContainElement(
      canvas.getByRole("heading", { name: "Access denied" }),
    );
  },
};
