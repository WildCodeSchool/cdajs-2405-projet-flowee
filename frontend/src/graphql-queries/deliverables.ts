import { gql } from "@apollo/client";

export const GET_ALL_DELIVERABLES_QUERY = gql`
  query GetAllDeliverables {
    getAllDeliverables {
      id
      name
      perimeter
      endDate
      status
      createdAt
      reviewTimes
      tasks {
        id
        name
        description
        status
      }
    }
  }
`;

export const GET_DELIVERABLE_BY_ID_QUERY = gql`
  query GetDeliverableById($id: Float!) {
    getDeliverable(id: $id) {
      id
      name
      perimeter
      endDate
      status
      createdAt
      reviewTimes
      tasks {
        id
        name
        description
        status
        startDate
        endDate
      }
    }
  }
`;
