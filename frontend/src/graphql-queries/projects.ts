import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS_QUERY = gql`
  query GetAllProjects {
    getAllProjects {
    id
    projectName
    companyUserId
    description
    startDate
    endDate
    status
  }
  }
`;
