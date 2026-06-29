import type { PropsWithChildren, ReactNode } from "react";

export interface ErrorStateProps extends PropsWithChildren {
  badge: string;
  title: string;
  description: string;
  actions?: ReactNode;
}
