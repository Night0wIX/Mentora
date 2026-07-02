"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { useCourseCatalogParams } from "../../hooks/use-course-catalog-params";
import {
  SORT_OPTIONS,
  SORT_OPTIONS_BY_VALUE,
  type SortOptionValue,
  toSortOptionValue,
} from "./catalog-sort.constants";

export function CatalogSort() {
  const { params, setSort } = useCourseCatalogParams();
  const currentValue = toSortOptionValue(params.sort, params.order);

  function handleValueChange(value: string): void {
    const option = SORT_OPTIONS_BY_VALUE.get(value as SortOptionValue);
    if (!option) return;

    setSort(option.sort, option.order);
  }
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
}
