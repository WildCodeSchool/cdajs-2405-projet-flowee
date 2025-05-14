import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import {
  TASK_STATUS,
  TASK_STATUS_META,
  type TaskStatus,
} from "@interfaces/Status";
import type { Task, Deliverable } from "@generated/graphql-types";
import { useMemo } from "react";
interface Props {
  deliverables: Deliverable[];
}

export const TasksByDeliverable = ({ deliverables }: Props) => {
  //   const grouped = useMemo(() => {
  //     const g: Partial<Record<TaskStatus, Task[]>> = {};
  //     for (const t of tasks) {
  //       const status = t.status as TaskStatus;
  //       if (!g[status]) g[status] = [];
  //       g[status]?.push(t);
  //     }
  //     return g;
  //   }, [tasks]);

  return (
    <Accordion className="w-full" allowMultiple>
      {deliverables.map((deliverable) => (
        <AccordionItem
          initialEntered
          key={deliverable.id}
          className=" rounded-sm"
          header={<div>{deliverable.name}</div>}
          buttonProps={{
            className: "font-semibold w-full text-left p-2 bg-theme-lightGray",
          }}
        >
          {deliverable.tasks?.length ? (
            <ul className="flex flex-col  p-3 gap-3">
              {deliverable.tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white roundedshadow-sm flex justify-between"
                >
                  <p className="font-medium">{task.name}</p>

                  {task.endDate && (
                    <p className="text-xs text-gray-400">
                      {new Date(task.endDate).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No tasks</p>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
