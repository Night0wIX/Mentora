import { CatalogSearch } from "../catalog-search";
import { CatalogSort } from "../catalog-sort";

export const CatalogControls = () => {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <CatalogSearch />
      <CatalogSort />
    </div>
  );
};
