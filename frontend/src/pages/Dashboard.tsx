import { useState } from "react";
import DisplayCards from "../components/DisplayCards";
import Navigation from "../components/Navigation";
import SearchBar from "../components/Search";

export default function Dashboard() {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="flex flex-col mt-4  md:flex-row h-full overflow-hidden">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 px-4 md:ml-4 h-full overflow-hidden w-full">
        <SearchBar setSearchFilter={setSearchFilter} />
        <DisplayCards
          type="company"
          variant="projects"
          searchFilter={searchFilter}
          limit={5}
        />
      </div>
    </div>
  );
}
