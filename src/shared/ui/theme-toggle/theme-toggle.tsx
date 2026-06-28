"use client";

import { useIsHydrated } from "@/shared/hooks";
import { useThemeTransition } from "@/shared/libs/motion";
import { cn } from "@/shared/utils";

import {
  THEME_TOGGLE_BUTTON_SIZE_CLASS,
  THEME_TOGGLE_ICON_SIZE_CLASS,
  themeOptions,
} from "./theme-toggle.constants";
import { ThemeToggleSkeleton } from "./theme-toggle.skeleton";

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeTransition();
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return <ThemeToggleSkeleton />;
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className="inline-flex items-center gap-1 rounded-full border bg-muted p-1"
    >
      {themeOptions.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;

        return (
          <label
            key={value}
            title={label}
            className={cn(
              "relative flex cursor-pointer items-center justify-center rounded-full transition-colors",
              THEME_TOGGLE_BUTTON_SIZE_CLASS,
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name="theme"
              value={value}
              checked={isActive}
              onChange={() => setTheme(value)}
              aria-label={label}
              className="absolute inset-0 cursor-pointer appearance-none rounded-full opacity-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
            <Icon
              aria-hidden="true"
              className={cn(
                THEME_TOGGLE_ICON_SIZE_CLASS,
                "pointer-events-none",
              )}
            />
          </label>
        );
      })}
    </div>
  );
};
