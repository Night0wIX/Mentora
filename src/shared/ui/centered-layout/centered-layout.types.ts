import type { ComponentPropsWithRef } from "react";

import type { CENTERED_LAYOUT_ELEMENTS } from "./centered-layout.constants";

export type CenteredLayoutElement = (typeof CENTERED_LAYOUT_ELEMENTS)[number];

interface CenteredLayoutOwnProps<TRoot extends CenteredLayoutElement> {
  as?: TRoot;
}

export type CenteredLayoutProps<TRoot extends CenteredLayoutElement = "main"> =
  CenteredLayoutOwnProps<TRoot> &
    Omit<ComponentPropsWithRef<TRoot>, keyof CenteredLayoutOwnProps<TRoot>>;
