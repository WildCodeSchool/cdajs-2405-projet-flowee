import { useRoleTheme } from "@context/roleThemeContext";
import SignedInLayout from "@layout/SignedInLayout";
import SearchBar from "@organisms/Search";
import { Section } from "@organisms/Section";
import Tracker from "@organisms/Tracker";
import { useState } from "react";

export default function Dashboard() {
  const [searchFilter, setSearchFilter] = useState("");

  const role = useRoleTheme();
  if (!role) return null;

  return (
    <SignedInLayout>
      <Tracker />
      <SearchBar setSearchFilter={setSearchFilter} />

      <Section
        title="Projects"
        type="projects"
        variant="projects"
        searchFilter={searchFilter}
        showMore
      />
      <Section
        title="Deliverables"
        type="deliverable"
        variant="deliverables"
        searchFilter={searchFilter}
      />
      {role === "admin" && (
        <Section
          title="Tasks"
          type="task"
          variant="tasks"
          searchFilter={searchFilter}
        />
      )}
    </SignedInLayout>
  );
}
