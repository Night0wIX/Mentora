import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  AlertCircle,
  ArrowRight,
  Download,
  Heart,
  Plus,
  Trash2,
} from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { fn } from "storybook/test";

import { capitalize } from "@/shared/utils";

import { Button } from "./button";
import { BUTTON_DEFAULT_LOADING_TEXT } from "./button.constants";
import type { ButtonVariant } from "./button.types";

const BUTTON_VARIANTS = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const satisfies ButtonVariant[];

const BUTTON_SIZES = ["default", "sm", "lg", "icon"] as const;

const ContainerDecorator = (Story: () => JSX.Element) => (
  <div className="w-80">
    <Story />
  </div>
);

const meta = {
  title: "Shared/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  args: {
    children: "Button",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: BUTTON_VARIANTS,
      description: "Visual style of the button.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: BUTTON_SIZES,
      description: "Height and padding scale.",
      table: { defaultValue: { summary: "default" } },
    },
    iconOnly: {
      control: "boolean",
      description:
        "Square footprint for icon-only usage. Requires `aria-label`.",
      table: { defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches the button to fill its container.",
      table: { defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "Shows a spinner, keeps width stable, blocks interaction.",
      table: { defaultValue: { summary: "false" } },
    },
    loadingText: {
      control: "text",
      description: "Screen-reader text announced while loading.",
      table: { defaultValue: { summary: `"${BUTTON_DEFAULT_LOADING_TEXT}"` } },
    },
    disabled: {
      control: "boolean",
      description: "Native disabled state.",
    },
    asChild: {
      control: "boolean",
      description:
        "Renders styles onto the immediate child instead of a `<button>`. Incompatible with `loading`.",
    },
    leftIcon: {
      control: false,
      description: "Icon rendered before the label.",
    },
    rightIcon: {
      control: false,
      description: "Icon rendered after the label.",
    },
    children: {
      control: "text",
      description: "Button label, or the icon element when `iconOnly` is set.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {
  name: "Variant — default",
};

export const AllVariants: Story = {
  name: "Variants — all",
  parameters: { a11y: { test: "todo" } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {capitalize(variant)}
        </Button>
      ))}
    </div>
  ),
};

export const Destructive: Story = {
  name: "Variant — destructive",
  args: { variant: "destructive", children: "Delete" },
  parameters: {
    docs: {
      description: {
        story:
          "For irreversible actions. Pair with a confirmation dialog in production.",
      },
    },
  },
};

export const Outline: Story = {
  name: "Variant — outline",
  args: { variant: "outline" },
};

export const Secondary: Story = {
  name: "Variant — secondary",
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  name: "Variant — ghost",
  args: { variant: "ghost" },
};

export const Link: Story = {
  name: "Variant — link",
  args: { variant: "link" },
};

export const AllSizes: Story = {
  name: "Sizes — all",
  parameters: { a11y: { test: "todo" } },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  name: "Icon — left",
  args: { leftIcon: <Plus />, children: "Add item" },
};

export const WithRightIcon: Story = {
  name: "Icon — right",
  args: { rightIcon: <ArrowRight />, children: "Continue" },
};

export const WithBothIcons: Story = {
  name: "Icon — both sides",
  args: {
    leftIcon: <Download />,
    rightIcon: <ArrowRight />,
    children: "Download report",
  },
};

export const IconOnlyAllSizes: Story = {
  name: "Icon-only — all sizes",
  parameters: { a11y: { test: "todo" } },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-3">
      <Button {...args} iconOnly size="sm" aria-label="Add item">
        <Plus />
      </Button>
      <Button {...args} iconOnly size="default" aria-label="Add item">
        <Plus />
      </Button>
      <Button {...args} iconOnly size="lg" aria-label="Add item">
        <Plus />
      </Button>
    </div>
  ),
};

export const IconOnlyDestructive: Story = {
  name: "Icon-only — destructive",
  args: {
    iconOnly: true,
    variant: "destructive",
    "aria-label": "Delete item",
    children: <Trash2 />,
  },
};

export const Loading: Story = {
  name: "Loading — default",
  args: { loading: true },
};

