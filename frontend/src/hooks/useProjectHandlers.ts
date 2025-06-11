import {
  DeliverableStatus,
  TaskStatus,
  useCreateDeliverableMutation,
  useCreateTaskMutation,
  useDeleteDeliverableMutation,
  useDeleteTaskMutation,
  useUpdateDeliverableMutation,
  useUpdateTaskMutation,
} from "@generated/graphql-types";
import type { FormData } from "@interfaces/FormData";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useProjectHandlers = (
  refetch: () => void,
  closeModal: () => void
) => {
  const [createDeliverable] = useCreateDeliverableMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateDeliverable] = useUpdateDeliverableMutation();
  const [updateTask] = useUpdateTaskMutation();
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
      try {
        if (formData.type === "deliverable") {
          if (!formData.id) return console.error("Missing deliverable ID");

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
        } else {
          if (!formData.id) return console.error("Missing task ID");
          await updateTask({
            variables: {
              id: formData.id,
              data: {
                name: formData.name,
                description: formData.description,
                endDate: formData.deadline,
                deliverableId: formData.deliverableId,
                status: formData.status as TaskStatus,
              },
            },
          });
        }
        refetch();
      } catch (err) {
        console.error("Update error:", err);
      } finally {
        closeModal();
      }
    },
    [updateDeliverable, updateTask, refetch, closeModal]
  );

  const handleDelete = useCallback(
    async (entity: "task" | "deliverable", id: number) => {
      try {
        await (entity === "deliverable"
          ? deleteDeliverable({ variables: { id } })
          : deleteTask({ variables: { id } }));
        toast.success(
          `${
            entity.charAt(0).toUpperCase() + entity.slice(1)
          } deleted successfully!`
        );
        refetch();
      } catch (err) {
        console.error("Delete error:", err);
        toast.error(`Could not delete ${entity}. Please try again later.`);
      }
    },
    [deleteDeliverable, deleteTask, refetch]
  );

  return { handleCreate, handleEdit, handleDelete };
};
