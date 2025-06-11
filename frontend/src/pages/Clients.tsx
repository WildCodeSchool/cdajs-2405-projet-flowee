import { useState } from "react";

import SearchBar from "@organisms/Search";
import DisplayClientsCard from "@organisms/DisplayClientsCard";

import { ClientStatus } from "@generated/graphql-types";
import SignedInLayout from "@layout/SignedInLayout";
import FilterIcon from "@components/atoms/Icons/FilterIcon";
import Filters from "@components/molecules/Filters";
import type { SortOrder, FilterOption } from "@components/molecules/Filters";

export default function Clients() {
  const [searchFilter, setSearchFilter] = useState("");
  const [sort, setSort] = useState<SortOrder>("NONE");
  const [status, setStatus] = useState<ClientStatus | "All">("All");
  const [showFilters, setShowFilters] = useState(false);

  const clientFilterOptions: FilterOption<ClientStatus | "All">[] = [
    { label: "All", value: "All" },
    { label: "Active", value: ClientStatus.Active },
    { label: "Archived", value: ClientStatus.Archived },
    { label: "Inactive", value: ClientStatus.Inactive },
  ];

  return (
    <SignedInLayout>
      <section className="flex flex-row justify-between items-center pr-5">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button
          type="button"
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          <FilterIcon className="h-4 fill-black hover:fill-theme-dark" />
        </button>
      </section>
      <Filters
        show={showFilters}
        sortOrder={sort}
        onSortOrderChange={setSort}
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={clientFilterOptions}
      />
      <SearchBar setSearchFilter={setSearchFilter} />
      <DisplayClientsCard
        searchFilter={searchFilter}
        sortOrder={sort}
        statusFilter={status}
      />
    </SignedInLayout>
  );
}
