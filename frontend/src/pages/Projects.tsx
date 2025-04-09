import {
  Project,
  useGetProjectsByUserQuery,
} from "../__generated__/graphql-types";
import ErrorBanner from "../molecules/ErrorBanner";
import DisplayCards from "../components/DisplayCards";
import SearchBar from "../components/Search";
import { useState } from "react";
import { Card } from "../components/Cards";
import { NavLink } from "react-router-dom";
import ArrowIcon from "../components/Icons/Arrow";
import SignedInLayout from "../layout/SignedInLayout";
export default function Projects() {
  const [searchFilter, setSearchFilter] = useState("");
  const role = useGetProjectsByUserQuery();
  if (!role) return <ErrorBanner message="Unauthorized user!" />;
  let projects: Project[] = [];
  const { data, loading } = useGetProjectsByUserQuery({});
  projects = data?.getProjectsByUser ?? [];
  if (projects.length === 0)
    return <ErrorBanner message="No projects found!" />;

  if (loading) return <p>Loading...</p>;

  return (
    <SignedInLayout>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <SearchBar setSearchFilter={setSearchFilter} />
      <div className="flex flex-col md:flex-row h-screen flex-wrap">
        <DisplayCards
          items={projects}
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
                      ? `/${project.projectName?.toLowerCase()}-${project.id}`
                      : `/${project.name?.toLowerCase()}-${project.id}`
                  }
                  className="flex items-center justify-center w-12 h-12 md:w-8 md:h-8 bg-theme-btnBG rounded-full hover:bg-orangelight "
                >
                  <ArrowIcon />
                </NavLink>
              </section>
            </Card>
          )}
        />
      </div>
    </SignedInLayout>
  );
}
