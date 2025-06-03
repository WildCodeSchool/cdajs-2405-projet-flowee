import { gql } from "@apollo/client";

export const DELETE_DELIVERABLE_MUTATION = gql`
  mutation DeleteDeliverable($id: Float!) {
    deleteDeliverable(id: $id)
  }
`;

export const CREATE_DELIVERABLE_MUTATION = gql`
  mutation CreateDeliverable($newDeliverable: CreateDeliverableInput!) {
    createDeliverable(newDeliverable: $newDeliverable) {
      id
      name
      perimeter
      endDate
      status
      createdAt
      reviewTimes
      project {
        id
        projectName
        companyUserId
        description
        startDate
        endDate
        status
      }
    }
  }
`;
