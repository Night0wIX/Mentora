import { Skeleton } from "@/shared/ui/skeleton";

import {
  THEME_TOGGLE_BUTTON_SIZE_CLASS,
  themeOptions,
} from "./theme-toggle.constants";

export function ThemeToggleSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="inline-flex items-center gap-1 rounded-full border bg-muted p-1"
    >
      {themeOptions.map(({ value }) => (
        <Skeleton
          key={value}
          shape="circular"
          className={THEME_TOGGLE_BUTTON_SIZE_CLASS}
        />
      ))}
    </div>
  );
}
