import type { ComponentPropsWithRef } from "react";

import type { CENTERED_LAYOUT_ELEMENTS } from "./centered-layout.constants";

export type CenteredLayoutElement = (typeof CENTERED_LAYOUT_ELEMENTS)[number];

interface CenteredLayoutOwnProps<T extends CenteredLayoutElement> {
  as?: T;
}

export type CenteredLayoutProps<T extends CenteredLayoutElement = "main"> =
  CenteredLayoutOwnProps<T> &
    Omit<ComponentPropsWithRef<T>, keyof CenteredLayoutOwnProps<T>>;
