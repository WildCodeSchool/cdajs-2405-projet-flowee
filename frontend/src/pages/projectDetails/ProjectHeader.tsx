import { Tag } from "@components/atoms/Tag";
import type { ProjectStatus } from "@generated/graphql-types";

type ProjectHeaderProps = {
  name: string;
  endDate?: string;
  clientName?: string;
  description?: string;
  status?: ProjectStatus | string;
};

export default function ProjectHeader({
  name,
  endDate,
  clientName,
  description,
  status,
}: ProjectHeaderProps) {
  console.log(status);
  return (
    <>
      <section className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">{name}</h1>
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
