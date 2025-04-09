import { useState } from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/Search";
import DisplayClientsCard from "../components/DisplayClientsCard";
import GenericFilter, { type SortOrder } from "../components/GenericFilter";
import type { ClientStatus } from "../__generated__/graphql-types";

export default function Clients() {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("NONE");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "ALL">("ALL");

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </aside>
      <main className="flex-1 p-4 md:ml-4">
        <h1 className="text-2xl font-bold mb-4">Clients</h1>
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
      </main>
    </div>
  );
}
