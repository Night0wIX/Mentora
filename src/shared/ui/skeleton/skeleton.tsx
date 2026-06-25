"use client";

import { useMotion } from "@/shared/libs/motion";
import { cn } from "@/shared/utils";

import type { SkeletonProps } from "./skeleton.types";
import { skeletonVariants } from "./skeleton.variants";

export function Skeleton({
  className,
  shape,
  animated,
  ...props
}: SkeletonProps) {
  const { reduceMotion } = useMotion();
  const isAnimated = animated ?? !reduceMotion;

  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        skeletonVariants({ shape, animated: isAnimated }),
        className,
      )}
      {...props}
    />
  );
}
