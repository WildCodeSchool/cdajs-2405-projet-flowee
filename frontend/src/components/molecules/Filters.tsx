export type SortOrder = "NONE" | "AZ" | "ZA";

export interface FilterOption<T> {
  label: string;
  value: T;
}

export interface FilterBarProps<T extends string> {
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  filterValue: T;
  onFilterChange: (value: T) => void;
  filterOptions: FilterOption<T>[];
  label?: string;
  show?: boolean;
}
export default function FilterBar<T extends string>({
  sortOrder,
  onSortOrderChange,
  filterValue,
  onFilterChange,
  filterOptions,
  label = "Status",
  show = false,
}: FilterBarProps<T>) {
  if (!show) return null;
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="sortSelect" className="mr-2 font-semibold">
          Sort
        </label>
        <select
          id="sortSelect"
          className="border border-theme-gray hover:border-theme-darkGray rounded px-3 py-0 text-sm w-[200px] h-[32px]"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
        >
          <option value="NONE">None</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor="filterSelect" className="mr-2 font-semibold">
          {label}
        </label>
        <select
          id="filterSelect"
          className="border border-theme-gray hover:border-theme-darkGray rounded px-3 py-0 text-sm w-[200px] h-[32px]"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value as T)}
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
