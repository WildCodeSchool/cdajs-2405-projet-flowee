import {useDeleteClientMutation, useArchiveClientMutation, useGetAllClientsQuery, ClientStatus } from "@generated/graphql-types";
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

 return (
    <div className="flex flex-row flex-wrap gap-x-4 mt-3">
      {filteredClients.map((client) => (
        <CardsClient
        //donnée id, name, email, status, à mettre {const data du hook codegen}
          key={client.id}
          id={Number(client.id)} 
          name={client.clientName || "No name"}
          email={client.account?.email || "N/A"}
          status={client.status || ClientStatus.Active}
          onEdit={() => console.log("Edit", client.id)}
          onDelete={() => handleDelete(Number(client.id))}
          onArchive={() => handleArchive(Number(client.id))}
        />
      ))}
    </div>
  );
}
