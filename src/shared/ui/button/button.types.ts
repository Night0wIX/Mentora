import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode, Ref } from "react";

import type { buttonVariants } from "./button.variants";

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

interface ButtonBaseProps {
  ref?: Ref<HTMLButtonElement>;
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

interface ButtonWithLabelProps extends ButtonBaseProps {
  iconOnly?: false;
  "aria-label"?: string;
}

interface ButtonIconOnlyProps extends ButtonBaseProps {
  iconOnly: true;
  "aria-label": string;
}

type ButtonOwnProps = ButtonWithLabelProps | ButtonIconOnlyProps;

export type ButtonProps = Omit<ComponentProps<"button">, "aria-label"> &
  VariantProps<typeof buttonVariants> &
  ButtonOwnProps;
