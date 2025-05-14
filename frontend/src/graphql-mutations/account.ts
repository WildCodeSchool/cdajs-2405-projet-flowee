import { gql } from "@apollo/client";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($role: String!, $password: String!, $email: String!) {
    createAccount(role: $role, password: $password, email: $email) {
      id   
    }
  } 
`;

export const ACTIVATE_ACCOUNT_AND_RETURN_TOKEN = gql`
 mutation ActivateAccountAndReturnToken($token: String!) {
  activateAccountAndReturnToken(token: $token)
}
`;

export const SET_PASSWORD_FROM_ACTIVATION = gql`
  mutation SetPasswordFromActivation($token: String!, $password: String!) {
  setPasswordFromActivation(token: $token, password: $password)
}
`;
