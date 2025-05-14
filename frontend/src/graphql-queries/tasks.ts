import { gql } from "@apollo/client";

export const GET_ALL_TASKS_QUERY = gql`
  query GetAllTasks {
    getAllTasks {
      id
      name
      description
      status
      startDate
      endDate
    }
  }
`;

export const GET_TASK_BY_ID_QUERY = gql`
  query GetTaskById($id: Float!) {
    getTask(id: $id) {
      id
      name
      description
      status
      startDate
      endDate
      deliverable {
        id
        name
        perimeter
        endDate
        status
        createdAt
        reviewTimes
      }
    }
  }
`;
