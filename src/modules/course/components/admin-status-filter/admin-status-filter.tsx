"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { capitalize } from "@/shared/utils";

import {
  ADMIN_STATUS_FILTER_ALL_VALUE,
  COURSE_STATUSES,
} from "../../constants";
import { useAdminCourseCatalogParams } from "../../hooks/use-admin-course-catalog-params";
import type { CourseStatus } from "../../types";

export const AdminStatusFilter = () => {
  const { params, setStatus } = useAdminCourseCatalogParams();
  const value = params.status ?? ADMIN_STATUS_FILTER_ALL_VALUE;

  const handleValueChange = (nextValue: string): void => {
    setStatus(
      nextValue === ADMIN_STATUS_FILTER_ALL_VALUE
        ? undefined
        : (nextValue as CourseStatus),
    );
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger aria-label="Filter by status" className="w-full sm:w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ADMIN_STATUS_FILTER_ALL_VALUE}>
          All statuses
        </SelectItem>
        {COURSE_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {capitalize(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
