"use client";

import type { Transition } from "motion/react";

import {
  MOTION_DURATION_DESKTOP_S,
  MOTION_DURATION_MOBILE_S,
} from "./constants";
import { useMotion } from "./motion-provider";

const REDUCED_MOTION_DURATION_S = 0.01;

export function useMotionTransition(transition: Transition = {}): Transition {
  const motionState = useMotion();

  if (motionState === null) {
    return transition;
  }

  if (motionState.reduceMotion) {
    return { ...transition, duration: REDUCED_MOTION_DURATION_S };
  }

  if (transition.duration !== undefined) {
    return transition;
  }

  const duration = motionState.isMobileViewport
    ? MOTION_DURATION_MOBILE_S
    : MOTION_DURATION_DESKTOP_S;

  return { ...transition, duration };
}
