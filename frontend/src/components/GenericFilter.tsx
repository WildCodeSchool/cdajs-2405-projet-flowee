import type { ClientStatus } from "../__generated__/graphql-types";

export type SortOrder = "NONE" | "AZ" | "ZA";

interface GenericFilterProps {
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  statusValue: ClientStatus | "ALL";
  onStatusChange: (status: ClientStatus | "ALL") => void;
}

export default function GenericFilter({
  sortOrder,
  onSortOrderChange,
  statusValue,
  onStatusChange,
}: GenericFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 mb-4">
      {/* Sorting zone*/}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="sortSelect" className="text-sm  md:flex-row flex mr-2 font-medium">
          Sort
        </label>
        <select
          id="sortSelect"
          className="border border-theme-gray rounded px-3 py-0 text-sm w-[200px] h-[32px]"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
        >
          <option value="NONE">None</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
      </div>

      {/* Filter by status */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="statusSelect" className="text-sm font-medium block mr-2">
          Status
        </label>
        <select
          id="statusSelect"
          className="border border-theme-gray rounded px-3 py-0 text-sm w-[200px] h-[32px]"
          value={statusValue}
          onChange={(e) => onStatusChange(e.target.value as ClientStatus | "ALL")}
        >
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>
    </div>
  );
}
