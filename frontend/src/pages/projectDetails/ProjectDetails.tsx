import type {
  DeliverableFormData,
  FormData,
  TaskFormData,
} from "@interfaces/FormData";
import { useGetProjectByIdQuery } from "@generated/graphql-types";
import SignedInLayout from "@layout/SignedInLayout";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import DeleteModal from "@components/molecules/DeleteModal";
import AddModal from "@components/molecules/AddModal";
import ProjectHeader from "./ProjectHeader";
import ProjectSections from "./ProjectSections";
import { parseIdFromSlug, getProjectOptions } from "@utils/project";
import EditModal from "@components/molecules/EditModal";
import { useModalState } from "../../hooks/useModalState";
import { useProjectHandlers } from "../../hooks/useProjectHandlers";
import type { InitialValues } from "@interfaces/type";
import ArrowIcon from "@components/atoms/Icons/Arrow";
import ProjectModal from "@components/molecules/ProjectModal";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const id = parseIdFromSlug(slug);

  const { data, refetch } = useGetProjectByIdQuery({
    skip: id === null,
    variables: { id: id ?? 0 },

    onError: (error) => {
      console.error("Error fetching project details:", error);
    },
  });

  const handleEditProject = async (newName: string) => {
    console.info("Editing project with new name:", newName);
    // if (!project) return;
    // // mutation GraphQL ici
    // await updateProjectMutation({
    //   variables: { id: project.id, name: newName },
    // });
    // await refetch();
  };

  const handleDeleteProject = async (id: number) => {
    console.info("Deleting project with ID:", id);
    // if (!project) return;
    // await deleteProjectMutation({
    //   variables: { id: project.id },
    // });
    // navigate("/projects");
  };

  // States and modals

  const addModal = useModalState<FormData>();
  const editModal = useModalState<DeliverableFormData | TaskFormData>();
  const deleteModal = useModalState<{
    entity: "task" | "deliverable";
    id: number;
    name: string;
  }>();
  const projectModal = useModalState<{
    type: "edit" | "delete";
    name: string;
  }>();
  const deleteProjectModal = useModalState<{ id: number; name: string }>();

  const { handleCreate, handleEdit, handleDelete } = useProjectHandlers(
    refetch,
    () => {
      addModal.closeModal();
      editModal.closeModal();
      deleteModal.closeModal();
      projectModal.closeModal();
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
      <NavLink to="/projects" className="flex gap-4 items-center">
        <ArrowIcon className="text-black rotate-180" />
        <p className="underline">Back to projects</p>{" "}
      </NavLink>
      <ProjectHeader
        name={project?.projectName ?? ""}
        endDate={project?.endDate ?? ""}
        clientName={project?.client.clientName ?? ""}
        description={project?.description ?? ""}
        status={project?.status ?? "NOT_STARTED"}
        onEditProject={() =>
          projectModal.openModal({
            type: "edit",
            name: project?.projectName ?? "",
          })
        }
        onDeleteProject={() =>
          projectModal.openModal({
            type: "delete",
            name: project?.projectName ?? "",
          })
        }
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
      <ProjectModal
        show={projectModal.open}
        onClose={projectModal.closeModal}
        project={{
          id: Number(project?.id),
          name: project?.projectName ?? "",
          endDate: project?.endDate ?? "",
          description: project?.description ?? "",
        }}
        onEdit={(updatedProject) => {
          handleEditProject(updatedProject.name);
        }}
        onDelete={(id) => {
          deleteProjectModal.openModal({
            id,
            name: project?.projectName ?? "",
          });
        }}
      />

      <DeleteModal
        open={deleteProjectModal.open}
        entityType="project"
        itemName={deleteProjectModal.data?.name ?? ""}
        onConfirm={() => {
          if (deleteProjectModal.data?.id) {
            handleDeleteProject(deleteProjectModal.data.id);
            toast.success("Project deleted successfully!");
            deleteProjectModal.closeModal();
            navigate("/projects");
          }
        }}
        onCancel={() => {
          deleteProjectModal.closeModal();
          projectModal.closeModal();
        }}
      />

      <Outlet />
    </SignedInLayout>
  );
};
export default ProjectDetails;
