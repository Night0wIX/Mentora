import { Children } from "react";

import { Logo } from "@/shared/ui/logo";

import type { ErrorStateProps } from "./error-state.types";

export function ErrorState({
  badge,
  title,
  description,
  actions,
  children,
}: ErrorStateProps) {
  const actionList = Children.toArray(actions);

  return (
    <div role="alert" className="flex flex-col items-center text-center">
      <Logo className="size-20" />

      <div className="mt-6 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {badge}
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {title}
        </h1>

        <p className="max-w-sm text-sm text-balance text-muted-foreground">
          {description}
        </p>

        {children}
      </div>

      <div className="mt-8 flex gap-3">{actionList}</div>
    </div>
  );
}
