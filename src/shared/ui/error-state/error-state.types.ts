import type { PropsWithChildren, ReactElement } from "react";

import type { Button } from "@/shared/ui/button";

type ErrorStateAction = ReactElement<typeof Button>;

export interface ErrorStateProps extends PropsWithChildren {
  badge: string;
  title: string;
  description: string;
  actions: ErrorStateAction | ErrorStateAction[];
}
