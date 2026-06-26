import Link from "next/link";

import { ROUTES, SITE_CONFIG } from "@/shared/config";
import { Logo } from "@/shared/ui/logo";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

import type { HeaderProps } from "./header.types";

export function Header({ actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href={ROUTES.home}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <Logo
            size="lg"
            className="transition-transform group-hover:scale-105"
          />
          <span className="hidden text-lg font-semibold tracking-tight text-foreground md:inline">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <nav
          aria-label="Header navigation"
          className="flex items-center gap-2 md:gap-3"
        >
          <ThemeToggle />
          <div aria-hidden="true" className="h-4 w-px bg-border" />
          {actions}
        </nav>
      </div>
    </header>
  );
}
