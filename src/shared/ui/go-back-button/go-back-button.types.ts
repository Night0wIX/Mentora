import type { ComponentProps } from "react";

import type { Button } from "@/shared/ui/button";

interface GoBackButtonOwnProps {
  fallbackHref?: string;
}

type GoBackButtonBaseProps = Extract<
  ComponentProps<typeof Button>,
  { iconOnly?: false }
>;

export type GoBackButtonProps = GoBackButtonOwnProps &
  Omit<GoBackButtonBaseProps, "onClick" | "leftIcon">;
