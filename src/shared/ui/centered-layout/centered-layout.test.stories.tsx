import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { CenteredLayout } from "./centered-layout";

const CENTERED_LAYOUT_SELECTOR = '[data-slot="centered-layout"]';

const getRoot = (canvasElement: HTMLElement) =>
  canvasElement.querySelector(CENTERED_LAYOUT_SELECTOR);

const meta = {
  title: "Shared/UI/CenteredLayout/Interactions",
  component: CenteredLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
  args: {
    children: "Content",
  },
} satisfies Meta<typeof CenteredLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RendersAsMainByDefault: Story = {
  name: "Behavior — defaults to <main> when `as` is omitted",
  play: async ({ canvasElement }) => {
    await expect(getRoot(canvasElement)?.tagName).toBe("MAIN");
  },
};

export const RendersSectionWhenAsIsSection: Story = {
  name: 'Behavior — renders <section> when `as="section"`',
  args: { as: "section" },
  play: async ({ canvasElement }) => {
    await expect(getRoot(canvasElement)?.tagName).toBe("SECTION");
  },
};

export const RendersArticleWhenAsIsArticle: Story = {
  name: 'Behavior — renders <article> when `as="article"`',
  args: { as: "article" },
  play: async ({ canvasElement }) => {
    await expect(getRoot(canvasElement)?.tagName).toBe("ARTICLE");
  },
};

export const ExposesDataSlotAttribute: Story = {
  name: 'Behavior — exposes `data-slot="centered-layout"` for selector hooks',
  play: async ({ canvasElement }) => {
    await expect(getRoot(canvasElement)).toBeInTheDocument();
  },
};

export const MergesCustomClassNameWithBaseClasses: Story = {
  name: "Behavior — merges custom className with base layout classes",
  args: { className: "bg-muted" },
  play: async ({ canvasElement }) => {
    const root = getRoot(canvasElement);

    await expect(root).toHaveClass("bg-muted");
    await expect(root).toHaveClass("flex");
    await expect(root).toHaveClass("min-h-svh");
  },
};

export const ForwardsArbitraryPropsToRootElement: Story = {
  name: "Behavior — forwards rest props (e.g. `id`, `aria-label`) to the root element",
  args: {
    "aria-label": "Page content",
    id: "main-content",
  },
  play: async ({ canvasElement }) => {
    const root = getRoot(canvasElement);

    await expect(root).toHaveAttribute("aria-label", "Page content");
    await expect(root).toHaveAttribute("id", "main-content");
  },
};

export const RendersChildren: Story = {
  name: "Behavior — renders children",
  args: { children: "Hello world" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hello world")).toBeInTheDocument();
  },
};

export const ExposesMainLandmarkRole: Story = {
  name: "A11y — <main> exposes the main landmark role",
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("main")).toBeInTheDocument();
  },
};

export const DivCarriesNoImplicitLandmarkRole: Story = {
  name: "A11y — <div> carries no implicit landmark role",
  args: { as: "div" },
  parameters: { a11y: { test: "todo" } },
  play: async ({ canvasElement }) => {
    const root = getRoot(canvasElement);

    await expect(root?.tagName).toBe("DIV");
    await expect(root).not.toHaveAttribute("role");
  },
};
