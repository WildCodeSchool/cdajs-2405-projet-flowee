import { Input } from "@components/atoms/Input";
import { Textarea } from "@components/atoms/TextArea";
import { DeliverableStatus, TaskStatus } from "@generated/graphql-types";
import { useState } from "react";
import type { ModalCreateItemProps } from "@interfaces/CreateItemProps";
import { toast } from "react-toastify";

export default function AddItem({
  mode,
  onClose,
  onSubmit,
  projectOptions,
  deliverableOptions = [],
}: ModalCreateItemProps) {
  const [currentMode, setCurrentMode] = useState<"deliverable" | "task">(mode);
  const isDeliverable = currentMode === "deliverable";

  const [project, setProject] = useState("");
  const [deliverableId, setDeliverableId] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [perimeter, setPerimeter] = useState("");
  const [status, setStatus] = useState(
    isDeliverable ? DeliverableStatus.NotStarted : TaskStatus.NotStarted
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDeliverable) {
      await onSubmit({
        type: "deliverable",
        name,
        deadline,
        perimeter,
        projectId: Number(project),
        status: status as DeliverableStatus,
      });
      toast.success("Deliverable created successfully!");
    } else {
      await onSubmit({
        type: "task",
        name,
        deadline,
        description: perimeter,
        deliverableId: Number(deliverableId),
        status: status as TaskStatus,
      });
      toast.success("Task created successfully!");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end h-full">
      <section className="bg-white w-full h-full md:max-w-sm p-6 flex flex-col gap-4 overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 font-semibold text-gray-500 hover:text-gray-700 transition-all"
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
            onClick={() => setCurrentMode("deliverable")}
          >
            New Deliverable
          </button>
          <button
            type="button"
            className={` mt-4 px-6 py-2 rounded-lg font-medium text-sm transition-all ${
              !isDeliverable
                ? "bg-theme-base text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
            onClick={() => setCurrentMode("task")}
          >
            New Task
          </button>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="max-w-m p-6 flex flex-col gap-4"
        >
          {isDeliverable ? (
            <label className="font-medium">
              Project *
              <select
                required
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full mt-1 py-2 px-4 bg-theme-lightGray rounded-md"
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projectOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className="font-medium">
              Deliverable *
              <select
                required
                value={deliverableId}
                onChange={(e) => setDeliverableId(e.target.value)}
                className="w-full mt-1 py-2 px-4 bg-theme-lightGray rounded-md"
              >
                <option value="" disabled>
                  Select a deliverable
                </option>
                {deliverableOptions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="font-medium">
            Status
            <select
              required
              value={status}
              onChange={(e) =>
                setStatus(
                  isDeliverable
                    ? (e.target.value as DeliverableStatus)
                    : (e.target.value as TaskStatus)
                )
              }
              className="w-full mt-1 py-2 px-4 bg-theme-lightGray rounded-md"
            >
              {Object.entries(
                isDeliverable ? DeliverableStatus : TaskStatus
              ).map(([label, value]) => (
                <option key={value} value={value}>
                  {label.replace(/([A-Z])/g, " $1").trim()}
                </option>
              ))}
            </select>
          </label>

          <Input
            label={isDeliverable ? "Deliverable name *" : "Task name *"}
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <Textarea
            label="Perimeter"
            value={perimeter}
            onChange={(e) => setPerimeter(e.target.value)}
            rows={3}
          />

          <button
            type="submit"
            className="bg-theme-base text-white font-semibold py-2 px-4 rounded-md hover:opacity-90"
          >
            Create {isDeliverable ? "deliverable" : "task"}
          </button>
        </form>
      </section>
    </div>
  );
}
