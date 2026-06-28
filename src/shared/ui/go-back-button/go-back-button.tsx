"use client";

import { ArrowLeft } from "lucide-react";

import { useGoBack } from "@/shared/hooks";
import { Button } from "@/shared/ui/button";

import { GO_BACK_BUTTON_DEFAULT_LABEL } from "./go-back-button.constants";
import type { GoBackButtonProps } from "./go-back-button.types";

export const GoBackButton = ({
  fallbackHref,
  variant = "outline",
  size = "sm",
  children = GO_BACK_BUTTON_DEFAULT_LABEL,
  ...props
}: GoBackButtonProps) => {
  const goBack = useGoBack({ fallbackHref });

  return (
    <Button
      variant={variant}
      size={size}
      leftIcon={<ArrowLeft aria-hidden="true" />}
      onClick={goBack}
      {...props}
    >
      {children}
    </Button>
  );
};
