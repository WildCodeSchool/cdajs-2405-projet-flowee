import PencilIcon from "@components/atoms/Icons/PencilIcon";
import TrashcanIcon from "@components/atoms/Icons/TrashcanIcon";
import { Tag } from "@components/atoms/Tag";
import type { ProjectStatus } from "@generated/graphql-types";

type ProjectHeaderProps = {
  name: string;
  endDate?: string;
  clientName?: string;
  description?: string;
  status?: ProjectStatus | string;
  onEditProject: () => void;
  onDeleteProject: () => void;
};

export default function ProjectHeader({
  name,
  endDate,
  clientName,
  description,
  status,
  onDeleteProject,
  onEditProject,
}: ProjectHeaderProps) {
  console.log(status);
  return (
    <>
      <section className="flex justify-between gap-4">
        <div className="flex gap-2 md:gap-8 items-center">
          <h1 className="text-3xl font-bold">{name}</h1>
          <aside className="flex gap-2">
            <button type="button" onClick={() => onEditProject()}>
              <PencilIcon className="w-3 h-3 fill-red" />
            </button>
            <button type="button" onClick={() => onDeleteProject()}>
              <TrashcanIcon className="w-3 h-3 fill-red" />
            </button>
          </aside>
        </div>
        <p className="font-semibold">{endDate}</p>
      </section>
      <section className="flex gap-4">
        {clientName && <Tag text={clientName} />}
        {status && <Tag text={status} />}
      </section>
      <section>
        <h3 className="text-lg font-semibold">About the project </h3>
        <p>{description}</p>
      </section>
    </>
  );
}
