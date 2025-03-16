import { gql } from "@apollo/client";

export const GET_ALL_CLIENTS_QUERY = gql`
  query GetAllClients {
    getAllClients {
      id
      name
      account {
        id
        email
      }
    }
  }
`;
