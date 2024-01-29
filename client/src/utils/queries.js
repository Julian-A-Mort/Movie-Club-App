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
      image
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
      status
      userId
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
