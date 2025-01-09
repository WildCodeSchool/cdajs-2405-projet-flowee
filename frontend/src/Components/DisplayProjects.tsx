import { useQuery } from "@apollo/client";
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

const DisplayProjects = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.getAllProjects.map((project: Project) => (
        <div
          key={project.id}
          className="bg-cover bg-center text-black p-4 rounded shadow-lg"
        >
          <h3 className="text-xl font-bold">{project.name}</h3>
          <p className="mt-2">{project.description}</p>
          <p className="mt-2">
            {project.startDate} - {project.endDate}
          </p>
          <p className="mt-2">Status: {project.status}</p>
          <p className="mt-2">Author: {project.author}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayProjects;
