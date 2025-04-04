import { useState } from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/Search";
import Tracker from "../components/tracker";
import { Section } from "../organisms/Section";
import { useAuth } from "../context/authContext";

export default function Dashboard() {
  const [searchFilter, setSearchFilter] = useState("");
  const { authUserData } = useAuth();

  if (!authUserData?.role) return null;

  return (
    <div className="flex flex-col mt-4 md:flex-row h-full overflow-hidden">
      <aside className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </aside>

      <main className="flex-1 px-4 md:ml-4 h-full overflow-hidden w-full flex-col font-quicksand gap-6 flex">
        <Tracker />
        <SearchBar setSearchFilter={setSearchFilter} />

        <Section
          title="Projects"
          type="project"
          variant="projects"
          searchFilter={searchFilter}
          showMore
        />

        <Section
          title="Deliverables"
          type="deliverable"
          variant="deliverables"
          searchFilter={searchFilter}
          showMore
        />

        {authUserData.role === "ADMIN" && (
          <Section
            title="Tasks"
            type="task"
            variant="tasks"
            searchFilter={searchFilter}
            showMore
          />
        )}
      </main>
    </div>
  );
}
