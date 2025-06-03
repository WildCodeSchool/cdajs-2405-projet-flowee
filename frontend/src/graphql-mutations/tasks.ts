import { gql } from "@apollo/client";

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Float!) {
    deleteTask(id: $id)
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($newTask: CreateTaskInput!) {
    createTask(newTask: $newTask) {
      id
      name
      description
      status
      startDate
      endDate
      deliverable {
        id
        name
      }
    }
  }
`;
