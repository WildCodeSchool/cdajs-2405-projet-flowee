import { useQuery } from "@apollo/client";
import Navigation from "../components/Navigation";
import { GET_ALL_CLIENTS_QUERY } from "../graphql-queries/clients";

export interface Client {
  id: number;
  name: string;
  account?: {
    id: number;
    email: string;
  };
}

interface GetAllClientsData {
  getAllClients: Client[];
}

export default function Clients() {
  const { loading, error, data } = useQuery<GetAllClientsData>(
    GET_ALL_CLIENTS_QUERY,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 p-4 md:ml-4">
        <h1>Liste des Clients</h1>
        {data?.getAllClients?.length === 0 ? (
          <p>Aucun client trouvé</p>
        ) : (
          <ul>
            {data?.getAllClients.map((client) => (
              <li key={client.id} className="mb-4 p-4 border rounded">
                <strong>{client.name}</strong>
                <br />
                {client.account && <span>Email: {client.account.email}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
