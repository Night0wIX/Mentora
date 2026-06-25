import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import type { skeletonVariants } from "./skeleton.variants";

export type SkeletonShape = NonNullable<
  VariantProps<typeof skeletonVariants>["shape"]
>;

export interface SkeletonProps
  extends ComponentProps<"div">,
    Omit<VariantProps<typeof skeletonVariants>, "animated"> {
  // Forces the animation on/off regardless of the user's reduced-motion preference
  animated?: boolean;
}

export interface SkeletonGroupProps extends ComponentProps<"div"> {
  // Announced to screen readers while the group is loading
  label?: string;
}
