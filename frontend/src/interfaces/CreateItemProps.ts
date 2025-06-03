import type { FormData } from "./FormData";

export interface ModalCreateItemProps {
  mode: "deliverable" | "task";
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  projectOptions: { id: string; name: string }[];
  deliverableOptions?: { id: string; name: string }[];
}
