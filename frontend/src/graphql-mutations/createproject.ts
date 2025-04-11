import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject($newProject: CreateProjectInput!) {
    createProject(newProject: $newProject) {
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