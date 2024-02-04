import { gql } from '@apollo/client';

// Queries
export const GET_MOVIES = gql`
query GetMovies {
  movies {
    _id
    title
    description
    releaseYear
    genre
    director
    posterPath
    tmdbId
    __typename
  }
}
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      userName
      firstName
      lastName
      email
      role
    }
  }
`;

export const GET_MEMBERSHIPS = gql`
  query GetMemberships {
    memberships {
      _id
      title
      description
      startDate
      endDate
      price
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      date
      movie {
        _id
        title
      }
    }
  }
`;

export const GET_USERS_BY_ROLE = gql`
  query GetUsersByRole {
    users(role: $role) {
      _id
      title
      description
      date
      role
    }
  }
`;

export const GET_USER = gql`
query GetUser($userId: ID!) {
  user(_id: $userId) {
      _id
      userName
      firstName
      lastName
      email
      role
    }
  }
`;