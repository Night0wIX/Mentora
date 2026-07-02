import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

import { Pagination } from "./pagination";

const meta = {
  title: "Shared/UI/Pagination/Interactions",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RendersNothingForSinglePage: Story = {
  name: "Behavior — does not render nav when totalPageCount = 1",
  args: {
    currentPage: 1,
    totalPageCount: 1,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("nav")).not.toBeInTheDocument();
  },
};

export const RendersNothingForZeroPages: Story = {
  name: "Behavior — does not render nav when totalPageCount = 0",
  args: {
    currentPage: 1,
    totalPageCount: 0,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("nav")).not.toBeInTheDocument();
  },
};

export const RendersAllPagesWithoutEllipsis: Story = {
  name: "Behavior — shows all pages without ellipsis within the limit",
  args: {
    currentPage: 3,
    totalPageCount: 7,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvasElement }) => {
    const pageLinks = canvasElement.querySelectorAll('a[aria-label^="Page"]');
    const ellipses = canvasElement.querySelectorAll('li[aria-hidden="true"]');

    await expect(pageLinks).toHaveLength(7);
    await expect(ellipses).toHaveLength(0);
  },
};

export const MarksCurrentPageWithAriaCurrent: Story = {
  name: "A11y — marks the current page with aria-current",
  args: {
    currentPage: 3,
    totalPageCount: 7,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvas }) => {
    const currentPageLink = canvas.getByRole("link", { name: "Page 3" });
    const otherPageLink = canvas.getByRole("link", { name: "Page 2" });

    await expect(currentPageLink).toHaveAttribute("aria-current", "page");
    await expect(otherPageLink).not.toHaveAttribute("aria-current");
  },
};

export const DisablesPreviousControlAsNativeButton: Story = {
  name: "A11y — Previous becomes button[disabled] on the first page",
  args: {
    currentPage: 1,
    totalPageCount: 10,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvas }) => {
    const previousControl = canvas.getByRole("button", {
      name: "Previous page",
    });
    const nextControl = canvas.getByRole("link", { name: "Next page" });

    await expect(previousControl.tagName).toBe("BUTTON");
    await expect(previousControl).toBeDisabled();
    await expect(nextControl).not.toHaveAttribute("aria-disabled");
  },
};

export const DisablesNextControlAsNativeButton: Story = {
  name: "A11y — Next becomes button[disabled] on the last page",
  args: {
    currentPage: 10,
    totalPageCount: 10,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvas }) => {
    const nextControl = canvas.getByRole("button", {
      name: "Next page",
    });
    const previousControl = canvas.getByRole("link", {
      name: "Previous page",
    });

    await expect(nextControl.tagName).toBe("BUTTON");
    await expect(nextControl).toBeDisabled();
    await expect(previousControl).not.toHaveAttribute("aria-disabled");
  },
};

export const CollapsesMiddlePagesIntoTwoEllipses: Story = {
  name: "Behavior — a middle page collapses on both sides",
  args: {
    currentPage: 10,
    totalPageCount: 20,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvasElement, canvas }) => {
    const ellipses = canvasElement.querySelectorAll('li[aria-hidden="true"]');
    const expectedPages = [1, 9, 10, 11, 20];

    await expect(ellipses).toHaveLength(2);

    for (const page of expectedPages) {
      await expect(
        canvas.getByRole("link", { name: `Page ${page}` }),
      ).toBeInTheDocument();
    }
  },
};

export const OmitsLeadingEllipsisNearStartBoundary: Story = {
  name: "Behavior — no leading ellipsis near the start boundary",
  args: {
    currentPage: 2,
    totalPageCount: 20,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvasElement, canvas }) => {
    const ellipses = canvasElement.querySelectorAll('li[aria-hidden="true"]');
    const expectedPages = [1, 2, 3, 20];

    await expect(ellipses).toHaveLength(1);

    for (const page of expectedPages) {
      await expect(
        canvas.getByRole("link", { name: `Page ${page}` }),
      ).toBeInTheDocument();
    }
  },
};

export const OmitsTrailingEllipsisNearEndBoundary: Story = {
  name: "Behavior — no trailing ellipsis near the end boundary",
  args: {
    currentPage: 19,
    totalPageCount: 20,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvasElement, canvas }) => {
    const ellipses = canvasElement.querySelectorAll('li[aria-hidden="true"]');
    const expectedPages = [1, 18, 19, 20];

    await expect(ellipses).toHaveLength(1);

    for (const page of expectedPages) {
      await expect(
        canvas.getByRole("link", { name: `Page ${page}` }),
      ).toBeInTheDocument();
    }
  },
};

export const EllipsisIsHiddenAndNonInteractive: Story = {
  name: "A11y — ellipsis is hidden from assistive tech and non-interactive",
  args: {
    currentPage: 10,
    totalPageCount: 20,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvasElement }) => {
    const ellipses = canvasElement.querySelectorAll('li[aria-hidden="true"]');

    await expect(ellipses).toHaveLength(2);

    for (const ellipsis of ellipses) {
      await expect(ellipsis.querySelector("a, button")).toBeNull();
    }
  },
};

export const PageLinksUseGetPageHref: Story = {
  name: "Behavior — page href is built via getPageHref",
  args: {
    currentPage: 5,
    totalPageCount: 10,
    getPageHref: fn((pageNumber: number) => `/courses?page=${pageNumber}`),
  },
  play: async ({ canvas }) => {
    const currentPageLink = canvas.getByRole("link", { name: "Page 5" });
    const previousControl = canvas.getByRole("link", {
      name: "Previous page",
    });
    const nextControl = canvas.getByRole("link", { name: "Next page" });

    await expect(currentPageLink).toHaveAttribute("href", "/courses?page=5");
    await expect(previousControl).toHaveAttribute("href", "/courses?page=4");
    await expect(nextControl).toHaveAttribute("href", "/courses?page=6");
  },
};
