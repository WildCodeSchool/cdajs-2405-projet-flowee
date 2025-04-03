import { Link } from "react-router-dom";
import { useGetProjectsByUserQuery } from "../__generated__/graphql-types";
import { useAuth } from "../context/authcontext";

export default function Test() {
  const { authUserData } = useAuth();
  console.info("dataAuth", authUserData);

  const { data, loading, error } = useGetProjectsByUserQuery({
    onCompleted: (data) => {
      console.info("Projets récupérés :", data);
    },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      {data?.getProjectsByUser?.map((project) => (
        <h1 key={project.id}>{project.projectName}</h1>
      ))}
      <Link to="/dashboard">dashboard</Link>
    </>
  );
}
