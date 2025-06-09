import type { Deliverable, Task } from "@generated/graphql-types";

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
