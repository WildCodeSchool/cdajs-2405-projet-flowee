import type {
  Deliverable,
  DeliverableStatus,
  Task,
  TaskStatus,
} from "@generated/graphql-types";

export type DeliverableEditData = Pick<
  Deliverable,
  "id" | "name" | "perimeter" | "endDate" | "status"
> & {
  project?: { id: number; projectName: string };
};

export type TaskEditData = Pick<
  Task,
  "id" | "name" | "description" | "endDate" | "status"
> & {
  deliverable?: { id: number; name: string };
};

export type InitialValues = {
  id: number;
  name: string;
  perimeter?: string;
  deadline?: string;
  status: DeliverableStatus | TaskStatus;
  projectId?: number;
  projectName?: string;
  deliverableId?: number;
  deliverableName?: string;
};
