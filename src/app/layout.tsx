import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "@/styles/index.css";

import { RootProvider } from "@/app/root-provider";
import { BASE_METADATA, INTER } from "@/shared/config";

export const metadata: Metadata = BASE_METADATA;

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={INTER.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-background text-foreground font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
