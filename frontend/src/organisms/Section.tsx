import { useState, useEffect } from "react";
import { Card, CardVariant } from "../components/Cards";
import DisplayCards from "../components/DisplayCards";
import Button from "../atoms/Button";
import {
  useGetProjectsByUserQuery,
  Deliverable,
  Project,
  Task,
} from "../__generated__/graphql-types";
import { useRoleTheme } from "../context/roleThemeContext";
import ArrowIcon from "../atoms/Icons/Arrow";
import { NavLink } from "react-router-dom";
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
  const role = useRoleTheme();
  const isAdmin = role === "admin";
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const updateLimit = () => {
      setLimit(window.innerWidth <= 1320 ? 4 : 5);
      setLimit(window.innerWidth <= 768 ? 2 : limit);
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  if (!role) return null;

  const { data, loading, error } = useGetProjectsByUserQuery();
  const projects = data?.getProjectsByUser ?? [];
  let items: (Project | Deliverable | Task)[] = [];

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
        renderItem={(item) => (
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

              <NavLink
                to={
                  "projectName" in item
                    ? `/${item.projectName?.toLowerCase()}-${item.id}`
                    : `/${item.name?.toLowerCase()}-${item.id}`
                }
                className="flex items-center justify-center w-12 h-12 md:w-8 md:h-8 bg-theme-btnBG rounded-full hover:bg-orangelight "
              >
                <ArrowIcon />
              </NavLink>
            </section>
          </Card>
        )}
      />
    </section>
  );
};
