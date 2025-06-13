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

export const EDIT_PROJECT = gql`
mutation UpdateProject($data: UpdateProjectInput!) {
  updateProject(data: $data) {
    id
    projectName
    description
    endDate
  }
}
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: Float!) {
    deleteProject(projectId: $projectId)
  }
`;
