import { useGetProjectsByUserQuery } from "@generated/graphql-types";
import { ProjectStatus } from "@generated/graphql-types";
import ErrorBanner from "@molecules/ErrorBanner";
import DisplayCards from "@organisms/DisplayCards";
import SearchBar from "@organisms/Search";
import { useMemo, useState } from "react";
import { Card } from "@organisms/Cards";
import { NavLink } from "react-router-dom";
import ArrowIcon from "@components/atoms/Icons/Arrow";
import SignedInLayout from "@layout/SignedInLayout";
import FilterIcon from "@components/atoms/Icons/FilterIcon";
import { useAuth } from "@context/authContext";
import UnauthorizedAccess from "./UnauthorizedAcess";
import Filters from "@components/molecules/Filters";
import type { SortOrder, FilterOption } from "@components/molecules/Filters";
import { useLocation } from "react-router-dom";
export default function Projects() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [sort, setSort] = useState<SortOrder>("DATE_ASC");
  const [status, setStatus] = useState<ProjectStatus | "All">("All");

  const { authUserData } = useAuth();
  const location = useLocation();
  const { data, loading, error } = useGetProjectsByUserQuery({});

  const allowedRoles = ["ADMIN", "CLIENT"];
  const today = useMemo(() => new Date(), []);

  const isLateFilter = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("filter") === "late";
  }, [location.search]);

  if (!authUserData?.role || !allowedRoles.includes(authUserData.role)) {
    return <UnauthorizedAccess />;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorBanner message={error.message} />;
  const projectFilterOptions: FilterOption<ProjectStatus | "All">[] = [
    { label: "All", value: "All" },
    { label: "Not started", value: ProjectStatus.NotStarted },
    { label: "In progress", value: ProjectStatus.InProgress },
    { label: "Completed", value: ProjectStatus.Completed },
    { label: "Blocked", value: ProjectStatus.Blocked },
    { label: "Pending", value: ProjectStatus.Pending },
  ];
  const sortOptions: FilterOption<SortOrder>[] = [
    { label: "None", value: "NONE" },
    { label: "A-Z", value: "AZ" },
    { label: "Z-A", value: "ZA" },
    { label: "Closest deadline", value: "DATE_ASC" },
    { label: "Furthest deadline", value: "DATE_DESC" },
  ];

  const projects = data?.getProjectsByUser ?? [];
  const filteredProjects = projects
    .filter((project) => {
      if (isLateFilter) {
        const endDate = project.endDate ? new Date(project.endDate) : null;
        if (!endDate || endDate > today || project.status === "COMPLETED") {
          return false;
        }
      }
      if (status !== "All" && project.status !== status) return false;
      if (
        searchFilter.trim() !== "" &&
        !project.projectName.toLowerCase().includes(searchFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "AZ") return a.projectName.localeCompare(b.projectName);
      if (sort === "ZA") return b.projectName.localeCompare(a.projectName);
      if (sort === "DATE_ASC") {
        const dateA = a.endDate
          ? new Date(a.endDate).getTime()
          : Number.POSITIVE_INFINITY;
        const dateB = b.endDate
          ? new Date(b.endDate).getTime()
          : Number.POSITIVE_INFINITY;
        return dateA - dateB;
      }
      if (sort === "DATE_DESC") {
        const dateA = a.endDate
          ? new Date(a.endDate).getTime()
          : Number.NEGATIVE_INFINITY;
        const dateB = b.endDate
          ? new Date(b.endDate).getTime()
          : Number.NEGATIVE_INFINITY;
        return dateB - dateA;
      }
      return 0;
    });

  if (projects.length === 0)
    return <ErrorBanner message="No projects found!" />;

  return (
    <SignedInLayout>
      <section className="flex flex-row justify-between items-center pr-5">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button
          type="button"
          onClick={() => {
            setShowFilters(!showFilters);
          }}
        >
          <FilterIcon className="h-4 fill-black hover:fill-theme-dark" />
        </button>
      </section>
      <Filters
        show={showFilters}
        sortOrder={sort}
        onSortOrderChange={setSort}
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={projectFilterOptions}
        sortOptions={sortOptions}
      />
      <SearchBar setSearchFilter={setSearchFilter} />
      <div className="flex flex-col md:flex-row h-screen flex-wrap">
        <DisplayCards
          limit={5}
          items={filteredProjects}
          loading={loading}
          variant="projects"
          searchFilter={searchFilter}
          renderItem={(project) => (
            <Card key={project.id} variant="projects">
              <h3 className="font-semibold text-xl">
                {"projectName" in project ? project.projectName : ""}
              </h3>
              <section className="flex flex-row justify-between">
                <p className="text-sm">
                  {"endDate" in project && project.endDate
                    ? new Date(project.endDate).toLocaleDateString("fr-FR")
                    : ""}
                </p>

                <NavLink
                  to={
                    "projectName" in project
                      ? `/projects/${project.projectName?.toLowerCase()}-${
                          project.id
                        }`
                      : "/error"
                  }
                  className="flex items-center justify-center w-12 h-12 md:w-8 md:h-8 bg-theme-btnBG rounded-full hover:bg-orangelight "
                >
                  <ArrowIcon className="text-white" />
                </NavLink>
              </section>
            </Card>
          )}
        />
      </div>
    </SignedInLayout>
  );
}
