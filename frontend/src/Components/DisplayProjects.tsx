import { useQuery } from "@apollo/client";
import { GET_ALL_PROJECTS_QUERY } from "../graphql-queries/projects";
const DisplayProjects = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);
  return (
    <div>
      {data.getAllProjects.map((project) => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>
            {project.startDate} - {project.endDate}
          </p>
          <p>Status: {project.status}</p>
          <p>Author: {project.author}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayProjects;
