import FilterIcon from "@components/atoms/Icons/FilterIcon";
import PlusIcon from "@components/atoms/Icons/PlusIcon";
import { Tag } from "@components/atoms/Tag";
import SearchBar from "@components/organisms/Search";
import {
  useGetProjectByIdQuery,
  useDeleteDeliverableMutation,
  useDeleteTaskMutation,
} from "@generated/graphql-types";
import SignedInLayout from "@layout/SignedInLayout";
import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { DeliverablesByStatus } from "@components/organisms/DeliverablesByStatus";
import { TasksByDeliverable } from "@components/organisms/TasksByDeliverable";
import ModalConfirmDelete from "@components/molecules/ModalConfirmDelete";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const rawId = slug?.split("-").pop();
  const parsedId = Number(rawId);
  const id = rawId && !Number.isNaN(parsedId) ? parsedId : null;

  const { data, refetch } = useGetProjectByIdQuery({
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

  //DELIVERABLES
  const deliverables = project?.deliverables ?? [];
  const [deleteDeliverableMutation] = useDeleteDeliverableMutation();

  //TASKS
  const [deleteTaskMutation] = useDeleteTaskMutation();

  //MODAL
  const [modalState, setModalState] = useState<{
    open: boolean;
    entity: "task" | "deliverable" | null;
    id: number | null;
    name: string;
  }>({
    open: false,
    entity: null,
    id: null,
    name: "",
  });

  const openDeleteModal = (
    entity: "task" | "deliverable",
    id: number,
    name: string
  ) => {
    setModalState({ open: true, entity, id, name });
  };

  const confirmDelete = async () => {
    const { entity, id } = modalState;
    if (!id || !entity) return;

    try {
      if (entity === "task") {
        await deleteTaskMutation({ variables: { id } });
        console.info("Tâche supprimée");
      } else {
        await deleteDeliverableMutation({ variables: { id } });
        console.info("Livrable supprimé");
      }

      setModalState({ open: false, entity: null, id: null, name: "" });
      refetch();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  //SEARCHBAR
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
      <ModalConfirmDelete
        open={modalState.open}
        header={`Are you sure you want to delete this ${modalState.entity}?`}
        itemName={modalState.name}
        onConfirm={confirmDelete}
        onCancel={() =>
          setModalState({ open: false, entity: null, id: null, name: "" })
        }
      />
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
            <DeliverablesByStatus
              deliverables={project.deliverables}
              projectSlug={slug}
              onDelete={(id, name) => openDeleteModal("deliverable", id, name)}
            />
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
          <SearchBar setSearchFilter={setSearchFilter} />

          <section className="mb-4">
            <TasksByDeliverable
              deliverables={deliverables}
              projectSlug={slug}
              onDelete={(id, name) => openDeleteModal("task", id, name)}
            />
          </section>
        </section>
      </section>
      <Outlet />
    </SignedInLayout>
  );
};
export default ProjectDetails;
