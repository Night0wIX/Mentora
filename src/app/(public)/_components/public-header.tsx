import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/header";

type UserRole = "admin" | "user";

interface AuthUser {
  role: UserRole;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

const MOCK_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
};

function getAdminLink({ isAuthenticated, user }: typeof MOCK_AUTH_STATE) {
  if (isAuthenticated && user?.role === "admin") {
    return { href: ROUTES.adminCourses, label: "Admin panel" };
  }

  if (isAuthenticated) {
    return null;
  }

  return { href: ROUTES.login, label: "Admin login" };
}

export const PublicHeader = () => {
  const adminLink = getAdminLink(MOCK_AUTH_STATE);

  if (!adminLink) {
    return <Header actions={null} />;
  }

  return (
    <Header
      actions={
        <Button variant="ghost" size="sm" asChild>
          <Link href={adminLink.href} aria-label={adminLink.label}>
            <ShieldCheck aria-hidden="true" />
            <span className="hidden sm:inline">{adminLink.label}</span>
          </Link>
        </Button>
      }
    />
  );
};
