import { cva } from "class-variance-authority";

export const skeletonVariants = cva("bg-muted", {
  variants: {
    shape: {
      text: "h-4 rounded-sm",
      circular: "rounded-full",
      rectangular: "rounded-md",
    },
    animated: {
      true: "animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    shape: "rectangular",
    animated: true,
  },
});
