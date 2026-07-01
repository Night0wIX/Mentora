import type { Metadata } from "next";

import { SITE_CONFIG } from "@/shared/config";

import {
  CatalogEmptyState,
  CourseCard,
  CourseCardGrid,
  getCourses,
} from "@/modules/course";

export const metadata: Metadata = {
  title: "Course catalog",
  description: `Browse the full course catalog on ${SITE_CONFIG.name}.`,
};

const CourseCatalogPage = async () => {
  const courses = await getCourses();
  const publishedCourses = courses.filter(
    (course) => course.status === "published",
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 md:px-6">
      {publishedCourses.length === 0 ? (
        <CatalogEmptyState />
      ) : (
        <CourseCardGrid>
          {publishedCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </CourseCardGrid>
      )}
    </div>
  );
};

export default CourseCatalogPage;
