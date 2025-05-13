import FilterIcon from "@components/atoms/Icons/FilterIcon";
import PlusIcon from "@components/atoms/Icons/PlusIcon";

import { useGetProjectByIdQuery } from "@generated/graphql-types";
import { NavLink, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const rawId = slug?.split("-").pop();
  const parsedId = Number(rawId);
  const id = rawId && !Number.isNaN(parsedId) ? parsedId : null;

  const { data } = useGetProjectByIdQuery({
    skip: id === null,
    variables: { id: id ?? 0 },

    onCompleted: (data) => {
      console.info("Project details data:", data);
    },
    onError: (error) => {
      console.error("Error fetching project details:", error);
    },
  });

  const project = data?.getProjectById;

  return (
    <div>
      <NavLink to={"/projects"}>Back to projects</NavLink>
      <div>
        <h1>Project Details : {project?.projectName}</h1>
        <p>{project?.endDate}</p>

        <div>
          <h3>About the project</h3>
          <p>{project?.description}</p>
        </div>
      </div>
      {/* //deliverables */}
      <section>
        {/* //section header */}
        <div>
          <h2>Deliverables</h2>
          <FilterIcon />
          <PlusIcon />
        </div>
        {/* //searchbar //menu depliant */}
      </section>
      {/* //tasks */}
      <section>
        {/* //section header */}
        <div>
          <h2>Deliverables</h2>
          <FilterIcon />
          <PlusIcon />
        </div>
        {/* //searchbar //menu depliant */}
      </section>
      <p>{}</p>
    </div>
  );
};
export default ProjectDetails;
