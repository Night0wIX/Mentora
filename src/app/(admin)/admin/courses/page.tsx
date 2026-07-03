import type { Metadata } from "next";
import { Suspense } from "react";

import type { EmptyParams, PageProps } from "@/shared/types";

import type { AdminCourseCatalogSearchParams } from "@/modules/course";
import {
  AdminCatalogControls,
  AdminCatalogHeader,
  AdminCatalogResults,
  AdminCatalogResultsSkeleton,
} from "@/modules/course";

export const metadata: Metadata = {
  title: "Manage courses",
  description: "Manage courses.",
};

const AdminCoursesPage = ({
  searchParams,
}: PageProps<EmptyParams, AdminCourseCatalogSearchParams>) => {
  return (
    <div className="flex flex-col">
      <AdminCatalogHeader />
      <AdminCatalogControls />
      <div className="pt-6">
        <Suspense fallback={<AdminCatalogResultsSkeleton />}>
          <AdminCatalogResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminCoursesPage;
