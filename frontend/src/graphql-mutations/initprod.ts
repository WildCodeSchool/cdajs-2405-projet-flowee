import { gql } from "@apollo/client";

export const INIT_ADMIN = gql`
  mutation InitAdmin($data: InitAdminProdInput!) {
    initAdmin(data: $data)
  }
`;
