import {
  DeliverableStatus,
  TaskStatus,
  useCreateDeliverableMutation,
  useCreateTaskMutation,
  useDeleteDeliverableMutation,
  useDeleteTaskMutation,
  useUpdateDeliverableMutation,
} from "@generated/graphql-types";
import type { FormData } from "@interfaces/FormData";
import { useCallback } from "react";

export const useProjectHandlers = (
  refetch: () => void,
  closeModal: () => void
) => {
  const [createDeliverable] = useCreateDeliverableMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateDeliverable] = useUpdateDeliverableMutation();
  const [deleteDeliverable] = useDeleteDeliverableMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleCreate = useCallback(
    async (formData: FormData) => {
      try {
        if (formData.type === "deliverable") {
          await createDeliverable({
            variables: {
              newDeliverable: {
                name: formData.name,
                perimeter: formData.perimeter,
                deliveryDate: formData.deadline,
                projectId: formData.projectId,
                status: formData.status ?? DeliverableStatus.NotStarted,
              },
            },
          });
        } else {
          await createTask({
            variables: {
              newTask: {
                name: formData.name,
                description: formData.description,
                endDate: formData.deadline,
                deliverableId: formData.deliverableId,
                status: formData.status ?? TaskStatus.NotStarted,
              },
            },
          });
        }
        refetch();
      } catch (err) {
        console.error("Create error:", err);
      } finally {
        closeModal();
      }
    },
    [createDeliverable, createTask, refetch, closeModal]
  );

  const handleEdit = useCallback(
    async (formData: FormData) => {
      if (formData.type === "deliverable") {
        if (!formData.id) return console.error("Missing deliverable ID");

        try {
          await updateDeliverable({
            variables: {
              id: formData.id,
              data: {
                name: formData.name,
                perimeter: formData.perimeter,
                deliveryDate: formData.deadline,
                status: formData.status as DeliverableStatus,
                projectId: formData.projectId,
              },
            },
          });
          refetch();
        } catch (err) {
          console.error("Update error:", err);
        } finally {
          closeModal();
        }
      }

      // ajouter pour updateTask
    },
    [updateDeliverable, refetch, closeModal]
  );

  const handleDelete = useCallback(
    async (entity: "task" | "deliverable", id: number) => {
      try {
        await (entity === "deliverable"
          ? deleteDeliverable({ variables: { id } })
          : deleteTask({ variables: { id } }));

        refetch();
      } catch (err) {
        console.error("Delete error:", err);
      }
    },
    [deleteDeliverable, deleteTask, refetch]
  );

  return { handleCreate, handleEdit, handleDelete };
};
