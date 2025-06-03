import { useState, useEffect } from "react";
import type { CardVariant } from "./Cards";
import { Card } from "./Cards";
import DisplayCards from "./DisplayCards";
import Button from "@atoms/Button";
import { useGetProjectsByUserQuery } from "@generated/graphql-types";
import type { Deliverable, Project, Task } from "@generated/graphql-types";

import { useRoleTheme } from "@context/roleThemeContext";
import ArrowIcon from "@icons/Arrow";
import { NavLink } from "react-router-dom";
import ItemDetails from "@pages/ItemDetails";
export interface SectionProps {
  title: string;
  variant: CardVariant;
  type: "projects" | "deliverable" | "task";
  searchFilter: string;
  showMore?: boolean;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  variant,
  type,
  searchFilter,
  showMore = false,
  className,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<
    "deliverable" | "task" | null
  >(null);
  const role = useRoleTheme();
  const isAdmin = role === "admin";
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const updateLimit = () => {
      if (window.innerWidth <= 768) {
        setLimit(2);
      } else if (window.innerWidth <= 1320) {
        setLimit(4);
      } else {
        setLimit(5);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);
  if (!role) return null;

  const { data, loading, error } = useGetProjectsByUserQuery();
  const projects = data?.getProjectsByUser ?? [];
  let items: (Project | Deliverable | Task)[] = [];

  function getItemPath(item: Project | Deliverable | Task): string {
    if (item.__typename === "Project") {
      return `/projects/${item.projectName?.toLowerCase()}-${item.id}`;
    }

    return "/";
  }

  switch (variant) {
    case "projects":
      items = projects;

      break;
    case "deliverables":
      items = projects.flatMap((project) => project.deliverables ?? []);
      break;
    case "tasks":
      items = isAdmin
        ? projects.flatMap(
            (project) =>
              project.deliverables?.flatMap((d) => d.tasks ?? []) ?? []
          )
        : [];
      break;
  }

  return (
    <section className={`flex flex-col gap-4 ${className || ""}`}>
      <article className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showMore && <Button label="See More" role={role} to={`/${type}`} />}
      </article>

      <DisplayCards
        items={items}
        loading={loading}
        error={error}
        variant={variant}
        searchFilter={searchFilter}
        limit={limit}
        renderItem={(item) => {
          const isProject = item.__typename === "Project";

          const handleOpen = () => {
            if (item.__typename === "Deliverable") {
              setSelectedItemType("deliverable");
              setSelectedItemId(Number(item.id));
            }
            if (item.__typename === "Task") {
              setSelectedItemType("task");
              setSelectedItemId(Number(item.id));
            }
          };
          return (
            <Card key={item.id} variant={variant}>
              <h3 className="font-semibold text-xl">
                {"projectName" in item ? item.projectName : item.name}
              </h3>

              <section className="flex flex-row justify-between">
                <p className="text-sm">
                  {"endDate" in item && item.endDate
                    ? new Date(item.endDate).toLocaleDateString("fr-FR")
                    : ""}
                </p>

                {isProject ? (
                  <NavLink
                    to={getItemPath(item)}
                    className="flex items-center justify-center w-12 h-12 md:w-8 md:h-8 bg-theme-btnBG rounded-full hover:bg-orangelight"
                  >
                    <ArrowIcon />
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={handleOpen}
                    className="flex items-center justify-center w-12 h-12 md:w-8 md:h-8 bg-theme-btnBG rounded-full hover:bg-orangelight"
                  >
                    <ArrowIcon />
                  </button>
                )}
              </section>
            </Card>
          );
        }}
      />
      {selectedItemId && selectedItemType && (
        <ItemDetails
          id={selectedItemId}
          type={selectedItemType}
          onClose={() => {
            setSelectedItemId(null);
            setSelectedItemType(null);
          }}
        />
      )}
    </section>
  );
};
