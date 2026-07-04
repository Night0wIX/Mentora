import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { createSupabaseServerClient } from "@/shared/libs/supabase/server";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/header";

export const PublicHeader = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  const adminLink = data.user
    ? { href: ROUTES.adminCourses, label: "Admin panel" }
    : { href: ROUTES.login, label: "Admin login" };

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
