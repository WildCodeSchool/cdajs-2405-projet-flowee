import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { Card } from "./Cards";
import { CardType, CardVariant } from "./Cards";
import ArrowIcon from "./icons/Arrow";
import { GET_ALL_PROJECTS_QUERY } from "../graphql-queries/projects";

type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  author: string;
};

interface DisplayProjectsProps {
  variant: CardVariant;
  type: CardType;
}

const DisplayProjects = ({ variant, type }: DisplayProjectsProps) => {
  const { loading, error, data } = useQuery(GET_ALL_PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);
  return (
    <div className="flex flex-row gap-4 h-full">
      {data.getAllProjects.slice(0, 3).map((project: Project) => (
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
