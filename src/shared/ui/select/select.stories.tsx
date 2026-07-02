import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type SelectItemData = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectDemoProps = {
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  defaultValue?: string;
  items?: SelectItemData[];
  onValueChange?: (value: string) => void;
};

const DEFAULT_ITEMS: SelectItemData[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape", disabled: true },
  { value: "mango", label: "Mango" },
];

const SelectDemo = ({
  placeholder = "Select a fruit",
  ariaLabel = "Fruit",
  disabled,
  defaultValue,
  items = DEFAULT_ITEMS,
  onValueChange,
}: SelectDemoProps) => (
  <Select
    defaultValue={defaultValue}
    disabled={disabled}
    onValueChange={onValueChange}
  >
    <SelectTrigger className="w-55" aria-label={ariaLabel}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {items.map((item) => (
        <SelectItem
          key={item.value}
          value={item.value}
          disabled={item.disabled}
        >
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const meta = {
  title: "Shared/UI/Select",
  component: SelectDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when no value is selected.",
    },
    ariaLabel: {
      control: "text",
      description: "Accessible name of the trigger (aria-label).",
    },
    disabled: {
      control: "boolean",
      description:
        "Fully disables the select — the trigger becomes non-interactive.",
    },
    defaultValue: {
      control: "text",
      description: "Value selected by default (unmanaged mode).",
    },
    items: {
      control: false,
      description:
        "List of options. An option with disabled: true is not selectable.",
    },
    onValueChange: {
      control: false,
      description: "Called with the new value when an option is selected.",
    },
  },
} satisfies Meta<typeof SelectDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDefaultValue: Story = {
  name: "State — with a pre-selected value",
  args: { defaultValue: "banana" },
  parameters: {
    docs: {
      description: {
        story:
          "The trigger immediately shows the selected item's label instead of the placeholder.",
      },
    },
  },
};

export const Disabled: Story = {
  name: "State — fully disabled select",
  args: { disabled: true, defaultValue: "apple" },
  parameters: {
    docs: {
      description: {
        story:
          "The trigger gets a native disabled attribute — neither click nor keyboard opens the list.",
      },
    },
  },
};

export const WithDisabledItem: Story = {
  name: "State — one option is unavailable",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "The 'Grape' option has disabled: true — it is visible but not clickable and is skipped by keyboard navigation.",
      },
    },
  },
};

export const LongList: Story = {
  name: "Layout — long list of options",
  args: {
    items: Array.from({ length: 20 }, (_, index) => ({
      value: `option-${index + 1}`,
      label: `Option ${index + 1}`,
    })),
    placeholder: "Select an option",
    ariaLabel: "Option",
  },
};

export const EmptyList: Story = {
  name: "Edge case — empty options list",
  args: { items: [] },
  parameters: {
    docs: {
      description: {
        story: "Content renders empty when no items are provided.",
      },
    },
  },
};
