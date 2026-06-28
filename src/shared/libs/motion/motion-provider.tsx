"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface MotionState {
  reduceMotion: boolean;
  isMobileViewport: boolean;
}

interface MotionProviderProps extends PropsWithChildren {
  // Forces `reduceMotion` regardless of the system preference
  overrideReduceMotion?: boolean;
}

const RESIZE_DEBOUNCE_MS = 150;
const MOBILE_BREAKPOINT_PX = 768; // Matches Tailwind's `md` breakpoint
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DEFAULT_MOTION_STATE: MotionState = {
  reduceMotion: false,
  isMobileViewport: false,
};

const MotionContext = createContext<MotionState>(DEFAULT_MOTION_STATE);

function readMotionState(): MotionState {
  return {
    reduceMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
    isMobileViewport: window.innerWidth < MOBILE_BREAKPOINT_PX,
  };
}

export const MotionProvider = ({
  children,
  overrideReduceMotion,
}: MotionProviderProps) => {
  const [motionState, setMotionState] =
    useState<MotionState>(DEFAULT_MOTION_STATE);

  useEffect(() => {
    // Re-sync in case the initial snapshot was taken during SSR
    setMotionState(readMotionState());

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      setMotionState((prev) => ({ ...prev, reduceMotion: event.matches }));
    };

    let resizeTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleViewportResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => {
        setMotionState((prev) => ({
          ...prev,
          isMobileViewport: window.innerWidth < MOBILE_BREAKPOINT_PX,
        }));
      }, RESIZE_DEBOUNCE_MS);
    };

    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    window.addEventListener("resize", handleViewportResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeoutId);
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange,
      );
      window.removeEventListener("resize", handleViewportResize);
    };
  }, []);

  const resolvedMotionState: MotionState =
    overrideReduceMotion === undefined
      ? motionState
      : { ...motionState, reduceMotion: overrideReduceMotion };

  return (
    <MotionContext.Provider value={resolvedMotionState}>
      {children}
    </MotionContext.Provider>
  );
};

export function useMotion(): MotionState {
  return useContext(MotionContext);
}
