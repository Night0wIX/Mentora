"use client";

import "@/styles/index.css";

import { INTER } from "@/shared/config";
import { Button } from "@/shared/ui/button";

interface GlobalErrorProps {
  reset: () => void;
}

const GlobalError = ({ reset }: GlobalErrorProps) => {
  return (
    <html lang="en" className={INTER.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-24 text-center font-sans text-foreground antialiased">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Critical error
        </p>

        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-balance">
          Something went wrong
        </h1>

        <p className="mb-8 max-w-sm text-sm text-balance text-muted-foreground">
          The application ran into a critical error. Reloading the page usually
          fixes this.
        </p>

        <Button onClick={reset}>Try again</Button>
      </body>
    </html>
  );
};

export default GlobalError;
