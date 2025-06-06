import { useGetProjectsByUserQuery } from "@generated/graphql-types";
import ErrorBanner from "@molecules/ErrorBanner";
import DisplayCards from "@organisms/DisplayCards";
import SearchBar from "@organisms/Search";
import { useState } from "react";
import { Card } from "@organisms/Cards";
import { NavLink } from "react-router-dom";
import ArrowIcon from "@icons/Arrow";
import SignedInLayout from "@layout/SignedInLayout";
import FilterIcon from "@icons/FilterIcon";
import { useAuth } from "@context/authContext";
export default function Projects() {
  const [searchFilter, setSearchFilter] = useState("");
  const { authUserData } = useAuth(); // 👈 Récupère le user et le rôle
  const allowedRoles = ["ADMIN", "CLIENT"];

  // Refetch à chaque navigation (pour que la liste soit toujours à jour)
  const { data, loading, error } = useGetProjectsByUserQuery({});

  // ⚡ Contrôle du rôle utilisateur (instantané, sans attendre la query)
  if (!authUserData?.role || !allowedRoles.includes(authUserData.role)) {
    return <ErrorBanner message="Unauthorized user!" />;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorBanner message={error.message} />;

  const projects = data?.getProjectsByUser ?? [];
  if (projects.length === 0)
    return <ErrorBanner message="No projects found!" />;

  return (
    <SignedInLayout>
      <section className="flex flex-row justify-between items-center pr-5">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button type="button">
          <FilterIcon className="h-4 fill-black hover:fill-theme-dark" />
        </button>
      </section>

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
                      ? `/projects/${project.projectName?.toLowerCase()}-${
                          project.id
                        }`
                      : "/error"
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
