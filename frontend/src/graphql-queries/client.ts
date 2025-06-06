import { gql } from "@apollo/client";

export const GET_ALL_CLIENTS_QUERY = gql`
  query GetAllClients {
    getAllClients {
      id
      clientName
      account {
        email
      }
      status
    }
  }`;
