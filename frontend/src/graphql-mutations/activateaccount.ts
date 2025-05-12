import { gql } from "@apollo/client";
export const ACTIVATE_ACCOUNT = gql`
  mutation ActivateAccount($token: String!) {
  activateAccount(token: $token)
}
`;
