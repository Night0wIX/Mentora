import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/shared/ui/button";
import { createPlaceholderKeys } from "@/shared/utils";

import { CenteredLayout } from "./centered-layout";
import { CENTERED_LAYOUT_ELEMENTS } from "./centered-layout.constants";

const meta = {
  title: "Shared/UI/CenteredLayout",
  component: CenteredLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
  args: {
    children: (
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Page title</h1>
        <p className="text-muted-foreground text-sm">
          Supporting description that sits below the heading.
        </p>
      </div>
    ),
  },
  argTypes: {
    as: {
      control: "select",
      options: CENTERED_LAYOUT_ELEMENTS,
      description:
        "Underlying HTML element. Default `main` covers most full-page cases. Use `section` or `article` when a `<main>` landmark already exists in the tree. Use `div` only when no semantic role is needed.",
      table: { defaultValue: { summary: "main" } },
    },
    className: {
      control: "text",
      description:
        "Appended to the wrapper via `cn()`. Use to override padding, max-width, alignment, or background.",
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof CenteredLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Configure all props via the Controls panel.",
      },
    },
  },
};

export const AsMain: Story = {
  name: "Element — main",
  args: { as: "main" },
  parameters: {
    docs: {
      description: {
        story: "Default page landmark. Use for top-level page content.",
      },
    },
  },
};

export const AsSection: Story = {
  name: "Element — section",
  args: { as: "section" },
  parameters: {
    docs: {
      description: {
        story:
          "Use when a `<main>` landmark already exists, e.g. centering content inside a modal or drawer.",
      },
    },
  },
};

export const AsArticle: Story = {
  name: "Element — article",
  args: { as: "article" },
  parameters: {
    docs: {
      description: {
        story: "Self-contained content region, e.g. a single card or post.",
      },
    },
  },
};

export const AsDiv: Story = {
  name: "Element — div",
  args: { as: "div" },
  parameters: {
    docs: {
      description: {
        story:
          "No semantic role. Use only when the parent already carries the correct landmark.",
      },
    },
  },
};

export const CustomClassName: Story = {
  name: "Custom — className override",
  args: {
    className: "bg-muted",
    children: (
      <div className="flex max-w-sm flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Custom background
        </h1>
        <p className="text-muted-foreground text-sm">
          Background overridden via <code>className</code>.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Any layout token — background, padding, min-height — can be overridden via `className`. `cn()` handles Tailwind class merging.",
      },
    },
  },
};

export const NarrowContent: Story = {
  name: "Edge — narrow content, no max-width set",
  args: {
    children: (
      <p className="text-muted-foreground text-sm">
        The layout itself sets no <code>max-w-*</code>; constrain width on the
        inner wrapper as needed.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The layout never applies its own max-width — content stretches to fill unless the consumer constrains it.",
      },
    },
  },
};

export const LongContent: Story = {
  name: "Edge — content taller than viewport",
  args: {
    children: (
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Tall content</h1>
        {createPlaceholderKeys(12).map((key, index) => (
          <p key={key} className="text-muted-foreground text-sm">
            Paragraph {index + 1} — confirms the layout scrolls naturally
            instead of clipping when content exceeds <code>min-h-svh</code>.
          </p>
        ))}
      </div>
    ),
  },
  parameters: {
    a11y: { test: "todo" },
    docs: {
      description: {
        story:
          "`min-h-svh` is a floor, not a cap — overflowing content scrolls the page rather than being clipped.",
      },
    },
  },
};

export const ErrorPage: Story = {
  name: "Usage — error page",
  parameters: {
    a11y: { test: "todo" },
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Typical 500 error screen. Content width is controlled by the consumer via `max-w-*` on the inner wrapper.",
      },
    },
  },
  render: () => (
    <CenteredLayout>
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <span className="text-muted-foreground text-5xl font-bold">500</span>
        <h1 className="text-xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-sm">
          An unexpected error occurred. Try refreshing the page or come back
          later.
        </p>
        <Button>Refresh page</Button>
      </div>
    </CenteredLayout>
  ),
};

export const NotFoundPage: Story = {
  name: "Usage — 404 page",
  parameters: {
    a11y: { test: "todo" },
    controls: { disable: true },
  },
  render: () => (
    <CenteredLayout>
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <span className="text-muted-foreground text-5xl font-bold">404</span>
        <h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button>Go home</Button>
      </div>
    </CenteredLayout>
  ),
};

export const AuthForm: Story = {
  name: "Usage — auth form",
  parameters: {
    a11y: { test: "todo" },
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Auth form with left-aligned content inside a max-width container — both controlled by the consumer, not the layout itself.",
      },
    },
  },
  render: () => (
    <CenteredLayout>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your account to continue.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border-input rounded-md border px-3 py-2 text-sm"
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-input rounded-md border px-3 py-2 text-sm"
            aria-label="Password"
          />
          <Button fullWidth>Sign in</Button>
        </div>
      </div>
    </CenteredLayout>
  ),
};
