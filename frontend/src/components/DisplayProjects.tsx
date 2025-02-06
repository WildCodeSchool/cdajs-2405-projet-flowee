import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { Card } from "./Cards";
import type { CardType, CardVariant } from "./Cards";
import ArrowIcon from "./Icons/Arrow";
import { GET_ALL_PROJECTS_QUERY } from "../graphql-queries/projects";

type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  author: string;
  client: {
    firstname: string;
    lastname: string;
  };
};

interface DisplayProjectsProps {
  variant: CardVariant;
  type: CardType;
  searchFilter: string;
  limit?: number;
}

const DisplayProjects = ({
  variant,
  type,
  searchFilter,
  limit,
}: DisplayProjectsProps) => {
  const { loading, error, data } = useQuery(GET_ALL_PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  //Filter names of projects
  const getFilteredProjects = () => {
    if (searchFilter) {
      return data.getAllProjects.filter((project: Project) => {
        const projectName = project.name.toLowerCase();
        const clientFirstName = project.client?.firstname?.toLowerCase() || "";
        const clientLastName = project.client?.lastname?.toLowerCase() || "";
        const search = searchFilter.toLowerCase();

        return (
          projectName.includes(search) ||
          clientFirstName.includes(search) ||
          clientLastName.includes(search)
        );
      });
    }
    return data.getAllProjects;
  };
  const projects = getFilteredProjects();

  return (
    <div className="flex flex-row gap-4 h-full">
      {projects.slice(0, limit || projects.length).map((project: Project) => (
        <Card key={project.id} type={type} variant={variant}>
          <h3 className="text-xl font-bold">{project.name}</h3>
          <aside className="flex justify-between items-center">
            <p className="mt-2">{project.endDate}</p>
            <NavLink to={"project"} className="bg-orangebase p-2 rounded-full">
              <ArrowIcon />
            </NavLink>
          </aside>
        </Card>
      ))}
    </div>
  );
};

export default DisplayProjects;
