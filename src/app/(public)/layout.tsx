import type { PropsWithChildren } from "react";

import { PublicHeader } from "./_components/public-header";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PublicHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
