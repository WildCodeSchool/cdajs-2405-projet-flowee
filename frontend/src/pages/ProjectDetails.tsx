import FilterIcon from "@components/atoms/Icons/FilterIcon";
import PlusIcon from "@components/atoms/Icons/PlusIcon";
import { Tag } from "@components/atoms/Tag";
import SearchBar from "@components/organisms/Search";
import { useGetProjectByIdQuery } from "@generated/graphql-types";
import SignedInLayout from "@layout/SignedInLayout";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DeliverablesByStatus } from "@components/organisms/DeliverablesByStatus";

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
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <SignedInLayout>
      <NavLink to={"/projects"}>Back to projects</NavLink>
      <section className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">{project?.projectName}</h1>
        <p className="font-semibold">{project?.endDate}</p>
      </section>
      <section className="flex gap-4">
        <Tag text={project?.client.clientName ?? ""} />
      </section>
      <section>
        <h3 className="text-lg font-semibold">About the project</h3>
        <p>{project?.description}</p>
      </section>
      <section className="flex gap-4 w-full">
        <section className="flex flex-col gap-4 w-full">
          <aside className="flex justify-between items-center bg-theme-veryLight p-2 rounded-sm font-bold ">
            <h2>Deliverables</h2>
            <div className="flex gap-4 items-center">
              <FilterIcon className="fill-theme-darkGray " />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-theme-darkGray rounded-full">
                <PlusIcon className="fill-theme-darkGray w-3 h-3" />
              </span>
            </div>
          </aside>
          <SearchBar setSearchFilter={setSearchFilter} />
          {project?.deliverables && (
            <DeliverablesByStatus deliverables={project.deliverables} />
          )}
        </section>

        <section className="flex flex-col gap-4 w-full">
          <aside className="flex justify-between items-center bg-theme-veryLight p-2 rounded-sm font-bold">
            <h2>Tasks</h2>
            <div className="flex gap-4 items-center">
              <FilterIcon className="fill-theme-darkGray " />
              <span className="flex items-center justify-center w-6 h-6 border-2 border-theme-darkGray rounded-full">
                <PlusIcon className="fill-theme-darkGray w-3 h-3" />
              </span>
            </div>
          </aside>
        </section>
      </section>
    </SignedInLayout>
  );
};
export default ProjectDetails;
