
import { useState } from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/Search";
import DisplayClientsCard from "../components/DisplayClientsCard";


export default function Clients() {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </aside>
      <main className="flex-1 p-4 md:ml-4">
        <h1 className="text-2xl font-bold mb-4">Clients</h1>
        <SearchBar setSearchFilter={setSearchFilter} />
        <DisplayClientsCard searchFilter={searchFilter} />
      </main>
    </div>
  );
}
