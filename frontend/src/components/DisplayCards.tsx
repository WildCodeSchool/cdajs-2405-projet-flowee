import { CardVariant } from "./Cards";
import { Project, Deliverable, Task } from "../__generated__/graphql-types";
import { ReactNode } from "react";

interface DisplayCardsProps {
  items?: (Project | Deliverable | Task)[];
  loading: boolean;
  error?: Error;
  variant: CardVariant;
  searchFilter: string;
  limit: number;
  renderItem: (item: Project | Deliverable | Task) => ReactNode;
}

export default function DisplayCards({
  items,
  loading,
  error,
  searchFilter,
  limit,
  renderItem,
}: DisplayCardsProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!items) return <p>No data</p>;

  const getItemTitle = (item: Project | Deliverable | Task): string => {
    return "projectName" in item ? item.projectName : item.name;
  };

  const filtered = items.filter((item) =>
    getItemTitle(item).toLowerCase().includes(searchFilter.toLowerCase())
  );

  const displayedItems = filtered.slice(0, limit);
  console.log("LIMITE", limit);

  return (
    <div className="flex flex-col md:flex-row gap-4 ">
      {displayedItems.map((item) => renderItem(item))}
    </div>
  );
}
