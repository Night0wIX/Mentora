"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { MOBILE_BREAKPOINT_PX } from "./constants";

const RESIZE_DEBOUNCE_MS = 150;

export interface MotionState {
  reduceMotion: boolean;
  isMobileViewport: boolean;
}

type MotionContextValue = MotionState | null;

const MotionContext = createContext<MotionContextValue>(null);

function readMotionState(): MotionState {
  return {
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    isMobileViewport: window.innerWidth < MOBILE_BREAKPOINT_PX,
  };
}

export function MotionProvider({ children }: PropsWithChildren) {
  const [motionState, setMotionState] = useState<MotionState | null>(null);

  useEffect(() => {
    setMotionState(readMotionState());

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const handleReducedMotionChange = (event: MediaQueryListEvent): void => {
      setMotionState((previousState) => ({
        reduceMotion: event.matches,
        isMobileViewport:
          previousState?.isMobileViewport ?? readMotionState().isMobileViewport,
      }));
    };

    let resizeTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleViewportResize = (): void => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => {
        const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT_PX;
        setMotionState((previousState) => ({
          reduceMotion:
            previousState?.reduceMotion ?? reducedMotionQuery.matches,
          isMobileViewport,
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

  return (
    <MotionContext.Provider value={motionState}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}
