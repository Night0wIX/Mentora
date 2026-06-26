import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Manage courses.",
};

export default function AdminCoursesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        Courses list (admin)
      </h1>
    </div>
  );
}
