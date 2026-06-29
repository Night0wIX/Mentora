import { cn } from "@/shared/utils";

import type { SkeletonProps } from "./skeleton.types";
import { skeletonVariants } from "./skeleton.variants";

export const Skeleton = ({
  className,
  shape,
  animated,
  ...props
}: SkeletonProps) => {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants({ shape, animated }), className)}
      {...props}
    />
  );
};
