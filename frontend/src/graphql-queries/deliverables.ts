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
