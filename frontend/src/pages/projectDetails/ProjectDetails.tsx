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
import { useUpdateProjectMutation } from "@generated/graphql-types";
import type { UpdateProjectInput } from "@generated/graphql-types";
import { useDeleteProjectMutation } from "@generated/graphql-types";

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
  const [updateProjectMutation] = useUpdateProjectMutation();
  const [deleteProjectMutation] = useDeleteProjectMutation();

  const handleEditProject = async (updatedProject: {
    id: number;
    name: string;
    endDate?: string;
    description?: string;
  }) => {
    if (!project) return;

    const payload: UpdateProjectInput = {
      id: String(updatedProject.id),
    };

    if (updatedProject.name !== project.projectName) {
      payload.name = updatedProject.name;
    }

    if (updatedProject.description !== project.description) {
      payload.description = updatedProject.description;
    }

    if (updatedProject.endDate !== project.endDate) {
      payload.endDate = updatedProject.endDate;
    }

    if (
      payload.name === undefined &&
      payload.description === undefined &&
      payload.endDate === undefined
    ) {
      toast.info("Aucune modification détectée.");
      return;
    }

    try {
      const result = await updateProjectMutation({
        variables: { data: payload },
      });
      if (result) {
        toast.success("Projet mis à jour !");
        await refetch();
        projectModal.closeModal();
      } else {
        console.error("Update error");
      }
    } catch (error) {
      console.error("Erreur update :", error);
      toast.error("Erreur lors de la mise à jour du projet.");
    }
  };

  const handleDeleteProject = async (id: number) => {
    console.info("Deleting project with ID:", id);

    try {
      await deleteProjectMutation({
        variables: { projectId: id },
      });
    } catch (error) {
      console.error("Erreur dans deleteProjectMutation :", error);
      throw error;
    }
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
          handleEditProject(updatedProject);
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
        onConfirm={async () => {
          const id = deleteProjectModal.data?.id;
          if (!id) return;

          try {
            await handleDeleteProject(id);
            toast.success("Projet supprimé avec succès !");
            deleteProjectModal.closeModal();
            navigate("/projects");
          } catch (error) {
            toast.error("Échec de la suppression du projet.");
            console.error("Erreur suppression :", error);
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
