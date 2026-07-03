import { Skeleton } from "@/shared/ui/skeleton";

import { ADMIN_COURSE_LIST_GRID_TEMPLATE } from "../../constants";

export const AdminCourseRowSkeleton = () => {
  return (
    <tr
      className={`flex flex-col gap-3 border-b border-border px-4 py-4 last:border-b-0 md:grid md:items-center md:gap-4 ${ADMIN_COURSE_LIST_GRID_TEMPLATE}`}
    >
      <th scope="row" className="min-w-0 space-y-2 text-left font-normal">
        <Skeleton shape="text" className="h-4 w-2/3 max-w-52" />
        <Skeleton shape="text" className="h-3 w-1/2 max-w-72" />
      </th>

      <td className="hidden justify-center md:flex">
        <Skeleton shape="circular" className="h-5 w-16" />
      </td>

      <td className="hidden justify-center md:flex">
        <Skeleton shape="text" className="h-3 w-20" />
      </td>

      <td className="flex justify-end gap-1 md:justify-center">
        <Skeleton shape="circular" className="h-8 w-8" />
        <Skeleton shape="circular" className="h-8 w-8" />
      </td>
    </tr>
  );
};
