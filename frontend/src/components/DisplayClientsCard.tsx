import { useGetAllClientsQuery, ClientStatus } from "../__generated__/graphql-types";
import CardsClient from "./CardsClient";

interface DisplayClientsProps {
  searchFilter: string;
  sortOrder: "NONE" | "AZ" | "ZA";
  statusFilter: ClientStatus | "ALL";
}

export default function DisplayClientsCard({
  searchFilter,
  sortOrder,
  statusFilter,
}: DisplayClientsProps) {
  const { loading, error, data } = useGetAllClientsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let filteredClients = data?.getAllClients ?? [];
  console.info("filteredClients:",filteredClients)
  // Email and ame filter
  filteredClients = filteredClients.filter((client) => {
    const nameLower = client.clientName?.toLowerCase() ?? "";
    const emailLower = client.account?.email?.toLowerCase() ?? "";
    const searchLower = searchFilter.toLowerCase();
    return nameLower.includes(searchLower) || emailLower.includes(searchLower);
  });

  // Status filter
  if (statusFilter !== "ALL") {
    filteredClients = filteredClients.filter((client) => client.status === statusFilter);
  }

  // Sorter by AZ
  if (sortOrder === "AZ") {
    filteredClients.sort((a, b) => (a.clientName ?? "").localeCompare(b.clientName ?? ""));
  } else if (sortOrder === "ZA") {
    filteredClients.sort((a, b) => (b.clientName ?? "").localeCompare(a.clientName ?? ""));
  }

  return (
    <div className="flex flex-row flex-wrap gap-x-4 mt-3">
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
