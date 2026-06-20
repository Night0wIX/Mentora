"use client";

import type { PropsWithChildren } from "react";

import { MotionProvider, PageTransitionProvider } from "@/shared/libs/motion";
import { ThemeProvider } from "@/shared/libs/theme";

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