export const LoadingCustomText: Story = {
  name: "Loading — custom sr text",
  args: { loading: true, loadingText: "Saving changes" },
};

export const LoadingIconOnly: Story = {
  name: "Loading — icon-only",
  args: {
    loading: true,
    iconOnly: true,
    "aria-label": "Delete item",
    children: <Trash2 />,
  },
};

export const LoadingDestructive: Story = {
  name: "Loading — destructive",
  args: { loading: true, variant: "destructive", children: "Delete" },
};

export const LoadingFullWidth: Story = {
  name: "Loading — full width",
  args: { loading: true, fullWidth: true },
  decorators: [ContainerDecorator],
};

export const Disabled: Story = {
  name: "Disabled — default",
  args: { disabled: true },
};

export const DisabledAllVariants: Story = {
  name: "Disabled — all variants",
  parameters: { a11y: { test: "todo" } },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {BUTTON_VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} disabled>
          {capitalize(variant)}
        </Button>
      ))}
    </div>
  ),
};

export const FullWidth: Story = {
  name: "Full width",
  args: { fullWidth: true },
  decorators: [ContainerDecorator],
};

export const FullWidthWithIcons: Story = {
  name: "Full width — with icons",
  args: {
    fullWidth: true,
    leftIcon: <Download />,
    rightIcon: <ArrowRight />,
    children: "Download report",
  },
  decorators: [ContainerDecorator],
};

export const AsChildLink: Story = {
  name: "asChild — anchor tag",
  parameters: {
    docs: {
      description: {
        story:
          "Renders button styles on a native `<a>`. Use Next.js `<Link>` in the app.",
      },
    },
  },
  render: (args) => (
    <Button {...args} asChild>
      <a href="#asChild-demo">Open link</a>
    </Button>
  ),
};

export const AsChildDisabledLink: Story = {
  name: "asChild — disabled link",
  parameters: {
    docs: {
      description: {
        story:
          "`<a>` has no native `disabled` attribute — `aria-disabled` + `pointer-events-none` is applied instead. Keyboard focus remains reachable per WAI-ARIA guidance; add `tabIndex={-1}` at the call site if full removal from tab order is needed.",
      },
    },
  },
  render: (args) => (
    <Button {...args} asChild disabled>
      <a href="#asChild-demo">Unavailable action</a>
    </Button>
  ),
};

export const AsChildWithLoading: Story = {
  name: "asChild — overridden by loading",
  parameters: {
    docs: {
      description: {
        story:
          "When `loading` is true, `asChild` is ignored and a native `<button>` renders so the spinner displays correctly.",
      },
    },
  },
  render: (args) => (
    <Button {...args} asChild loading>
      <a href="#asChild-demo">Example with link</a>
    </Button>
  ),
};

export const LongLabel: Story = {
  name: "Edge — long label",
  parameters: { layout: "padded" },
  args: {
    children:
      "This is an unusually long button label to confirm whitespace-nowrap behavior",
  },
};

export const LongLabelConstrained: Story = {
  name: "Edge — long label in narrow container",
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="w-48 border border-dashed border-border p-2">
      <Button {...args} fullWidth leftIcon={<AlertCircle />}>
        A fairly long call to action
      </Button>
    </div>
  ),
};

export const DisabledAndLoading: Story = {
  name: "Edge — disabled + loading",
  args: { disabled: true, loading: true },
};

export const DestructiveLoadingIconOnly: Story = {
  name: "Edge — destructive + loading + icon-only",
  args: {
    variant: "destructive",
    loading: true,
    iconOnly: true,
    size: "sm",
    "aria-label": "Delete item",
    children: <Trash2 />,
  },
};

export const ComplexChildren: Story = {
  name: "Edge — complex children",
  args: {
    leftIcon: <Heart />,
    children: (
      <span>
        Save <strong>all</strong> changes
      </span>
    ),
  },
};

export const AriaInvalid: Story = {
  name: "Edge — aria-invalid",
  args: { "aria-invalid": true, variant: "outline", children: "Submit" },
  parameters: {
    docs: {
      description: {
        story:
          "Applied by a parent form when submission is invalid. Renders a destructive ring.",
      },
    },
  },
};
