import AddItem from "../../pages/AddItem";
import type { FormData } from "@interfaces/FormData";
import type { DeliverableOption, ProjectOption } from "@interfaces/Options";

type AddModalProps = {
  mode: "deliverable" | "task";
  show: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  projectOptions: ProjectOption[];
  deliverableOptions: DeliverableOption[];
};

export default function AddModal({
  mode,
  show,
  onClose,
  onSubmit,
  projectOptions,
  deliverableOptions,
}: AddModalProps) {
  if (!show) return null;

  return (
    <AddItem
      mode={mode}
      onClose={onClose}
      onSubmit={onSubmit}
      projectOptions={projectOptions}
      deliverableOptions={deliverableOptions}
    />
  );
}
