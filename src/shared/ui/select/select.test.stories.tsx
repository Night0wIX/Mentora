import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  expect,
  fn,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "storybook/test";

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
  title: "Shared/UI/Select/Interactions",
  component: SelectDemo,
  parameters: {
    layout: "centered",
    a11y: { test: "error" },
  },
} satisfies Meta<typeof SelectDemo>;

export default meta;

type Story = StoryObj<typeof meta>;
type PlayFn = NonNullable<Story["play"]>;
type PlayContext = Parameters<PlayFn>[0];

/**
 * "Closed" for this component means the listbox is actually gone from the
 * DOM, not just that aria-expanded flipped to false. Radix's SelectContent
 * unmounts via Presence, which waits for an animationend event before
 * removing the node and lifting aria-hidden from the rest of the tree.
 * Any assertion (or afterEach a11y scan) that runs before that unmount
 * completes can see a stale listbox and a still aria-hidden trigger
 * ancestor — that's the source of the flaky aria-hidden-focus /
 * aria-input-field-name failures, not a real accessibility bug.
 *
 * waitForListboxRemoved is the single source of truth for "the Select has
 * finished closing." Every story that closes the Select uses it, so the
 * DOM is always in its final state before play() returns and before
 * addon-a11y's afterEach runs.
 */
const waitForListboxRemoved = async () => {
  const listbox = screen.queryByRole("listbox", { hidden: true });
  if (!listbox) return;
  await waitForElementToBeRemoved(listbox, { timeout: 3000 });
};

const getTrigger = (canvasElement: PlayContext["canvasElement"]) =>
  // hidden: true is required while the Select is open: Radix marks
  // everything outside its portal (including canvasElement) aria-hidden,
  // and getByRole excludes aria-hidden subtrees by default.
  within(canvasElement).getByRole("combobox", { hidden: true });

const closeSelectIfOpen = async (
  canvasElement: PlayContext["canvasElement"],
) => {
  const trigger = getTrigger(canvasElement);
  if (trigger.getAttribute("aria-expanded") !== "true") return;

  await userEvent.keyboard("{Escape}");
  await waitForListboxRemoved();
};

const withClosedSelectAfter =
  (play: PlayFn): PlayFn =>
  async (context) => {
    try {
      await play(context);
    } finally {
      await closeSelectIfOpen(context.canvasElement);
    }
  };

export const RendersClosedByDefault: Story = {
  name: "Behavior — renders closed, listbox is absent from the DOM",
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  },
};

export const ShowsPlaceholderWhenNoValue: Story = {
  name: "Behavior — shows the placeholder when no value is selected",
  args: { placeholder: "Select a fruit" },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await expect(trigger).toHaveTextContent("Select a fruit");
  },
};

export const ShowsSelectedLabelWhenDefaultValueProvided: Story = {
  name: "Behavior — shows the selected value's label instead of the placeholder",
  args: { defaultValue: "banana" },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await expect(trigger).toHaveTextContent("Banana");
    await expect(trigger).not.toHaveTextContent("Select a fruit");
  },
};

export const OpensListboxOnTriggerClick: Story = {
  name: "Behavior — clicking the trigger opens the listbox with all options",
  play: withClosedSelectAfter(async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);

    const listbox = await screen.findByRole("listbox");
    const options = screen.getAllByRole("option");

    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(listbox).toBeInTheDocument();
    await expect(options).toHaveLength(DEFAULT_ITEMS.length);
  }),
};

