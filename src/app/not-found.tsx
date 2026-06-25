import type { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { CenteredLayout } from "@/shared/ui/centered-layout";
import { ErrorState } from "@/shared/ui/error-state";
import { GoBackButton } from "@/shared/ui/go-back-button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <CenteredLayout>
      <ErrorState
        badge="404 error"
        title="Page not found"
        description="The page you're looking for doesn't exist or may have been moved."
        actions={
          <>
            <GoBackButton />
            <Button size="sm" asChild>
              <Link href={ROUTES.home}>Go home</Link>
            </Button>
          </>
        }
      />
    </CenteredLayout>
  );
}
