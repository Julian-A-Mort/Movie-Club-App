import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($userName: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(userName: $userName, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;
