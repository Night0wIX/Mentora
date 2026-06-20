"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

import {
  MOTION_DURATION_DESKTOP_S,
  MOTION_DURATION_MOBILE_S,
} from "./constants";
import { useMotion } from "./motion-provider";

const SLIDE_OFFSET_PX = 8;

export function PageTransitionProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const motionState = useMotion();

  // Render children directly until the real environment is known —
  // AnimatePresence reads `initial` synchronously during render, so animating
  // before motionState is resolved would use stale/default values.
  if (motionState === null) {
    return <>{children}</>;
  }

  const { reduceMotion, isMobileViewport } = motionState;
  const shouldAnimate = !reduceMotion;
  const duration = isMobileViewport
    ? MOTION_DURATION_MOBILE_S
    : MOTION_DURATION_DESKTOP_S;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={shouldAnimate ? { opacity: 0, y: SLIDE_OFFSET_PX } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldAnimate ? { opacity: 0, y: -SLIDE_OFFSET_PX } : {}}
        transition={{ duration, ease: "easeOut" }}
        aria-live="polite"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
