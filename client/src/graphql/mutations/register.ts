import { gql } from "@apollo/client";

export default gql`
  mutation Register($data: ValidatedRegisterUserInput!) {
    register(data: $data) {
      _id
      email
    }
  }
`;
