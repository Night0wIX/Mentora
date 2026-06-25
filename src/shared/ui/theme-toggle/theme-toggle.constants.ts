import { Monitor, Moon, Sun } from "lucide-react";

export const THEME_TOGGLE_BUTTON_SIZE_CLASS = "size-8";
export const THEME_TOGGLE_ICON_SIZE_CLASS = "size-4";

export const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;
