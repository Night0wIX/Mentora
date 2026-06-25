import type { ComponentPropsWithRef, ElementType } from "react";

export type CenteredLayoutElement = Extract<
  ElementType,
  "main" | "div" | "section" | "article"
>;

interface CenteredLayoutOwnProps<T extends CenteredLayoutElement> {
  as?: T;
}

export type CenteredLayoutProps<T extends CenteredLayoutElement = "main"> =
  CenteredLayoutOwnProps<T> &
    Omit<ComponentPropsWithRef<T>, keyof CenteredLayoutOwnProps<T>>;
