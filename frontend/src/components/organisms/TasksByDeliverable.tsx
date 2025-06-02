import TrashcanIcon from "@components/atoms/Icons/TrashcanIcon";
import type { Deliverable } from "@generated/graphql-types";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { NavLink } from "react-router-dom";

interface Props {
  deliverables: Deliverable[];
  projectSlug: string | undefined;
  onDelete: (id: number, name: string) => void;
}

export const TasksByDeliverable = ({
  deliverables,
  projectSlug,
  onDelete,
}: Props) => {
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
                  <aside className="flex  gap-2 ">
                    <button
                      type="button"
                      onClick={() => onDelete(Number(task.id), task.name)}
                    >
                      <TrashcanIcon className="w-3 h-3 fill-red" />
                    </button>
                    <NavLink
                      to={`/projects/${projectSlug}/tasks/${task.id}`}
                      className="font-medium"
                    >
                      {task.name}
                    </NavLink>
                  </aside>

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
