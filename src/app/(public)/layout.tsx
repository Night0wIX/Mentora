import type { PropsWithChildren } from "react";

import { PublicHeader } from "./_components/public-header";

const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <PublicHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
};

export default PublicLayout;
