import type { PropsWithChildren } from "react";

import { AdminHeader } from "./admin/_components/admin-header";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AdminHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 md:px-6">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
