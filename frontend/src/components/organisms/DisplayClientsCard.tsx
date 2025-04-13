import { useDeleteClientMutation, useArchiveClientMutation, useGetAllClientsQuery } from "@generated/graphql-types";
import type { ClientStatus } from "@generated/graphql-types"; 
import CardsClient from "./CardsClient";
import type { ClientUI } from "@interfaces/client.types"

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
  const { loading, error, data, refetch  } = useGetAllClientsQuery();
  const [deleteClient] = useDeleteClientMutation();
  const [archiveClient] = useArchiveClientMutation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let filteredClients = data?.getAllClients ?? [];

  // Email and name filter
  filteredClients = filteredClients.filter((client) => {
    const nameLower = client.clientName?.toLowerCase() ?? "";
    const emailLower = client.account?.email?.toLowerCase() ?? "";
    const searchLower = searchFilter.toLowerCase();
    return nameLower.includes(searchLower) || emailLower.includes(searchLower);
  });

  // Status filter
  if (statusFilter !== "ALL") {
    filteredClients = filteredClients.filter(
      (client) => client.status === statusFilter
    );
  }

  // Sorter by name
  if (sortOrder === "AZ") {
    filteredClients.sort((a, b) =>
      (a.clientName ?? "").localeCompare(b.clientName ?? "")
    );
  } else if (sortOrder === "ZA") {
    filteredClients.sort((a, b) =>
      (b.clientName ?? "").localeCompare(a.clientName ?? "")
    );
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteClient({ variables: { id } })
        .then(() => refetch())
        .catch((err: unknown ) => console.error("Delete error:", err));
    }
  };

  const handleArchive = (id: number) => {
    if (window.confirm("Are you sure you want to archive this client?")) {
      archiveClient({ variables: { id } })
        .then(() => refetch())
        .catch((err: unknown) => console.error("Archive error:", err));
    }
  };

const mappedClients: ClientUI[] = filteredClients.map(client => ({
  id: client.id,
  clientName: client.clientName,
  status: client.status,
  account: client.account ? {
    email: client.account.email
  } : undefined
}));

 return (
     <div className="flex flex-row flex-wrap gap-x-4 mt-3">
      {mappedClients.map((client) => (
        <CardsClient
          key={client.id}
          client={client}
          onEdit={() => console.log("Edit", client.id)}
          onDelete={() => handleDelete(Number(client.id))}
          onArchive={() => handleArchive(Number(client.id))}
        />
      ))}
    </div>
  );
}
