import { gql } from "@apollo/client";

export const CREATE_CLIENT_MUTATION = gql`
 mutation Mutation($accountId: String!, $name: String!) {
  createClient(accountId: $accountId, Name: $name) {
    id
    clientName
  }
}
`;

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
    $id: Float!,
    $newName: String,
    $newEmail: String,
    $newStatus: String
  ) {
    updateClient(
      id: $id,
      newName: $newName,
      newEmail: $newEmail,
      newStatus: $newStatus
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
