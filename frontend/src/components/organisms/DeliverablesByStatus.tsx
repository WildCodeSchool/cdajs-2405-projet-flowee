import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import {
  DELIVERABLE_STATUS,
  DELIVERABLE_STATUS_META,
  type DeliverableStatus,
} from "@interfaces/Status";
import type { Deliverable } from "@generated/graphql-types";
import { useMemo } from "react";

import TrashcanIcon from "@components/atoms/Icons/TrashcanIcon";
import { useState } from "react";
import ItemDetails from "@pages/ItemDetails";
import SearchBar from "./Search";
interface Props {
  deliverables: Deliverable[];
  projectSlug: string | undefined;
  onDelete: (id: number, name: string) => void;
}

export const DeliverablesByStatus = ({
  deliverables,
  projectSlug,
  onDelete,
}: Props) => {
  const [searchFilter, setSearchFilter] = useState("");

  const [selectedDeliverableId, setSelectedDeliverableId] = useState<
    number | null
  >(null);
  const grouped = useMemo(() => {
    const g: Partial<Record<DeliverableStatus, Deliverable[]>> = {};
    for (const d of deliverables) {
      if (!d.name?.toLowerCase().includes(searchFilter.toLowerCase())) continue;

      const status = d.status as DeliverableStatus;
      if (!g[status]) g[status] = [];
      g[status]?.push(d);
    }
    return g;
  }, [deliverables, searchFilter]);

  return (
    <>
      <SearchBar setSearchFilter={setSearchFilter} />
      <Accordion className="w-full" allowMultiple>
        {DELIVERABLE_STATUS.map((status) => {
          const list = grouped[status];
          if (!list || list.length === 0) return null;

          const meta = DELIVERABLE_STATUS_META[status];

          return (
            <AccordionItem
              initialEntered
              key={status}
              className=" rounded-sm"
              header={<div>{meta.label}</div>}
              buttonProps={{
                className: `font-semibold w-full text-left p-2 ${meta.text} ${meta.bg} `,
              }}
            >
              <ul className="flex flex-col  p-3 gap-3">
                {list.map((deliverable) => (
                  <li
                    key={deliverable.id}
                    className="bg-white roundedshadow-sm flex justify-between"
                  >
                    <aside className="flex  gap-2 ">
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(Number(deliverable.id), deliverable.name)
                        }
                      >
                        <TrashcanIcon className="w-3 h-3 fill-red" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDeliverableId(Number(deliverable.id))
                        }
                        className="font-medium"
                      >
                        {deliverable.name}
                      </button>
                    </aside>

                    {deliverable.endDate && (
                      <p className="text-xs text-gray-400">
                        {new Date(deliverable.endDate).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          );
        })}
      </Accordion>
      {selectedDeliverableId && (
        <ItemDetails
          id={selectedDeliverableId}
          type="deliverable"
          onClose={() => setSelectedDeliverableId(null)}
        />
      )}
    </>
  );
};
