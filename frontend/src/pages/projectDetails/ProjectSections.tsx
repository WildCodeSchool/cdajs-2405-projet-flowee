import PlusIcon from "@components/atoms/Icons/PlusIcon";
import { DeliverablesByStatus } from "@components/organisms/DeliverablesByStatus";
import { TasksByDeliverable } from "@components/organisms/TasksByDeliverable";
import type { Deliverable, Project } from "@generated/graphql-types";

type ProjectSectionsProps = {
  project: Project;
  slug: string;
  deliverables: Deliverable[];
  setShowModal: (open: boolean) => void;
  setModalType: (type: "task" | "deliverable") => void;
  openDeleteModal: (
    entity: "task" | "deliverable",
    id: number,
    name: string
  ) => void;
};

const AddButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="flex items-center justify-center w-6 h-6 border-2 border-theme-darkGray rounded-full"
    type="button"
    onClick={onClick}
  >
    <PlusIcon className="fill-theme-darkGray w-3 h-3" />
  </button>
);

export default function ProjectSections({
  project,
  slug,
  deliverables,
  setShowModal,
  setModalType,
  openDeleteModal,
}: ProjectSectionsProps) {
  return (
    <section className="flex flex-col md:flex-row gap-4 w-full">
      <section className="flex flex-col gap-4 w-full">
        <aside className="flex justify-between items-center bg-theme-veryLight p-2 rounded-sm font-bold ">
          <h2>Deliverables</h2>
          <AddButton
            onClick={() => {
              setShowModal(true);
              setModalType("deliverable");
            }}
          />
        </aside>

        {project?.deliverables && (
          <DeliverablesByStatus
            deliverables={project.deliverables}
            projectSlug={slug}
            onDelete={(id, name) => openDeleteModal("deliverable", id, name)}
          />
        )}
      </section>

      <section className="flex flex-col gap-4 w-full">
        <aside className="flex justify-between items-center bg-theme-veryLight p-2 rounded-sm font-bold">
          <h2>Tasks</h2>
          <AddButton
            onClick={() => {
              setShowModal(true);
              setModalType("task");
            }}
          />
        </aside>

        <section className="mb-4">
          <TasksByDeliverable
            deliverables={deliverables}
            onDelete={(id, name) => openDeleteModal("task", id, name)}
          />
        </section>
      </section>
    </section>
  );
}
