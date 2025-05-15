import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import {
  DELIVERABLE_STATUS,
  DELIVERABLE_STATUS_META,
  type DeliverableStatus,
} from "@interfaces/Status";
import type { Deliverable } from "@generated/graphql-types";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  deliverables: Deliverable[];
  projectSlug: string | undefined;
}

export const DeliverablesByStatus = ({ deliverables, projectSlug }: Props) => {
  const grouped = useMemo(() => {
    const g: Partial<Record<DeliverableStatus, Deliverable[]>> = {};
    for (const d of deliverables) {
      const status = d.status as DeliverableStatus;
      if (!g[status]) g[status] = [];
      g[status]?.push(d);
    }
    return g;
  }, [deliverables]);
  console.log("deliverables list:", deliverables);

  return (
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
                  <NavLink
                    to={`/projects/${projectSlug}/deliverables/${deliverable.id}`}
                    className="font-medium"
                  >
                    {deliverable.name}
                  </NavLink>

                  {deliverable.endDate && (
                    <p className="text-xs text-gray-400">
                      {new Date(deliverable.endDate).toLocaleDateString(
                        "fr-FR"
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
  );
};
