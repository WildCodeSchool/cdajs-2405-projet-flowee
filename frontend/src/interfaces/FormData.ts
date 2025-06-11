import type { DeliverableStatus, TaskStatus } from "@generated/graphql-types";

export type DeliverableFormData = {
  id?: number;
  type: "deliverable";
  name: string;
  deadline?: string;
  perimeter?: string;
  projectId: number;
  status?: DeliverableStatus;
  projectName?: string;
};

export type TaskFormData = {
  id?: number;
  type: "task";
  name: string;
  description?: string;
  deadline?: string;
  deliverableId: number;
  status?: TaskStatus;
  deliverableName?: string;
};
export type FormData = DeliverableFormData | TaskFormData;
