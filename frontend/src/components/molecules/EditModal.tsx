import { Input } from "@components/atoms/Input";
import { Textarea } from "@components/atoms/TextArea";
import { DeliverableStatus, TaskStatus } from "@generated/graphql-types";
import { useEditForm } from "../../hooks/useEditForm";
import type { FormData } from "@interfaces/FormData";
import type { InitialValues } from "@interfaces/type";
import { toast } from "react-toastify";

export type EditModalProps = {
  mode: "deliverable" | "task";
  show: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialValues: InitialValues;
};

export default function EditModal({
  mode,
  show,
  onClose,
  onSubmit,
  initialValues,
}: EditModalProps) {
  const { setMode, form, handleChange, isDeliverable } =
    useEditForm(initialValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (mode === "deliverable") {
      if (!initialValues?.projectId) {
        console.error("Missing projectId for deliverable editing");
        toast.error("Could not edit deliverable.");
        return;
      }

      await onSubmit({
        type: "deliverable",
        id: initialValues?.id ?? 0,
        name: form.name,
        deadline: form.deadline,
        perimeter: form.perimeter,
        projectId: initialValues.projectId,
        status: form.status as DeliverableStatus,
        projectName: initialValues.projectName,
      });
      toast.success("Deliverable updated successfully!");
    } else {
      if (!initialValues?.deliverableId) {
        console.error("Missing deliverableId for task editing");
        toast.error("Could not edit task.");
        return;
      }

      await onSubmit({
        type: "task",
        id: initialValues?.id ?? 0,
        name: form.name,
        deadline: form.deadline,
        description: form.perimeter,
        deliverableId: initialValues.deliverableId,
        status: form.status as TaskStatus,
      });
      toast.success("Task updated successfully!");
    }

    onClose();
  };

  if (!show) return null;

  const StatusEnum = isDeliverable ? DeliverableStatus : TaskStatus;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end h-full">
      <section className="bg-white w-full h-full md:max-w-sm p-6 flex flex-col gap-4 overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 font-semibold text-gray-500 hover:text-gray-700"
        >
          x
        </button>

        <aside className="flex justify-evenly items-center mb-4 w-full">
          <button
            type="button"
            className={` mt-4 px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              isDeliverable
                ? "bg-theme-base text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
            onClick={() => setMode("deliverable")}
          >
            Update Deliverable
          </button>
          <button
            type="button"
            className={` mt-4 px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              !isDeliverable
                ? "bg-theme-base text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
            onClick={() => setMode("task")}
          >
            update Task
          </button>
        </aside>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label={isDeliverable ? "Project" : "Deliverable"}
            type="text"
            value={
              isDeliverable
                ? initialValues?.projectName
                : initialValues?.deliverableName
            }
            disabled
            readOnly
          />

          <label className="font-medium">
            Status
            <select
              required
              value={form.status}
              onChange={handleChange("status")}
              className="w-full mt-1 py-2 px-4 bg-theme-lightGray rounded-md"
            >
              {Object.entries(StatusEnum).map(([label, value]) => (
                <option key={value} value={value}>
                  {label.replace(/([A-Z])/g, " $1").trim()}
                </option>
              ))}
            </select>
          </label>

          <Input
            label={`${isDeliverable ? "Deliverable" : "Task"} name *`}
            required
            type="text"
            value={form.name}
            onChange={handleChange("name")}
          />

          <Input
            label="Deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange("deadline")}
          />

          <Textarea
            label="Perimeter"
            value={form.perimeter}
            onChange={handleChange("perimeter")}
            rows={3}
          />

          <button
            type="submit"
            className="bg-theme-base text-white font-semibold py-2 px-4 rounded-md hover:opacity-90"
          >
            Edit {mode}
          </button>
        </form>
      </section>
    </div>
  );
}
