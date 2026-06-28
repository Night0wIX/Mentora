import type { Metadata } from "next";

import { SITE_CONFIG } from "@/shared/config";

export const metadata: Metadata = {
  title: "Course catalog",
  description: `Browse the full course catalog on ${SITE_CONFIG.name}.`,
};

const CourseCatalogPage = () => {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-6 md:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Course catalog</h1>
      <p className="text-muted-foreground">Catalog page</p>
    </main>
  );
};

export default CourseCatalogPage;
