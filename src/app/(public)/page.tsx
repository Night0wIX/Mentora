import type { Metadata } from "next";

import { SITE_CONFIG } from "@/shared/config";
import type { EmptyParams, PageProps } from "@/shared/types";

import type { CourseCatalogSearchParams } from "@/modules/course";
import {
  CatalogControls,
  CatalogHeader,
  CatalogResults,
} from "@/modules/course";

export const metadata: Metadata = {
  title: "Course catalog",
  description: `Browse the full course catalog on ${SITE_CONFIG.name}.`,
};

const CourseCatalogPage = async ({
  searchParams,
}: PageProps<EmptyParams, CourseCatalogSearchParams>) => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 md:px-6">
      <CatalogHeader />
      <CatalogControls />
      <div className="pt-6">
        <CatalogResults searchParams={searchParams} />
      </div>
    </div>
  );
};

export default CourseCatalogPage;
