import { useQuery } from "@apollo/client";
import { GET_ALL_PROJECTS_QUERY } from "../graphql-queries/projects";
import { Card, CardType, CardVariant } from "./Cards";
import { NavLink } from "react-router-dom";
import ArrowIcon from "./icons/Arrow";
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h=full mb-5">
      {data.getAllProjects.slice(0, 3).map((project: Project) => (
        // <div
        //   key={project.id}
        //   className="bg-cover bg-center text-black p-4 rounded shadow-lg"
        //   style={{
        //     // backgroundImage: `url(${project.image || "default-image.jpg"})`,
        //   }}
        // >
        //   <h3 className="text-xl font-bold">{project.name}</h3>
        //   <p className="mt-2">{project.description}</p>
        //   <p className="mt-2">
        //     {project.startDate} - {project.endDate}
        //   </p>
        //   <p className="mt-2">Status: {project.status}</p>
        //   <p className="mt-2">Author: {project.author}</p>
        // </div>

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
