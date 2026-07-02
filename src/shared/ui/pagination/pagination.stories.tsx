import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { type MouseEvent, useState } from "react";
import { fn } from "storybook/test";

import { Pagination } from "./pagination";

const getPageHref = (pageNumber: number) => `/courses?page=${pageNumber}`;

type InteractivePaginationProps = {
  initialPage: number;
  totalPageCount: number;
};

const InteractivePagination = ({
  initialPage,
  totalPageCount,
}: InteractivePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor) return;

    event.preventDefault();

    const url = new URL(anchor.href);
    const page = Number(url.searchParams.get("page"));
    if (Number.isFinite(page) && page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  };

  return (
    <div onClickCapture={handleClick}>
      <Pagination
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        getPageHref={getPageHref}
      />
    </div>
  );
};

const meta = {
  title: "Shared/UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  args: {
    currentPage: 1,
    totalPageCount: 5,
    getPageHref: fn(getPageHref),
  },
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page (1-based).",
    },
    totalPageCount: {
      control: { type: "number", min: 0 },
      description:
        "Total number of pages. When the value is ≤ 1, the component does not render.",
    },
    getPageHref: {
      control: false,
      description: "Builds the href for navigating to the given page.",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

// Static: reflects args exactly, mirrors real (uncontrolled) usage. Clicking
// a page here won't visibly move — that's expected, see Interactive below.
export const Playground: Story = {};

// Clickable: local state simulates the URL round-trip so you can click
// through pages, Previous/Next, and ellipses like in the real app.
export const Interactive: Story = {
  name: "Demo — clickable (local state simulates routing)",
  args: { currentPage: 1, totalPageCount: 20 },
  render: (args) => (
    <InteractivePagination
      initialPage={args.currentPage}
      totalPageCount={args.totalPageCount}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pagination itself is uncontrolled and Link-driven — in the real app the URL closes the loop back to `currentPage`. This story fakes that loop locally so you can click through pages in Storybook.",
      },
    },
  },
};

export const SinglePage: Story = {
  name: "Edge case — a single page does not render",
  args: { totalPageCount: 1 },
  parameters: {
    docs: {
      description: {
        story: "The component returns null when there is nothing to paginate.",
      },
    },
  },
};

export const NoPages: Story = {
  name: "Edge case — zero pages does not render",
  args: { totalPageCount: 0 },
};

export const FewPages: Story = {
  name: "Layout — all pages visible, no collapsing",
  args: { currentPage: 3, totalPageCount: 7 },
  parameters: {
    docs: {
      description: {
        story:
          "Within MAX_VISIBLE_PAGES_WITHOUT_COLLAPSE (7), all page numbers are shown and no ellipsis appears.",
      },
    },
  },
};

export const FirstPage: Story = {
  name: "Boundary — first page",
  args: { currentPage: 1, totalPageCount: 20 },
  parameters: {
    docs: {
      description: {
        story:
          "The Previous control is disabled; ellipsis appears only before the last page.",
      },
    },
  },
};

export const LastPage: Story = {
  name: "Boundary — last page",
  args: { currentPage: 20, totalPageCount: 20 },
  parameters: {
    docs: {
      description: {
        story:
          "The Next control is disabled; ellipsis appears only after the first page.",
      },
    },
  },
};

export const SecondPage: Story = {
  name: "Boundary — second page, no leading ellipsis",
  args: { currentPage: 2, totalPageCount: 20 },
  parameters: {
    docs: {
      description: {
        story:
          "The neighbor range (currentPage - 1) sits right against the boundary page (1) — the ellipsis appears only after the third page.",
      },
    },
  },
};

export const PenultimatePage: Story = {
  name: "Boundary — penultimate page, no trailing ellipsis",
  args: { currentPage: 19, totalPageCount: 20 },
};

export const MiddlePage: Story = {
  name: "Layout — middle page, collapsed on both sides",
  args: { currentPage: 10, totalPageCount: 20 },
  parameters: {
    docs: {
      description: {
        story:
          "Two ellipses: one after the first page, one before the last page.",
      },
    },
  },
};

export const ManyPages: Story = {
  name: "Stress — large number of pages",
  args: { currentPage: 500, totalPageCount: 1000 },
};
