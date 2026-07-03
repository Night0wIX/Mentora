"use client";

import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";

import { CourseFormDialog } from "../course-form-dialog";

export const AdminCatalogHeader = () => {
  return (
    <div className="flex flex-col gap-4 pb-6 pt-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
        <p className="text-sm text-muted-foreground">
          Manage, edit, and publish your courses.
        </p>
      </div>

      <CourseFormDialog
        mode={{ type: "create" }}
        trigger={<Button leftIcon={<Plus aria-hidden />}>Add course</Button>}
      />
    </div>
  );
};
