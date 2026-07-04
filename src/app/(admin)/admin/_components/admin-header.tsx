"use client";

import { LogOut, Store } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/header";

import { signOutAction } from "@/modules/auth";

export const AdminHeader = () => {
  const [isLoggingOut, startLogoutTransition] = useTransition();

  const handleLogout = (): void => {
    startLogoutTransition(async () => {
      await signOutAction();
    });
  };

  return (
    <Header
      actions={
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.home} aria-label="View site">
              <Store aria-hidden="true" />
              <span className="hidden sm:inline">View site</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            aria-label="Log out"
            onClick={handleLogout}
            disabled={isLoggingOut}
            loading={isLoggingOut}
          >
            <LogOut aria-hidden="true" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      }
    />
  );
};
