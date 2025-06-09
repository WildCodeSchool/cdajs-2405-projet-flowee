import type { FormData } from "@interfaces/FormData";
import {
  useCreateDeliverableMutation,
  useCreateTaskMutation,
  useGetProjectByIdQuery,
  useDeleteDeliverableMutation,
  useDeleteTaskMutation,
  DeliverableStatus,
  TaskStatus,
} from "@generated/graphql-types";
import SignedInLayout from "@layout/SignedInLayout";
import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

import DeleteModal from "@components/molecules/DeleteModal";
import AddModal from "@components/molecules/AddModal";

import ProjectHeader from "./ProjectHeader";
import ProjectSections from "./ProjectSections";

import { parseIdFromSlug, getProjectOptions } from "@utils/project";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const id = parseIdFromSlug(slug);

  const { data, refetch } = useGetProjectByIdQuery({
    skip: id === null,
    variables: { id: id ?? 0 },

    onError: (error) => {
      console.error("Error fetching project details:", error);
    },
  });

  //ADD Modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"deliverable" | "task">(
    "deliverable",
  );
  const [createDeliverableMutation] = useCreateDeliverableMutation();
  const [createTaskMutation] = useCreateTaskMutation();

  const handleSubmit = async (formData: FormData) => {
    try {
      if (formData.type === "deliverable") {
        const { name, perimeter, deadline, projectId, status } = formData;
        await createDeliverableMutation({
          variables: {
            newDeliverable: {
              name,
              perimeter,
              deliveryDate: deadline,
              projectId,
              status: status ?? DeliverableStatus.NotStarted,
            },
          },
        });
      } else if (formData.type === "task") {
        const { name, description, deadline, deliverableId, status } = formData;
        await createTaskMutation({
          variables: {
            newTask: {
              name,
              description,
              endDate: deadline,
              deliverableId,
              status: status ?? TaskStatus.NotStarted,
            },
          },
        });
      }

      refetch();
    } catch (error) {
      console.error("Erreur de création :", error);
    } finally {
      setShowModal(false);
    }
  };

  const project = data?.getProjectById;
  const availableProjects = getProjectOptions(project).map((p) => ({
    id: String(p.id),
    name: p.name,
  }));

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
    name: string,
  ) => {
    setModalState({ open: true, entity, id, name });
  };

  const confirmDelete = async () => {
    const { entity, id } = modalState;
    if (!id || !entity) return;

    try {
      if (entity === "task") {
        await deleteTaskMutation({ variables: { id } });
      } else {
        await deleteDeliverableMutation({ variables: { id } });
      }

      setModalState({ open: false, entity: null, id: null, name: "" });
      refetch();
    } catch (err) {
      console.error("Can't delete :", err);
    }
  };

  return (
    <SignedInLayout>
      <NavLink to={"/projects"}>Back to projects</NavLink>
      <ProjectHeader
        name={project?.projectName ?? ""}
        endDate={project?.endDate ?? ""}
        clientName={project?.client.clientName ?? ""}
        description={project?.description ?? ""}
      />
      {project && (
        <ProjectSections
          project={project}
          slug={slug ?? ""}
          deliverables={deliverables}
          setShowModal={setShowModal}
          setModalType={setModalType}
          openDeleteModal={openDeleteModal}
        />
      )}

      <DeleteModal
        open={modalState.open}
        entityType={modalState.entity ?? "task"}
        itemName={modalState.name}
        onConfirm={confirmDelete}
        onCancel={() =>
          setModalState({ open: false, entity: null, id: null, name: "" })
        }
      />

      <AddModal
        mode={modalType}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        projectOptions={availableProjects}
        deliverableOptions={deliverables.map((d) => ({
          id: d.id,
          name: d.name,
        }))}
      />

      <Outlet />
    </SignedInLayout>
  );
};
export default ProjectDetails;
