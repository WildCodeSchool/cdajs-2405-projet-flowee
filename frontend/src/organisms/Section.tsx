// // src/components/organisms/Section.tsx
// import { useState, useEffect } from "react";
// import { CardVariant } from "../components/Cards";
// import DisplayCards from "../components/DisplayCards";
// import Button from "../atoms/Button";
// import { useAuth } from "../context/authContext";
// import {
//   useGetProjectsByUserQuery,
//   useGetAllDeliverablesQuery,
//   GetProjectsByUserQuery,
//   GetAllDeliverablesQuery,
// } from "../__generated__/graphql-types";

// export interface SectionProps {
//   title: string;
//   variant: CardVariant;
//   type: "projects" | "deliverable" | "task";
//   searchFilter: string;
//   showMore?: boolean;
//   className?: string;
// }

// export const Section: React.FC<SectionProps> = ({
//   title,
//   variant,
//   type,
//   searchFilter,
//   showMore = false,
//   className,
// }) => {
//   const { authUserData } = useAuth();
//   const [limit, setLimit] = useState(5);

//   useEffect(() => {
//     const updateLimit = () => {
//       setLimit(window.innerWidth < 1300 ? 4 : 5);
//     };

//     updateLimit();
//     window.addEventListener("resize", updateLimit);
//     return () => window.removeEventListener("resize", updateLimit);
//   }, []);

//   if (!authUserData.role) return null;

//   type SectionQueryData = GetProjectsByUserQuery | GetAllDeliverablesQuery;

//   const chooseQueryHook = (
//     variant: CardVariant
//   ): (() => { data?: SectionQueryData; loading: boolean; error?: any }) => {
//     switch (variant) {
//       case "projects":
//         return useGetProjectsByUserQuery;
//       case "deliverables":
//         return useGetAllDeliverablesQuery;
//       // case "tasks":
//       //   return useGetAllTasksQuery;
//       default:
//         return useGetAllDeliverablesQuery;
//     }
//   };

//   function extractItemsFromData(
//     variant: CardVariant,
//     data?: SectionQueryData
//   ): any[] {
//     switch (variant) {
//       case "projects":
//         return (data as GetProjectsByUserQuery)?.getProjectsByUser ?? [];
//       case "deliverables":
//         return (data as GetAllDeliverablesQuery)?.getAllDeliverables ?? [];
//       // case "tasks":
//       //   return (data as GetAllTasksQuery)?.getAllTasks ?? [];
//       default:
//         return [];
//     }
//   }
//   const useQuery = chooseQueryHook(variant);
//   const { data, loading, error } = useQuery();
//   const items = extractItemsFromData(variant, data);

//   return (
//     <section className={`flex flex-col gap-4 md:gap-4 ${className || ""}`}>
//       <article className="flex justify-between items-center ">
//         <h2 className="text-2xl font-bold">{title}</h2>
//         {showMore && (
//           <Button label="See More" role={authUserData.role} to={`/${type}`} />
//         )}
//       </article>
//       <DisplayCards
//         items={items}
//         loading={loading}
//         error={error}
//         type="company"
//         variant={variant}
//         searchFilter={searchFilter}
//         cardType={type}
//         limit={limit}
//       />
//     </section>
//   );
// };
import { useState, useEffect } from "react";
import { Card, CardVariant } from "../components/Cards";
import DisplayCards from "../components/DisplayCards";
import Button from "../atoms/Button";
import { useAuth } from "../context/authContext";
import {
  useGetProjectsByUserQuery,
  useGetAllDeliverablesQuery,
  GetProjectsByUserQuery,
  GetAllDeliverablesQuery,
  Project,
  Deliverable,
} from "../__generated__/graphql-types";

export interface SectionProps {
  title: string;
  variant: CardVariant;
  type: "projects" | "deliverable" | "task";
  searchFilter: string;
  showMore?: boolean;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  variant,
  type,
  searchFilter,
  showMore = false,
  className,
}) => {
  const { authUserData } = useAuth();
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const updateLimit = () => {
      setLimit(window.innerWidth < 1300 ? 4 : 5);
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  if (!authUserData.role) return null;

  type SectionQueryData = GetProjectsByUserQuery | GetAllDeliverablesQuery;

  const chooseQueryHook = (
    variant: CardVariant
  ): (() => { data?: SectionQueryData; loading: boolean; error?: any }) => {
    switch (variant) {
      case "projects":
        return useGetProjectsByUserQuery;
      case "deliverables":
        return useGetAllDeliverablesQuery;
      default:
        return useGetAllDeliverablesQuery;
    }
  };

  function extractItemsFromData(
    variant: CardVariant,
    data?: SectionQueryData
  ): (Project | Deliverable)[] {
    switch (variant) {
      case "projects":
        return (data as GetProjectsByUserQuery)?.getProjectsByUser ?? [];
      case "deliverables":
        return (data as GetAllDeliverablesQuery)?.getAllDeliverables ?? [];
      default:
        return [];
    }
  }

  const useQuery = chooseQueryHook(variant);
  const { data, loading, error } = useQuery();
  const items = extractItemsFromData(variant, data);

  return (
    <section className={`flex flex-col gap-4 md:gap-4 ${className || ""}`}>
      <article className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showMore && (
          <Button label="See More" role={authUserData.role} to={`/${type}`} />
        )}
      </article>

      <DisplayCards
        items={items}
        loading={loading}
        error={error}
        variant={variant}
        searchFilter={searchFilter}
        limit={limit}
        renderItem={(item) => (
          <Card key={item.id} variant={variant}>
            <h3 className="font-semibold text-xl">
              {"projectName" in item ? item.projectName : item.name}
            </h3>
            {"startDate" in item && item.startDate && (
              <p className="text-sm">
                {new Date(item.startDate).toLocaleDateString("fr-FR")}
              </p>
            )}
          </Card>
        )}
      />
    </section>
  );
};
