"use client";
import { Slot } from "radix-ui";

import { Spinner } from "@/shared/ui/spinner";
import { cn } from "@/shared/utils";

import { BUTTON_DEFAULT_LOADING_TEXT } from "./button.constants";
import type { ButtonProps } from "./button.types";
import { buttonVariants } from "./button.variants";

export const Button = ({
  ref,
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText = BUTTON_DEFAULT_LOADING_TEXT,
  iconOnly = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  // asChild is ignored when loading — button renders natively to show spinner
  if (asChild && !loading) {
    return (
      <Slot.Slot
        data-slot="button"
        aria-disabled={isDisabled || undefined}
        onClick={isDisabled ? (e) => e.preventDefault() : props.onClick}
        className={cn(
          buttonVariants({ variant, size, iconOnly, fullWidth, className }),
        )}
        {...props}
      >
        {children}
      </Slot.Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      data-slot="button"
      data-loading={loading || undefined}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({ variant, size, iconOnly, fullWidth, className }),
        loading && "relative",
      )}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <Spinner />
          <span className="sr-only">{loadingText}</span>
        </span>
      )}

      <span
        className={cn(
          "inline-flex items-center justify-center gap-2",
          loading && "invisible",
        )}
        aria-hidden={loading || undefined}
      >
        {!iconOnly && leftIcon}
        {children}
        {!iconOnly && rightIcon}
      </span>
    </button>
  );
};
