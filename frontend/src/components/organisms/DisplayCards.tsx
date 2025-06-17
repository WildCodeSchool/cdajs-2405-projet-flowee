import type { Deliverable, Project, Task } from "@generated/graphql-types";
import type { ReactNode } from "react";
import type { CardVariant } from "./Cards";

interface DisplayCardsProps {
  items?: (Project | Deliverable | Task)[];
  loading: boolean;
  error?: Error;
  variant: CardVariant;
  searchFilter: string;
  limit?: number;
  renderItem: (item: Project | Deliverable | Task) => ReactNode;
}

export default function DisplayCards({
  items,
  loading,
  error,

  limit,
  renderItem,
}: DisplayCardsProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!items) return <p>No data</p>;

  const displayedItems = items.slice(0, limit);

  return (
    <div className="flex flex-col md:flex-row gap-4 flex-wrap">
      {displayedItems.map((item) => renderItem(item))}
    </div>
  );
}
