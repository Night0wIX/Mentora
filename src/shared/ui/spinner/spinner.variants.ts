import { cva } from "class-variance-authority";

export const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-4",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
