import { gql } from "@apollo/client";

export const DELETE_CLIENT_MUTATION = gql`
  mutation DeleteClient($id: Float!) {
    deleteClient(id: $id)
  }
`;

export const ARCHIVE_CLIENT_MUTATION = gql`
  mutation ArchiveClient($id: Float!) {
    archiveClient(id: $id) {
      id
      clientName
      status
    }
  }
`;
export const UPDATE_CLIENT_MUTATION = gql`
  mutation UpdateClient(
    $id: Float!
    $newName: String
    $newEmail: String
    $newStatus: ClientStatus
  ) {
    updateClient(
      id: $id
      newName: $newName
      newEmail: $newEmail
      # newStatus: $newStatus
    ) {
      id
      clientName
      status
      account {
        email
      }
    }
  }
`;
