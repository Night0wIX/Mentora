"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";

import { useMotion } from "./motion-provider";

type Theme = "light" | "dark" | "system";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

// Same values PageTransitionProvider uses — single source of truth for
// "how fast should motion feel on this viewport" across the app.
const TRANSITION_DURATION_DESKTOP_S = 0.25;
const TRANSITION_DURATION_MOBILE_S = 0.15;
const THEME_TRANSITION_DURATION_CSS_VAR = "--theme-transition-duration";

export function useThemeTransition() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const motionState = useMotion();

  const shouldAnimate = motionState !== null && !motionState.reduceMotion;
  const duration = motionState?.isMobileViewport
    ? TRANSITION_DURATION_MOBILE_S
    : TRANSITION_DURATION_DESKTOP_S;

  const setThemeWithTransition = useCallback(
    (next: Theme) => {
      const doc = document as ViewTransitionDocument;

      if (!shouldAnimate || typeof doc.startViewTransition !== "function") {
        setTheme(next);
        return;
      }

      document.documentElement.style.setProperty(
        THEME_TRANSITION_DURATION_CSS_VAR,
        `${duration}s`,
      );

      doc.startViewTransition(() => {
        setTheme(next);
      });
    },
    [setTheme, shouldAnimate, duration],
  );

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeWithTransition,
  };
}
