import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center px-4">
      {children}
    </main>
  );
}
