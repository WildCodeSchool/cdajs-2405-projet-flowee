import { gql } from "@apollo/client";

export const GET_ME_COMPANY = gql`
  query MeCompany {
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
    }
  }
`;