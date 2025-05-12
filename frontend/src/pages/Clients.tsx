import { useState } from "react";

import SearchBar from "@organisms/Search";
import DisplayClientsCard from "@organisms/DisplayClientsCard";
import GenericFilter, { type SortOrder } from "@molecules/GenericFilter";
import type { ClientStatus } from "@generated/graphql-types";

import SignedInLayout from "@layout/SignedInLayout";

export default function Clients() {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("NONE");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "ALL">("ALL");

  return (
    <SignedInLayout>
      <h1 className="text-2xl font-bold">Clients</h1>
      <GenericFilter
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <SearchBar setSearchFilter={setSearchFilter} />
      <DisplayClientsCard
        searchFilter={searchFilter}
        sortOrder={sortOrder}
        statusFilter={statusFilter}
      />
    </SignedInLayout>
  );
}
