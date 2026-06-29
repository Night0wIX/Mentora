"use client";

import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import {
  MOTION_DURATION_DESKTOP_S,
  MOTION_DURATION_MOBILE_S,
} from "./constants";
import { useMotion } from "./motion-provider";

type Theme = "light" | "dark" | "system";

// `interface extends Document` conflicts with the existing DOM type — use type intersection instead
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

const THEME_TRANSITION_CSS_VAR = "--theme-transition-duration";

export function useThemeTransition() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const motionState = useMotion();

  const shouldAnimate = !motionState.reduceMotion;
  const duration = motionState.isMobileViewport
    ? MOTION_DURATION_MOBILE_S
    : MOTION_DURATION_DESKTOP_S;

  const setThemeWithTransition = (next: Theme) => {
    const doc = document as ViewTransitionDocument;

    if (!shouldAnimate || typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    doc.documentElement.style.setProperty(
      THEME_TRANSITION_CSS_VAR,
      `${duration}s`,
    );

    doc.startViewTransition(() => {
      flushSync(() => {
        setTheme(next);
      });
    });
  };

  return { theme, resolvedTheme, setTheme: setThemeWithTransition };
}
