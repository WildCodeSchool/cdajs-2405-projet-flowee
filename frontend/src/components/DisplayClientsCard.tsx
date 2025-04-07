import { ClientStatus, useGetAllClientsQuery } from "../__generated__/graphql-types";
import CardsClient from "./CardsClient";

interface DisplayClientsProps {
  searchFilter: string;
}

export default function DisplayClients({ searchFilter }: DisplayClientsProps) {
  const { loading, error, data } = useGetAllClientsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allClients = data?.getAllClients ?? [];

  // Filtrage par le nom du client ou l'email
  const filteredClients = allClients.filter((client) => {
    const nameLower = client.clientName?.toLowerCase() ?? "";
    const emailLower = client.account?.email?.toLowerCase() ?? "";
    const searchLower = searchFilter.toLowerCase();
    return nameLower.includes(searchLower) || emailLower.includes(searchLower);
  });

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {filteredClients.map((client) => (
        <CardsClient
          key={client.id}
          name={client.clientName || "No name"}
          status={client.status || ClientStatus.Active}
          onEdit={() => console.log("Edit", client.id)}
          onDelete={() => console.log("Delete", client.id)}
          onArchive={() => console.log("Archive", client.id)}
        />
      ))}
    </div>
  );
}
