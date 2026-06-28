import { cn } from "@/shared/utils";

import type { SpinnerProps } from "./spinner.types";
import { spinnerVariants } from "./spinner.variants";

export const Spinner = ({ className, size, label, ...props }: SpinnerProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-90"
      />
    </svg>
  );
};
