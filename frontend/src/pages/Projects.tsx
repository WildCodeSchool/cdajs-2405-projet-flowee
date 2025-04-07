import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { useGetProjectsByUserQuery } from "../__generated__/graphql-types";

export default function Projects() {
  const { data, loading, error } = useGetProjectsByUserQuery({
    onCompleted: (data) => {
      console.info("Projets récupérés :", data);
    },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 px-4 md:ml-4 h-full overflow-auto">
        <h1>Welcome to the Projects Page</h1>
      </div>
      <div className="flex flex-col">
        {data?.getProjectsByUser?.map((project) => (
          <h1 key={project.id}>{project.projectName}</h1>
        ))}
        <Link to="/dashboard">dashboard</Link>
      </div>
    </div>
  );
}
