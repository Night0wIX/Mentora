import type { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { CenteredLayout } from "@/shared/ui/centered-layout";
import { ErrorState } from "@/shared/ui/error-state";

export const metadata: Metadata = {
  title: "Access denied",
};

const Forbidden = () => {
  return (
    <CenteredLayout>
      <ErrorState
        badge="403 error"
        title="Access denied"
        description="You don't have permission to access this resource."
        actions={
          <Button size="sm" asChild>
            <Link href={ROUTES.home}>Go home</Link>
          </Button>
        }
      />
    </CenteredLayout>
  );
};

export default Forbidden;
