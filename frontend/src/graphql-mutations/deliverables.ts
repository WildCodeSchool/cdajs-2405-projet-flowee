import { gql } from "@apollo/client";

export const DELETE_DELIVERABLE_MUTATION = gql`
  mutation DeleteDeliverable($id: Float!) {
    deleteDeliverable(id: $id)
  }
`;
