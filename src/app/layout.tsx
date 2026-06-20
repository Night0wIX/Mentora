import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { cn } from "@/shared/libs/cn";
import "@/styles/index.css";
import { RootProvider } from "@/app/root-provider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mentora",
  description: "Course management platform",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="uk"
      className={cn("h-full antialiased", inter.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground font-sans">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
