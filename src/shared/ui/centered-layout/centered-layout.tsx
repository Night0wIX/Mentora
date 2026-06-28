import type { ElementType } from "react";

import { cn } from "@/shared/utils";

import type {
  CenteredLayoutElement,
  CenteredLayoutProps,
} from "./centered-layout.types";

export const CenteredLayout = <T extends CenteredLayoutElement = "main">({
  as,
  className,
  children,
  ...props
}: CenteredLayoutProps<T>) => {
  const Root = (as ?? "main") as ElementType;

  return (
    <Root
      data-slot="centered-layout"
      className={cn(
        "flex min-h-svh w-full flex-1 flex-col items-center justify-center px-6 py-16",
        className,
      )}
      {...props}
    >
      {children}
    </Root>
  );
};
