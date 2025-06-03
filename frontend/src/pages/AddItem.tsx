import { Input } from "@components/atoms/Input";
import { Textarea } from "@components/atoms/TextArea";
import { DeliverableStatus } from "@generated/graphql-types";
import { useState } from "react";

interface ModalCreateItemProps {
  mode: "deliverable" | "task";
  onClose: () => void;
  onSubmit: (formData: {
    projectId: number;
    name: string;
    deadline?: string;
    perimeter?: string;
    status?: DeliverableStatus;
  }) => void;
  projectOptions: { id: string; name: string }[];
}
export default function AddItem({
  mode,
  onClose,
  onSubmit,
  projectOptions,
}: ModalCreateItemProps) {
  const [project, setProject] = useState("");
  const [name, setName] = useState("");
  const [currentMode, setCurrentMode] = useState<"deliverable" | "task">(mode);
  const [deadline, setDeadline] = useState("");
  const [perimeter, setPerimeter] = useState("");
  const [status, setStatus] = useState<DeliverableStatus>(
    DeliverableStatus.NotStarted
  );

  const isDeliverable = mode === "deliverable";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      deadline,
      perimeter,
      projectId: Number(project),
      status,
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end h-full">
      <section className="bg-white max-w-sm p-6 flex flex-col gap-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 font-semibold text-gray-500 hover:text-gray-700 transition-all"
        >
          x
        </button>
        <aside className="flex justify-evenly items-center mb-4">
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
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
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
          <label className=" font-medium">
            Project *
            <select
              required
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full mt-1 py-2 px-4 bg-theme-lightGray rounded-md focus:bg-white focus:outline-blue focus:invalid:border-red focus:invalid:outline-red"
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

          <label className="font-medium">
            Status
            <select
              required
              value={status}
              onChange={(e) => setStatus(e.target.value as DeliverableStatus)}
              className="w-full mt-1 py-2 px-4 bg-theme-lightGray rounded-md focus:bg-white focus:outline-blue"
            >
              {Object.entries(DeliverableStatus).map(([label, value]) => (
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
