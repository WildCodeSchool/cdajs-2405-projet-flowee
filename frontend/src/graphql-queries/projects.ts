import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS_QUERY = gql`
  query GetAllProjects {
    getAllProjects {
    id
    name
    clientEmail
    companyUserId
    description
    startDate
    endDate
    status
    client {
      id
      name
    }
    companyUser {
      id
      firstname
      lastname
    }
  }
  }
`;
