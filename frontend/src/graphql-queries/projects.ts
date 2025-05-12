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

export const GET_PROJECT_BY_USER = gql`
  query GetProjectsByUser {
    getProjectsByUser {
      id
      projectName
      companyUserId
      description
      startDate
      endDate
      status
      client {
        id
        clientName
      }
      deliverables {
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
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: Float!) {
    getProjectById(id: $id) {
      id
      projectName
      companyUserId
      description
      startDate
      endDate
      status
      client {
        id
        clientName
      }
      deliverables {
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
  }
`;