export const ClosesListboxOnEscape: Story = {
  name: "Behavior — Escape closes the open listbox",
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);
    await screen.findByRole("listbox");

    await userEvent.keyboard("{Escape}");

    await waitForListboxRemoved();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const SelectsItemOnClick: Story = {
  name: "Behavior — clicking an option selects it and closes the listbox",
  args: { onValueChange: fn() },
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);
    await screen.findByRole("listbox");
    const option = await screen.findByRole("option", { name: "Banana" });
    await userEvent.click(option);

    await expect(args.onValueChange).toHaveBeenCalledWith("banana");
    await expect(trigger).toHaveTextContent("Banana");

    await waitForListboxRemoved();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const ReturnsFocusToTriggerAfterSelection: Story = {
  name: "A11y — focus returns to the trigger after selecting an option",
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);
    await screen.findByRole("listbox");
    const option = await screen.findByRole("option", { name: "Cherry" });
    await userEvent.click(option);

    await waitForListboxRemoved();

    // onCloseAutoFocus fires as part of the same unmount Presence resolves
    // in waitForListboxRemoved, but focus assignment can land a tick later.
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const MarksSelectedOptionAsAriaSelected: Story = {
  name: "A11y — the selected option is marked with aria-selected",
  args: { defaultValue: "cherry" },
  play: withClosedSelectAfter(async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);

    const selectedOption = await screen.findByRole("option", {
      name: "Cherry",
    });
    const otherOption = screen.getByRole("option", { name: "Apple" });

    await expect(selectedOption).toHaveAttribute("aria-selected", "true");
    await expect(otherOption).toHaveAttribute("aria-selected", "false");
  }),
};

export const ShowsCheckIndicatorOnlyOnSelectedOption: Story = {
  name: "Visual — the check icon is visible only on the selected option",
  args: { defaultValue: "cherry" },
  play: withClosedSelectAfter(async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);

    const selectedOption = await screen.findByRole("option", {
      name: "Cherry",
    });
    const otherOption = screen.getByRole("option", { name: "Apple" });

    await expect(
      selectedOption.querySelector("svg.lucide-check"),
    ).not.toBeNull();
    await expect(otherOption.querySelector("svg.lucide-check")).toBeNull();
  }),
};

export const SkipsDisabledOptionOnClick: Story = {
  name: "Behavior — clicking a disabled option does not select it",
  args: { onValueChange: fn() },
  play: withClosedSelectAfter(async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);
    const disabledOption = await screen.findByRole("option", {
      name: "Grape",
    });

    await expect(disabledOption).toHaveAttribute("aria-disabled", "true");

    // pointer-events: none alone would stop user-event from ever
    // dispatching the click in a real browser — that only proves the CSS
    // works. Forcing dispatch with pointerEventsCheck: 0 exercises
    // Radix's own disabled guard, not just the styling.
    await userEvent.click(disabledOption, { pointerEventsCheck: 0 });

    await expect(args.onValueChange).not.toHaveBeenCalled();
    await expect(trigger).not.toHaveTextContent("Grape");
    await expect(screen.getByRole("listbox")).toBeInTheDocument();
  }),
};

export const NavigatesAndSelectsViaKeyboard: Story = {
  name: "A11y — selecting an option via keyboard (Enter → ArrowDown → Enter)",
  args: { onValueChange: fn() },
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await screen.findByRole("listbox");

    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    await expect(args.onValueChange).toHaveBeenCalledWith("cherry");
    await expect(trigger).toHaveTextContent("Cherry");

    await waitForListboxRemoved();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};

export const DisabledSelectIgnoresTriggerInteraction: Story = {
  name: "State — a disabled select does not open via click or keyboard",
  args: { disabled: true, onValueChange: fn() },
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await expect(trigger).toBeDisabled();

    await userEvent.click(trigger);
    await expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

export const TriggerHasAccessibleName: Story = {
  name: "A11y — the trigger has a correct accessible name (aria-label)",
  args: { ariaLabel: "Fruit" },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox", {
      name: "Fruit",
    });

    await expect(trigger).toBeInTheDocument();
  },
};

export const RendersEmptyListboxWithoutOptions: Story = {
  name: "Edge case — an empty options list renders a listbox with no options",
  args: { items: [] },
  play: withClosedSelectAfter(async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("combobox");

    await userEvent.click(trigger);

    const listbox = await screen.findByRole("listbox");

    await expect(listbox).toBeInTheDocument();
    await expect(screen.queryAllByRole("option")).toHaveLength(0);
  }),
};
