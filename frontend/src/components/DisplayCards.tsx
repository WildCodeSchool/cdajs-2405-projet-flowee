// import { Card, CardVariant } from "./Cards";
// import { Project, Deliverable } from "../__generated__/graphql-types";
// import { ReactNode } from "react";

// interface DisplayCardsProps {
//   items?: (Project | Deliverable)[];
//   loading: boolean;
//   error?: Error;
//   type: "company" | "client";
//   variant: CardVariant;
//   cardType: "projects" | "deliverable" | "task";
//   searchFilter: string;
//   limit: number;
//   renderItem?: (item: Project | Deliverable) => ReactNode;
// }

// export default function DisplayCards({
//   items,
//   loading,
//   error,
//   type,
//   variant,
//   renderItem,
//   searchFilter,
//   limit,
// }: DisplayCardsProps) {
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!items) return <p>No data</p>;

//   // Fonction d’uniformisation pour récupérer le nom à afficher
//   const getItemTitle = (item: Project | Deliverable): string => {
//     return "projectName" in item ? item.projectName : item.name;
//   };
//   // Filtrage selon la recherche
//   const filtered = items.filter((item) =>
//     getItemTitle(item).toLowerCase().includes(searchFilter.toLowerCase())
//   );

//   const displayedItems = filtered.slice(0, limit);

//   return (
//     <div className="flex flex-wrap gap-4">
//       {displayedItems.map((item) => (
//         <Card key={item.id} type={type} variant={variant}>
//           {renderItem ? (
//             renderItem(item)
//           ) : (
//             <h3 className="font-semibold text-xl">{getItemTitle(item)}</h3>
//           )}
//         </Card>
//       ))}
//     </div>
//   );
// }
import { CardVariant } from "./Cards";
import { Project, Deliverable } from "../__generated__/graphql-types";
import { ReactNode } from "react";

interface DisplayCardsProps {
  items?: (Project | Deliverable)[];
  loading: boolean;
  error?: Error;
  variant: CardVariant;
  searchFilter: string;
  limit: number;
  renderItem: (item: Project | Deliverable) => ReactNode;
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

  const getItemTitle = (item: Project | Deliverable): string => {
    return "projectName" in item ? item.projectName : item.name;
  };

  const filtered = items.filter((item) =>
    getItemTitle(item).toLowerCase().includes(searchFilter.toLowerCase())
  );

  const displayedItems = filtered.slice(0, limit);

  return (
    <div className="flex flex-wrap gap-4">
      {displayedItems.map((item) => renderItem(item))}
    </div>
  );
}
