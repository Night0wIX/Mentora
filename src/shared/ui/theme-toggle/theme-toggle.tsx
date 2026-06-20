"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { cn } from "../../libs/cn";
import { useThemeTransition } from "../../libs/motion/use-theme-transition";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useThemeTransition();

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1"
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;

        return (
          <label
            key={value}
            className={cn(
              "flex size-8 items-center justify-center rounded-full transition-colors",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            title={label}
          >
            <input
              type="radio"
              name="theme"
              value={value}
              checked={isActive}
              onChange={() => setTheme(value)}
              className="sr-only"
              aria-label={label}
            />
            <Icon className="size-4" />
          </label>
        );
      })}
    </div>
  );
}
