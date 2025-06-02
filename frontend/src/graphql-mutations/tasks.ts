import { gql } from "@apollo/client";

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Float!) {
    deleteTask(id: $id)
  }
`;
