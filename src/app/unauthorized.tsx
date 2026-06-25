import type { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { CenteredLayout } from "@/shared/ui/centered-layout";
import { ErrorState } from "@/shared/ui/error-state";

export const metadata: Metadata = {
  title: "Sign in required",
};

export default function Unauthorized() {
  return (
    <CenteredLayout>
      <ErrorState
        badge="401 error"
        title="Sign in required"
        description="Your session has expired or you're not signed in. Sign in to continue."
        actions={
          <Button size="sm" asChild>
            <Link href={ROUTES.login}>Sign in</Link>
          </Button>
        }
      />
    </CenteredLayout>
  );
}
