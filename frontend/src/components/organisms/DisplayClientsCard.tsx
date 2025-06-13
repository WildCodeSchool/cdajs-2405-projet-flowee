import ErrorBanner from "@components/molecules/ErrorBanner";
import SuccessBanner from "@components/molecules/SuccesBanner";
import type { ClientStatus } from "@generated/graphql-types";
import {
  useArchiveClientMutation,
  useDeleteClientMutation,
  useGetAllClientsQuery,
} from "@generated/graphql-types";
import type { ClientUI } from "@interfaces/client.types";
import { useEffect, useState } from "react";
import CardsClient from "./CardsClient";
import type { SortOrder } from "@components/molecules/Filters";

interface DisplayClientsProps {
  searchFilter: string;
  sortOrder: SortOrder;
  statusFilter: ClientStatus | "All";
}

export default function DisplayClientsCard({
  searchFilter,
  sortOrder,
  statusFilter,
}: DisplayClientsProps) {
  const { loading, error, data, refetch } = useGetAllClientsQuery();
  const [deleteClient] = useDeleteClientMutation();
  const [archiveClient] = useArchiveClientMutation();
  const [operationError, setOperationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <ErrorBanner message="Error loading clients. Please refresh the page." />
    );
  }

  let filteredClients = data?.getAllClients ?? [];

  // Email and name filter
  filteredClients = filteredClients.filter((client) => {
    const nameLower = client.clientName?.toLowerCase() ?? "";
    const emailLower = client.account?.email?.toLowerCase() ?? "";
    const searchLower = searchFilter.toLowerCase();
    return nameLower.includes(searchLower) || emailLower.includes(searchLower);
  });

  // Status filter
  if (statusFilter !== "All") {
    filteredClients = filteredClients.filter(
      (client) => client.status === statusFilter,
    );
  }

  // Sorter by name
  if (sortOrder === "AZ") {
    filteredClients.sort((a, b) =>
      (a.clientName ?? "").localeCompare(b.clientName ?? ""),
    );
  } else if (sortOrder === "ZA") {
    filteredClients.sort((a, b) =>
      (b.clientName ?? "").localeCompare(a.clientName ?? ""),
    );
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setOperationError(null);

      deleteClient({ variables: { id } })
        .then(() => {
          setSuccessMessage("Client deleted successfully.");
          refetch();
        })
        .catch((err: unknown) => {
          console.error("Delete error:", err);
          setOperationError(
            "Deletion of the client failed. This client could be associated with existing projects.",
          );
        });
    }
  };

  const handleArchive = (id: number) => {
    if (window.confirm("Are you sure you want to archive this client?")) {
      setOperationError(null);

      archiveClient({ variables: { id } })
        .then(() => {
          setSuccessMessage("Client archived successfully.");
          refetch();
        })
        .catch((err: unknown) => {
          console.error("Archive error:", err);
          setOperationError("Archive of the client failed.");
        });
    }
  };

  const mappedClients: ClientUI[] = filteredClients.map((client) => ({
    id: client.id,
    clientName: client.clientName,
    status: client.status,
    account: client.account
      ? {
          email: client.account.email,
        }
      : undefined,
  }));

  return (
    <div>
      {/* Afficher le message de succès */}
      {successMessage && (
        <div className="mb-4">
          <SuccessBanner message={successMessage} />
        </div>
      )}

      {/* Afficher une erreur si une opération a échoué */}
      {operationError && (
        <div className="mb-4">
          <ErrorBanner message={operationError} />
        </div>
      )}

      {/* Afficher un message si aucun client ne correspond aux  filtres*/}
      {mappedClients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No client matches your search criteria.
        </div>
      )}
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
    </div>
  );
}
