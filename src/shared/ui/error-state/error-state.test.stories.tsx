import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Button } from "@/shared/ui/button";

import { ErrorState } from "./error-state";

const meta = {
  title: "Shared/UI/ErrorState/Interactions",
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
} satisfies Meta<typeof ErrorState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RendersBadgeTitleAndDescription: Story = {
  name: "Behavior — renders badge, title, and description",
  play: async ({ canvas }) => {
    await expect(canvas.getByText("403 error")).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: "Access denied" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("You don't have permission to access this resource."),
    ).toBeInTheDocument();
  },
};

export const RendersSingleAction: Story = {
  name: "Behavior — renders a single action",
  play: async ({ canvas }) => {
    const action = canvas.getByRole("button", { name: "Go home" });

    await expect(action).toBeInTheDocument();
  },
};

export const RendersMultipleActions: Story = {
  name: "Behavior — renders multiple actions in order",
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
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole("button");

    await expect(buttons).toHaveLength(2);
    await expect(buttons[0]).toHaveTextContent("Try again");
    await expect(buttons[1]).toHaveTextContent("Go home");
  },
};

export const RendersSupplementaryChildren: Story = {
  name: "Behavior — renders children between description and actions",
  args: {
    children: <p data-testid="error-code">Error code: ERR_500_TIMEOUT</p>,
  },
  play: async ({ canvas }) => {
    const description = canvas.getByText(
      "You don't have permission to access this resource.",
    );
    const errorCode = canvas.getByTestId("error-code");
    const action = canvas.getByRole("button", { name: "Go home" });

    await expect(errorCode).toBeInTheDocument();

    const isBefore = (node: Element, other: Element) =>
      Boolean(
        node.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING,
      );

    await expect(isBefore(description, errorCode)).toBe(true);
    await expect(isBefore(errorCode, action)).toBe(true);
  },
};

export const OmitsChildrenWhenNotProvided: Story = {
  name: "Behavior — renders nothing extra when children is omitted",
  play: async ({ canvas }) => {
    await expect(canvas.queryByTestId("error-code")).not.toBeInTheDocument();
  },
};

export const A11yAnnouncesAsAlert: Story = {
  name: "A11y — root announces as an alert",
  play: async ({ canvas }) => {
    const alert = canvas.getByRole("alert");

    await expect(alert).toBeInTheDocument();
  },
};

export const A11yAlertContainsHeadingAndActions: Story = {
  name: "A11y — alert region contains the heading and the actions",
  play: async ({ canvas }) => {
    const alert = canvas.getByRole("alert");

    await expect(alert).toContainElement(
      canvas.getByRole("heading", { name: "Access denied" }),
    );
    await expect(alert).toContainElement(
      canvas.getByRole("button", { name: "Go home" }),
    );
  },
};

export const A11yHeadingIsLevelOne: Story = {
  name: "A11y — title renders as a level-one heading",
  play: async ({ canvas }) => {
    const heading = canvas.getByRole("heading", {
      name: "Access denied",
      level: 1,
    });

    await expect(heading).toBeInTheDocument();
  },
};
