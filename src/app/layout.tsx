import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Mentora",
  description: "Course management platform",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="uk" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
