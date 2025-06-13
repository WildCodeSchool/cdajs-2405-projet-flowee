// @components/molecules/ProjectModal.tsx
import { useState, useEffect } from "react";
import { Input } from "@components/atoms/Input";
import { Textarea } from "@components/atoms/TextArea";
import { toast } from "react-toastify";

type ProjectModalProps = {
  show: boolean;
  onClose: () => void;
  project: {
    id: number;
    name: string;
    endDate?: string;
    description?: string;
  };
  onEdit: (updatedProject: {
    id: number;
    name: string;
    endDate?: string;
    description?: string;
  }) => void;
  onDelete: (id: number) => void;
};

export default function ProjectModal({
  show,
  onClose,
  project,
  onEdit,
  onDelete,
}: ProjectModalProps) {
  const [name, setName] = useState(project.name);
  const [endDate, setEndDate] = useState(project.endDate ?? "");
  const [description, setDescription] = useState(project.description ?? "");

  useEffect(() => {
    setName(project.name);
    setEndDate(project.endDate ?? "");
    setDescription(project.description ?? "");
  }, [project]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Le nom du projet est requis.");
      return;
    }

    onEdit({
      id: project.id,
      name: name.trim(),
      endDate: endDate || undefined,
      description: description.trim(),
    });
  };

  const handleDelete = () => {
    onDelete(project.id);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end h-full">
      <section className="bg-white w-full h-full md:max-w-sm p-6 flex flex-col gap-4 overflow-y-auto relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold">Edit the project</h2>

        <form onSubmit={handleEdit} className="flex flex-col gap-4 mt-2">
          <Input
            label="Project name*"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Deadline"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Textarea
            label="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="bg-theme-base text-white font-semibold py-2 px-4 rounded-md hover:opacity-90"
          >
            Edit the project
          </button>
        </form>

        <div className=" pt-8">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red text-white font-semibold py-2 px-4 rounded-md hover:opacity-90"
          >
            Delete the project
          </button>
        </div>
      </section>
    </div>
  );
}
