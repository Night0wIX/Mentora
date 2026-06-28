"use client";

import type { PropsWithChildren } from "react";

import { MotionProvider } from "@/shared/libs/motion";
import { ThemeProvider } from "@/shared/libs/theme";

export const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <MotionProvider>{children}</MotionProvider>
    </ThemeProvider>
  );
};
