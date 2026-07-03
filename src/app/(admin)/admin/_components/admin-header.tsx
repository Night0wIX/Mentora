"use client";

import { LogOut, Store } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/header";

export const AdminHeader = () => {
  // TODO(auth): wire up real logout mutation and redirect
  const handleLogout = () => {};

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
          >
            <LogOut aria-hidden="true" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      }
    />
  );
};
