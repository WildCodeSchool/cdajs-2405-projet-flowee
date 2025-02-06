import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS_QUERY = gql`
  query GetAllProjects {
    getAllProjects {
      id
      name
      description
      startDate
      endDate
      status
      author
      client {
        firstname
        lastname
      }
    }
  }
`;
