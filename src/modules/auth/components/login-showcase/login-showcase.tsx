import { Check } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Logo } from "@/shared/ui/logo";
import { cn } from "@/shared/utils";

import {
  LOGIN_SHOWCASE_MODULE_STATUS_LABEL,
  LOGIN_SHOWCASE_MODULES,
} from "./login-showcase.constants";
import type { LoginShowcaseModule } from "./login-showcase.types";

function formatStepNumber(position: number): string {
  return String(position + 1).padStart(2, "0");
}

function getLastActiveModuleIndex(modules: LoginShowcaseModule[]): number {
  return modules.reduce(
    (frontierIndex, showcaseModule, index) =>
      showcaseModule.status === "upcoming" ? frontierIndex : index,
    0,
  );
}

function getProgressRatio(modules: LoginShowcaseModule[]): number {
  if (modules.length <= 1) return 1;
  return getLastActiveModuleIndex(modules) / (modules.length - 1);
}

const PROGRESS_RATIO = getProgressRatio(LOGIN_SHOWCASE_MODULES);

export function LoginShowcase() {
  return (
    <aside
      aria-labelledby="login-showcase-heading"
      className="bg-foreground text-background relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="bg-background/10 absolute -top-24 -right-24 size-96 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <Link href={ROUTES.home} className="relative flex items-center gap-2.5">
        <Logo size="lg" className="text-background" />
        <span className="text-lg font-medium tracking-tight">Mentora</span>
      </Link>

      <div className="relative flex flex-col gap-8">
        <h2 id="login-showcase-heading" className="sr-only">
          Course creation roadmap
        </h2>

        <p className="text-background/60 text-xs font-medium tracking-[0.08em] uppercase">
          Every course, start to finish
        </p>

        <ol className="relative isolate flex flex-col gap-6">
          <span
            aria-hidden
            className="bg-background/15 absolute top-2.75 bottom-2.75 left-2.75 -z-10 w-px rounded-full"
          />
          <span
            aria-hidden
            className="bg-background absolute top-2.75 left-2.75 -z-10 w-px rounded-full transition-[height] duration-700 ease-out"
            style={{ height: `calc((100% - 1.375rem) * ${PROGRESS_RATIO})` }}
          />

          {LOGIN_SHOWCASE_MODULES.map((showcaseModule, index) => (
            <li key={showcaseModule.id} className="flex items-center gap-4">
              <span
                className={cn(
                  "relative flex size-5.5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                  showcaseModule.status === "completed" &&
                    "bg-[color-mix(in_oklab,var(--background)_20%,var(--foreground))] text-background",
                  showcaseModule.status === "current" &&
                    "bg-background text-foreground",
                  showcaseModule.status === "upcoming" &&
                    "bg-foreground border-background/25 text-background/40 border",
                )}
              >
                {showcaseModule.status === "current" && (
                  <span
                    aria-hidden
                    className="bg-background/30 absolute -inset-1 -z-10 animate-pulse rounded-full blur-sm motion-reduce:animate-none"
                  />
                )}

                {showcaseModule.status === "completed" ? (
                  <Check aria-hidden className="size-3" />
                ) : (
                  <span aria-hidden>{formatStepNumber(index)}</span>
                )}
              </span>

              <span className="flex flex-col">
                <span
                  className={cn(
                    "text-sm",
                    showcaseModule.status === "upcoming"
                      ? "text-background/40"
                      : "text-background font-medium",
                  )}
                >
                  {showcaseModule.title}
                </span>
                <span className="sr-only">
                  {LOGIN_SHOWCASE_MODULE_STATUS_LABEL[showcaseModule.status]}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-background/40 border-background/15 relative border-t pt-4 text-xs">
        Course management platform
      </p>
    </aside>
  );
}
