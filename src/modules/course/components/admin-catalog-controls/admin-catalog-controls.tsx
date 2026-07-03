import { AdminCatalogSearch } from "../admin-catalog-search";
import { AdminCatalogSort } from "../admin-catalog-sort";
import { AdminStatusFilter } from "../admin-status-filter";

export const AdminCatalogControls = () => {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <AdminCatalogSearch />
      <div className="flex gap-2">
        <AdminStatusFilter />
        <AdminCatalogSort />
      </div>
    </div>
  );
};
