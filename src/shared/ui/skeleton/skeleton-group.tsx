import { cn } from "@/shared/utils";

import type { SkeletonGroupProps } from "./skeleton.types";

export const SkeletonGroup = ({
  label = "Loading content",
  className,
  children,
  ...props
}: SkeletonGroupProps) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label}
      className={cn("block", className)}
      {...props}
    >
      {children}
    </div>
  );
};
