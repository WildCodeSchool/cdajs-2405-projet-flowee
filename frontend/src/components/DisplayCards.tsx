import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { Card } from "./Cards";
import { CardType, CardVariant } from "./Cards";
import ArrowIcon from "./Icons/Arrow";

interface DisplayCardsProps {
  query: any;
  variant: CardVariant;
  type: CardType;
  searchFilter: string;
  limit?: number;
  cardType: "project" | "deliverable" | "task";
}

const DisplayCards = ({
  query,
  variant,
  type,
  searchFilter,
  limit,
  cardType,
}: DisplayCardsProps) => {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  //Filter names of projects
  const getFilteredCards = () => {
    const dataKeys: Record<string, string> = {
      project: "getAllProjects",
      deliverable: "getAllDeliverables",
      task: "getAllTasks",
    };

    const allData = data?.[dataKeys[cardType]] || [];

    if (searchFilter) {
      return allData.filter((card: any) => {
        const cardName = card.name.toLowerCase();
        const clientFirstName = card.client?.firstname?.toLowerCase() || "";
        const clientLastName = card.client?.lastname?.toLowerCase() || "";
        const search = searchFilter.toLowerCase();

        return (
          cardName.includes(search) ||
          clientFirstName.includes(search) ||
          clientLastName.includes(search)
        );
      });
    }
    return allData;
  };
  const cards = getFilteredCards();

  return (
    <div className="flex flex-col md:flex-row  gap-4  w-full h-auto">
      {cards.slice(0, limit || cards.length).map((card: any) => (
        <Card key={card.id} type={type} variant={variant}>
          <h3 className="text-xl font-bold">{card.name}</h3>
          <aside className="flex justify-between items-center">
            <p className="mt-2">{card.endDate}</p>
            <NavLink
              to={`/${cardType}/${card.id}`}
              className="bg-orangebase p-2 rounded-full"
            >
              <ArrowIcon />
            </NavLink>
          </aside>
        </Card>
      ))}
    </div>
  );
};

export default DisplayCards;
