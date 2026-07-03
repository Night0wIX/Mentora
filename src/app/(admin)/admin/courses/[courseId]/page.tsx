import type { Metadata } from "next";

import type { PageProps } from "@/shared/types";

import type { CourseIdParams } from "@/modules/course";

export const metadata: Metadata = {
  title: "Course detail",
  description: "Edit course details.",
};

const AdminCourseDetailPage = async ({ params }: PageProps<CourseIdParams>) => {
  const { courseId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Course detail (admin)
      </h1>
      <p className="text-muted-foreground">courseId: {courseId}</p>
    </div>
  );
};

export default AdminCourseDetailPage;
