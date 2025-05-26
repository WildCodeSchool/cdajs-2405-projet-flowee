import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      id
      email
      role
      companyUser {
        id
        firstname
        lastname
        company {
          id
          name
          address
          contactInfo
        }
      }
      client {
        id
      clientName
      }
    }
  }
`;