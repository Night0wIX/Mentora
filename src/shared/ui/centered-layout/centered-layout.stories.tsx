import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/shared/ui/button";

import { CenteredLayout } from "./centered-layout";
import type { CenteredLayoutElement } from "./centered-layout.types";

const meta = {
  title: "Shared/UI/CenteredLayout",
  component: CenteredLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
  argTypes: {
    as: {
      control: "select",
      options: [
        "main",
        "div",
        "section",
        "article",
      ] satisfies CenteredLayoutElement[],
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
  name: "Playground",
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
  parameters: {
    docs: {
      description: {
        story: "Configure all props via the Controls panel.",
      },
    },
  },
};

export const AsMain: Story = {
  name: "As — main",
  args: {
    as: "main",
    children: (
      <p className="text-muted-foreground text-sm">
        Rendered as <code>&lt;main&gt;</code> — the default page landmark.
      </p>
    ),
  },
};

export const AsSection: Story = {
  name: "As — section",
  args: {
    as: "section",
    children: (
      <p className="text-muted-foreground text-sm">
        Rendered as <code>&lt;section&gt;</code> — use when a{" "}
        <code>&lt;main&gt;</code> already exists in the layout.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Appropriate for modal or drawer interiors that need a centered region inside an existing landmark.",
      },
    },
  },
};

export const AsArticle: Story = {
  name: "As — article",
  args: {
    as: "article",
    children: (
      <p className="text-muted-foreground text-sm">
        Rendered as <code>&lt;article&gt;</code> — self-contained content
        region.
      </p>
    ),
  },
};

export const AsDiv: Story = {
  name: "As — div",
  args: {
    as: "div",
    children: (
      <p className="text-muted-foreground text-sm">
        Rendered as <code>&lt;div&gt;</code> — no semantic role.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use only when the parent already carries the correct landmark and no additional semantics are needed.",
      },
    },
  },
};

export const ErrorPage: Story = {
  name: "Usage — error page",
  parameters: {
    a11y: { test: "todo" },
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
  },
  render: () => (
    <CenteredLayout>
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <span className="text-muted-foreground text-5xl font-bold">404</span>
        <h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground text-sm">
          The page you're looking for doesn't exist or has been moved.
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
