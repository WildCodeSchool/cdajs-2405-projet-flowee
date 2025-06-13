import { AddButton } from "@components/atoms/AddButton";
import { DeliverablesByStatus } from "@components/organisms/DeliverablesByStatus";
import { TasksByDeliverable } from "@components/organisms/TasksByDeliverable";
import type {
  DeliverableStatus,
  Deliverable,
  Project,
  TaskStatus,
} from "@generated/graphql-types";
import type { DeliverableFormData, TaskFormData } from "@interfaces/FormData";

type ProjectSectionsProps = {
  project: Project;
  slug: string;
  deliverables: Deliverable[];
  openAdd: () => void;
  openEdit: (data: DeliverableFormData | TaskFormData) => void;
  openDelete: (data: {
    entity: "task" | "deliverable";
    id: number;
    name: string;
  }) => void;
};

export default function ProjectSections({
  project,
  slug,
  deliverables,
  openAdd,
  openEdit,
  openDelete,
}: ProjectSectionsProps) {
  return (
    <section className="flex flex-col md:flex-row gap-4 w-full">
      <section className="flex flex-col gap-4 w-full">
        <aside className="flex justify-between items-center bg-theme-veryLight p-2 rounded-sm font-bold ">
          <h2>Deliverables</h2>
          <AddButton onClick={openAdd} />
        </aside>

        {project?.deliverables && (
          <DeliverablesByStatus
            deliverables={project.deliverables}
            projectSlug={slug}
            onDelete={(id, name) =>
              openDelete({ entity: "deliverable", id, name })
            }
            onUpdate={(deliverable) =>
              openEdit({
                id: Number(deliverable.id),
                name: deliverable.name,
                perimeter: deliverable.perimeter ?? "",
                deadline: deliverable.endDate ?? "",
                status: deliverable.status as DeliverableStatus,
                projectId: Number(project.id),
                projectName: project.projectName,
                type: "deliverable",
              })
            }
          />
        )}
      </section>

      <section className="flex flex-col gap-4 w-full">
        <aside className="flex justify-between items-center bg-theme-veryLight p-2 rounded-sm font-bold">
          <h2>Tasks</h2>
          <AddButton onClick={openAdd} />
        </aside>
        {}
        <section className="mb-4">
          <TasksByDeliverable
            deliverables={deliverables}
            onDelete={(id, name) => openDelete({ entity: "task", id, name })}
            onUpdate={(task) => {
              const deliverable = deliverables.find((del) =>
                del.tasks?.some((t) => t.id === task.id),
              );
              if (!deliverable) return;

              openEdit({
                type: "task",
                id: Number(task.id),
                name: task.name,
                description: task.description ?? "",
                deadline: task.endDate ?? "",
                deliverableId: Number(deliverable.id),
                deliverableName: deliverable.name,
                status: task.status as TaskStatus,
              });
            }}
          />
        </section>
      </section>
    </section>
  );
}
