"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

interface ThemeProviderProps extends PropsWithChildren {
  forcedTheme?: string;
}

export function ThemeProvider({ children, forcedTheme }: ThemeProviderProps) {
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
}
