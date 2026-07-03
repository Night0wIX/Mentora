"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { useAdminCourseCatalogParams } from "../../hooks/use-admin-course-catalog-params";
import {
  SORT_OPTIONS,
  SORT_OPTIONS_BY_VALUE,
  type SortOptionValue,
  toSortOptionValue,
} from "../catalog-sort/catalog-sort.constants";

export const AdminCatalogSort = () => {
  const { params, setSort } = useAdminCourseCatalogParams();
  const currentValue = toSortOptionValue(params.sort, params.order);

  const handleValueChange = (value: string): void => {
    const option = SORT_OPTIONS_BY_VALUE.get(value as SortOptionValue);
    if (!option) return;
    setSort(option.sort, option.order);
  };

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger aria-label="Sort courses" className="w-full sm:w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
