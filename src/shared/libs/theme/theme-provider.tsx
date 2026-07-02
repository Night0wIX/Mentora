"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren<{
  forcedTheme?: "light" | "dark";
}>;

export const ThemeProvider = ({
  children,
  forcedTheme,
}: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      forcedTheme={forcedTheme}
    >
      {children}
    </NextThemesProvider>
  );
};
