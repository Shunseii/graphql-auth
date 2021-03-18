import { gql } from "@apollo/client";

export default gql`
  query GetCurrentUser {
    me {
      _id
      email
    }
  }
`;
