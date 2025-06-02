import TrashcanIcon from "@components/atoms/Icons/TrashcanIcon";
import type { Deliverable } from "@generated/graphql-types";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { useState } from "react";
import ItemDetails from "@pages/ItemDetails"; // Assure-toi que c’est le bon chemin

interface Props {
  deliverables: Deliverable[];

  onDelete: (id: number, name: string) => void;
}

export const TasksByDeliverable = ({
  deliverables,

  onDelete,
}: Props) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  return (
    <>
      <Accordion className="w-full" allowMultiple>
        {deliverables.map((deliverable) => (
          <AccordionItem
            initialEntered
            key={deliverable.id}
            className=" rounded-sm"
            header={<div>{deliverable.name}</div>}
            buttonProps={{
              className:
                "font-semibold w-full text-left p-2 bg-theme-lightGray",
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
                      <button
                        type="button"
                        onClick={() => setSelectedTaskId(Number(task.id))}
                        className="font-medium text-left hover:underline"
                      >
                        {task.name}
                      </button>
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
      {selectedTaskId && (
        <ItemDetails
          id={selectedTaskId}
          type="task"
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </>
  );
};
