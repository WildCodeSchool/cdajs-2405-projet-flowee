export const DELIVERABLE_STATUS = [
  "NOT_STARTED",
  "APPROVED",
  "BLOCKED",
  "IN_PROGRESS",
  "IN_REVIEW",
  "LATE",
] as const;

export type DeliverableStatus = (typeof DELIVERABLE_STATUS)[number];

export const DELIVERABLE_STATUS_META: Record<
  DeliverableStatus,
  { label: string; bg: string; text: string }
> = {
  NOT_STARTED: {
    label: "Not started",
    bg: "bg-theme-lightGray",
    text: "text-gray-800",
  },
  APPROVED: {
    label: "Approved",
    bg: "bg-theme-success",
    text: "text-green-800",
  },
  BLOCKED: {
    label: "Blocked",
    bg: "bg-theme-error",
    text: "text-red-800",
  },
  IN_PROGRESS: {
    label: "In progress",
    bg: "bg-theme-light",
    text: "text-black",
  },
  IN_REVIEW: {
    label: "In review",
    bg: "bg-blue",
    text: "text-white",
  },
  LATE: {
    label: "Late",
    bg: "bg-theme-light",
    text: "text-orange-800",
  },
};

/********************** TASKS */
export const TASK_STATUS = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
  "BLOCKED",
] as const;

export type TaskStatus = (typeof TASK_STATUS)[number];

export const TASK_STATUS_META: Record<
  TaskStatus,
  { label: string; bg: string; text: string }
> = {
  NOT_STARTED: {
    label: "Not started",
    bg: "bg-theme-lightGray",
    text: "text-gray-800",
  },

  BLOCKED: {
    label: "Blocked",
    bg: "bg-theme-error",
    text: "text-red-800",
  },
  IN_PROGRESS: {
    label: "In progress",
    bg: "bg-theme-light",
    text: "text-black",
  },
  COMPLETED: {
    label: "Completed",
    bg: "bg-theme-success",
    text: "text-green-800",
  },
};
