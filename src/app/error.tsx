"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/shared/config";
import type { NextError } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { CenteredLayout } from "@/shared/ui/centered-layout";
import { ErrorState } from "@/shared/ui/error-state";

interface ErrorBoundaryProps {
  error: NextError;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <CenteredLayout>
      <ErrorState
        badge="Unexpected error"
        title="Something went wrong"
        description="An unexpected error occurred. Try again, or head back to the homepage."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw aria-hidden="true" />}
              onClick={reset}
            >
              Try again
            </Button>
            <Button size="sm" asChild>
              <Link href={ROUTES.home}>Go home</Link>
            </Button>
          </>
        }
      >
        {error.digest && (
          <p className="text-xs text-muted-foreground/70">
            Error reference:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              {error.digest}
            </code>
          </p>
        )}
      </ErrorState>
    </CenteredLayout>
  );
}
