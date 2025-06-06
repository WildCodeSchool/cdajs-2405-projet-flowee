import type { DeliverableStatus, TaskStatus } from "@generated/graphql-types";

export type DeliverableFormData = {
  type: "deliverable";
  name: string;
  deadline?: string;
  perimeter?: string;
  projectId: number;
  status?: DeliverableStatus;
};

export type TaskFormData = {
  type: "task";
  name: string;
  description?: string;
  deadline?: string;
  deliverableId: number;
  status?: TaskStatus;
};
export type FormData = DeliverableFormData | TaskFormData;
