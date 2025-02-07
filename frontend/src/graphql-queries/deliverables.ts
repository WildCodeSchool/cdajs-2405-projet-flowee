import { gql } from "@apollo/client";

export const GET_ALL_DELIVERABLES_QUERY = gql`
  query GetAllDeliverables {
    getAllDeliverables {
      id
      name
      deliveryDate
      perimeter
      reviewTimes
      status
      createdAt
    }
  }
`;
