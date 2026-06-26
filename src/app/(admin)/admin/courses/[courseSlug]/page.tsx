import type { Metadata } from "next";

import type { CourseSlugParams, PageProps } from "@/shared/types/page-params";

export const metadata: Metadata = {
  title: "Course detail",
  description: "Edit course details.",
};

export default async function AdminCourseDetailPage({
  params,
}: PageProps<CourseSlugParams>) {
  const { courseSlug } = await params;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Course detail (admin)
      </h1>
      <p className="text-muted-foreground">courseSlug: {courseSlug}</p>
    </div>
  );
}
