import { Tag } from "@components/atoms/Tag";

type ProjectHeaderProps = {
  name: string;
  endDate?: string;
  clientName?: string;
  description?: string;
};

export default function ProjectHeader({
  name,
  endDate,
  clientName,
  description,
}: ProjectHeaderProps) {
  return (
    <>
      <section className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="font-semibold">{endDate}</p>
      </section>
      <section className="flex gap-4">
        {clientName && <Tag text={clientName} />}
      </section>
      <section>
        <h3 className="text-lg font-semibold">About the project</h3>
        <p>{description}</p>
      </section>
    </>
  );
}
