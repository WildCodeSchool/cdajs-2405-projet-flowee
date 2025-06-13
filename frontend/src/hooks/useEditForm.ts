import { useEffect, useState } from "react";
import { DeliverableStatus } from "@generated/graphql-types";
import type { TaskStatus } from "@generated/graphql-types";

type Mode = "deliverable" | "task";

export const useEditForm = (initialValues?: {
  id: number;
  name: string;
  perimeter?: string;
  deadline?: string;
  status: DeliverableStatus | TaskStatus;
  projectId?: number;
  projectName?: string;
  deliverableId?: number;
  deliverableName?: string;
}) => {
  const [mode, setMode] = useState<Mode>();
  const isDeliverable = mode === "deliverable";
  const [form, setForm] = useState({
    name: "",
    deadline: "",
    perimeter: "",
    status: DeliverableStatus.NotStarted as DeliverableStatus | TaskStatus,
  });

  const [labelValue, setLabelValue] = useState("");

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      name: initialValues.name ?? "",
      deadline: initialValues.deadline ?? "",
      perimeter: initialValues.perimeter ?? "",
      status: initialValues.status,
    });

    setLabelValue(
      mode === "deliverable"
        ? (initialValues.projectName ?? "")
        : (initialValues.deliverableName ?? ""),
    );
  }, [initialValues, mode]);

  const handleChange =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return {
    mode,
    setMode,
    form,
    handleChange,
    isDeliverable,
    labelValue,
  };
};
