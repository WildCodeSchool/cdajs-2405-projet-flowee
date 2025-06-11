import type {
  DeliverableFormData,
  FormData,
  TaskFormData,
} from "@interfaces/FormData";
import { useGetProjectByIdQuery } from "@generated/graphql-types";
import SignedInLayout from "@layout/SignedInLayout";
import { NavLink, Outlet, useParams } from "react-router-dom";
import DeleteModal from "@components/molecules/DeleteModal";
import AddModal from "@components/molecules/AddModal";
import ProjectHeader from "./ProjectHeader";
import ProjectSections from "./ProjectSections";
import { parseIdFromSlug, getProjectOptions } from "@utils/project";
import EditModal from "@components/molecules/EditModal";
import { useModalState } from "../../hooks/useModalState";
import { useProjectHandlers } from "../../hooks/useProjectHandlers";
import type { InitialValues } from "@interfaces/type";

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

  // States and modals

  const addModal = useModalState<FormData>();
  const editModal = useModalState<DeliverableFormData | TaskFormData>();
  const deleteModal = useModalState<{
    entity: "task" | "deliverable";
    id: number;
    name: string;
  }>();

  const { handleCreate, handleEdit, handleDelete } = useProjectHandlers(
    refetch,
    () => {
      addModal.closeModal();
      editModal.closeModal();
      deleteModal.closeModal();
    },
  );

  const project = data?.getProjectById;
  const deliverables = project?.deliverables ?? [];

  const availableProjects = getProjectOptions(project).map((p) => ({
    id: p.id,
    name: p.name,
  }));

  //initial values

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
          openAdd={() => addModal.openModal()}
          openEdit={(data) => editModal.openModal(data)}
          openDelete={(data) => deleteModal.openModal(data)}
        />
      )}

      <DeleteModal
        open={deleteModal.open}
        entityType={deleteModal.data?.entity ?? "task"}
        itemName={deleteModal.data?.name ?? ""}
        onConfirm={() => {
          if (deleteModal.data) {
            handleDelete(deleteModal.data.entity, deleteModal.data.id);
            deleteModal.closeModal();
          }
        }}
        onCancel={deleteModal.closeModal}
      />

      <AddModal
        mode={addModal.data?.type ?? "deliverable"}
        show={addModal.open}
        onClose={addModal.closeModal}
        onSubmit={handleCreate}
        projectOptions={availableProjects}
        deliverableOptions={deliverables.map((d) => ({
          id: d.id,
          name: d.name,
        }))}
      />

      <EditModal
        mode={editModal.data?.type ?? "deliverable"}
        show={editModal.open}
        onClose={editModal.closeModal}
        onSubmit={handleEdit}
        initialValues={editModal.data as InitialValues}
      />
      <Outlet />
    </SignedInLayout>
  );
};
export default ProjectDetails;
