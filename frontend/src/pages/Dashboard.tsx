import { useState } from "react";
import DisplayProjects from "../components/DisplayProjects";
import Navigation from "../components/Navigation";
import SearchBar from "../components/Search";
// import SearchBar from "../components/Searchbar";

export default function Dashboard() {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="flex flex-col md:flex-row h-screen ">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 p-4 md:ml-6 md:mr-6">
        <SearchBar setSearchFilter={setSearchFilter} />
        <DisplayProjects
          type="company"
          variant="projects"
          searchFilter={searchFilter}
        />
      </div>
    </div>
  );
}
