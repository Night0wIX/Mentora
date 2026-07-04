import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { AdminCourseDetailHeader, getAdminCourse } from "@/modules/course";
import {
  AdminLessonList,
  AdminLessonListSkeleton,
  getAdminLessons,
} from "@/modules/lesson";

interface AdminCourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export const generateMetadata = async ({
  params,
}: AdminCourseDetailPageProps): Promise<Metadata> => {
  const { courseId } = await params;
  const course = await getAdminCourse(courseId);

  return {
    title: course ? `${course.title} · Admin` : "Course not found",
    robots: { index: false, follow: false },
  };
};

async function LessonsSection({ courseId }: { courseId: string }) {
  const lessons = await getAdminLessons(courseId);

  return <AdminLessonList courseId={courseId} lessons={lessons} />;
}

export default async function AdminCourseDetailPage({
  params,
}: AdminCourseDetailPageProps) {
  const { courseId } = await params;
  const course = await getAdminCourse(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminCourseDetailHeader course={course} />
      <Suspense fallback={<AdminLessonListSkeleton count={3} />}>
        <LessonsSection courseId={courseId} />
      </Suspense>
    </div>
  );
}
