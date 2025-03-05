import { useEffect, useState } from "react";
import DisplayCards from "../components/DisplayCards";
import Navigation from "../components/Navigation";
import SearchBar from "../components/Search";
import { NavLink } from "react-router-dom";
import { GET_ALL_PROJECTS_QUERY } from "../graphql-queries/projects";
import { CardVariant } from "../components/Cards";
import { GET_ALL_DELIVERABLES_QUERY } from "../graphql-queries/deliverables";

interface SectionProps {
  title: string;
  variant: CardVariant;
  type: "project" | "deliverable" | "task";
  searchFilter: string;
  showMore?: boolean;
  className?: string;
}

const chooseQuery = (type: CardVariant) => {
  switch (type) {
    case "projects":
      return GET_ALL_PROJECTS_QUERY;
    case "deliverables":
      return GET_ALL_DELIVERABLES_QUERY;
    default:
      return GET_ALL_PROJECTS_QUERY;
  }
};

const Section: React.FC<SectionProps> = ({
  title,
  variant,
  type,
  searchFilter,
  showMore = false,
  className,
}) => {
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const updateLimit = () => {
      if (window.innerWidth < 1300) {
        setLimit(4);
      } else {
        setLimit(5);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, []);
  return (
    <section className={`flex flex-col gap-4 md:gap-4 ${className || ""}`}>
      <article className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showMore && (
          <NavLink
            className="bg-midorange rounded-lg px-10 py-2 text-white text-base text-center"
            to="../projects"
          >
            Voir plus
          </NavLink>
        )}
      </article>
      <DisplayCards
        query={chooseQuery(variant)}
        type="company"
        variant={variant}
        searchFilter={searchFilter}
        cardType={type}
        limit={limit}
      />
    </section>
  );
};

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
          type="deliverable"
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
