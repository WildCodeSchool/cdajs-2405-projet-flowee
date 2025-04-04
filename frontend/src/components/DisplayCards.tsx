// src/components/DisplayCards.tsx
import { Card, CardVariant } from "./Cards";
import { Project, Deliverable } from "../__generated__/graphql-types";

interface DisplayCardsProps {
  items?: (Project | Deliverable)[];
  loading: boolean;
  error?: Error;
  type: "company" | "client";
  variant: CardVariant;
  cardType: "project" | "deliverable" | "task";
  searchFilter: string;
  limit: number;
}

export default function DisplayCards({
  items,
  loading,
  error,
  type,
  variant,

  searchFilter,
  limit,
}: DisplayCardsProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!items) return <p>No data</p>;

  // Fonction d’uniformisation pour récupérer le nom à afficher
  const getItemTitle = (item: Project | Deliverable): string => {
    console.log("ITEM !!", item);
    if ("projectName" in item) return item.projectName;

    return item.name;
  };

  // Filtrage selon la recherche
  const filtered = items.filter((item) =>
    getItemTitle(item).toLowerCase().includes(searchFilter.toLowerCase())
  );

  const displayedItems = filtered.slice(0, limit);

  return (
    <div className="flex flex-wrap gap-4">
      {displayedItems.map((item) => (
        <Card key={item.id} type={type} variant={variant}>
          <h3 className="font-semibold text-xl">{getItemTitle(item)}</h3>
        </Card>
      ))}
    </div>
  );
}
