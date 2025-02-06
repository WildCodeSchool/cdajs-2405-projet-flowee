import { useState } from "react";
import DisplayCards from "../components/DisplayCards";
import Navigation from "../components/Navigation";
import SearchBar from "../components/Search";
import { NavLink } from "react-router-dom";
import { GET_ALL_PROJECTS_QUERY } from "../graphql-queries/projects";
import { CardType, CardVariant } from "../components/Cards";

interface SectionProps {
  title: string;
  variant: CardVariant;
  type: "project" | "deliverable" | "task";
  searchFilter: string;
  showMore?: boolean;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  variant,
  type,
  searchFilter,
  showMore = false,
  className,
}) => (
  <section className={`flex flex-col gap-4 md:gap-4 ${className || ""}`}>
    <article className="flex justify-between items-center ">
      <h2 className="text-2xl font-bold">{title}</h2>
      {showMore && <NavLink to={variant}>Voir plus</NavLink>}
    </article>
    <DisplayCards
      query={GET_ALL_PROJECTS_QUERY}
      type="company"
      variant={variant}
      searchFilter={searchFilter}
      cardType={type}
      limit={4}
    />
  </section>
);

export default function Dashboard() {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="flex flex-col mt-4  md:flex-row h-full overflow-hidden">
      <aside className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </aside>
      <main className="flex-1 px-4 md:ml-4 h-full overflow-hidden w-full flex-col font-quicksand gap-6 flex">
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
          type="project" //will have to change this to deliverable
          variant="deliverables"
          searchFilter={searchFilter}
          className="hidden md:flex"
        />
        <Section
          title="Tasks"
          type="project" //will have to change this to task
          variant="tasks"
          searchFilter={searchFilter}
          className="hidden md:flex"
        />
      </main>
    </div>
  );
}
